#!/bin/bash

set -e

echo "📦 Installing AGS runtime dependencies..."

yay -S --noconfirm --needed ags libastal-meta nodejs npm

cd "$HOME/dotfiles/config/ags"
npm ci

echo "✅ AGS dependencies installed successfully!"
