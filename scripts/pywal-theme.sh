#!/bin/bash
# This script is triggered by Waypaper's post_command.
# It applies a wallpaper-based color scheme using pywal and updates Waybar's configuration for the Hyprland window manager.

# Wait briefly to allow Waybar to update before applying the new color scheme.
sleep 0.5

# Define directories for the scripts and cache
SCRIPTS_DIR="$HOME/dotfiles/scripts"
WAL_CACHE_DIR="$HOME/.cache/wal"
WAYBAR_CONFIG_DIR="$HOME/.config/waybar"

# Set the color scheme based on the current wallpaper
source "$SCRIPTS_DIR/set-wallpaper-colors.sh"

# Update Waybar color scheme by recreating the symlink
source "$SCRIPTS_DIR/update-waybar-colors.sh"

# Reload Waybar to apply the new color scheme
source "$SCRIPTS_DIR/reload-waybar.sh"
