#!/bin/bash
# Configurable break line
BREAK_LINE="────────────"

while true; do
    clear
    # Big ASCII "SETTINGS" title with configurable break line
cat << EOF
            ╔═╗┬ ┬┌─┐┌┐┌┌─┐┌─┐  ╔═╗┌─┐┌┬┐┌┬┐┬┌┐┌┌─┐┌─┐            
            ║  ├─┤├─┤││││ ┬├┤   ╚═╗├┤  │  │ │││││ ┬└─┐            
${BREAK_LINE}╚═╝┴ ┴┴ ┴┘└┘└─┘└─┘  ╚═╝└─┘ ┴  ┴ ┴┘└┘└─┘└─┘${BREAK_LINE}
EOF

    CHOICE=$(gum choose --height 10 --cursor.foreground 212 \
        "Toggle Light/Dark Mode" \
        "Wallpaper" \
        "Blue Light Filter" \
        "Exit")
    
    # Exit on ESC
    [ -z "$CHOICE" ] && exit 0

    case $CHOICE in
        "Toggle Light/Dark Mode")
            ~/.config/hypr/scripts/toggle-darkmode.sh
            ;;
        "Wallpaper")
            ~/.config/hypr/scripts/theme-selector.sh
            ;;
        "Blue Light Filter")
            FILTER=$(gum choose "Enable" "Disable")
            if [ "$FILTER" = "Enable" ]; then
                hyprctl hyprsunset temperature 3500
            else
                hyprctl hyprsunset identity
            fi
            ;;
        "Exit")
            break
            ;;
        *)
            echo "Invalid choice."
            ;;
    esac
done
