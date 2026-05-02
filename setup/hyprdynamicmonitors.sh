#!/bin/bash

set -e

UNIT_DIR="$HOME/.config/systemd/user"
MAIN_UNIT="hyprdynamicmonitors.service"
PREPARE_UNIT="hyprdynamicmonitors-prepare.service"

warn_and_continue() {
	echo "[WARN] $1"
	echo "[INFO] You can run this manually after login:"
	echo "   systemctl --user daemon-reload"
	echo "   systemctl --user enable --now $PREPARE_UNIT $MAIN_UNIT"
	echo "   systemctl --user status $MAIN_UNIT"
}

finish() {
	return "$1" 2>/dev/null || exit "$1"
}

if [[ ! -L "$UNIT_DIR/$MAIN_UNIT" && ! -f "$UNIT_DIR/$MAIN_UNIT" ]]; then
	warn_and_continue "Missing $UNIT_DIR/$MAIN_UNIT (link configs first)."
	finish 0
fi

if [[ ! -L "$UNIT_DIR/$PREPARE_UNIT" && ! -f "$UNIT_DIR/$PREPARE_UNIT" ]]; then
	warn_and_continue "Missing $UNIT_DIR/$PREPARE_UNIT (link configs first)."
	finish 0
fi

if ! systemctl --user daemon-reload; then
	warn_and_continue "Could not reload user systemd daemon in this session."
	finish 0
fi

if ! systemctl --user enable --now "$PREPARE_UNIT" "$MAIN_UNIT"; then
	warn_and_continue "Could not enable/start HyprDynamicMonitors user services."
	finish 0
fi

echo "[OK] HyprDynamicMonitors services enabled."
systemctl --user is-enabled "$PREPARE_UNIT" "$MAIN_UNIT" || true
systemctl --user is-active "$MAIN_UNIT" || true
finish 0
