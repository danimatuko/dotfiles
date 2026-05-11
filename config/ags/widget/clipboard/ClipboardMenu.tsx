import app from "ags/gtk4/app"
import { For } from "ags"
import { Astal, Gdk, Gtk } from "ags/gtk4"
import { execAsync } from "ags/process"
import Pango from "gi://Pango"
import { createState } from "gnim"

import {
  clearClipboardHistory,
  copyClipboardEntry,
  deleteClipboardEntry,
  listClipboardEntries,
  type ClipboardEntry,
} from "../../services/clipboard"
import {
  closeClipboardMenu,
  isClipboardMenuVisible,
} from "../../services/clipboard-menu"
import { getThemeWindowClass } from "../../services/theme"

const [queryState, setQueryState] = createState("")
const [selectedIndexState, setSelectedIndexState] = createState(0)
const [clipboardEntriesState, setClipboardEntriesState] = createState<
  ClipboardEntry[]
>([])
const [loadErrorState, setLoadErrorState] = createState("")

const rowHeight = 42

let clipboardScroller: Gtk.ScrolledWindow | null = null
let clipboardSearchEntry: Gtk.Entry | null = null
const pointerCursor = Gdk.Cursor.new_from_name("pointer", null)

const normalize = (value: string) => value.toLowerCase().trim()

const resetSelection = () => {
  setSelectedIndexState(0)
  clipboardScroller?.vadjustment?.set_value(0)
}

const parseErrorMessage = (error: unknown) =>
  `${error}`.split("\n")[0]?.trim() || "unknown error"

const notifyClipboardError = (message: string) => {
  execAsync(["notify-send", "-u", "normal", "Clipboard", message]).catch(
    () => {},
  )
}

const loadClipboardEntries = async () => {
  try {
    setClipboardEntriesState(await listClipboardEntries())
    setLoadErrorState("")
  } catch (error) {
    const reason = parseErrorMessage(error)
    setClipboardEntriesState([])
    setLoadErrorState(`Could not load clipboard history: ${reason}`)
    notifyClipboardError(`Could not load clipboard history: ${reason}`)
  }
}

const getFilteredEntries = (query: string) => {
  const normalized = normalize(query)
  return clipboardEntriesState().filter((entry) => {
    if (!normalized.length) return true
    return normalize(entry.preview).includes(normalized)
  })
}

const normalizeSelectedIndex = (nextIndex: number, resultCount: number) => {
  if (resultCount < 1) return 0
  if (nextIndex < 0) return resultCount - 1
  if (nextIndex >= resultCount) return 0
  return nextIndex
}

const ensureSelectedVisible = (index: number) => {
  const adjustment = clipboardScroller?.vadjustment
  if (!adjustment) return

  const rowTop = index * rowHeight
  const rowBottom = rowTop + rowHeight
  const viewportTop = adjustment.value
  const viewportBottom = viewportTop + adjustment.pageSize

  if (rowTop < viewportTop) {
    adjustment.set_value(rowTop)
    return
  }

  if (rowBottom > viewportBottom) {
    adjustment.set_value(rowBottom - adjustment.pageSize)
  }
}

const copyEntry = async (entry: ClipboardEntry) => {
  try {
    await copyClipboardEntry(entry)
    closeClipboardMenu()
  } catch {
    notifyClipboardError("Could not copy clipboard entry")
  }
}

const deleteEntry = async (entry: ClipboardEntry) => {
  try {
    await deleteClipboardEntry(entry)
    await loadClipboardEntries()
    resetSelection()
  } catch {
    notifyClipboardError("Could not delete clipboard entry")
  }
}

const clearHistory = async () => {
  try {
    await clearClipboardHistory()
    setClipboardEntriesState([])
    setLoadErrorState("")
    resetSelection()
  } catch {
    notifyClipboardError("Could not clear clipboard history")
  }
}

