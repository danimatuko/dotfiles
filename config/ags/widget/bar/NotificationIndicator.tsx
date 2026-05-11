import { Gdk, Gtk } from "ags/gtk4"
import {
  isDoNotDisturbEnabled,
  notificationHistory,
  toggleDoNotDisturb,
} from "../../services/notifications"

const pointerCursor = Gdk.Cursor.new_from_name("pointer", null)

export default function NotificationIndicator() {
  return (
    <button
      class={notificationHistory((items) =>
        items.length > 0
          ? "notification-indicator notification-indicator--has-items"
          : "notification-indicator",
      )}
      cursor={pointerCursor}
      onClicked={toggleDoNotDisturb}
      tooltipText={notificationHistory((items) =>
        isDoNotDisturbEnabled()
          ? `Do Not Disturb: on (${items.length} notifications)`
          : items.length > 0
            ? `${items.length} notifications`
            : "No notifications",
      )}
    >
      <box class="notification-indicator__content">
        <image
          class="notification-indicator__icon"
          iconName="preferences-system-notifications-symbolic"
        />
        <label
          class="notification-indicator__badge"
          label="•"
          visible={notificationHistory((items) => items.length > 0)}
          halign={Gtk.Align.END}
          valign={Gtk.Align.START}
        />
      </box>
    </button>
  )
}
