import { bluetoothIconName } from "../../services/quick-settings"

export default function BluetoothIndicator() {
  return (
    <box class="status-indicator status-indicator--bluetooth">
      <image iconName={bluetoothIconName} />
    </box>
  )
}
