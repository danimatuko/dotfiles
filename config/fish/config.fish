if status is-interactive
    alias oc='opencode'
    starship init fish | source
    # if not set -q ZELLIJ
    #     zellij -l welcome
    # end
end
