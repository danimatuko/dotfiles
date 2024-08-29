return {
	"akinsho/toggleterm.nvim",
	version = "*",
	config = function()
		require("toggleterm").setup({
			-- Your configuration options go here
			open_mapping = [[<c-\>]],
		})
	end,
}
