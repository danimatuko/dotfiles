# Dotfiles

Personal dotfiles for an Arch Linux + Hyprland desktop.

## What's Included

- Shell: Bash, Starship, fzf, zoxide
- Editor: Neovim (AstroNvim)
- WM + desktop: Hyprland, Waybar, Rofi, SwayNC, wlogout
- Terminal: Ghostty and Kitty config
- Utility config: Git, tmux, network/audio/bluetooth helpers
- Runtime commands: `bin/` (linked to `~/.local/bin`)

## Repository Layout

- `install.sh` - main bootstrap script
- `setup/` - modular install and linking scripts
- `config/` - application configs (`hypr`, `waybar`, `ags`, etc.)
- `bin/` - active executable commands (extensionless)
- `themes/` - shared theme files/assets
- `.legacy/` - archived scripts/assets kept for reference

## Install

```bash
git clone --depth=1 https://github.com/danimatuko/dotfiles.git ~/dotfiles
cd ~/dotfiles
./install.sh
```

What `install.sh` does:

- Backs up existing files to `~/dotfiles_backup_<timestamp>`
- Runs modular setup scripts from `setup/`
- Links `bin/*` into `~/.local/bin`
- Prompts before linking config files

## Useful Commands

```bash
# Relink active commands into ~/.local/bin
bash ~/dotfiles/setup/link-bin.sh

# Relink dotfiles/configs
bash ~/dotfiles/setup/link-configs.sh
```

## Notes

- This setup targets Arch Linux and Wayland/Hyprland.
- Active command entrypoints live in `bin/` and are intended to be called via `~/.local/bin/<command>`.
- Archived/unused content lives under `.legacy/` and is not part of the active setup path.

## License

MIT
