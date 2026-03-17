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
- Links `bin/*` into `~/.local/bin`
- Prompts before linking config files

## Useful Commands

```bash
# Relink active commands into ~/.local/bin
bash ~/dotfiles/setup/link-bin.sh

# Relink dotfiles/configs
bash ~/dotfiles/setup/link-configs.sh

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
