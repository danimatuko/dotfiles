#!/bin/bash

if command -v zoxide >/dev/null 2>&1; then
  eval "$(zoxide init bash)"
  alias cd='z'
fi

if command -v zellij &>/dev/null; then
  eval "$(zellij setup --generate-auto-start bash)"
fi

[[ -f ~/.fzf.bash ]] && source ~/.fzf.bash

