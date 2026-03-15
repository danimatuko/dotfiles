import AstalTray from "gi://AstalTray"
import { createBinding, For } from "ags"
import { Gdk, Gtk } from "ags/gtk4"

const tray = AstalTray.get_default()
const pointerCursor = Gdk.Cursor.new_from_name("pointer", null)

export default function SystemTray() {
  const items = createBinding(tray, "items").as((currentItems) =>
    [...(currentItems ?? [])].sort((a, b) => a.itemId.localeCompare(b.itemId)),
  )

  return (
    <box class="system-tray__list" spacing={6}>
      <For each={items}>
        {(item) => {
          const menuModel = item.menuModel
          const popover = menuModel ? Gtk.PopoverMenu.new_from_model(menuModel) : undefined
          if (popover && item.actionGroup) {
            popover.insert_action_group("dbusmenu", item.actionGroup)
          }

          return (
            <menubutton
              class="system-tray__item"
              cursor={pointerCursor}
              tooltipText={createBinding(item, "tooltipText")}
              popover={popover}
            >
              <image gicon={createBinding(item, "gicon")} />
            </menubutton>
          )
        }}
      </For>
    </box>
  )
}
