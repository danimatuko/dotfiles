import { batteryIconName } from "./quicksettings/state"

export default function BatteryIndicator() {
  return (
    <box class="status-indicator status-indicator--battery">
      <image iconName={batteryIconName} />
    </box>
  )
}
