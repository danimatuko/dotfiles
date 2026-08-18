function nvim
    # Create a unique server socket per instance so multiple nvim sessions
    # can run at once and still be targeted by external remote commands.
    set -l socket "/tmp/nvim-$USER-"(date +%s%N)".sock"
    command nvim --listen "$socket" $argv
end
