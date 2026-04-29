import { Gdk, Gtk } from "ags/gtk4"

import {
  isDoNotDisturbEnabled,
  notificationHistory,
  toggleDoNotDisturb,
} from "../../services/notifications"

const pointerCursor = Gdk.Cursor.new_from_name("pointer", null)

const hasIcon = (iconName: string) => {
  const display = Gdk.Display.get_default()
  const iconTheme = display ? Gtk.IconTheme.get_for_display(display) : null
  return iconTheme?.has_icon(iconName) ?? false
}

const pickFirstExistingIcon = (iconNames: string[]) => {
  for (const iconName of iconNames) {
    if (hasIcon(iconName)) return iconName
  }

  return "dialog-information-symbolic"
}

const getNotificationIconName = (isDoNotDisturbEnabled: boolean) =>
  isDoNotDisturbEnabled
    ? pickFirstExistingIcon([
        "notifications-disabled-symbolic",
        "notification-disabled-symbolic",
        "preferences-system-notifications-symbolic",
      ])
    : pickFirstExistingIcon([
        "preferences-system-notifications-symbolic",
        "notification-symbolic",
        "dialog-information-symbolic",
      ])

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
      <overlay>
        <image
          iconName={isDoNotDisturbEnabled((enabled) =>
            getNotificationIconName(enabled),
          )}
        />
        <label
          class="notification-indicator__badge"
          label="•"
          visible={notificationHistory((items) => items.length > 0)}
          halign={Gtk.Align.END}
          valign={Gtk.Align.START}
        />
      </overlay>
    </button>
  )
}
