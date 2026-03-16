import app from "ags/gtk4/app"
import { Astal, Gdk, Gtk } from "ags/gtk4"

import {
  closeSettingsSidebar,
  isSettingsSidebarVisible,
} from "../../services/settings-sidebar"

const settingsSidebarWidth = 430
const barOffset = 30

export default function SettingsSidebarBackdrop(gdkmonitor: Gdk.Monitor) {
  const { TOP, LEFT, RIGHT, BOTTOM } = Astal.WindowAnchor

  return (
    <window
      name="settings-sidebar-backdrop"
      class="SettingsSidebarBackdrop"
      visible={isSettingsSidebarVisible}
      gdkmonitor={gdkmonitor}
      anchor={TOP | LEFT | RIGHT | BOTTOM}
      marginTop={barOffset}
      exclusivity={Astal.Exclusivity.IGNORE}
      keymode={Astal.Keymode.NONE}
      application={app}
    >
      <box class="settings-sidebar-backdrop" hexpand vexpand>
        <box
          class="settings-sidebar-backdrop__shim"
          widthRequest={settingsSidebarWidth}
        />
        <button
          class="settings-sidebar-backdrop__dismiss"
          cursor={Gdk.Cursor.new_from_name("pointer", null)}
          hexpand
          vexpand
          onClicked={closeSettingsSidebar}
        />
      </box>
    </window>
  )
}
