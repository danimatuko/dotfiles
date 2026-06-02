import app from "ags/gtk4/app"
import { Astal, Gdk, Gtk } from "ags/gtk4"

import { getThemeWindowClass } from "../../services/theme"
import { closeThemeMenu, isThemeMenuVisible } from "../../services/theme-menu"
import { BAR_HEIGHT } from "../bar/constants"
import ThemeSwitcherMenu from "./ThemeSwitcherMenu"

const themeSwitcherTopOffset = 16

export default function ThemeSwitcher(gdkmonitor: Gdk.Monitor) {
  const { TOP, LEFT, RIGHT, BOTTOM } = Astal.WindowAnchor

  return (
    <window
      name="theme-switcher"
      namespace="ags-theme-switcher"
      class={getThemeWindowClass("ThemeSwitcher")}
      visible={isThemeMenuVisible}
      gdkmonitor={gdkmonitor}
      layer={Astal.Layer.TOP}
      anchor={TOP | LEFT | RIGHT | BOTTOM}
      marginTop={BAR_HEIGHT + themeSwitcherTopOffset}
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
          closeThemeMenu()
          return true
        }}
      />
      <Gtk.Revealer
        revealChild={isThemeMenuVisible}
        transitionType={Gtk.RevealerTransitionType.SLIDE_DOWN}
        transitionDuration={220}
        halign={Gtk.Align.CENTER}
        valign={Gtk.Align.START}
      >
        <box class="theme-switcher__shell" orientation={Gtk.Orientation.VERTICAL}>
          <ThemeSwitcherMenu />
        </box>
      </Gtk.Revealer>
    </window>
  )
}
