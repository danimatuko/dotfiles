import AstalBluetooth from "gi://AstalBluetooth"
import { createBinding } from "gnim"

const bluetooth = AstalBluetooth.get_default()
const bluetoothPowered = createBinding(bluetooth, "isPowered")
const bluetoothAdapter = createBinding(bluetooth, "adapter")

const getConnectedDeviceNames = () => {
  const devices =
    ((bluetooth as { devices?: Array<{ connected?: boolean; name?: string | null }> })
      .devices ?? [])

  const connectedNames = devices
    .filter((device) => Boolean(device.connected))
    .map((device) => device.name?.trim())
    .filter((name): name is string => Boolean(name))

  return connectedNames
}

export const canToggleBluetooth = bluetoothAdapter.as((adapter) =>
  Boolean(adapter),
)

export const getBluetoothIcon = bluetoothPowered.as((powered) =>
  bluetooth.adapter && powered
    ? "bluetooth-symbolic"
    : "bluetooth-disabled-symbolic",
)

export const getBluetoothTooltip = bluetoothPowered.as((powered) => {
  if (!bluetooth.adapter) return "Bluetooth: Unavailable"
  if (!powered) return "Bluetooth: Off\nClick to open Bluetui"

  const connectedNames = getConnectedDeviceNames()
  if (connectedNames.length === 0) {
    return "Bluetooth: On\nConnected: None\nClick to open Bluetui"
  }

  return `Bluetooth: On\nConnected: ${connectedNames.join(", ")}\nClick to open Bluetui`
})

export const getBluetoothButtonClass = bluetoothPowered.as((powered) =>
  powered
    ? "quick-settings__toggle-button quick-settings__toggle-button--active"
    : "quick-settings__toggle-button",
)

export const toggleBluetooth = () => {
  if (!bluetooth.adapter) return
  bluetooth.toggle()
}
