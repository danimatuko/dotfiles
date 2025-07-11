#!/bin/bash
# 🧩 install/fonts.sh — Installs system and user fonts

set -e

echo "🔤 Installing system fonts with yay..."

yay -Sy --noconfirm --needed \
  ttf-font-awesome \
  noto-fonts \
  noto-fonts-emoji \
  noto-fonts-cjk \
  noto-fonts-extra

mkdir -p ~/.local/share/fonts

# CaskaydiaMono Nerd Font
if ! fc-list | grep -qi "CaskaydiaMono Nerd Font"; then
  echo "⬇️  Installing CaskaydiaMono Nerd Font..."
  cd /tmp
  wget https://github.com/ryanoasis/nerd-fonts/releases/latest/download/CascadiaMono.zip
  unzip CascadiaMono.zip -d CascadiaFont
  cp CascadiaFont/*.ttf ~/.local/share/fonts/
  rm -rf CascadiaMono.zip CascadiaFont
  fc-cache
  cd -
else
  echo "✅ CaskaydiaMono Nerd Font already installed."
fi

# iA Writer Mono S
if ! fc-list | grep -qi "iA Writer Mono S"; then
  echo "⬇️  Installing iA Writer Mono S..."
  cd /tmp
  wget -O iafonts.zip https://github.com/iaolo/iA-Fonts/archive/refs/heads/master.zip
  unzip iafonts.zip -d iaFonts
  cp iaFonts/iA-Fonts-master/iA\ Writer\ Mono/Static/iAWriterMonoS-*.ttf ~/.local/share/fonts/
  rm -rf iafonts.zip iaFonts
  fc-cache
  cd -
else
  echo "✅ iA Writer Mono S already installed."
fi

echo "🎉 Fonts installation complete!"

