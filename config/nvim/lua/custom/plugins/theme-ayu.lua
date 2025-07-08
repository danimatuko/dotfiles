return {
	"Shatur/neovim-ayu",
	priority = 1000,
	config = function()
		require("ayu").setup({
			mirage = false, -- Use Ayu Light theme, set to true for Ayu Dark
		})
		vim.cmd("colorscheme ayu")
	end,
}
