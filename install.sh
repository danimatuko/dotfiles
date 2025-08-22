#!/bin/bash

set -e

# Backup existing configs before running installers
BACKUP_DIR="$HOME/dotfiles_backup_$(date +%Y-%m-%d_%H-%M-%S)"
echo "🛟 Backing up existing dotfiles to $BACKUP_DIR..."
mkdir -p "$BACKUP_DIR"

mv ~/.config "$BACKUP_DIR/config" 2>/dev/null || echo "📁 No ~/.config to backup"
mv ~/.bashrc "$BACKUP_DIR/" 2>/dev/null || true
mv ~/.gitconfig "$BACKUP_DIR/" 2>/dev/null || true
mv ~/.tmux.conf "$BACKUP_DIR/" 2>/dev/null || true

trap 'echo -e "\n❌ Dotfiles installation failed."
if command -v gum &>/dev/null; then
  gum confirm "Would you like to retry the installation?" && exec bash "$0" || exit 1
else
  read -p "Retry installation? [y/N] " confirm
  [[ "$confirm" =~ ^[Yy]$ ]] && exec bash "$0" || exit 1
fi' ERR

echo "🔧 Starting modular install scripts..."

source ~/dotfiles/setup/preinstall.sh
source ~/dotfiles/setup/login-manager.sh
source ~/dotfiles/setup/network.sh
source ~/dotfiles/setup/bluetooth.sh
source ~/dotfiles/setup/fonts.sh
source ~/dotfiles/setup/icons.sh
source ~/dotfiles/setup/starship.sh
source ~/dotfiles/setup/astrovim.sh
source ~/dotfiles/setup/terminal.sh
source ~/dotfiles/setup/deploy-scripts.sh   


echo -e "\n📝 Dotfile setup ready..."
gum confirm "Link dotfiles and config files now?" && source ~/dotfiles/link-dotfiles.sh || echo "⏩ Skipped dotfile linking."

sudo updatedb

gum confirm "Reboot to apply all settings?" && reboot
