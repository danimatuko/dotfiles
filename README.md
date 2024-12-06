# Dotfiles Setup Script

This repository contains a script to automate the setup of essential programs and dotfiles on a new system. 
The script is designed to work across multiple Linux distributions, including **Ubuntu**, **Pop!_OS**, **Fedora**, and other Debian/Red Hat-based systems.

## Features

- Automatically installs essential programs:
  - `vim`
  - `neovim`
  - `curl`
  - `git`
  - `tmux`
  - `stow`
- Detects the appropriate package manager (`apt`, `pacman`, or `dnf`) and installs programs accordingly.
- Stows dotfiles from the `dotfiles` directory to the appropriate locations on your system.
- Checks for required dependencies, including:
  - Internet connection
  - `sudo` availability
- Provides a confirmation prompt before making changes.

## Requirements

- A Linux-based operating system with one of the following package managers:
  - `apt` (for Debian-based systems like Ubuntu or Pop!_OS)
  - `dnf` (for Fedora-based systems)
  - `pacman` (for Arch-based systems)
- `sudo` configured on the system.
- An active internet connection.

## Usage

Clone the project:

```bash
git clone https://github.com/danimatuko/dotfiles.git
```

Go to the dotfiles directory:

```bash
cd ~/dotfiles
```

Ensure the script has execute permissions:

```bash
chmod +x automate_setup.sh
```

Run the script:

```bash
./automate_setup.sh
```
