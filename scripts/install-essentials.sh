#!/bin/bash

echo "========================================="
echo "    HYPRLAND ESSENTIALS INSTALLER     "
echo "========================================="

# Array of Essential Packages for Hyprland Setup
ESSENTIAL_PKGS=(
    "hyprland" "waybar" "rofi" "swww" "kitty" "nautilus" "network-manager-applet"
    "blueman" "pavucontrol" "wl-clipboard" "polkit-kde-agent" "nwg-look" "hyprlock"
    "grim" "slurp" "mpv" "firefox" "neofetch" "vim" "neovim" "curl" "git" "tmux"
    "stow" "wlogout" "swaync" "brightnessctl" "xdotool" "playerctl" "zsh" "lsd" "lazygit" "bat" "bluez" "bluez-utils"
)

# Array of AUR Packages
AUR_PKGS=("waypaper" "swww" "python-pywal16" "brave-bin")

# Function to install packages using pacman
install_with_pacman() {
    for pkg in "$@"; do
        if ! pacman -Qi "$pkg" &>/dev/null; then
            echo "→ Installing $pkg..."
            if sudo pacman -S --noconfirm --needed "$pkg"; then
                echo "✓ $pkg installed successfully!"
            else
                echo "! Failed to install $pkg"
            fi
        else
            echo "✓ $pkg is already installed."
        fi
    done
}

# Function to install AUR packages using yay
install_with_yay() {
    for pkg in "$@"; do
        if ! pacman -Qi "$pkg" &>/dev/null; then
            echo "→ Installing $pkg..."
            if yay -S --noconfirm "$pkg"; then
                echo "✓ $pkg installed successfully!"
            else
                echo "! Failed to install $pkg"
            fi
        else
            echo "✓ $pkg is already installed."
        fi
    done
}

# Update System
echo "🛠️ Updating system packages..."
sudo pacman -Syu --noconfirm

# Install Essential Packages
echo "🔨 Installing essential packages from official repositories..."
install_with_pacman "${ESSENTIAL_PKGS[@]}"

# Install AUR Packages
echo "📦 Installing AUR packages..."
install_with_yay "${AUR_PKGS[@]}"

# Completion Message
echo "========================================="
echo "       ✓ INSTALLATION COMPLETE ✓        "
echo "========================================="
