import { createState } from "gnim"

const [sidebarVisibleState, setSidebarVisibleState] = createState(false)

export const isSidebarVisible = sidebarVisibleState

export const openSidebar = () => {
  setSidebarVisibleState(true)
}

export const closeSidebar = () => {
  setSidebarVisibleState(false)
}

export const toggleSidebar = () => {
  setSidebarVisibleState(!sidebarVisibleState())
}
