#!/bin/bash

set -euo pipefail

light_theme="Adwaita"
dark_theme="Adwaita-dark"
icon_theme="Adwaita"

mode="${1:-toggle}"

if [[ "$mode" == "status" ]]; then
	current_scheme=$(gsettings get org.gnome.desktop.interface color-scheme | tr -d "'")
	if [[ "$current_scheme" == "prefer-dark" ]]; then
		echo "on"
	else
		echo "off"
	fi
	exit 0
fi

current_theme=$(gsettings get org.gnome.desktop.interface gtk-theme | tr -d "'")

if [[ "$current_theme" == "$dark_theme" ]]; then
	gsettings set org.gnome.desktop.interface gtk-theme "$light_theme"
	gsettings set org.gnome.desktop.interface icon-theme "$icon_theme"
	gsettings set org.gnome.desktop.interface color-scheme "default"
	notify-send --icon="weather-clear" "Theme Changed" "Switched to Light Mode (${light_theme})"
else
	gsettings set org.gnome.desktop.interface gtk-theme "$dark_theme"
	gsettings set org.gnome.desktop.interface icon-theme "$icon_theme"
	gsettings set org.gnome.desktop.interface color-scheme "prefer-dark"
	notify-send --icon="weather-clear-night" "Theme Changed" "Switched to Dark Mode (${dark_theme})"
fi
