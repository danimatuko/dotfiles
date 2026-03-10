#!/bin/bash

set -e

confirm_prompt() {
	local message="$1"
	if command -v gum &>/dev/null; then
		gum confirm "$message"
	else
		read -r -p "$message [y/N] " confirm
		[[ "$confirm" =~ ^[Yy]$ ]]
	fi
}

confirm_prompt "Start dotfiles installation now?" || {
	echo "⏩ Installation cancelled."
	exit 0
}

if confirm_prompt "Backup your current config files before install?"; then
	BACKUP_DIR="$HOME/dotfiles_backup_$(date +%Y-%m-%d_%H-%M-%S)"
	echo "🛟 Backing up existing dotfiles to $BACKUP_DIR..."
	mkdir -p "$BACKUP_DIR"

	mv ~/.config "$BACKUP_DIR/config" 2>/dev/null || echo "📁 No ~/.config to backup"
	mv ~/.bashrc "$BACKUP_DIR/" 2>/dev/null || true
	mv ~/.gitconfig "$BACKUP_DIR/" 2>/dev/null || true
	mv ~/.tmux.conf "$BACKUP_DIR/" 2>/dev/null || true
else
	echo "⏩ Skipping initial backup."
fi

trap 'echo -e "\n❌ Dotfiles installation failed."
if command -v gum &>/dev/null; then
  gum confirm "Would you like to retry the installation?" && exec bash "$0" || exit 1
else
  read -p "Retry installation? [y/N] " confirm
  [[ "$confirm" =~ ^[Yy]$ ]] && exec bash "$0" || exit 1
fi' ERR

echo "🔧 Starting modular install scripts..."

source ~/dotfiles/setup/preinstall.sh
source ~/dotfiles/setup/init-local.sh
source ~/dotfiles/setup/login-manager.sh
source ~/dotfiles/setup/network.sh
source ~/dotfiles/setup/bluetooth.sh
source ~/dotfiles/setup/fonts.sh
source ~/dotfiles/setup/icons.sh
source ~/dotfiles/setup/starship.sh
source ~/dotfiles/setup/astrovim.sh
source ~/dotfiles/setup/terminal.sh
source ~/dotfiles/setup/desktop.sh
source ~/dotfiles/setup/link-bin.sh

echo -e "\n📝 Setup complete."
confirm_prompt "Link your shell/config files to ~/dotfiles now?" && source ~/dotfiles/setup/link-configs.sh || echo "⏩ Skipped config sync (your current files stay the same)."

sudo updatedb

confirm_prompt "Reboot to apply all settings?" && reboot
