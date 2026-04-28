import GLib from "gi://GLib"
import { execAsync } from "ags/process"
import {
  currentTheme,
  setTheme as setAgsTheme,
  themeNames,
  type ThemeName,
} from "../theme"

const themeCommand = `${GLib.get_home_dir()}/.local/bin/ags-theme`

export { themeNames }
export type { ThemeName }
export const themeColors: Record<ThemeName, string[]> = {
  catppuccin: ["#F5C2E7", "#CBA6F7", "#89B4FA", "#94E2D5"],
  everforest: ["#A7C080", "#7Fbbb3", "#DBBC7F", "#E69875"],
  gruvbox: ["#FB4934", "#B8BB26", "#FABD2F", "#83A598"],
  "gruvbox-light": ["#FB4934", "#B8BB26", "#FABD2F", "#83A598"],
  nord: ["#88C0D0", "#81A1C1", "#5E81AC", "#BF616A"],
  tokyonight: ["#7AA2F7", "#BB9AF7", "#7DCFFF", "#9ECE6A"],
  kanagawa: ["#7E9CD8", "#957FB8", "#C0A36E", "#76946A"],
}

export const getCurrentTheme = currentTheme

export const setTheme = (theme: ThemeName) => {
  setAgsTheme(theme)
  execAsync([themeCommand, "set", theme]).catch(() => {})
}

export const cycleTheme = () => {
  execAsync([themeCommand, "cycle"]).catch(() => {})
}
