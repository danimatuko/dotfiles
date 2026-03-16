import app from "ags/gtk4/app"
import { Astal, Gdk, Gtk } from "ags/gtk4"

import { closeSidebar, isSidebarVisible } from "../../services/sidebar"
import { BAR_HEIGHT } from "../bar/constants"
import QuickSettingsMenu from "./QuickSettingsMenu"

export default function Sidebar(gdkmonitor: Gdk.Monitor) {
  const { TOP, LEFT, BOTTOM } = Astal.WindowAnchor

  return (
    <window
      name="sidebar"
      class="Sidebar"
      visible={isSidebarVisible}
      gdkmonitor={gdkmonitor}
      anchor={TOP | LEFT | BOTTOM}
      layer={Astal.Layer.TOP}
      marginTop={BAR_HEIGHT}
      exclusivity={Astal.Exclusivity.IGNORE}
      keymode={Astal.Keymode.ON_DEMAND}
      onNotifyVisible={(self) => {
        if (self.visible) self.present()
      }}
      application={app}
    >
      <Gtk.EventControllerKey
        onKeyPressed={(_, keyval) => {
          if (keyval !== Gdk.KEY_Escape) return false
          closeSidebar()
          return true
        }}
      />
      <box
        class="sidebar"
        orientation={Gtk.Orientation.VERTICAL}
        spacing={0}
        hexpand
        vexpand
        valign={Gtk.Align.FILL}
      >
        <Gtk.ScrolledWindow
          cssClasses={["sidebar__scroll"]}
          vscrollbarPolicy={Gtk.PolicyType.AUTOMATIC}
          hexpand
          vexpand
        >
          <box class="sidebar__content" orientation={Gtk.Orientation.VERTICAL}>
            <QuickSettingsMenu />
          </box>
        </Gtk.ScrolledWindow>
      </box>
    </window>
  )
}
