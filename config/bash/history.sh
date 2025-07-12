#!/bin/bash

HISTFILE=~/.bash_history
HISTSIZE=5000
HISTCONTROL=ignoredups:erasedups
shopt -s histappend
PROMPT_COMMAND="history -a; $PROMPT_COMMAND"

