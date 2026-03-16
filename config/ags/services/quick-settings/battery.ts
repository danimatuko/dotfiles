import AstalBattery from "gi://AstalBattery"
import { createBinding } from "gnim"

const battery = AstalBattery.get_default()

export const batteryIconName = createBinding(battery, "batteryIconName").as(
  (name) => name || "battery-missing-symbolic",
)

export const batteryPercentage = createBinding(battery, "percentage").as(
  (value) => `${Math.floor(value * 100)}%`,
)
