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
bash ~/dotfiles/setup/link-dotfiles.sh

# Preview uninstall (dry-run)
bash ~/dotfiles/setup/uninstall.sh

# Apply uninstall
bash ~/dotfiles/setup/uninstall.sh --apply

# Apply uninstall and restore latest backup
bash ~/dotfiles/setup/uninstall.sh --apply --restore-latest-backup
```

## Desktop Shell

The desktop shell is based on QuickShell/Noctalia and runs on Hyprland.

- Hyprland: https://github.com/hyprwm/Hyprland

## Managed Configurations

- Bash aliases include shortcuts for Neovim and common dotfiles workflows.
- Zellij can start automatically from Bash. Set `ZELLIJ_AUTO_ATTACH=true` to attach to an existing session, or leave it unset to start the welcome layout. Set `ZELLIJ_AUTO_EXIT=true` to exit the shell after Zellij closes.
- Ghostty themes are managed under `config/ghostty/themes/`.
- Neovim uses AstroNvim v6 with its plugin lockfile in `config/nvim/lazy-lock.json`.
- Hyprland uses Lua modules under `config/hypr/lua/`; `SUPER+TAB` opens Gloview, while `SUPER+SHIFT+TAB` and `SUPER+CTRL+TAB` show desktop and all-workspace views.

## Verification

```bash
# Check shell scripts
for f in setup/*.sh bin/*; do [ -f "$f" ] && bash -n "$f"; done

# Check Hyprland and Neovim Lua files
for f in config/hypr/hyprland.lua config/hypr/lua/*.lua config/nvim/init.lua config/nvim/lua/*.lua config/nvim/lua/plugins/*.lua; do luac -p "$f"; done
```

## Notes

- Target platform is Arch Linux with Wayland/Hyprland.
- Root repository behavior is script-driven; there is no root package.json task runner.

## Branch Naming

Use branch names in one of these formats:

- Preferred: `<type>/<area>-<short-description>`
- Allowed: `<type>/<short-description>`

Allowed `type` values:

- `feat`, `fix`, `chore`, `docs`, `refactor`, `style`, `test`, `perf`, `ci`, `revert`

Reserved prefixes:

- `release/<date-or-version>`
- `hotfix/<area>-<short-description>`

Examples:

- `feat/hypr-shell-controls`
- `fix/hyprlock-theme-paths`
- `chore/setup-prune-legacy-links`

See `AGENTS.md` for full rules and additional examples.

## License

MIT
