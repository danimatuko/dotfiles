import { Gdk } from "ags/gtk4"

import { isSidebarVisible, toggleSidebar } from "../../services/sidebar"

export default function SidebarToggleButton() {
  return (
    <button
      class={isSidebarVisible((visible) =>
        visible
          ? "bar__sidebar-toggle bar__sidebar-toggle--active"
          : "bar__sidebar-toggle",
      )}
      cursor={Gdk.Cursor.new_from_name("pointer", null)}
      onClicked={toggleSidebar}
      tooltipText="Toggle sidebar"
    >
      <label
        class={isSidebarVisible((visible) =>
          visible
            ? "bar__sidebar-toggle-glyph bar__sidebar-toggle-glyph--active"
            : "bar__sidebar-toggle-glyph",
        )}
        label={isSidebarVisible((visible) => (visible ? "✕" : "☰"))}
      />
    </button>
  )
}
