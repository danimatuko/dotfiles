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

## Commands That Matter

- Full bootstrap: `./install.sh`
- Relink dotfiles/configs (destructive move to backup first): `bash setup/link-configs.sh`
- Relink `bin/` commands: `bash setup/link-bin.sh`
- Uninstall flow:
  - preview: `bash setup/uninstall.sh`
  - apply: `bash setup/uninstall.sh --apply`
  - apply + restore latest backup: `bash setup/uninstall.sh --apply --restore-latest-backup`
- AGS package checks (run inside `config/ags/`):
  - typecheck: `npx --yes typescript tsc --noEmit -p tsconfig.json`
  - format check: `npx --yes prettier --check "**/*.{ts,tsx,scss,json,md}"`

## Non-Obvious Gotchas

- `install.sh` is interactive (confirm prompts) and runs privileged actions; it is not CI-safe automation.
- `setup/link-configs.sh` uses `mv` into `~/dotfiles_backup_<timestamp>` for existing targets, including `~/.config/*` entries it manages.
- `setup/uninstall.sh` defaults to dry-run and only removes symlinks that resolve under this repo path.
- `setup/uninstall.sh --apply --restore-latest-backup` removes current `~/.config` before restoring `backup/config`.
- Prefer `setup/link-configs.sh` and `setup/link-bin.sh`; similarly named legacy helpers (`setup/link-dotfiles.sh`, `setup/deploy-scripts.sh`) are not used by `install.sh`.

## Fast Verification After Shell Edits

- Single file: `bash -n path/to/script`
- Batch: `for f in setup/*.sh bin/*; do [ -f "$f" ] && bash -n "$f"; done`
