#!/bin/bash
set -euo pipefail

echo "[INFO] Installing SilentSDDM theme..."

echo "[INFO] Installing dependencies..."
sudo pacman -S --needed --noconfirm qt6-svg qt6-virtualkeyboard qt6-multimedia-ffmpeg

echo "[INFO] Installing SilentSDDM theme via yay..."
yay -S --needed --noconfirm sddm-silent-theme

echo "[INFO] Installing fonts..."
sudo cp -r /usr/share/sddm/themes/silent/fonts/* /usr/share/fonts/ 2>/dev/null || echo "[INFO] No custom fonts to install"

if [[ -f /etc/sddm.conf ]]; then
    echo "[INFO] Backing up existing /etc/sddm.conf..."
    sudo cp /etc/sddm.conf /etc/sddm.conf.backup
fi

echo "[INFO] Configuring SDDM..."
sudo tee /etc/sddm.conf > /dev/null << 'EOF'
[General]
InputMethod=qtvirtualkeyboard
GreeterEnvironment=QML2_IMPORT_PATH=/usr/share/sddm/themes/silent/components/,QT_IM_MODULE=qtvirtualkeyboard

[Theme]
Current=silent
EOF

echo "[OK] SilentSDDM theme installed successfully."
