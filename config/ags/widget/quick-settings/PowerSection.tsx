import { Gtk } from "ags/gtk4"

import {
  getBatteryIcon,
  getBatteryPercentage,
  canLockSession,
  canLogoutSession,
  canPoweroffSystem,
  canRebootSystem,
  canSuspendSystem,
  lockSession,
  logoutSession,
  poweroffSystem,
  rebootSystem,
  suspendSystem,
} from "../../services/quick-settings"
import IconActionButton from "./IconActionButton"
import SectionCard from "./SectionCard"

type ActionConfig = {
  iconName: string
  tooltipText: string
  onClicked: () => void
  isAvailable: boolean
}

const powerActions: ActionConfig[] = [
  {
    iconName: "system-lock-screen-symbolic",
    tooltipText: "Lock",
    onClicked: lockSession,
    isAvailable: canLockSession,
  },
  {
    iconName: "system-log-out-symbolic",
    tooltipText: "Logout",
    onClicked: logoutSession,
    isAvailable: canLogoutSession,
  },
  {
    iconName: "weather-clear-night-symbolic",
    tooltipText: "Sleep",
    onClicked: suspendSystem,
    isAvailable: canSuspendSystem,
  },
  {
    iconName: "system-reboot-symbolic",
    tooltipText: "Restart",
    onClicked: rebootSystem,
    isAvailable: canRebootSystem,
  },
  {
    iconName: "system-shutdown-symbolic",
    tooltipText: "Shutdown",
    onClicked: poweroffSystem,
    isAvailable: canPoweroffSystem,
  },
]

export default function PowerSection() {
  return (
    <SectionCard iconName="battery-good-symbolic" label="Power">
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
            sensitive={action.isAvailable}
          />
        ))}
      </box>
      <box class="quick-settings__battery-row" spacing={8}>
        <image iconName={getBatteryIcon} />
        <label label="Battery" xalign={0} hexpand />
        <label label={getBatteryPercentage} xalign={1} />
      </box>
    </SectionCard>
  )
}
