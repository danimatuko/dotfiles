#!/bin/bash

set -e

DOTFILES_DIR="$HOME/dotfiles"
CONFIG_DIR="$DOTFILES_DIR/config"
BACKUP_DIR="$HOME/dotfiles_backup_$(date +"%Y-%m-%d_%H-%M-%S")"

echo "📦 Creating backup directory: $BACKUP_DIR"
mkdir -p "$BACKUP_DIR"
mkdir -p "$HOME/.config"

backup_and_link() {
  local src=$1
  local dest=$2

  if [ -e "$dest" ] || [ -L "$dest" ]; then
    echo "📁 Backing up $dest → $BACKUP_DIR"
    mv "$dest" "$BACKUP_DIR/"
  fi

  echo "🔗 Linking $src → $dest"
  ln -sf "$src" "$dest"
}

# Dotfiles
backup_and_link "$CONFIG_DIR/.bashrc" "$HOME/.bashrc"
backup_and_link "$CONFIG_DIR/.zshrc" "$HOME/.zshrc"
backup_and_link "$CONFIG_DIR/.gitconfig" "$HOME/.gitconfig"
backup_and_link "$CONFIG_DIR/.tmux.conf" "$HOME/.tmux.conf"

# Config folders
backup_and_link "$CONFIG_DIR/ghostty" "$HOME/.config/ghostty"
backup_and_link "$CONFIG_DIR/hypr" "$HOME/.config/hypr"
backup_and_link "$CONFIG_DIR/kitty" "$HOME/.config/kitty"
backup_and_link "$CONFIG_DIR/nvim" "$HOME/.config/nvim"
backup_and_link "$CONFIG_DIR/rofi" "$HOME/.config/rofi"
backup_and_link "$CONFIG_DIR/swaync" "$HOME/.config/swaync"
backup_and_link "$CONFIG_DIR/waybar" "$HOME/.config/waybar"

echo ""
echo "✅ All specified files and configs linked!"
echo "📂 Backups are in $BACKUP_DIR"

