return {
	{
		"bluz71/vim-moonfly-colors", -- Plugin repository
		priority = 1000, -- Load this plugin first (important for colorschemes)
		config = function()
			-- Load the colorscheme here
			vim.cmd([[colorscheme moonfly]])
		end,
	},
}
