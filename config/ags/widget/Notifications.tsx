import app from "ags/gtk4/app"
import { Astal, Gdk, Gtk } from "ags/gtk4"
import type { Accessor } from "gnim"
import { activeNotification, dismissNotification } from "./notifications/state"

type NotificationCardProps = {
  appName: string | Accessor<string>
  summary: string | Accessor<string>
  body: string | Accessor<string>
  iconName: string | Accessor<string>
  timeLabel: string | Accessor<string>
  bodyVisible?: boolean | Accessor<boolean>
  onClose?: () => void
  compact?: boolean
  showIcon?: boolean
  className?: string
}

export function NotificationCard({
  appName,
  summary,
  body,
  iconName,
  timeLabel,
  bodyVisible,
  onClose,
  compact = false,
  showIcon = true,
  className = "",
}: NotificationCardProps) {
  const cardClass = compact
    ? `notification-card notification-card--compact ${className}`
    : `notification-card ${className}`

  return (
    <box class={cardClass} orientation={Gtk.Orientation.VERTICAL}>
      <box class="notification-card__header" spacing={8}>
        <image
          class="notification-card__icon"
          visible={showIcon}
          iconName={iconName}
        />
        <label
          class="notification-card__app"
          hexpand
          xalign={0}
          label={appName}
        />
        <label class="notification-card__time" xalign={1} label={timeLabel} />
        <button
          class="notification-card__close"
          visible={Boolean(onClose)}
          onClicked={() => onClose?.()}
        >
          <image iconName="window-close-symbolic" />
        </button>
      </box>
      <box class="notification-card__separator" />
      <label
        class="notification-card__summary"
        xalign={0}
        wrap
        wrapMode={Gtk.WrapMode.WORD_CHAR}
        label={summary}
      />
      <label
        class="notification-card__body"
        xalign={0}
        wrap
        wrapMode={Gtk.WrapMode.WORD_CHAR}
        visible={bodyVisible ?? true}
        label={body}
      />
    </box>
  )
}

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
        <NotificationCard
          appName={activeNotification(
            (notification) => notification?.appName || "Notification",
          )}
          summary={activeNotification(
            (notification) => notification?.summary || "",
          )}
          body={activeNotification((notification) => notification?.body || "")}
          iconName={activeNotification(
            (notification) =>
              notification?.iconName || "dialog-information-symbolic",
          )}
          timeLabel={activeNotification(
            (notification) => notification?.timeLabel || "",
          )}
          bodyVisible={activeNotification((notification) =>
            Boolean(notification?.body?.length),
          )}
          onClose={() => {
            const id = activeNotification()?.id
            if (typeof id === "number") {
              dismissNotification(id)
            }
          }}
        />
      </box>
    </window>
  )
}
