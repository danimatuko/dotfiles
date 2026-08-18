#!/bin/bash

set -e

echo "[INFO] Ensuring fish shell is installed..."

yay -S --noconfirm --needed fish

echo "[INFO] Setting default shell to fish..."
sudo usermod --shell "$(command -v fish)" "$USER"

echo "[OK] Fish shell installed and set as default."
