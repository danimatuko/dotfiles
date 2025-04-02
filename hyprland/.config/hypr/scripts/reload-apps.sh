#!/bin/bash
# reload-apps.sh - Script to reload applications after theme change

# Reload Waybar to apply new theme
pkill -USR2 waybar

# Reload Rofi to apply new theme
pkill -USR2 rofi

# Reload Hyprland to apply new theme
pkill -USR2 hyprland

# Reload swaync
swaync-client -R && swaync-client -rs

# Debug message
echo "All applications reloaded successfully"
