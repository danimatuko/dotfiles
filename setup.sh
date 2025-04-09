#!/bin/bash

# ================================
# This script sets up dotfiles on a new machine by:
# - Backing up existing config files and symlinks.
# - Creating symlinks from a central dotfiles repo to the home directory.
# - Ensuring a consistent configuration across systems.
#
# Files and config directories symlinked include:
# - .zshrc, .tmux.conf, .gitconfig, and configs for nvim, kitty, waybar, etc.
# ================================

# Set the dotfiles directory and the backup directory
DOTFILES_DIR="$HOME/dotfiles"
BACKUP_TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
BACKUP_DIR="$HOME/dotfiles_backup_$BACKUP_TIMESTAMP"

# List of top-level files to symlink (e.g., ~/.zshrc)
files=(
  ".zshrc"
  ".tmux.conf"
  ".gitconfig"
)

# List of folders inside ~/.config to symlink (e.g., ~/.config/nvim)
configs=(
  "hypr"
  "kitty"
  "nvim"
  "nvim-chad"
  "rofi"
  "swaync"
  "waybar"
)

# Display section header
echo "==============================="
echo "🔗 Starting dotfiles setup..."
echo "==============================="
echo "📦 Creating backup folder at $BACKUP_DIR"
mkdir -p "$BACKUP_DIR"

# Function to backup existing file/folder and create a symlink
backup_and_link() {
  local src=$1   # Source path in dotfiles directory
  local dest=$2  # Destination path in home directory

  # If destination exists (either as a file, folder, or symlink)
  if [ -e "$dest" ] || [ -L "$dest" ]; then
    echo "📁 Backing up existing $dest to $BACKUP_DIR"
    mv "$dest" "$BACKUP_DIR/"
  fi

  # Create a symbolic link from source to destination
  echo "🔗 Linking $src -> $dest"
  ln -sf "$src" "$dest"
}

# Symlink top-level dotfiles
for file in "${files[@]}"; do
  backup_and_link "$DOTFILES_DIR/$file" "$HOME/$file"
done

# Symlink config folders inside ~/.config
for config in "${configs[@]}"; do
  mkdir -p "$HOME/.config"  # Ensure ~/.config exists
  backup_and_link "$DOTFILES_DIR/.config/$config" "$HOME/.config/$config"
done

# Completion message
echo ""
echo "==============================="
echo " ✅ Dotfiles Setup Complete ✅ "
echo "==============================="
echo ""
echo "Your configurations have been backed up to:"
echo "📂 $BACKUP_DIR"
echo ""
echo "Setup is now complete and ready to use!"
echo ""

