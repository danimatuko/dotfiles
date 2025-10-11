#!/bin/bash

# Walker Launcher Installation Script - Stable Version Only
# Downloads, builds, and installs Walker v0.13.26 with PATH setup

set -e  # Exit on any error

# Configuration
WALKER_VERSION="v0.13.26"
WALKER_REPO="https://github.com/abenz1267/walker.git"
INSTALL_DIR="$HOME/.local/bin"
BUILD_DIR="/tmp/walker-build-$$"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }

# Check dependencies
if ! command -v git &> /dev/null; then
    echo "Error: git not found. Install with: sudo pacman -S git"
    exit 1
fi

if ! command -v go &> /dev/null; then
    echo "Error: go not found. Install with: sudo pacman -S go"
    exit 1
fi

# Create install directory
mkdir -p "$INSTALL_DIR"

log_info "Cloning Walker repository..."
git clone "$WALKER_REPO" "$BUILD_DIR"
cd "$BUILD_DIR"

log_info "Checking out stable version $WALKER_VERSION..."
git checkout "$WALKER_VERSION"

log_info "Building Walker..."
go build -o walker ./cmd/walker.go

log_info "Installing Walker..."
cp walker "$INSTALL_DIR/walker"
chmod +x "$INSTALL_DIR/walker"

# Check if already in PATH
if [[ ":$PATH:" == *":$INSTALL_DIR:"* ]]; then
    log_success "$INSTALL_DIR is already in your PATH"
else
    log_info "$INSTALL_DIR not in PATH - you may need to add it manually"
fi

# Cleanup
rm -rf "$BUILD_DIR"

log_success "Walker v0.13.26 installed successfully!"
