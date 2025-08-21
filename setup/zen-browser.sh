#!/bin/bash

# Variables
APP_NAME="zen-browser"
APP_DIR="$HOME/.local/opt/$APP_NAME"
BIN_NAME="zen"
DESKTOP_FILE="$HOME/.local/share/applications/$APP_NAME.desktop"

# Download and extract
mkdir -p "$APP_DIR"
curl -L -o "$APP_DIR/zen.linux-x86_64.tar.xz" https://github.com/zen-browser/desktop/releases/latest/download/zen.linux-x86_64.tar.xz
tar -xvf "$APP_DIR/zen.linux-x86_64.tar.xz" -C "$APP_DIR" --strip-components=1
rm "$APP_DIR/zen.linux-x86_64.tar.xz"

# Symlink binary into ~/.local/bin (make sure this is in your PATH)
mkdir -p "$HOME/.local/bin"
ln -sf "$APP_DIR/zen" "$HOME/.local/bin/$BIN_NAME"

# Create desktop entry
mkdir -p "$(dirname "$DESKTOP_FILE")"
cat > "$DESKTOP_FILE" <<EOF
[Desktop Entry]
Name=Zen Browser
Exec=$APP_DIR/zen
Icon=$APP_DIR/browser/chrome/icons/default/default128.png
Type=Application
Categories=Network;WebBrowser;
EOF

