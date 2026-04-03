if status is-interactive
    # Commands to run in interactive sessions can go here
    and not set -q ZELLIJ
    zellij -l welcome
end
