return {
	-- Blade syntax highlighting plugin
	"jwalton512/vim-blade",
	ft = "blade", -- lazy load only for blade files
	config = function()
		vim.cmd([[
            " Ensure .blade.php files are recognized
            autocmd BufNewFile,BufRead *.blade.php set filetype=blade
        ]])
	end,
}
