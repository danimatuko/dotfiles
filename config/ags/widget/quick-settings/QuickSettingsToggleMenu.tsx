import BatteryIndicator from "../bar/BatteryIndicator"
import BluetoothIndicator from "../bar/BluetoothIndicator"
import SpeakerIndicator from "../bar/SpeakerIndicator"
import WifiIndicator from "../bar/WifiIndicator"

export default function QuickSettingsToggleMenu() {
  return (
    <box class="quick-settings__toggle-menu" spacing={10}>
      <SpeakerIndicator />
      <WifiIndicator />
      <BluetoothIndicator />
      <BatteryIndicator />
    </box>
  )
}
