import AstalBluetooth from "gi://AstalBluetooth"
import { createBinding } from "gnim"

const bluetooth = AstalBluetooth.get_default()
const bluetoothPowered = createBinding(bluetooth, "isPowered")
const bluetoothHasAdapter = createBinding(bluetooth, "adapter").as((adapter) =>
  Boolean(adapter),
)
const bluetoothButtonClass = "quick-settings__toggle-button"
const bluetoothButtonClassActive =
  "quick-settings__toggle-button quick-settings__toggle-button--active"

const getConnectedDeviceNames = () => {
  const devices =
    (
      bluetooth as {
        devices?: Array<{ connected?: boolean; name?: string | null }>
      }
    ).devices ?? []

  const connectedNames = devices
    .filter((device) => Boolean(device.connected))
    .map((device) => device.name?.trim())
    .filter((name): name is string => Boolean(name))

  return connectedNames
}

export const canToggleBluetooth = bluetoothHasAdapter

export const getBluetoothIcon = bluetoothPowered.as((powered) =>
  bluetoothHasAdapter() && powered
    ? "bluetooth-symbolic"
    : "bluetooth-disabled-symbolic",
)

export const getBluetoothTooltip = bluetoothPowered.as((powered) => {
  if (!bluetoothHasAdapter()) return "Bluetooth: Unavailable"
  if (!powered) return "Bluetooth: Off\nClick to open Bluetui"

  const connectedNames = getConnectedDeviceNames()
  if (connectedNames.length === 0) {
    return "Bluetooth: On\nConnected: None\nClick to open Bluetui"
  }

  return `Bluetooth: On\nConnected: ${connectedNames.join(", ")}\nClick to open Bluetui`
})

export const getBluetoothButtonClass = bluetoothPowered.as((powered) =>
  powered ? bluetoothButtonClassActive : bluetoothButtonClass,
)

export const toggleBluetooth = () => {
  if (!bluetoothHasAdapter()) return
  bluetooth.toggle()
}
