import { Gdk } from "ags/gtk4"

import { isSidebarVisible, toggleSidebar } from "../../services/sidebar"

export default function SidebarToggleButton() {
  return (
    <button
      class={isSidebarVisible((visible) =>
        visible
          ? "status-indicator status-indicator--sidebar status-indicator--sidebar--active"
          : "status-indicator status-indicator--sidebar",
      )}
      cursor={Gdk.Cursor.new_from_name("pointer", null)}
      onClicked={toggleSidebar}
      tooltipText={isSidebarVisible((visible) =>
        visible ? "Close quick settings" : "Open quick settings",
      )}
    >
      <image
        iconName={isSidebarVisible((visible) =>
          visible ? "window-close-symbolic" : "open-menu-symbolic",
        )}
      />
    </button>
  )
}
