#!/bin/bash

set -e

DOTFILES_DIR="$HOME/dotfiles"
CONFIG_DIR="$DOTFILES_DIR/config"
BACKUP_DIR="$HOME/dotfiles_backup_$(date +"%Y-%m-%d_%H-%M-%S")"

echo "[INFO] Creating backup directory: $BACKUP_DIR"
mkdir -p "$BACKUP_DIR"
mkdir -p "$HOME/.config"
mkdir -p "$HOME/.config/systemd/user"

backup_and_link() {
	local src=$1
	local dest=$2

	if [ -e "$dest" ] || [ -L "$dest" ]; then
		echo "[INFO] Backing up $dest to $BACKUP_DIR"
		mv "$dest" "$BACKUP_DIR/"
	fi

	echo "[INFO] Linking $src to $dest"
	ln -sf "$src" "$dest"
}

# Dotfiles
backup_and_link "$CONFIG_DIR/.bashrc" "$HOME/.bashrc"
backup_and_link "$CONFIG_DIR/.zshrc" "$HOME/.zshrc"
backup_and_link "$CONFIG_DIR/.gitconfig" "$HOME/.gitconfig"
backup_and_link "$CONFIG_DIR/.tmux.conf" "$HOME/.tmux.conf"

# Config folders
backup_and_link "$CONFIG_DIR/ags" "$HOME/.config/ags"
backup_and_link "$CONFIG_DIR/fish" "$HOME/.config/fish"
backup_and_link "$CONFIG_DIR/ghostty" "$HOME/.config/ghostty"
backup_and_link "$CONFIG_DIR/hypr" "$HOME/.config/hypr"
backup_and_link "$CONFIG_DIR/kitty" "$HOME/.config/kitty"
backup_and_link "$CONFIG_DIR/nvim" "$HOME/.config/nvim"
backup_and_link "$CONFIG_DIR/wlogout" "$HOME/.config/wlogout"
backup_and_link "$CONFIG_DIR/zellij" "$HOME/.config/zellij"

echo ""
echo "[OK] All specified files and configs linked."
echo "[INFO] Backups are in $BACKUP_DIR"
