import { Gtk } from "ags/gtk4"

import { closeSidebar } from "../../services/sidebar"
import { toggleThemeMenu } from "../../services/theme-menu"
import { toggleWallpaperMenu } from "../../services/wallpaper-menu"
import IconActionButton from "./IconActionButton"
import SectionHeader from "./SectionHeader"

const openWallpaperSelector = () => {
  closeSidebar()
  toggleWallpaperMenu()
}

const openThemeSelector = () => {
  closeSidebar()
  toggleThemeMenu()
}

export default function WallpaperSection() {
  return (
    <box
      class="quick-settings__section-card"
      orientation={Gtk.Orientation.VERTICAL}
      spacing={8}
    >
      <SectionHeader
        iconName="preferences-desktop-wallpaper-symbolic"
        label="Appearance"
      />
      <box orientation={Gtk.Orientation.HORIZONTAL} spacing={8} homogeneous>
        <IconActionButton
          className="quick-settings__action-button quick-settings__power-action-button"
          iconName="preferences-desktop-wallpaper-symbolic"
          tooltipText="Open wallpaper selector"
          onClicked={openWallpaperSelector}
          hexpand
        />
        <IconActionButton
          className="quick-settings__action-button quick-settings__power-action-button"
          iconName="preferences-desktop-theme-symbolic"
          tooltipText="Open theme selector"
          onClicked={openThemeSelector}
          hexpand
        />
      </box>
    </box>
  )
}
