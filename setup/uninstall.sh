#!/bin/bash

set -euo pipefail

DOTFILES_DIR="$HOME/dotfiles"
LOCAL_BIN_DIR="$HOME/.local/bin"

APPLY=false
REMOVE_BIN_LINKS=true
RESTORE_BACKUP=false
BACKUP_DIR=""

print_usage() {
	cat <<'EOF'
Usage: bash setup/uninstall.sh [options]

Default mode is dry-run (no changes made).

Options:
  --apply                  Apply changes (not just preview)
  --restore-latest-backup  Restore files from newest ~/dotfiles_backup_* folder
  --no-bin                 Skip removing ~/.local/bin links
  -h, --help               Show this help
EOF
}

while [[ $# -gt 0 ]]; do
	case "$1" in
	--apply)
		APPLY=true
		;;
	--restore-latest-backup)
		RESTORE_BACKUP=true
		;;
	--no-bin)
		REMOVE_BIN_LINKS=false
		;;
	-h | --help)
		print_usage
		exit 0
		;;
	*)
		echo "Unknown option: $1"
		print_usage
		exit 1
		;;
	esac
	shift
done

latest_backup_dir() {
	local latest
	latest=$(ls -1dt "$HOME"/dotfiles_backup_* 2>/dev/null | head -n1 || true)
	[[ -n "$latest" ]] && printf '%s\n' "$latest"
}

do_remove_path() {
	local target="$1"

	if [[ ! -e "$target" && ! -L "$target" ]]; then
		return 0
	fi

	if $APPLY; then
		rm -rf "$target"
		echo "🗑️  Removed: $target"
	else
		echo "[dry-run] remove: $target"
	fi
}

do_remove_symlink() {
	local target="$1"
	local expected_prefix="$2"

	if [[ ! -L "$target" ]]; then
		return 0
	fi

	local resolved
	resolved=$(readlink -f "$target")

	if [[ "$resolved" != "$expected_prefix"* ]]; then
		echo "⚠️  Skip $target (not linked to $expected_prefix)"
		return 0
	fi

	if $APPLY; then
		rm -f "$target"
		echo "🗑️  Removed symlink: $target"
	else
		echo "[dry-run] remove symlink: $target"
	fi
}

if $RESTORE_BACKUP; then
	BACKUP_DIR="$(latest_backup_dir)"
fi

if $RESTORE_BACKUP && [[ -z "$BACKUP_DIR" ]]; then
	echo "❌ No backup folder found at ~/dotfiles_backup_*"
	exit 1
fi

echo "Mode: $([ "$APPLY" = true ] && echo apply || echo dry-run)"
if $RESTORE_BACKUP; then
	echo "Backup restore source: $BACKUP_DIR"
fi

echo "\n== Config and Dotfile Links =="
do_remove_symlink "$HOME/.bashrc" "$DOTFILES_DIR/config"
do_remove_symlink "$HOME/.zshrc" "$DOTFILES_DIR/config"
do_remove_symlink "$HOME/.gitconfig" "$DOTFILES_DIR/config"
do_remove_symlink "$HOME/.tmux.conf" "$DOTFILES_DIR/config"
do_remove_symlink "$HOME/.config/ags" "$DOTFILES_DIR/config"
do_remove_symlink "$HOME/.config/ghostty" "$DOTFILES_DIR/config"
do_remove_symlink "$HOME/.config/hypr" "$DOTFILES_DIR/config"
do_remove_symlink "$HOME/.config/kitty" "$DOTFILES_DIR/config"
do_remove_symlink "$HOME/.config/nvim" "$DOTFILES_DIR/config"
do_remove_symlink "$HOME/.config/rofi" "$DOTFILES_DIR/config"
do_remove_symlink "$HOME/.config/swaync" "$DOTFILES_DIR/config"
do_remove_symlink "$HOME/.config/waybar" "$DOTFILES_DIR/config"
do_remove_symlink "$HOME/.config/wlogout" "$DOTFILES_DIR/config"
do_remove_symlink "$HOME/.config/swayosd" "$DOTFILES_DIR/config"

if $RESTORE_BACKUP; then
	echo "\n== Restore from Backup =="
	if [[ -e "$BACKUP_DIR/config" ]]; then
		do_remove_path "$HOME/.config"
		if $APPLY; then
			mv "$BACKUP_DIR/config" "$HOME/.config"
			echo "♻️  Restored: $HOME/.config"
		else
			echo "[dry-run] restore $BACKUP_DIR/config -> $HOME/.config"
		fi
	fi

	for name in .bashrc .zshrc .gitconfig .tmux.conf; do
		if [[ -e "$BACKUP_DIR/$name" ]]; then
			do_remove_path "$HOME/$name"
			if $APPLY; then
				mv "$BACKUP_DIR/$name" "$HOME/$name"
				echo "♻️  Restored: $HOME/$name"
			else
				echo "[dry-run] restore $BACKUP_DIR/$name -> $HOME/$name"
			fi
		fi
	done
fi

if $REMOVE_BIN_LINKS; then
	echo "\n== ~/.local/bin Links =="
	if [[ -d "$LOCAL_BIN_DIR" ]]; then
		for file in "$DOTFILES_DIR"/bin/*; do
			[[ -f "$file" || -L "$file" ]] || continue
			name=$(basename "$file")
			do_remove_symlink "$LOCAL_BIN_DIR/$name" "$DOTFILES_DIR/bin"
		done
	fi
fi

if $APPLY; then
	echo "\n✅ Uninstall actions completed."
else
	echo "\n✅ Dry-run complete. Use --apply to execute."
fi
