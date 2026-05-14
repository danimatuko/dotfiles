import GLib from "gi://GLib"
import { execAsync } from "ags/process"
import { createState } from "gnim"

import { getCommandPath } from "../../lib/commands"

const darkModeCommand = getCommandPath(
  "toggle-darkmode",
  `${GLib.get_home_dir()}/.local/bin/toggle-darkmode`,
)
const [darkModeEnabled, setDarkModeEnabled] = createState(false)

if (darkModeCommand) {
  execAsync([darkModeCommand, "status"])
    .then((status) => {
      setDarkModeEnabled(status.trim() === "on")
    })
    .catch((error) => {
      console.error("[quick-settings/dark-mode] failed to read status", error)
    })
}

export const canToggleDarkMode = Boolean(darkModeCommand)

export const getDarkModeIcon = darkModeEnabled((enabled) =>
  enabled ? "weather-clear-night-symbolic" : "display-brightness-symbolic",
)

export const getDarkModeButtonClass = darkModeEnabled((enabled) =>
  enabled
    ? "quick-settings__toggle-button quick-settings__toggle-button--active"
    : "quick-settings__toggle-button",
)

export const toggleDarkMode = () => {
  if (!darkModeCommand) return

  setDarkModeEnabled(!darkModeEnabled())
  execAsync([darkModeCommand]).catch((error) => {
    setDarkModeEnabled(!darkModeEnabled())
    console.error("[quick-settings/dark-mode] failed to toggle", error)
  })
}
