# ~/.bashrc - Adapted from Zsh config

# --------------------------------------
# Interactive Shell Check
# --------------------------------------
[[ $- != *i* ]] && return

# --------------------------------------
# PATH Configuration
# --------------------------------------
export ANDROID_HOME="$HOME/Android/Sdk"
export PATH="$PATH:$ANDROID_HOME/emulator:$ANDROID_HOME/platform-tools"
export PATH="$HOME/bin:$HOME/.local/bin:/usr/local/bin:$PATH"
export EDITOR="nvim"
export SUDO_EDITOR="$EDITOR"

# --------------------------------------
# Node Version Manager (nvm)
# --------------------------------------
export NVM_DIR="${XDG_CONFIG_HOME:-$HOME/.config}/nvm"
[ -s "$NVM_DIR/nvm.sh" ] && source "$NVM_DIR/nvm.sh"

# --------------------------------------
# Prompt with Starship
# --------------------------------------
if command -v starship >/dev/null 2>&1; then
  eval "$(starship init bash)"
else
  PS1='\u@\h:\w\$ '
fi

# --------------------------------------
# Zoxide Init
# --------------------------------------
if command -v zoxide >/dev/null 2>&1; then
  eval "$(zoxide init bash)"
  alias cd='z'
fi

# --------------------------------------
# Aliases
# --------------------------------------
alias c='clear'
alias rm='rm -i'
alias dotfiles='cd ~/dotfiles && nvim'
alias hypr='cd ~/.config/hypr && nvim'

# File Listing (using eza instead of lsd)
alias ls='eza --group-directories-first --icons'
alias ll='eza -l'
alias la='eza -a'
alias lla='eza -la'
alias lt='eza --tree'

# Neovim Variants
alias vim='nvim'
alias astrovim='NVIM_APPNAME=nvim-astro nvim'
alias nvchad='NVIM_APPNAME=nvim-chad nvim'

# Better cat
alias cat='bat --style=numbers --color=always'

# Git
alias lg='lazygit'
alias gs='git status'

# --------------------------------------
# FZF Integration (if available)
# --------------------------------------
[[ -f ~/.fzf.bash ]] && source ~/.fzf.bash

# --------------------------------------
# History Settings (Bash-compatible)
# --------------------------------------
HISTFILE=~/.bash_history
HISTSIZE=5000
HISTCONTROL=ignoredups:erasedups
shopt -s histappend
PROMPT_COMMAND="history -a; $PROMPT_COMMAND"

# --------------------------------------
# Zellij Auto-Start (if available)
# --------------------------------------
if command -v zellij &>/dev/null; then
  eval "$(zellij setup --generate-auto-start bash)"
fi
