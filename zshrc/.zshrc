# --------------------------------------
# Powerlevel10k Instant Prompt
# --------------------------------------
if [[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]]; then
    source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
fi

# --------------------------------------
# PATH Configuration
# --------------------------------------
export PATH="$HOME/bin:$HOME/.local/bin:/usr/local/bin:$PATH"

# --------------------------------------
# Zinit Initialization
# --------------------------------------
if [[ ! -f "$HOME/.zinit/bin/zinit.zsh" ]]; then
    mkdir -p "$HOME/.zinit" && \
    git clone https://github.com/zdharma-continuum/zinit "$HOME/.zinit/bin"
fi
source "$HOME/.zinit/bin/zinit.zsh"

# --------------------------------------
# Oh My Zsh Configuration
# --------------------------------------
source $ZSH/oh-my-zsh.sh

# --------------------------------------
# Plugin Management with Zinit
# --------------------------------------
# zinit light zdharma-continuum/fast-syntax-highlighting # Uncomment for syntax highlighting
zinit light zsh-users/zsh-autosuggestions
zinit light zsh-users/zsh-completions
zinit light lsd-rs/lsd                 # might need to install manually
zinit light romkatv/powerlevel10k 

# --------------------------------------
# Aliases
# --------------------------------------
alias vim='nvim'

# Aliases for lsd
alias ls='lsd'                         # Use lsd for basic ls
alias ll='lsd -l'                      # Long list format
alias la='lsd -a'                      # Include hidden files
alias lla='lsd -la'                    # Long list with hidden files
alias lt='lsd --tree'                  # Display directory tree
alias lsd='lsd --group-dirs=first'     # Show directories first

# --------------------------------------
# Environment Setup
# --------------------------------------
# Enable Brew environment (Linuxbrew)
eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"

# Docker configuration
export DOCKER_HOST=unix:///var/run/docker.sock

# --------------------------------------
# Powerlevel10k Configuration
# --------------------------------------
[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh

