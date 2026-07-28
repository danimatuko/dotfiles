return {
	{
		"ellisonleao/gruvbox.nvim",
		init = function()
			vim.o.background = "dark"
		end,
	},
	{
		"LazyVim/LazyVim",
		opts = {
			colorscheme = "gruvbox",
		},
	},
}
