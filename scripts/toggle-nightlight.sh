#!/bin/bash

set -euo pipefail

# XDG_RUNTIME_DIR is the per-user runtime directory (e.g. /run/user/1000). Falls back to /tmp if unset.
state_file="${XDG_RUNTIME_DIR:-/tmp}/night-light.state"
temperature="${NIGHT_LIGHT_TEMPERATURE:-4500}"

mode="${1:-toggle}"

if [[ "$mode" == "status" ]]; then
	if [[ -f "$state_file" ]] && [[ "$(<"$state_file")" == "on" ]]; then
		echo "on"
	else
		echo "off"
	fi
	exit 0
fi

if [[ -f "$state_file" ]] && [[ "$(<"$state_file")" == "on" ]]; then
	hyprctl hyprsunset identity >/dev/null
	printf "off\n" >"$state_file"
else
	hyprctl hyprsunset temperature "$temperature" >/dev/null
	printf "on\n" >"$state_file"
fi
