#!/bin/bash

echo "Updating Waybar theme..."
WAYBAR_CONFIG="$HOME/.config/waybar/style.css"

# Ensure Waybar imports the Pywal colors
if ! grep -q "colors-waybar.css" "$WAYBAR_CONFIG"; then
    echo '@import url("file://~/.cache/wal/colors-waybar.css");' >> "$WAYBAR_CONFIG"
fi

# Reload Waybar
pkill -SIGUSR2 waybar
echo "Waybar updated!"
