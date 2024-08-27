-- Terminal management plugin
return {
	"akinsho/toggleterm.nvim",
	tag = "v2.12.0", -- Specify a stable version
	config = function()
		require("toggleterm").setup({
			size = 15, -- This parameter is not used with float direction, kept for reference
			open_mapping = [[<C-\>]], -- Key mapping to open/close terminal
			direction = "float", -- Set direction to float
			shade_terminals = true,
			start_in_insert = true,
			float_opts = {
				border = "rounded", -- Border style
				winblend = 3, -- Transparency level (0-100)
				width = 100, -- Width of the floating terminal
				height = 20, -- Height of the floating terminal
				highlights = {
					border = "Normal", -- Highlight group for the border
					background = "Normal", -- Highlight group for the background
				},
			},
		})
	end,
}
