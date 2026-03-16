import { createState } from "gnim"
import GLib from "gi://GLib"

const [sidebarVisibleState, setSidebarVisibleState] = createState(false)
const [sidebarOpenState, setSidebarOpenState] = createState(false)

export const SIDEBAR_ANIMATION_MS = 320

let hideTimeoutId: number | null = null

const clearHideTimeout = () => {
  if (hideTimeoutId === null) return
  GLib.source_remove(hideTimeoutId)
  hideTimeoutId = null
}

export const isSidebarVisible = sidebarVisibleState
export const isSidebarOpen = sidebarOpenState

export const openSidebar = () => {
  clearHideTimeout()

  if (!sidebarVisibleState()) {
    setSidebarVisibleState(true)
    GLib.timeout_add(GLib.PRIORITY_DEFAULT, 16, () => {
      setSidebarOpenState(true)
      return GLib.SOURCE_REMOVE
    })
    return
  }

  setSidebarOpenState(true)
}

export const closeSidebar = () => {
  clearHideTimeout()
  setSidebarOpenState(false)

  hideTimeoutId = GLib.timeout_add(
    GLib.PRIORITY_DEFAULT,
    SIDEBAR_ANIMATION_MS,
    () => {
      if (!sidebarOpenState()) setSidebarVisibleState(false)
      hideTimeoutId = null
      return GLib.SOURCE_REMOVE
    },
  )
}

export const toggleSidebar = () => {
  if (sidebarOpenState()) {
    closeSidebar()
    return
  }

  openSidebar()
}
