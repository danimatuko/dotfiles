import { execAsync } from "ags/process"
import { Gdk } from "ags/gtk4"

import { getWifiIcon, getWifiTooltip } from "../../services/quick-settings"

const pointerCursor = Gdk.Cursor.new_from_name("pointer", null)

const launchNetworkTui = () => {
  execAsync(["ghostty", "--class=TUI.float", "-e", "gazelle"]).catch(() => {})
}

export default function WifiIndicator() {
  return (
    <button
      class="status-indicator status-indicator--wifi"
      cursor={pointerCursor}
      onClicked={launchNetworkTui}
      tooltipText={getWifiTooltip}
    >
      <image iconName={getWifiIcon} />
    </button>
  )
}
