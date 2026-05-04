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

const [queryState, setQueryState] = createState("")
const [selectedIndexState, setSelectedIndexState] = createState(0)
const [showAllWallpapersState, setShowAllWallpapersState] = createState(false)
const [focusModeState, setFocusModeState] = createState<
  "search" | "toggle" | "grid"
>("search")

const wallpaperGridColumns = 3
const wallpaperItemEstimatedHeight = 182
const wallpaperGridRowSpacing = 8
const wallpaperMenuPanelWidth = 760
const wallpaperMenuScrollerWidth = 740

let wallpaperScroller: Gtk.ScrolledWindow | null = null
let wallpaperSearchEntry: Gtk.Entry | null = null
let wallpaperToggleSwitch: Gtk.Switch | null = null

const pointerCursor = Gdk.Cursor.new_from_name("pointer", null)

const normalize = (value: string) => value.toLowerCase().trim()

const isThemeWallpaper = (entry: WallpaperEntry, themeName: string) => {
  const normalizedThemeName = normalize(themeName)
  if (!normalizedThemeName.length) return true

  const [topLevelDirectory] = normalize(entry.relativePath).split("/")
  return topLevelDirectory === normalizedThemeName
}

const getFilteredWallpapers = (
  query: string,
  showAllWallpapers: boolean,
  themeName: string,
) => {
  const normalized = normalize(query)
  return getWallpaperEntries().filter((entry) => {
    if (!showAllWallpapers && !isThemeWallpaper(entry, themeName)) return false
    if (!normalized.length) return true
    return normalize(`${entry.name} ${entry.relativePath}`).includes(normalized)
  })
}

const getVisibleWallpapers = () =>
  getFilteredWallpapers(queryState(), showAllWallpapersState(), currentTheme())

const [visibleWallpapersState, setVisibleWallpapersState] = createState<
  WallpaperEntry[]
>([])

const refreshVisibleWallpapers = () => {
  setVisibleWallpapersState(getVisibleWallpapers())
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
    case Gdk.KEY_Up:
      return normalizeSelectedIndex(selectedIndex - wallpaperGridColumns, resultCount)
    case Gdk.KEY_Down:
      return normalizeSelectedIndex(selectedIndex + wallpaperGridColumns, resultCount)
    default:
      return selectedIndex
  }
}

const ensureSelectedWallpaperVisible = (selectedIndex: number) => {
  const adjustment = wallpaperScroller?.vadjustment
  if (!adjustment) return

  const rowHeight = wallpaperItemEstimatedHeight + wallpaperGridRowSpacing
  const selectedRow = Math.floor(selectedIndex / wallpaperGridColumns)
  const selectedTop = selectedRow * rowHeight
  const selectedBottom = selectedTop + rowHeight
  const viewportTop = adjustment.value
  const viewportBottom = viewportTop + adjustment.page_size

  if (selectedTop < viewportTop) {
    adjustment.set_value(selectedTop)
    return
  }

  if (selectedBottom > viewportBottom) {
    adjustment.set_value(selectedBottom - adjustment.page_size)
  }
}

const focusOrder: Array<"search" | "toggle" | "grid"> = [
  "search",
  "toggle",
  "grid",
]

const setFocusMode = (nextMode: "search" | "toggle" | "grid") => {
  setFocusModeState(nextMode)

  if (nextMode === "search") {
    wallpaperSearchEntry?.grab_focus()
    return
  }

  if (nextMode === "toggle") {
    wallpaperToggleSwitch?.grab_focus()
  }
}

