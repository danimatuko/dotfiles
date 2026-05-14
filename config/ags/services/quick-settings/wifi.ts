import AstalNetwork from "gi://AstalNetwork"
import { createBinding, createState } from "gnim"

const network = AstalNetwork.get_default()
const wifi = network.wifi
const wifiEnabledBinding = wifi ? createBinding(wifi, "enabled") : null
const wifiButtonClass = "quick-settings__toggle-button"
const wifiButtonClassActive =
  "quick-settings__toggle-button quick-settings__toggle-button--active"
const [wifiIconState, setWifiIconState] = createState(
  "network-wireless-disabled-symbolic",
)
const [wifiTooltipState, setWifiTooltipState] =
  createState("Wi-Fi: Unavailable")

const getSignalIcon = (signal: number) => {
  if (signal >= 80) return "network-wireless-signal-excellent-symbolic"
  if (signal >= 55) return "network-wireless-signal-good-symbolic"
  if (signal >= 30) return "network-wireless-signal-ok-symbolic"
  return "network-wireless-signal-weak-symbolic"
}

export const canToggleWifi = createBinding(network, "wifi").as((adapter) =>
  Boolean(adapter),
)

const updateWifiStatus = () => {
  if (!wifi) {
    setWifiIconState("network-wireless-disabled-symbolic")
    setWifiTooltipState("Wi-Fi: Unavailable")
    return
  }

  if (!wifi.enabled) {
    setWifiIconState("network-wireless-disabled-symbolic")
    setWifiTooltipState("Wi-Fi: Off\nClick to open Gazelle")
    return
  }

  const ssid = wifi.ssid?.trim() ?? ""
  if (!ssid) {
    setWifiIconState("network-wireless-signal-none-symbolic")
    setWifiTooltipState("Wi-Fi: On\nClick to open Gazelle")
    return
  }

  setWifiIconState(getSignalIcon(wifi.strength))
  setWifiTooltipState(`Wi-Fi: ${ssid}\nClick to open Gazelle`)
}

if (wifi) {
  wifi.connect("notify::enabled", updateWifiStatus)
  wifi.connect("notify::ssid", updateWifiStatus)
  wifi.connect("notify::strength", updateWifiStatus)
}

network.connect("notify::wifi", updateWifiStatus)
updateWifiStatus()

export const getWifiIcon = wifiIconState
export const getWifiTooltip = wifiTooltipState

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
