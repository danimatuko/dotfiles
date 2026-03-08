import AstalTray from "gi://AstalTray"
import { createBinding, For } from "ags"
import { Gtk } from "ags/gtk4"

const tray = AstalTray.get_default()

function createTrayPopover(item: AstalTray.TrayItem) {
  const menuModel = item.menuModel
  if (!menuModel) return undefined

  const popover = Gtk.PopoverMenu.new_from_model(menuModel)
  const actionGroup = item.actionGroup

  if (actionGroup) {
    popover.insert_action_group("dbusmenu", actionGroup)
  }

  return popover
}

export default function SystemTray() {
  const items = createBinding(tray, "items").as((currentItems) =>
    [...(currentItems ?? [])].sort((a, b) => a.itemId.localeCompare(b.itemId)),
  )

  return (
    <box class="system-tray__list" spacing={6}>
      <For each={items}>
        {(item) => {
          const popover = createTrayPopover(item)

          return (
            <menubutton
              class="system-tray__item"
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
