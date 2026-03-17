import app from "ags/gtk4/app"
import { Astal, Gtk, Gdk } from "ags/gtk4"

import Workspaces from "./Workspaces"
import Clock from "./Clock"
import SystemTray from "./SystemTray"
import OsIcon from "./OsIcon"
import QuickSettingsToggleMenu from "../quick-settings/QuickSettingsToggleMenu"
import { getThemeWindowClass } from "../../services/theme"

export default function Bar(gdkmonitor: Gdk.Monitor) {
  const { TOP, LEFT, RIGHT } = Astal.WindowAnchor

  return (
    <window
      visible
      name="bar"
      class={getThemeWindowClass("Bar")}
      gdkmonitor={gdkmonitor}
      layer={Astal.Layer.OVERLAY}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={TOP | LEFT | RIGHT}
      application={app}
    >
      <centerbox cssName="centerbox">
        {/* LEFT */}
        <box class="bar__start" $type="start" halign={Gtk.Align.START}>
          <OsIcon />
          <Workspaces />
        </box>

        {/* CENTER */}
        <box
          class="bar__center"
          $type="center"
          hexpand
          halign={Gtk.Align.CENTER}
        >
          <Clock />
        </box>

        {/* RIGHT */}
        <box class="bar__end" $type="end" halign={Gtk.Align.END}>
          <box class="system-tray" tooltipText="System Tray">
            <box class="system-tray__container">
              <SystemTray />
            </box>
            <box class="system-tray__toggle">
              <image iconName="pan-start-symbolic" />
            </box>
          </box>
          <box class="quick-status">
            <QuickSettingsToggleMenu />
          </box>
        </box>
      </centerbox>
    </window>
  )
}
