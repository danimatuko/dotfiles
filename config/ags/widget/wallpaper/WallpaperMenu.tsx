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

let wallpaperScroller: Gtk.ScrolledWindow | null = null

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

const filteredWallpapersState = queryState((query) =>
  getFilteredWallpapers(query, showAllWallpapersState(), currentTheme()),
)

const normalizeSelectedIndex = (nextIndex: number, resultCount: number) => {
  if (resultCount < 1) return 0
  if (nextIndex < 0) return resultCount - 1
  if (nextIndex >= resultCount) return 0
  return nextIndex
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
          setShowAllWallpapersState(false)
          wallpaperScroller?.vadjustment?.set_value(0)
        }
      }}
      application={app}
    >
      <Gtk.EventControllerKey
        onKeyPressed={(_, keyval) => {
          if (keyval === Gdk.KEY_Escape) {
            closeWallpaperMenu()
            return true
          }

          const filtered = getFilteredWallpapers(
            queryState(),
            showAllWallpapersState(),
            currentTheme(),
          )
          if (filtered.length < 1) return false

          if (keyval === Gdk.KEY_Down) {
            const nextIndex = normalizeSelectedIndex(
              selectedIndexState() + 1,
              filtered.length,
            )
            setSelectedIndexState(nextIndex)
            return true
          }

          if (keyval === Gdk.KEY_Up) {
            const nextIndex = normalizeSelectedIndex(
              selectedIndexState() - 1,
              filtered.length,
            )
            setSelectedIndexState(nextIndex)
            return true
          }

          if (keyval === Gdk.KEY_Return || keyval === Gdk.KEY_KP_Enter) {
            const selected = filtered[selectedIndexState()]
            if (!selected) return false
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
          widthRequest={760}
          halign={Gtk.Align.CENTER}
          valign={Gtk.Align.CENTER}
        >
          <box class="wallpaper-menu__header" spacing={8}>
            <label
              class="wallpaper-menu__title"
              label="Wallpaper Selector"
              xalign={0}
              hexpand
            />
            <label
              class="wallpaper-menu__count"
              label={queryState(() => {
                const filteredCount = filteredWallpapersState().length
                const modeLabel = showAllWallpapersState()
                  ? "all"
                  : `${currentTheme() || "theme"}`

                return `${filteredCount} files (${modeLabel})`
              })}
              xalign={1}
            />
          </box>

          <button
            class="wallpaper-menu__toggle"
            cursor={pointerCursor}
            halign={Gtk.Align.START}
            onClicked={() => {
              setShowAllWallpapersState(!showAllWallpapersState())
              setSelectedIndexState(0)
              wallpaperScroller?.vadjustment?.set_value(0)
            }}
          >
            <label
              label={showAllWallpapersState((showAllWallpapers) =>
                showAllWallpapers
                  ? "Show current theme wallpapers"
                  : "Show all wallpapers",
              )}
            />
          </button>

          <entry
            class="wallpaper-menu__search"
            placeholderText="Search wallpapers..."
            text={queryState}
            onNotifyText={(self) => {
              setQueryState(`${self.text ?? ""}`)
              setSelectedIndexState(0)
              wallpaperScroller?.vadjustment?.set_value(0)
            }}
            onActivate={() => {
              const filtered = getFilteredWallpapers(
                queryState(),
                showAllWallpapersState(),
                currentTheme(),
              )
              const selected = filtered[selectedIndexState()]
              if (!selected) return
              applyWallpaper(selected).catch(() => {})
            }}
            activatesDefault
          />

          <Gtk.ScrolledWindow
            onMap={(self) => {
              wallpaperScroller = self
            }}
            cssClasses={["wallpaper-menu__scroller"]}
            vscrollbarPolicy={Gtk.PolicyType.AUTOMATIC}
            hscrollbarPolicy={Gtk.PolicyType.NEVER}
            widthRequest={740}
            heightRequest={520}
          >
            <Gtk.FlowBox
              cssClasses={["wallpaper-menu__grid"]}
              columnSpacing={8}
              rowSpacing={8}
              minChildrenPerLine={3}
              maxChildrenPerLine={5}
              selectionMode={Gtk.SelectionMode.NONE}
            >
              <For
                each={filteredWallpapersState}
              >
                {(entry, index) => (
                  <button
                    class={selectedIndexState((selectedIndex) =>
                      selectedIndex === index.get()
                        ? "wallpaper-menu__item wallpaper-menu__item--selected"
                        : "wallpaper-menu__item",
                    )}
                    cursor={pointerCursor}
                    tooltipText={entry.path}
                    onClicked={() => {
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
        </box>
      </overlay>
    </window>
  )
}
