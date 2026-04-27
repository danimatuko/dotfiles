#!/bin/bash

set -e

MAIN_UNIT="hyprdynamicmonitors.service"
PREPARE_UNIT="hyprdynamicmonitors-prepare.service"

warn_and_continue() {
	echo "[WARN] $1"
	echo "[INFO] You can run this manually after login:"
	echo "   systemctl --user disable --now $MAIN_UNIT $PREPARE_UNIT"
	echo "   systemctl --user daemon-reload"
}

finish() {
	return "$1" 2>/dev/null || exit "$1"
}

if ! command -v systemctl >/dev/null 2>&1; then
	warn_and_continue "systemctl is not available in this environment."
	finish 0
fi

if ! systemctl --user disable --now "$MAIN_UNIT" "$PREPARE_UNIT"; then
	warn_and_continue "Could not disable/stop HyprDynamicMonitors user services."
	finish 0
fi

if ! systemctl --user daemon-reload; then
	warn_and_continue "Could not reload user systemd daemon in this session."
	finish 0
fi

echo "[OK] HyprDynamicMonitors services disabled."
finish 0
