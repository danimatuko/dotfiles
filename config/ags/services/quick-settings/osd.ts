import GLib from "gi://GLib"
import { createState } from "gnim"

import { clamp } from "../../lib/number"

const [osdVisibleState, setOsdVisibleState] = createState(false)
const [osdIconNameState, setOsdIconNameState] = createState(
  "audio-volume-muted-symbolic",
)
const [osdValueState, setOsdValueState] = createState(0)

let osdTimeoutId = 0

export const isOsdVisible = osdVisibleState
export const getOsdIcon = osdIconNameState
export const getOsdValue = osdValueState

export const showOsd = (iconName: string, value: number) => {
  setOsdIconNameState(iconName)
  setOsdValueState(clamp(value, 0, 1))
  setOsdVisibleState(true)

  if (osdTimeoutId > 0) {
    GLib.source_remove(osdTimeoutId)
  }

  osdTimeoutId = GLib.timeout_add(GLib.PRIORITY_DEFAULT, 1200, () => {
    setOsdVisibleState(false)
    osdTimeoutId = 0
    return GLib.SOURCE_REMOVE
  })
}
