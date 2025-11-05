#!/bin/bash
# Centralized sound definitions for scripts

SOUND_DIR="${XDG_DATA_HOME:-$HOME/.local/share}/sounds"

export SOUND_UPDATE="$SOUND_DIR/update.wav"          # Theme/system update
export SOUND_ERROR="$SOUND_DIR/error.wav"            # Error alert
export SOUND_LOGOUT="$SOUND_DIR/poweroff.mp3"        # Logout/shutdown
export SOUND_SYSTEM="$SOUND_DIR/system-startup.wav"  # Startup
export SOUND_CAPTURE="$SOUND_DIR/screen-capture.oga" # Screenshot

