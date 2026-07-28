#!/bin/bash

if command -v zoxide >/dev/null 2>&1; then
  eval "$(zoxide init bash)"
  alias cd='z'
fi

if command -v zellij &>/dev/null; then
  if [[ -z "$ZELLIJ" ]]; then
    if [[ "$ZELLIJ_AUTO_ATTACH" == "true" ]]; then
      zellij attach -c
    else
      zellij -l welcome
    fi

    if [[ "$ZELLIJ_AUTO_EXIT" == "true" ]]; then
      exit
    fi
  fi
fi

[[ -f ~/.fzf.bash ]] && source ~/.fzf.bash
