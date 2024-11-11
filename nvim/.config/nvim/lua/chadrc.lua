---@type ChadrcConfig
local M = {}

M.base46 = {
  theme = "catppuccin",
}

M.nvdash = {
  load_on_startup = true,
}

M.ui = {
  statusline = {
    separator_style = "round",
  },
}

require("telescope").setup {
  defaults = {
    file_ignore_patterns = {
      "%.git/", -- Ignore .git
      "node_modules/", -- Ignore node_modules
      "%.lock", -- Ignore lock files
      "dist/", -- Ignore dist folders
      "build/", -- Ignore build folders
    },
  },
}

return M
