return {
	"nvim-neo-tree/neo-tree.nvim",
	version = "*",
	dependencies = {
		"nvim-lua/plenary.nvim",
		"nvim-tree/nvim-web-devicons", -- not strictly required, but recommended
		"MunifTanjim/nui.nvim",
	},
	cmd = "Neotree",
	keys = {
		{ "<leader>e", ":Neotree toggle reveal<CR>", desc = "Toggle NeoTree (reveal current buffer)", silent = true },
	},
	opts = {
		filesystem = {
			follow_current_file = true, -- Highlight and focus on the current file
			hijack_netrw = true, -- Replace netrw with Neo-tree
			window = {
				mappings = {},
			},
		},
	},
}
