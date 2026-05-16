--------------------------------
---- WINDOWS AND WORKSPACES ----
--------------------------------

-- See https://wiki.hypr.land/Configuring/Basics/Window-Rules/
-- and https://wiki.hypr.land/Configuring/Basics/Workspace-Rules/

-- Floating TUI helper windows
hl.window_rule({
	name = "floating-tui",
	match = { class = "TUI.float" },
	rounding = 20,
	float = true,
	size = "750 700",
	center = true,
})

-- Layer rules: bars/launchers/panels

-- Logout dialog
hl.layer_rule({
	name = "logout-dialog-blur",
	match = { namespace = "logout_dialog" },
	blur = true,
})
hl.layer_rule({
	name = "logout-dialog-alpha",
	match = { namespace = "logout_dialog" },
	ignore_alpha = 0.5,
})

-- Generic GTK layer shell clients
hl.layer_rule({
	name = "gtk4-layer-shell-blur",
	match = { namespace = "gtk4-layer-shell" },
	blur = true,
})
hl.layer_rule({
	name = "gtk4-layer-shell-alpha",
	match = { namespace = "gtk4-layer-shell" },
	ignore_alpha = 0.5,
})

-- AGS sidebar and backdrop
hl.layer_rule({
	name = "ags-sidebar-blur",
	match = { namespace = "ags-sidebar" },
	blur = true,
})
hl.layer_rule({
	name = "ags-sidebar-alpha",
	match = { namespace = "ags-sidebar" },
	ignore_alpha = 0.5,
})
hl.layer_rule({
	name = "ags-sidebar-animation",
	match = { namespace = "ags-sidebar" },
	animation = "slide right",
})
hl.layer_rule({
	name = "ags-sidebar-backdrop-animation",
	match = { namespace = "ags-sidebar-backdrop" },
	animation = "fade",
})

-- Smart single-window behavior (tiled + visible only)
hl.window_rule({
	name = "no-border-wtv1",
	match = { float = false, workspace = "w[tv1]" },
	border_size = 0,
})
hl.workspace_rule({ workspace = "w[tv1]", gaps_out = 0, gaps_in = 0 })

-- Keep no border for fullscreen workspaces
hl.window_rule({
	name = "no-border-f1",
	match = { float = false, workspace = "f[1]" },
	border_size = 0,
})

-- Keep a minimum set of workspaces always available
hl.workspace_rule({ workspace = "1", persistent = true })
hl.workspace_rule({ workspace = "2", persistent = true })
hl.workspace_rule({ workspace = "3", persistent = true })
hl.workspace_rule({ workspace = "4", persistent = true })
hl.workspace_rule({ workspace = "5", persistent = true })

-- App-to-workspace rules
hl.window_rule({
	name = "ghostty-workspace-1",
	match = { class = "^(ghostty|com\\.mitchellh\\.ghostty)$" },
	workspace = "1",
})
hl.window_rule({
	name = "brave-workspace-2",
	match = { class = "^(brave|brave-browser|Brave-browser)$" },
	workspace = "2",
})

-- Keep helper runner window floating
hl.window_rule({
	name = "move-hyprland-run",
	match = { class = "hyprland-run" },

	move = "20 monitor_h-120",
	float = true,
})
