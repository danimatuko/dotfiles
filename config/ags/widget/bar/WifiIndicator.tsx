import { getWifiIcon } from "../../services/quick-settings"

export default function WifiIndicator() {
  return (
    <box class="status-indicator status-indicator--wifi">
      <image iconName={getWifiIcon} />
    </box>
  )
}
