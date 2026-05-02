import GLib from "gi://GLib"
import { createState } from "gnim"

export type WallpaperEntry = {
  id: string
  name: string
  path: string
  relativePath: string
}

const wallpaperDirectories = [
  `${GLib.get_home_dir()}/Pictures/Wallpapers`,
  `${GLib.get_home_dir()}/.config/ml4w/wallpapers`,
]

const wallpaperExtensions = new Set(["jpg", "jpeg", "png", "webp", "avif"])

const [wallpaperMenuVisibleState, setWallpaperMenuVisibleState] =
  createState(false)
const [wallpaperEntriesState, setWallpaperEntriesState] = createState<
  WallpaperEntry[]
>([])

const isImageFile = (fileName: string) => {
  const extension = fileName.split(".").pop()?.toLowerCase()
  return extension ? wallpaperExtensions.has(extension) : false
}

const collectWallpapers = (
  directoryPath: string,
  relativePrefix = "",
): WallpaperEntry[] => {
  if (!GLib.file_test(directoryPath, GLib.FileTest.IS_DIR)) return []

  const entries: WallpaperEntry[] = []
  let directory: GLib.Dir | null = null

  try {
    directory = GLib.Dir.open(directoryPath, 0)
  } catch {
    return []
  }

  try {
    while (true) {
      const childName = directory.read_name()
      if (!childName) break
      if (childName.startsWith(".")) continue

      const childPath = `${directoryPath}/${childName}`
      const childRelativePath = relativePrefix
        ? `${relativePrefix}/${childName}`
        : childName

      if (GLib.file_test(childPath, GLib.FileTest.IS_DIR)) {
        entries.push(...collectWallpapers(childPath, childRelativePath))
        continue
      }

      if (!GLib.file_test(childPath, GLib.FileTest.IS_REGULAR)) continue
      if (!isImageFile(childName)) continue

      entries.push({
        id: childPath,
        name: childName,
        path: childPath,
        relativePath: childRelativePath,
      })
    }
  } finally {
    directory.close()
  }

  return entries
}

const sortWallpapers = (entries: WallpaperEntry[]) =>
  entries.sort((a, b) => a.relativePath.localeCompare(b.relativePath))

export const isWallpaperMenuVisible = wallpaperMenuVisibleState
export const getWallpaperEntries = wallpaperEntriesState

export const refreshWallpaperEntries = () => {
  const entries = wallpaperDirectories.flatMap((directoryPath) =>
    collectWallpapers(directoryPath),
  )
  setWallpaperEntriesState(sortWallpapers(entries))
}

export const openWallpaperMenu = () => {
  refreshWallpaperEntries()
  setWallpaperMenuVisibleState(true)
}

export const closeWallpaperMenu = () => {
  setWallpaperMenuVisibleState(false)
}

export const toggleWallpaperMenu = () => {
  if (wallpaperMenuVisibleState()) {
    closeWallpaperMenu()
    return
  }

  openWallpaperMenu()
}
