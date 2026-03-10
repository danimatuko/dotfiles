import { Gdk, Gtk } from "ags/gtk4"
import { createPoll } from "ags/time"

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
    <menubutton cursor={pointerCursor}>
      <label label={time} />
      <popover>
        <Gtk.Calendar />
      </popover>
    </menubutton>
  )
}
