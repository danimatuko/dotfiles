#!/bin/bash

# Fuzzy search Bash history with fzf and inject into prompt
__fzf_history() {
  local selected

  # Get command history (most recent first), remove line numbers
  selected=$(
    history | cut -c 8- | tac |
    fzf --no-sort --height=40% --reverse --border \
        --prompt="History 🔍 " \
        --info=inline
  )

  # Inject selected command into current prompt buffer
  if [[ -n $selected ]]; then
    READLINE_LINE="$selected"
    READLINE_POINT=${#selected}
  fi
}

