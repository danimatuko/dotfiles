# Fuzzy search Zsh history with fzf and insert into prompt

__fzf_history() {
  local selected

  # Fetch history (most recent first), strip numbers
  selected=$(
    fc -rl 1 | awk '{$1=""; print substr($0,2)}' |
    fzf --no-sort --height=40% --reverse --border \
        --prompt="History 🔍 " \
        --info=inline
  )

  # Insert result into prompt buffer
  if [[ -n $selected ]]; then
    BUFFER="$selected"
    CURSOR=${#BUFFER}
  fi
  zle reset-prompt
}

# Register widget
zle -N __fzf_history

