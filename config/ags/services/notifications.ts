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
const maxActiveToasts = 4
const maxNotificationHistory = 100

const [activeNotificationsState, setActiveNotificationsState] = createState<
  NotificationEntry[]
>([])
const [doNotDisturbState, setDoNotDisturbState] = createState(false)
const [notificationHistoryState, setNotificationHistoryState] = createState<
  NotificationEntry[]
>([])

const hideTimeoutIds = new Map<number, number>()

const clearHideTimer = (id: number) => {
  const timeoutId = hideTimeoutIds.get(id)
  if (!timeoutId) return

  GLib.source_remove(timeoutId)
  hideTimeoutIds.delete(id)
}

const removeActiveNotification = (id: number) => {
  clearHideTimer(id)

  const nextActive = activeNotificationsState().filter(
    (notification) => notification.id !== id,
  )
  setActiveNotificationsState(nextActive)
}

const clearAllActiveNotifications = () => {
  for (const timeoutId of hideTimeoutIds.values()) {
    GLib.source_remove(timeoutId)
  }

  hideTimeoutIds.clear()
  setActiveNotificationsState([])
}

const upsertHistory = (entry: NotificationEntry) => {
  const nextHistory = [
    entry,
    ...notificationHistoryState().filter((item) => item.id !== entry.id),
  ].slice(0, maxNotificationHistory)

  setNotificationHistoryState(nextHistory)
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

  if (doNotDisturbState()) {
    upsertHistory(entry)
    return
  }

  const previousActive = activeNotificationsState()
  const nextActive = [
    entry,
    ...previousActive.filter((item) => item.id !== id),
  ].slice(0, maxActiveToasts)

  const dropped = previousActive.filter(
    (item) => !nextActive.some((nextItem) => nextItem.id === item.id),
  )
  dropped.forEach((item) => clearHideTimer(item.id))

  setActiveNotificationsState(nextActive)
  upsertHistory(entry)

  clearHideTimer(id)
  const timeoutId = GLib.timeout_add(GLib.PRIORITY_DEFAULT, 5000, () => {
    removeActiveNotification(id)
    return GLib.SOURCE_REMOVE
  })
  hideTimeoutIds.set(id, timeoutId)
}

notifd?.connect("notified", (_: unknown, id: number) => {
  handleNotification(id)
})

notifd?.connect("resolved", (_: unknown, id: number) => {
  removeActiveNotification(id)
})

export const activeNotifications = activeNotificationsState
export const notificationHistory = notificationHistoryState
export const isDoNotDisturbEnabled = doNotDisturbState

export const toggleDoNotDisturb = () => {
  const nextEnabled = !doNotDisturbState()
  setDoNotDisturbState(nextEnabled)

  if (nextEnabled) {
    clearAllActiveNotifications()
  }
}

export const clearNotificationHistory = () => {
  clearAllActiveNotifications()
  setNotificationHistoryState([])
}

export const dismissNotification = (id: number) => {
  setNotificationHistoryState(
    notificationHistoryState().filter((notification) => notification.id !== id),
  )
  removeActiveNotification(id)

  try {
    notifd?.get_notification(id)?.dismiss?.()
  } catch {}
}
