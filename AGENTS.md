# AGENTS.md

Guidance for agentic coding assistants operating in this dotfiles repository.

## Scope and Priority

- Scope: whole repo (`/home/danimatuko/dotfiles`).
- This file is the default policy for all folders.
- If a subdirectory contains its own `AGENTS.md`, treat the deeper file as more specific for files in that subtree.
- Current known sub-policy: `config/ags/AGENTS.md` (AGS app specific).

## Repository Shape

- `install.sh`: primary bootstrap entrypoint for a machine setup.
- `setup/*.sh`: modular installers and symlink/linking scripts.
- `config/`: user config payload (Hyprland, Waybar, AGS, Neovim, Rofi, etc.).
- `scripts/`: support assets/docs (for example systemd units under `scripts/services` and `scripts/timers`).
- `bin/`: executable command scripts intended to be linked into `~/.local/bin` and used from keybinds/apps.
- `themes/`: theme definitions and assets shared across components.

## Stack and Runtime Facts

- OS target: Arch Linux (AUR/yay workflow is expected).
- Window system target: Wayland + Hyprland.
- Shell automation: Bash scripts (`#!/bin/bash` is the norm here).
- UI shell app: AGS in `config/ags` using TypeScript + TSX + SCSS.
- AGS TS mode is strict (`config/ags/tsconfig.json`).

## Build, Run, Lint, and Test Commands

### Root-level operations

- Full bootstrap (destructive on user config paths):
  - `./install.sh`
- Link dotfiles only:
  - `bash setup/link-dotfiles.sh`

### AGS app (`config/ags`)

- Install deps:
  - `npm install`
- Run app (dev):
  - `ags run app.ts`
  - optional: `ags run app.ts --gtk 4`
- Build/bundle:
  - `mkdir -p build && ags bundle app.ts build/app.js --gtk 4 --root .`
- Generate GIR typings:
  - `ags types -d .`
- Typecheck:
  - `npx --yes typescript tsc --noEmit -p tsconfig.json`
- Format check:
  - `npx --yes prettier --check "**/*.{ts,tsx,scss,json,md}"`
- Format write:
  - `npx --yes prettier --write "**/*.{ts,tsx,scss,json,md}"`

### Shell script checks (repo root)

- Syntax check one script:
  - `bash -n path/to/script`
- Syntax check all setup and bin shell files (fast baseline):
  - `for f in setup/*.sh bin/*; do [ -f "$f" ] && bash -n "$f"; done`
- Optional lint (if installed):
  - `shellcheck setup/*.sh bin/*`

### Test status and single-test guidance

- There is no repo-wide automated test framework configured at root.
- There is no AGS test runner configured in `config/ags/package.json`.
- Therefore, there is currently **no native single-test command**.
- For AGS changes, use this minimum validation set instead:
  - `ags run app.ts`
  - `npx --yes typescript tsc --noEmit -p tsconfig.json`
  - `npx --yes prettier --check "**/*.{ts,tsx,scss,json,md}"`
- If tests are introduced later (recommended: Vitest in `config/ags`), single-test commands should be:
  - `npx vitest run path/to/file.test.ts`
  - `npx vitest run path/to/file.test.ts -t "test name"`

## Code Style Guidelines

### Cross-repo expectations

- Make minimal, targeted changes; avoid broad refactors unless requested.
- Preserve existing file style in touched areas.
- Keep comments only for non-obvious logic.
- Avoid introducing new dependencies/tools without clear need.

### TypeScript / TSX (AGS)

- Use double quotes.
- No semicolons.
- 2-space indentation.
- Keep imports at top of file.
- Prefer import order: external packages first, local modules second.
- Use explicit relative imports for local files.
- Keep components small and focused; one default-export component per widget file when practical.
- Maintain strict typing; avoid `any` unless truly unavoidable.
- Use optional chaining/nullish coalescing for GI objects that may be absent.

### Naming conventions

- TS component files/functions: PascalCase (for example `Bar.tsx`).
- TS variables/functions: camelCase.
- Boolean names: `is*`, `has*`, `can*`.
- CSS/SCSS classes: kebab-case, prefer BEM-style blocks/elements/modifiers.
- Command scripts in `bin/`: kebab-case, extensionless (no `.sh`).
- Installer/setup scripts in `setup/`: kebab-case with `.sh` suffix.

### Script placement and invocation

- Put executable runtime commands in `bin/`.
- Keep command entrypoints extensionless and executable (`chmod +x`).
- Avoid duplicating the same command in both `scripts/` and `bin/`.
- Prefer referencing commands via `~/.local/bin/<command>` from Hyprland/Waybar and other user config.
- In AGS TypeScript files, use absolute command paths under `~/.local/bin` for reliability across session `PATH` differences.
- Keep `setup/link-bin.sh` (or `bin/link-bin-scripts`) as the source of truth for linking `bin/*` into `~/.local/bin`.

### Formatting

- AGS formatting source of truth is Prettier in `config/ags/package.json` (`semi: false`, `tabWidth: 2`).
- Do not manually reformat unrelated sections.
- Keep JSX props multiline when readability improves.

### Error handling

- Bash: use `set -e` (or strict mode when appropriate), quote expansions, and fail with actionable output.
- AGS async side effects (`execAsync`/process calls): wrap with `try/catch` or `.catch`.
- UI paths should fail safely; do not throw during render.
- Include contextual error messages that explain what failed.

### Notifications and sounds

- For script notifications, keep sound behavior simple and prefer standard system sound events.
- Prefer `canberra-gtk-play` event IDs (for example `message` for success and `bell` or `dialog-error` for failures) over custom sound files when possible.

### SCSS

- Keep shared tokens in `config/ags/style/theme.scss`.
- Prefer variables/tokens over hardcoded color values.
- Scope rules under feature roots to avoid global leakage.

### Hyprland/Waybar/JSONC config edits

- Keep existing ordering/grouping patterns in conf files.
- Avoid renaming keys/options unless behavior change is intended.
- When changing bindings/autostart/window rules, mention user-visible behavior impact.

## Change and Validation Workflow

1. Identify target area (`setup`, `config/ags`, `config/hypr`, etc.).
2. Read neighboring files for local conventions before editing.
3. Apply minimal edit set.
4. Run smallest relevant validation commands.
5. Report changed files and user-visible behavior differences.

## Safety Rules

- Do not modify vendored/generated trees unless explicitly requested (for AGS, avoid `config/ags/astal/`).
- Treat installer/link scripts as potentially destructive: verify paths before changing move/link logic.
- Do not run destructive git commands (`reset --hard`, force push) unless explicitly requested.

## Cursor and Copilot Rules

- Checked for `.cursorrules`: not found.
- Checked for `.cursor/rules/`: not found.
- Checked for `.github/copilot-instructions.md`: not found.
- If any are added later, treat them as high-priority instructions and merge with this file.
