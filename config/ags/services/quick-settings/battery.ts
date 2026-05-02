import AstalBattery from "gi://AstalBattery"
import { execAsync } from "ags/process"
import { createBinding } from "gnim"

const battery = AstalBattery.get_default()

const warningThreshold = 20
const criticalThreshold = 10

let hasWarnedLowBattery = false
let hasWarnedCriticalBattery = false

const sendBatteryNotification = (
  urgency: "normal" | "critical",
  title: string,
  body: string,
  soundEventId: string,
) => {
  execAsync(["notify-send", "-u", urgency, title, body]).catch(() => {})
  execAsync(["canberra-gtk-play", "-i", soundEventId]).catch(() => {})
}

const getBatteryPercent = () => {
  const percentage = Number.isFinite(battery.percentage)
    ? battery.percentage
    : 0
  return Math.floor(percentage * 100)
}

const isBatteryCharging = () => {
  const batteryState = battery as unknown as {
    charging?: boolean
    charged?: boolean
  }

  return Boolean(batteryState.charging || batteryState.charged)
}

const resetBatteryAlertState = () => {
  hasWarnedLowBattery = false
  hasWarnedCriticalBattery = false
}

const handleLowBatteryAlerts = () => {
  const batteryPercent = getBatteryPercent()

  if (isBatteryCharging() || batteryPercent > warningThreshold) {
    resetBatteryAlertState()
    return
  }

  if (batteryPercent <= criticalThreshold && !hasWarnedCriticalBattery) {
    sendBatteryNotification(
      "critical",
      "Battery Critical",
      `Battery is at ${batteryPercent}%`,
      "dialog-error",
    )
    hasWarnedCriticalBattery = true
    hasWarnedLowBattery = true
    return
  }

  if (batteryPercent <= warningThreshold && !hasWarnedLowBattery) {
    sendBatteryNotification(
      "normal",
      "Battery Low",
      `Battery is at ${batteryPercent}%`,
      "bell",
    )
    hasWarnedLowBattery = true
  }
}

battery.connect("notify::percentage", handleLowBatteryAlerts)
battery.connect("notify::charging", handleLowBatteryAlerts)
battery.connect("notify::charged", handleLowBatteryAlerts)
handleLowBatteryAlerts()

export const getBatteryIcon = createBinding(battery, "batteryIconName").as(
  (name) => name || "battery-missing-symbolic",
)

export const getBatteryPercentage = createBinding(battery, "percentage").as(
  (value) => `${Math.floor(value * 100)}%`,
)

export const getBatteryTooltip = createBinding(battery, "percentage").as((value) => {
  const percent = `${Math.floor(value * 100)}%`
  const state = isBatteryCharging() ? "Charging" : "Discharging"
  return `Battery: ${percent} (${state})`
})

export const showBatteryDetails = () => {
  const percent = getBatteryPercent()
  const state = isBatteryCharging() ? "Charging" : "Discharging"
  execAsync([
    "notify-send",
    "Battery",
    `${percent}% (${state})`,
    "-i",
    battery.batteryIconName || "battery-missing-symbolic",
  ]).catch(() => {})
}
