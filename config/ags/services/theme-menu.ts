import { createState } from "gnim"

const [themeMenuVisibleState, setThemeMenuVisibleState] = createState(false)

export const isThemeMenuVisible = themeMenuVisibleState

export const openThemeMenu = () => {
  setThemeMenuVisibleState(true)
}

export const closeThemeMenu = () => {
  setThemeMenuVisibleState(false)
}

export const toggleThemeMenu = () => {
  if (themeMenuVisibleState()) {
    closeThemeMenu()
    return
  }

  openThemeMenu()
}
