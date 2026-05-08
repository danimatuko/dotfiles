import { createVisibilityState } from "./visibility-state"

const themeMenuVisibilityState = createVisibilityState(false)

export const isThemeMenuVisible = themeMenuVisibilityState.isVisible
export const openThemeMenu = themeMenuVisibilityState.open
export const closeThemeMenu = themeMenuVisibilityState.close
export const toggleThemeMenu = themeMenuVisibilityState.toggle
