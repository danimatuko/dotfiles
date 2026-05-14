import { Gtk } from "ags/gtk4"

import {
  canControlVolume,
  getSpeakerIcon,
  getVolumeValue,
  setVolume,
} from "../../services/quick-settings"
import SectionCard from "./SectionCard"
import SliderRow from "./SliderRow"

export default function SoundSection() {
  return (
    <SectionCard iconName="audio-speakers-symbolic" label="Sound">
      <box
        class="quick-settings__sliders-group"
        orientation={Gtk.Orientation.VERTICAL}
        spacing={6}
      >
        <SliderRow
          iconClassName="quick-settings__volume-icon"
          iconName={getSpeakerIcon}
          sliderClassName="quick-settings__volume-slider"
          value={getVolumeValue}
          sensitive={canControlVolume}
          onValueChanged={(self) => setVolume(self.value)}
        />
      </box>
    </SectionCard>
  )
}
