#!/bin/bash

# Get the current wallpaper path
WALLPAPER_PATH=$(swww query | grep -oP '(?<=image: ).*')

# Check if the wallpaper path is empty
if [[ -z "$WALLPAPER_PATH" ]]; then
    echo "Error: Wallpaper path is empty."
    exit 1
fi

# Apply the color scheme using pywal
wal -i "$WALLPAPER_PATH"


