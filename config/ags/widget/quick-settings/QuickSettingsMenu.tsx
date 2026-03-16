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
    <box
      class="quick-settings__menu"
      orientation={Gtk.Orientation.VERTICAL}
      spacing={8}
    >
      <box
        class="quick-settings__toggles-group"
        orientation={Gtk.Orientation.HORIZONTAL}
        spacing={6}
        halign={Gtk.Align.CENTER}
      >
        <QuickSettingsToggleButton
          iconName={getWifiIcon}
          className={getWifiButtonClass}
          onClicked={toggleWifi}
          sensitive={canToggleWifi}
          iconOnly
          tooltipText={"Toggle Wi-Fi"}
        />
        <QuickSettingsToggleButton
          iconName={getBluetoothIcon}
          className={getBluetoothButtonClass}
          onClicked={toggleBluetooth}
          sensitive={canToggleBluetooth}
          iconOnly
          tooltipText={"Toggle Bluetooth"}
        />
        <QuickSettingsToggleButton
          iconName={getNightLightIcon}
          className={getNightLightButtonClass}
          onClicked={toggleNightLight}
          sensitive={canToggleNightLight}
          iconOnly
          tooltipText={"Toggle Night Light"}
        />
        <QuickSettingsToggleButton
          iconName={getDarkModeIcon}
          className={getDarkModeButtonClass}
          onClicked={toggleDarkMode}
          sensitive={canToggleDarkMode}
          iconOnly
          tooltipText={"Toggle Dark Mode"}
        />
      </box>

      <box
        class="quick-settings__sliders-group"
        orientation={Gtk.Orientation.VERTICAL}
        spacing={4}
      >
        <box
          class="quick-settings__slider-card"
          orientation={Gtk.Orientation.VERTICAL}
          spacing={6}
        >
          <box class="quick-settings__slider-row" spacing={10}>
            <box
              class="quick-settings__slider-icon-box"
              valign={Gtk.Align.CENTER}
            >
              <image
                class="quick-settings__brightness-icon"
                iconName={getBrightnessIcon}
              />
            </box>
            <slider
              class="quick-settings__brightness-slider"
              cursor={pointerCursor}
              hexpand
              value={getBrightnessValue}
              onValueChanged={(self) => setBrightness(self.value)}
            />
          </box>
        </box>
      </box>

      <box
        class="quick-settings__sliders-group"
        orientation={Gtk.Orientation.VERTICAL}
        spacing={4}
      >
        <box
          class="quick-settings__slider-card"
          orientation={Gtk.Orientation.VERTICAL}
          spacing={6}
        >
          <box class="quick-settings__slider-row" spacing={10}>
            <box
              class="quick-settings__slider-icon-box"
              valign={Gtk.Align.CENTER}
            >
              <image
                class="quick-settings__volume-icon"
                iconName={getSpeakerIcon}
              />
            </box>
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
      </box>

      <box class="quick-settings__battery-row" spacing={8}>
        <image iconName={getBatteryIcon} />
        <label label="Battery" xalign={0} hexpand />
        <label label={getBatteryPercentage} xalign={1} />
      </box>
    </box>
  )
}
