#!/usr/bin/env bash
nmcli -t d wifi rescan

# Get the wifi state
CONSTATE=$(nmcli -fields WIFI g)
if [[ "$CONSTATE" =~ "enabled" ]]; then
    TOGGLE="Disable WiFi 睊"
else
    TOGGLE="Enable WiFi 直"
fi

# Get more detailed list of available networks
NETWORKS=$(nmcli -f SSID,SECURITY,BARS device wifi list | sed '/^--/d' | sed 1d)

# Show networks in rofi
CHENTRY=$(echo -e "$TOGGLE\n$NETWORKS" | uniq -u | rofi -dmenu -selected-row 1)
[ -z "$CHENTRY" ] && exit

if [[ "$CHENTRY" = "Enable WiFi 直" ]]; then
    nmcli radio wifi on && notify-send "Wi-Fi" "Enabled"
    exit
elif [[ "$CHENTRY" = "Disable WiFi 睊" ]]; then
    nmcli radio wifi off && notify-send "Wi-Fi" "Disabled"
    exit
fi

# Extract just the SSID by removing everything after the first occurrence of "  "
SSID=$(echo "$CHENTRY" | sed 's/  .*//' | xargs)

# Check if the network has security
if echo "$CHENTRY" | grep -qiE '(WPA|WEP|802\.1X)'; then
    # Get password
    WIFIPASS=$(rofi -dmenu -password -p "Password for '$SSID'")
    if [ -z "$WIFIPASS" ]; then
        notify-send "Wi-Fi Error" "No password entered for secured network."
        exit 1
    fi
    
    # Create a temporary connection profile instead of direct connect
    CONN_NAME="$SSID-temp"
    
    # Remove any existing connection with the same name
    nmcli connection delete "$CONN_NAME" 2>/dev/null
    
    # Create a new connection with explicit security settings
    nmcli connection add \
        type wifi \
        con-name "$CONN_NAME" \
        ifname wlan0 \
        ssid "$SSID" \
        -- \
        wifi-sec.key-mgmt wpa-psk \
        wifi-sec.psk "$WIFIPASS" && \
    nmcli connection up "$CONN_NAME" && \
        notify-send "Wi-Fi" "Connected to '$SSID'" || \
        notify-send "Wi-Fi Error" "Failed to connect to '$SSID'"
else
    # Connect to open network
    nmcli device wifi connect "$SSID" && \
        notify-send "Wi-Fi" "Connected to '$SSID'" || \
        notify-send "Wi-Fi Error" "Failed to connect to '$SSID'"
fi
