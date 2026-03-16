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
- `widget/Notifications.tsx`: notification window and card UI.
- `widget/Osd.tsx`: on-screen display window.
- `services/`: shared reactive state and shell integrations (`notifications`, `quick-settings`).
- `style.scss`: global SCSS entrypoint.
- `style/`: feature styles and shared theme tokens.
