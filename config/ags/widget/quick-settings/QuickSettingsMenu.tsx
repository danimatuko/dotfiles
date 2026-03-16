import { Gdk, Gtk } from "ags/gtk4"

import {
  canControlVolume,
  canToggleBluetooth,
  canToggleDarkMode,
  canToggleNightLight,
  canToggleWifi,
  getBatteryIcon,
  getBatteryPercentage,
  getBluetoothButtonClass,
  getBluetoothIcon,
  getBrightnessIcon,
  getBrightnessValue,
  getDarkModeButtonClass,
  getDarkModeIcon,
  getNightLightButtonClass,
  getNightLightIcon,
  getSpeakerIcon,
  getVolumeValue,
  getWifiButtonClass,
  getWifiIcon,
  setVolume,
  setBrightness,
  toggleDarkMode,
  toggleBluetooth,
  toggleNightLight,
  toggleWifi,
} from "../../services/quick-settings"
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
              iconName={getBrightnessIcon}
            />
            <slider
              class="quick-settings__brightness-slider"
              cursor={pointerCursor}
              hexpand
              value={getBrightnessValue}
              onValueChanged={(self) => setBrightness(self.value)}
            />
          </box>

          <box class="quick-settings__volume-row" spacing={0}>
            <image
              class="quick-settings__volume-icon"
              iconName={getSpeakerIcon}
            />
            <slider
              class="quick-settings__volume-slider"
              cursor={pointerCursor}
              hexpand
              sensitive={canControlVolume}
              value={getVolumeValue}
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
              iconName={getWifiIcon}
              className={getWifiButtonClass}
              onClicked={toggleWifi}
              sensitive={canToggleWifi}
              hexpand
              tooltipText={"Toggle Wi-Fi"}
            />
            <QuickSettingsToggleButton
              label="Bluetooth"
              iconName={getBluetoothIcon}
              className={getBluetoothButtonClass}
              onClicked={toggleBluetooth}
              sensitive={canToggleBluetooth}
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
              iconName={getNightLightIcon}
              className={getNightLightButtonClass}
              onClicked={toggleNightLight}
              sensitive={canToggleNightLight}
              hexpand
              tooltipText={"Toggle Night Light"}
            />
            <QuickSettingsToggleButton
              label="Dark Mode"
              iconName={getDarkModeIcon}
              className={getDarkModeButtonClass}
              onClicked={toggleDarkMode}
              sensitive={canToggleDarkMode}
              hexpand
              tooltipText={"Toggle Dark Mode"}
            />
          </box>
        </box>

        <box class="quick-settings__battery-row" spacing={8}>
          <image iconName={getBatteryIcon} />
          <label label={getBatteryPercentage} xalign={0} />
        </box>
      </box>
    </popover>
  )
}
