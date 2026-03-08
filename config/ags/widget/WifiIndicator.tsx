import { wifiIconName } from "./quicksettings/state"

export default function WifiIndicator() {
  return (
    <box class="status-indicator status-indicator--wifi">
      <image iconName={wifiIconName} />
    </box>
  )
}
