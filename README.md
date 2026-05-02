# Dotfiles

Personal desktop configuration for Arch Linux with Hyprland.

## Overview

This repository provides:

- Shell setup (Bash, Starship, fzf, zoxide)
- Neovim configuration (AstroNvim)
- Hyprland desktop stack (Waybar, Rofi, SwayNC, wlogout)
- Terminal configuration (Ghostty, Kitty)
- User commands in `bin/` linked to `~/.local/bin`
- Dynamic monitor automation via HyprDynamicMonitors and user systemd units

## Repository Structure

```text
dotfiles/
├── install.sh            # interactive bootstrap entrypoint
├── setup/                # install, link, and uninstall scripts
├── config/               # managed application configuration
├── bin/                  # active user command entrypoints
├── themes/               # shared theme assets
└── scripts/              # helper scripts and unit files
```

## Installation

```bash
git clone --depth=1 https://github.com/danimatuko/dotfiles.git ~/dotfiles
cd ~/dotfiles
./install.sh
```

`install.sh` is interactive and includes privileged operations. It:

- Prompts before start and optional backup
- Executes modular setup stages from `setup/`
- Validates networking (enables `NetworkManager`, disables conflicting services)
- Links commands from `bin/` to `~/.local/bin`
- Optionally links managed config into `~/.config`

Note: HyprDynamicMonitors services are not auto-enabled by `install.sh`.

## Post-Install

If you linked configs, enable monitor services:

```bash
bash ~/dotfiles/setup/hyprdynamicmonitors.sh
```

## Operations

```bash
# Relink user commands
bash ~/dotfiles/setup/link-bin.sh

# Relink dotfiles/configs (backs up existing targets first)
bash ~/dotfiles/setup/link-configs.sh

# Enable HyprDynamicMonitors user services
bash ~/dotfiles/setup/hyprdynamicmonitors.sh

# Disable HyprDynamicMonitors user services
bash ~/dotfiles/setup/hyprdynamicmonitors-uninstall.sh

# Preview uninstall (dry-run)
bash ~/dotfiles/setup/uninstall.sh

# Apply uninstall
bash ~/dotfiles/setup/uninstall.sh --apply

# Apply uninstall and restore latest backup
bash ~/dotfiles/setup/uninstall.sh --apply --restore-latest-backup
```

## HyprDynamicMonitors

- Configuration directory: `config/hyprdynamicmonitors/`
- Generated monitor file used by Hyprland: `~/.config/hypr/monitors.conf`
- User units source: `config/systemd/user/`
- Detailed profiles and troubleshooting: `config/hyprdynamicmonitors/README.md`

## AGS

For AGS architecture and development guidance, see `config/ags/README.md`.

## Notes

- Target platform: Arch Linux with Wayland/Hyprland
- Runtime command entrypoints are designed for `~/.local/bin/<command>`

## License

MIT
