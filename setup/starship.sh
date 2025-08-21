#!/bin/bash

# Install starship prompt
if ! command -v starship &>/dev/null; then
  echo "🌟 Installing starship prompt..."
  yay -S --noconfirm --needed starship
else
  echo "🌟 Starship already installed."
fi

