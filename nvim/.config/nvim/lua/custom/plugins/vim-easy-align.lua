return {
	"junegunn/vim-easy-align",
	lazy = true, -- Lazy load the plugin
	ft = "php", -- Load only for PHP files
	config = function()
		-- Autocommand to run :%EasyAlign /=>/ on save for PHP files
		vim.api.nvim_create_autocmd("BufWritePre", {
			pattern = "*.php", -- Target only PHP files
			callback = function()
				vim.cmd("%EasyAlign /=>/")
			end,
		})
		-- Keymap for aligning visually selected `=` signs
		vim.api.nvim_set_keymap("x", "ga=", "<Plug>(EasyAlign)=", {})
	end,
}
