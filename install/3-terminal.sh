#!/bin/bash

# ========================================
# 🧩 install/terminal.sh
# AUR + CLI tools install script (Hyprland setup)
# ========================================

set -e

echo "📦 Installing CLI & Hyprland tools via yay..."

yay -S --noconfirm --needed \
  # CLI productivity tools
  git \
  eza \
  fd \
  fzf \
  ripgrep \
  bat \
  zoxide \
  tldr \
  tmux \
  vim \
  nvim \
  lazygit \
  # Utilities
  btop \
  fastfetch \
  plocate \
  wl-clipboard \
  less \
  whois \
  unzip \
  inetutils \
  bash-completion \
  # Hyprland environment & apps
  waybar \
  swaync \
  rofi \
  kitty \
  # Terminals
  ghostty \
  # Sound and network
  pavucontrol \
  pipewire \
  wireplumber \
  network-manager-applet

echo "✅ Terminal packages installed successfully!"

