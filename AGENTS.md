# AGENTS.md

Guidance for agents working in `/home/danimatuko/dotfiles`.

## Scope

- Root rules apply repo-wide unless a deeper `AGENTS.md` overrides them.
- `config/ags/AGENTS.md` is authoritative for everything under `config/ags/`.

## Verified Source Of Truth

- Prefer executable behavior over docs when they differ: `install.sh`, `setup/*.sh`, `bin/*`.

## Project Boundaries

- Root repo is shell-script driven; there is no root `package.json`/task runner/CI workflow.
- The only Node/TypeScript project is `config/ags/` (`package.json`, `tsconfig.json`).
- Do not mix AGS-specific rules into root edits; defer to `config/ags/AGENTS.md` when working there.

## High-Signal Layout

- `install.sh`: interactive orchestrator; sources setup stages in fixed order.
- `setup/`: real install/link/uninstall behavior.
- `config/`: symlinked runtime configs.
- `bin/`: active command entrypoints linked into `~/.local/bin` by `setup/link-bin.sh`.
- `config/hypr/`: Hyprland is now Lua-first (`hyprland.lua` + `lua/*.lua` modules). See `config/hypr/LUA_MIGRATION.md` for module ownership and smoke tests.

## Commands That Matter

- Full bootstrap: `./install.sh`
- Relink dotfiles/configs (destructive move to backup first): `bash setup/link-dotfiles.sh`
- Relink `bin/` commands: `bash setup/link-bin.sh`
- Uninstall flow:
  - preview: `bash setup/uninstall.sh`
  - apply: `bash setup/uninstall.sh --apply`
  - apply + restore latest backup: `bash setup/uninstall.sh --apply --restore-latest-backup`
- AGS package checks (run inside `config/ags/`):
  - typecheck: `npx --yes typescript tsc --noEmit -p tsconfig.json`
  - format check: `npx --yes prettier --check "**/*.{ts,tsx,scss,json,md}"`
- Hyprland Lua sanity checks:
  - parse main file: `luac -p config/hypr/hyprland.lua`
  - parse all modules: `for f in config/hypr/lua/*.lua; do luac -p "$f"; done`

## Non-Obvious Gotchas

- `install.sh` is interactive (confirm prompts) and runs privileged actions; it is not CI-safe automation.
- `setup/link-dotfiles.sh` uses `mv` into `~/dotfiles_backup_<timestamp>` for existing targets, including `~/.config/*` entries it manages.
- `setup/link-bin.sh` deletes existing files/symlinks in `~/.local/bin` before relinking entries from `bin/`.
- `setup/uninstall.sh` defaults to dry-run and only removes symlinks that resolve under this repo path.
- `setup/uninstall.sh --apply --restore-latest-backup` removes current `~/.config` before restoring `backup/config`.
- Prefer `setup/link-dotfiles.sh` and `setup/link-bin.sh`.

## Fast Verification After Shell Edits

- Single file: `bash -n path/to/script`
- Batch: `for f in setup/*.sh bin/*; do [ -f "$f" ] && bash -n "$f"; done`

## Branch Naming Convention

Use branch names in one of these formats:

- Preferred: `<type>/<area>-<short-description>`
- Allowed: `<type>/<short-description>`

### Types

- Required `type` values: `feat`, `fix`, `chore`, `docs`, `refactor`, `style`, `test`, `perf`, `ci`, `revert`

### Area and Description

- `area` is optional but recommended (for example: `ags`, `hypr`, `setup`, `bin`, `nvim`)
- `short-description` is required, action-focused, and lowercase kebab-case

### Reserved Prefixes

- `release/<date-or-version>` (for example: `release/2026-05-17`, `release/v1.2.0`)
- `hotfix/<area>-<short-description>` (for example: `hotfix/hypr-lockscreen-crash`)

### Examples

- `feat/ags-quick-settings-grouping`
- `fix/hyprlock-theme-paths`
- `chore/setup-prune-legacy-links`
- `docs/branch-naming-convention`
- `refactor/bin-network-script-cleanup`
- `fix/update-readme-links`

### Rules

- Use lowercase letters, numbers, and `-` only
- Do not use spaces, underscores, or camelCase
- Keep names concise (prefer ~50 characters or fewer)
- Keep one primary concern per branch
