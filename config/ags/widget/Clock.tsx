import { For } from "ags"
import { Gdk, Gtk } from "ags/gtk4"
import { createPoll } from "ags/time"
import { NotificationCard } from "./Notifications"
import {
  clearNotificationHistory,
  dismissNotification,
  notificationHistory,
} from "./notifications/state"

const pointerCursor = Gdk.Cursor.new_from_name("pointer", null)

export default function Clock() {
  const time = createPoll("", 1000, () =>
    new Date().toLocaleString(undefined, {
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }),
  )

  return (
    <menubutton class="clock-menu" cursor={pointerCursor}>
      <label label={time} />
      <popover>
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
