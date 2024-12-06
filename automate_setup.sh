#!/bin/zsh
set -e  # Exit on any command failure

# List of programs to install
PROGRAMS=(
  "vim"     # VIM text editor
  "neovim"  # Enhanced text editor
  "kitty"   # Terminal emulator
  "curl"    # Command-line tool for data transfer
  "tmux"    # Terminal multiplexer
  "lsd"     # Enhanced ls
  "bat"     # Enhanced cat with syntax highlighting
  "zoxide"  # For `z` directory navigation
)

# Dotfiles directory
DOTFILES_DIR="$HOME/dotfiles"

# Function to detect the package manager
detect_package_manager() {
    echo "🔍 Detecting package manager..."
    if command -v apt &>/dev/null; then
        echo "✅ Package manager detected: apt (Debian-based system)"
        echo "apt"
    elif command -v dnf &>/dev/null; then
        echo "✅ Package manager detected: dnf (Fedora/RHEL-based system)"
        echo "dnf"
    else
        echo "❌ Error: Unsupported package manager!"
        exit 1
    fi
}

# Function to install programs using the detected package manager
install_programs() {
    echo "🚀 Starting program installation..."

    # Detect the package manager
    local package_manager
    package_manager=$(detect_package_manager)
    echo "🛠 Using package manager: $package_manager"

    # Update package lists
    echo "🔄 Updating package lists..."
    if [ "$package_manager" = "apt" ]; then
        sudo apt update -y
    elif [ "$package_manager" = "dnf" ]; then
        sudo dnf makecache -y
    fi

    # Install programs
    echo "📦 Installing programs..."
    for program in "${PROGRAMS[@]}"; do
        echo "➡️ Installing: $program"
        if [ "$package_manager" = "apt" ]; then
            sudo apt install -y "$program" || { echo "❌ Failed to install $program"; exit 1; }
        elif [ "$package_manager" = "dnf" ]; then
            sudo dnf install -y "$program" || { echo "❌ Failed to install $program"; exit 1; }
        fi
    done

    echo "✅ Program installation complete!"
}

# Function to stow dotfiles
stow_dotfiles() {
    echo "🔧 Stowing dotfiles..."
    if [ ! -d "$DOTFILES_DIR" ]; then
        echo "❌ Error: $DOTFILES_DIR does not exist!"
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

# Function to set up Zsh environment
setup_env() {
    echo "⚙️ Setting up Zsh environment variables..."
    local zshrc="$HOME/.zshrc"

    # Add environment variables only if not already present
    grep -qxF 'export PATH="$HOME/.local/bin:$PATH"' "$zshrc" || echo 'export PATH="$HOME/.local/bin:$PATH"' >> "$zshrc"
    grep -qxF 'export EDITOR="nvim"' "$zshrc" || echo 'export EDITOR="nvim"' >> "$zshrc"

    echo "🌐 Applying environment variables..."
    source "$zshrc"

    echo "✅ Zsh environment setup complete!"
}

# Main setup function
main() {
    echo "🚀 Starting the setup process..."
    read "confirm?⚠️ This will make changes to your system. Continue? (y/n): "
    if [[ "$confirm" != [yY] ]]; then
        echo "❌ Setup aborted by user."
        exit 1
    fi

    install_programs
    stow_dotfiles
    setup_env
    echo "🎉 Setup complete!"
}

# Run the main function
main
