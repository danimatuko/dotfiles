#!/bin/bash

# Ensure NetworkManager is the only active network stack.
sudo systemctl enable --now NetworkManager.service

# Disable conflicting network managers/services.
sudo systemctl disable --now iwd.service
sudo systemctl disable --now systemd-networkd.service
sudo systemctl disable --now systemd-networkd-wait-online.service
sudo systemctl mask systemd-networkd-wait-online.service
sudo systemctl disable --now wpa_supplicant.service
sudo systemctl disable --now dhcpcd.service
