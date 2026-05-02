import { Gdk, Gtk } from "ags/gtk4"
import type { Accessor } from "gnim"

const pointerCursor = Gdk.Cursor.new_from_name("pointer", null)

type Props = {
  iconName: string | Accessor<string>
  iconClassName: string
  sliderClassName: string
  value: number | Accessor<number>
  onValueChanged: (self: Gtk.Scale) => void
  sensitive?: boolean | Accessor<boolean>
}

export default function SliderRow({
  iconName,
  iconClassName,
  sliderClassName,
  value,
  onValueChanged,
  sensitive,
}: Props) {
  return (
    <box class="quick-settings__slider-row" spacing={10}>
      <box class="quick-settings__slider-icon-box" valign={Gtk.Align.CENTER}>
        <image class={iconClassName} iconName={iconName} />
      </box>
      <slider
        class={sliderClassName}
        cursor={pointerCursor}
        hexpand
        value={value}
        sensitive={sensitive}
        onValueChanged={onValueChanged}
      />
    </box>
  )
}
