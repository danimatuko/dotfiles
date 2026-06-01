import { Gtk } from "ags/gtk4"

import ConnectivitySection from "./ConnectivitySection"
import DisplaySection from "./DisplaySection"
import NotificationsSection from "./NotificationsSection"
import PowerSection from "./PowerSection"
import SoundSection from "./SoundSection"
import WallpaperSection from "./WallpaperSection"

export default function QuickSettingsMenu() {
  return (
    <box
      class="quick-settings__menu"
      orientation={Gtk.Orientation.VERTICAL}
      spacing={14}
    >
      <box
        class="quick-settings__header"
        orientation={Gtk.Orientation.VERTICAL}
        spacing={3}
      >
        <label
          class="quick-settings__eyebrow"
          label="CONTROL CENTER"
          xalign={0}
        />
        <label
          class="quick-settings__title"
          label="Quick Settings"
          xalign={0}
        />
        <label
          class="quick-settings__subtitle"
          label="System controls and status"
          xalign={0}
        />
      </box>

      <PowerSection />
      <ConnectivitySection />
      <DisplaySection />
      <SoundSection />
      <WallpaperSection />
      <NotificationsSection />
    </box>
  )
}
