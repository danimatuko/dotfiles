import GLib from "gi://GLib"
import { execAsync } from "ags/process"
import { createState } from "gnim"

const nightLightCommand = `${GLib.get_home_dir()}/.local/bin/toggle-nightlight`
const [nightLightEnabled, setNightLightEnabled] = createState(false)

execAsync([nightLightCommand, "status"])
  .then((status) => {
    setNightLightEnabled(status.trim() === "on")
  })
  .catch(() => {})

export const canToggleNightLight = true

export const getNightLightIcon = nightLightEnabled((enabled) =>
  enabled ? "night-light-symbolic" : "night-light-disabled-symbolic",
)

export const getNightLightButtonClass = nightLightEnabled((enabled) =>
  enabled
    ? "quick-settings__toggle-button quick-settings__toggle-button--active"
    : "quick-settings__toggle-button",
)

export const toggleNightLight = () => {
  setNightLightEnabled(!nightLightEnabled())
  execAsync([nightLightCommand]).catch(() => {})
}
