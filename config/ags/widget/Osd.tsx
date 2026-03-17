import app from "ags/gtk4/app"
import { Astal, Gdk, Gtk } from "ags/gtk4"

import {
  getOsdIcon,
  getOsdValue,
  isOsdVisible,
} from "../services/quick-settings"
import { getThemeWindowClass } from "../services/theme"

export default function Osd(gdkmonitor: Gdk.Monitor) {
  const { BOTTOM, LEFT, RIGHT } = Astal.WindowAnchor

  return (
    <window
      name="osd"
      class={getThemeWindowClass("Osd")}
      visible={isOsdVisible}
      gdkmonitor={gdkmonitor}
      anchor={BOTTOM | LEFT | RIGHT}
      exclusivity={Astal.Exclusivity.IGNORE}
      application={app}
    >
      <box class="osd__container" halign={Gtk.Align.FILL} hexpand>
        <box class="osd" spacing={8} halign={Gtk.Align.CENTER}>
          <image class="osd__icon" iconName={getOsdIcon} />
          <levelbar
            class="osd__level"
            value={getOsdValue}
            minValue={0}
            maxValue={1}
            hexpand
          />
        </box>
      </box>
    </window>
  )
}
