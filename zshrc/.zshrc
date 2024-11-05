# Set PATHs
export PATH="$HOME/bin:$HOME/.local/bin:/usr/local/bin:$PATH"

# Oh My Zsh configuration
export ZSH="$HOME/.oh-my-zsh"
ZSH_THEME="robbyrussell"

# Initialize Zinit
if [[ ! -f "$HOME/.zinit/bin/zinit.zsh" ]]; then
  mkdir -p "$HOME/.zinit" && \
  git clone https://github.com/zdharma-continuum/zinit "$HOME/.zinit/bin"
fi
source "$HOME/.zinit/bin/zinit.zsh"

# Source Oh My Zsh before setting custom aliases
source $ZSH/oh-my-zsh.sh

# Load plugins with Zinit
zinit light zdharma-continuum/fast-syntax-highlighting
zinit light zsh-users/zsh-autosuggestions
zinit light zsh-users/zsh-completions
zinit light lsd-rs/lsd

# Aliases
alias vim='nvim'
# Aliases for lsd
alias ls='lsd'                         # Use lsd for basic ls
alias ll='lsd -l'                      # Long list format
alias la='lsd -a'                      # Include hidden files
alias lla='lsd -la'                    # Long list with hidden files
alias lt='lsd --tree'                  # Display directory tree
alias lsd='lsd --group-dirs=first'     # Show directories first

# Enable Brew environment (Linuxbrew)
eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"

# Docker configuration
export DOCKER_HOST=unix:///var/run/docker.sock

