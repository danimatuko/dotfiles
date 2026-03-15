import AstalNotifd from "gi://AstalNotifd"
import GLib from "gi://GLib"
import { createState } from "gnim"

export type NotificationEntry = {
  id: number
  appName: string
  summary: string
  body: string
  iconName: string
  timeLabel: string
}

const notifd = AstalNotifd.get_default()

const [activeNotificationState, setActiveNotificationState] =
  createState<NotificationEntry | null>(null)
const [notificationHistoryState, setNotificationHistoryState] = createState<
  NotificationEntry[]
>([])

let hideTimeoutId = 0

const stopHideTimer = () => {
  if (hideTimeoutId > 0) {
    GLib.source_remove(hideTimeoutId)
    hideTimeoutId = 0
  }
}

const hideActiveNotification = () => {
  stopHideTimer()
  setActiveNotificationState(null)
}

const getTimeLabel = () => GLib.DateTime.new_now_local()?.format("%H:%M") ?? ""

const notificationToEntry = (id: number): NotificationEntry | null => {
  if (!notifd) return null
  const notification = notifd.get_notification(id)
  if (!notification) return null

  const summary = `${notification.summary ?? ""}`.trim()
  const body = `${notification.body ?? ""}`.trim()
  const appName = `${notification.appName ?? ""}`.trim() || "Notification"
  const iconName = `${notification.appIcon ?? ""}`.trim()

  return {
    id,
    appName,
    summary: summary || appName,
    body,
    iconName: iconName || "dialog-information-symbolic",
    timeLabel: getTimeLabel(),
  }
}

const handleNotification = (id: number) => {
  const entry = notificationToEntry(id)
  if (!entry) return

  setActiveNotificationState(entry)
  setNotificationHistoryState([
    entry,
    ...notificationHistoryState().filter((item) => item.id !== id),
  ])

  stopHideTimer()
  hideTimeoutId = GLib.timeout_add(GLib.PRIORITY_DEFAULT, 5000, () => {
    hideActiveNotification()
    return GLib.SOURCE_REMOVE
  })
}

notifd?.connect("notified", (_: unknown, id: number) => {
  handleNotification(id)
})

notifd?.connect("resolved", (_: unknown, id: number) => {
  if (activeNotificationState()?.id === id) {
    hideActiveNotification()
  }
})

export const activeNotification = activeNotificationState
export const notificationHistory = notificationHistoryState

export const clearNotificationHistory = () => {
  hideActiveNotification()
  setNotificationHistoryState([])
}

export const dismissNotification = (id: number) => {
  setNotificationHistoryState(
    notificationHistoryState().filter((notification) => notification.id !== id),
  )

  if (activeNotificationState()?.id === id) {
    hideActiveNotification()
  }

  try {
    notifd?.get_notification(id)?.dismiss?.()
  } catch {}
}
