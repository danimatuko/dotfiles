# --------------------------------------
# Key Bindings
# --------------------------------------

# Vim mode
bindkey -v

# Incremental search
bindkey "^R" history-incremental-search-backward
bindkey -M isearch '^P' history-incremental-search-backward
bindkey -M isearch '^N' history-incremental-search-forward

# History navigation (cursor at end)
bindkey "^P" up-line-or-history
bindkey "^N" down-line-or-history
bindkey '^[[A' up-line-or-history
bindkey '^[[B' down-line-or-history


# Replace Ctrl+R search
bindkey '^R' __fzf_history
