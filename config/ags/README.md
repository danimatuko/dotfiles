# ags-shell

Personal AGS shell for a Hyprland desktop, built with TypeScript/TSX and SCSS.

## What this project contains

- A top bar with workspaces, tray, clock, and status indicators.
- Quick settings sidebar with toggles and sliders.
- Notifications window and cards.
- OSD overlays (volume/brightness feedback).
- Theme service + shared style system.

## Project structure

```text
config/ags/
├── app.ts                # AGS entrypoint (window startup and app wiring)
├── env.d.ts              # local TypeScript type declarations
├── package.json          # AGS project dependencies and scripts
├── tsconfig.json         # strict TypeScript configuration
├── style.scss            # global SCSS entrypoint
├── style/
│   ├── features/         # feature styles (bar, notifications, osd, quick-settings, workspaces)
│   ├── theme/            # theme source partials (_palettes, _base, _variables)
│   └── theme.scss        # public theme entry (forwards theme partials + emits .theme--* classes)
├── widget/
│   ├── bar/              # top bar UI widgets
│   ├── quick-settings/   # quick settings UI widgets
│   ├── notifications/    # notifications UI widgets
│   └── Osd.tsx           # OSD window component
├── services/
│   ├── quick-settings/   # quick-settings feature service modules
│   └── *.ts              # shared services (notifications, sidebar, theme, etc.)
├── lib/                  # reusable helper utilities
├── build/                # bundled output artifact (generated)
└── astal/                # vendored upstream tree (avoid edits unless intentional)
```

## Dependency direction (important)

- `widget/*` can use `services/*` and style classes.
- `services/*` can use `lib/*`.
- `lib/*` should not depend on `widget/*` or AGS UI components.
- `style/features/*` should consume theme variables/mixins from `style/theme.scss`.

## Development commands

```bash
# install deps
npm install

# run shell in dev
ags run app.ts

# typecheck
npx --yes typescript tsc --noEmit -p tsconfig.json

# format check
npx --yes prettier --check "**/*.{ts,tsx,scss,json,md}"

# bundle
mkdir -p build && ags bundle app.ts build/app.js --gtk 4 --root .
```

## Maintenance guidelines

- Add new UI in `widget/<feature>/` first, then pair it with `style/features/_<feature>.scss`.
- Keep cross-feature imports minimal; move shared logic to `lib/` and shared state/integration to `services/`.
- Keep theme values centralized in `style/theme/` to avoid duplicate hardcoded values.
