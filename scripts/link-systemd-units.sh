#!/bin/bash

# ------------------------------------------------------------------------------
# link-systemd-units.sh
#
# Symlinks all .service and .timer files from:
#   - $SERVICES_DIR → $SYSTEMD_USER_DIR
#   - $TIMERS_DIR   → $SYSTEMD_USER_DIR
#
# Then reloads the systemd user daemon and enables + starts all linked units.
# Use this to quickly sync and activate systemd units on a new machine.
# ------------------------------------------------------------------------------

DOTFILES_DIR="$HOME/dotfiles"
SYSTEMD_USER_DIR="$HOME/.config/systemd/user"
SERVICES_DIR="$DOTFILES_DIR/scripts/services"
TIMERS_DIR="$DOTFILES_DIR/scripts/timers"

mkdir -p "$SYSTEMD_USER_DIR"

echo "🔗 Linking and enabling service units..."
for service in "$SERVICES_DIR"/*.service; do
  [ -e "$service" ] || continue
  unit_name=$(basename "$service")
  ln -sf "$service" "$SYSTEMD_USER_DIR/$unit_name"
  echo "✅ Linked $unit_name"
  systemctl --user enable --now "$unit_name"
done

echo "🔗 Linking and enabling timer units..."
for timer in "$TIMERS_DIR"/*.timer; do
  [ -e "$timer" ] || continue
  unit_name=$(basename "$timer")
  ln -sf "$timer" "$SYSTEMD_USER_DIR/$unit_name"
  echo "✅ Linked $unit_name"
  systemctl --user enable --now "$unit_name"
done

echo "🔄 Reloading systemd user daemon..."
systemctl --user daemon-reexec
systemctl --user daemon-reload

echo "🟢 All units linked, enabled, and started!"

