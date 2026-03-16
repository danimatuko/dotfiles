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

export const getBluetoothButtonClass = bluetoothPowered.as((powered) =>
  powered
    ? "quick-settings__toggle-button quick-settings__toggle-button--active"
    : "quick-settings__toggle-button",
)

export const toggleBluetooth = () => {
  if (!bluetooth.adapter) return
  bluetooth.toggle()
}
