#!/usr/bin/env bash

# Read current GTK theme
CURRENT_THEME=$(gsettings get org.gnome.desktop.interface gtk-theme | tr -d "'")

# Print current icon
if [[ "$CURRENT_THEME" == "Adwaita-dark" ]]; then
    echo "🌙"
else
    echo "☀️"
fi

