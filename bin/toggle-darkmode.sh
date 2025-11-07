#!/usr/bin/env bash
# Theme switcher script with enhanced notifications
# Define your themes
LIGHT_THEME="Adwaita"
DARK_THEME="Adwaita-dark"
ICON_THEME="Adwaita"  # Same for both

# Get current theme
CURRENT_THEME=$(gsettings get org.gnome.desktop.interface gtk-theme | tr -d "'")

# Use icons in notifications for better visual cues
LIGHT_ICON="weather-clear"
DARK_ICON="weather-clear-night"

# Set notification timeout (in milliseconds)
NOTIFICATION_TIMEOUT=3000

if [[ "$CURRENT_THEME" == "$DARK_THEME" ]]; then
    # Switch to light mode
    gsettings set org.gnome.desktop.interface gtk-theme "$LIGHT_THEME"
    gsettings set org.gnome.desktop.interface icon-theme "$ICON_THEME"
    gsettings set org.gnome.desktop.interface color-scheme "default"
    
    # Enhanced notification with icon and timeout
    notify-send --icon="$LIGHT_ICON" --expire-time="$NOTIFICATION_TIMEOUT" "Theme Changed" "Switched to Light Mode (${LIGHT_THEME})"
else
    # Switch to dark mode
    gsettings set org.gnome.desktop.interface gtk-theme "$DARK_THEME"
    gsettings set org.gnome.desktop.interface icon-theme "$ICON_THEME"
    gsettings set org.gnome.desktop.interface color-scheme "prefer-dark"
    
    # Enhanced notification with icon and timeout
    notify-send --icon="$DARK_ICON" --expire-time="$NOTIFICATION_TIMEOUT" "Theme Changed" "Switched to Dark Mode (${DARK_THEME})"
fi
