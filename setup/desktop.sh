#!/bin/bash
set -e

echo "📦 Installing desktop apps via yay..."

yay -S --noconfirm --needed \
  discord

echo "✅ Desktop apps installed successfully!"

