import AstalNetwork from "gi://AstalNetwork"
import { createBinding } from "gnim"

const network = AstalNetwork.get_default()
const wifi = network.wifi
const wifiEnabled = wifi ? createBinding(wifi, "enabled") : null

export const canToggleWifi = createBinding(network, "wifi").as((adapter) =>
  Boolean(adapter),
)

export const getWifiIcon = wifi
  ? createBinding(wifi, "enabled").as((enabled) => {
      if (!enabled) return "network-wireless-disabled-symbolic"
      return "network-wireless-signal-excellent-symbolic"
    })
  : "network-wireless-disabled-symbolic"

export const getWifiTooltip = wifi
  ? createBinding(wifi, "enabled").as((enabled) => {
      if (!enabled) return "Wi-Fi: Off\nClick to open Gazelle"

      const ssid = wifi.ssid?.trim()
      if (ssid) return `Wi-Fi: ${ssid}\nClick to open Gazelle`

      return "Wi-Fi: On\nClick to open Gazelle"
    })
  : "Wi-Fi: Unavailable"

export const getWifiButtonClass = wifiEnabled
  ? wifiEnabled.as((enabled) =>
      enabled
        ? "quick-settings__toggle-button quick-settings__toggle-button--active"
        : "quick-settings__toggle-button",
    )
  : "quick-settings__toggle-button"

export const toggleWifi = () => {
  const currentWifi = network.wifi
  if (!currentWifi) return
  currentWifi.enabled = !currentWifi.enabled
}
