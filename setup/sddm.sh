#!/bin/bash
set -euo pipefail

echo "🎨 Installing SilentSDDM theme..."

echo "📦 Installing dependencies..."
sudo pacman -S --needed --noconfirm qt6-svg qt6-virtualkeyboard qt6-multimedia-ffmpeg

echo "📦 Installing SilentSDDM theme via yay..."
yay -S --needed --noconfirm sddm-silent-theme

echo "🔤 Installing fonts..."
sudo cp -r /usr/share/sddm/themes/silent/fonts/* /usr/share/fonts/ 2>/dev/null || echo "📁 No custom fonts to install"

if [[ -f /etc/sddm.conf ]]; then
    echo "🛟 Backing up existing /etc/sddm.conf..."
    sudo cp /etc/sddm.conf /etc/sddm.conf.backup
fi

echo "🔧 Configuring SDDM..."
sudo tee /etc/sddm.conf > /dev/null << 'EOF'
[General]
InputMethod=qtvirtualkeyboard
GreeterEnvironment=QML2_IMPORT_PATH=/usr/share/sddm/themes/silent/components/,QT_IM_MODULE=qtvirtualkeyboard

[Theme]
Current=silent
EOF

echo "✅ SilentSDDM theme installed successfully."
