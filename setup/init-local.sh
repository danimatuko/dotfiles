#!/bin/bash
set -e

echo "📦 Setting up local user assets..."

# -------------------------------------------------
# Base paths
# -------------------------------------------------
DOTFILES_DIR="$HOME/dotfiles"
ASSETS_DIR="$DOTFILES_DIR/assets"

LOCAL_DIR="$HOME/.local"
LOCAL_SHARE="$LOCAL_DIR/share"

# Ensure core local directories exist
mkdir -p "$LOCAL_SHARE"
mkdir -p "$LOCAL_DIR/bin"
mkdir -p "$LOCAL_DIR/state"

WALLPAPER_ROOT="$HOME/Pictures/wallpapers"
mkdir -p "$WALLPAPER_ROOT"

for theme in catppuccin gruvbox gruvbox-light nord tokyonight everforest; do
  mkdir -p "$WALLPAPER_ROOT/$theme"
done

# -------------------------------------------------
# Copy local assets into ~/.local/share
# Put related user assets here:
# sounds, wallpapers, icons, themes, etc.
# -------------------------------------------------

echo "✅ Local assets ready."
