#!/bin/bash
# Define theme directory
THEME_DIR="$HOME/Pictures/wallpapers"

# Ensure the directory exists
mkdir -p "$THEME_DIR"

# List available themes
THEMES=($(ls "$THEME_DIR"))

# Check if there are no themes
if [ ${#THEMES[@]} -eq 0 ]; then
    notify-send -a "Theme Selector" -u normal "No Themes Found" "No themes available in:\n$THEME_DIR"
    exit 1
fi

# Use rofi to select a theme
# SELECTED_THEME=$(printf "%s\n" "${THEMES[@]}" | rofi -dmenu -p "Select Theme")
SELECTED_THEME=$(printf "%s\n" "${THEMES[@]}" | rofi -dmenu -p "Select Theme" -config ~/.config/rofi/wallpaper-selector.rasi)

# If no theme is selected, exit
if [ -z "$SELECTED_THEME" ]; then
    notify-send -a "Theme Selector" -u normal "Selection Cancelled" "No theme selected. Exiting."
    exit 1
fi

# Debugging: Show the selected theme
echo "Applying theme: $THEME_DIR/$SELECTED_THEME"

# Apply the selected theme using Pywal
wal -i "$THEME_DIR/$SELECTED_THEME"

# Use Swww to set the wallpaper
swww img "$THEME_DIR/$SELECTED_THEME"

# Source the reload script to apply changes
source "$HOME/.config/hypr/scripts/reload-apps.sh"

# Notify the user about the applied theme
notify-send -a "Theme Selector" -i "$THEME_DIR/$SELECTED_THEME" -u normal "Theme Applied" "Wallpaper & colors updated:\n$SELECTED_THEME"
