return {
	"nvimdev/dashboard-nvim",
	event = "VimEnter",
	config = function()
		require("dashboard").setup({
			theme = "doom",
			config = {
				header = {
					[[                                                                       ]],
					[[                                                                       ]],
					[[                                                                       ]],
					[[                                                                       ]],
					[[                                                                     ]],
					[[       ████ ██████           █████      ██                     ]],
					[[      ███████████             █████                             ]],
					[[      █████████ ███████████████████ ███   ███████████   ]],
					[[     █████████  ███    █████████████ █████ ██████████████   ]],
					[[    █████████ ██████████ █████████ █████ █████ ████ █████   ]],
					[[  ███████████ ███    ███ █████████ █████ █████ ████ █████  ]],
					[[ ██████  █████████████████████ ████ █████ █████ ████ ██████ ]],
					[[                                                                       ]],
					[[                                                                       ]],
					[[                                                                       ]],
					[[                                                                       ]],
				},
				center = {
					{
						icon = "  ",
						desc = "Create New File                 ",
						action = "enew",
						key = "n",
					},
					{
						icon = "  ",
						desc = "Find File                       ",
						action = "Telescope find_files",
						key = "f",
					},
					{
						icon = "  ",
						desc = "Recent Files                    ",
						action = "Telescope oldfiles",
						key = "r",
					},
					{
						icon = "  ",
						desc = "Bookmarks                       ",
						action = "Telescope marks",
						key = "b",
					},
					{
						icon = "  ",
						desc = "Exit                            ",
						action = "q",
						key = "q",
					},
				},
			},
		})
	end,
	dependencies = { { "nvim-tree/nvim-web-devicons" } },
}
