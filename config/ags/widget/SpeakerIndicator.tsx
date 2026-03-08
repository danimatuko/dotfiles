import { speakerIconName } from "./quicksettings/state"

export default function SpeakerIndicator() {
  return (
    <box class="status-indicator status-indicator--speaker">
      <image iconName={speakerIconName} />
    </box>
  )
}
