#!/bin/zsh
set -e  # Exit on any command failure

# Dotfiles directory
DOTFILES_DIR="$HOME/dotfiles"

# Function to install programs
install_programs() {
    echo "\n==================== 🚀 Installing Programs 🚀 ===================="

    # Define packages to install
    PROGRAMS=(
        "vim" "neovim" "curl" "git" "tmux" "stow"
        "zoxide" "bat" "lsd" "lazygit"
    )

    # Detect package manager
    if command -v apt &>/dev/null; then
        PM="apt"
    elif command -v pacman &>/dev/null; then
        PM="pacman"
    elif command -v dnf &>/dev/null; then
        PM="dnf"
    else
        echo "❌ Unsupported package manager."
        exit 1
    fi

    # Install packages
    for program in "${PROGRAMS[@]}"; do
        if ! command -v "$program" &>/dev/null; then
            echo "📦 Installing $program..."
            if ! sudo $PM install -y "$program"; then
                echo "❌ Failed to install $program."
            else
                echo "✅ $program installed."
            fi
        else
            echo "✅ $program already installed."
        fi
    done
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

# Main setup function
main() {
    echo "\n==================== ⚙️ Starting Setup ⚙️ ===================="

    if ! command -v sudo &>/dev/null; then
        echo "❌ 'sudo' not configured. Set up sudo before running this script."
        exit 1
    fi

    if ! ping -c 1 -q google.com &>/dev/null; then
        echo "❌ No internet connection."
        exit 1
    fi

    read "confirm?⚠️ Proceed with setup? (y/n): "
    if [[ "$confirm" != [yY] ]]; then
        echo "❌ Setup aborted."
        exit 1
    fi

    install_programs
    stow_dotfiles
}

# Run the main function
main

# Final message
echo "\n==================== 🎉 Setup Complete 🎉 ===================="
echo "Installation and stowing completed successfully."
echo "To apply changes, run: source ~/.zshrc"
