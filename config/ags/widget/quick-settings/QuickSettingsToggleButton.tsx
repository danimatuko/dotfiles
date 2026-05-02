import { Gdk, Gtk } from "ags/gtk4"
import type { Accessor } from "gnim"

type Props = {
  label?: string
  iconName: string | Accessor<string>
  iconClassName?: string
  className: string | Accessor<string>
  sensitive: boolean | Accessor<boolean>
  onClicked: () => void
  iconOnly?: boolean
  [key: string]: unknown
}

export default function QuickSettingsToggleButton({
  label,
  iconName,
  iconClassName,
  className,
  sensitive,
  onClicked,
  iconOnly,
  ...rest
}: Props) {
  return (
    <button
      {...rest}
      class={
        typeof className === "string"
          ? `${className}${iconOnly ? " quick-settings__toggle-button--icon-only" : ""}`
          : className(
              (value) =>
                `${value}${iconOnly ? " quick-settings__toggle-button--icon-only" : ""}`,
            )
      }
      cursor={Gdk.Cursor.new_from_name("pointer", null)}
      onClicked={onClicked}
      sensitive={sensitive}
      hexpand={!iconOnly}
    >
      <box
        class="quick-settings__toggle-content"
        spacing={iconOnly ? 0 : 10}
        hexpand={!iconOnly}
        halign={iconOnly ? Gtk.Align.CENTER : undefined}
        valign={iconOnly ? Gtk.Align.CENTER : undefined}
      >
        <image
          class={iconClassName ?? "quick-settings__toggle-icon"}
          iconName={iconName}
        />
        <label
          class="quick-settings__toggle-label"
          label={label ?? ""}
          xalign={0}
          hexpand
          visible={!iconOnly}
        />
        <image
          class="quick-settings__toggle-chevron"
          iconName="pan-end-symbolic"
          visible={!iconOnly}
        />
      </box>
    </button>
  )
}
