import AstalNetwork from "gi://AstalNetwork"
import { createBinding } from "gnim"

const network = AstalNetwork.get_default()
const wifi = network.wifi
const wifiEnabled = wifi ? createBinding(wifi, "enabled") : null

export const canToggleWifi = Boolean(wifi)

export const getWifiIcon = wifi
  ? createBinding(wifi, "enabled").as((enabled) => {
      if (!enabled) return "network-wireless-disabled-symbolic"
      return "network-wireless-signal-excellent-symbolic"
    })
  : "network-wireless-disabled-symbolic"

export const getWifiButtonClass = wifiEnabled
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
