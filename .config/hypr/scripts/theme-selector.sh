#!/bin/bash
# wallpaper-selector.sh
# Selects wallpapers with Rofi and applies them using wal + swww
# Usage:
#   No args: Launch Rofi selector
#   --apply [path]: Apply specified wallpaper
#   --generate: Generate new wallpaper entries

if [ "$1" = "--apply" ]; then
    # Apply mode: Set wallpaper, colors, and reload apps
    WALLPAPER_PATH="$2"
    
    if [ -z "$WALLPAPER_PATH" ] || [ ! -f "$WALLPAPER_PATH" ]; then
        notify-send -a "Theme Selector" -u critical "Error" "Invalid wallpaper path provided."
        exit 1
    fi
    
    wal -i "$WALLPAPER_PATH"
    swww img "$WALLPAPER_PATH"
    source "$HOME/.config/hypr/scripts/reload-apps.sh"
    notify-send -a "Theme Selector" -i "$WALLPAPER_PATH" -u normal "Wallpaper Applied" "Wallpaper & colors updated:\n$(basename "$WALLPAPER_PATH")"
    
elif [ "$1" = "--generate" ]; then
    # Generate mode: Create desktop entries for all wallpapers
    bash ~/.config/rofi/scripts/generate-wallpaper-entries.sh
    
else
    # Default mode: Show wallpaper selection menu
    rofi -show drun -modi drun -drun-categories Wallpaper -config ~/.config/rofi/wallpaper-selector-gallery.rasi
fi
