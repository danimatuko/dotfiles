import { Gdk } from "ags/gtk4"

const pointerCursor = Gdk.Cursor.new_from_name("pointer", null)

type Props = {
  className: string
  iconName: string
  tooltipText: string
  onClicked: () => void
}

export default function IconActionButton({
  className,
  iconName,
  tooltipText,
  onClicked,
}: Props) {
  return (
    <button
      class={className}
      onClicked={onClicked}
      tooltipText={tooltipText}
      cursor={pointerCursor}
    >
      <image iconName={iconName} />
    </button>
  )
}
