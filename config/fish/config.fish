if status is-interactive
    # Commands to run in interactive sessions can go here
    alias oc='opencode'
    if not set -q ZELLIJ
        zellij -l welcome
    end
end
