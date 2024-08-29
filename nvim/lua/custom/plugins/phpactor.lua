return {
	"phpactor/phpactor",
	ft = "php",
	build = function()
		-- Navigate to the plugin directory and run `composer install`
		vim.fn.system({
			"composer",
			"install",
			"--no-dev",
			"-o",
		})
	end,
}
