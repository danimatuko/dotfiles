# --------------------------------------
# Powerlevel10k Instant Prompt
# --------------------------------------
if [[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]]; then
  source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
fi
#
# --------------------------------------
# PATH Configuration
# --------------------------------------
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH="$HOME/.tmuxifier/bin:$PATH"
export EDITOR="nvim"
export PATH="$HOME/bin:$HOME/.local/bin:/usr/local/bin:$PATH"
export PATH="$HOME/.config/composer/vendor/bin:$PATH"
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
# Load essential plugins
zinit light zdharma-continuum/fast-syntax-highlighting  # Uncomment for syntax highlighting
zinit light zsh-users/zsh-autosuggestions
zinit light zsh-users/zsh-completions
zinit light lsd-rs/lsd                                  # might need to install manually
zinit ice depth=1; zinit light romkatv/powerlevel10k
zinit light zsh-users/zsh-history-substring-search

# --------------------------------------
# Aliases
# --------------------------------------
alias ls='lsd'                                 # Use lsd for basic ls
alias ll='lsd -l'                              # Long list format
alias la='lsd -a'                              # Include hidden files
alias lla='lsd -la'                            # Long list with hidden files
alias lt='lsd --tree'                          # Display directory tree
alias lsd='lsd --group-dirs=first'             # Show directories first
alias cat="bat --style=numbers --color=always" # Use bat instead of cat with syntax highlighting
alias cd="z"                                   # `cd` replacement with `zoxide`
alias rm='rm -i'

# Neovim Config Aliases
alias vim='nvim'                               # Use neovim instead of vim
alias astrovim='NVIM_APPNAME=nvim-astro nvim'  # Launch Neovim with AstroNvim configuration
alias nvchad='NVIM_APPNAME=nvim-chad nvim'     # Launch Neovim with NvChad configuration

# History Settings
HISTFILE=~/.zsh_history      # Set the history file location
HISTSIZE=5000                # Set the number of commands in memory
SAVEHIST=5000                # Set the number of commands to save to the history file
setopt append_history        # Append to history instead of overwriting
setopt inc_append_history    # Write history after each command
setopt hist_ignore_dups      # Ignore duplicate commands
setopt share_history         # Share history between all sessions
setopt hist_reduce_blanks     # Remove superfluous blanks from commands
setopt hist_verify            # Don't execute the history command immediately (edit it first)
setopt extended_history       # Save timestamps of when commands were run

# binds
bindkey '^[[A' history-substring-search-up
bindkey '^[[B' history-substring-search-down
bindkey "^R" history-incremental-search-backward

# --------------------------------------
# Environment Setup
# --------------------------------------
# Docker configuration
export DOCKER_HOST=unix:///var/run/docker.sock

# To customize prompt, run `p10k configure` or edit ~/.p10k.zsh.
[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh


# --------------------------------------
# Initialization of External Tools/Plugins
# --------------------------------------
# Place initialization commands here to ensure all configurations
# are set up first, preventing conflicts. Example: eval "$(zoxide init zsh)"

# eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"
eval "$(zoxide init zsh)"
# eval "$(tmuxifier init -)"
