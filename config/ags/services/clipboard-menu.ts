import { createVisibilityState } from "./visibility-state"

const clipboardMenuVisibilityState = createVisibilityState(false)

export const isClipboardMenuVisible = clipboardMenuVisibilityState.isVisible
export const openClipboardMenu = clipboardMenuVisibilityState.open
export const closeClipboardMenu = clipboardMenuVisibilityState.close
export const toggleClipboardMenu = clipboardMenuVisibilityState.toggle
