#!/bin/bash
set -euo pipefail

# Assign paths
THEMES_DIR="$HOME/dotfiles/themes"
CURRENT_THEME="$HOME/current-theme"
SCRIPT="$HOME/.local/bin/set-theme"

# List all themes (directories only)
themes=$(ls -1 "$THEMES_DIR")

# Launch walker menu to choose a theme
chosen=$(echo "$themes" | walker --dmenu -p "Switch Theme:")

# If a theme is chosen, apply it
if [ -n "$chosen" ]; then
    "$SCRIPT" "$chosen"
fi
