#!/bin/bash
# --------------------------------------------
# generate-wallpaper-entries.sh
# This script generates .desktop entries for each wallpaper found in the specified 
# wallpaper directory. These entries allow easy selection and application of 
# wallpapers through a launcher like Rofi.
# --------------------------------------------

WALLPAPER_DIR="$HOME/Pictures/wallpapers"
DESKTOP_DIR="$HOME/.local/share/applications/wallpapers"
THEME_SCRIPT="$HOME/.config/hypr/scripts/theme-selector.sh"

# Ensure the desktop directory exists
mkdir -p "$DESKTOP_DIR"

# Remove old desktop files
rm -f "$DESKTOP_DIR"/*.desktop

# Loop through the wallpapers and generate .desktop files
for img in "$WALLPAPER_DIR"/*.{jpg,jpeg,png}; do
    [ -e "$img" ] || continue
    ENTRY_NAME=$(basename "$img")
    ENTRY_PATH="$DESKTOP_DIR/$ENTRY_NAME.desktop"
    
    # Generate .desktop entry that calls the wallpaper-selector script with --apply flag
    echo "[Desktop Entry]" > "$ENTRY_PATH"
    echo "Name=$ENTRY_NAME" >> "$ENTRY_PATH"
    echo "Exec=$THEME_SCRIPT --apply \"$img\"" >> "$ENTRY_PATH"
    echo "Icon=$img" >> "$ENTRY_PATH"
    echo "Type=Application" >> "$ENTRY_PATH"
    echo "Categories=Wallpaper;" >> "$ENTRY_PATH"
    echo "Terminal=false" >> "$ENTRY_PATH"
done

echo "Generated $(find "$DESKTOP_DIR" -name "*.desktop" | wc -l) wallpaper entries"ge
