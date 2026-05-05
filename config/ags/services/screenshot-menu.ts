import { createState } from "gnim"

const [screenshotMenuVisibleState, setScreenshotMenuVisibleState] =
  createState(false)

export const isScreenshotMenuVisible = screenshotMenuVisibleState

export const openScreenshotMenu = () => {
  setScreenshotMenuVisibleState(true)
}

export const closeScreenshotMenu = () => {
  setScreenshotMenuVisibleState(false)
}

export const toggleScreenshotMenu = () => {
  if (screenshotMenuVisibleState()) {
    closeScreenshotMenu()
    return
  }

  openScreenshotMenu()
}
