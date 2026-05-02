import app from "ags/gtk4/app"
import { Astal, Gdk, Gtk } from "ags/gtk4"

import {
  getOsdIcon,
  getOsdValue,
  isOsdVisible,
} from "../services/quick-settings"
import { getThemeWindowClass } from "../services/theme"

const osdBottomMargin = 44
const osdTransitionDuration = 170

export default function Osd(gdkmonitor: Gdk.Monitor) {
  const { BOTTOM, LEFT, RIGHT } = Astal.WindowAnchor

  return (
    <window
      name="osd"
      class={getThemeWindowClass("Osd")}
      visible={isOsdVisible}
      gdkmonitor={gdkmonitor}
      anchor={BOTTOM | LEFT | RIGHT}
      marginBottom={osdBottomMargin}
      exclusivity={Astal.Exclusivity.IGNORE}
      application={app}
    >
      <box class="osd__container" halign={Gtk.Align.FILL} hexpand>
        <Gtk.Revealer
          revealChild={isOsdVisible}
          transitionType={Gtk.RevealerTransitionType.SLIDE_UP}
          transitionDuration={osdTransitionDuration}
        >
          <box class="osd" spacing={10} halign={Gtk.Align.CENTER}>
            <image class="osd__icon" iconName={getOsdIcon} />
            <levelbar
              class="osd__level"
              value={getOsdValue}
              minValue={0}
              maxValue={1}
              mode={Gtk.LevelBarMode.CONTINUOUS}
              hexpand
            />
            <label
              class="osd__value"
              label={getOsdValue((value) => `${Math.round(value * 100)}%`)}
            />
          </box>
        </Gtk.Revealer>
      </box>
    </window>
  )
}
