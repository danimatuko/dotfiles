import { execAsync } from "ags/process"
import { Gdk } from "ags/gtk4"

import {
  getBluetoothIcon,
  getBluetoothTooltip,
} from "../../services/quick-settings"
import { POINTER_CURSOR_NAME, STATUS_INDICATOR_BASE_CLASS } from "./constants"

const pointerCursor = Gdk.Cursor.new_from_name(POINTER_CURSOR_NAME, null)

const launchBluetoothTui = () => {
  execAsync(["ghostty", "--class=TUI.float", "-e", "bluetui"]).catch(() => {})
}

export default function BluetoothIndicator() {
  return (
    <button
      class={`${STATUS_INDICATOR_BASE_CLASS} status-indicator--bluetooth`}
      cursor={pointerCursor}
      onClicked={launchBluetoothTui}
      tooltipText={getBluetoothTooltip}
    >
      <image iconName={getBluetoothIcon} />
    </button>
  )
}
