import BatteryIndicator from "../bar/BatteryIndicator"
import BluetoothIndicator from "../bar/BluetoothIndicator"
import SpeakerIndicator from "../bar/SpeakerIndicator"
import WifiIndicator from "../bar/WifiIndicator"
import QuickSettingsToggleButton from "./QuickSettingsToggleButton"
import { isThemeMenuVisible, toggleThemeMenu } from "../../services/theme-menu"

export default function QuickSettingsToggleMenu() {
  return (
    <box class="quick-settings__toggle-menu" spacing={10}>
      <QuickSettingsToggleButton
        iconName="preferences-desktop-theme-symbolic"
        className={isThemeMenuVisible((visible) =>
          visible
            ? "quick-settings__toggle-button quick-settings__toggle-button--active quick-settings__theme-menu-toggle"
            : "quick-settings__toggle-button quick-settings__theme-menu-toggle",
        )}
        onClicked={toggleThemeMenu}
        sensitive
        iconOnly
        tooltipText="Theme switcher"
      />
      <SpeakerIndicator />
      <WifiIndicator />
      <BluetoothIndicator />
      <BatteryIndicator />
    </box>
  )
}
