import { For } from "ags"
import { Gdk, Gtk } from "ags/gtk4"
import { createState } from "gnim"
import type { WifiNetwork } from "../../services/quick-settings/wifi-networks"

import {
  canToggleBluetooth,
  canToggleDarkMode,
  canToggleNightLight,
  canToggleWifi,
  getBluetoothButtonClass,
  getBluetoothIcon,
  getDarkModeButtonClass,
  getDarkModeIcon,
  getNightLightButtonClass,
  getNightLightIcon,
  getWifiTooltip,
  getWifiButtonClass,
  getWifiIcon,
  connectWifiNetwork,
  disconnectWifiNetwork,
  refreshWifiNetworks,
  wifiNetworkAction,
  wifiNetworks,
  wifiNetworksError,
  toggleBluetooth,
  toggleDarkMode,
  toggleNightLight,
  toggleWifi,
} from "../../services/quick-settings"
import QuickSettingsToggleButton from "./QuickSettingsToggleButton"
import SectionCard from "./SectionCard"

export default function ConnectivitySection() {
  const [isWifiExpanded, setWifiExpanded] = createState(false)
  const pointerCursor = Gdk.Cursor.new_from_name("pointer", null)

  const wifiStatusLabel = wifiNetworks((entries) => {
    const active = entries.find((entry) => entry.isActive)
    if (!active) return "Status: Not connected"
    return `Status: Connected to ${active.ssid}`
  })

  return (
    <SectionCard
      iconName="network-wireless-signal-excellent-symbolic"
      label="Connectivity"
      spacing={10}
    >
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
          tooltipText={getWifiTooltip}
        />
        <QuickSettingsToggleButton
          iconName={getBluetoothIcon}
          iconClassName="quick-settings__toggle-icon quick-settings__toggle-icon--bluetooth"
          className={getBluetoothButtonClass}
          onClicked={toggleBluetooth}
          sensitive={canToggleBluetooth}
          iconOnly
          hexpand
          tooltipText="Toggle Bluetooth"
        />
        <QuickSettingsToggleButton
          iconName={getNightLightIcon}
          className={getNightLightButtonClass}
          onClicked={toggleNightLight}
          sensitive={canToggleNightLight}
          iconOnly
          hexpand
          tooltipText="Toggle Night Light"
        />
        <QuickSettingsToggleButton
          iconName={getDarkModeIcon}
          className={getDarkModeButtonClass}
          onClicked={toggleDarkMode}
          sensitive={canToggleDarkMode}
          iconOnly
          hexpand
          tooltipText="Toggle Dark Mode"
        />
      </box>

      <button
        class="quick-settings__toggle-button"
        cursor={pointerCursor}
        onClicked={() => {
          const nextExpanded = !isWifiExpanded()
          setWifiExpanded(nextExpanded)
          if (nextExpanded) {
            refreshWifiNetworks().catch(() => {})
          }
        }}
      >
        <box class="quick-settings__toggle-content" spacing={10} hexpand>
          <image iconName="network-wireless-signal-excellent-symbolic" />
          <box
            class="quick-settings__wifi-summary"
            orientation={Gtk.Orientation.VERTICAL}
            hexpand
          >
            <label label="Wi-Fi Networks" xalign={0} />
            <label
              class="quick-settings__wifi-status"
              label={wifiStatusLabel}
              xalign={0}
            />
          </box>
          <image
            iconName={isWifiExpanded((expanded) =>
              expanded ? "pan-down-symbolic" : "pan-end-symbolic",
            )}
          />
        </box>
      </button>

      <revealer
        revealChild={isWifiExpanded}
        transitionType={Gtk.RevealerTransitionType.SLIDE_DOWN}
      >
        <box
          class="quick-settings__wifi-panel"
          orientation={Gtk.Orientation.VERTICAL}
          spacing={8}
        >
          <label
            class="quick-settings__wifi-error"
            label={wifiNetworksError}
            visible={wifiNetworksError((value) => value.length > 0)}
            xalign={0}
          />

          <box
            class="quick-settings__wifi-list"
            orientation={Gtk.Orientation.VERTICAL}
            spacing={6}
          >
            <label
              class="quick-settings__wifi-empty"
              label="No Wi-Fi networks found"
              visible={wifiNetworks((entries) => entries.length === 0)}
              xalign={0}
            />
            <For each={wifiNetworks}>
              {(network: WifiNetwork) => (
                <box
                  class="quick-settings__wifi-row"
                  spacing={8}
                  valign={Gtk.Align.CENTER}
                >
                  <image
                    class="quick-settings__wifi-signal"
                    iconName={
                      network.signal >= 80
                        ? "network-wireless-signal-excellent-symbolic"
                        : network.signal >= 55
                          ? "network-wireless-signal-good-symbolic"
                          : network.signal >= 30
                            ? "network-wireless-signal-ok-symbolic"
                            : "network-wireless-signal-weak-symbolic"
                    }
                  />
                  <box
                    class="quick-settings__wifi-meta"
                    orientation={Gtk.Orientation.VERTICAL}
                    hexpand
                  >
                    <box class="quick-settings__wifi-title-row" spacing={6}>
                      <label
                        class="quick-settings__wifi-ssid"
                        label={network.ssid}
                        xalign={0}
                        hexpand
                      />
                    </box>
                    <box class="quick-settings__wifi-details-row" spacing={4}>
                      <image
                        class="quick-settings__wifi-security-icon"
                        iconName={
                          network.security.toLowerCase() === "open"
                            ? "changes-allow-symbolic"
                            : "changes-prevent-symbolic"
                        }
                      />
                      <label
                        class="quick-settings__wifi-security"
                        label={`${
                          network.security.toLowerCase() === "open"
                            ? "Open"
                            : "Secured"
                        }  |  ${network.signal}%`}
                        xalign={0}
                      />
                    </box>
                  </box>
                  <button
                    class={
                      network.isActive
                        ? "quick-settings__action-button quick-settings__wifi-connect-button quick-settings__wifi-connect-button--active"
                        : "quick-settings__action-button quick-settings__wifi-connect-button"
                    }
                    cursor={pointerCursor}
                    sensitive={wifiNetworkAction(
                      (actionId) => !actionId.length,
                    )}
                    onClicked={() => {
                      if (network.isActive) {
                        disconnectWifiNetwork().catch(() => {})
                        return
                      }

                      connectWifiNetwork(network).catch(() => {})
                    }}
                  >
                    <label
                      label={wifiNetworkAction((actionId) => {
                        if (network.isActive && actionId === "disconnect") {
                          return "Disconnecting..."
                        }
                        if (actionId === network.id) return "Connecting..."
                        return network.isActive ? "Disconnect" : "Connect"
                      })}
                    />
                  </button>
                </box>
              )}
            </For>
          </box>
        </box>
      </revealer>
    </SectionCard>
  )
}
