#!/bin/bash

if hyprctl reload >/dev/null 2>&1; then
	notify-send --icon=view-refresh --app-name=Hyprland "Hyprland" "Reload complete"
else
	notify-send --icon=dialog-error --app-name=Hyprland "Hyprland" "Reload failed"
fi
