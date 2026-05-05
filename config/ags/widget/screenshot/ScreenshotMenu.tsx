import app from "ags/gtk4/app"
import { Astal, Gdk, Gtk } from "ags/gtk4"
import { execAsync } from "ags/process"
import GLib from "gi://GLib"
import { createState } from "gnim"

import {
  closeScreenshotMenu,
  isScreenshotMenuVisible,
} from "../../services/screenshot-menu"
import { getThemeWindowClass } from "../../services/theme"

type ScreenshotAction = {
  label: string
  iconName: string
  args: string[]
}

const screenshotScriptPath = `${GLib.get_home_dir()}/.local/bin/screenshot`

const screenshotActions: ScreenshotAction[] = [
  {
    label: "Region",
    iconName: "camera-photo-symbolic",
    args: [],
  },
  {
    label: "Window",
    iconName: "focus-windows-symbolic",
    args: ["window"],
  },
  {
    label: "Screen",
    iconName: "video-display-symbolic",
    args: ["output"],
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

const triggerScreenshot = (action: ScreenshotAction) => {
  closeScreenshotMenu()

  execAsync([screenshotScriptPath, ...action.args]).catch((error) => {
    const message = `${error}`.split("\n")[0]?.trim() || "unknown error"
    execAsync([
      "notify-send",
      "-u",
      "normal",
      "Screenshot",
      `Could not start screenshot command: ${message}`,
    ]).catch(() => {})
  })
}

export default function ScreenshotMenu(gdkmonitor: Gdk.Monitor) {
  const { TOP, LEFT, RIGHT, BOTTOM } = Astal.WindowAnchor

  return (
    <window
      name="screenshot-menu"
      namespace="ags-screenshot-menu"
      class={getThemeWindowClass("ScreenshotMenu")}
      visible={isScreenshotMenuVisible}
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
            closeScreenshotMenu()
            return true
          }

          if (keyval === Gdk.KEY_Left) {
            setSelectedIndexState(
              normalizeSelectedIndex(
                selectedIndexState() - 1,
                screenshotActions.length,
              ),
            )
            return true
          }

          if (keyval === Gdk.KEY_Right) {
            setSelectedIndexState(
              normalizeSelectedIndex(
                selectedIndexState() + 1,
                screenshotActions.length,
              ),
            )
            return true
          }

          if (keyval === Gdk.KEY_Return || keyval === Gdk.KEY_KP_Enter) {
            const selectedAction = screenshotActions[selectedIndexState()]
            if (!selectedAction) return false
            triggerScreenshot(selectedAction)
            return true
          }

          return false
        }}
      />
      <overlay class="screenshot-menu" hexpand vexpand>
        <button
          class="screenshot-menu__backdrop"
          onClicked={closeScreenshotMenu}
          hexpand
          vexpand
        />

        <box
          class="screenshot-menu__panel"
          orientation={Gtk.Orientation.VERTICAL}
          spacing={12}
          halign={Gtk.Align.CENTER}
          valign={Gtk.Align.CENTER}
        >
          <label class="screenshot-menu__title" label="Take Screenshot" />

          <box
            class="screenshot-menu__actions"
            orientation={Gtk.Orientation.HORIZONTAL}
            spacing={10}
          >
            {screenshotActions.map((action, index) => (
              <button
                class={selectedIndexState((selectedIndex) =>
                  selectedIndex === index
                    ? "screenshot-menu__item screenshot-menu__item--selected"
                    : "screenshot-menu__item",
                )}
                cursor={pointerCursor}
                onClicked={() => triggerScreenshot(action)}
              >
                <box
                  class="screenshot-menu__item-content"
                  orientation={Gtk.Orientation.VERTICAL}
                  spacing={8}
                >
                  <image
                    class="screenshot-menu__item-icon"
                    iconName={action.iconName}
                  />
                  <label
                    class="screenshot-menu__item-label"
                    label={action.label}
                  />
                </box>
              </button>
            ))}
          </box>
        </box>
      </overlay>
    </window>
  )
}
