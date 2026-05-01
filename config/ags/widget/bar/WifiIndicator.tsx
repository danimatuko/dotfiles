import { execAsync } from "ags/process"
import { Gdk } from "ags/gtk4"

import { getWifiIcon, getWifiTooltip } from "../../services/quick-settings"
import { POINTER_CURSOR_NAME, STATUS_INDICATOR_BASE_CLASS } from "./constants"

const pointerCursor = Gdk.Cursor.new_from_name(POINTER_CURSOR_NAME, null)

const launchNetworkTui = () => {
  execAsync(["ghostty", "--class=TUI.float", "-e", "gazelle"]).catch(() => {})
}

export default function WifiIndicator() {
  return (
    <button
      class={`${STATUS_INDICATOR_BASE_CLASS} status-indicator--wifi`}
      cursor={pointerCursor}
      onClicked={launchNetworkTui}
      tooltipText={getWifiTooltip}
    >
      <image iconName={getWifiIcon} />
    </button>
  )
}
