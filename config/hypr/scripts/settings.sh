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
        "Theme Menu" \
        "Wallpaper Menu" \
        "Toggle Blue Light Filter" \
        "Exit")
    
    # Exit on ESC
    [ -z "$CHOICE" ] && exit 0

    case $CHOICE in
        "Theme Menu")
            ags request toggle-theme-menu
            ;;
        "Wallpaper Menu")
            ags request toggle-wallpaper-menu
            ;;
        "Toggle Blue Light Filter")
            ~/.local/bin/toggle-nightlight
            ;;
        "Exit")
            break
            ;;
        *)
            echo "Invalid choice."
            ;;
    esac
done
