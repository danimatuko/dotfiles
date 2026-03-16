import AstalNetwork from "gi://AstalNetwork"
import { createBinding } from "gnim"

const network = AstalNetwork.get_default()
const wifi = network.wifi
const wifiEnabled = wifi ? createBinding(wifi, "enabled") : null

export const wifiSensitive = Boolean(wifi)

export const wifiIconName = wifi
  ? createBinding(wifi, "iconName").as(
      (name) => name || "network-wireless-offline-symbolic",
    )
  : "network-wireless-disabled-symbolic"

export const wifiButtonClass = wifiEnabled
  ? wifiEnabled.as((enabled) =>
      enabled
        ? "quick-settings__toggle-button quick-settings__toggle-button--active"
        : "quick-settings__toggle-button",
    )
  : "quick-settings__toggle-button quick-settings__toggle-button--disabled"

export const toggleWifi = () => {
  if (!wifi) return
  wifi.enabled = !wifi.enabled
}
