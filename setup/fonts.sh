#!/bin/bash
# install/fonts.sh - Installs system and user fonts

set -e

echo "[INFO] Installing system fonts with yay..."

yay -Sy --noconfirm --needed \
	ttf-font-awesome \
	ttf-liberation \
	ttf-iosevka \
	noto-fonts \
	noto-fonts-emoji \
	noto-fonts-cjk \
	noto-fonts-extra

mkdir -p ~/.local/share/fonts

# CaskaydiaMono Nerd Font
if ! fc-list | grep -qi "CaskaydiaMono Nerd Font"; then
	echo "[INFO] Installing CaskaydiaMono Nerd Font..."
	cd /tmp
	wget https://github.com/ryanoasis/nerd-fonts/releases/latest/download/CascadiaMono.zip
	unzip -o CascadiaMono.zip -d CascadiaFont
	cp CascadiaFont/*.ttf ~/.local/share/fonts/
	rm -rf CascadiaMono.zip CascadiaFont
	fc-cache
	cd -
else
	echo "[OK] CaskaydiaMono Nerd Font already installed."
fi

# CaskaydiaCove Nerd Font Propo
if ! fc-list | grep -qi "CaskaydiaCove Nerd Font Propo"; then
	echo "[INFO] Installing CaskaydiaCove Nerd Font Propo..."
	cd /tmp
	wget https://github.com/ryanoasis/nerd-fonts/releases/latest/download/CascadiaCode.zip
	unzip -o CascadiaCode.zip -d CascadiaCodeFont
	cp CascadiaCodeFont/*.ttf ~/.local/share/fonts/
	rm -rf CascadiaCode.zip CascadiaCodeFont
	fc-cache
	cd -
else
	echo "[OK] CaskaydiaCove Nerd Font Propo already installed."
fi

# JetBrainsMono Nerd Font
if ! fc-list | grep -qi "JetBrainsMono Nerd Font"; then
	echo "[INFO] Installing JetBrainsMono Nerd Font..."
	cd /tmp
	wget https://github.com/ryanoasis/nerd-fonts/releases/latest/download/JetBrainsMono.zip
	unzip -o JetBrainsMono.zip -d JetBrainsMonoFont
	cp JetBrainsMonoFont/*.ttf ~/.local/share/fonts/
	rm -rf JetBrainsMono.zip JetBrainsMonoFont
	fc-cache
	cd -
else
	echo "[OK] JetBrainsMono Nerd Font already installed."
fi

# GeistMono Nerd Font
if ! fc-list | grep -qi "GeistMono Nerd Font"; then
	echo "[INFO] Installing GeistMono Nerd Font..."
	cd /tmp
	wget https://github.com/ryanoasis/nerd-fonts/releases/latest/download/GeistMono.zip
	unzip -o GeistMono.zip -d GeistMonoFont
	shopt -s nullglob
	geist_fonts=(GeistMonoFont/*.ttf GeistMonoFont/*.otf)
	if (( ${#geist_fonts[@]} > 0 )); then
		cp "${geist_fonts[@]}" ~/.local/share/fonts/
	else
		echo "[WARN] No GeistMono font files found in archive. Skipping copy."
	fi
	shopt -u nullglob
	rm -rf GeistMono.zip GeistMonoFont
	fc-cache
	cd -
else
	echo "[OK] GeistMono Nerd Font already installed."
fi

# iA Writer Mono S
if ! fc-list | grep -qi "iA Writer Mono S"; then
	echo "[INFO] Installing iA Writer Mono S..."
	cd /tmp
	wget -O iafonts.zip https://github.com/iaolo/iA-Fonts/archive/refs/heads/master.zip
	unzip -o iafonts.zip -d iaFonts
	cp iaFonts/iA-Fonts-master/iA\ Writer\ Mono/Static/iAWriterMonoS-*.ttf ~/.local/share/fonts/
	rm -rf iafonts.zip iaFonts
	fc-cache
	cd -
else
	echo "[OK] iA Writer Mono S already installed."
fi

if ! fc-list | grep -qi "SF Pro Text"; then
	echo "[INFO] SF Pro Text is not installed (optional proprietary font)."
fi

echo "[OK] Fonts installation complete."
