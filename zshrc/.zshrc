# --------------------------------------
# Powerlevel10k Instant Prompt
# --------------------------------------
typeset -g POWERLEVEL9K_INSTANT_PROMPT=quiet
if [[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]]; then
    source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
fi

# --------------------------------------
# PATH Configuration
# --------------------------------------
export PATH="$HOME/bin:$HOME/.local/bin:/usr/local/bin:$PATH"
export PATH="$HOME/.config/composer/vendor/bin:$PATH"
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" 

# --------------------------------------
# Zinit Initialization (Plugin Manager)
# --------------------------------------
if [[ ! -f "$HOME/.zinit/bin/zinit.zsh" ]]; then
    mkdir -p "$HOME/.zinit" && \
    git clone https://github.com/zdharma-continuum/zinit "$HOME/.zinit/bin"
fi
source "$HOME/.zinit/bin/zinit.zsh"

# --------------------------------------
# Plugin Management with Zinit
# --------------------------------------
zinit light zsh-users/zsh-autosuggestions
zinit light zsh-users/zsh-completions
zinit light lsd-rs/lsd                         # Might need to install manually
zinit light romkatv/powerlevel10k

# --------------------------------------
# Aliases and Mappings
# --------------------------------------
alias vim='nvim'                               # Use Neovim instead of Vim
alias ls='lsd'                                 # Use lsd for basic ls
alias ll='lsd -l'                              # Long list format
alias la='lsd -a'                              # Include hidden files
alias lla='lsd -la'                            # Long list with hidden files
alias lt='lsd --tree'                          # Display directory tree
alias lsd='lsd --group-dirs=first'             # Show directories first
alias cat="bat --style=numbers --color=always" # Use bat instead of cat with syntax highlighting
alias cd="z"                                   # Map `cd` to `z` for directory navigation

# --------------------------------------
# Environment Setup
# --------------------------------------
# Zoxide initialization (for directory navigation)
eval "$(zoxide init zsh)"

# Docker configuration
export DOCKER_HOST=unix:///var/run/docker.sock

# --------------------------------------
# Launch Neovim with interactive config selection
# --------------------------------------
function nvims() {
    find -L "${XDG_CONFIG_HOME:-$HOME/.config}" -mindepth 2 -maxdepth 2 -name init.lua -o -name init.vim | \
        awk -F/ '{print $(NF-1)}' | \
        fzf --prompt 'Neovim config > ' --layout=reverse --border --exit-0 | \
        xargs -d$'\n' -n1 bash -c 'NVIM_APPNAME="$1" nvim' --
}

# --------------------------------------
# Powerlevel10k Configuration
# --------------------------------------
[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh
