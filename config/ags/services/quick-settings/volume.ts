import AstalWp from "gi://AstalWp"
import { createBinding } from "gnim"

import { volumeIconByValue } from "../../lib/audio"
import { clamp } from "../../lib/number"
import { showOsd } from "./osd"

const speaker = AstalWp.get_default()?.defaultSpeaker ?? null

export const speakerIconName = speaker
  ? createBinding(speaker, "volumeIcon").as(
      (name) => name || "audio-volume-muted-symbolic",
    )
  : "audio-volume-muted-symbolic"

export const volumeSensitive = Boolean(speaker)

export const volumeValue = speaker
  ? createBinding(speaker, "volume").as((value) => {
      const safeValue = Number.isFinite(value) ? value : 0
      return clamp(safeValue, 0, 1)
    })
  : 0

export const setVolume = (volume: number) => {
  if (!speaker) return

  const clampedVolume = clamp(volume, 0, 1)
  speaker.volume = clampedVolume
  showOsd(volumeIconByValue(clampedVolume), clampedVolume)
}
