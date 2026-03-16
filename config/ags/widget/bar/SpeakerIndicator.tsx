import { getSpeakerIcon } from "../../services/quick-settings"

export default function SpeakerIndicator() {
  return (
    <box class="status-indicator status-indicator--speaker">
      <image iconName={getSpeakerIcon} />
    </box>
  )
}
