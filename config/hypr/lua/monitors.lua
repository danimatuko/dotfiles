------------------
---- MONITORS ----
------------------

-- See https://wiki.hypr.land/Configuring/Basics/Monitors/
hl.monitor({
	output = "",
	mode = "preferred",
	position = "auto",
	scale = "auto",
})

hl.monitor({
	output = "eDP-1",
	mode = "2880x1800@120.0",
	position = "4480x0",
	scale = "1.5",
	mirror = "DP-1",
})

hl.monitor({
	output = "DP-1",
	mode = "2560x1080@59.98",
	position = "1920x0",
	scale = "1.0",
})
