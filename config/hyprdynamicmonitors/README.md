# HyprDynamicMonitors setup

This folder contains the dynamic monitor setup used by Hyprland.

## What it does

- Detects connected monitors and lid state.
- Applies a profile for:
  - laptop only (lid open)
  - docked DP-1 / DP-3 / HDMI with lid open (dual screen)
  - docked DP-1 / DP-3 / HDMI with lid closed (external only)
- Sends a desktop notification and plays a sound each time a profile changes.

## Runtime wiring

- Systemd user service runs the daemon:

```bash
systemctl --user enable --now hyprdynamicmonitors.service
```

- Hyprland sources the generated file:

```text
~/.config/hypr/monitors.conf
```

## Important commands

```bash
# validate config
hyprdynamicmonitors --config ~/.config/hyprdynamicmonitors/config.toml validate

# preview matching without applying
hyprdynamicmonitors --config ~/.config/hyprdynamicmonitors/config.toml run --enable-lid-events --dry-run

# run once for testing
hyprdynamicmonitors --config ~/.config/hyprdynamicmonitors/config.toml run --enable-lid-events --run-once
```

## Avoid blank screen on startup

If the last active profile had `monitor=...,disable` and you reboot undocked,
run `prepare` before Hyprland starts:

```bash
systemctl --user enable hyprdynamicmonitors-prepare.service
```

After linking/changing unit files, reload systemd user units:

```bash
systemctl --user daemon-reload
```

If you launch Hyprland manually from TTY, use:

```bash
hyprdynamicmonitors prepare && Hyprland
```

## Adapting to other monitor names

Check monitor names with:

```bash
hyprctl monitors all
```

Then update names in `config.toml` and matching template files under
`hyprconfigs/`.
