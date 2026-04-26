# AGENTS.md

Guidance for agents working in `/home/danimatuko/dotfiles`.

## Scope

- This is the root policy; deeper `AGENTS.md` files win in their subtrees.
- `config/ags/AGENTS.md` governs the AGS app under `config/ags/`.

## Repo Map

- `install.sh` is the interactive bootstrap entrypoint and sources the modular scripts in `setup/`.
- `setup/` contains the install, link, and uninstall scripts; treat them as the source of truth over README prose.
- `bin/` contains the active runtime commands that are linked into `~/.local/bin`.
- `config/` is the live config payload.
- `.legacy/` is archived reference only; do not edit it unless asked.
- `config/hyprdynamicmonitors/` and `config/systemd/user/` are the HyprDynamicMonitors config and user units.

## Commands

- `./install.sh` backs up some existing dotfiles, runs the setup scripts, links `bin/*`, and may prompt to reboot.
- `bash setup/link-configs.sh` backs up current targets to `~/dotfiles_backup_*` and relinks configs and user units.
- `bash setup/link-bin.sh` refreshes the `~/.local/bin` symlinks.
- `bash setup/hyprdynamicmonitors.sh` only works after the user units are linked.
- `bash setup/hyprdynamicmonitors-uninstall.sh` disables the HyprDynamicMonitors user services.
- `bash setup/uninstall.sh` is dry-run by default; use `--apply` to change files, `--restore-latest-backup` to restore, and `--no-bin` to leave `~/.local/bin` alone.
- Shell edits: `bash -n path/to/script` or `for f in setup/*.sh bin/*; do [ -f "$f" ] && bash -n "$f"; done`.

## Rules

- If README text and scripts disagree, trust the scripts.
- Treat `setup/link-configs.sh` and `setup/uninstall.sh` as destructive; verify paths before changing move/link behavior.
- Keep `bin/` entrypoints extensionless, executable, and referenced as `~/.local/bin/<name>`.
