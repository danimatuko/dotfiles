#!/bin/bash

set -e

STAGE_INDEX=0
STAGE_TOTAL=10

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
	local title="$1"
	local detail="$2"
	STAGE_INDEX=$((STAGE_INDEX + 1))
	local label progress
	label=$(printf '%02d' "$STAGE_INDEX")
	progress="$label/$STAGE_TOTAL"

	if command -v gum &>/dev/null; then
		printf '\n'
		gum style --foreground 240 "$progress"
		gum style --foreground 212 --bold "$title"
		if [ -n "$detail" ]; then
			gum style --margin "0 0 1 0" --foreground 245 "$detail"
		else
			printf '\n'
		fi
		gum style --foreground 240 "────────────────────────────────────────────────────────────"
		return
	fi

	printf '\n%s\n' "$progress"
	printf '%s\n' "$title"
	if [ -n "$detail" ]; then
		printf '%s\n' "$detail"
	fi
	printf '%s\n' "------------------------------------------------------------"
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

stage "Bootstrap" "AUR helper and installer prerequisites"
source ~/dotfiles/setup/preinstall.sh

stage "Local Assets" "Prepare machine-specific files and local state"
source ~/dotfiles/setup/init-local.sh

stage "Display Manager" "Install and configure the graphical login stack"
source ~/dotfiles/setup/login-manager.sh
source ~/dotfiles/setup/sddm.sh

stage "Networking" "Install and configure network tooling"
source ~/dotfiles/setup/network.sh

stage "Bluetooth" "Install desktop Bluetooth support"
source ~/dotfiles/setup/bluetooth.sh
# source ~/dotfiles/setup/fonts.sh # temporarily disabled

stage "Theming" "Install shared icon and desktop theme assets"
source ~/dotfiles/setup/icons.sh

stage "Desktop" "Install the Hyprland compositor and portal stack"
source ~/dotfiles/setup/desktop.sh

stage "Shell UI" "Install AGS runtime dependencies and app packages"
source ~/dotfiles/setup/ags.sh

stage "User Shell" "Configure the default interactive shell"
source ~/dotfiles/setup/shell.sh

stage "CLI Tools" "Install terminal utilities and editor setup"
source ~/dotfiles/setup/starship.sh
source ~/dotfiles/setup/astrovim.sh
source ~/dotfiles/setup/terminal.sh

stage "Command Links" "Link dotfiles bin commands into ~/.local/bin"
source ~/dotfiles/setup/link-bin.sh

echo -e "\n📝 Setup complete."
if confirm_prompt "Link your shell/config files to ~/dotfiles now?"; then
	stage "Config Links" "Link managed configs into your home directory"
	source ~/dotfiles/setup/link-configs.sh
	# source ~/dotfiles/setup/hyprdynamicmonitors.sh
else
	echo "⏩ Skipped config sync (your current files stay the same)."
	echo "ℹ️  HyprDynamicMonitors service setup skipped until configs are linked."
fi

sudo updatedb

confirm_prompt "Reboot to apply all settings?" && reboot
