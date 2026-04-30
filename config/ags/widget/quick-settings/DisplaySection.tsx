import { Gtk } from "ags/gtk4"

import {
  getBrightnessIcon,
  getBrightnessValue,
  getNightLightTemperatureValue,
  setBrightness,
  setNightLightTemperature,
} from "../../services/quick-settings"
import SectionHeader from "./SectionHeader"
import SliderRow from "./SliderRow"

export default function DisplaySection() {
  return (
    <box
      class="quick-settings__section-card"
      orientation={Gtk.Orientation.VERTICAL}
      spacing={8}
    >
      <SectionHeader iconName="video-display-symbolic" label="Display" />
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
    </box>
  )
}
