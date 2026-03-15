import AstalNotifd from "gi://AstalNotifd"
import GLib from "gi://GLib"
import app from "ags/gtk4/app"
import { Astal, Gdk, Gtk } from "ags/gtk4"
import { createState } from "gnim"

type ActiveNotification = {
  id: number
  appName: string
  summary: string
  body: string
  iconName: string
  timeLabel: string
}

const notifd = AstalNotifd.get_default()

const [activeNotification, setActiveNotification] =
  createState<ActiveNotification | null>(null)

let hideTimeoutId = 0

const stopHideTimer = () => {
  if (hideTimeoutId > 0) {
    GLib.source_remove(hideTimeoutId)
    hideTimeoutId = 0
  }
}

const hideNotification = () => {
  stopHideTimer()
  setActiveNotification(null)
}

const showNotification = (id: number) => {
  if (!notifd) return

  const notification = notifd.get_notification(id)
  if (!notification) return

  const summary = `${notification.summary ?? ""}`.trim()
  const body = `${notification.body ?? ""}`.trim()
  const appName = `${notification.appName ?? ""}`.trim() || "Notification"
  const iconName = `${notification.appIcon ?? ""}`.trim()
  const timeLabel = GLib.DateTime.new_now_local()?.format("%H:%M") ?? ""

  setActiveNotification({
    id,
    appName,
    summary: summary || appName,
    body,
    iconName: iconName || "dialog-information-symbolic",
    timeLabel,
  })

  stopHideTimer()
  hideTimeoutId = GLib.timeout_add(GLib.PRIORITY_DEFAULT, 5000, () => {
    hideNotification()
    return GLib.SOURCE_REMOVE
  })
}

notifd?.connect("notified", (_: unknown, id: number) => {
  showNotification(id)
})

notifd?.connect("resolved", (_: unknown, id: number) => {
  if (activeNotification()?.id === id) {
    hideNotification()
  }
})

export default function Notifications(gdkmonitor: Gdk.Monitor) {
  const { TOP, LEFT, RIGHT } = Astal.WindowAnchor

  return (
    <window
      name="notifications"
      class="Notifications"
      visible={activeNotification((notification) => Boolean(notification))}
      gdkmonitor={gdkmonitor}
      anchor={TOP | LEFT | RIGHT}
      exclusivity={Astal.Exclusivity.IGNORE}
      application={app}
    >
      <box
        class="notifications__container"
        valign={Gtk.Align.START}
        halign={Gtk.Align.CENTER}
        hexpand
      >
        <box class="notification-card" orientation={Gtk.Orientation.VERTICAL}>
          <box class="notification-card__header" spacing={8}>
            <image
              class="notification-card__icon"
              iconName={activeNotification(
                (notification) =>
                  notification?.iconName || "dialog-information-symbolic",
              )}
            />
            <label
              class="notification-card__app"
              hexpand
              xalign={0}
              label={activeNotification(
                (notification) => notification?.appName || "Notification",
              )}
            />
            <label
              class="notification-card__time"
              xalign={1}
              label={activeNotification(
                (notification) => notification?.timeLabel || "",
              )}
            />
          </box>
          <box class="notification-card__separator" />
          <label
            class="notification-card__summary"
            xalign={0}
            wrap
            wrapMode={Gtk.WrapMode.WORD_CHAR}
            label={activeNotification(
              (notification) => notification?.summary || "",
            )}
          />
          <label
            class="notification-card__body"
            xalign={0}
            wrap
            wrapMode={Gtk.WrapMode.WORD_CHAR}
            visible={activeNotification((notification) =>
              Boolean(notification?.body?.length),
            )}
            label={activeNotification(
              (notification) => notification?.body || "",
            )}
          />
        </box>
      </box>
    </window>
  )
}
