#!/bin/bash

set -e

echo "🛠️ Installing AstroNvim..."

# Clone AstroNvim template
git clone --depth 1 https://github.com/AstroNvim/template ~/.config/nvim

# Remove template's git history
rm -rf ~/.config/nvim/.git

echo "🚀 AstroNvim installed. Launch Neovim to complete setup: nvim"

