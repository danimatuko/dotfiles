
# 🛠️ Dotfiles

A collection of my personal configuration files to quickly bootstrap a modern development environment on Arch Linux (Hyprland-based).

---

## 📦 Included Configurations

This repository includes settings and scripts for:

* **Bash** — Modular `bashrc` with `starship`, `zoxide`, `fzf`, etc.
* **Tmux** — Minimal terminal multiplexer setup
* **Git** — Git identity and general preferences
* **Hyprland** — Wayland window manager configuration
* **Kitty / Ghostty** — Terminal emulators with matching themes
* **Neovim (AstroNvim)** — Fully-featured NVim configuration with lazy-loading plugins
* **Waybar** — Custom status bar setup
* **Rofi** — Themed app launcher with icon and font support
* **SwayNC** — Notification center
* **Bluetooth / Audio / Network** — Helpers and GUI tools (`blueman`, `pavucontrol`, etc.)
* **Custom Scripts** — Located in `scripts/`, symlinked automatically

---

## 🚀 Quick Installation

Clone the repo using a shallow clone (faster download):

```bash
git clone --depth=1 [https://github.com/danimatuko/dotfiles.git](https://github.com/danimatuko/dotfiles.git) ~/dotfiles
````

Run the modular install script:

Bash

```
cd ~/dotfiles
./install.sh
```

> 🛟 The script automatically installs `yay`, backs up existing configs, and prompts before linking.

---

## 🔗 How Linking Works

The script will:

1. Create a timestamped backup (e.g. `~/dotfiles_backup_2025-07-11_15-32-00`)
    
2. Prompt to confirm linking your `.bashrc`, `.tmux.conf`, `.gitconfig`, and config folders
    
3. Use symlinks (`ln -sf`) so updates can be version-controlled and shared easily
    

---

## 🐛 Troubleshooting Tips

- **Check if configs are linked**:
    

  `bash   ls -la ~/.config/`  

- Check backups:
    
      Look inside the ~/dotfiles_backup_<timestamp> directory.
    
- **Re-run just the link script**:
    

  `bash ~/dotfiles/setup/link-dotfiles.sh`  

---

## ⚙️ Requirements

- Based on **Arch Linux**
    
- The installer handles installing `yay` (AUR helper) if missing
    
- Designed for a **Wayland + Hyprland** setup
    
- Includes optional scripts for font, icon, and clipboard support
    

---

## 📌 TODO

- [ ] Add workspaces overview
    
- [ ] Display settings menu (extend, duplicate...)
    

---

## 📝 License

This dotfiles repository is distributed under the MIT License. Use freely and adapt as needed.
