import { Gdk } from "ags/gtk4"

import {
  isWallpaperMenuVisible,
  toggleWallpaperMenu,
} from "../../services/wallpaper-menu"

export default function WallpaperToggleButton() {
  return (
    <button
      class={isWallpaperMenuVisible((visible) =>
        visible
          ? "quick-settings__toggle-button quick-settings__toggle-button--active quick-settings__launcher-toggle"
          : "quick-settings__toggle-button quick-settings__launcher-toggle",
      )}
      cursor={Gdk.Cursor.new_from_name("pointer", null)}
      onClicked={toggleWallpaperMenu}
      tooltipText="Toggle wallpaper selector"
    >
      <image iconName="preferences-desktop-wallpaper-symbolic" />
    </button>
  )
}
