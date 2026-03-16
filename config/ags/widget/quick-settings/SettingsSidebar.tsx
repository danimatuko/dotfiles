import app from "ags/gtk4/app"
import { Astal, Gdk, Gtk } from "ags/gtk4"

import {
  closeSettingsSidebar,
  isSettingsSidebarVisible,
} from "../../services/settings-sidebar"
import QuickSettingsMenu from "./QuickSettingsMenu"

const barOffset = 30

export default function SettingsSidebar(gdkmonitor: Gdk.Monitor) {
  const { TOP, LEFT, BOTTOM } = Astal.WindowAnchor

  return (
    <window
      name="settings-sidebar"
      class="SettingsSidebar"
      visible={isSettingsSidebarVisible}
      gdkmonitor={gdkmonitor}
      anchor={TOP | LEFT | BOTTOM}
      marginTop={barOffset}
      exclusivity={Astal.Exclusivity.IGNORE}
      keymode={Astal.Keymode.ON_DEMAND}
      application={app}
    >
      <Gtk.EventControllerKey
        onKeyPressed={(_, keyval) => {
          if (keyval !== Gdk.KEY_Escape) return false
          closeSettingsSidebar()
          return true
        }}
      />
      <box
        class="settings-sidebar"
        orientation={Gtk.Orientation.VERTICAL}
        spacing={0}
      >
        <Gtk.ScrolledWindow
          cssClasses={["settings-sidebar__scroll"]}
          vscrollbarPolicy={Gtk.PolicyType.AUTOMATIC}
          propagateNaturalHeight={true}
          hexpand
          vexpand
        >
          <box
            class="settings-sidebar__content"
            orientation={Gtk.Orientation.VERTICAL}
          >
            <QuickSettingsMenu />
          </box>
        </Gtk.ScrolledWindow>
      </box>
    </window>
  )
}
