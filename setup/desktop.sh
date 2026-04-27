#!/bin/bash
set -e

echo "[INFO] Installing compositor and portal stack via yay..."

yay -S --noconfirm --needed \
  hyprland \
  xdg-desktop-portal-hyprland \
  xdg-desktop-portal-gtk

echo "[OK] Desktop stack installed successfully."
