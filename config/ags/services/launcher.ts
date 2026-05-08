import { createVisibilityState } from "./visibility-state"

const launcherVisibilityState = createVisibilityState(false)

export const isLauncherVisible = launcherVisibilityState.isVisible
export const openLauncher = launcherVisibilityState.open
export const closeLauncher = launcherVisibilityState.close
export const toggleLauncher = launcherVisibilityState.toggle
