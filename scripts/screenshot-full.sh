#!/bin/bash
# Script to take a fullscreen screenshot, copy it to clipboard, and send a notification

# Generate a unique filename with timestamp
FILENAME=~/Pictures/Screenshots/screenshot_$(date +'%Y-%m-%d_%H-%M-%S').png

# Take fullscreen screenshot with grim
grim $FILENAME

# Copy the screenshot to clipboard
wl-copy < $FILENAME

# Send notification with dunst
# -a: Set application name
# -i: Set notification icon (using the screenshot itself)
# -u: Set urgency level
notify-send -a "Screenshot" -i $FILENAME -u normal "Fullscreen Screenshot" "Saved to ~/Pictures/Screenshots\nCopied to clipboard"
