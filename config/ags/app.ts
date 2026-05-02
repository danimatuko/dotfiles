import app from "ags/gtk4/app"
import style from "./style.scss"
import Bar from "./widget/bar/Bar"
import Notifications from "./widget/notifications/Notifications"
import Osd from "./widget/Osd"
import SidebarBackdrop from "./widget/quick-settings/SidebarBackdrop"
import Sidebar from "./widget/quick-settings/Sidebar"
import { toggleSidebar } from "./services/sidebar"
import AppLauncher from "./widget/launcher/AppLauncher"
import { toggleLauncher } from "./services/launcher"
import WallpaperMenu from "./widget/wallpaper/WallpaperMenu"
import { toggleWallpaperMenu } from "./services/wallpaper-menu"
import { toggleThemeMenu } from "./services/theme-menu"
import ThemeSwitcher from "./widget/quick-settings/ThemeSwitcher"
import PowerMenu from "./widget/power/PowerMenu"
import { togglePowerMenu } from "./services/power-menu"
import {
  applyCurrentThemeCss,
  currentTheme,
  cycleTheme,
  setThemeByName,
  themeNames,
} from "./services/theme"

app.start({
  requestHandler(argv, response) {
    if (argv[0] === "toggle-sidebar") {
      toggleSidebar()
      response("ok")
      return
    }

    if (argv[0] === "toggle-theme-menu") {
      toggleThemeMenu()
      response("ok")
      return
    }

    if (argv[0] === "toggle-launcher") {
      toggleLauncher()
      response("ok")
      return
    }

    if (argv[0] === "toggle-wallpaper-menu") {
      toggleWallpaperMenu()
      response("ok")
      return
    }

    if (argv[0] === "toggle-power-menu") {
      togglePowerMenu()
      response("ok")
      return
    }

    if (argv[0] === "theme-list") {
      response(themeNames.join("\n"))
      return
    }

    if (argv[0] === "theme-current") {
      response(currentTheme())
      return
    }

    if (argv[0] === "theme-set") {
      const theme = argv[1]

      if (!theme) {
        response("missing theme")
        return
      }

      response(setThemeByName(theme) ? "ok" : "invalid theme")
      return
    }

    if (argv[0] === "theme-cycle") {
      response(cycleTheme())
      return
    }

    response("unknown command")
  },
  css: style,
  main() {
    applyCurrentThemeCss()

    const monitors = app.get_monitors()
    monitors.map(Bar)
    monitors.map(SidebarBackdrop)
    monitors.map(Sidebar)
    monitors.map(AppLauncher)
    monitors.map(WallpaperMenu)
    monitors.map(ThemeSwitcher)
    monitors.map(PowerMenu)
    monitors.map(Notifications)
    monitors.map(Osd)
  },
})
