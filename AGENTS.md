# AGENTS.md

Guidance for agents working in `/home/danimatuko/dotfiles`.

## Scope

- Root instructions apply everywhere unless a deeper `AGENTS.md` overrides them.
- `config/ags/AGENTS.md` is authoritative inside `config/ags/`.

## Source Of Truth

- Prefer executable scripts over prose when behavior conflicts (`install.sh`, `setup/*.sh`, `bin/*`).
- `.legacy/` is archived reference only; do not edit unless explicitly asked.

## High-Value Structure

- `install.sh`: interactive bootstrap; sources staged scripts in `setup/`.
- `setup/`: install/link/uninstall logic (most operational behavior lives here).
- `bin/`: active user-facing commands linked into `~/.local/bin`.
- `themes/`: shared theme assets; AGS theme metadata is per-theme `themes/<id>/ags.json`.

## Commands Agents Should Use

- Full install: `./install.sh`
- Relink configs (destructive backup+move): `bash setup/link-configs.sh`
- Relink command symlinks: `bash setup/link-bin.sh`
- Enable HyprDynamicMonitors units (after linking configs): `bash setup/hyprdynamicmonitors.sh`
- Disable HyprDynamicMonitors units: `bash setup/hyprdynamicmonitors-uninstall.sh`
- Uninstall preview/apply:
  - dry-run: `bash setup/uninstall.sh`
  - apply: `bash setup/uninstall.sh --apply`
  - apply + restore backup: `bash setup/uninstall.sh --apply --restore-latest-backup`

## Repo-Specific Gotchas

- `setup/link-configs.sh` moves existing targets into `~/dotfiles_backup_<timestamp>` before relinking.
- `setup/uninstall.sh` only removes symlinks that resolve under this repo; default mode is dry-run.
- Keep `bin/` entrypoints extensionless and executable (they are linked by filename into `~/.local/bin`).
- AGS themes are discovered from `themes/*/ags.json`; missing/invalid manifests are ignored.

## Quick Verification After Shell Script Edits

- Single file: `bash -n path/to/script`
- Batch check: `for f in setup/*.sh bin/*; do [ -f "$f" ] && bash -n "$f"; done`
