import { Gdk } from "ags/gtk4"
import { createPoll } from "ags/time"

const pointerCursor = Gdk.Cursor.new_from_name("pointer", null)

export default function Clock() {
  const time = createPoll("", 1000, () => {
    const now = new Date()
    return new Intl.DateTimeFormat(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(now)
  })

  const date = createPoll("", 60000, () => {
    const now = new Date()
    return new Intl.DateTimeFormat(undefined, {
      weekday: "short",
      day: "2-digit",
      month: "short",
    }).format(now)
  })

  return (
    <button class="clock-menu" cursor={pointerCursor}>
      <box class="clock-menu__content">
        <label class="clock-menu__time" label={time} />
        <label class="clock-menu__separator" label="•" />
        <label class="clock-menu__date" label={date} />
      </box>
    </button>
  )
}
