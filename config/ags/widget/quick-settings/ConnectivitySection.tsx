import { For } from "ags"
import { Gdk, Gtk } from "ags/gtk4"
import { createState } from "gnim"
import type { BluetoothDevice } from "../../services/quick-settings/bluetooth-devices"
import type { WifiNetwork } from "../../services/quick-settings/wifi-networks"

import {
  canToggleBluetooth,
  canToggleDarkMode,
  canToggleNightLight,
  canToggleWifi,
  bluetoothDeviceAction,
  bluetoothDevices,
  bluetoothDevicesError,
  connectBluetoothDevice,
  disconnectBluetoothDevice,
  getBluetoothButtonClass,
  getBluetoothIcon,
  getDarkModeButtonClass,
  getDarkModeIcon,
  getNightLightButtonClass,
  getNightLightIcon,
  getWifiTooltip,
  getWifiButtonClass,
  getWifiIcon,
  isBluetoothDevicesLoading,
  refreshBluetoothDevices,
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
  const [isBluetoothExpanded, setBluetoothExpanded] = createState(false)
  const pointerCursor = Gdk.Cursor.new_from_name("pointer", null)

  const wifiStatusLabel = wifiNetworks((entries) => {
    const active = entries.find((entry) => entry.isActive)
    if (!active) return "Status: Not connected"
    return `Status: Connected to ${active.ssid}`
  })

  const bluetoothStatusLabel = bluetoothDevices((entries) => {
    const connected = entries.find((entry) => entry.connected)
    if (!connected) return "Status: Not connected"
    return `Status: Connected to ${connected.name}`
  })

  const knownBluetoothDevices = bluetoothDevices((entries) =>
    entries.filter((entry) => entry.connected || entry.paired),
  )

  const otherBluetoothDevices = bluetoothDevices((entries) =>
    entries.filter((entry) => !entry.connected && !entry.paired),
  )

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
                  class={
                    network.isActive
                      ? "quick-settings__wifi-row quick-settings__wifi-row--active"
                      : "quick-settings__wifi-row"
                  }
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

      <button
        class="quick-settings__toggle-button"
        cursor={pointerCursor}
        onClicked={() => {
          const nextExpanded = !isBluetoothExpanded()
          setBluetoothExpanded(nextExpanded)
          if (nextExpanded) {
            refreshBluetoothDevices().catch(() => {})
          }
        }}
      >
        <box class="quick-settings__toggle-content" spacing={10} hexpand>
          <image iconName="bluetooth-symbolic" />
          <box
            class="quick-settings__bluetooth-summary"
            orientation={Gtk.Orientation.VERTICAL}
            hexpand
          >
            <label label="Bluetooth Devices" xalign={0} />
            <label
              class="quick-settings__bluetooth-status"
              label={bluetoothStatusLabel}
              xalign={0}
            />
          </box>
          <image
            iconName={isBluetoothExpanded((expanded) =>
              expanded ? "pan-down-symbolic" : "pan-end-symbolic",
            )}
          />
        </box>
      </button>

      <revealer
        revealChild={isBluetoothExpanded}
        transitionType={Gtk.RevealerTransitionType.SLIDE_DOWN}
      >
        <box
          class="quick-settings__bluetooth-panel"
          orientation={Gtk.Orientation.VERTICAL}
          spacing={8}
        >
          <button
            class="quick-settings__action-button"
            cursor={pointerCursor}
            onClicked={() => {
              refreshBluetoothDevices().catch(() => {})
            }}
          >
            <label
              label={isBluetoothDevicesLoading((loading) =>
                loading ? "Scanning..." : "Scan",
              )}
            />
          </button>

          <label
            class="quick-settings__bluetooth-error"
            label={bluetoothDevicesError}
            visible={bluetoothDevicesError((value) => value.length > 0)}
            xalign={0}
          />

          <box
            class="quick-settings__bluetooth-list"
            orientation={Gtk.Orientation.VERTICAL}
            spacing={6}
          >
            <label
              class="quick-settings__bluetooth-group-label"
              label="Known Devices"
              visible={knownBluetoothDevices((entries) => entries.length > 0)}
              xalign={0}
            />
            <label
              class="quick-settings__bluetooth-empty"
              label="No known Bluetooth devices"
              visible={knownBluetoothDevices((entries) => entries.length === 0)}
              xalign={0}
            />
            <box
              class="quick-settings__bluetooth-group"
              orientation={Gtk.Orientation.VERTICAL}
              spacing={6}
              visible={knownBluetoothDevices((entries) => entries.length > 0)}
            >
              <For each={knownBluetoothDevices}>
                {(device: BluetoothDevice) => (
                  <box
                    class={
                      device.connected
                        ? "quick-settings__bluetooth-row quick-settings__bluetooth-row--active"
                        : "quick-settings__bluetooth-row"
                    }
                    spacing={8}
                    valign={Gtk.Align.CENTER}
                  >
                    <image
                      class="quick-settings__bluetooth-icon"
                      iconName="bluetooth-symbolic"
                    />
                    <box
                      class="quick-settings__bluetooth-meta"
                      orientation={Gtk.Orientation.VERTICAL}
                      hexpand
                    >
                      <label
                        class="quick-settings__bluetooth-name"
                        label={device.name}
                        xalign={0}
                        hexpand
                      />
                      <label
                        class="quick-settings__bluetooth-details"
                        label={`${device.paired ? "Paired" : "Unpaired"}  |  ${
                          device.trusted ? "Trusted" : "Untrusted"
                        }`}
                        xalign={0}
                      />
                    </box>
                    <button
                      class={
                        device.connected
                          ? "quick-settings__action-button quick-settings__bluetooth-connect-button quick-settings__bluetooth-connect-button--active"
                          : "quick-settings__action-button quick-settings__bluetooth-connect-button"
                      }
                      cursor={pointerCursor}
                      sensitive={bluetoothDeviceAction(
                        (actionId) => !actionId.length,
                      )}
                      onClicked={() => {
                        if (device.connected) {
                          disconnectBluetoothDevice(device).catch(() => {})
                          return
                        }

                        connectBluetoothDevice(device).catch(() => {})
                      }}
                    >
                      <label
                        label={bluetoothDeviceAction((actionId) => {
                          if (actionId === device.id) {
                            return device.connected
                              ? "Disconnecting..."
                              : "Connecting..."
                          }
                          return device.connected ? "Disconnect" : "Connect"
                        })}
                      />
                    </button>
                  </box>
                )}
              </For>
            </box>

            <label
              class="quick-settings__bluetooth-group-label"
              label="Other Devices"
              visible={otherBluetoothDevices((entries) => entries.length > 0)}
              xalign={0}
            />
            <box
              class="quick-settings__bluetooth-group"
              orientation={Gtk.Orientation.VERTICAL}
              spacing={6}
              visible={otherBluetoothDevices((entries) => entries.length > 0)}
            >
              <For each={otherBluetoothDevices}>
                {(device: BluetoothDevice) => (
                  <box
                    class="quick-settings__bluetooth-row"
                    spacing={8}
                    valign={Gtk.Align.CENTER}
                  >
                    <image
                      class="quick-settings__bluetooth-icon"
                      iconName="bluetooth-symbolic"
                    />
                    <box
                      class="quick-settings__bluetooth-meta"
                      orientation={Gtk.Orientation.VERTICAL}
                      hexpand
                    >
                      <label
                        class="quick-settings__bluetooth-name"
                        label={device.name}
                        xalign={0}
                        hexpand
                      />
                      <label
                        class="quick-settings__bluetooth-details"
                        label={`${device.paired ? "Paired" : "Unpaired"}  |  ${
                          device.trusted ? "Trusted" : "Untrusted"
                        }`}
                        xalign={0}
                      />
                    </box>
                    <button
                      class="quick-settings__action-button quick-settings__bluetooth-connect-button"
                      cursor={pointerCursor}
                      sensitive={bluetoothDeviceAction(
                        (actionId) => !actionId.length,
                      )}
                      onClicked={() => {
                        connectBluetoothDevice(device).catch(() => {})
                      }}
                    >
                      <label
                        label={bluetoothDeviceAction((actionId) =>
                          actionId === device.id ? "Connecting..." : "Connect",
                        )}
                      />
                    </button>
                  </box>
                )}
              </For>
            </box>
          </box>
        </box>
      </revealer>
    </SectionCard>
  )
}
