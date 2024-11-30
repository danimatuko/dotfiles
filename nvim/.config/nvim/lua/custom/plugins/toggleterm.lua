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
		local lazygit = Terminal:new({ cmd = "lazygit", hidden = true })

		-- Function to toggle the lazygit terminal
		function _lazygit_toggle()
			lazygit:toggle()
		end

		-- Key mapping for lazygit toggle using leader key
		vim.api.nvim_set_keymap("n", "<leader>g", "<cmd>lua _lazygit_toggle()<CR>", { noremap = true, silent = true })

		-- Key mappings for terminal splits using leader key
		vim.api.nvim_set_keymap(
			"n",
			"<leader>h",
			"<cmd>ToggleTerm direction=horizontal<CR>",
			{ noremap = true, silent = true }
		)

		vim.api.nvim_set_keymap(
			"n",
			"<leader>v",
			"<cmd>ToggleTerm direction=vertical size=70<CR>",
			{ noremap = true, silent = true }
		) -- Wider vertical split

		vim.api.nvim_set_keymap(
			"n",
			"<leader>f",
			"<cmd>ToggleTerm direction=float<CR>",
			{ noremap = true, silent = true }
		)
	end,
}
