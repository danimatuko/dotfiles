-----------------------
---- LOOK AND FEEL ----
-----------------------

-- Refer to https://wiki.hypr.land/Configuring/Basics/Variables/
hl.config({
	general = {
		gaps_in = 2,
		gaps_out = 4,

		border_size = 2,

		col = {
			active_border = { colors = { "rgba(33ccffee)", "rgba(00ff99ee)" }, angle = 45 },
			inactive_border = "rgba(595959aa)",
		},

		-- Set to true to enable resizing windows by clicking and dragging on borders and gaps
		resize_on_border = true,

		-- Please see https://wiki.hypr.land/Configuring/Advanced-and-Cool/Tearing/ before you turn this on
		allow_tearing = false,

		layout = "master",
	},

	decoration = {
		rounding = 4,

		-- Change transparency of focused and unfocused windows
		active_opacity = 0.9,
		inactive_opacity = 0.85,

		shadow = {
			enabled = true,
			range = 30,
			render_power = 3,
			-- color = 0x66000000,
			-- color = rgba(00000044),
		},

		blur = {
			enabled = true,
			size = 15,
			passes = 3,
			new_optimizations = true,
			xray = true,
			brightness = 1.0,
			noise = 0.02,
			contrast = 1.5,
			popups = true,
			popups_ignorealpha = 0.5,
		},

		-- dim_inactive = true,
		dim_strength = 0.15,
	},
})
