# Hyprland Lua Config Layout

This directory now uses `hyprland.lua` as the active Hyprland config entrypoint.

## Entry Point

- `hyprland.lua` only loads modules with `require(...)`.
- Load order is intentional and should stay stable unless needed.

## Module Map

- `lua/monitors.lua` - monitor outputs, modes, scale, mirror/position.
- `lua/autostart.lua` - `hyprland.start` autostart commands.
- `lua/environment.lua` - `hl.env(...)` variables and `xwayland` settings.
- `lua/look_and_feel.lua` - `general` and `decoration` appearance options.
- `lua/animations.lua` - animation curves and animation definitions.
- `lua/layouts.lua` - layout-specific settings (`dwindle`, `master`).
- `lua/input.lua` - keyboard, mouse, touchpad, and gesture settings.
- `lua/binds.lua` - all keyboard/media/mouse bindings.
- `lua/rules.lua` - window, layer, and workspace rules.
- `lua/misc.lua` - misc compositor options.

## Runtime Validation Checklist

After changes, restart Hyprland and verify:

1. Terminal and close-window binds (`SUPER+RETURN`, `SUPER+Q`).
2. Workspace change/move binds (`SUPER+1..0`, `SUPER+SHIFT+1..0`).
3. Monitor layout and scale are correct.
4. AGS toggles and launcher/sidebar/power menu bindings work.
5. Lock/logout flow works.
6. App-to-workspace rules apply (Ghostty -> 1, Brave -> 2).

## Notes

- Keep legacy `.conf` files as reference until Lua behavior is fully stable.
- If a bind/rule fails, check Hyprland runtime errors first, then patch the corresponding module.
