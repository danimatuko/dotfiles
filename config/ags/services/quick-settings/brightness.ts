import GLib from "gi://GLib"
import { execAsync } from "ags/process"
import { createState } from "gnim"

import { getBrightnessPercentFromOutput } from "../../lib/brightness"
import { clamp } from "../../lib/number"
import { showOsd } from "./osd"

const [brightnessPercent, setBrightnessPercent] = createState(0)

let brightnessDevice: string | null = null
let lastBrightnessPercent: number | null = null

const detectBrightnessDevice = async () => {
  if (brightnessDevice) return brightnessDevice

  try {
    const output = await execAsync(["brightnessctl", "-m"])
    const firstLine = output.trim().split("\n")[0] ?? ""
    const device = firstLine.split(",")[0]?.trim()
    brightnessDevice = device || null
  } catch {
    brightnessDevice = null
  }

  return brightnessDevice
}

const refreshBrightness = () => {
  detectBrightnessDevice()
    .then((device) =>
      execAsync(
        device
          ? ["brightnessctl", "-d", device, "-m"]
          : ["brightnessctl", "-m"],
      ),
    )
    .then((output) => {
      const nextPercent = getBrightnessPercentFromOutput(output)
      const hadPreviousPercent = lastBrightnessPercent !== null
      const brightnessChanged = lastBrightnessPercent !== nextPercent

      setBrightnessPercent(nextPercent)

      if (hadPreviousPercent && brightnessChanged) {
        showOsd("display-brightness-symbolic", nextPercent / 100)
      }

      lastBrightnessPercent = nextPercent
    })
    .catch(() => {
      setBrightnessPercent(0)
    })
}

refreshBrightness()
GLib.timeout_add(GLib.PRIORITY_DEFAULT, 300, () => {
  refreshBrightness()
  return GLib.SOURCE_CONTINUE
})

export const getBrightnessValue = brightnessPercent((percent) => percent / 100)

export const getBrightnessIcon = "display-brightness-symbolic"

export const setBrightness = (percent: number) => {
  const clampedValue = clamp(percent, 0, 1)
  const clampedPercent = Math.round(clampedValue * 100)

  setBrightnessPercent(clampedPercent)
  lastBrightnessPercent = clampedPercent
  showOsd("display-brightness-symbolic", clampedValue)

  detectBrightnessDevice()
    .then((device) =>
      execAsync(
        device
          ? ["brightnessctl", "-d", device, "set", `${clampedPercent}%`]
          : ["brightnessctl", "set", `${clampedPercent}%`],
      ),
    )
    .catch(() => {})
}
