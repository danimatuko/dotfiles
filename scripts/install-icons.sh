#!/bin/bash

set -e

ICON_DIR="$HOME/.local/share/icons"
mkdir -p "$ICON_DIR"

# Icons from official repositories
declare -a OFFICIAL_ICONS=(
  "papirus-icon-theme"
  "breeze-icons"
  "adwaita-icon-theme"
  "hicolor-icon-theme"
)

echo "========================================="
echo "    ARCH LINUX ICON INSTALLER       "
echo "========================================="

# Install official repository icons
echo "Installing icons from official repositories..."
for icon in "${OFFICIAL_ICONS[@]}"; do
  if pacman -Qi "$icon" &>/dev/null; then
    echo "→ $icon is already installed, skipping..."
  else
    echo "→ Installing $icon..."
    sudo pacman -S --noconfirm "$icon" && echo "✓ $icon installed successfully!" || echo "! Failed to install $icon"
  fi
done

# Update icon cache
echo "Updating icon cache..."
gtk-update-icon-cache -f -t "$ICON_DIR"

if fc-cache -fv; then
  echo "========================================="
  echo "       ✓ INSTALLATION COMPLETE ✓        "
  echo "========================================="
else
  echo "========================================="
  echo "       ! INSTALLATION WARNING !          "
  echo "========================================="
  echo "Icon cache update failed. Some icons might not be available"
  echo "until you restart your system."
fi
