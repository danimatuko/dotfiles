#!/bin/bash

set -e
FONT_DIR="$HOME/.local/share/fonts"
mkdir -p "$FONT_DIR"

# Fonts from official repositories
declare -a OFFICIAL_FONTS=(
  "ttf-dejavu"
  "noto-fonts"
  "ttf-roboto"
  "ttf-fira-code"
)

# Fonts from AUR - these might need yay or another AUR helper
declare -a AUR_FONTS=(
  "nerd-fonts-jetbrains-mono"
  "nerd-fonts-fira-code"
  "nerd-fonts-caskaydiacove"
  "nerd-fonts"
  "ttf-font-awesome"
)

echo "========================================="
echo "    ARCH LINUX FONT INSTALLATION WIZARD    "
echo "========================================="

# Install official repository fonts
echo "Installing fonts from official repositories..."
for font in "${OFFICIAL_FONTS[@]}"; do
  if pacman -Qi "$font" &>/dev/null; then
    echo "→ $font is already installed, skipping..."
  else
    echo "→ Installing $font..."
    if sudo pacman -S --noconfirm "$font"; then
      echo "✓ $font installed successfully!"
    else
      echo "! Failed to install $font"
    fi
  fi
done

# Install AUR fonts using yay (make sure yay is installed)
echo "Installing fonts from AUR..."
if command -v yay &>/dev/null; then
  for font in "${AUR_FONTS[@]}"; do
    if pacman -Qi "$font" &>/dev/null; then
      echo "→ $font is already installed, skipping..."
    else
      echo "→ Installing $font..."
      if yay -S --noconfirm "$font"; then
        echo "✓ $font installed successfully!"
      else
        echo "! Failed to install $font"
      fi
    fi
  done
else
  echo "! Warning: yay is not installed. Skipping AUR fonts."
  echo "  To install yay, run:"
  echo "  git clone https://aur.archlinux.org/yay.git && cd yay && makepkg -si"
fi

# Update font cache
echo "Updating font cache..."
if fc-cache -fv; then
  echo ""
  echo "========================================="
  echo "       ✓ INSTALLATION COMPLETE ✓        "
  echo "========================================="
  echo "All fonts have been successfully installed!"
  echo "Remember to restart your applications to use the new fonts."
else
  echo ""
  echo "========================================="
  echo "       ! INSTALLATION WARNING !          "
  echo "========================================="
  echo "Font cache update failed. Some fonts might not be available"
  echo "until you restart your system."
fi
