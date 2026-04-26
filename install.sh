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

stage() {
	if command -v gum &>/dev/null; then
		gum style --padding "0 2" --border double --border-foreground 212 "$1"
		return
	fi

	printf '\n=== %s ===\n' "$1"
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

stage "Bootstrap AUR Tools"
source ~/dotfiles/setup/preinstall.sh

stage "Local Assets"
source ~/dotfiles/setup/init-local.sh

stage "Login Manager"
source ~/dotfiles/setup/login-manager.sh
source ~/dotfiles/setup/sddm.sh

stage "Network Setup"
source ~/dotfiles/setup/network.sh

stage "Bluetooth Setup"
source ~/dotfiles/setup/bluetooth.sh
# source ~/dotfiles/setup/fonts.sh # temporarily disabled

stage "Icon Theme"
source ~/dotfiles/setup/icons.sh

stage "Hyprland Desktop"
source ~/dotfiles/setup/desktop.sh

stage "AGS Shell"
source ~/dotfiles/setup/ags.sh

stage "Default Shell"
source ~/dotfiles/setup/shell.sh

stage "Terminal Tools"
source ~/dotfiles/setup/starship.sh
source ~/dotfiles/setup/astrovim.sh
source ~/dotfiles/setup/terminal.sh

stage "Command Links"
source ~/dotfiles/setup/link-bin.sh

echo -e "\n📝 Setup complete."
if confirm_prompt "Link your shell/config files to ~/dotfiles now?"; then
	stage "Config Links"
	source ~/dotfiles/setup/link-configs.sh
	# source ~/dotfiles/setup/hyprdynamicmonitors.sh
else
	echo "⏩ Skipped config sync (your current files stay the same)."
	echo "ℹ️  HyprDynamicMonitors service setup skipped until configs are linked."
fi

sudo updatedb

confirm_prompt "Reboot to apply all settings?" && reboot
