import type { Accessor } from "gnim"

type Props = {
  label: string
  iconName: string | Accessor<string>
  className: string | Accessor<string>
  sensitive: boolean | Accessor<boolean>
  hexpand?: boolean
  onClicked: () => void
  [key: string]: unknown
}

export default function QuickSettingsToggleButton({
  label,
  iconName,
  className,
  sensitive,
  onClicked,
  ...rest
}: Props) {
  return (
    <button
      {...rest}
      class={className}
      onClicked={onClicked}
      sensitive={sensitive}
    >
      <box class="quick-settings__toggle-content" spacing={10}>
        <image iconName={iconName} />
        <label
          class="quick-settings__toggle-label"
          label={label}
          xalign={0}
          hexpand
        />
      </box>
    </button>
  )
}
