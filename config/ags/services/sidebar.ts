import { createState } from "gnim"

const [sidebarVisibleState, setSidebarVisibleState] = createState(true)

export const isSidebarVisible = sidebarVisibleState

export const openSidebar = () => {
  setSidebarVisibleState(true)
}

export const closeSidebar = () => {
  setSidebarVisibleState(false)
}

export const toggleSidebar = () => {
  if (sidebarVisibleState()) {
    closeSidebar()
    return
  }

  openSidebar()
}
