import { Gdk } from "ags/gtk4"
import {
  isDoNotDisturbEnabled,
  notificationHistory,
  toggleDoNotDisturb,
} from "../../services/notifications"

const pointerCursor = Gdk.Cursor.new_from_name("pointer", null)

const getNotificationIcon = (hasNotifications: boolean, isDndEnabled: boolean) => {
  if (hasNotifications) return "󰅸"
  return isDndEnabled ? "󱏨" : "󰂜"
}

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
        <label
          class="notification-indicator__glyph"
          label={notificationHistory((items) =>
            getNotificationIcon(items.length > 0, isDoNotDisturbEnabled()),
          )}
        />
      </box>
    </button>
  )
}
