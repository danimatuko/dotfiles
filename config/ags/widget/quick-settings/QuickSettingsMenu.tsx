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
  themeNames,
  themeColors,
  type ThemeName,
  getCurrentTheme,
  setTheme,
} from "../../services/quick-settings"
import QuickSettingsToggleButton from "./QuickSettingsToggleButton"

const pointerCursor = Gdk.Cursor.new_from_name("pointer", null)

const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1)

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

      <box
        class="quick-settings__themes-section"
        orientation={Gtk.Orientation.VERTICAL}
        spacing={4}
      >
        <label class="quick-settings__themes-label" label="Themes" xalign={0} />
        <box
          class="quick-settings__themes-grid"
          orientation={Gtk.Orientation.VERTICAL}
          spacing={4}
        >
          {themeNames.map((themeName: ThemeName) => (
            <button
              class={getCurrentTheme((current: ThemeName) =>
                current === themeName
                  ? "quick-settings__theme-button quick-settings__theme-button--active"
                  : "quick-settings__theme-button",
              )}
              onClicked={() => setTheme(themeName)}
            >
              <box spacing={8}>
                <label
                  class="quick-settings__theme-name"
                  label={capitalize(themeName)}
                  xalign={0}
                  hexpand
                />
                <box class="quick-settings__theme-colors" spacing={2}>
                  {themeColors[themeName].map((color: string) => (
                    <box
                      class="quick-settings__theme-swatch"
                      css={`
                        background-color: ${color};
                      `}
                      widthRequest={16}
                      heightRequest={16}
                    />
                  ))}
                </box>
              </box>
            </button>
          ))}
        </box>
      </box>
    </box>
  )
}
