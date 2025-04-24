#!/bin/bash

# Get list of available updates
updates=$(checkupdates)
count=$(echo "$updates" | wc -l)

# Send a minimal notification with a standard icon
if [[ -n "$updates" ]]; then
    notify-send --icon=system-software-update "$count Pacman update(s) available"
fi
