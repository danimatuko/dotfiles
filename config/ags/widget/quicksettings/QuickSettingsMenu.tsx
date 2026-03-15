import { Gdk, Gtk } from "ags/gtk4"

import {
  batteryIconName,
  batteryPercentage,
  bluetoothButtonClass,
  bluetoothIconName,
  bluetoothSensitive,
  brightnessIconName,
  brightnessValue,
  darkModeButtonClass,
  darkModeIconName,
  darkModeSensitive,
  nightLightButtonClass,
  nightLightIconName,
  nightLightSensitive,
  setVolume,
  setBrightness,
  speakerIconName,
  toggleDarkMode,
  toggleBluetooth,
  toggleNightLight,
  toggleWifi,
  volumeSensitive,
  volumeValue,
  wifiButtonClass,
  wifiIconName,
  wifiSensitive,
} from "./state"
import QuickSettingsToggleButton from "./QuickSettingsToggleButton"

const pointerCursor = Gdk.Cursor.new_from_name("pointer", null)

export default function QuickSettingsMenu() {
  return (
    <popover class="quick-settings__popover" hasArrow={false}>
      <box
        class="quick-settings__menu"
        orientation={Gtk.Orientation.VERTICAL}
        spacing={8}
      >
        <box
          class="quick-settings__sliders-group"
          orientation={Gtk.Orientation.VERTICAL}
        >
          <box class="quick-settings__brightness-row" spacing={0}>
            <image
              class="quick-settings__brightness-icon"
              iconName={brightnessIconName}
            />
            <slider
              class="quick-settings__brightness-slider"
              cursor={pointerCursor}
              hexpand
              value={brightnessValue}
              onValueChanged={(self) => setBrightness(self.value)}
            />
          </box>

          <box class="quick-settings__volume-row" spacing={0}>
            <image
              class="quick-settings__volume-icon"
              iconName={speakerIconName}
            />
            <slider
              class="quick-settings__volume-slider"
              cursor={pointerCursor}
              hexpand
              sensitive={volumeSensitive}
              value={volumeValue}
              onValueChanged={(self) => setVolume(self.value)}
            />
          </box>
        </box>

        <box
          class="quick-settings__toggles-group"
          orientation={Gtk.Orientation.VERTICAL}
          spacing={8}
        >
          <box
            class="quick-settings__toggle-row"
            orientation={Gtk.Orientation.HORIZONTAL}
            spacing={8}
            homogeneous
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
          <box
            class="quick-settings__toggle-row"
            orientation={Gtk.Orientation.HORIZONTAL}
            spacing={8}
            homogeneous
          >
            <QuickSettingsToggleButton
              label="Night Light"
              iconName={nightLightIconName}
              className={nightLightButtonClass}
              onClicked={toggleNightLight}
              sensitive={nightLightSensitive}
              hexpand
              tooltipText={"Toggle Night Light"}
            />
            <QuickSettingsToggleButton
              label="Dark Mode"
              iconName={darkModeIconName}
              className={darkModeButtonClass}
              onClicked={toggleDarkMode}
              sensitive={darkModeSensitive}
              hexpand
              tooltipText={"Toggle Dark Mode"}
            />
          </box>
        </box>

        <box class="quick-settings__battery-row" spacing={8}>
          <image iconName={batteryIconName} />
          <label label={batteryPercentage} xalign={0} />
        </box>
      </box>
    </popover>
  )
}
