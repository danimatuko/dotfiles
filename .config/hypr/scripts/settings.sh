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
    # Add --height option to make ESC work properly
    CHOICE=$(gum choose --height 10 --cursor.foreground 212 "Light/Dark Mode" "Wallpaper" "Blue Light Filter" "Exit")
    
    # Check if choice is empty (which happens when ESC is pressed)
    if [ -z "$CHOICE" ]; then
        echo "ESC pressed, exiting..."
        exit 0
    fi
    
    case $CHOICE in
        "Light/Dark Mode")
            MODE=$(gum choose "Light" "Dark")
            if [ "$MODE" = "Light" ]; then
                gsettings set org.gnome.desktop.interface color-scheme 'prefer-light'
            else 
                gsettings set org.gnome.desktop.interface color-scheme 'prefer-dark'
            fi
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
