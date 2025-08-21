#!/bin/bash

# Modular Bash config
CONFIG_DIR="${BASH_CONFIG_HOME:-$HOME/dotfiles/config/bash}"

source "$CONFIG_DIR/env.sh"
source "$CONFIG_DIR/history.sh"
source "$CONFIG_DIR/prompt.sh"
source "$CONFIG_DIR/tools.sh"
source "$CONFIG_DIR/aliases.sh"
source "$CONFIG_DIR/functions.sh"
source "$CONFIG_DIR/functions.sh"
source "$CONFIG_DIR/keybindings.sh"
source "$CONFIG_DIR/inputrc.sh" 
