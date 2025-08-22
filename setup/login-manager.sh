#!/bin/bash
set -euo pipefail

echo "📦 Installing SDDM login manager with yay..."

yay -S --needed --noconfirm sddm

echo "🔧 Enabling SDDM service..."
sudo systemctl enable sddm.service
sudo systemctl set-default graphical.target

echo "✅ SDDM installation complete."
echo "👉 Reboot to start using SDDM."

