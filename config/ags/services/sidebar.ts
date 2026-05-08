import { createVisibilityState } from "./visibility-state"

const sidebarVisibilityState = createVisibilityState(false)

export const isSidebarVisible = sidebarVisibilityState.isVisible
export const openSidebar = sidebarVisibilityState.open
export const closeSidebar = sidebarVisibilityState.close
export const toggleSidebar = sidebarVisibilityState.toggle
