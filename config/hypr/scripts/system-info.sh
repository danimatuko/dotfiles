#!/bin/bash

uptime=$(uptime -p | cut -d " " -f2-)
cpu=$(top -bn1 | grep "Cpu(s)" | awk '{print $2 + $4"%"}')
mem=$(free -h | awk '/Mem:/ {print $3 "/" $2}')
battery=$(cat /sys/class/power_supply/BAT*/capacity 2>/dev/null | head -n1)
date=$(date "+%A, %d %B %Y")

echo -e "Uptime: $uptime | CPU: $cpu | RAM: $mem | Battery: ${battery:-n/a}% | $date"

