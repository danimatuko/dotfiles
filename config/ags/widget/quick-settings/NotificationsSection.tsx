import { For } from "ags"
import { Gdk, Gtk } from "ags/gtk4"

import NotificationCard from "../notifications/NotificationCard"
import {
  clearNotificationHistory,
  dismissNotification,
  isDoNotDisturbEnabled,
  notificationHistory,
  toggleDoNotDisturb,
} from "../../services/notifications"
import SectionHeader from "./SectionHeader"

const pointerCursor = Gdk.Cursor.new_from_name("pointer", null)

export default function NotificationsSection() {
  return (
    <box
      class="quick-settings__section-card"
      orientation={Gtk.Orientation.VERTICAL}
      spacing={8}
    >
      <box class="quick-settings__section-header" spacing={8}>
        <SectionHeader
          iconName="preferences-system-notifications-symbolic"
          label="Notifications"
        />
        <button
          class={isDoNotDisturbEnabled((enabled) =>
            enabled
              ? "quick-settings__toggle-button quick-settings__toggle-button--active"
              : "quick-settings__toggle-button",
          )}
          onClicked={toggleDoNotDisturb}
          cursor={pointerCursor}
        >
          <label label="Do Not Disturb" />
        </button>
        <button
          class="quick-settings__action-button"
          visible={notificationHistory((items) => items.length > 0)}
          onClicked={clearNotificationHistory}
          cursor={pointerCursor}
        >
          <label label="Clear" />
        </button>
      </box>
      <label
        class="quick-settings__notifications-empty"
        visible={notificationHistory((items) => items.length === 0)}
        label="No recent notifications"
        xalign={0}
      />
      <box
        class="quick-settings__notifications-list"
        orientation={Gtk.Orientation.VERTICAL}
        spacing={6}
      >
        <For each={notificationHistory}>
          {(notification) => (
            <NotificationCard
              appName={notification.appName}
              summary={notification.summary}
              body={notification.body}
              iconName={notification.iconName}
              timeLabel={notification.timeLabel}
              bodyVisible={Boolean(notification.body.length)}
              onClose={() => dismissNotification(notification.id)}
              className="quick-settings__notification-card"
            />
          )}
        </For>
      </box>
    </box>
  )
}
