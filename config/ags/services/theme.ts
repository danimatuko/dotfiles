import GLib from "gi://GLib"
import app from "ags/gtk4/app"
import { execAsync } from "ags/process"
import { createState } from "gnim"

export type ThemeName = string

export type ThemeDefinition = {
  id: ThemeName
  label: string
  swatches: string[]
  ags: Record<string, string>
}

const themesDir = `${GLib.get_home_dir()}/dotfiles/themes`
const cacheDir = `${GLib.get_user_cache_dir()}/ags-theme`
const cacheFile = `${cacheDir}/current`
const systemThemeCommand = `${GLib.get_home_dir()}/.local/bin/system-theme-set`

const parseThemeDefinition = (raw: Record<string, unknown>): ThemeDefinition | null => {
  if (typeof raw.id !== "string" || !raw.id.trim()) return null

  const id = raw.id.trim()
  const label =
    typeof raw.label === "string" && raw.label.trim() ? raw.label.trim() : id

  const swatches = Array.isArray(raw.swatches)
    ? raw.swatches.filter((value): value is string => typeof value === "string")
    : []

  if (raw.ags === null || typeof raw.ags !== "object" || Array.isArray(raw.ags)) {
    return null
  }

  const ags = Object.fromEntries(
    Object.entries(raw.ags as Record<string, unknown>).filter(
      ([token, value]) => typeof token === "string" && typeof value === "string",
    ),
  )

  if (Object.keys(ags).length === 0) return null

  return { id, label, swatches, ags }
}

const readThemeDefinition = (manifestPath: string): ThemeDefinition | null => {
  try {
    const [ok, content] = GLib.file_get_contents(manifestPath)
    if (!ok) return null

    const raw = JSON.parse(new TextDecoder().decode(content)) as Record<string, unknown>
    return parseThemeDefinition(raw)
  } catch {
    return null
  }
}

const loadThemes = (): ThemeDefinition[] => {
  if (!GLib.file_test(themesDir, GLib.FileTest.IS_DIR)) return []

  const loadedThemes: ThemeDefinition[] = []
  const seenThemeIds = new Set<string>()

  let dir: GLib.Dir | null = null

  try {
    dir = GLib.Dir.open(themesDir, 0)

    while (true) {
      const entry = dir.read_name()
      if (entry === null) break

      const themePath = `${themesDir}/${entry}`
      const manifestPath = `${themePath}/ags.json`

      if (!GLib.file_test(themePath, GLib.FileTest.IS_DIR)) continue
      if (!GLib.file_test(manifestPath, GLib.FileTest.IS_REGULAR)) continue

      const parsed = readThemeDefinition(manifestPath)
      if (!parsed) continue
      if (seenThemeIds.has(parsed.id)) continue

      loadedThemes.push(parsed)
      seenThemeIds.add(parsed.id)
    }
  } catch {
    return []
  } finally {
    dir?.close()
  }

  loadedThemes.sort((a, b) => a.id.localeCompare(b.id))
  return loadedThemes
}

export const themes = loadThemes()
export const themeNames = themes.map((themeDefinition) => themeDefinition.id)
export const themeByName = Object.fromEntries(
  themes.map((themeDefinition) => [themeDefinition.id, themeDefinition]),
) as Record<ThemeName, ThemeDefinition>

const themeNameSet = new Set(themeNames)

const readCachedTheme = (): ThemeName => {
  try {
    const [ok, content] = GLib.file_get_contents(cacheFile)
    if (!ok) return ""

    const cachedTheme = new TextDecoder().decode(content).trim()
    return themeNameSet.has(cachedTheme) ? cachedTheme : ""
  } catch {
    return ""
  }
}

const writeThemeToCache = (themeName: ThemeName) => {
  GLib.mkdir_with_parents(cacheDir, 0o755)
  GLib.file_set_contents(cacheFile, `${themeName}\n`)
}

const [theme, setThemeState] = createState<ThemeName>(readCachedTheme() || (themeNames[0] ?? ""))

export const currentTheme = theme

const getThemeCssVariables = (themeName: ThemeName) => {
  const agsTokens = themeByName[themeName]?.ags ?? {}
  return Object.entries(agsTokens)
    .map(([token, value]) => `--ags-${token}: ${value};`)
    .join("\n")
}

const applyThemeCss = (themeName: ThemeName) => {
  const cssVars = getThemeCssVariables(themeName)
  if (!cssVars) return

  app.apply_css(`
    :root {
      ${cssVars}
    }
  `)
}

export const applyCurrentThemeCss = () => {
  const activeTheme = theme()
  if (!activeTheme) return
  applyThemeCss(activeTheme)
}

export const getThemeWindowClass = (baseClass: string) =>
  theme((activeThemeName) => `${baseClass} theme--${activeThemeName}`)

export const setTheme = (themeName: ThemeName) => {
  if (!themeNameSet.has(themeName)) return false

  setThemeState(themeName)
  writeThemeToCache(themeName)
  applyThemeCss(themeName)
  execAsync([systemThemeCommand, themeName]).catch(() => {})
  return true
}

export const setThemeByName = (themeName: string) => setTheme(themeName)

export const cycleTheme = () => {
  if (themeNames.length === 0) return ""

  const current = theme()
  const currentIndex = themeNames.indexOf(current)
  const nextIndex = currentIndex < 0 ? 0 : (currentIndex + 1) % themeNames.length
  const nextTheme = themeNames[nextIndex]

  setTheme(nextTheme)
  return nextTheme
}
