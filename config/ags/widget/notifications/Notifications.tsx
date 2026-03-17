import app from "ags/gtk4/app"
import { For } from "ags"
import { Astal, Gdk, Gtk } from "ags/gtk4"
import {
  activeNotifications,
  dismissNotification,
} from "../../services/notifications"
import { getThemeWindowClass } from "../../services/theme"
import NotificationCard from "./NotificationCard"

export default function Notifications(gdkmonitor: Gdk.Monitor) {
  const { TOP } = Astal.WindowAnchor
  const barOffset = 30

  return (
    <window
      name="notifications"
      class={getThemeWindowClass("Notifications")}
      visible={activeNotifications((notifications) => notifications.length > 0)}
      gdkmonitor={gdkmonitor}
      anchor={TOP}
      marginTop={barOffset}
      exclusivity={Astal.Exclusivity.IGNORE}
      application={app}
    >
      <box
        class="notifications__container"
        orientation={Gtk.Orientation.VERTICAL}
        spacing={10}
        valign={Gtk.Align.START}
        halign={Gtk.Align.CENTER}
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
