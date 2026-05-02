import { createState } from "gnim"

const [launcherVisibleState, setLauncherVisibleState] = createState(false)

export const isLauncherVisible = launcherVisibleState

export const openLauncher = () => {
  setLauncherVisibleState(true)
}

export const closeLauncher = () => {
  setLauncherVisibleState(false)
}

export const toggleLauncher = () => {
  if (launcherVisibleState()) {
    closeLauncher()
    return
  }

  openLauncher()
}
