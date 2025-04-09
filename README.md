# Dotfiles

A collection of personal configuration files (dotfiles) for a consistent development environment across different machines.

## 📋 Overview

This repository contains my personal dotfiles and setup script for quickly configuring a new development environment.  
It includes configurations for:

- **Zsh** - Shell configuration with custom aliases and functions
- **Tmux** - Terminal multiplexer settings for improved workflow
- **Git** - Personal git preferences and configuration
- **Hyprland** - Wayland compositor configuration
- **Kitty** - Modern terminal emulator setup
- **Neovim** - Text editor configuration and plugins
- **Rofi** - Application launcher settings
- **SwayNC** - Notification center configuration
- **Waybar** - Status bar customization

## 🚀 Installation

Clone this repository to your home directory:

```bash
git clone https://github.com/danimatuko/dotfiles.git ~/dotfiles
```

Run the setup script:

```bash
cd ~/dotfiles
chmod +x setup.sh
./setup.sh
```

## ⚙️ What the Setup Script Does

The setup script:
1. Creates backups of your existing configuration files
2. Creates symbolic links from this repository to your home directory
3. Preserves your original configurations in a timestamped backup folder

## 🛠️ Troubleshooting

If a specific configuration isn't being applied:

1. Check if the symlink was created correctly:
   ```bash
   ls -la ~/.config/<config_directory>
   ```

2. If the symlink wasn't created properly, try manually removing the directory and creating the symlink:
   ```bash
   mv ~/.config/<config_directory> ~/<config_directory>_backup
   ln -sf ~/dotfiles/.config/<config_directory> ~/.config/<config_directory>
   ```

3. Restart the application to apply the new configuration.

## 🔄 Updating

To update configurations:

1. Make changes directly in the `~/dotfiles` directory
2. Commit and push changes to keep them synchronized across machines:
   ```bash
   cd ~/dotfiles
   git add .
   git commit -m "Update configurations"
   git push
   ```

## 📝 License

This project is open-sourced under the MIT License.
