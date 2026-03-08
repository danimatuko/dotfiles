import { bluetoothIconName } from "./quicksettings/state"

export default function BluetoothIndicator() {
  return (
    <box class="status-indicator status-indicator--bluetooth">
      <image iconName={bluetoothIconName} />
    </box>
  )
}
