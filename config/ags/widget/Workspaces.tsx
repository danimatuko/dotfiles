import AstalHyprland from "gi://AstalHyprland"
import { createBinding, For } from "ags"

export default function Workspaces() {
  const hyprland = AstalHyprland.get_default()

  const workspaces = createBinding(hyprland, "workspaces")
  const focused = createBinding(hyprland, "focusedWorkspace")

  const sortedWorkspaces = workspaces.as((wss) =>
    (wss ?? []).filter((ws) => ws.id > 0).sort((a, b) => a.id - b.id),
  )

  return (
    <box class="workspaces">
      <For each={sortedWorkspaces}>
        {(ws) => (
          <button
            class="workspaces__item"
            cssClasses={focused.as((focusedWorkspace) => {
              const classes = ["workspaces__item"]
              const clients = ws.get_clients?.() ?? ws.clients ?? []

              if (focusedWorkspace?.id === ws.id) {
                classes.push("workspaces__item--active")
              }
              if (clients.length > 0) {
                classes.push("workspaces__item--filled")
              }
              if (
                clients.some((client) =>
                  Boolean((client as { urgent?: boolean }).urgent),
                )
              ) {
                classes.push("workspaces__item--urgent")
              }

              return classes
            })}
            onClicked={() => hyprland.dispatch("workspace", `${ws.id}`)}
          >
            <box class="workspaces__tile" />
          </button>
        )}
      </For>
    </box>
  )
}
