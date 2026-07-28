-------------------
----  PLUGINS  ----
-------------------

hl.config({
	plugin = {
		gloview = {
			layout = "rows",
			gap = 34,
			padding = 80,
			padding_top = 40,
			padding_bottom = 70,
			duration = 200,
			preview_round = 12,
			blur = 1,

			anchor = "top",
			strip_height = 150,
			strip_all_card = 1,

			focus_follows_mouse = 1,
			scroll_switches_workspace = 1,
			passthrough_keys = 1,
			exit_on_click = 1,
			exit_on_switch = 0,

			key_left = "h,left",
			key_right = "l,right",
			key_up = "k,up",
			key_down = "j,down",
		},
	},
})
