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
  wget \
  curl \
  man \
  less \
  whois \
  unzip \
  inetutils \
  bash-completion \
  plocate \
  fastfetch \
  wl-clipboard \
  kitty \
  alacritty \
  ghostty \
  waybar \
  swaync \
  rofi \
  wlogout \
  pavucontrol \
  pipewire \
  wireplumber \
  network-manager-applet \
  networkmanager \
  nm-connection-editor \
  blueman \
  bluez \
  bluez-utils \
  wlogout \
  swayosd \
  impala \
  swww \
  zip \
  libnotify \
  nautilus \
  brightnessctl \
  hyprlock-git \
  btop \
  spf \
  adwaita-icon-theme \
  gnome-themes-extra \
  hyprsunset \
  wiremix \
  tar \
  hyprshot \
  satty



echo "✅ Terminal packages installed successfully!"
