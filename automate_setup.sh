#!/bin/zsh
set -e  # Exit on any command failure

# Dotfiles directory
DOTFILES_DIR="$HOME/dotfiles"

# Function to install programs
install_programs() {
    echo "🚀 Starting program installation..."

    # Define packages to install
    PROGRAMS=("vim" "neovim" "curl" "git" "tmux" "stow")

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
            sudo $PM install -y "$program"
        else
            echo "✅ $program is already installed."
        fi
    done

    echo "✅ Program installation complete!"
}

# Function to stow dotfiles
stow_dotfiles() {
    echo "🔧 Stowing dotfiles..."
    if [ ! -d "$DOTFILES_DIR" ]; then
        echo "❌ Error: $DOTFILES_DIR does not exist!"
        echo "👉 Please ensure your dotfiles are available at $DOTFILES_DIR."
        exit 1
    fi

    cd "$DOTFILES_DIR"
    for dir in */; do
        if [ -d "$dir" ]; then
            echo "📁 Stowing $dir..."
            stow -v -R "$dir" || { echo "❌ Error stowing $dir"; exit 1; }
        fi
    done
    echo "✅ Dotfiles stowing complete!"
}

# Main setup function
main() {
    echo "🚀 Starting the setup process..."
    
    if ! command -v sudo &>/dev/null; then
        echo "❌ 'sudo' is not installed or configured. Please set up 'sudo' before running this script."
        exit 1
    fi

    if ! ping -c 1 -q google.com &>/dev/null; then
        echo "❌ No internet connection. Please connect to the internet and try again."
        exit 1
    fi

    read "confirm?⚠️ This will make changes to your system. Continue? (y/n): "
    if [[ "$confirm" != [yY] ]]; then
        echo "❌ Setup aborted by user."
        exit 1
    fi

    install_programs
    stow_dotfiles
    echo "🎉 Setup complete!"
}

# Run the main function
main
