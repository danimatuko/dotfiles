import app from "ags/gtk4/app"
import { Astal, Gdk, Gtk } from "ags/gtk4"

import { osdIconName, osdValue, osdVisible } from "./quicksettings/state"

export default function Osd(gdkmonitor: Gdk.Monitor) {
  const { BOTTOM, LEFT, RIGHT } = Astal.WindowAnchor

  return (
    <window
      name="osd"
      class="Osd"
      visible={osdVisible}
      gdkmonitor={gdkmonitor}
      anchor={BOTTOM | LEFT | RIGHT}
      exclusivity={Astal.Exclusivity.IGNORE}
      application={app}
    >
      <box class="osd__container" halign={Gtk.Align.FILL} hexpand>
        <box class="osd" spacing={8} halign={Gtk.Align.CENTER}>
          <image class="osd__icon" iconName={osdIconName} />
          <levelbar
            class="osd__level"
            value={osdValue}
            minValue={0}
            maxValue={1}
            hexpand
          />
        </box>
      </box>
    </window>
  )
}
