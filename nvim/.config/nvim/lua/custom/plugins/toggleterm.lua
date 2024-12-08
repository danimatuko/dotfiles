return {
	"akinsho/toggleterm.nvim",
	version = "*",
	config = function()
		-- Configure toggleterm
		require("toggleterm").setup({
			direction = "float", -- Default direction for the terminal
			size = 20, -- Terminal size (applies to non-vertical splits)
			hide_numbers = true, -- Hide line numbers in terminal for cleaner UI
			shade_terminals = true, -- Enable shading for terminals
			start_in_insert = true, -- Always start in insert mode
			insert_mappings = true, -- Enable insert mappings inside terminal
			persist_size = true, -- Persist terminal size
			close_on_exit = true, -- Close terminal when exit
			shade_filetypes = {},
			float_opts = {
				border = "rounded", -- Set rounded corners for the floating terminal
			},
		})

		-- Create a custom terminal for lazygit
		local Terminal = require("toggleterm.terminal").Terminal
		local lazygit = Terminal:new({
			cmd = "lazygit",
			hidden = true,
			start_in_insert = true, -- Start in insert mode for lazygit
			direction = "float",
		})

		-- Function to toggle the lazygit terminal
		function _lazygit_toggle()
			lazygit:toggle()
		end

		-- Use Alt key instead of leader key for key mappings
		vim.keymap.set("n", "<A-g>", _lazygit_toggle, { noremap = true, silent = true })
		vim.keymap.set("n", "<A-h>", "<cmd>ToggleTerm direction=horizontal<CR>", { noremap = true, silent = true })
		vim.keymap.set(
			"n",
			"<A-v>",
			"<cmd>ToggleTerm direction=vertical size=70<CR>",
			{ noremap = true, silent = true }
		)

		-- Close terminal with Alt + q in terminal mode
		vim.keymap.set("t", "<A-q>", "<C-\\><C-n>:q<CR>", { noremap = true, silent = true })

		-- Ensure terminal starts in insert mode and closes with Esc in any mode
		vim.keymap.set("t", "<Esc>", "<C-\\><C-n>:q<CR>", { noremap = true, silent = true })

		-- Toggle terminal with Alt + t (toggle between opening and closing the terminal)
		vim.keymap.set("n", "<A-t>", "<cmd>ToggleTerm<CR>", { noremap = true, silent = true })
	end,
}
