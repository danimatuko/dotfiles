import AstalWp from "gi://AstalWp"
import { createBinding } from "gnim"

import { getVolumeIconByValue } from "../../lib/audio"
import { clamp } from "../../lib/number"
import { showOsd } from "./osd"

const speaker = AstalWp.get_default()?.defaultSpeaker ?? null

const getSpeakerVolume = () => {
  const value = Number((speaker as { volume?: number } | null)?.volume ?? 0)
  return clamp(Number.isFinite(value) ? value : 0, 0, 1)
}

const getSpeakerMuted = () => {
  const candidate =
    (speaker as { mute?: boolean; muted?: boolean } | null)?.mute ??
    (speaker as { mute?: boolean; muted?: boolean } | null)?.muted

  return Boolean(candidate)
}

const showCurrentSpeakerOsd = () => {
  const volume = getSpeakerVolume()
  const iconName = getSpeakerMuted()
    ? "audio-volume-muted-symbolic"
    : getVolumeIconByValue(volume)

  showOsd(iconName, volume)
}

speaker?.connect("notify::mute", () => {
  showCurrentSpeakerOsd()
})

speaker?.connect("notify::muted", () => {
  showCurrentSpeakerOsd()
})

export const getSpeakerIcon = speaker
  ? createBinding(speaker, "volumeIcon").as(
      (name) => name || "audio-volume-muted-symbolic",
    )
  : "audio-volume-muted-symbolic"

export const canControlVolume = Boolean(speaker)

export const getVolumeValue = speaker
  ? createBinding(speaker, "volume").as((value) => {
      const safeValue = Number.isFinite(value) ? value : 0
      return clamp(safeValue, 0, 1)
    })
  : 0

export const setVolume = (volume: number) => {
  if (!speaker) return

  const clampedVolume = clamp(volume, 0, 1)
  speaker.volume = clampedVolume
  showOsd(getVolumeIconByValue(clampedVolume), clampedVolume)
}
