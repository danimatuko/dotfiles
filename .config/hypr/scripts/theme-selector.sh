#!/bin/bash

###############################################################################
# Hyprland Elegant Theme Switcher
# --------------------------------
# A script to switch themes on Hyprland by selecting wallpapers using a
# thumbnail-based Rofi menu. It applies the selected wallpaper using Pywal
# for theming and swww for smooth transitions. It also reloads apps that
# depend on the new theme.
#
# Features:
# - Auto-generates thumbnail previews for wallpapers
# - Interactive Rofi menu with preview icons
# - Applies colors with `wal` and transitions wallpaper with `swww`
# - Optionally sources a reload script for apps (e.g. Waybar, GTK, etc.)
#
# Requirements:
# - rofi, imagemagick (for `convert`), pywal (`wal`), swww
#
# Author: Dani Matuko
###############################################################################

# === Configuration ===

# Directories
readonly WALLPAPER_DIR="$HOME/Pictures/wallpapers"     # Source wallpaper images
readonly CONFIG_DIR="$HOME/.config/rofi"               # Rofi config location
readonly CACHE_DIR="$HOME/.cache/theme-switcher"       # Cached data
readonly THUMBNAIL_DIR="$CACHE_DIR/thumbnails"         # Thumbnail images

# Script and theme paths
readonly RELOAD_SCRIPT="$HOME/.config/hypr/scripts/reload-apps.sh"
readonly ROFI_THEME="$CONFIG_DIR/wallpaper-selector-gallery.rasi"

# swww transition parameters
readonly SWWW_PARAMS="--transition-fps 60 \
--transition-type random \
--transition-duration 1 \
--transition-bezier .43,1.19,1,.4"

# === Logging Helpers ===

# Show an error with notify-send and exit
log_error() {
    notify-send -u critical "Theme Switcher" "$1"
    echo "[ERROR] $1" >&2
    exit 1
}

# Show an informational message
log_info() {
    notify-send -a "Theme Switcher" "$1" "$2"
    echo "[INFO] $1: $2"
}

# === Checks ===

# Ensure required programs are available
ensure_dependencies() {
    local deps=(rofi convert wal swww)
    for cmd in "${deps[@]}"; do
        command -v "$cmd" &>/dev/null || log_error "$cmd is required but not installed"
    done
}

# === Thumbnail Generation ===

# Generate or return cached thumbnail for a given wallpaper
generate_thumbnail() {
    local image="$1"
    local name
    name="$(basename "$image")"
    local thumbnail="$THUMBNAIL_DIR/$name"

    if [[ ! -f "$thumbnail" || "$image" -nt "$thumbnail" ]]; then
        convert "$image" -thumbnail "256x256^" -gravity center -extent 256x256 "$thumbnail"
    fi

    echo "$thumbnail"
}

# === Theme Application ===

# Apply selected wallpaper and reload theme-related apps
apply_theme() {
    local wallpaper="$1"

    wal -i "$wallpaper" -q                              # Set terminal theme with Pywal
    swww img "$wallpaper" $SWWW_PARAMS                  # Set wallpaper with transition

    sleep 0.5                                           # Brief delay to allow transition

    [[ -f "$RELOAD_SCRIPT" ]] && source "$RELOAD_SCRIPT"  # Reload apps if script exists

    log_info "Theme Applied" "$(basename "$wallpaper")"
}

# === Menu Construction ===

# Create the Rofi-compatible menu and matching file path index
build_menu() {
    local tmp_menu
    tmp_menu="$(mktemp)"
    local tmp_paths="$tmp_menu.paths"

    find "$WALLPAPER_DIR" -type f \( -iname "*.jpg" -o -iname "*.png" -o -iname "*.jpeg" -o -iname "*.webp" \) \
        | sort | while read -r img; do
            local thumb
            thumb="$(generate_thumbnail "$img")"
            local name
            name="$(basename "${img%.*}")"

            echo -e "$name\0icon\x1f$thumb" >> "$tmp_menu"   # Rofi entry with thumbnail
            echo "$img" >> "$tmp_paths"                      # Path list for lookup
        done

    echo "$tmp_menu"
}

# === Rofi Menu Interface ===

# Display the Rofi menu and handle user selection
show_menu_and_select() {
    local menu_file
    menu_file="$(build_menu)"
    local paths_file="$menu_file.paths"

    local selected_index
    selected_index=$(<"$menu_file" rofi -dmenu \
        -i \
        -p "Theme Switcher" \
        -theme "$ROFI_THEME" \
        -format i)

    if [[ -n "$selected_index" ]]; then
        local selected_wallpaper
        selected_wallpaper=$(sed -n "$((selected_index + 1))p" "$paths_file")

        [[ -f "$selected_wallpaper" ]] && apply_theme "$selected_wallpaper"
    fi

    rm -f "$menu_file" "$paths_file"  # Cleanup
}

# === Entry Point ===

main() {
    mkdir -p "$CONFIG_DIR" "$CACHE_DIR" "$THUMBNAIL_DIR"

    [[ -d "$WALLPAPER_DIR" ]] || log_error "Wallpaper directory not found: $WALLPAPER_DIR"

    ensure_dependencies
    show_menu_and_select
}

main
