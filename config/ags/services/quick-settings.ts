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
const nightLightCommand = `${GLib.get_home_dir()}/.local/bin/toggle-nightlight`
const darkModeCommand = `${GLib.get_home_dir()}/.local/bin/toggle-darkmode`
let brightnessDevice: string | null = null
let lastBrightnessPercent: number | null = null
const [nightLightEnabled, setNightLightEnabled] = createState(false)
const [darkModeEnabled, setDarkModeEnabled] = createState(false)
const [osdVisibleState, setOsdVisibleState] = createState(false)
const [osdIconNameState, setOsdIconNameState] = createState(
  "audio-volume-muted-symbolic",
)
const [osdValueState, setOsdValueState] = createState(0)
let osdTimeoutId = 0

const showOsd = (iconName: string, value: number) => {
  setOsdIconNameState(iconName)
  setOsdValueState(Math.max(0, Math.min(1, value)))
  setOsdVisibleState(true)

  if (osdTimeoutId > 0) {
    GLib.source_remove(osdTimeoutId)
  }

  osdTimeoutId = GLib.timeout_add(GLib.PRIORITY_DEFAULT, 1200, () => {
    setOsdVisibleState(false)
    osdTimeoutId = 0
    return GLib.SOURCE_REMOVE
  })
}

const volumeIconByValue = (value: number) => {
  if (value <= 0.001) return "audio-volume-muted-symbolic"
  if (value < 0.34) return "audio-volume-low-symbolic"
  if (value < 0.67) return "audio-volume-medium-symbolic"
  return "audio-volume-high-symbolic"
}

execAsync([nightLightCommand, "status"])
  .then((status) => {
    setNightLightEnabled(status.trim() === "on")
  })
  .catch(() => {})

execAsync([darkModeCommand, "status"])
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

export const osdVisible = osdVisibleState
export const osdIconName = osdIconNameState
export const osdValue = osdValueState

export const volumeSensitive = Boolean(speaker)

export const volumeValue = speaker
  ? createBinding(speaker, "volume").as((value) =>
      Math.max(0, Math.min(1, Number.isFinite(value) ? value : 0)),
    )
  : 0

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
  execAsync([nightLightCommand]).catch(() => {})
}

// Toggle system dark mode via shared helper script
export const toggleDarkMode = () => {
  setDarkModeEnabled(!darkModeEnabled())
  execAsync([darkModeCommand]).catch(() => {
    setDarkModeEnabled(!darkModeEnabled())
  })
}

export const setVolume = (volume: number) => {
  if (!speaker) return
  const clampedVolume = Math.max(0, Math.min(1, volume))
  speaker.volume = clampedVolume
  showOsd(volumeIconByValue(clampedVolume), clampedVolume)
}

// Brightness
const [brightnessPercent, setBrightnessPercent] = createState(0)

const parseBrightnessPercent = (output: string) => {
  const firstLine = output.trim().split("\n")[0] ?? ""
  const fields = firstLine.split(",")
  const percentField = fields.find((field) => field.includes("%")) ?? "0%"
  const percent = Number.parseInt(percentField.replace("%", ""), 10)
  if (!Number.isFinite(percent)) return 0
  return Math.max(0, Math.min(100, percent))
}

const detectBrightnessDevice = async () => {
  if (brightnessDevice) return brightnessDevice

  try {
    const output = await execAsync(["brightnessctl", "-m"])
    const firstLine = output.trim().split("\n")[0] ?? ""
    const device = firstLine.split(",")[0]?.trim()
    brightnessDevice = device || null
  } catch {
    brightnessDevice = null
  }

  return brightnessDevice
}

const refreshBrightness = () => {
  detectBrightnessDevice()
    .then((device) =>
      execAsync(
        device
          ? ["brightnessctl", "-d", device, "-m"]
          : ["brightnessctl", "-m"],
      ),
    )
    .then((output) => {
      const nextPercent = parseBrightnessPercent(output)
      const hadPreviousPercent = lastBrightnessPercent !== null
      const brightnessChanged = lastBrightnessPercent !== nextPercent

      setBrightnessPercent(nextPercent)

      if (hadPreviousPercent && brightnessChanged) {
        showOsd("display-brightness-symbolic", nextPercent / 100)
      }

      lastBrightnessPercent = nextPercent
    })
    .catch(() => {
      setBrightnessPercent(0)
    })
}

refreshBrightness()
GLib.timeout_add(GLib.PRIORITY_DEFAULT, 300, () => {
  refreshBrightness()
  return GLib.SOURCE_CONTINUE
})

export const brightnessValue = brightnessPercent((percent) => percent / 100)

export const brightnessIconName = "display-brightness-symbolic"

export const setBrightness = (percent: number) => {
  const clampedValue = Math.max(0, Math.min(1, percent))
  const clampedPercent = Math.round(clampedValue * 100)
  setBrightnessPercent(clampedPercent)
  lastBrightnessPercent = clampedPercent
  showOsd("display-brightness-symbolic", clampedValue)
  detectBrightnessDevice()
    .then((device) =>
      execAsync(
        device
          ? ["brightnessctl", "-d", device, "set", `${clampedPercent}%`]
          : ["brightnessctl", "set", `${clampedPercent}%`],
      ),
    )
    .catch(() => {})
}
