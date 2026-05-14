import GLib from "gi://GLib"
import { execAsync } from "ags/process"
import { createState } from "gnim"

import { getCommandPath } from "../../lib/commands"

export type WifiNetwork = {
  id: string
  ssid: string
  signal: number
  security: string
  isActive: boolean
}

const nmcliCommand = getCommandPath("nmcli", "/usr/bin/nmcli")
const canUseNmcli = Boolean(nmcliCommand)

const getNmcliCommand = () => {
  if (!nmcliCommand) throw new Error("nmcli is not available")
  return nmcliCommand
}
const [wifiNetworksState, setWifiNetworksState] = createState<WifiNetwork[]>([])
const [wifiNetworksLoadingState, setWifiNetworksLoadingState] =
  createState(false)
const [wifiNetworksErrorState, setWifiNetworksErrorState] = createState("")
const [wifiNetworkActionState, setWifiNetworkActionState] = createState("")

const parseSignal = (value: string) => {
  const parsed = Number.parseInt(value.trim(), 10)
  if (Number.isNaN(parsed)) return 0
  return Math.max(0, Math.min(100, parsed))
}

const splitNmcliRow = (line: string) => {
  const parts: string[] = []
  let current = ""

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i]
    const previous = i > 0 ? line[i - 1] : ""

    if (char === ":" && previous !== "\\") {
      parts.push(current)
      current = ""
      continue
    }

    if (char === "\\" && line[i + 1] === ":") {
      continue
    }

    current += char
  }

  parts.push(current)
  return parts.map((part) => part.trim())
}

const parseWifiListOutput = (output: string): WifiNetwork[] => {
  const uniqueNetworks = new Map<string, WifiNetwork>()

  output
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .forEach((line) => {
      const columns = splitNmcliRow(line)
      const inUse = columns[0] ?? ""
      const ssid = (columns[1] ?? "").trim()
      const bssid = (columns[2] ?? "").trim()
      const signal = parseSignal(columns[3] ?? "0")
      const security = (columns[4] ?? "").trim() || "Open"

      if (!ssid || !bssid) return

      const existing = uniqueNetworks.get(ssid)
      const nextNetwork: WifiNetwork = {
        id: bssid,
        ssid,
        signal,
        security,
        isActive: inUse === "*",
      }

      if (
        !existing ||
        nextNetwork.signal > existing.signal ||
        nextNetwork.isActive
      ) {
        uniqueNetworks.set(ssid, nextNetwork)
      }
    })

  return [...uniqueNetworks.values()].sort((a, b) => b.signal - a.signal)
}

const wifiDeviceNameFromStatus = async () => {
  const output = await execAsync([
    getNmcliCommand(),
    "-t",
    "-f",
    "DEVICE,TYPE",
    "device",
  ])
  const wifiLine = output
    .split("\n")
    .map((line) => line.trim())
    .find((line) => line.endsWith(":wifi"))

  if (!wifiLine) return ""

  const [deviceName] = wifiLine.split(":")
  return (deviceName ?? "").trim()
}

export const wifiNetworks = wifiNetworksState
export const wifiNetworksError = wifiNetworksErrorState
export const wifiNetworkAction = wifiNetworkActionState

export const refreshWifiNetworks = async () => {
  if (!canUseNmcli) {
    setWifiNetworksState([])
    setWifiNetworksErrorState("nmcli is not available")
    return
  }

  setWifiNetworksLoadingState(true)
  setWifiNetworksErrorState("")

  try {
    const output = await execAsync([
      getNmcliCommand(),
      "-t",
      "-f",
      "IN-USE,SSID,BSSID,SIGNAL,SECURITY",
      "device",
      "wifi",
      "list",
      "--rescan",
      "auto",
    ])
    setWifiNetworksState(parseWifiListOutput(`${output}`))
  } catch (error) {
    setWifiNetworksErrorState("Could not scan Wi-Fi networks")
    console.error("[quick-settings/wifi-networks] failed to refresh", error)
  } finally {
    setWifiNetworksLoadingState(false)
  }
}

export const connectWifiNetwork = async (network: WifiNetwork) => {
  if (!canUseNmcli) return

  setWifiNetworkActionState(network.id)
  setWifiNetworksErrorState("")

  try {
    await execAsync([
      getNmcliCommand(),
      "device",
      "wifi",
      "connect",
      network.ssid,
      "bssid",
      network.id,
    ])
    await refreshWifiNetworks()
  } catch (error) {
    setWifiNetworksErrorState(`Could not connect to ${network.ssid}`)
    console.error("[quick-settings/wifi-networks] failed to connect", error)
  } finally {
    setWifiNetworkActionState("")
  }
}

export const disconnectWifiNetwork = async () => {
  if (!canUseNmcli) return

  setWifiNetworkActionState("disconnect")
  setWifiNetworksErrorState("")

  try {
    const deviceName = await wifiDeviceNameFromStatus()
    if (!deviceName) {
      setWifiNetworksErrorState("No Wi-Fi device found")
      return
    }

    await execAsync([getNmcliCommand(), "device", "disconnect", deviceName])
    await refreshWifiNetworks()
  } catch (error) {
    setWifiNetworksErrorState("Could not disconnect Wi-Fi")
    console.error("[quick-settings/wifi-networks] failed to disconnect", error)
  } finally {
    setWifiNetworkActionState("")
  }
}

if (canUseNmcli) {
  refreshWifiNetworks().catch(() => {})
  GLib.timeout_add(GLib.PRIORITY_DEFAULT, 15000, () => {
    refreshWifiNetworks().catch(() => {})
    return GLib.SOURCE_CONTINUE
  })
}
