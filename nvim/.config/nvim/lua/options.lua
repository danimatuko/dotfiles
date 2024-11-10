require "nvchad.options"

-- add yours here!

local o = vim.o
o.cursorlineopt = "both" -- to enable cursorline!

-- Set command-line height to 0, hiding it by default to maximize screen space;
-- it will temporarily appear when needed (e.g., for messages or commands).
vim.opt.cmdheight = 0
vim.opt.cmdheight = 0
-- Configure tabs and indentation: use 4 spaces per tab, replace tabs with spaces, and enable smart indentation
vim.opt.expandtab = true
vim.opt.shiftwidth = 4
vim.opt.tabstop = 4
vim.opt.softtabstop = 4
vim.opt.smartindent = true

-- Minimal number of screen lines to keep above and below the cursor.
vim.opt.scrolloff = 10

-- Highlight on yank
vim.api.nvim_create_autocmd("TextYankPost", {
  group = vim.api.nvim_create_augroup("YankHighlight", { clear = true }),
  callback = function()
    vim.highlight.on_yank {
      higroup = "IncSearch", -- You can change this to any highlight group you prefer
      timeout = 200, -- Duration in milliseconds
    }
  end,
})
