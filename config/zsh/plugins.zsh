# --------------------------------------
# Zinit Initialization
# --------------------------------------

if [[ ! -f "$HOME/.zinit/bin/zinit.zsh" ]]; then
    mkdir -p "$HOME/.zinit" && \
    git clone https://github.com/zdharma-continuum/zinit "$HOME/.zinit/bin"
fi

source "$HOME/.zinit/bin/zinit.zsh"

# --------------------------------------
# Plugin Management
# --------------------------------------
zinit light zdharma-continuum/fast-syntax-highlighting
zinit light zsh-users/zsh-autosuggestions
zinit light zsh-users/zsh-completions
zinit light zsh-users/zsh-history-substring-search

zinit ice wait lucid as"completion"
zinit light zdharma-continuum/zinit
