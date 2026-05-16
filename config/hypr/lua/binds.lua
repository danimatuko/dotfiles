---------------------
---- MY PROGRAMS ----
---------------------

-- Set programs that you use
local terminal = "ghostty"
local browser = "brave"
local fileManager = "nautilus"

---------------------
---- KEYBINDINGS ----
---------------------

local mainMod = "SUPER" -- Sets "Windows" key as main modifier

local function dispatch(cmd)
	return hl.dsp.exec_cmd("hyprctl dispatch " .. cmd)
end

-- Actions
hl.bind(mainMod .. " + RETURN", hl.dsp.exec_cmd(terminal)) -- Open Terminal
hl.bind(mainMod .. " + Q", hl.dsp.window.close()) -- Close current window
hl.bind(mainMod .. " + SHIFT + X", hl.dsp.exec_cmd("~/.local/bin/logout-hyprland")) -- Exit Hyprland
-- bind = $mainMod, O, overview:toggle #NOTE: requires Hyprspace plugin
hl.bind(mainMod .. " + E", hl.dsp.exec_cmd(fileManager)) -- Opens the filemanager
hl.bind(mainMod .. " + T", hl.dsp.window.float({ action = "toggle" })) -- Toggle between tiling and floating window
hl.bind(mainMod .. " + SHIFT + T", hl.dsp.exec_cmd("ags request toggle-theme-menu"))
hl.bind(mainMod .. " + F", hl.dsp.window.fullscreen({ action = "toggle" })) -- Open the window in fullscreen
hl.bind(mainMod .. " + M", hl.dsp.window.fullscreen({ mode = "maximized", action = "toggle" })) -- Maximize window
hl.bind(mainMod .. " + A", hl.dsp.exec_cmd("ags request toggle-launcher"))
hl.bind(mainMod .. " + TAB", hl.dsp.exec_cmd("ags request toggle-launcher"))
hl.bind(mainMod .. " + P", hl.dsp.layout("swapwithmaster auto")) -- master
hl.bind(mainMod .. " + ESCAPE", hl.dsp.exec_cmd("ags request toggle-power-menu"))
hl.bind(mainMod .. " + L", hl.dsp.exec_cmd("blazinlock -s"))
hl.bind(mainMod .. " + N", hl.dsp.exec_cmd("ags request toggle-sidebar"))
hl.bind(mainMod .. " + D", hl.dsp.layout("orientationnext")) -- master
hl.bind(mainMod .. " + B", hl.dsp.exec_cmd(browser)) -- Opens the browser
hl.bind(mainMod .. " + V", hl.dsp.exec_cmd("ags request toggle-clipboard-menu"))
hl.bind(mainMod .. " + SHIFT + A", hl.dsp.exec_cmd("~/.local/bin/ags-reload")) -- Reload AGS
hl.bind(mainMod .. " + SHIFT + R", hl.dsp.exec_cmd("~/.local/bin/reload-hyprland")) -- Reload Hyprland config
hl.bind(mainMod .. " + SHIFT + W", hl.dsp.exec_cmd("ags request toggle-wallpaper-menu"))
hl.bind("ALT + TAB", dispatch("cyclenext")) -- Change focus to another window

-- Move the active window with keyboard only
-- These four bindings use vim-style navigation keys (h/j/k/l).
hl.bind(mainMod .. " + ALT + h", hl.dsp.layout("swapprev")) -- Move window left
hl.bind(mainMod .. " + ALT + l", hl.dsp.layout("swapnext")) -- Move window right
hl.bind(mainMod .. " + ALT + k", hl.dsp.layout("swapwithmaster auto")) -- Move window up
hl.bind(mainMod .. " + ALT + j", hl.dsp.layout("swapnext")) -- Move window down
-- Arrow-key equivalents for the same move-window actions.
hl.bind(mainMod .. " + ALT + left", hl.dsp.layout("swapprev")) -- Move window left
hl.bind(mainMod .. " + ALT + right", hl.dsp.layout("swapnext")) -- Move window right
hl.bind(mainMod .. " + ALT + up", hl.dsp.layout("swapwithmaster auto")) -- Move window up
hl.bind(mainMod .. " + ALT + down", hl.dsp.layout("swapnext")) -- Move window down

-- Master layout helpers
hl.bind(mainMod .. " + COMMA", hl.dsp.layout("focusmaster auto"))
hl.bind(mainMod .. " + PERIOD", hl.dsp.layout("cyclenext"))
hl.bind(mainMod .. " + SHIFT + PERIOD", hl.dsp.layout("cycleprev"))

-- Screenshot binds
hl.bind(mainMod .. " + S", hl.dsp.exec_cmd("ags request toggle-screenshot-menu"))

-- Audio controls
hl.bind(
	"XF86AudioRaiseVolume",
	hl.dsp.exec_cmd("wpctl set-volume -l 1.5 @DEFAULT_AUDIO_SINK@ 5%+"),
	{ locked = true, repeating = true }
) -- Increase volume by 5%
hl.bind(
	"XF86AudioLowerVolume",
	hl.dsp.exec_cmd("wpctl set-volume @DEFAULT_AUDIO_SINK@ 5%-"),
	{ locked = true, repeating = true }
) -- Decrease volume by 5%

