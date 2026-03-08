import BatteryIndicator from "../BatteryIndicator"
import BluetoothIndicator from "../BluetoothIndicator"
import SpeakerIndicator from "../SpeakerIndicator"
import WifiIndicator from "../WifiIndicator"

export default function QuickSettingsToggleMenu() {
  return (
    <box class="quick-settings__toggle-menu" spacing={8}>
      <SpeakerIndicator />
      <WifiIndicator />
      <BluetoothIndicator />
      <BatteryIndicator />
    </box>
  )
}
