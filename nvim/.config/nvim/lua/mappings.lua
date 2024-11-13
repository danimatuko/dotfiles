require "nvchad.mappings"

local map = vim.keymap.set

map("n", ";", ":", { desc = "CMD enter command mode" })
map("i", "jk", "<ESC>")

-- map({ "n", "i", "v" }, "<C-s>", "<cmd> w <cr>")

------------
-- custom
------------

-- Map to yank around all (copy the entire file to clipboard)
map("n", "y.", 'ggVG"+y', { desc = "Yank entire file to clipboard" })

-- Map to select all text in the file (visual mode)
map("n", "v.", "ggVG", { desc = "Select entire file" })
