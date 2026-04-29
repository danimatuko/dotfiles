import app from "ags/gtk4/app"
import { For } from "ags"
import { Astal, Gdk, Gtk } from "ags/gtk4"
import Gio from "gi://Gio"
import Pango from "gi://Pango"
import { createState } from "gnim"

import { closeLauncher, isLauncherVisible } from "../../services/launcher"

type LauncherApp = {
  id: string
  name: string
  description: string
  iconName: string
  appInfo: Gio.AppInfo
}

const installedApps = Gio.AppInfo.get_all()
  .filter((appInfo) => appInfo.should_show())
  .map((appInfo) => {
    const id = `${appInfo.get_id() ?? ""}`.trim()
    const name = `${appInfo.get_display_name() ?? appInfo.get_name() ?? ""}`.trim()
    const description = `${appInfo.get_description() ?? ""}`.trim()
    const iconName = `${appInfo.get_icon()?.to_string() ?? "application-x-executable-symbolic"}`.trim()

    return {
      id: id || name,
      name,
      description,
      iconName: iconName || "application-x-executable-symbolic",
      appInfo,
    }
  })
  .filter((entry) => entry.name.length > 0)
  .sort((a, b) => a.name.localeCompare(b.name))

const [queryState, setQueryState] = createState("")
const [selectedIndexState, setSelectedIndexState] = createState(0)
let launcherScroller: Gtk.ScrolledWindow | null = null

const normalize = (value: string) => value.toLowerCase().trim()

const matchesQuery = (entry: LauncherApp, query: string) => {
  if (!query.length) return true

  const haystack = normalize(
    `${entry.name} ${entry.description} ${entry.id.replace(".desktop", "")}`,
  )
  return haystack.includes(query)
}

const getFilteredApps = (query: string) => {
  const normalized = normalize(query)
  return installedApps.filter((entry) => matchesQuery(entry, normalized))
}

const normalizeSelectedIndex = (nextIndex: number, resultCount: number) => {
  if (resultCount < 1) return 0
  if (nextIndex < 0) return resultCount - 1
  if (nextIndex >= resultCount) return 0
  return nextIndex
}

const ensureSelectedVisible = (index: number) => {
  if (!launcherScroller) return

  const adjustment = launcherScroller.vadjustment
  if (!adjustment) return

  const rowHeight = 34
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

const launchApp = (entry: LauncherApp) => {
  try {
    entry.appInfo.launch([], null)
  } catch {}

  setQueryState("")
  setSelectedIndexState(0)
  closeLauncher()
}

export default function AppLauncher(gdkmonitor: Gdk.Monitor) {
  const { TOP, LEFT, RIGHT, BOTTOM } = Astal.WindowAnchor

  return (
    <window
      name="app-launcher"
      namespace="ags-app-launcher"
      class="AppLauncher"
      visible={isLauncherVisible}
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
          launcherScroller?.vadjustment?.set_value(0)
        }
      }}
      application={app}
    >
      <Gtk.EventControllerKey
        onKeyPressed={(_, keyval) => {
          if (keyval === Gdk.KEY_Escape) {
            closeLauncher()
            return true
          }

          const filtered = getFilteredApps(queryState())
          if (filtered.length < 1) return false

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
            launchApp(selected)
            return true
          }

          return false
        }}
      />
      <overlay class="app-launcher" hexpand vexpand>
        <button
          class="app-launcher__backdrop"
          cursor={Gdk.Cursor.new_from_name("default", null)}
          onClicked={closeLauncher}
          hexpand
          vexpand
        />
        <box
          class="app-launcher__panel"
          orientation={Gtk.Orientation.VERTICAL}
          spacing={8}
          widthRequest={620}
          halign={Gtk.Align.CENTER}
          valign={Gtk.Align.CENTER}
        >
          <entry
            class="app-launcher__search"
            placeholderText="Search apps..."
            text={queryState}
            onNotifyText={(self) => {
              setQueryState(`${self.text ?? ""}`)
              setSelectedIndexState(0)
              launcherScroller?.vadjustment?.set_value(0)
            }}
            onActivate={() => {
              const filtered = getFilteredApps(queryState())
              const selected = filtered[selectedIndexState()]
              if (!selected) return
              launchApp(selected)
            }}
            activatesDefault
          />
          <Gtk.ScrolledWindow
            onMap={(self) => {
              launcherScroller = self
            }}
            cssClasses={[
              "app-launcher__scroller",
            ]}
            vscrollbarPolicy={Gtk.PolicyType.AUTOMATIC}
            hscrollbarPolicy={Gtk.PolicyType.NEVER}
            widthRequest={600}
            heightRequest={520}
          >
            <box
              class="app-launcher__list"
              orientation={Gtk.Orientation.VERTICAL}
              spacing={4}
            >
              <For each={queryState((query) => getFilteredApps(query))}>
                {(entry, index) => (
                  <button
                    class={selectedIndexState((selectedIndex) =>
                      selectedIndex === index.get()
                        ? "app-launcher__item app-launcher__item--selected"
                        : "app-launcher__item",
                    )}
                    onClicked={() => launchApp(entry)}
                    tooltipText={entry.id}
                  >
                    <box class="app-launcher__item-content" hexpand>
                      <image
                        class="app-launcher__item-icon"
                        iconName={entry.iconName}
                      />
                      <label
                        class="app-launcher__item-name"
                        label={entry.name}
                        xalign={0}
                        hexpand
                        ellipsize={Pango.EllipsizeMode.END}
                        singleLineMode
                        maxWidthChars={34}
                      />
                      <label
                        class="app-launcher__item-desc"
                        label={entry.description}
                        xalign={1}
                        ellipsize={Pango.EllipsizeMode.END}
                        singleLineMode
                        maxWidthChars={28}
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
