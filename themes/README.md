# Theme Folder Format

Each theme lives in its own folder:

`themes/<theme-id>/`

AGS reads `ags.json` from each theme folder.

## Required file

- `themes/<theme-id>/ags.json`

## Optional files used by `system-theme-set`

- `themes/<theme-id>/ghostty.conf`
- `themes/<theme-id>/zellij`
- `themes/<theme-id>/hyprland.lua`
- `themes/<theme-id>/hyprlock.conf`
- `themes/<theme-id>/neovim.lua`
- `themes/<theme-id>/btop.theme`
- `themes/<theme-id>/icons.theme`

## `ags.json` schema

```json
{
  "id": "theme-id",
  "label": "Theme Label",
  "swatches": ["#111111", "#222222", "#333333", "#444444"],
  "ags": {
    "color-surface": "#...",
    "color-outline": "#...",
    "color-on-surface": "#...",
    "color-muted": "#...",
    "color-emphasis": "#...",
    "color-hover": "#...",
    "color-brand": "#...",
    "color-danger": "#...",
    "color-warning": "#...",
    "bg-base": "#...",
    "bg-surface": "#...",
    "bg-surface-strong": "#...",
    "control-color": "#...",
    "control-color-bright": "#...",
    "control-text": "#...",
    "accent-color": "#...",
    "accent-hover": "#...",
    "accent-text": "#..."
  }
}
```

## Notes

- `id` should match the folder name and system theme name used by `system-theme-set`.
- `label` is what the AGS theme selector shows.
- `swatches` are preview colors in the AGS theme menu.
- `ags` provides CSS variable values used by AGS runtime theming.
- If `ags.json` is missing or invalid, AGS ignores that theme.

## Add a new theme

1. Copy an existing theme folder.
2. Edit `ags.json` values.
3. Keep `id` aligned with folder name.
4. Reload AGS: `~/.local/bin/ags-reload`.
5. Apply theme: `~/.local/bin/ags-theme set <theme-id>`.
