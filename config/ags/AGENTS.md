# AGENTS.md

Guidance for agentic coding assistants working in this repository.
This file is based on the current root app (TypeScript/AGS), not the vendored `astal/` tree.

## Quick Facts

- Stack: TypeScript + TSX + SCSS.
- Runtime: AGS CLI (`ags`, GTK4 JSX runtime).
- Type mode: strict (`tsconfig.json` has `"strict": true`).
- Root package scripts: none.
- Main files: `app.ts`, `widget/*.tsx`, `style.scss`, `style/*.scss`, `env.d.ts`.

## Project Structure

- `app.ts`: entrypoint (`app.start(...)`) and monitor setup.
- `widget/Bar.tsx`: top-level bar window widget.
- `widget/Workspaces.tsx`: workspace buttons and Hyprland signal updates.
- `widget/Battery.tsx`: battery binding display.
- `style.scss`: global SCSS entry.
- `style/theme.scss`: shared design tokens.
- `style/workspaces.scss`: workspace styling.

## Build / Run / Lint / Test Commands

### Install dependencies

```bash
npm install
```

### Run app (dev)

```bash
ags run app.ts
```

Common variants:

```bash
ags run app.ts --gtk 4
ags run app.ts --define DEBUG=true
ags run app.ts --log-file /tmp/ags.log
```

### Build (bundle)

```bash
mkdir -p build
ags bundle app.ts build/app.js --gtk 4 --root .
```

Notes:

- This repo has no separate compile pipeline; `ags bundle` is the effective build step.

### Generate GIR typings

```bash
ags types -d .
```

Example with filters:

```bash
ags types Astal* --ignore Gtk3 -d .
```

### Formatting

Prettier config exists in `package.json` (`semi: false`, `tabWidth: 2`).

Check formatting:

```bash
npx --yes prettier --check "**/*.{ts,tsx,scss,json,md}"
```

Apply formatting:

```bash
npx --yes prettier --write "**/*.{ts,tsx,scss,json,md}"
```

### Linting

- No root ESLint config is present.
- Treat Prettier + TypeScript strict checks as the baseline quality gate.

### Type check

Preferred (works without local `typescript` dep):

```bash
npx --yes typescript tsc --noEmit -p tsconfig.json
```

If `tsc` is installed globally:

```bash
tsc --noEmit -p tsconfig.json
```

### Tests (current status)

- No test framework configured in root `package.json`.
- No `*.test.*` or `*.spec.*` files found in the root app.
- There is currently no native `run all tests` command.
- There is currently no native `run single test` command.

If a test runner is added later (recommended: Vitest), single-test patterns are:

```bash
npx vitest run
npx vitest run path/to/file.test.ts
npx vitest run path/to/file.test.ts -t "test name"
```

## Code Style Guidelines

### Imports

- Keep imports at the top.
- Order imports as: external packages first, local files second.
- Separate import groups with one blank line.
- Use double quotes for strings in TS/TSX.
- Use explicit relative imports for local modules (`./widget/Bar`).

### Formatting

- No semicolons.
- 2-space indentation.
- Let Prettier handle wrapping and final whitespace.
- Keep JSX props multiline when readability improves.

### TypeScript and Types

- Keep `strict` guarantees; do not weaken compiler options.
- Add explicit types for exported APIs and callback params where useful.
- Prefer concrete types over `any`.
- Use optional chaining/nullish coalescing for GI objects that may be absent.
- Keep `env.d.ts` declarations in sync with imported asset/module patterns.

### Naming

- Component filenames: PascalCase (`Bar.tsx`, `Battery.tsx`).
- Component functions: PascalCase.
- Variables/functions: camelCase.
- Booleans: `is*`, `has*`, `can*` naming.
- CSS classes: kebab-case with BEM (`block`, `block__element`, `block--modifier`).
- Prefer semantic feature blocks (for example `quick-settings`, `system-tray`, `workspaces`).

### UI / Component patterns

- Prefer small, focused functional components.
- Default-export one main component per widget file.
- Keep render trees declarative; avoid side effects in JSX expressions.
- Keep signal connection/update helpers near where they are used.

### Error handling

- Wrap async side effects (`execAsync`, process calls) with `try/catch` or `.catch`.
- Include actionable context in logs.
- Fail safely in UI paths; avoid throwing during render.

### SCSS conventions

- Centralize colors/tokens in `style/theme.scss`.
- Import shared tokens via `@use`.
- Scope styles under feature roots (`window.Bar`, `.workspaces`).
- Keep class naming and selectors aligned with BEM blocks and elements.
- Prefer variables over hardcoded colors when equivalent token exists.

## Agent Behavior Recommendations

- Make minimal, targeted changes unless a larger refactor is requested.
- Validate with the smallest relevant command set:
  - run: `ags run app.ts`
  - types: `npx --yes typescript tsc --noEmit -p tsconfig.json`
  - format: `npx --yes prettier --check "**/*.{ts,tsx,scss,json,md}"`
- Do not edit large vendored/generated trees (for example `astal/`) unless explicitly asked.
- Preserve existing style choices in touched files.

## Cursor and Copilot Rules

Checked for agent-policy files and none were found:

- `.cursorrules`
- `.cursor/rules/`
- `.github/copilot-instructions.md`

If any of these files are added later, treat them as high-priority repository instructions.