export default function ClipboardMenu(gdkmonitor: Gdk.Monitor) {
  const { TOP, LEFT, RIGHT, BOTTOM } = Astal.WindowAnchor

  return (
    <window
      name="clipboard-menu"
      namespace="ags-clipboard-menu"
      class={getThemeWindowClass("ClipboardMenu")}
      visible={isClipboardMenuVisible}
      gdkmonitor={gdkmonitor}
      layer={Astal.Layer.TOP}
      anchor={TOP | LEFT | RIGHT | BOTTOM}
      exclusivity={Astal.Exclusivity.IGNORE}
      keymode={Astal.Keymode.ON_DEMAND}
      onNotifyVisible={(self) => {
        if (self.visible) {
          self.present()
          setQueryState("")
          resetSelection()
          clipboardSearchEntry?.grab_focus()
          loadClipboardEntries().catch(() => {})
        }
      }}
      application={app}
    >
      <Gtk.EventControllerKey
        propagationPhase={Gtk.PropagationPhase.CAPTURE}
        onKeyPressed={(_, keyval) => {
          if (keyval === Gdk.KEY_Escape) {
            closeClipboardMenu()
            return true
          }

          const filtered = getFilteredEntries(queryState())
          if (filtered.length < 1) {
            if (keyval === Gdk.KEY_Return || keyval === Gdk.KEY_KP_Enter) {
              return true
            }

            return false
          }

          if (keyval === Gdk.KEY_Down) {
            const nextIndex = normalizeSelectedIndex(
              selectedIndexState() + 1,
              filtered.length,
            )
            setSelectedIndexState(nextIndex)
            ensureSelectedVisible(nextIndex)
            return true
          }

          if (keyval === Gdk.KEY_Up) {
            const nextIndex = normalizeSelectedIndex(
              selectedIndexState() - 1,
              filtered.length,
            )
            setSelectedIndexState(nextIndex)
            ensureSelectedVisible(nextIndex)
            return true
          }

          if (keyval === Gdk.KEY_Return || keyval === Gdk.KEY_KP_Enter) {
            const selected = filtered[selectedIndexState()]
            if (!selected) return false
            copyEntry(selected).catch(() => {})
            return true
          }

          return false
        }}
      />

      <overlay class="clipboard-menu" hexpand vexpand>
        <button
          class="clipboard-menu__backdrop"
          cursor={pointerCursor}
          onClicked={closeClipboardMenu}
          hexpand
          vexpand
        />

        <box
          class="clipboard-menu__panel"
          orientation={Gtk.Orientation.VERTICAL}
          spacing={10}
          widthRequest={680}
          halign={Gtk.Align.CENTER}
          valign={Gtk.Align.CENTER}
        >
          <box class="clipboard-menu__header" spacing={8}>
            <image
              class="clipboard-menu__title-icon"
              iconName="edit-paste-symbolic"
            />
            <label
              class="clipboard-menu__title"
              label="Clipboard History"
              xalign={0}
              hexpand
            />
            <label
              class="clipboard-menu__count"
              label={queryState((query) => {
                const total = clipboardEntriesState().length
                const visible = getFilteredEntries(query).length
                if (total === 0) return "0 items"
                if (query.trim().length > 0) return `${visible}/${total}`
                return `${total} items`
              })}
            />
            <button
              class="clipboard-menu__clear"
              label="Clear"
              onClicked={() => {
                clearHistory().catch(() => {})
              }}
              tooltipText="Clear all clipboard history"
            />
          </box>

          <label
            class="clipboard-menu__hint"
            label="Use Up/Down to navigate, Enter to copy, Esc to close"
            xalign={0}
          />

          <entry
            class="clipboard-menu__search"
            placeholderText="Search clipboard..."
            text={queryState}
            onMap={(self) => {
              clipboardSearchEntry = self
            }}
            onNotifyText={(self) => {
              setQueryState(`${self.text ?? ""}`)
              resetSelection()
            }}
          />

          <Gtk.ScrolledWindow
            onMap={(self) => {
              clipboardScroller = self
            }}
            cssClasses={["clipboard-menu__scroller"]}
            vscrollbarPolicy={Gtk.PolicyType.AUTOMATIC}
            hscrollbarPolicy={Gtk.PolicyType.NEVER}
            widthRequest={650}
            heightRequest={400}
          >
            <box
              class="clipboard-menu__list"
              orientation={Gtk.Orientation.VERTICAL}
              spacing={4}
            >
              <label
                class="clipboard-menu__empty"
                visible={queryState(
                  (query) => getFilteredEntries(query).length === 0,
                )}
                label={loadErrorState(
                  (message) => message || "Clipboard history is empty",
                )}
                xalign={0}
              />
              <For each={queryState((query) => getFilteredEntries(query))}>
                {(entry: ClipboardEntry, index) => (
                  <box class="clipboard-menu__row" spacing={6}>
                    <button
                      class={selectedIndexState((selectedIndex) =>
                        selectedIndex === index.get()
                          ? "clipboard-menu__item clipboard-menu__item--selected"
                          : "clipboard-menu__item",
                      )}
                      cursor={pointerCursor}
                      onClicked={() => {
                        copyEntry(entry).catch(() => {})
                      }}
                      hexpand
                      tooltipText="Copy entry"
                    >
                      <label
                        class="clipboard-menu__item-label"
                        label={entry.preview}
                        xalign={0}
                        hexpand
                        ellipsize={Pango.EllipsizeMode.END}
                        singleLineMode
                        maxWidthChars={90}
                      />
                    </button>
                    <button
                      class="clipboard-menu__delete"
                      cursor={pointerCursor}
                      onClicked={() => {
                        deleteEntry(entry).catch(() => {})
                      }}
                      tooltipText="Remove entry"
                    >
                      <image
                        class="clipboard-menu__delete-icon"
                        iconName="user-trash-symbolic"
                      />
                    </button>
                  </box>
                )}
              </For>
            </box>
          </Gtk.ScrolledWindow>
        </box>
      </overlay>
    </window>
  )
}
