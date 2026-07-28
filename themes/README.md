# Theme Folder Format

Each theme lives in its own folder:

`themes/<theme-id>/`

Theme files are optional and applied by `system-theme-set` when present.

## Optional files used by `system-theme-set`

- `themes/<theme-id>/ghostty.conf`
- `themes/<theme-id>/zellij`
- `themes/<theme-id>/hyprland.lua`
- `themes/<theme-id>/hyprlock.conf`
- `themes/<theme-id>/neovim.lua`
- `themes/<theme-id>/btop.theme`
- `themes/<theme-id>/icons.theme`

## Notes

- `id` should match the folder name and system theme name used by `system-theme-set`.

## Add a new theme

1. Copy an existing theme folder.
2. Edit the relevant optional theme files.
3. Keep `id` aligned with folder name.
4. Apply theme: `~/.local/bin/system-theme-set <theme-id>`.
