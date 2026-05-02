import { Gtk } from "ags/gtk4"

import {
  getBatteryIcon,
  getBatteryPercentage,
  lockSession,
  logoutSession,
  poweroffSystem,
  rebootSystem,
  suspendSystem,
} from "../../services/quick-settings"
import IconActionButton from "./IconActionButton"
import SectionHeader from "./SectionHeader"

type ActionConfig = {
  iconName: string
  tooltipText: string
  onClicked: () => void
}

const powerActions: ActionConfig[] = [
  {
    iconName: "system-lock-screen-symbolic",
    tooltipText: "Lock",
    onClicked: lockSession,
  },
  {
    iconName: "system-log-out-symbolic",
    tooltipText: "Logout",
    onClicked: logoutSession,
  },
  {
    iconName: "weather-clear-night-symbolic",
    tooltipText: "Sleep",
    onClicked: suspendSystem,
  },
  {
    iconName: "system-reboot-symbolic",
    tooltipText: "Restart",
    onClicked: rebootSystem,
  },
  {
    iconName: "system-shutdown-symbolic",
    tooltipText: "Shutdown",
    onClicked: poweroffSystem,
  },
]

export default function PowerSection() {
  return (
    <box
      class="quick-settings__section-card"
      orientation={Gtk.Orientation.VERTICAL}
      spacing={8}
    >
      <SectionHeader iconName="battery-good-symbolic" label="Power" />
      <box
        class="quick-settings__power-actions"
        orientation={Gtk.Orientation.HORIZONTAL}
        spacing={8}
        homogeneous
      >
        {powerActions.map((action) => (
          <IconActionButton
            className="quick-settings__action-button quick-settings__power-action-button"
            iconName={action.iconName}
            tooltipText={action.tooltipText}
            onClicked={action.onClicked}
          />
        ))}
      </box>
      <box class="quick-settings__battery-row" spacing={8}>
        <image iconName={getBatteryIcon} />
        <label label="Battery" xalign={0} hexpand />
        <label label={getBatteryPercentage} xalign={1} />
      </box>
    </box>
  )
}
