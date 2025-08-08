#!/bin/bash
set -e

echo "📂 Copying user scripts from ~/dotfiles/bin to ~/.local/bin..."

mkdir -p "$HOME/.local/bin"

cp -f "$HOME/dotfiles/bin/"* "$HOME/.local/bin/"
chmod +x "$HOME/.local/bin/"*

echo "✅ Scripts copied."

