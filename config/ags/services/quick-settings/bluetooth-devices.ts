import GLib from "gi://GLib"
import { execAsync } from "ags/process"
import { createState } from "gnim"

import { getCommandPath } from "../../lib/commands"

export type BluetoothDevice = {
  id: string
  name: string
  connected: boolean
  paired: boolean
  trusted: boolean
}

const bluetoothctlCommand = getCommandPath(
  "bluetoothctl",
  "/usr/bin/bluetoothctl",
)
const canUseBluetoothctl = Boolean(bluetoothctlCommand)

const [bluetoothDevicesState, setBluetoothDevicesState] = createState<
  BluetoothDevice[]
>([])
const [bluetoothDevicesLoadingState, setBluetoothDevicesLoadingState] =
  createState(false)
const [bluetoothDevicesErrorState, setBluetoothDevicesErrorState] =
  createState("")
const [bluetoothDeviceActionState, setBluetoothDeviceActionState] =
  createState("")

const getBluetoothctlCommand = () => {
  if (!bluetoothctlCommand) throw new Error("bluetoothctl is not available")
  return bluetoothctlCommand
}

const parseDeviceList = (output: string) => {
  return output
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("Device "))
    .map((line) => {
      const match = line.match(/^Device\s+([0-9A-F:]{17})\s+(.+)$/i)
      if (!match) return null

      return {
        id: match[1],
        name: (match[2] ?? "").trim() || "Unknown Device",
      }
    })
    .filter((device): device is { id: string; name: string } => device !== null)
}

const parseInfoProperty = (infoOutput: string, key: string) => {
  const line = infoOutput
    .split("\n")
    .map((value) => value.trim())
    .find((value) => value.startsWith(`${key}:`))

  if (!line) return ""
  return line.split(":")[1]?.trim() ?? ""
}

const parseDeviceIds = (output: string) => {
  return output
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("Device "))
    .map((line) => line.match(/^Device\s+([0-9A-F:]{17})\s+/i)?.[1] ?? "")
    .filter((id) => id.length > 0)
}

const readDeviceInfo = async (id: string) => {
  const output = await execAsync([getBluetoothctlCommand(), "info", id])
  return `${output}`
}

const loadBluetoothDevice = async (
  device: { id: string; name: string },
  connectedDeviceIds: Set<string> | null,
  pairedDeviceIds: Set<string> | null,
) => {
  const info = await readDeviceInfo(device.id)
  const connected = connectedDeviceIds
    ? connectedDeviceIds.has(device.id)
    : parseInfoProperty(info, "Connected") === "yes"
  const paired = pairedDeviceIds
    ? pairedDeviceIds.has(device.id)
    : parseInfoProperty(info, "Paired") === "yes"
  const trusted = parseInfoProperty(info, "Trusted") === "yes"

  return {
    id: device.id,
    name: device.name,
    connected,
    paired,
    trusted,
  }
}

const sortBluetoothDevices = (devices: BluetoothDevice[]) => {
  return [...devices].sort((a, b) => {
    if (a.connected && !b.connected) return -1
    if (!a.connected && b.connected) return 1
    return a.name.localeCompare(b.name)
  })
}

export const bluetoothDevices = bluetoothDevicesState
export const isBluetoothDevicesLoading = bluetoothDevicesLoadingState
export const bluetoothDevicesError = bluetoothDevicesErrorState
export const bluetoothDeviceAction = bluetoothDeviceActionState

export const refreshBluetoothDevices = async () => {
  if (!canUseBluetoothctl) {
    setBluetoothDevicesState([])
    setBluetoothDevicesErrorState("bluetoothctl is not available")
    return
  }

  setBluetoothDevicesLoadingState(true)
  setBluetoothDevicesErrorState("")

  try {
    const output = await execAsync([getBluetoothctlCommand(), "devices"])
    const devices = parseDeviceList(`${output}`)

    let connectedDeviceIds: Set<string> | null = null
    try {
      const connectedOutput = await execAsync([
        getBluetoothctlCommand(),
        "devices",
        "Connected",
      ])
      connectedDeviceIds = new Set(parseDeviceIds(`${connectedOutput}`))
    } catch {
      connectedDeviceIds = null
    }

    let pairedDeviceIds: Set<string> | null = null
    try {
      const pairedOutput = await execAsync([
        getBluetoothctlCommand(),
        "paired-devices",
      ])
      pairedDeviceIds = new Set(parseDeviceIds(`${pairedOutput}`))
    } catch {
      pairedDeviceIds = null
    }

    const detailed = await Promise.all(
      devices.map((device) =>
        loadBluetoothDevice(device, connectedDeviceIds, pairedDeviceIds),
      ),
    )
    setBluetoothDevicesState(sortBluetoothDevices(detailed))
  } catch (error) {
    setBluetoothDevicesErrorState("Could not load Bluetooth devices")
    console.error("[quick-settings/bluetooth-devices] failed to refresh", error)
  } finally {
    setBluetoothDevicesLoadingState(false)
  }
}

export const connectBluetoothDevice = async (device: BluetoothDevice) => {
  if (!canUseBluetoothctl) return

  setBluetoothDeviceActionState(device.id)
  setBluetoothDevicesErrorState("")

  try {
    await execAsync([getBluetoothctlCommand(), "connect", device.id])
    await refreshBluetoothDevices()
  } catch (error) {
    setBluetoothDevicesErrorState(`Could not connect to ${device.name}`)
    console.error("[quick-settings/bluetooth-devices] failed to connect", error)
  } finally {
    setBluetoothDeviceActionState("")
  }
}

export const disconnectBluetoothDevice = async (device: BluetoothDevice) => {
  if (!canUseBluetoothctl) return

  setBluetoothDeviceActionState(device.id)
  setBluetoothDevicesErrorState("")

  try {
    await execAsync([getBluetoothctlCommand(), "disconnect", device.id])
    await refreshBluetoothDevices()
  } catch (error) {
    setBluetoothDevicesErrorState(`Could not disconnect ${device.name}`)
    console.error(
      "[quick-settings/bluetooth-devices] failed to disconnect",
      error,
    )
  } finally {
    setBluetoothDeviceActionState("")
  }
}

if (canUseBluetoothctl) {
  refreshBluetoothDevices().catch(() => {})
  GLib.timeout_add(GLib.PRIORITY_DEFAULT, 15000, () => {
    refreshBluetoothDevices().catch(() => {})
    return GLib.SOURCE_CONTINUE
  })
}
