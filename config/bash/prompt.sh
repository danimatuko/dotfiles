#!/bin/bash

if command -v starship >/dev/null 2>&1; then
  eval "$(starship init bash)"
else
  PS1='\u@\h:\w\$ '
fi

