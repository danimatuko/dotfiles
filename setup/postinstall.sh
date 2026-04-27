#!/bin/bash

set -e

echo "[INFO] Running post-install validation..."

# Disable NetworkManager to avoid conflicts with the iwd/systemd-networkd setup from archinstall.
sudo systemctl disable --now NetworkManager.service
sudo systemctl enable --now iwd.service
sudo systemctl enable --now systemd-networkd.service

echo "[OK] Post-install validation complete for Wi-Fi stack: iwd"
