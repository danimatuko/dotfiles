import { Gtk } from "ags/gtk4"

import {
  canToggleBluetooth,
  canToggleDarkMode,
  canToggleNightLight,
  canToggleWifi,
  getBluetoothButtonClass,
  getBluetoothIcon,
  getDarkModeButtonClass,
  getDarkModeIcon,
  getNightLightButtonClass,
  getNightLightIcon,
  getWifiButtonClass,
  getWifiIcon,
  toggleBluetooth,
  toggleDarkMode,
  toggleNightLight,
  toggleWifi,
} from "../../services/quick-settings"
import QuickSettingsToggleButton from "./QuickSettingsToggleButton"
import SectionCard from "./SectionCard"

export default function ConnectivitySection() {
  return (
    <SectionCard
      iconName="network-wireless-signal-excellent-symbolic"
      label="Connectivity"
      spacing={10}
    >
      <box
        class="quick-settings__toggles-group"
        orientation={Gtk.Orientation.HORIZONTAL}
        spacing={8}
        homogeneous
      >
        <QuickSettingsToggleButton
          iconName={getWifiIcon}
          iconClassName="quick-settings__toggle-icon quick-settings__toggle-icon--wifi"
          className={getWifiButtonClass}
          onClicked={toggleWifi}
          sensitive={canToggleWifi}
          iconOnly
          hexpand
          tooltipText="Toggle Wi-Fi"
        />
        <QuickSettingsToggleButton
          iconName={getBluetoothIcon}
          iconClassName="quick-settings__toggle-icon quick-settings__toggle-icon--bluetooth"
          className={getBluetoothButtonClass}
          onClicked={toggleBluetooth}
          sensitive={canToggleBluetooth}
          iconOnly
          hexpand
          tooltipText="Toggle Bluetooth"
        />
        <QuickSettingsToggleButton
          iconName={getNightLightIcon}
          className={getNightLightButtonClass}
          onClicked={toggleNightLight}
          sensitive={canToggleNightLight}
          iconOnly
          hexpand
          tooltipText="Toggle Night Light"
        />
        <QuickSettingsToggleButton
          iconName={getDarkModeIcon}
          className={getDarkModeButtonClass}
          onClicked={toggleDarkMode}
          sensitive={canToggleDarkMode}
          iconOnly
          hexpand
          tooltipText="Toggle Dark Mode"
        />
      </box>
    </SectionCard>
  )
}
