import { Gdk } from "ags/gtk4"

import { isSidebarVisible, toggleSidebar } from "../../services/sidebar"
import { POINTER_CURSOR_NAME, STATUS_INDICATOR_BASE_CLASS } from "./constants"

export default function SidebarToggleButton() {
  return (
    <button
      class={isSidebarVisible((visible) =>
        visible
          ? `${STATUS_INDICATOR_BASE_CLASS} status-indicator--sidebar status-indicator--sidebar--active`
          : `${STATUS_INDICATOR_BASE_CLASS} status-indicator--sidebar`,
      )}
      cursor={Gdk.Cursor.new_from_name(POINTER_CURSOR_NAME, null)}
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
