import { execAsync } from "ags/process"

function runPowerCommand(command: string[]) {
  execAsync(command).catch((error) => {
    console.error(`[quick-settings/power] failed: ${command.join(" ")}`, error)
  })
}

export function lockSession() {
  runPowerCommand(["loginctl", "lock-session"])
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
  runPowerCommand(["hyprctl", "dispatch", "exit"])
}
