import { Gdk } from "ags/gtk4"

import { isLauncherVisible, toggleLauncher } from "../../services/launcher"

export default function LauncherToggleButton() {
  return (
    <button
      class={isLauncherVisible((visible) =>
        visible
          ? "quick-settings__toggle-button quick-settings__toggle-button--active quick-settings__launcher-toggle"
          : "quick-settings__toggle-button quick-settings__launcher-toggle",
      )}
      cursor={Gdk.Cursor.new_from_name("pointer", null)}
      onClicked={toggleLauncher}
      tooltipText="Toggle app launcher"
    >
      <image iconName="view-app-grid-symbolic" />
    </button>
  )
}
