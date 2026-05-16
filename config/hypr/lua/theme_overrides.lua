local home = os.getenv("HOME")

if not home then
  return
end

local themeLuaPath = home .. "/.cache/current-theme/hyprland.lua"

pcall(dofile, themeLuaPath)
