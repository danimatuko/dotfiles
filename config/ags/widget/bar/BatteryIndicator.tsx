import { Gdk } from "ags/gtk4"

import {
  getBatteryIcon,
  getBatteryTooltip,
  showBatteryDetails,
} from "../../services/quick-settings"
import { POINTER_CURSOR_NAME, STATUS_INDICATOR_BASE_CLASS } from "./constants"

const pointerCursor = Gdk.Cursor.new_from_name(POINTER_CURSOR_NAME, null)

export default function BatteryIndicator() {
  return (
    <button
      class={`${STATUS_INDICATOR_BASE_CLASS} status-indicator--battery`}
      cursor={pointerCursor}
      onClicked={showBatteryDetails}
      tooltipText={getBatteryTooltip}
    >
      <image iconName={getBatteryIcon} />
    </button>
  )
}
