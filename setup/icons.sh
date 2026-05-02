#!/bin/bash
# install/icons.sh - Installs system icon themes

set -e

echo "[INFO] Installing icon themes with yay..."

yay -Sy --noconfirm --needed \
  papirus-icon-theme \
  bibata-cursor-theme

echo "[OK] Icon themes installed successfully."
