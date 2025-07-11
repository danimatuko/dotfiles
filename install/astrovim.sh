#!/bin/bash

set -e

echo "🛠️ Installing AstroNvim..."

# Backup existing config if present
[ -d ~/.config/nvim ] && mv ~/.config/nvim ~/.config/nvim.bak
[ -d ~/.local/share/nvim ] && mv ~/.local/share/nvim ~/.local/share/nvim.bak
[ -d ~/.local/state/nvim ] && mv ~/.local/state/nvim ~/.local/state/nvim.bak
[ -d ~/.cache/nvim ] && mv ~/.cache/nvim ~/.cache/nvim.bak

# Clone AstroNvim template
git clone --depth 1 https://github.com/AstroNvim/template ~/.config/nvim

# Remove template's git history
rm -rf ~/.config/nvim/.git

echo "🚀 AstroNvim installed. Launch Neovim to complete setup: nvim"

