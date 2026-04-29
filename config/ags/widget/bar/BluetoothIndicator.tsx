import { execAsync } from "ags/process"
import { Gdk } from "ags/gtk4"

import {
  getBluetoothIcon,
  getBluetoothTooltip,
} from "../../services/quick-settings"

const pointerCursor = Gdk.Cursor.new_from_name("pointer", null)

const launchBluetoothTui = () => {
  execAsync(["ghostty", "--class=TUI.float", "-e", "bluetui"]).catch(() => {})
}

export default function BluetoothIndicator() {
  return (
    <button
      class="status-indicator status-indicator--bluetooth"
      cursor={pointerCursor}
      onClicked={launchBluetoothTui}
      tooltipText={getBluetoothTooltip}
    >
      <image iconName={getBluetoothIcon} />
    </button>
  )
}
