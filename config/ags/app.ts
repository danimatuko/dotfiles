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
import ScreenshotMenu from "./widget/screenshot/ScreenshotMenu"
import { toggleScreenshotMenu } from "./services/screenshot-menu"
import ClipboardMenu from "./widget/clipboard/ClipboardMenu"
import { toggleClipboardMenu } from "./services/clipboard-menu"
import {
  applyCurrentThemeCss,
  currentTheme,
  cycleTheme,
  setThemeByName,
  themeNames,
} from "./services/theme"

app.start({
  requestHandler(argv, response) {
    const commandName = argv[0]
    const handlers: Record<string, () => string> = {
      "toggle-sidebar": () => {
        toggleSidebar()
        return "ok"
      },
      "toggle-theme-menu": () => {
        toggleThemeMenu()
        return "ok"
      },
      "toggle-launcher": () => {
        toggleLauncher()
        return "ok"
      },
      "toggle-wallpaper-menu": () => {
        toggleWallpaperMenu()
        return "ok"
      },
      "toggle-power-menu": () => {
        togglePowerMenu()
        return "ok"
      },
      "toggle-screenshot-menu": () => {
        toggleScreenshotMenu()
        return "ok"
      },
      "toggle-clipboard-menu": () => {
        toggleClipboardMenu()
        return "ok"
      },
      "theme-list": () => themeNames.join("\n"),
      "theme-current": () => currentTheme(),
      "theme-set": () => {
        const theme = argv[1]
        if (!theme) return "missing theme"
        return setThemeByName(theme) ? "ok" : "invalid theme"
      },
      "theme-cycle": () => cycleTheme(),
    }

    const handler = commandName ? handlers[commandName] : null
    response(handler ? handler() : "unknown command")
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
    monitors.map(ScreenshotMenu)
    monitors.map(ClipboardMenu)
    monitors.map(Notifications)
    monitors.map(Osd)
  },
})
