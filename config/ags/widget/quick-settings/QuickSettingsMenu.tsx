import { Gdk, Gtk } from "ags/gtk4"
import { For } from "ags"

import {
  canControlVolume,
  canToggleBluetooth,
  canToggleDarkMode,
  canToggleNightLight,
  canToggleWifi,
  getBatteryIcon,
  getBatteryPercentage,
  getBluetoothButtonClass,
  getBluetoothIcon,
  getBrightnessIcon,
  getBrightnessValue,
  getDarkModeButtonClass,
  getDarkModeIcon,
  getNightLightButtonClass,
  getNightLightIcon,
  getNightLightTemperatureValue,
  lockSession,
  logoutSession,
  poweroffSystem,
  rebootSystem,
  getSpeakerIcon,
  suspendSystem,
  getVolumeValue,
  getWifiButtonClass,
  getWifiIcon,
  setVolume,
  setBrightness,
  setNightLightTemperature,
  toggleDarkMode,
  toggleBluetooth,
  toggleNightLight,
  toggleWifi,
} from "../../services/quick-settings"
import QuickSettingsToggleButton from "./QuickSettingsToggleButton"
import NotificationCard from "../notifications/NotificationCard"
import {
  clearNotificationHistory,
  isDoNotDisturbEnabled,
  dismissNotification,
  notificationHistory,
  toggleDoNotDisturb,
} from "../../services/notifications"

const pointerCursor = Gdk.Cursor.new_from_name("pointer", null)

type SectionHeaderProps = {
  iconName: string
  label: string
}

function SectionHeader({ iconName, label }: SectionHeaderProps) {
  return (
    <box class="quick-settings__section-label-row" spacing={6} hexpand>
      <image class="quick-settings__section-label-icon" iconName={iconName} />
      <label class="quick-settings__section-label" label={label} xalign={0} />
    </box>
  )
}

