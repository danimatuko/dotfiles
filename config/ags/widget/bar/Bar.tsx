import app from "ags/gtk4/app"
import { Astal, Gtk, Gdk } from "ags/gtk4"

import Workspaces from "./Workspaces"
import Clock from "./Clock"
import MediaWidget from "./MediaWidget"
import SystemTray from "./SystemTray"
import OsIcon from "./OsIcon"
import SidebarToggleButton from "./SidebarToggleButton"
import NotificationIndicator from "./NotificationIndicator"
import KeyboardLayoutIndicator from "./KeyboardLayoutIndicator"
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
        <box class="bar__start" $type="start" halign={Gtk.Align.START}>
          <OsIcon />
        </box>

        <box
          class="bar__center"
          $type="center"
          hexpand
          halign={Gtk.Align.CENTER}
        >
          <centerbox class="bar__center-layout" hexpand>
            <box
              class="bar__center-side bar__center-side--left"
              $type="start"
              hexpand
              halign={Gtk.Align.END}
            >
              <Clock />
            </box>

            <box class="bar__center-anchor" $type="center">
              <label class="bar__center-separator" label="|" />
              <Workspaces />
              <label class="bar__center-separator" label="|" />
            </box>

            <box
              class="bar__center-side bar__center-side--right"
              $type="end"
              hexpand
              halign={Gtk.Align.START}
            >
              <MediaWidget />
            </box>
          </centerbox>
        </box>

        <box class="bar__end" $type="end" halign={Gtk.Align.END}>
          <box class="bar__end-group bar__end-group--balanced" spacing={4}>
            <box class="system-tray" tooltipText="System Tray">
              <box class="system-tray__container">
                <SystemTray />
              </box>
              <box class="system-tray__toggle">
                <image iconName="pan-start-symbolic" />
              </box>
            </box>
            <NotificationIndicator />
            <KeyboardLayoutIndicator />
          </box>

          <label class="bar__separator" label="|" />

          <box
            class="bar__end-group bar__end-group--actions bar__end-group--balanced"
            spacing={4}
          >
            <box class="quick-status">
              <QuickSettingsToggleMenu />
            </box>
            <label class="quick-status__separator" label="|" />
            <SidebarToggleButton />
          </box>
        </box>
      </centerbox>
    </window>
  )
}
