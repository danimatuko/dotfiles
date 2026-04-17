import app from "ags/gtk4/app"
import style from "./style.scss"
import Bar from "./widget/bar/Bar"
import Notifications from "./widget/notifications/Notifications"
import Osd from "./widget/Osd"
import SidebarBackdrop from "./widget/quick-settings/SidebarBackdrop"
import Sidebar from "./widget/quick-settings/Sidebar"
import { toggleSidebar } from "./services/sidebar"
import ThemeSwitcher from "./widget/quick-settings/ThemeSwitcher"
import { currentTheme, setThemeByName, themeNames } from "./services/theme"

app.start({
  requestHandler(argv, response) {
    if (argv[0] === "toggle-sidebar") {
      toggleSidebar()
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

    response("unknown command")
  },
  css: style,
  main() {
    const monitors = app.get_monitors()
    monitors.map(Bar)
    monitors.map(SidebarBackdrop)
    monitors.map(Sidebar)
    monitors.map(ThemeSwitcher)
    monitors.map(Notifications)
    monitors.map(Osd)
  },
})
