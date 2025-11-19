#!/bin/bash

SOURCE_DIR="$HOME/dotfiles/bin"
TARGET_DIR="$HOME/.local/bin"

# Ensure the target directory exists
mkdir -p "$TARGET_DIR"

echo "Linking scripts from $SOURCE_DIR to $TARGET_DIR"

for file in "$SOURCE_DIR"/*; do
    # Skip if directory
    [ -d "$file" ] && continue

    filename=$(basename "$file")
    target="$TARGET_DIR/$filename"

    # If a file or link already exists, remove it
    if [ -e "$target" ] || [ -L "$target" ]; then
        rm -f "$target"
    fi

    ln -s "$file" "$target"
    echo "✔ Linked $filename"
done

echo "Done!"
