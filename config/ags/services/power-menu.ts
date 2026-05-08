import { createVisibilityState } from "./visibility-state"

const powerMenuVisibilityState = createVisibilityState(false)

export const isPowerMenuVisible = powerMenuVisibilityState.isVisible
export const openPowerMenu = powerMenuVisibilityState.open
export const closePowerMenu = powerMenuVisibilityState.close
export const togglePowerMenu = powerMenuVisibilityState.toggle
