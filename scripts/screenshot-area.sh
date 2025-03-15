#!/bin/bash
# Script to take a screenshot of a selected area, copy it to clipboard, and send a notification

# Generate a unique filename with timestamp
FILENAME=~/Pictures/Screenshots/screenshot_$(date +'%Y-%m-%d_%H-%M-%S').png

# Take screenshot of selected area using slurp to create a selection
# slurp lets the user select an area with the mouse
grim -g "$(slurp)" $FILENAME

# Copy the screenshot to clipboard
wl-copy < $FILENAME

# Send notification with dunst
# -a: Set application name
# -i: Set notification icon (using the screenshot itself)
# -u: Set urgency level
notify-send -a "Screenshot" -i $FILENAME -u normal "Area Screenshot" "Saved to ~/Pictures/Screenshots\nCopied to clipboard"
