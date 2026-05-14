import { Gtk } from "ags/gtk4"

import SectionHeader from "./SectionHeader"

type Props = {
  iconName: string
  label: string
  spacing?: number
  children: any
}

export default function SectionCard({
  iconName,
  label,
  spacing = 8,
  children,
}: Props) {
  return (
    <box
      class="quick-settings__section-card"
      orientation={Gtk.Orientation.VERTICAL}
      spacing={spacing}
    >
      <SectionHeader iconName={iconName} label={label} />
      {children}
    </box>
  )
}
