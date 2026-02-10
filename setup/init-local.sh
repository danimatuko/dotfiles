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

# -------------------------------------------------
# Copy local assets into ~/.local/share
# Put related user assets here:
# sounds, wallpapers, icons, themes, etc.
# -------------------------------------------------

# Sounds
SOUNDS_SRC="$ASSETS_DIR/sounds"
SOUNDS_DEST="$LOCAL_SHARE/sounds"

echo "🔊 Copying sounds..."
mkdir -p "$SOUNDS_DEST"
cp -r "$SOUNDS_SRC/"* "$SOUNDS_DEST/"

echo "✅ Local assets ready."
