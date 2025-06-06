#!/bin/bash

SSID=$(nmcli -t -f active,ssid dev wifi | grep '^yes' | cut -d: -f2)
SIGNAL=$(nmcli -t -f active,signal dev wifi | grep '^yes' | cut -d: -f2)

if [ -z "$SSID" ]; then
    echo '{"text": "Disconnected", "class": "wifi-off"}'
else
    echo "{\"text\": \"$SSID ($SIGNAL%)\", \"class\": \"wifi-on\"}"
fi

