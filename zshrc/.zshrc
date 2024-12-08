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

# Neovim Config Aliases
alias vim='nvim'                               # Use neovim instead of vim
alias astrovim='NVIM_APPNAME=nvim-astro nvim'  # Launch Neovim with AstroNvim configuration
alias nvchad='NVIM_APPNAME=nvim-chad nvim'     # Launch Neovim with NvChad configuration

# --------------------------------------
# Environment Setup
# --------------------------------------
# Docker configuration
export DOCKER_HOST=unix:///var/run/docker.sock

# --------------------------------------
# Initialization of External Tools/Plugins
# --------------------------------------
# Place initialization commands here to ensure all configurations
# are set up first, preventing conflicts. Example: eval "$(zoxide init zsh)"
eval "$(zoxide init zsh)"

# To customize prompt, run `p10k configure` or edit ~/.p10k.zsh.
[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh
