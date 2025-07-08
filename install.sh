#!/bin/bash

set -e

trap 'echo "❌ Dotfiles installation failed. To retry: source ~/dotfiles/install.sh"' ERR

echo "🔧 Starting modular install scripts..."

# Run all install scripts in order
for script in ~/dotfiles/install/*.sh; do
  echo -e "\n▶️ Running $script"
  source "$script"
done

# Prompt to link dotfiles
echo -e "\n📝 Dotfile setup ready..."
gum confirm "Link dotfiles and config files now?" && bash ~/dotfiles/link-dotfiles.sh || echo "⏩ Skipped dotfile linking."

# Update locate database
sudo updatedb

# Prompt to reboot
gum confirm "Reboot to apply all settings?" && reboot

