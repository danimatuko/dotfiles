#!/bin/bash

# Battery monitoring script for Arch Linux

BATTERY_PATH="/sys/class/power_supply/BAT0"  # Adjust if your battery has a different name
LOW_BATTERY_THRESHOLD=20  # Percentage at which to send low battery warning
CRITICAL_BATTERY_THRESHOLD=10  # Percentage at which to send critical battery warning

# Get battery status
battery_percentage=$(cat "$BATTERY_PATH/capacity")
battery_status=$(cat "$BATTERY_PATH/status")

# Low battery notification
if [[ $battery_percentage -le $LOW_BATTERY_THRESHOLD ]] && [[ "$battery_status" == "Discharging" ]]; then
    notify-send -u normal "Low Battery" "Battery is at ${battery_percentage}%. Please plug in your charger soon."
fi

# Critical battery notification
if [[ $battery_percentage -le $CRITICAL_BATTERY_THRESHOLD ]] && [[ "$battery_status" == "Discharging" ]]; then
    notify-send -u critical "Critical Battery" "Battery is at ${battery_percentage}%. Plug in your charger immediately!"
fi
