import app from "ags/gtk4/app"
import { For } from "ags"
import { Astal, Gdk, Gtk } from "ags/gtk4"
import { execAsync } from "ags/process"
import GLib from "gi://GLib"
import Gio from "gi://Gio"
import Pango from "gi://Pango"
import { createState } from "gnim"

import {
  closeWallpaperMenu,
  getWallpaperEntries,
  isWallpaperMenuVisible,
  type WallpaperEntry,
} from "../../services/wallpaper-menu"
import { currentTheme, getThemeWindowClass } from "../../services/theme"

const [selectedIndexState, setSelectedIndexState] = createState(0)

const wallpaperItemEstimatedWidth = 288
const wallpaperItemColumnSpacing = 8
const wallpaperMenuScrollerHeight = 330
const wallpaperDockTransitionDuration = 240
const wallpaperScrollAnimationDuration = 160
const wallpaperThumbWidth = 260
const wallpaperThumbHeight = 172

let wallpaperScroller: Gtk.ScrolledWindow | null = null
let wallpaperItemButtons: Gtk.Button[] = []
let scrollAnimationSourceId: number | null = null
const [panelState, setPanelState] = createState<"hidden" | "open">("hidden")
let closeTimerId: number | null = null
let openTimerId: number | null = null

const cancelCloseTimer = () => {
  if (closeTimerId !== null) {
    GLib.Source.remove(closeTimerId)
    closeTimerId = null
  }
}

const cancelOpenTimer = () => {
  if (openTimerId !== null) {
    GLib.Source.remove(openTimerId)
    openTimerId = null
  }
}

const requestClosePanel = () => {
  cancelOpenTimer()
  setPanelState("hidden")
  cancelCloseTimer()
  closeTimerId = GLib.timeout_add(
    GLib.PRIORITY_DEFAULT,
    wallpaperDockTransitionDuration,
    () => {
      closeWallpaperMenu()
      closeTimerId = null
      return GLib.SOURCE_REMOVE
    },
  )
}

const pointerCursor = Gdk.Cursor.new_from_name("pointer", null)

const normalize = (value: string) => value.toLowerCase().trim()

const isThemeWallpaper = (entry: WallpaperEntry, themeName: string) => {
  const normalizedThemeName = normalize(themeName)
  if (!normalizedThemeName.length) return true

  const [topLevelDirectory] = normalize(entry.relativePath).split("/")
  return topLevelDirectory === normalizedThemeName
}

const getVisibleWallpapers = () =>
  getWallpaperEntries().filter((entry) =>
    isThemeWallpaper(entry, currentTheme()),
  )

const [visibleWallpapersState, setVisibleWallpapersState] = createState<
  WallpaperEntry[]
>([])

const refreshVisibleWallpapers = () => {
  setVisibleWallpapersState(getVisibleWallpapers())
  wallpaperItemButtons = []
}

const reorderSelectedOnTop = () => {
  const selectedBtn = wallpaperItemButtons[selectedIndexState()]
  if (!selectedBtn) return

  const parent = selectedBtn.get_parent()
  if (!parent || !(parent instanceof Gtk.Box)) return

  parent.reorder_child_after(selectedBtn, null)
}

const normalizeSelectedIndex = (nextIndex: number, resultCount: number) => {
  if (resultCount < 1) return 0
  if (nextIndex < 0) return resultCount - 1
  if (nextIndex >= resultCount) return 0
  return nextIndex
}

const getDirectionalSelectedIndex = (
  keyval: number,
  selectedIndex: number,
  resultCount: number,
) => {
  switch (keyval) {
    case Gdk.KEY_Left:
      return normalizeSelectedIndex(selectedIndex - 1, resultCount)
    case Gdk.KEY_Right:
      return normalizeSelectedIndex(selectedIndex + 1, resultCount)
    default:
      return selectedIndex
  }
}

