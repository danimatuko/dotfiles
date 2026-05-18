import { execAsync } from "ags/process"

import { isCommandAvailable } from "../../lib/commands"

function runPowerCommand(command: string[]) {
  const program = command[0]
  if (!program || !isCommandAvailable(program)) {
    console.error(
      `[quick-settings/power] unavailable command: ${command.join(" ")}`,
    )
    return
  }

  execAsync(command).catch((error) => {
    console.error(`[quick-settings/power] failed: ${command.join(" ")}`, error)
  })
}

export const canLockSession = isCommandAvailable("hyprlock")
export const canSuspendSystem = isCommandAvailable("systemctl")
export const canRebootSystem = isCommandAvailable("systemctl")
export const canPoweroffSystem = isCommandAvailable("systemctl")
export const canLogoutSession = isCommandAvailable("hyprctl")

export function lockSession() {
  runPowerCommand(["hyprlock"])
}

export function suspendSystem() {
  runPowerCommand(["systemctl", "suspend"])
}

export function rebootSystem() {
  runPowerCommand(["systemctl", "reboot"])
}

export function poweroffSystem() {
  runPowerCommand(["systemctl", "poweroff"])
}

export function logoutSession() {
  runPowerCommand(["hyprctl", "eval", "hl.dispatch(hl.dsp.exit())"])
}
