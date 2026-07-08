#!/bin/bash

set -e

echo "[INFO] Ensuring bash shell is installed..."

yay -S --noconfirm --needed bash

echo "[INFO] Setting default shell to bash..."
sudo usermod --shell "$(command -v bash)" "$USER"

echo "[OK] Bash shell installed and set as default."