const cycleFocusMode = (step: number) => {
  const currentIndex = focusOrder.indexOf(focusModeState())
  const nextIndex =
    (currentIndex + step + focusOrder.length) % focusOrder.length
  setFocusMode(focusOrder[nextIndex])
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
      layer={Astal.Layer.TOP}
      anchor={TOP | LEFT | RIGHT | BOTTOM}
      exclusivity={Astal.Exclusivity.IGNORE}
      keymode={Astal.Keymode.ON_DEMAND}
      onNotifyVisible={(self) => {
        if (self.visible) {
          self.present()
          setQueryState("")
          setSelectedIndexState(0)
          setFocusMode("search")
          refreshVisibleWallpapers()
          wallpaperScroller?.vadjustment?.set_value(0)
        }
      }}
      application={app}
    >
      <Gtk.EventControllerKey
        propagationPhase={Gtk.PropagationPhase.CAPTURE}
        onKeyPressed={(_, keyval, _keycode, state) => {
          if (keyval === Gdk.KEY_Escape) {
            closeWallpaperMenu()
            return true
          }

          if (keyval === Gdk.KEY_Tab) {
            const isShiftTab =
              (state & Gdk.ModifierType.SHIFT_MASK) === Gdk.ModifierType.SHIFT_MASK
            cycleFocusMode(isShiftTab ? -1 : 1)
            return true
          }

          if (focusModeState() === "toggle") {
            if (
              keyval === Gdk.KEY_Return ||
              keyval === Gdk.KEY_KP_Enter ||
              keyval === Gdk.KEY_space
            ) {
              const nextShowAll = !showAllWallpapersState()
              wallpaperToggleSwitch?.set_active(nextShowAll)
              setShowAllWallpapersState(nextShowAll)
              setSelectedIndexState(0)
              refreshVisibleWallpapers()
              wallpaperScroller?.vadjustment?.set_value(0)
              return true
            }

            return false
          }

          const isGridArrowKey =
            keyval === Gdk.KEY_Left ||
            keyval === Gdk.KEY_Right ||
            keyval === Gdk.KEY_Up ||
            keyval === Gdk.KEY_Down

          if (focusModeState() === "grid" && isGridArrowKey) {
            const filtered = visibleWallpapersState()
            if (filtered.length < 1) return true

            const nextIndex = getDirectionalSelectedIndex(
              keyval,
              selectedIndexState(),
              filtered.length,
            )
            setSelectedIndexState(nextIndex)
            ensureSelectedWallpaperVisible(nextIndex)
            return true
          }

          if (
            focusModeState() === "grid" &&
            (keyval === Gdk.KEY_Return || keyval === Gdk.KEY_KP_Enter)
          ) {
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
              closeWallpaperMenu()
            }}
          />
        </box>

        <box
          class="wallpaper-menu__panel"
          orientation={Gtk.Orientation.VERTICAL}
          spacing={8}
          widthRequest={wallpaperMenuPanelWidth}
          halign={Gtk.Align.CENTER}
          valign={Gtk.Align.CENTER}
        >
          <box class="wallpaper-menu__header" spacing={8}>
            <label
              class="wallpaper-menu__title"
              label="Wallpapers"
              xalign={0}
              hexpand
            />
            <label
              class="wallpaper-menu__count"
              label={queryState(() => {
                const filteredCount = visibleWallpapersState().length
                const modeLabel = showAllWallpapersState()
                  ? "all"
                  : `${currentTheme() || "theme"}`

                return `${filteredCount} files (${modeLabel})`
              })}
              xalign={1}
            />
            <label class="wallpaper-menu__toggle-label" label="Theme only" xalign={0} />
            <switch
              class={focusModeState((focusMode) =>
                focusMode === "toggle"
                  ? "wallpaper-menu__switch wallpaper-menu__switch--focused"
                  : "wallpaper-menu__switch",
              )}
              cursor={pointerCursor}
              valign={Gtk.Align.CENTER}
              active={showAllWallpapersState((showAll) => !showAll)}
              onMap={(self) => {
                wallpaperToggleSwitch = self
              }}
              onNotifyActive={(self) => {
                setFocusModeState("toggle")
                setShowAllWallpapersState(!self.active)
                setSelectedIndexState(0)
                refreshVisibleWallpapers()
                wallpaperScroller?.vadjustment?.set_value(0)
              }}
            />
            <label
              class="wallpaper-menu__toggle-state"
              label={showAllWallpapersState((showAll) =>
                showAll ? "all" : "theme",
              )}
              xalign={0}
            />
          </box>

          <entry
            class="wallpaper-menu__search"
            placeholderText="Search wallpapers by name or path..."
            text={queryState}
            onMap={(self) => {
              wallpaperSearchEntry = self
            }}
            onActivate={() => {
              setFocusMode("grid")
            }}
            onNotifyHasFocus={(self) => {
              if (self.hasFocus) setFocusModeState("search")
            }}
            onNotifyText={(self) => {
              setQueryState(`${self.text ?? ""}`)
              setSelectedIndexState(0)
              refreshVisibleWallpapers()
              wallpaperScroller?.vadjustment?.set_value(0)
            }}
            activatesDefault
          />

          <Gtk.ScrolledWindow
            onMap={(self) => {
              wallpaperScroller = self
            }}
            cssClasses={["wallpaper-menu__scroller"]}
            minContentWidth={wallpaperMenuScrollerWidth}
            propagateNaturalWidth={false}
            vscrollbarPolicy={Gtk.PolicyType.AUTOMATIC}
            hscrollbarPolicy={Gtk.PolicyType.NEVER}
            widthRequest={wallpaperMenuScrollerWidth}
            heightRequest={520}
          >
            <Gtk.FlowBox
              cssClasses={["wallpaper-menu__grid"]}
              columnSpacing={8}
              rowSpacing={8}
              minChildrenPerLine={3}
              maxChildrenPerLine={3}
              selectionMode={Gtk.SelectionMode.NONE}
            >
              <For
                each={visibleWallpapersState}
              >
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
                    onClicked={() => {
                      setFocusMode("grid")
                      setSelectedIndexState(index.get())
                      applyWallpaper(entry).catch(() => {})
                    }}
                  >
                    <box
                      class="wallpaper-menu__item-content"
                      orientation={Gtk.Orientation.VERTICAL}
                      spacing={6}
                    >
                      <Gtk.Picture
                        class="wallpaper-menu__thumb"
                        file={Gio.File.new_for_path(entry.path)}
                        contentFit={Gtk.ContentFit.COVER}
                        canShrink
                        widthRequest={240}
                        heightRequest={148}
                        hexpand
                      />
                      <label
                        class="wallpaper-menu__item-name"
                        label={entry.name}
                        xalign={0}
                        justify={Gtk.Justification.LEFT}
                        ellipsize={Pango.EllipsizeMode.END}
                        singleLineMode
                        maxWidthChars={20}
                      />
                    </box>
                  </button>
                )}
              </For>
            </Gtk.FlowBox>
          </Gtk.ScrolledWindow>

          <box class="wallpaper-menu__meta" spacing={8}>
            <label
              class="wallpaper-menu__hint"
              label="Tab: search/toggle/grid  •  Arrows: move  •  Enter: apply  •  Esc: close"
              xalign={0}
              hexpand
            />
          </box>
        </box>
      </overlay>
    </window>
  )
}
