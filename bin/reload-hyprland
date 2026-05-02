#!/bin/bash

if hyprctl reload >/dev/null 2>&1; then
	notify-send --icon=view-refresh --app-name=Hyprland "Hyprland" "Reload complete"
	canberra-gtk-play -i message >/dev/null 2>&1 &
else
	notify-send --icon=dialog-error --app-name=Hyprland "Hyprland" "Reload failed"
	canberra-gtk-play -i bell >/dev/null 2>&1 &
fi
