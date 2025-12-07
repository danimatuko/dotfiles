# --------------------------------------
# Aliases
# --------------------------------------

# General
alias c='clear'
alias rm='rm -i'
alias nv='nvim'
alias cd='z'

# Directories
alias dots='cd ~/dotfiles && nvim'
alias hypr='cd ~/.config/hypr && nvim'

# eza
alias ls='eza --group-directories-first --icons'
alias ll='eza -l'
alias la='eza -a'
alias lla='eza -la'
alias lt='eza --tree'

# Git
alias lg='lazygit'
alias gs='git status'

# Neovim variants
alias astrovim='NVIM_APPNAME=nvim-astro nvim'
alias nvchad='NVIM_APPNAME=nvim-chad nvim'

# Better cat
alias cat='bat --style=numbers --color=always'
