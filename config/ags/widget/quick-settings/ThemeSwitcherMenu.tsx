import { Gdk, Gtk } from "ags/gtk4"

import {
  cycleTheme,
  getCurrentTheme,
  setTheme,
  themeColors,
  themeNames,
  type ThemeName,
} from "../../services/quick-settings"
import { closeThemeMenu } from "../../services/theme-menu"

const pointerCursor = Gdk.Cursor.new_from_name("pointer", null)

const capitalize = (str: string) =>
  str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

const onThemeSelected = (themeName: ThemeName) => {
  setTheme(themeName)
  closeThemeMenu()
}

export default function ThemeSwitcherMenu() {
  return (
    <box
      class="theme-switcher"
      orientation={Gtk.Orientation.VERTICAL}
      spacing={8}
    >
      <box class="theme-switcher__header" spacing={8}>
        <label
          class="theme-switcher__title"
          label="Themes"
          xalign={0}
          hexpand
        />
        <button
          class="theme-switcher__action"
          cursor={pointerCursor}
          tooltipText="Cycle theme"
          onClicked={cycleTheme}
        >
          <image iconName="view-refresh-symbolic" />
        </button>
        <button
          class="theme-switcher__action"
          cursor={pointerCursor}
          tooltipText="Close theme menu"
          onClicked={closeThemeMenu}
        >
          <image iconName="window-close-symbolic" />
        </button>
      </box>

      <box
        class="theme-switcher__list"
        orientation={Gtk.Orientation.VERTICAL}
        spacing={4}
      >
        {themeNames.map((themeName: ThemeName) => (
          <button
            class={getCurrentTheme((current: ThemeName) =>
              current === themeName
                ? "theme-switcher__theme-button theme-switcher__theme-button--active"
                : "theme-switcher__theme-button",
            )}
            cursor={pointerCursor}
            onClicked={() => onThemeSelected(themeName)}
          >
            <box spacing={8}>
              <label
                class="theme-switcher__theme-name"
                label={capitalize(themeName)}
                xalign={0}
                hexpand
              />
              <box class="theme-switcher__theme-colors" spacing={2}>
                {themeColors[themeName].map((color: string) => (
                  <box
                    class="theme-switcher__theme-swatch"
                    css={`
                      background-color: ${color};
                    `}
                    widthRequest={16}
                    heightRequest={16}
                  />
                ))}
              </box>
            </box>
          </button>
        ))}
      </box>
    </box>
  )
}
