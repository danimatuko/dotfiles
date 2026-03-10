import AstalBattery from "gi://AstalBattery"
import AstalBluetooth from "gi://AstalBluetooth"
import AstalNetwork from "gi://AstalNetwork"
import AstalWp from "gi://AstalWp"
import GLib from "gi://GLib"
import { execAsync } from "ags/process"
import { createBinding, createState } from "gnim"

// Service singletons (shared across the widget)
const network = AstalNetwork.get_default()
const wifi = network.wifi
const bluetooth = AstalBluetooth.get_default()
const battery = AstalBattery.get_default()
const speaker = AstalWp.get_default()?.defaultSpeaker ?? null
const nightLightScriptPath = `${GLib.get_home_dir()}/dotfiles/scripts/toggle-nightlight.sh`
const darkModeScriptPath = `${GLib.get_home_dir()}/dotfiles/scripts/toggle-darkmode.sh`
const [nightLightEnabled, setNightLightEnabled] = createState(false)
const [darkModeEnabled, setDarkModeEnabled] = createState(false)

execAsync([nightLightScriptPath, "status"])
  .then((status) => {
    setNightLightEnabled(status.trim() === "on")
  })
  .catch(() => {})

execAsync([darkModeScriptPath, "status"])
  .then((status) => {
    setDarkModeEnabled(status.trim() === "on")
  })
  .catch(() => {})

// Core reactive bindings from Astal services
const wifiEnabled = wifi ? createBinding(wifi, "enabled") : null
const bluetoothPowered = createBinding(bluetooth, "isPowered")
const bluetoothAdapter = createBinding(bluetooth, "adapter")

// Wi-Fi
// Whether the toggle should be clickable
export const wifiSensitive = Boolean(wifi)

// Icon shown in the Wi-Fi row
export const wifiIconName = wifi
  ? createBinding(wifi, "iconName").as(
      (name) => name || "network-wireless-offline-symbolic",
    )
  : "network-wireless-disabled-symbolic"

// CSS state class for the Wi-Fi row
export const wifiButtonClass = wifiEnabled
  ? wifiEnabled.as((enabled) =>
      enabled
        ? "quick-settings__toggle-button quick-settings__toggle-button--active"
        : "quick-settings__toggle-button",
    )
  : "quick-settings__toggle-button quick-settings__toggle-button--disabled"

// Bluetooth
// Button is clickable only when an adapter exists
export const bluetoothSensitive = bluetoothAdapter.as((adapter) =>
  Boolean(adapter),
)

// Icon shown in the Bluetooth row
export const bluetoothIconName = bluetoothPowered.as((powered) =>
  bluetooth.adapter && powered
    ? "bluetooth-symbolic"
    : "bluetooth-disabled-symbolic",
)

// CSS state class for the Bluetooth row
export const bluetoothButtonClass = bluetoothPowered.as((powered) =>
  powered
    ? "quick-settings__toggle-button quick-settings__toggle-button--active"
    : "quick-settings__toggle-button",
)

// Night light
// Keeps local toggle state for the quick settings button
export const nightLightSensitive = true

// Icon shown in the night light row
export const nightLightIconName = nightLightEnabled((enabled) =>
  enabled ? "night-light-symbolic" : "night-light-disabled-symbolic",
)

// CSS state class for the night light row
export const nightLightButtonClass = nightLightEnabled((enabled) =>
  enabled
    ? "quick-settings__toggle-button quick-settings__toggle-button--active"
    : "quick-settings__toggle-button",
)

// Dark mode
// Keeps local toggle state for the quick settings button
export const darkModeSensitive = true

// Icon shown in the dark mode row
export const darkModeIconName = darkModeEnabled((enabled) =>
  enabled ? "weather-clear-night-symbolic" : "display-brightness-symbolic",
)

// CSS state class for the dark mode row
export const darkModeButtonClass = darkModeEnabled((enabled) =>
  enabled
    ? "quick-settings__toggle-button quick-settings__toggle-button--active"
    : "quick-settings__toggle-button",
)

// Speaker
// Icon shown in the bar trigger
export const speakerIconName = speaker
  ? createBinding(speaker, "volumeIcon").as(
      (name) => name || "audio-volume-muted-symbolic",
    )
  : "audio-volume-muted-symbolic"

// Battery
// Used in the small status row at the bottom of the menu
export const batteryIconName = createBinding(battery, "batteryIconName").as(
  (name) => name || "battery-missing-symbolic",
)

// Converts fractional value (0..1) to percentage text
export const batteryPercentage = createBinding(battery, "percentage").as(
  (value) => `${Math.floor(value * 100)}%`,
)

// Actions
// Toggle Wi-Fi power state
export const toggleWifi = () => {
  if (!wifi) return
  wifi.enabled = !wifi.enabled
}

// Toggle Bluetooth adapter power state
export const toggleBluetooth = () => {
  if (!bluetooth.adapter) return
  bluetooth.toggle()
}

// Toggle night light via shared helper script
export const toggleNightLight = () => {
  setNightLightEnabled(!nightLightEnabled())
  execAsync([nightLightScriptPath]).catch(() => {})
}

// Toggle system dark mode via shared helper script
export const toggleDarkMode = () => {
  setDarkModeEnabled(!darkModeEnabled())
  execAsync([darkModeScriptPath]).catch(() => {
    setDarkModeEnabled(!darkModeEnabled())
  })
}
