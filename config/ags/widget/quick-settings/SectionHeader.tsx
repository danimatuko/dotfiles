type Props = {
  iconName: string
  label: string
}

export default function SectionHeader({ iconName, label }: Props) {
  return (
    <box class="quick-settings__section-label-row" spacing={6} hexpand>
      <image class="quick-settings__section-label-icon" iconName={iconName} />
      <label class="quick-settings__section-label" label={label} xalign={0} />
    </box>
  )
}
