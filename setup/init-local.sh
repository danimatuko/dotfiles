#!/bin/bash
set -e

# Purpose: prepare local asset directories and sync wallpapers used by system theme scripts.

# -------------------------------------------------
# Variables
# -------------------------------------------------
LOCAL_DIR="$HOME/.local"
PICTURES_DIR="$HOME/Pictures"
WALLPAPERS_DIR="$PICTURES_DIR/Wallpapers"
WALLPAPER_REPO_URL="https://github.com/danimatuko/wallpapers.git"

# -------------------------------------------------
# Setup local directories
# -------------------------------------------------
echo "📦 Setting up local user assets..."
mkdir -p "$LOCAL_DIR/share"
mkdir -p "$LOCAL_DIR/bin"
mkdir -p "$LOCAL_DIR/state"
mkdir -p "$PICTURES_DIR"
mkdir -p "$WALLPAPERS_DIR"

if [ -d "$WALLPAPERS_DIR/.git" ]; then
	echo "🎨 Updating wallpapers..."
	git -C "$WALLPAPERS_DIR" pull --ff-only || echo "⚠️  Wallpaper update failed. Continuing."
elif [ -z "$(ls -A "$WALLPAPERS_DIR" 2>/dev/null)" ]; then
	echo "🎨 Cloning wallpapers..."
	git clone --depth 1 "$WALLPAPER_REPO_URL" "$WALLPAPERS_DIR" || echo "⚠️  Wallpaper clone failed. Continuing."
else
	echo "⚠️  $WALLPAPERS_DIR exists and is not a git repo. Skipping wallpaper sync."
fi

echo "✅ Local assets ready."
