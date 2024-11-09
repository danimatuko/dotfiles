require "nvchad.options"

-- add yours here!

local o = vim.o
o.cursorlineopt = "both" -- to enable cursorline!
vim.opt.cmdheight = 0
-- Configure tabs and indentation: use 4 spaces per tab, replace tabs with spaces, and enable smart indentation
vim.opt.expandtab = true
vim.opt.shiftwidth = 4
vim.opt.tabstop = 4
vim.opt.softtabstop = 4
vim.opt.smartindent = true
