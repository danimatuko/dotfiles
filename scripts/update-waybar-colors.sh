#!/bin/bash

# Create a symlink from the cache to Waybar's config directory
ln -sf "$HOME/.cache/wal/colors-waybar.css" "$HOME/.config/waybar/colors-waybar.css"
