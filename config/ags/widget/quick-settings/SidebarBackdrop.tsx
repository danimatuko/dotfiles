import app from "ags/gtk4/app"
import { Astal, Gdk, Gtk } from "ags/gtk4"

import { BAR_HEIGHT } from "../bar/constants"
import {
  closeSidebar,
  isSidebarOpen,
  isSidebarVisible,
  SIDEBAR_ANIMATION_MS,
} from "../../services/sidebar"

const sidebarWidth = 430

export default function SidebarBackdrop(gdkmonitor: Gdk.Monitor) {
  const { TOP, LEFT, RIGHT, BOTTOM } = Astal.WindowAnchor

  return (
    <window
      name="sidebar-backdrop"
      class="SidebarBackdrop"
      visible={isSidebarVisible}
      gdkmonitor={gdkmonitor}
      anchor={TOP | LEFT | RIGHT | BOTTOM}
      layer={Astal.Layer.TOP}
      marginTop={BAR_HEIGHT}
      exclusivity={Astal.Exclusivity.IGNORE}
      keymode={Astal.Keymode.NONE}
      application={app}
    >
      <box class="sidebar-backdrop" hexpand vexpand>
        <box class="sidebar-backdrop__shim" widthRequest={sidebarWidth} />
        <Gtk.Revealer
          revealChild={isSidebarOpen}
          transitionType={Gtk.RevealerTransitionType.CROSSFADE}
          transitionDuration={SIDEBAR_ANIMATION_MS}
          hexpand
          vexpand
        >
          <button
            class="sidebar-backdrop__dismiss"
            cursor={Gdk.Cursor.new_from_name("pointer", null)}
            hexpand
            vexpand
            onClicked={closeSidebar}
          />
        </Gtk.Revealer>
      </box>
    </window>
  )
}
