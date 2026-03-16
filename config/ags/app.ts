import app from "ags/gtk4/app"
import style from "./style.scss"
import Bar from "./widget/bar/Bar"
import Notifications from "./widget/notifications/Notifications"
import Osd from "./widget/Osd"
import SidebarBackdrop from "./widget/quick-settings/SidebarBackdrop"
import Sidebar from "./widget/quick-settings/Sidebar"

app.start({
  css: style,
  main() {
    const monitors = app.get_monitors()
    monitors.map(Bar)
    monitors.map(SidebarBackdrop)
    monitors.map(Sidebar)
    monitors.map(Notifications)
    monitors.map(Osd)
  },
})
