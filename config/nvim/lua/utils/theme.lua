-- Reads the current theme name from:
--   ~/.cache/current-theme/astrovim.txt
--
-- Some system theme names don’t match Neovim colorscheme names,
-- so we translate them using a small alias map.

local M = {}

local theme_file = vim.fn.expand "~/.cache/current-theme/astrovim.txt"

-- Global theme name → Neovim colorscheme name
local theme_aliases = {
  ["tokyonight"] = "tokyodark",
}

function M.get_theme()
  local f = io.open(theme_file, "r")
  if not f then return "astrodark" end

  local name = f:read "*l"
  f:close()

  if not name or name == "" then return "astrodark" end

  return theme_aliases[name] or name
end

return M
