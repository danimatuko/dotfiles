import { createVisibilityState } from "./visibility-state"

const screenshotMenuVisibilityState = createVisibilityState(false)

export const isScreenshotMenuVisible = screenshotMenuVisibilityState.isVisible
export const openScreenshotMenu = screenshotMenuVisibilityState.open
export const closeScreenshotMenu = screenshotMenuVisibilityState.close
export const toggleScreenshotMenu = screenshotMenuVisibilityState.toggle
