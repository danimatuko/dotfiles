import AstalHyprland from "gi://AstalHyprland"
import { createBinding, For } from "ags"
import { Gdk } from "ags/gtk4"

const pointerCursor = Gdk.Cursor.new_from_name("pointer", null)

export default function Workspaces() {
  const hyprland = AstalHyprland.get_default()
  const minWorkspaceSlots = 5

  const workspaces = createBinding(hyprland, "workspaces")
  const focused = createBinding(hyprland, "focusedWorkspace")

  const workspaceSlots = workspaces.as((wss) => {
    const byId = new Map<number, AstalHyprland.Workspace>()

    for (const ws of wss ?? []) {
      if (ws.id > 0) {
        byId.set(ws.id, ws)
      }
    }

    const ids = [...byId.keys()]
    for (let id = 1; id <= minWorkspaceSlots; id += 1) {
      if (!byId.has(id)) {
        ids.push(id)
      }
    }

    ids.sort((a, b) => a - b)

    return ids.map((id) => {
      const ws = byId.get(id)
      const clients = ws?.get_clients?.() ?? ws?.clients ?? []

      return {
        id,
        clients,
      }
    })
  })

  const getHasUrgentClient = (clients: unknown[]) =>
    clients.some((client) => Boolean((client as { urgent?: boolean }).urgent))

  return (
    <box class="workspaces">
      <For each={workspaceSlots}>
        {(workspace) => (
          <button
            class="workspaces__item"
            cursor={pointerCursor}
            cssClasses={focused.as((focusedWorkspace) => {
              const classes = ["workspaces__item"]
              const clients = workspace.clients

              if (focusedWorkspace?.id === workspace.id) {
                classes.push("workspaces__item--active")
              }
              if (clients.length > 0) {
                classes.push("workspaces__item--filled")
              }
              if (getHasUrgentClient(clients)) {
                classes.push("workspaces__item--urgent")
              }

              return classes
            })}
            tooltipText={`Workspace ${workspace.id}`}
            onClicked={() => hyprland.dispatch("workspace", `${workspace.id}`)}
          >
            <label
              class="workspaces__number"
              label={focused.as((focusedWorkspace) => {
                const isActive = focusedWorkspace?.id === workspace.id
                const hasUrgent = getHasUrgentClient(workspace.clients)

                if (hasUrgent) {
                  return "!"
                }

                if (isActive) {
                  return `${workspace.id}`
                }

                return workspace.clients.length > 0 ? "•" : "·"
              })}
            />
          </button>
        )}
      </For>
    </box>
  )
}
