import GLib from "gi://GLib"
import { createState } from "gnim"

export const themeNames = ["catppuccin", "gruvbox", "everforest"] as const

export type ThemeName = (typeof themeNames)[number]

const defaultTheme: ThemeName = "catppuccin"
const cacheDir = `${GLib.get_user_cache_dir()}/ags-theme`
const cacheFile = `${cacheDir}/current`

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
}

export const setThemeByName = (themeName: string) => {
  if (!isThemeName(themeName)) return false
  setTheme(themeName)
  return true
}
