# ~/.bashrc - Simple config with starship prompt

# Only run if interactive shell
[[ $- != *i* ]] && return

# Enable colors for ls and grep
alias ls='ls --color=auto'
alias grep='grep --color=auto'

# Basic aliases
alias ll='ls -lah'
alias la='ls -A'

# Initialize starship prompt
if command -v starship >/dev/null 2>&1; then
  eval "$(starship init bash)"
fi

# Set a simple PS1 fallback (if starship is missing)
PS1='\u@\h:\w\$ '

