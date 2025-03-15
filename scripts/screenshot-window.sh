#!/bin/bash
# Script to take a screenshot of the active window, copy it to clipboard, and send a notification

# Generate a unique filename with timestamp
FILENAME=~/Pictures/Screenshots/screenshot_$(date +'%Y-%m-%d_%H-%M-%S').png

# Take screenshot of active window
# - hyprctl activewindow -j: Get JSON info about active window
# - jq -r: Extract position and size from JSON
# - tr and xargs: Format these values into the format grim expects
grim -g "$(hyprctl activewindow -j | jq -r '.at[0], .at[1], .size[0], .size[1]' | tr '\n' ' ' | xargs printf '%d,%d %dx%d')" $FILENAME

# Copy the screenshot to clipboard
wl-copy < $FILENAME

# Send notification with dunst
# -a: Set application name
# -i: Set notification icon (using the screenshot itself)
# -u: Set urgency level
notify-send -a "Screenshot" -i $FILENAME -u normal "Window Screenshot" "Saved to ~/Pictures/Screenshots\nCopied to clipboard"
