# 🛠️ Dotfiles: Scripts Directory

This folder contains utility scripts and systemd unit files designed to automate and enhance your Linux system setup, especially on setups like Arch Linux + Hyprland. It includes:

- 🔄 Custom scripts and helpers  
- ⏱️ systemd service and timer units  
- 🔗 Setup scripts to link everything automatically  
- 📨 Notifications for available system updates  

---

## 📁 Folder Structure

```
scripts/
├── bin/                       # Executable helper scripts (linked to ~/.local/bin)
│   └── pacman-update-check.sh
├── services/                  # systemd service units
│   └── update-notifier.service
├── timers/                    # systemd timer units
│   └── update-notifier.timer
├── link-bin-scripts.sh        # Links bin/* to ~/.local/bin/
├── link-systemd-units.sh      # Links and enables systemd services + timers
├── update-notifier.sh         # Notifies when system updates are available
...
```

---

## ⚙️ Setup Instructions

### 1. Link Executable Scripts

```bash
./link-bin-scripts.sh
```

This links all executable files in `bin/` to `~/.local/bin`, making them available in your `$PATH`.

### 2. Link and Enable systemd Units

```bash
./link-systemd-units.sh
```

This will:
- Symlink service/timer units to `~/.config/systemd/user/`
- Reload the systemd user daemon
- Enable and start all units

---

## 🧼 Additional Utilities

- `reload-waybar.sh`, `reload-swaync.sh`: Reload system components  
- `screenshot-*.sh`: Take various types of screenshots  
- `set-wallpaper-colors.sh`, `update-waybar-colors.sh`: Sync Pywal colors with UI elements  
- `pywal-theme.sh`: Triggered via Waypaper to update themes dynamically  
- `waypaper-update-theme.sh`: Updates wallpaper and related themes  
- `update-notifier.sh` A minimal notifier that uses `checkupdates` to count available system updates and sends a simple desktop notification.

---

## 🧩 Requirements

- `checkupdates` (from `pacman-contrib`)  
- `notify-send` (provided by `libnotify`)  
- A notification daemon like swaync  
- `systemd --user` support  

---

## 📎 Notes

- All scripts are written to be simple, modular, and easy to extend.  
- For notifications, prefer standard system sounds (for example `canberra-gtk-play` events like `message` and `bell`) over custom sound files when possible.
- Place this folder inside your dotfiles repo (e.g. `~/dotfiles/scripts`).  
- Recommended to run both `link-bin-scripts.sh` and `link-systemd-units.sh` after cloning your dotfiles on a new machine.  

---

## 🧠 License

Feel free to copy, modify, and reuse these scripts. A credit would be nice, but not required.
