#!/bin/bash
set -e

echo "📦 Installing CLI & Hyprland tools via yay..."

yay -S --noconfirm --needed \
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
  btop \
  fastfetch \
  plocate \
  wl-clipboard \
  less \
  whois \
  unzip \
  inetutils \
  bash-completion \
  wget \
  curl \
  man \
  alacritty \
  impala \
  waybar \
  swaync \
  rofi \
  kitty \
  ghostty \
  pavucontrol \
  pipewire \
  wireplumber \
  network-manager-applet\
  swww

echo "✅ Terminal packages installed successfully!"

