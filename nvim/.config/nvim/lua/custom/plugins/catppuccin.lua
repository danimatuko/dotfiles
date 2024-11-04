return {
	{
		"catppuccin/nvim",
		name = "catppuccin",
		config = function()
			require("catppuccin").setup({
				flavour = "mocha", -- Options: latte, frappe, macchiato, mocha
			})
			vim.cmd.colorscheme("catppuccin")
		end,
	},
}
