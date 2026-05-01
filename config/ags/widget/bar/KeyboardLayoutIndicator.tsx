import { createPoll } from "ags/time"
import { execAsync } from "ags/process"
import { Gdk } from "ags/gtk4"

type HyprlandDevices = {
  keyboards?: Array<{
    main?: boolean
    name?: string
    active_keymap?: string
  }>
}

const fallbackLayoutLabel = "--"
const fallbackLayoutName = "Keyboard layout unavailable"
const tooltipHint = "Click to switch"
const pointerCursor = Gdk.Cursor.new_from_name("pointer", null)

const toShortLayoutLabel = (keymap: string) => {
  if (/^[a-z]{2,3}$/i.test(keymap)) {
    return keymap.toUpperCase()
  }

  const normalizedLabel = keymap.split("(")[0].trim()
  if (!normalizedLabel) {
    return fallbackLayoutLabel
  }

  const languageKey = normalizedLabel.split(/\s+/)[0]
  return languageKey.slice(0, 2).toUpperCase() || fallbackLayoutLabel
}

const getLayoutLabel = async () => {
  try {
    const output = await execAsync(["hyprctl", "devices", "-j"])
    const devices = JSON.parse(output) as HyprlandDevices
    const keyboards = devices.keyboards ?? []
    const activeKeyboard = keyboards.find((keyboard) => keyboard.main) ?? keyboards[0]
    const keymap = activeKeyboard?.active_keymap?.trim() ?? ""

    if (!keymap) {
      return fallbackLayoutLabel
    }

    return toShortLayoutLabel(keymap)
  } catch {
    return fallbackLayoutLabel
  }
}

const getLayoutName = async () => {
  try {
    const output = await execAsync(["hyprctl", "devices", "-j"])
    const devices = JSON.parse(output) as HyprlandDevices
    const keyboards = devices.keyboards ?? []
    const activeKeyboard = keyboards.find((keyboard) => keyboard.main) ?? keyboards[0]
    const keymap = activeKeyboard?.active_keymap?.trim() ?? ""

    return keymap || fallbackLayoutName
  } catch {
    return fallbackLayoutName
  }
}

const cycleKeyboardLayout = async () => {
  try {
    const output = await execAsync(["hyprctl", "devices", "-j"])
    const devices = JSON.parse(output) as HyprlandDevices
    const keyboards = devices.keyboards ?? []
    const activeKeyboard = keyboards.find((keyboard) => keyboard.main) ?? keyboards[0]
    const keyboardName = activeKeyboard?.name?.trim()

    if (!keyboardName) {
      return
    }

    await execAsync(["hyprctl", "switchxkblayout", keyboardName, "next"])
  } catch {}
}

export default function KeyboardLayoutIndicator() {
  const layout = createPoll(fallbackLayoutLabel, 1000, getLayoutLabel)
  const layoutName = createPoll(fallbackLayoutName, 1000, getLayoutName)
  const tooltipText = layoutName.as((name) => `${name} - ${tooltipHint}`)

  return (
    <button
      class="status-indicator status-indicator--keyboard"
      cursor={pointerCursor}
      onClicked={cycleKeyboardLayout}
      tooltipText={tooltipText}
    >
      <label class="status-indicator__layout" label={layout} />
    </button>
  )
}
