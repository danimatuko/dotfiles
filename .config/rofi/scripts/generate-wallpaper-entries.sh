#!/bin/bash
# --------------------------------------------
# generate-wallpaper-entries.sh
# This script generates .desktop entries for each wallpaper found in the specified 
# wallpaper directory. These entries allow easy selection and application of 
# wallpapers through a launcher like Rofi. Each .desktop file contains a command 
# to apply the wallpaper using `wal` and `swww`.
# --------------------------------------------

WALLPAPER_DIR="$HOME/Pictures/wallpapers"
DESKTOP_DIR="$HOME/.local/share/applications/wallpapers"

# Ensure the desktop directory exists
mkdir -p "$DESKTOP_DIR"

# Loop through the wallpapers and generate .desktop files
for img in "$WALLPAPER_DIR"/*.{jpg,jpeg,png}; do
    [ -e "$img" ] || continue
    ENTRY_NAME=$(basename "$img")
    ENTRY_PATH="$DESKTOP_DIR/$ENTRY_NAME.desktop"

    # Generate .desktop entry
    echo "[Desktop Entry]" > "$ENTRY_PATH"
    echo "Name=$ENTRY_NAME" >> "$ENTRY_PATH"
    echo "Exec=wal -i \"$img\" && swww img \"$img\"" >> "$ENTRY_PATH"
    echo "Icon=$img" >> "$ENTRY_PATH"
    echo "Type=Application" >> "$ENTRY_PATH"
    echo "Categories=Wallpaper;" >> "$ENTRY_PATH"
done
