#!/bin/bash

# ------------------------------------------------------------------------------
# link-bin-scripts.sh
#
# symlinks all executable files from:
#   - ~/dotfiles/bin → ~/.local/bin/
#
# this makes it easy to link scripts into a directory that's in your path.
# use this to sync and activate your custom bin scripts on a new machine.
# ------------------------------------------------------------------------------

dotfiles_dir="$home/dotfiles"
bin_dir="$dotfiles_dir/scripts/bin"
local_bin_dir="$home/.local/bin"

# create the local bin directory if it doesn't exist
mkdir -p "$local_bin_dir"

echo "🔗 linking scripts from $bin_dir to $local_bin_dir..."

# loop through all scripts in the bin directory and create symlinks
for script in "$bin_dir"/*; do
  [ -e "$script" ] || continue
  script_name=$(basename "$script")
  
  # only create the symlink if the script is executable
  if [[ -x "$script" ]]; then
    ln -sf "$script" "$local_bin_dir/$script_name"
    echo "✅ linked $script_name"
  else
    echo "⚠️ skipping $script_name (not executable)"
  fi
done

echo "🟢 all scripts linked to $local_bin_dir!"

