#!/bin/bash

# Install starship prompt
if ! command -v starship &>/dev/null; then
  echo "[INFO] Installing starship prompt..."
  yay -S --noconfirm --needed starship
else
  echo "[OK] Starship already installed."
fi
