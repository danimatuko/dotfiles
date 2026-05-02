import { Gdk, Gtk } from "ags/gtk4"
import { createPoll } from "ags/time"

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
      <popover class="clock-menu__popover" hasArrow={true}>
        <box class="clock-menu__content">
          <box class="clock-menu__calendar">
            <Gtk.Calendar />
          </box>
        </box>
      </popover>
    </menubutton>
  )
}
