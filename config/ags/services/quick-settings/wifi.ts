import AstalNetwork from "gi://AstalNetwork"
import { createBinding } from "gnim"

const network = AstalNetwork.get_default()
const wifi = network.wifi
const wifiEnabledBinding = wifi ? createBinding(wifi, "enabled") : null
const wifiButtonClass = "quick-settings__toggle-button"
const wifiButtonClassActive =
  "quick-settings__toggle-button quick-settings__toggle-button--active"

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

export const getWifiButtonClass = wifiEnabledBinding
  ? wifiEnabledBinding.as((enabled) =>
      enabled ? wifiButtonClassActive : wifiButtonClass,
    )
  : wifiButtonClass

export const toggleWifi = () => {
  const wifiAdapter = network.wifi
  if (!wifiAdapter) return
  wifiAdapter.enabled = !wifiAdapter.enabled
}
