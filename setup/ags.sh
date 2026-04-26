#!/bin/bash

set -e

echo "📦 Installing AGS runtime dependencies..."

packages=(libastal-meta nodejs npm)

if ! command -v ags &>/dev/null; then
	packages=(ags "${packages[@]}")
fi

yay -S --noconfirm --needed "${packages[@]}"

cd "$HOME/dotfiles/config/ags"
npm ci

echo "✅ AGS dependencies installed successfully!"
