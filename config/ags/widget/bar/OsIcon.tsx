import { Gdk } from "ags/gtk4"

import { toggleSettingsSidebar } from "../../services/settings-sidebar"

export default function OsIcon() {
  return (
    <button
      class="os-icon"
      tooltipText="Toggle settings"
      cursor={Gdk.Cursor.new_from_name("pointer", null)}
      onClicked={toggleSettingsSidebar}
    >
      <label class="os-icon__glyph" label="" />
    </button>
  )
}
