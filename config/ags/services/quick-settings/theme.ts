import {
  cycleTheme as cycleAgsTheme,
  currentTheme,
  setTheme as setAgsTheme,
  themes,
  themeNames,
  type ThemeDefinition,
  type ThemeName,
} from "../theme"

export { themeNames }
export type { ThemeName }
export const themeOptions: readonly ThemeDefinition[] = themes

export const getCurrentTheme = currentTheme

export const setTheme = (theme: ThemeName) => {
  setAgsTheme(theme)
}

export const cycleTheme = () => {
  cycleAgsTheme()
}
