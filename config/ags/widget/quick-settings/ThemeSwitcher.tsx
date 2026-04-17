import app from "ags/gtk4/app"
import { Astal, Gdk, Gtk } from "ags/gtk4"

import { getThemeWindowClass } from "../../services/theme"
import { closeThemeMenu, isThemeMenuVisible } from "../../services/theme-menu"
import ThemeSwitcherMenu from "./ThemeSwitcherMenu"

export default function ThemeSwitcher(gdkmonitor: Gdk.Monitor) {
  return (
    <window
      name="theme-switcher"
      namespace="ags-theme-switcher"
      class={getThemeWindowClass("ThemeSwitcher")}
      visible={isThemeMenuVisible}
      gdkmonitor={gdkmonitor}
      layer={Astal.Layer.TOP}
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
      <box class="theme-switcher__shell" orientation={Gtk.Orientation.VERTICAL}>
        <ThemeSwitcherMenu />
      </box>
    </window>
  )
}
