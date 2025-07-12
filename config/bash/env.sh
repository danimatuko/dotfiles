#!/bin/bash

export ANDROID_HOME="$HOME/Android/Sdk"
export PATH="$PATH:$ANDROID_HOME/emulator:$ANDROID_HOME/platform-tools:$HOME/bin:$HOME/.local/bin:/usr/local/bin"
export EDITOR="nvim"
export SUDO_EDITOR="$EDITOR"
export NVM_DIR="${XDG_CONFIG_HOME:-$HOME/.config}/nvm"
[ -s "$NVM_DIR/nvm.sh" ] && source "$NVM_DIR/nvm.sh"

