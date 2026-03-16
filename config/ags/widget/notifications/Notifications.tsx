import app from "ags/gtk4/app"
import { For } from "ags"
import { Astal, Gdk, Gtk } from "ags/gtk4"
import {
  activeNotifications,
  dismissNotification,
} from "../../services/notifications"
import NotificationCard from "./NotificationCard"

export default function Notifications(gdkmonitor: Gdk.Monitor) {
  const { TOP, LEFT, RIGHT } = Astal.WindowAnchor

  return (
    <window
      name="notifications"
      class="Notifications"
      visible={activeNotifications((notifications) => notifications.length > 0)}
      gdkmonitor={gdkmonitor}
      anchor={TOP | LEFT | RIGHT}
      exclusivity={Astal.Exclusivity.IGNORE}
      application={app}
    >
      <box
        class="notifications__container"
        orientation={Gtk.Orientation.VERTICAL}
        spacing={10}
        valign={Gtk.Align.START}
        halign={Gtk.Align.CENTER}
        hexpand
      >
        <For each={activeNotifications}>
          {(notification) => (
            <NotificationCard
              appName={notification.appName}
              summary={notification.summary}
              body={notification.body}
              iconName={notification.iconName}
              timeLabel={notification.timeLabel}
              bodyVisible={Boolean(notification.body.length)}
              onClose={() => dismissNotification(notification.id)}
            />
          )}
        </For>
      </box>
    </window>
  )
}
