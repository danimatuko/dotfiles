import { Gdk } from "ags/gtk4"

import { isSidebarVisible, toggleSidebar } from "../../services/sidebar"

export default function SidebarToggleButton() {
  return (
    <button
      class={isSidebarVisible((visible) =>
        visible
          ? "quick-settings__toggle-button quick-settings__toggle-button--active quick-settings__sidebar-toggle"
          : "quick-settings__toggle-button quick-settings__sidebar-toggle",
      )}
      cursor={Gdk.Cursor.new_from_name("pointer", null)}
      onClicked={toggleSidebar}
      tooltipText="Toggle sidebar"
    >
      <label class="quick-settings__sidebar-toggle-glyph" label="☰" />
    </button>
  )
}
