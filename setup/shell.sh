#!/bin/bash

set -e

echo "🐟 Installing fish shell..."

yay -S --noconfirm --needed fish

echo "🔧 Setting default shell to fish..."
sudo usermod --shell "$(command -v fish)" "$USER"

echo "✅ Fish shell installed and set as default."
