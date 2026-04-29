#!/bin/bash

set -e

echo "[INFO] Running post-install validation..."

# Keep NetworkManager as the single source of truth for networking.
sudo systemctl enable --now NetworkManager.service
sudo systemctl disable --now iwd.service
sudo systemctl disable --now systemd-networkd.service
sudo systemctl disable --now wpa_supplicant.service
sudo systemctl disable --now dhcpcd.service

echo "[OK] Post-install validation complete for network stack: NetworkManager"
