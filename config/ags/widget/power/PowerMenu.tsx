import app from "ags/gtk4/app"
import { Astal, Gdk, Gtk } from "ags/gtk4"
import { createState } from "gnim"

import {
  lockSession,
  logoutSession,
  poweroffSystem,
  rebootSystem,
  suspendSystem,
} from "../../services/quick-settings"
import { closePowerMenu, isPowerMenuVisible } from "../../services/power-menu"
import { getThemeWindowClass } from "../../services/theme"

type PowerAction = {
  label: string
  iconName: string
  className?: string
  action: () => void
}

const powerActions: PowerAction[] = [
  {
    label: "Lock",
    iconName: "system-lock-screen-symbolic",
    action: lockSession,
  },
  {
    label: "Logout",
    iconName: "system-log-out-symbolic",
    action: logoutSession,
  },
  {
    label: "Sleep",
    iconName: "weather-clear-night-symbolic",
    action: suspendSystem,
  },
  {
    label: "Restart",
    iconName: "system-reboot-symbolic",
    action: rebootSystem,
  },
  {
    label: "Shutdown",
    iconName: "system-shutdown-symbolic",
    className: "power-menu__item--danger",
    action: poweroffSystem,
  },
]

const [selectedIndexState, setSelectedIndexState] = createState(0)
const pointerCursor = Gdk.Cursor.new_from_name("pointer", null)

const normalizeSelectedIndex = (nextIndex: number, resultCount: number) => {
  if (resultCount < 1) return 0
  if (nextIndex < 0) return resultCount - 1
  if (nextIndex >= resultCount) return 0
  return nextIndex
}

const runAndClose = (action: () => void) => {
  closePowerMenu()
  action()
}

export default function PowerMenu(gdkmonitor: Gdk.Monitor) {
  const { TOP, LEFT, RIGHT, BOTTOM } = Astal.WindowAnchor

  return (
    <window
      name="power-menu"
      namespace="ags-power-menu"
      class={getThemeWindowClass("PowerMenu")}
      visible={isPowerMenuVisible}
      gdkmonitor={gdkmonitor}
      layer={Astal.Layer.TOP}
      anchor={TOP | LEFT | RIGHT | BOTTOM}
      exclusivity={Astal.Exclusivity.IGNORE}
      keymode={Astal.Keymode.ON_DEMAND}
      onNotifyVisible={(self) => {
        if (self.visible) {
          self.present()
          setSelectedIndexState(0)
        }
      }}
      application={app}
    >
      <Gtk.EventControllerKey
        onKeyPressed={(_, keyval) => {
          if (keyval === Gdk.KEY_Escape) {
            closePowerMenu()
            return true
          }

          if (keyval === Gdk.KEY_Down) {
            setSelectedIndexState(
              normalizeSelectedIndex(selectedIndexState() + 1, powerActions.length),
            )
            return true
          }

          if (keyval === Gdk.KEY_Up) {
            setSelectedIndexState(
              normalizeSelectedIndex(selectedIndexState() - 1, powerActions.length),
            )
            return true
          }

          if (keyval === Gdk.KEY_Return || keyval === Gdk.KEY_KP_Enter) {
            const selectedAction = powerActions[selectedIndexState()]
            if (!selectedAction) return false
            runAndClose(selectedAction.action)
            return true
          }

          return false
        }}
      />

      <overlay class="power-menu" hexpand vexpand>
        <button
          class="power-menu__backdrop"
          onClicked={closePowerMenu}
          hexpand
          vexpand
        />

        <box
          class="power-menu__panel"
          orientation={Gtk.Orientation.VERTICAL}
          spacing={10}
          widthRequest={360}
          halign={Gtk.Align.CENTER}
          valign={Gtk.Align.CENTER}
        >
          <label class="power-menu__title" label="Session Menu" xalign={0} />
          <box
            class="power-menu__actions"
            orientation={Gtk.Orientation.VERTICAL}
            spacing={6}
          >
            {powerActions.map((entry, index) => (
              <button
                class={selectedIndexState((selectedIndex) =>
                  `${selectedIndex === index ? "power-menu__item power-menu__item--selected" : "power-menu__item"} ${entry.className ?? ""}`.trim(),
                )}
                cursor={pointerCursor}
                onClicked={() => runAndClose(entry.action)}
              >
                <box class="power-menu__item-content" spacing={10}>
                  <image class="power-menu__item-icon" iconName={entry.iconName} />
                  <label class="power-menu__item-label" label={entry.label} xalign={0} />
                </box>
              </button>
            ))}
          </box>
        </box>
      </overlay>
    </window>
  )
}
