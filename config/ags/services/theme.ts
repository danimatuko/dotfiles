import GLib from "gi://GLib"
import { execAsync } from "ags/process"
import { createState } from "gnim"

export const themeNames = [
  "catppuccin",
  "gruvbox",
  "gruvbox-light",
  "everforest",
  "nord",
  "tokyonight",
  "kanagawa",
] as const

export type ThemeName = (typeof themeNames)[number]

const defaultTheme: ThemeName = "catppuccin"
const cacheDir = `${GLib.get_user_cache_dir()}/ags-theme`
const cacheFile = `${cacheDir}/current`
const systemThemeCommand = `${GLib.get_home_dir()}/.local/bin/system-theme-set`

const isThemeName = (value: string): value is ThemeName => {
  return themeNames.includes(value as ThemeName)
}

const readThemeFromCache = (): ThemeName => {
  try {
    const [ok, content] = GLib.file_get_contents(cacheFile)
    if (!ok) return defaultTheme

    const theme = new TextDecoder().decode(content).trim()
    return isThemeName(theme) ? theme : defaultTheme
  } catch {
    return defaultTheme
  }
}

const writeThemeToCache = (theme: ThemeName) => {
  GLib.mkdir_with_parents(cacheDir, 0o755)
  GLib.file_set_contents(cacheFile, `${theme}\n`)
}

const [theme, setThemeState] = createState<ThemeName>(readThemeFromCache())

export const currentTheme = theme

export const getThemeWindowClass = (baseClass: string) =>
  theme((name) => `${baseClass} theme--${name}`)

export const setTheme = (themeName: ThemeName) => {
  setThemeState(themeName)
  writeThemeToCache(themeName)

  execAsync([systemThemeCommand, themeName]).catch(() => {})
}

export const setThemeByName = (themeName: string) => {
  if (!isThemeName(themeName)) return false
  setTheme(themeName)
  return true
}

export const cycleTheme = () => {
  const current = theme()
  const currentIndex = themeNames.indexOf(current)
  const nextIndex = currentIndex < 0 ? 0 : (currentIndex + 1) % themeNames.length
  const nextTheme = themeNames[nextIndex]

  setTheme(nextTheme)
  return nextTheme
}
