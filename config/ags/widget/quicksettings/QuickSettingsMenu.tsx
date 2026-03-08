import { Gtk } from "ags/gtk4"

import {
  batteryIconName,
  batteryPercentage,
  bluetoothButtonClass,
  bluetoothIconName,
  bluetoothSensitive,
  toggleBluetooth,
  toggleWifi,
  wifiButtonClass,
  wifiIconName,
  wifiSensitive,
} from "./state"
import QuickSettingsToggleButton from "./QuickSettingsToggleButton"

export default function QuickSettingsMenu() {
  return (
    <popover class="quick-settings__popover" hasArrow={false}>
      <box
        class="quick-settings__menu"
        orientation={Gtk.Orientation.VERTICAL}
        spacing={8}
      >
        <label
          class="quick-settings__title"
          label="Quick Settings"
          xalign={0}
        />
        <box
          class="quick-settings__toggle-row"
          orientation={Gtk.Orientation.HORIZONTAL}
          spacing={8}
        >
          <QuickSettingsToggleButton
            label="Wi-Fi"
            iconName={wifiIconName}
            className={wifiButtonClass}
            onClicked={toggleWifi}
            sensitive={wifiSensitive}
            hexpand
            tooltipText={"Toggle Wi-Fi"}
          />
          <QuickSettingsToggleButton
            label="Bluetooth"
            iconName={bluetoothIconName}
            className={bluetoothButtonClass}
            onClicked={toggleBluetooth}
            sensitive={bluetoothSensitive}
            hexpand
            tooltipText={"Toggle Bluetooth"}
          />
        </box>

        <box class="quick-settings__battery-row" spacing={8}>
          <image iconName={batteryIconName} />
          <label label={batteryPercentage} xalign={0} />
        </box>
      </box>
    </popover>
  )
}
