import app from "ags/gtk4/app"
import style from "./style.scss"
import Bar from "./widget/Bar"
import Notifications from "./widget/Notifications"
import Osd from "./widget/Osd"

app.start({
  css: style,
  main() {
    const monitors = app.get_monitors()
    monitors.map(Bar)
    monitors.map(Notifications)
    monitors.map(Osd)
  },
})
