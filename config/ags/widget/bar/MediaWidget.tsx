import { execAsync } from "ags/process"
import { createPoll } from "ags/time"
import { Gdk } from "ags/gtk4"

const pointerCursor = Gdk.Cursor.new_from_name("pointer", null)
const mediaPollIntervalMs = 220
const mediaFallbackLabel = "Nothing playing"
const mediaLabelMaxLength = 30
const mediaRefreshIntervalMs = 1000
const mediaScrollGap = "   "

type MediaInfo = {
  label: string
  tooltip: string
  visible: boolean
}

const truncateLabel = (value: string, maxLength = mediaLabelMaxLength) => {
  if (value.length <= maxLength) {
    return value
  }

  return `${value.slice(0, maxLength - 1)}…`
}

const getScrolledLabel = (value: string, frame: number) => {
  if (value.length <= mediaLabelMaxLength) {
    return value
  }

  const loop = `${value}${mediaScrollGap}`
  const offset = frame % loop.length
  const wrapped = `${loop.slice(offset)}${loop.slice(0, offset)}`
  return wrapped.slice(0, mediaLabelMaxLength)
}

let mediaFrame = 0
let lastMediaRefresh = 0
let cachedStatus = ""
let cachedMetadata = ""

const loadMediaInfo = async (): Promise<MediaInfo> => {
  try {
    const now = Date.now()
    const shouldRefresh = now - lastMediaRefresh >= mediaRefreshIntervalMs

    if (shouldRefresh) {
      cachedStatus = (await execAsync(["playerctl", "status"]))?.trim() ?? ""
      cachedMetadata = (
        await execAsync([
          "playerctl",
          "metadata",
          "--format",
          "{{artist}} - {{title}}",
        ])
      ).trim()
      lastMediaRefresh = now
    }

    const status = cachedStatus
    const metadata = cachedMetadata

    if (status !== "Playing" && status !== "Paused") {
      mediaFrame = 0
      return {
        label: mediaFallbackLabel,
        tooltip: mediaFallbackLabel,
        visible: false,
      }
    }

    if (!metadata) {
      mediaFrame = 0
      return {
        label: status === "Paused" ? "Paused" : mediaFallbackLabel,
        tooltip: status === "Paused" ? "Paused" : mediaFallbackLabel,
        visible: status === "Paused",
      }
    }

    const tooltipPrefix = status === "Paused" ? "Paused: " : "Now playing: "

    if (status === "Playing") {
      mediaFrame += 1

      return {
        label: getScrolledLabel(metadata, mediaFrame),
        tooltip: `${tooltipPrefix}${metadata}`,
        visible: true,
      }
    }

    mediaFrame = 0

    return {
      label: truncateLabel(metadata),
      tooltip: `${tooltipPrefix}${metadata}`,
      visible: true,
    }
  } catch {
    mediaFrame = 0
    lastMediaRefresh = 0
    cachedStatus = ""
    cachedMetadata = ""

    return {
      label: mediaFallbackLabel,
      tooltip: mediaFallbackLabel,
      visible: false,
    }
  }
}

const togglePlayback = () => {
  execAsync(["playerctl", "play-pause"]).catch(() => {})
}

export default function MediaWidget() {
  const mediaInfo = createPoll<MediaInfo>(
    {
      label: mediaFallbackLabel,
      tooltip: mediaFallbackLabel,
      visible: false,
    },
    mediaPollIntervalMs,
    loadMediaInfo,
  )

  return (
    <box class="media-widget" visible={mediaInfo.as((info) => info.visible)}>
      <label class="bar__center-separator" label="|" />
      <button
        class="media-widget__button"
        cursor={pointerCursor}
        onClicked={togglePlayback}
        tooltipText={mediaInfo.as((info) => info.tooltip)}
      >
        <label
          class="media-widget__label"
          label={mediaInfo.as((info) => info.label)}
        />
      </button>
    </box>
  )
}
