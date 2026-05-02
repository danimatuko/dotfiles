import { createState } from "gnim"

const [powerMenuVisibleState, setPowerMenuVisibleState] = createState(false)

export const isPowerMenuVisible = powerMenuVisibleState

export const openPowerMenu = () => {
  setPowerMenuVisibleState(true)
}

export const closePowerMenu = () => {
  setPowerMenuVisibleState(false)
}

export const togglePowerMenu = () => {
  if (powerMenuVisibleState()) {
    closePowerMenu()
    return
  }

  openPowerMenu()
}
