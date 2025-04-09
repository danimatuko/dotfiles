#!/bin/bash

# Get the current wallpaper set by Waypaper
wallpaper_path=$(waypaper -q)

# Check if the wallpaper path is valid
if [ -f "$wallpaper_path" ]; then
    # Run pywal to update the color scheme based on the current wallpaper
    wal -q -i "$wallpaper_path"
else
    echo "Error: Wallpaper file not found at $wallpaper_path"
    exit 1
fi

# Apply the colors to Waybar by creating a symlink to the colors file
ln -sf ~/.cache/wal/colors-waybar.css ~/.config/waybar/colors.css

# Reload pywal colors and apply them to Waybar
wal -r  # Reload the colors from the current scheme
pkill -SIGUSR1 waybar  # Signal Waybar to reload the new colors
waybar &  # Restart Waybar if needed

