#!/bin/bash
#  _  ____     ____  __  
# | |/ /\ \   / /  \/  | 
# | ' /  \ \ / /| |\/| | 
# | . \   \ V / | |  | | 
# |_|\_\   \_/  |_|  |_| 
#                        
#  
# by Stephan Raabe (2023) 
# ----------------------------------------------------- 

# ------------------------------------------------------
# Install Script for Libvirt
# ------------------------------------------------------

set -euo pipefail

read -r -p "Do you want to start? " s
if [[ "$s" != "y" && "$s" != "Y" ]]; then
  echo "Aborted"
  exit 0
fi

echo "START KVM/QEMU/VIRT MANAGER INSTALLATION..."

# ------------------------------------------------------
# Install Packages
# ------------------------------------------------------
sudo pacman -S --needed libvirt virt-manager virt-viewer qemu-base vde2 ebtables iptables-nft nftables dnsmasq edk2-ovmf swtpm

# ------------------------------------------------------
# Edit libvirtd.conf
# ------------------------------------------------------
LIBVIRT_DIR="/etc/libvirt"
LIBVIRTD_CONF="${LIBVIRT_DIR}/libvirtd.conf"
VIRTQEMUD_CONF="${LIBVIRT_DIR}/virtqemud.conf"

set_or_append_conf_line() {
  local file="$1"
  local key="$2"
  local value="$3"

  if sudo grep -Eq "^[[:space:]]*#?[[:space:]]*${key}[[:space:]]*=" "$file"; then
    sudo sed -i "s|^[[:space:]]*#\?[[:space:]]*${key}[[:space:]]*=.*|${key} = ${value}|" "$file"
  else
    printf '%s\n' "${key} = ${value}" | sudo tee -a "$file" >/dev/null
  fi
}

enable_and_start_unit_if_exists() {
  local unit="$1"

  if systemctl list-unit-files --all | grep -q "^${unit}[[:space:]]"; then
    sudo systemctl enable --now "$unit"
  else
    echo "Skipping missing unit: ${unit}"
  fi
}

echo "Configuring libvirt daemon config..."
sudo mkdir -p "$LIBVIRT_DIR"

DAEMON_CONF="$LIBVIRTD_CONF"
if [[ ! -f "$LIBVIRTD_CONF" && -f "$VIRTQEMUD_CONF" ]]; then
  DAEMON_CONF="$VIRTQEMUD_CONF"
fi

sudo touch "$DAEMON_CONF"
set_or_append_conf_line "$DAEMON_CONF" "unix_sock_group" '"libvirt"'
set_or_append_conf_line "$DAEMON_CONF" "unix_sock_rw_perms" '"0770"'
set_or_append_conf_line "$DAEMON_CONF" "log_filters" '"3:qemu 1:libvirt"'
set_or_append_conf_line "$DAEMON_CONF" "log_outputs" '"2:file:/var/log/libvirt/libvirtd.log"'

# ------------------------------------------------------
# Add user to the group
# ------------------------------------------------------
sudo usermod -a -G kvm,libvirt "$(whoami)"

# ------------------------------------------------------
# Enable services
# ------------------------------------------------------
if systemctl list-unit-files --type=service | grep -q '^libvirtd\.service'; then
  sudo systemctl enable --now libvirtd
else
  enable_and_start_unit_if_exists "virtqemud.service"
  enable_and_start_unit_if_exists "virtnetworkd.service"
  enable_and_start_unit_if_exists "virtstoraged.service"
  enable_and_start_unit_if_exists "virtsecretd.service"
  enable_and_start_unit_if_exists "virtinterfaced.service"
  enable_and_start_unit_if_exists "virtnodedevd.service"
  enable_and_start_unit_if_exists "virtlogd.service"
  enable_and_start_unit_if_exists "virtlockd.service"

  enable_and_start_unit_if_exists "virtqemud.socket"
  enable_and_start_unit_if_exists "virtnetworkd.socket"
  enable_and_start_unit_if_exists "virtstoraged.socket"
  enable_and_start_unit_if_exists "virtsecretd.socket"
  enable_and_start_unit_if_exists "virtinterfaced.socket"
  enable_and_start_unit_if_exists "virtnodedevd.socket"
  enable_and_start_unit_if_exists "virtlogd.socket"
  enable_and_start_unit_if_exists "virtlockd.socket"
fi

# ------------------------------------------------------
# Configure qemu.conf
# ------------------------------------------------------
QEMU_CONF="/etc/libvirt/qemu.conf"
CURRENT_USER="$(whoami)"

echo "Configuring ${QEMU_CONF}..."
sudo touch "$QEMU_CONF"
set_or_append_conf_line "$QEMU_CONF" "user" "\"${CURRENT_USER}\""
set_or_append_conf_line "$QEMU_CONF" "group" "\"${CURRENT_USER}\""

# ------------------------------------------------------
# Restart Services
# ------------------------------------------------------
if systemctl is-enabled libvirtd >/dev/null 2>&1; then
  sudo systemctl restart libvirtd
else
  enable_and_start_unit_if_exists "virtqemud.service"
  enable_and_start_unit_if_exists "virtnetworkd.service"
  enable_and_start_unit_if_exists "virtstoraged.service"
  enable_and_start_unit_if_exists "virtsecretd.service"
  enable_and_start_unit_if_exists "virtinterfaced.service"
  enable_and_start_unit_if_exists "virtnodedevd.service"
  enable_and_start_unit_if_exists "virtlogd.service"
  enable_and_start_unit_if_exists "virtlockd.service"
fi

# ------------------------------------------------------
# Autostart Network
# ------------------------------------------------------
if command -v virsh >/dev/null 2>&1; then
  sudo virsh net-autostart default || true
  sudo virsh net-start default || true
  sudo virsh pool-autostart default || true
  sudo virsh pool-start default || true
else
  echo "virsh not found; skipping default network autostart"
fi

echo "Please restart your system with reboot."
