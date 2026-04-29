# Dotfiles

Personal dotfiles for an Arch Linux + Hyprland desktop.

## What's Included

- Shell: Bash, Starship, fzf, zoxide
- Editor: Neovim (AstroNvim)
- WM + desktop: Hyprland, Waybar, Rofi, SwayNC, wlogout
- Terminal: Ghostty and Kitty config
- Utility config: Git, tmux, network/audio/bluetooth helpers
- Runtime commands: `bin/` (linked to `~/.local/bin`)
- Dynamic monitor management: HyprDynamicMonitors + systemd user units

## Repository Layout

```text
dotfiles/
├── install.sh            # main bootstrap script
├── setup/                # modular install and linking scripts
├── config/               # app configs (hypr, waybar, ags, nvim, etc.)
├── bin/                  # active executable commands (extensionless)
├── themes/               # shared theme files/assets
└── .legacy/              # archived scripts/assets for reference
```

## AGS Project (config/ags)

The AGS shell in `config/ags/` is organized by clear responsibilities: UI widgets, service/state integrations, shared utilities, and a feature/theme-based SCSS layout.

For architecture details, structure overview, and maintenance guidelines, see `config/ags/README.md`.

## Install

```bash
git clone --depth=1 https://github.com/danimatuko/dotfiles.git ~/dotfiles
cd ~/dotfiles
./install.sh
```

What `install.sh` does:

- Asks before starting and asks whether to create a backup
- Runs modular setup scripts from `setup/`
- Runs a post-install validation step that enables `NetworkManager` and disables conflicting network services
- Links `bin/*` into `~/.local/bin`
- Prompts before linking config files
- After config linking, enables HyprDynamicMonitors user services (`hyprdynamicmonitors.service` and `hyprdynamicmonitors-prepare.service`)

## Dynamic Monitor Setup (Hyprland)

This repository uses HyprDynamicMonitors instead of Kanshi for monitor hotplug and lid-aware behavior.

- Config lives in `config/hyprdynamicmonitors/`.
- Hyprland sources `~/.config/hypr/monitors.conf`, which is rendered by HyprDynamicMonitors.
- Systemd user units are stored in `config/systemd/user/` and linked to `~/.config/systemd/user/`.
- Service setup script: `setup/hyprdynamicmonitors.sh`.
- Service teardown script: `setup/hyprdynamicmonitors-uninstall.sh`.

Monitor profiles currently cover:

- Laptop-only (lid opened)
- Docked on `DP-1`, `DP-3`, or `HDMI-A-1` with lid opened (dual screen)
- Docked on `DP-1`, `DP-3`, or `HDMI-A-1` with lid closed (external-only)
- Fallback profile for unmatched states

For profile-level details and troubleshooting commands, see `config/hyprdynamicmonitors/README.md`.

## Useful Commands

```bash
# Relink active commands into ~/.local/bin
bash ~/dotfiles/setup/link-bin.sh

# Relink dotfiles/configs
bash ~/dotfiles/setup/link-configs.sh

# Enable/re-enable HyprDynamicMonitors user services
bash ~/dotfiles/setup/hyprdynamicmonitors.sh

# Disable HyprDynamicMonitors user services
bash ~/dotfiles/setup/hyprdynamicmonitors-uninstall.sh

# Preview uninstall actions (safe dry-run)
bash ~/dotfiles/setup/uninstall.sh

# Apply uninstall actions
bash ~/dotfiles/setup/uninstall.sh --apply

# Apply uninstall + restore from latest backup
bash ~/dotfiles/setup/uninstall.sh --apply --restore-latest-backup
```

## Notes

- This setup targets Arch Linux and Wayland/Hyprland.
- Active command entrypoints live in `bin/` and are intended to be called via `~/.local/bin/<command>`.
- Archived/unused content lives under `.legacy/` and is not part of the active setup path.
- Major structural changes in `config/ags` should be reflected in `config/ags/README.md` and this root README.

## License

MIT
