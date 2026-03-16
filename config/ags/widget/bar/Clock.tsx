import { For } from "ags"
import { Gdk, Gtk } from "ags/gtk4"
import { createPoll } from "ags/time"
import NotificationCard from "../notifications/NotificationCard"
import {
  clearNotificationHistory,
  dismissNotification,
  notificationHistory,
} from "../../services/notifications"

const pointerCursor = Gdk.Cursor.new_from_name("pointer", null)

export default function Clock() {
  const time = createPoll("", 1000, () => {
    const now = new Date()
    const dateLabel = new Intl.DateTimeFormat(undefined, {
      weekday: "short",
      day: "2-digit",
      month: "short",
    }).format(now)
    const timeLabel = new Intl.DateTimeFormat(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(now)

    return `${timeLabel} · ${dateLabel}`
  })

  return (
    <menubutton class="clock-menu" cursor={pointerCursor}>
      <label label={time} />
      <popover class="clock-menu__popover" hasArrow={false}>
        <box class="clock-menu__content" spacing={14}>
          <box class="clock-menu__calendar">
            <Gtk.Calendar />
          </box>
          <box
            class="clock-menu__notifications"
            orientation={Gtk.Orientation.VERTICAL}
          >
            <box class="clock-menu__notifications-header" spacing={8}>
              <label
                class="clock-menu__notifications-title"
                label="Notifications"
                xalign={0}
                hexpand
              />
              <button
                class="clock-menu__notifications-clear"
                visible={notificationHistory((items) => items.length > 0)}
                onClicked={clearNotificationHistory}
              >
                <label label="Clear" />
              </button>
            </box>
            <scrolledwindow
              class="clock-menu__notifications-scroll"
              hscrollbarPolicy={Gtk.PolicyType.NEVER}
              vscrollbarPolicy={Gtk.PolicyType.AUTOMATIC}
            >
              <box
                class="clock-menu__notifications-list"
                orientation={Gtk.Orientation.VERTICAL}
                spacing={8}
              >
                <label
                  class="clock-menu__notifications-empty"
                  label="No notifications yet"
                  xalign={0}
                  visible={notificationHistory((items) => items.length === 0)}
                />
                <For each={notificationHistory}>
                  {(notification) => (
                    <NotificationCard
                      className="clock-menu__notification-item"
                      appName={notification.appName}
                      summary={notification.summary}
                      body={notification.body}
                      iconName={notification.iconName}
                      timeLabel={notification.timeLabel}
                      bodyVisible={Boolean(notification.body.length)}
                      compact
                      showIcon={false}
                      onClose={() => dismissNotification(notification.id)}
                    />
                  )}
                </For>
              </box>
            </scrolledwindow>
          </box>
        </box>
      </popover>
    </menubutton>
  )
}
