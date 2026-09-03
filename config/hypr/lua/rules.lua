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
for i = 1, 5 do
	hl.workspace_rule({ workspace = tostring(i), monitor = "DP-1", persistent = true })
end

-- App-to-workspace rules
hl.window_rule({
	name = "obsidian-workspace-1",
	match = { class = "^obsidian$" },
	workspace = "1",
})
	hl.window_rule({
	name = "terminal-workspace-2",
	match = { class = "^com\\.mitchellh\\.ghostty$" },
	workspace = "2",
})
hl.window_rule({
	name = "browser-workspace-3",
	match = { class = "^vivaldi-stable$" },
	workspace = "3",
})

-- Keep helper runner window floating
hl.window_rule({
	name = "move-hyprland-run",
	match = { class = "hyprland-run" },

	move = "20 monitor_h-120",
	float = true,
})
