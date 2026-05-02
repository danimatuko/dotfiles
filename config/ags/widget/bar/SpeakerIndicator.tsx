import { execAsync } from "ags/process"
import { Gdk } from "ags/gtk4"

import { getSpeakerIcon, getSpeakerTooltip } from "../../services/quick-settings"
import { POINTER_CURSOR_NAME, STATUS_INDICATOR_BASE_CLASS } from "./constants"

const pointerCursor = Gdk.Cursor.new_from_name(POINTER_CURSOR_NAME, null)

const launchAudioTui = () => {
  execAsync(["ghostty", "--class=TUI.float", "-e", "wiremix"]).catch(() => {})
}

export default function SpeakerIndicator() {
  return (
    <button
      class={`${STATUS_INDICATOR_BASE_CLASS} status-indicator--speaker`}
      cursor={pointerCursor}
      onClicked={launchAudioTui}
      tooltipText={getSpeakerTooltip}
    >
      <image iconName={getSpeakerIcon} />
    </button>
  )
}
