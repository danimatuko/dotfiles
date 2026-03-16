import app from "ags/gtk4/app"
import style from "./style.scss"
import Bar from "./widget/bar/Bar"
import Notifications from "./widget/notifications/Notifications"
import Osd from "./widget/Osd"
import SettingsSidebarBackdrop from "./widget/quick-settings/SettingsSidebarBackdrop"
import SettingsSidebar from "./widget/quick-settings/SettingsSidebar"

app.start({
  css: style,
  main() {
    const monitors = app.get_monitors()
    monitors.map(Bar)
    monitors.map(SettingsSidebarBackdrop)
    monitors.map(SettingsSidebar)
    monitors.map(Notifications)
    monitors.map(Osd)
  },
})
