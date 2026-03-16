import { createState } from "gnim"

const [settingsSidebarVisibleState, setSettingsSidebarVisibleState] =
  createState(false)

export const isSettingsSidebarVisible = settingsSidebarVisibleState

export const openSettingsSidebar = () => {
  setSettingsSidebarVisibleState(true)
}

export const closeSettingsSidebar = () => {
  setSettingsSidebarVisibleState(false)
}

export const toggleSettingsSidebar = () => {
  setSettingsSidebarVisibleState(!settingsSidebarVisibleState())
}
