import { Gdk } from "ags/gtk4"

const pointerCursor = Gdk.Cursor.new_from_name("pointer", null)

type Props = {
  className: string
  iconName: string
  tooltipText: string
  onClicked: () => void
  hexpand?: boolean
}

export default function IconActionButton({
  className,
  iconName,
  tooltipText,
  onClicked,
  hexpand = false,
}: Props) {
  return (
    <button
      class={className}
      onClicked={onClicked}
      tooltipText={tooltipText}
      cursor={pointerCursor}
      hexpand={hexpand}
    >
      <image iconName={iconName} />
    </button>
  )
}
