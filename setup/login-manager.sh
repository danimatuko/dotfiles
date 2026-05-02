#!/bin/bash
set -euo pipefail

echo "[INFO] Installing SDDM login manager with yay..."

yay -S --needed --noconfirm sddm

echo "[INFO] Enabling SDDM service..."
sudo systemctl enable sddm.service
sudo systemctl set-default graphical.target

echo "[OK] SDDM installation complete."
echo "[INFO] SDDM is enabled and will be used on next boot. Continuing installation..."
