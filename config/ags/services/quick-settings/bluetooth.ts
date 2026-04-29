import AstalBluetooth from "gi://AstalBluetooth"
import { createBinding } from "gnim"

const bluetooth = AstalBluetooth.get_default()
const bluetoothPowered = createBinding(bluetooth, "isPowered")
const bluetoothAdapter = createBinding(bluetooth, "adapter")

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
  return "Bluetooth: On\nClick to open Bluetui"
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
