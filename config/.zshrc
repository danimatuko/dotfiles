# --------------------------------------
# PATH Configuration
# --------------------------------------
export ANDROID_HOME="$HOME/Android/Sdk"
export PATH="$PATH:$ANDROID_HOME/emulator"
export PATH="$PATH:$ANDROID_HOME/platform-tools"
export EDITOR="nvim"
export SUDO_EDITOR="$EDITOR"
export PATH="$HOME/bin:$PATH"
export PATH="$HOME/.local/bin:$PATH"
export PATH="/usr/local/bin:$PATH"
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# --------------------------------------
# Zinit Initialization
# --------------------------------------
if [[ ! -f "$HOME/.zinit/bin/zinit.zsh" ]]; then
    mkdir -p "$HOME/.zinit" && \
    git clone https://github.com/zdharma-continuum/zinit "$HOME/.zinit/bin"
fi
source "$HOME/.zinit/bin/zinit.zsh"

# --------------------------------------
# Plugin Management with Zinit
# --------------------------------------
zinit light zdharma-continuum/fast-syntax-highlighting
zinit light zsh-users/zsh-autosuggestions
zinit light zsh-users/zsh-completions
zinit light zsh-users/zsh-history-substring-search
zinit ice wait lucid as"completion"
zinit light zdharma-continuum/zinit

# --------------------------------------
# Aliases
# --------------------------------------
# General
alias c='clear'
alias rm='rm -i'

# Directory Navigation
alias cd='z'
alias dotfiles='cd ~/dotfiles/ && nvim'
alias hypr='cd ~/.config/hypr/ && nvim'

alias c='clear'
alias rm='rm -i'
alias nv='nvim'
alias dots='cd ~/dotfiles && nvim'
alias hypr='cd ~/.config/hypr && nvim'
alias ls='eza --group-directories-first --icons'
alias ll='eza -l'
alias la='eza -a'
alias lla='eza -la'
alias lt='eza --tree'
alias astrovim='NVIM_APPNAME=nvim-astro nvim'
alias cat='bat --style=numbers --color=always'
alias lg='lazygit'
alias gs='git status'

# Neovim Variants
alias astrovim='NVIM_APPNAME=nvim-astro nvim'
alias nvchad='NVIM_APPNAME=nvim-chad nvim'

# Better cat
alias cat='bat --style=numbers --color=always'

# --------------------------------------
# History Settings
# --------------------------------------
export HISTFILE=~/.zsh_history
export HISTSIZE=5000
export SAVEHIST=5000

setopt append_history
setopt inc_append_history
setopt hist_ignore_dups
setopt share_history
setopt hist_reduce_blanks
setopt hist_verify
setopt extended_history

# --------------------------------------
# Key Bindings
# --------------------------------------
# Vim mode
bindkey -v

# Incremental search
bindkey "^R" history-incremental-search-backward
bindkey -M isearch '^P' history-incremental-search-backward
bindkey -M isearch '^N' history-incremental-search-forward

# History navigation
bindkey "^P" history-beginning-search-backward
bindkey "^N" history-beginning-search-forward

bindkey '^[[A' history-beginning-search-backward
bindkey '^[[B' history-beginning-search-forward

# --------------------------------------
# Initialization of External Tools/Plugins
# --------------------------------------

# eval "$(zellij setup --generate-auto-start zsh)"

eval "$(zoxide init zsh)"
eval "$(starship init zsh)"
