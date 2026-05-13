#!/bin/bash

set -euo pipefail

echo "[INFO] Installing LazyVim starter..."

if [ -d "$HOME/.config/nvim" ]; then
  echo "[INFO] Skipping LazyVim install: ~/.config/nvim already exists"
  exit 0
fi

git clone --depth 1 https://github.com/LazyVim/starter "$HOME/.config/nvim"
rm -rf "$HOME/.config/nvim/.git"

echo "[OK] LazyVim starter installed. Launch Neovim to complete setup: nvim"
