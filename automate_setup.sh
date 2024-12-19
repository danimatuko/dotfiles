#!/bin/zsh
set -e  # Exit on any command failure

# Dotfiles directory
DOTFILES_DIR="$HOME/dotfiles"

# Function to install programs
install_programs() {
    echo "\n==================== 🚀 Installing Programs 🚀 ===================="
    
    # Define packages to install
    # Note: Using Arch package names (may differ slightly from other distros)
    PROGRAMS=(
        "vim" "neovim" "curl" "git" "tmux" "stow"
        "zoxide" "bat" "lsd" "lazygit"
    )
    
    # Ensure we're using the correct package manager
    if ! command -v pacman &>/dev/null; then
        echo "❌ This script is designed for Arch Linux with pacman."
        exit 1
    fi
    
    # Update package database first
    echo "🔄 Updating package database..."
    sudo pacman -Sy --noconfirm
    
    # Install packages
    for program in "${PROGRAMS[@]}"; do
        if ! command -v "$program" &>/dev/null; then
            echo "📦 Installing $program..."
            if ! sudo pacman -S --noconfirm "$program"; then
                echo "❌ Failed to install $program."
            else
                echo "✅ $program installed."
            fi
        else
            echo "✅ $program already installed."
        fi
    done
    
    # Optional: Install AUR helper (yay) if not present
    if ! command -v yay &>/dev/null; then
        echo "🚧 Installing yay AUR helper..."
        # Install dependencies for yay
        sudo pacman -S --noconfirm base-devel git
        
        # Clone and install yay
        git clone https://aur.archlinux.org/yay.git /tmp/yay
        cd /tmp/yay
        makepkg -si --noconfirm
        cd - || exit
        
        # Clean up
        rm -rf /tmp/yay
    fi
}

# Function to stow dotfiles
stow_dotfiles() {
    echo "\n==================== 🔧 Stowing Dotfiles 🔧 ===================="
    
    if [ ! -d "$DOTFILES_DIR" ]; then
        echo "❌ Dotfiles directory not found!"
        exit 1
    fi
    
    cd "$DOTFILES_DIR"
    
    for dir in */; do
        if [ -d "$dir" ]; then
            echo "📁 Stowing $dir..."
            stow -v -R "$dir" || { echo "❌ Error stowing $dir"; exit 1; }
        fi
    done
    
    echo "✅ Dotfiles stowed."
}

# Function to install Arch-specific utilities
install_arch_extras() {
    echo "\n==================== 🌟 Installing Arch Extras 🌟 ===================="
    
    # Install some Arch-specific or recommended utilities
    ARCH_EXTRAS=(
        "archlinux-keyring"  # Ensure up-to-date Arch keyring
        "pacman-contrib"     # Additional pacman utilities
        "reflector"          # Mirror list management
    )
    
    for extra in "${ARCH_EXTRAS[@]}"; do
        echo "📦 Installing $extra..."
        sudo pacman -S --noconfirm "$extra"
    done
    
    # Optional: Set up reflector to update mirror list
    sudo systemctl enable reflector.service
    sudo systemctl start reflector.service
}

# Main setup function
main() {
    echo "\n==================== ⚙️ Starting Arch Linux Setup ⚙️ ===================="
    
    # Check for sudo
    if ! command -v sudo &>/dev/null; then
        echo "❌ 'sudo' not configured. Set up sudo before running this script."
        exit 1
    fi
    
    # Check internet connection
    if ! ping -c 1 -q google.com &>/dev/null; then
        echo "❌ No internet connection."
        exit 1
    fi
    
    # Confirmation prompt
    read "confirm?⚠️ Proceed with Arch Linux setup? (y/n): "
    if [[ "$confirm" != [yY] ]]; then
        echo "❌ Setup aborted."
        exit 1
    fi
    
    # Run setup functions
    install_programs
    install_arch_extras
    stow_dotfiles
}

# Run the main function
main

# Final message
echo "\n==================== 🎉 Arch Linux Setup Complete 🎉 ===================="
echo "Installation and stowing completed successfully."
echo "To apply changes, run: source ~/.zshrc"
