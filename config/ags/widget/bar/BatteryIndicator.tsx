import { batteryIconName } from "../../services/quick-settings"

export default function BatteryIndicator() {
  return (
    <box class="status-indicator status-indicator--battery">
      <image iconName={batteryIconName} />
    </box>
  )
}
