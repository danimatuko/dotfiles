import GLib from "gi://GLib"
import { execAsync } from "ags/process"
import { createState } from "gnim"

const darkModeCommand = `${GLib.get_home_dir()}/.local/bin/toggle-darkmode`
const [darkModeEnabled, setDarkModeEnabled] = createState(false)

execAsync([darkModeCommand, "status"])
  .then((status) => {
    setDarkModeEnabled(status.trim() === "on")
  })
  .catch(() => {})

export const canToggleDarkMode = true

export const getDarkModeIcon = darkModeEnabled((enabled) =>
  enabled ? "weather-clear-night-symbolic" : "display-brightness-symbolic",
)

export const getDarkModeButtonClass = darkModeEnabled((enabled) =>
  enabled
    ? "quick-settings__toggle-button quick-settings__toggle-button--active"
    : "quick-settings__toggle-button",
)

export const toggleDarkMode = () => {
  setDarkModeEnabled(!darkModeEnabled())
  execAsync([darkModeCommand]).catch(() => {
    setDarkModeEnabled(!darkModeEnabled())
  })
}
