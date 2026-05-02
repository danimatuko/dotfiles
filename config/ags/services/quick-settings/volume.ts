import AstalWp from "gi://AstalWp"
import { createBinding } from "gnim"

import { getVolumeIconByValue } from "../../lib/audio"
import { clamp } from "../../lib/number"
import { showOsd } from "./osd"

const wireplumber = AstalWp.get_default() ?? null
const speaker = wireplumber?.defaultSpeaker ?? null

const getNodeName = (
  node:
    | { description?: string | null; nick?: string | null; name?: string | null }
    | null
) => {
  const name = node?.description ?? node?.nick ?? node?.name
  return name?.trim() || "Unknown"
}

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

export const getSpeakerTooltip = speaker
  ? createBinding(speaker, "volume").as((value) => {
      const safeValue = Number.isFinite(value) ? value : 0
      const clampedVolume = clamp(safeValue, 0, 1)
      const percent = Math.round(clampedVolume * 100)
      const outputName = getNodeName(
        (wireplumber?.defaultSpeaker as {
          description?: string | null
          nick?: string | null
          name?: string | null
        } | null) ?? null,
      )
      const inputName = getNodeName(
        (wireplumber?.defaultMicrophone as {
          description?: string | null
          nick?: string | null
          name?: string | null
        } | null) ?? null,
      )

      if (getSpeakerMuted()) {
        return `Output: ${outputName}\nInput: ${inputName}\nVolume: Muted\nClick to open Wiremix`
      }

      return `Output: ${outputName}\nInput: ${inputName}\nVolume: ${percent}%\nClick to open Wiremix`
    })
  : "Volume: Unavailable"

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