const ensureSelectedWallpaperVisible = (selectedIndex: number) => {
  const adjustment = wallpaperScroller?.hadjustment
  if (!adjustment) return

  const itemWidth = wallpaperItemEstimatedWidth + wallpaperItemColumnSpacing
  const selectedStart = selectedIndex * itemWidth
  const selectedEnd = selectedStart + itemWidth
  const viewportStart = adjustment.value
  const viewportEnd = viewportStart + adjustment.page_size

  let targetValue: number | null = null

  if (selectedStart < viewportStart) {
    targetValue = selectedStart
  }

  if (selectedEnd > viewportEnd) {
    targetValue = selectedEnd - adjustment.page_size
  }

  if (targetValue === null) return

  if (scrollAnimationSourceId !== null) {
    GLib.Source.remove(scrollAnimationSourceId)
    scrollAnimationSourceId = null
  }

  const startValue = adjustment.value
  const animationStart = GLib.get_monotonic_time()
  const durationMicroseconds = wallpaperScrollAnimationDuration * 1000

  scrollAnimationSourceId = GLib.timeout_add(GLib.PRIORITY_DEFAULT, 16, () => {
    const elapsed = GLib.get_monotonic_time() - animationStart
    const progress = Math.min(elapsed / durationMicroseconds, 1)
    const easedProgress = 1 - (1 - progress) * (1 - progress)
    const nextValue = startValue + (targetValue - startValue) * easedProgress

    adjustment.set_value(nextValue)

    if (progress >= 1) {
      scrollAnimationSourceId = null
      return GLib.SOURCE_REMOVE
    }

    return GLib.SOURCE_CONTINUE
  })
}

const sleep = (milliseconds: number) =>
  new Promise<void>((resolve) => {
    GLib.timeout_add(GLib.PRIORITY_DEFAULT, milliseconds, () => {
      resolve()
      return GLib.SOURCE_REMOVE
    })
  })

const ensureWallpaperBackend = async () => {
  try {
    await execAsync(["awww", "query"])
    return true
  } catch {
    try {
      execAsync(["awww-daemon"]).catch(() => {})
      await sleep(220)
      await execAsync(["awww", "query"])
      return true
    } catch {
      return false
    }
  }
}

const applyWallpaper = async (entry: WallpaperEntry) => {
  const backendReady = await ensureWallpaperBackend()

  if (!backendReady) {
    execAsync([
      "notify-send",
      "-u",
      "critical",
      "Wallpaper",
      "No wallpaper backend found (need awww)",
    ]).catch(() => {})
    return
  }

  try {
    await execAsync(["awww", "img", entry.path])
  } catch {
    execAsync([
      "notify-send",
      "-u",
      "normal",
      "Wallpaper",
      "Could not apply selected wallpaper",
    ]).catch(() => {})
  }
}

