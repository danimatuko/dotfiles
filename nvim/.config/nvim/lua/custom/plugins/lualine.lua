return {
	{
		"nvim-lualine/lualine.nvim",
		dependencies = { "nvim-tree/nvim-web-devicons" },
		config = function()
			local separator = { "▏", color = "StatusLineNonText" }

			require("lualine").setup({
				options = {
					icons_enabled = true,
					theme = "auto",
					section_separators = " ",
					component_separators = { left = "▏", right = "▏" },

					globalstatus = true,
				},
				sections = {
					lualine_a = {
						"mode",
						separator,
					},
					lualine_b = {
						"branch",
						"diff",
						separator,
						'"🖧  " .. tostring(#vim.tbl_keys(vim.lsp.buf_get_clients()))',
						{ "diagnostics", sources = { "nvim_diagnostic" } },
						separator,
					},
					lualine_c = {
						"filename",
					},
					lualine_x = {
						"filetype",
						"encoding",
						"fileformat",
					},
					lualine_y = {
						separator,
						'(vim.bo.expandtab and "␠ " or "⇥ ") .. " " .. vim.bo.shiftwidth',
						separator,
					},
					lualine_z = {
						"location",
						"progress",
					},
				},
			})
		end,
	},
}
