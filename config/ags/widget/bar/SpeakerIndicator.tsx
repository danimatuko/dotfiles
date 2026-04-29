import { execAsync } from "ags/process"
import { Gdk } from "ags/gtk4"

import { getSpeakerIcon, getSpeakerTooltip } from "../../services/quick-settings"

const pointerCursor = Gdk.Cursor.new_from_name("pointer", null)

const launchAudioTui = () => {
  execAsync(["ghostty", "--class=TUI.float", "-e", "wiremix"]).catch(() => {})
}

export default function SpeakerIndicator() {
  return (
    <button
      class="status-indicator status-indicator--speaker"
      cursor={pointerCursor}
      onClicked={launchAudioTui}
      tooltipText={getSpeakerTooltip}
    >
      <image iconName={getSpeakerIcon} />
    </button>
  )
}
