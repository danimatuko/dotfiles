---------------------
---- AUTOSTART ----
---------------------

-- See https://wiki.hypr.land/Configuring/Basics/Autostart/

-- Autostart necessary processes (like notifications daemons, status bars, etc.)
-- Or execute your favorite apps at launch like this:
--
hl.on("hyprland.start", function()
	hl.exec_cmd("ags run ~/.config/ags/app.ts")
	hl.exec_cmd("hypridle")
	hl.exec_cmd("awww-daemon")
	hl.exec_cmd("hyprsunset")
	hl.exec_cmd("cliphist daemon")
	hl.exec_cmd("wl-paste --watch cliphist store")
	hl.exec_cmd("udiskie")
	hl.exec_cmd("hyprpm reload")
	hl.exec_cmd("canberra-gtk-play -i desktop-login")
end)
