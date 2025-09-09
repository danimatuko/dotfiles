#!/bin/bash
set -euo pipefail

INSTALL_DIR="/opt/floorp"
BIN_PATH="/usr/local/bin/floorp"
ASSET="floorp-linux-amd64.tar.xz"

echo "[*] Fetching the latest Floorp release URL..."
DOWNLOAD_URL=$(curl -s https://api.github.com/repos/Floorp-Projects/Floorp/releases/latest \
    | grep -oP '"browser_download_url":\s*"\K[^"]+' \
    | grep "$ASSET" \
    | head -n1)

if [[ -z "$DOWNLOAD_URL" ]]; then
    echo "[!] Could not find download URL for $ASSET"
    exit 1
fi

ARCHIVE_NAME=$(basename "$DOWNLOAD_URL")
echo "[*] Downloading $ARCHIVE_NAME ..."
wget -O "/tmp/$ARCHIVE_NAME" "$DOWNLOAD_URL"

echo "[*] Installing Floorp into $INSTALL_DIR ..."
sudo rm -rf "$INSTALL_DIR"
sudo mkdir -p "$INSTALL_DIR"
sudo tar -xJf "/tmp/$ARCHIVE_NAME" -C "$INSTALL_DIR" --strip-components=1

echo "[*] Creating symlink at $BIN_PATH ..."
sudo ln -sf "$INSTALL_DIR/floorp" "$BIN_PATH"

DESKTOP_FILE="/usr/share/applications/floorp.desktop"
echo "[*] Writing desktop entry..."
sudo tee "$DESKTOP_FILE" >/dev/null <<EOF
[Desktop Entry]
Name=Floorp
Exec=$BIN_PATH %u
Terminal=false
Type=Application
Icon=$INSTALL_DIR/browser/chrome/icons/default/default128.png
Categories=Network;WebBrowser;
MimeType=text/html;text/xml;application/xhtml+xml;x-scheme-handler/http;x-scheme-handler/https;
StartupNotify=true
StartupWMClass=floorp
EOF

echo "[*] Updating desktop database..."
sudo update-desktop-database

echo "[*] Cleaning up temporary files..."
rm -f "/tmp/$ARCHIVE_NAME"

echo "[✓] Floorp installed successfully!"
echo "[*] You can now run 'floorp' from the command line or find it in your applications menu."