export default function QuickSettingsMenu() {
  return (
    <box
      class="quick-settings__menu"
      orientation={Gtk.Orientation.VERTICAL}
      spacing={14}
    >
      <box
        class="quick-settings__header"
        orientation={Gtk.Orientation.VERTICAL}
        spacing={3}
      >
        <label
          class="quick-settings__eyebrow"
          label="CONTROL CENTER"
          xalign={0}
        />
        <label
          class="quick-settings__title"
          label="Quick Settings"
          xalign={0}
        />
        <label
          class="quick-settings__subtitle"
          label="System controls and status"
          xalign={0}
        />
      </box>

      <box
        class="quick-settings__section-card"
        orientation={Gtk.Orientation.VERTICAL}
        spacing={10}
      >
        <SectionHeader
          iconName="network-wireless-signal-excellent-symbolic"
          label="Connectivity"
        />
        <box
          class="quick-settings__toggles-group"
          orientation={Gtk.Orientation.HORIZONTAL}
          spacing={8}
          homogeneous
        >
          <QuickSettingsToggleButton
            iconName={getWifiIcon}
            iconClassName="quick-settings__toggle-icon quick-settings__toggle-icon--wifi"
            className={getWifiButtonClass}
            onClicked={toggleWifi}
            sensitive={canToggleWifi}
            iconOnly
            hexpand
            tooltipText={"Toggle Wi-Fi"}
          />
          <QuickSettingsToggleButton
            iconName={getBluetoothIcon}
            iconClassName="quick-settings__toggle-icon quick-settings__toggle-icon--bluetooth"
            className={getBluetoothButtonClass}
            onClicked={toggleBluetooth}
            sensitive={canToggleBluetooth}
            iconOnly
            hexpand
            tooltipText={"Toggle Bluetooth"}
          />
          <QuickSettingsToggleButton
            iconName={getNightLightIcon}
            className={getNightLightButtonClass}
            onClicked={toggleNightLight}
            sensitive={canToggleNightLight}
            iconOnly
            hexpand
            tooltipText={"Toggle Night Light"}
          />
          <QuickSettingsToggleButton
            iconName={getDarkModeIcon}
            className={getDarkModeButtonClass}
            onClicked={toggleDarkMode}
            sensitive={canToggleDarkMode}
            iconOnly
            hexpand
            tooltipText={"Toggle Dark Mode"}
          />
        </box>
      </box>

      <box
        class="quick-settings__section-card"
        orientation={Gtk.Orientation.VERTICAL}
        spacing={8}
      >
        <SectionHeader iconName="video-display-symbolic" label="Display" />
        <box
          class="quick-settings__sliders-group"
          orientation={Gtk.Orientation.VERTICAL}
          spacing={6}
        >
          <box class="quick-settings__slider-row" spacing={10}>
            <box
              class="quick-settings__slider-icon-box"
              valign={Gtk.Align.CENTER}
            >
              <image
                class="quick-settings__brightness-icon"
                iconName={getBrightnessIcon}
              />
            </box>
            <slider
              class="quick-settings__brightness-slider"
              cursor={pointerCursor}
              hexpand
              value={getBrightnessValue}
              onValueChanged={(self) => setBrightness(self.value)}
            />
          </box>
          <box class="quick-settings__slider-row" spacing={10}>
            <box
              class="quick-settings__slider-icon-box"
              valign={Gtk.Align.CENTER}
            >
              <image
                class="quick-settings__night-light-icon"
                iconName="night-light-symbolic"
              />
            </box>
            <slider
              class="quick-settings__night-light-slider"
              cursor={pointerCursor}
              hexpand
              value={getNightLightTemperatureValue}
              onValueChanged={(self) => setNightLightTemperature(self.value)}
            />
          </box>
        </box>
      </box>

      <box
        class="quick-settings__section-card"
        orientation={Gtk.Orientation.VERTICAL}
        spacing={8}
      >
        <SectionHeader iconName="audio-speakers-symbolic" label="Sound" />
        <box
          class="quick-settings__sliders-group"
          orientation={Gtk.Orientation.VERTICAL}
          spacing={6}
        >
          <box class="quick-settings__slider-row" spacing={10}>
            <box
              class="quick-settings__slider-icon-box"
              valign={Gtk.Align.CENTER}
            >
              <image
                class="quick-settings__volume-icon"
                iconName={getSpeakerIcon}
              />
            </box>
            <slider
              class="quick-settings__volume-slider"
              cursor={pointerCursor}
              hexpand
              sensitive={canControlVolume}
              value={getVolumeValue}
              onValueChanged={(self) => setVolume(self.value)}
            />
          </box>
        </box>
      </box>

      <box
        class="quick-settings__section-card"
        orientation={Gtk.Orientation.VERTICAL}
        spacing={8}
      >
        <SectionHeader iconName="battery-good-symbolic" label="Power" />

        <box class="quick-settings__battery-row" spacing={8}>
          <image iconName={getBatteryIcon} />
          <label label="Battery" xalign={0} hexpand />
          <label label={getBatteryPercentage} xalign={1} />
        </box>
        <box
          class="quick-settings__power-actions"
          orientation={Gtk.Orientation.HORIZONTAL}
          spacing={8}
          homogeneous
        >
          <button
            class="quick-settings__action-button quick-settings__power-action-button"
            onClicked={lockSession}
            tooltipText="Lock"
          >
            <image iconName="system-lock-screen-symbolic" />
          </button>
          <button
            class="quick-settings__action-button quick-settings__power-action-button"
            onClicked={logoutSession}
            tooltipText="Logout"
          >
            <image iconName="system-log-out-symbolic" />
          </button>
          <button
            class="quick-settings__action-button quick-settings__power-action-button"
            onClicked={suspendSystem}
            tooltipText="Sleep"
          >
            <image iconName="weather-clear-night-symbolic" />
          </button>
          <button
            class="quick-settings__action-button quick-settings__power-action-button"
            onClicked={rebootSystem}
            tooltipText="Restart"
          >
            <image iconName="system-reboot-symbolic" />
          </button>
          <button
            class="quick-settings__action-button quick-settings__power-action-button"
            onClicked={poweroffSystem}
            tooltipText="Shutdown"
          >
            <image iconName="system-shutdown-symbolic" />
          </button>
        </box>
      </box>

      <box
        class="quick-settings__section-card"
        orientation={Gtk.Orientation.VERTICAL}
        spacing={8}
      >
        <box class="quick-settings__section-header" spacing={8}>
          <SectionHeader
            iconName="preferences-system-notifications-symbolic"
            label="Notifications"
          />
          <button
            class={isDoNotDisturbEnabled((enabled) =>
              enabled
                ? "quick-settings__toggle-button quick-settings__toggle-button--active"
                : "quick-settings__toggle-button",
            )}
            onClicked={toggleDoNotDisturb}
          >
            <label label="Do Not Disturb" />
          </button>
          <button
            class="quick-settings__action-button"
            visible={notificationHistory((items) => items.length > 0)}
            onClicked={clearNotificationHistory}
          >
            <label label="Clear" />
          </button>
        </box>
        <label
          class="quick-settings__notifications-empty"
          visible={notificationHistory((items) => items.length === 0)}
          label="No recent notifications"
          xalign={0}
        />
        <box
          class="quick-settings__notifications-list"
          orientation={Gtk.Orientation.VERTICAL}
          spacing={6}
        >
          <For each={notificationHistory}>
            {(notification) => (
              <NotificationCard
                appName={notification.appName}
                summary={notification.summary}
                body={notification.body}
                iconName={notification.iconName}
                timeLabel={notification.timeLabel}
                bodyVisible={Boolean(notification.body.length)}
                onClose={() => dismissNotification(notification.id)}
                className="quick-settings__notification-card"
              />
            )}
          </For>
        </box>
      </box>
    </box>
  )
}
