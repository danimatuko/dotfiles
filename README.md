# Dotfiles

Personal desktop configuration for Arch Linux with Hyprland.

## Overview

This repository is organized around shell scripts in setup/ and managed config files in config/.

Current top-level directories:

- setup: install, link, and uninstall scripts used by install.sh
- config: managed app and shell configuration files
- bin: active user command entrypoints linked to ~/.local/bin
- themes: shared theme assets
- scripts: helper scripts and unit files
- assets: shared static assets

## Installation

Clone and run:

```bash
git clone --depth=1 https://github.com/danimatuko/dotfiles.git ~/dotfiles
cd ~/dotfiles
./install.sh
```

What install.sh does:

- It is interactive and runs privileged actions
- It can back up current files into ~/dotfiles_backup_<timestamp>
- It runs staged setup scripts from setup/
- It links commands from bin/ into ~/.local/bin
- It asks before linking config files from config/



## Operations

```bash
# Relink user commands
bash ~/dotfiles/setup/link-bin.sh

# Relink dotfiles/configs (moves existing targets to a timestamped backup)
bash ~/dotfiles/setup/link-configs.sh

# Preview uninstall (dry-run)
bash ~/dotfiles/setup/uninstall.sh

# Apply uninstall
bash ~/dotfiles/setup/uninstall.sh --apply

# Apply uninstall and restore latest backup
bash ~/dotfiles/setup/uninstall.sh --apply --restore-latest-backup
```

## AGS

The desktop shell is based on AGS and runs on Hyprland.

- AGS: https://github.com/Aylur/ags
- Hyprland: https://github.com/hyprwm/Hyprland
- Local AGS docs: `config/ags/README.md`

## Notes

- Target platform is Arch Linux with Wayland/Hyprland.
- Root repository behavior is script-driven; there is no root package.json task runner.
- The only Node/TypeScript project in this repo is config/ags/.

## License

MIT
