# ags-shell

A personal project to build a full desktop shell with AGS.

This repository is in an early stage and will grow over time.
The current code is just the starting point.

## Vision

Build a complete desktop shell experience with features commonly used in Linux setups, such as:

- Bar and status indicators
- Quick settings
- System tray
- App launcher
- Notifications
- OSD / overlays
- Power/session controls
- More shell components over time

## Status

Early development.
Structure and features will evolve as the project grows.

## Current Structure

- `app.ts`: main AGS entrypoint, window startup per monitor.
- `widget/bar/`: bar window and bar-local widgets (clock, tray, workspaces, status indicators).
- `widget/quick-settings/`: quick settings menu UI components.
- `widget/notifications/`: notification window and card UI widgets.
- `widget/Osd.tsx`: on-screen display window.
- `services/`: shared reactive state and shell integrations (`notifications`, `quick-settings`).
- `style.scss`: global SCSS entrypoint.
- `style/features/`: feature-level styles (`bar`, `notifications`, `osd`, `quick-settings`, `workspaces`).
- `style/theme/`: shared theme source (`_palettes.scss`, `_base.scss`, `_variables.scss`).
- `style/theme.scss`: theme entrypoint that forwards theme partials and applies `.theme--*` classes.

## UI Maintenance Rules

- Keep boundaries strict:
  - `widget/` for UI rendering only.
  - `services/` for state and system integrations.
  - `lib/` for pure helpers (no side effects).
- Keep files small and focused:
  - one widget per file.
  - one setting per service file.
- Avoid cross-feature coupling:
  - do not import internals from another feature.
  - move shared UI to `widget/common/` and shared logic to `lib/`.
- Keep styling predictable:
  - keep class names stable unless intentionally redesigning.
  - keep theme source in `style/theme/` and consume via `style/theme.scss`.
  - avoid hardcoded duplicates when a theme variable already exists.

## Safe UI Change Checklist

- Change one feature folder at a time.
- Prefer incremental edits over large rewrites.
- Run `ags run app.ts` after each small change.
- If moving files, keep temporary compatibility exports until imports are updated.
- Commit in small focused chunks so rollbacks are easy.
