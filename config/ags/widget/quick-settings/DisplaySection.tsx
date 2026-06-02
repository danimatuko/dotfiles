import { Gtk } from "ags/gtk4"

import {
  canToggleDarkMode,
  canToggleNightLight,
  getBrightnessIcon,
  getBrightnessValue,
  getDarkModeButtonClass,
  getDarkModeIcon,
  getNightLightButtonClass,
  getNightLightIcon,
  getNightLightTemperatureValue,
  setBrightness,
  setNightLightTemperature,
  toggleDarkMode,
  toggleNightLight,
} from "../../services/quick-settings"
import QuickSettingsToggleButton from "./QuickSettingsToggleButton"
import SectionCard from "./SectionCard"
import SliderRow from "./SliderRow"

export default function DisplaySection() {
  return (
    <SectionCard iconName="video-display-symbolic" label="Display">
      <box
        class="quick-settings__toggles-group quick-settings__toggles-group--display"
        orientation={Gtk.Orientation.HORIZONTAL}
        spacing={8}
        homogeneous
      >
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

      <box
        class="quick-settings__sliders-group"
        orientation={Gtk.Orientation.VERTICAL}
        spacing={6}
      >
        <SliderRow
          iconClassName="quick-settings__brightness-icon"
          iconName={getBrightnessIcon}
          sliderClassName="quick-settings__brightness-slider"
          value={getBrightnessValue}
          onValueChanged={(self) => setBrightness(self.value)}
        />
        <SliderRow
          iconClassName="quick-settings__night-light-icon"
          iconName="night-light-symbolic"
          sliderClassName="quick-settings__night-light-slider"
          value={getNightLightTemperatureValue}
          onValueChanged={(self) => setNightLightTemperature(self.value)}
        />
      </box>
    </SectionCard>
  )
}
