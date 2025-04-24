#!/bin/bash

# Comprehensive Battery Monitoring Script

# Configuration
BATTERY_PATH="/sys/class/power_supply/BAT0"
LOW_BATTERY_THRESHOLD=20
CRITICAL_BATTERY_THRESHOLD=10
STATE_FILE="/tmp/battery_last_state"

# Function to send notification
send_notification() {
    local urgency="$1"
    local title="$2"
    local message="$3"
    /usr/bin/notify-send -u "$urgency" "$title" "$message"
}

# Function to get current battery percentage and status
get_battery_info() {
    local percentage=$(cat "$BATTERY_PATH/capacity")
    local status=$(cat "$BATTERY_PATH/status")
    echo "$percentage $status"
}

# Main monitoring logic
battery_info=$(get_battery_info)
read -r current_percentage current_status <<< "$battery_info"

# Check if last state file exists
if [[ ! -f "$STATE_FILE" ]]; then
    echo "$battery_info" > "$STATE_FILE"
    exit 0
fi

# Read previous state
read -r last_percentage last_status < "$STATE_FILE"

# Charging state notifications
if [[ "$current_status" != "$last_status" ]]; then
    case "$current_status" in
        "Charging")
            send_notification normal "Battery Charging" "Battery is now charging (${current_percentage}%)"
            ;;
        "Discharging")
            send_notification normal "Battery Discharging" "Battery is now discharging (${current_percentage}%)"
            ;;
        "Full")
            send_notification normal "Battery Fully Charged" "Your battery is now at 100%"
            ;;
    esac
fi

# Battery level notifications
if [[ "$current_status" == "Discharging" ]]; then
    if [[ $current_percentage -le $CRITICAL_BATTERY_THRESHOLD ]]; then
        send_notification critical "Critical Battery" "Battery is at ${current_percentage}%. Plug in your charger immediately!"
    elif [[ $current_percentage -le $LOW_BATTERY_THRESHOLD ]]; then
        send_notification normal "Low Battery" "Battery is at ${current_percentage}%. Please plug in your charger soon."
    fi
fi

# Update state file
echo "$battery_info" > "$STATE_FILE"
