#!/bin/bash

set -e

echo "[INFO] Running post-install validation..."

# Keep NetworkManager as the single source of truth for networking.
sudo systemctl enable --now NetworkManager.service
sudo systemctl disable --now iwd.service
sudo systemctl disable --now systemd-networkd.service
sudo systemctl disable --now wpa_supplicant.service
sudo systemctl disable --now dhcpcd.service

# Keep pacman mirrors fresh with reflector.
if ! command -v reflector &>/dev/null; then
	echo "[INFO] Installing reflector..."
	sudo pacman -S --needed --noconfirm reflector
fi

echo "[INFO] Refreshing pacman mirrorlist with reflector..."
sudo cp /etc/pacman.d/mirrorlist /etc/pacman.d/mirrorlist.bak
sudo reflector --latest 20 --protocol https --sort rate --save /etc/pacman.d/mirrorlist
sudo systemctl enable --now reflector.timer

echo "[OK] Post-install validation complete for network stack: NetworkManager"
