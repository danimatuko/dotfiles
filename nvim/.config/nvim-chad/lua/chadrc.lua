---@type ChadrcConfig
local M = {}

M.base46 = {
  theme = "catppuccin",
}

M.nvdash = {
  load_on_startup = true,
}

M.ui = {
  statusline = { -- Disable the tabline
    separator_style = "round",
  },
  tabufline = {
    enabled = false,
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
    preview = false, -- Disable preview for all pickers globally
    layout_config = {
      width = 0.4, -- Set the window width to 40% of the screen width
      height = 0.5, -- Set the height to 50% of the screen height
    },
  },
  pickers = {
    buffers = {
      mappings = {
        i = {
          ["<C-d>"] = require("telescope.actions").delete_buffer, -- Delete buffer in insert mode within buffers picker
        },
        n = {
          ["<C-d>"] = require("telescope.actions").delete_buffer, -- Delete buffer in normal mode within buffers picker
        },
      },
    },
    live_grep = {
      preview = true, -- Enable preview for live_grep picker
      layout_config = {
        width = 0.65, -- Set the width to 60% of the screen width (can adjust this value)
        height = 0.7, -- Set the height to 50% of the screen height (can adjust this value)
      },
    },
  },
}

return M
