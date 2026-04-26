#!/bin/bash
set -e

echo "📦 Installing compositor and portal stack via yay..."

yay -S --noconfirm --needed \
  hyprland \
  xdg-desktop-portal-hyprland \
  xdg-desktop-portal-gtk

echo "✅ Desktop stack installed successfully!"
