#!/bin/bash

if command -v gum &>/dev/null; then
  echo "✅ gum is already installed."
else
  echo "🧃 Installing gum..."
  yay -S --noconfirm --needed gum
fi

