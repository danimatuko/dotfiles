#!/bin/bash
set -e

echo "[INFO] Installing CLI and Hyprland tools via yay..."

yay -S --noconfirm --needed \
	git \
	eza \
	fd \
	opencode \
	fzf \
	ripgrep \
	bat \
	zoxide \
	tmux \
	zellij \
	vim \
	nvim \
	lazygit \
	wget \
	curl \
	man \
	less \
	whois \
	unzip \
	inetutils \
	bash-completion \
	plocate \
	fastfetch \
	wl-clipboard \
	kitty \
	alacritty \
	ghostty \
	waybar \
	swaync \
	rofi \
	wlogout \
	pavucontrol \
	pipewire \
	wireplumber \
	network-manager-applet \
	networkmanager \
	nm-connection-editor \
	blueman \
	bluez \
	bluez-utils \
	bluetui \
	wlogout \
	swayosd \
	impala \
	awww \
	zip \
	libnotify \
	nautilus \
	brightnessctl \
	hyprlock \
	btop \
	spf \
	adwaita-icon-theme \
	gnome-themes-extra \
	hyprsunset \
	wiremix \
	tar \
	hyprshot \
	satty \
	hypridle \
	hyprdynamicmonitors-bin

echo "[OK] Terminal packages installed successfully."
