#!/bin/bash
# --------------------------------------------
# wallpaper-selector.sh
# 
# Create .desktop shortcuts for wallpapers, allowing selection via Rofi. 
# Applies the selected wallpaper using wal and swww, and reloads apps.
# --------------------------------------------

bash ~/scripts/generate-wallpaper-entries.sh

SELECTED_PATH=$(rofi -show drun -modi drun -drun-categories Wallpaper -config ~/.config/rofi/wallpaper-selector-gallery.rasi)

if [ -z "$SELECTED_PATH" ]; then
    notify-send -a "Theme Selector" -u normal "Selection Cancelled" "No wallpaper selected. Exiting."
    exit 1
fi

wal -i "$SELECTED_PATH"
swww img "$SELECTED_PATH"
source "$HOME/.config/hypr/scripts/reload-apps.sh"
notify-send -a "Theme Selector" -i "$SELECTED_PATH" -u normal "Wallpaper Applied" "Wallpaper & colors updated:\n$(basename "$SELECTED_PATH")"