export default function WallpaperMenu(gdkmonitor: Gdk.Monitor) {
  const { TOP, LEFT, RIGHT, BOTTOM } = Astal.WindowAnchor

  return (
    <window
      name="wallpaper-menu"
      namespace="ags-wallpaper-menu"
      class={getThemeWindowClass("WallpaperMenu")}
      visible={isWallpaperMenuVisible}
      gdkmonitor={gdkmonitor}
      layer={Astal.Layer.OVERLAY}
      anchor={TOP | LEFT | RIGHT | BOTTOM}
      exclusivity={Astal.Exclusivity.IGNORE}
      keymode={Astal.Keymode.ON_DEMAND}
      onNotifyVisible={(self) => {
        if (self.visible) {
          self.present()
          setSelectedIndexState(0)
          refreshVisibleWallpapers()
          wallpaperScroller?.hadjustment?.set_value(0)
          cancelCloseTimer()
          cancelOpenTimer()
          setPanelState("hidden")
          openTimerId = GLib.idle_add(GLib.PRIORITY_DEFAULT, () => {
            setPanelState("open")
            openTimerId = null
            return GLib.SOURCE_REMOVE
          })
        }
      }}
      application={app}
    >
      <Gtk.EventControllerKey
        propagationPhase={Gtk.PropagationPhase.CAPTURE}
        onKeyPressed={(_, keyval) => {
          if (keyval === Gdk.KEY_Escape) {
            requestClosePanel()
            return true
          }

          const isGridArrowKey =
            keyval === Gdk.KEY_Left || keyval === Gdk.KEY_Right

          if (isGridArrowKey) {
            const filtered = visibleWallpapersState()
            if (filtered.length < 1) return true

            const nextIndex = getDirectionalSelectedIndex(
              keyval,
              selectedIndexState(),
              filtered.length,
            )
            setSelectedIndexState(nextIndex)
            ensureSelectedWallpaperVisible(nextIndex)
            reorderSelectedOnTop()
            return true
          }

          if (keyval === Gdk.KEY_Return || keyval === Gdk.KEY_KP_Enter) {
            const filtered = visibleWallpapersState()
            const selected = filtered[selectedIndexState()]
            if (!selected) return true
            applyWallpaper(selected).catch(() => {})
            return true
          }

          return false
        }}
      />

      <overlay class="wallpaper-menu" hexpand vexpand>
        <box class="wallpaper-menu__backdrop" hexpand vexpand>
          <Gtk.GestureClick
            button={0}
            onPressed={() => {
              requestClosePanel()
            }}
          />
        </box>

        <box
          class={panelState((state) =>
            state === "open"
              ? "wallpaper-menu__panel wallpaper-menu__panel--open"
              : "wallpaper-menu__panel",
          )}
          orientation={Gtk.Orientation.VERTICAL}
          spacing={0}
          hexpand
          halign={Gtk.Align.FILL}
          valign={Gtk.Align.END}
        >
          <Gtk.ScrolledWindow
            onMap={(self) => {
              wallpaperScroller = self
            }}
            cssClasses={["wallpaper-menu__scroller"]}
            minContentHeight={wallpaperMenuScrollerHeight}
            propagateNaturalHeight={false}
            vscrollbarPolicy={Gtk.PolicyType.NEVER}
            hscrollbarPolicy={Gtk.PolicyType.AUTOMATIC}
            heightRequest={wallpaperMenuScrollerHeight}
          >
            <Gtk.EventControllerScroll
              propagationPhase={Gtk.PropagationPhase.CAPTURE}
              flags={Gtk.EventControllerScrollFlags.VERTICAL}
              onScroll={(_, dx, dy) => {
                const adj = wallpaperScroller?.hadjustment
                if (!adj) return false
                adj.set_value(adj.value + (dx || dy) * 4)
                return true
              }}
            />
            <box
              class="wallpaper-menu__grid"
              orientation={Gtk.Orientation.HORIZONTAL}
              spacing={8}
              valign={Gtk.Align.END}
            >
              <For each={visibleWallpapersState}>
                {(entry, index) => (
                  <button
                    canFocus={false}
                    class={selectedIndexState((selectedIndex) =>
                      selectedIndex === index.get()
                        ? "wallpaper-menu__item wallpaper-menu__item--selected"
                        : "wallpaper-menu__item",
                    )}
                    cursor={pointerCursor}
                    tooltipText={entry.path}
                    onMap={(self) => {
                      wallpaperItemButtons[index.get()] = self
                    }}
                    onClicked={() => {
                      setSelectedIndexState(index.get())
                      ensureSelectedWallpaperVisible(index.get())
                      reorderSelectedOnTop()
                      applyWallpaper(entry).catch(() => {})
                    }}
                  >
                    <box
                      class="wallpaper-menu__item-content"
                      orientation={Gtk.Orientation.VERTICAL}
                      spacing={4}
                    >
                      <box class="wallpaper-menu__thumb-frame">
                        <Gtk.Picture
                          class={selectedIndexState((selectedIndex) => {
                            const base = "wallpaper-menu__thumb"
                            const idx = index.get()
                            if (idx === selectedIndex) return base
                            const distance = Math.abs(idx - selectedIndex)
                            if (distance === 1)
                              return `${base} wallpaper-menu__thumb--adjacent`
                            return `${base} wallpaper-menu__thumb--distant`
                          })}
                          file={Gio.File.new_for_path(entry.path)}
                          contentFit={Gtk.ContentFit.COVER}
                          canShrink
                          widthRequest={wallpaperThumbWidth}
                          heightRequest={wallpaperThumbHeight}
                          halign={Gtk.Align.CENTER}
                          valign={Gtk.Align.CENTER}
                        />
                      </box>
                      <label
                        class="wallpaper-menu__item-name"
                        label={entry.name}
                        xalign={0}
                        justify={Gtk.Justification.LEFT}
                        ellipsize={Pango.EllipsizeMode.END}
                        singleLineMode
                        maxWidthChars={16}
                        hexpand
                      />
                    </box>
                  </button>
                )}
              </For>
            </box>
          </Gtk.ScrolledWindow>
        </box>
      </overlay>
    </window>
  )
}