hl.bind(
	"XF86AudioMute",
	hl.dsp.exec_cmd("wpctl set-mute @DEFAULT_AUDIO_SINK@ toggle"),
	{ locked = true, repeating = true }
) -- Toggle audio mute
hl.bind(
	"XF86AudioMicMute",
	hl.dsp.exec_cmd("wpctl set-mute @DEFAULT_AUDIO_SOURCE@ toggle"),
	{ locked = true, repeating = true }
) -- Toggle microphone mute

-- Brightness controls
hl.bind("XF86MonBrightnessUp", hl.dsp.exec_cmd("brightnessctl set +5%"), { locked = true, repeating = true }) -- Increase screen brightness by 5%
hl.bind("XF86MonBrightnessDown", hl.dsp.exec_cmd("brightnessctl set 5%-"), { locked = true, repeating = true }) -- Decrease screen brightness by 5%

-- Network toggle
hl.bind("XF86WLAN", hl.dsp.exec_cmd("nmcli radio wifi toggle"), { locked = true }) -- Toggle WiFi on/off

-- Refresh key (for browsers and some apps)
hl.bind("XF86Refresh", hl.dsp.exec_cmd("xdotool key F5"), { locked = true }) -- Simulate F5 key press for refresh

-- Media playback controls
hl.bind("XF86AudioPlay", hl.dsp.exec_cmd("playerctl play-pause"), { locked = true }) -- Play/pause media
hl.bind("XF86AudioPrev", hl.dsp.exec_cmd("playerctl previous"), { locked = true }) -- Play previous track
hl.bind("XF86AudioNext", hl.dsp.exec_cmd("playerctl next"), { locked = true }) -- Play next track

-- Move focus with mainMod + arrow keys
hl.bind(mainMod .. " + left", hl.dsp.focus({ direction = "left" })) -- Move focus left
hl.bind(mainMod .. " + right", hl.dsp.focus({ direction = "right" })) -- Move focus right
hl.bind(mainMod .. " + up", hl.dsp.focus({ direction = "up" })) -- Move focus up
hl.bind(mainMod .. " + down", hl.dsp.focus({ direction = "down" })) -- Move focus down

-- Move focus with mainMod + Vim keys (h, l, k, j)
hl.bind(mainMod .. " + h", hl.dsp.focus({ direction = "left" })) -- Move focus left
hl.bind(mainMod .. " + l", hl.dsp.focus({ direction = "right" })) -- Move focus right
hl.bind(mainMod .. " + k", hl.dsp.focus({ direction = "up" })) -- Move focus up
hl.bind(mainMod .. " + j", hl.dsp.focus({ direction = "down" })) -- Move focus down

-- Switch workspaces with mainMod + [0-9]
for i = 1, 10 do
	local key = i % 10 -- 10 maps to key 0
	hl.bind(mainMod .. " + " .. key, hl.dsp.focus({ workspace = i })) -- Switch to workspace
end

-- Move active window to a workspace with mainMod + SHIFT + [0-9]
for i = 1, 10 do
	local key = i % 10 -- 10 maps to key 0
	hl.bind(mainMod .. " + SHIFT + " .. key, hl.dsp.window.move({ workspace = i })) -- Move window to workspace
end

-- Scroll through existing workspaces with mainMod + scroll
hl.bind(mainMod .. " + mouse_down", hl.dsp.focus({ workspace = "e+1" })) -- Scroll workspaces
hl.bind(mainMod .. " + mouse_up", hl.dsp.focus({ workspace = "e-1" })) -- Scroll workspaces

-- Switch to the next workspace with mainMod + Ctrl + Right
hl.bind(mainMod .. " + CTRL + Right", hl.dsp.focus({ workspace = "+1" }))
hl.bind(mainMod .. " + CTRL + L", hl.dsp.focus({ workspace = "+1" }))
-- Switch to the previous workspace with mainMod + Ctrl + Left
hl.bind(mainMod .. " + CTRL + Left", hl.dsp.focus({ workspace = "-1" }))
hl.bind(mainMod .. " + CTRL + H", hl.dsp.focus({ workspace = "-1" }))

-- Move active window to the next workspace with mainMod + Ctrl + Shift + Right
hl.bind(mainMod .. " + CTRL + SHIFT + Right", hl.dsp.window.move({ workspace = "+1" }))
hl.bind(mainMod .. " + CTRL + SHIFT + L", hl.dsp.window.move({ workspace = "+1" }))
-- Move active window to the previous workspace with mainMod + Ctrl + Shift + Left
hl.bind(mainMod .. " + CTRL + SHIFT + Left", hl.dsp.window.move({ workspace = "-1" }))
hl.bind(mainMod .. " + CTRL + SHIFT + H", hl.dsp.window.move({ workspace = "-1" }))

-- Move/resize windows with mainMod + LMB/RMB and dragging
hl.bind(mainMod .. " + mouse:272", hl.dsp.window.drag(), { mouse = true }) -- Move window
hl.bind(mainMod .. " + mouse:273", hl.dsp.window.resize(), { mouse = true }) -- Resize window
