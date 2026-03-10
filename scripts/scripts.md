# 🛠️ Dotfiles: Scripts Directory

This folder contains utility scripts and systemd unit files designed to automate and enhance your Linux system setup, especially on setups like Arch Linux + Hyprland. It includes:

- 🔄 Custom scripts and helpers  
- ⏱️ systemd service and timer units  
- 🔗 Setup scripts to link everything automatically  
- 📨 Notifications for available system updates  

---

## 📁 Folder Structure

```
dotfiles/
├── bin/                       # Executable helper scripts (linked to ~/.local/bin)
│   ├── toggle-darkmode
│   ├── toggle-nightlight
│   └── ...
├── scripts/                   # systemd assets and docs
│   ├── scripts.md
│   ├── services/
│   └── timers/
├── bin/link-bin-scripts       # Links bin/* to ~/.local/bin/
├── bin/link-systemd-units     # Links and enables systemd services + timers
...
```

---

## ⚙️ Setup Instructions

### 1. Link Executable Scripts

```bash
~/dotfiles/bin/link-bin-scripts
```

This links all executable files in `bin/` to `~/.local/bin`, making them available in your `$PATH`.

### 2. Link and Enable systemd Units

```bash
~/dotfiles/bin/link-systemd-units
```

This will:
- Symlink service/timer units to `~/.config/systemd/user/`
- Reload the systemd user daemon
- Enable and start all units

---

## 🧼 Additional Utilities

- `reload-waybar`, `reload-swaync`: Reload system components  
- `set-wallpaper-colors`, `update-waybar-colors`: Sync Pywal colors with UI elements  
- `pywal-theme`: Triggered via Waypaper to update themes dynamically  
- `waypaper-update-theme`: Updates wallpaper and related themes  
- `toggle-darkmode`, `toggle-nightlight`: Quick settings and manual toggles.

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
- Recommended to run both `~/dotfiles/bin/link-bin-scripts` and `~/dotfiles/bin/link-systemd-units` after cloning your dotfiles on a new machine.  

---

## 🧠 License

Feel free to copy, modify, and reuse these scripts. A credit would be nice, but not required.
