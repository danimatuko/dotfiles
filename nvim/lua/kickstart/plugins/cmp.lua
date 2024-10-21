return {
	{ -- Autocompletion plugin setup
		"hrsh7th/nvim-cmp", -- Main autocompletion plugin
		event = "InsertEnter", -- Load the plugin when entering Insert mode
		dependencies = {
			{
				"L3MON4D3/LuaSnip", -- Snippet engine for LuaSnip
				{
					-- Load custom snippets from the specified Lua file path
					require("luasnip.loaders.from_lua").load({
						paths = { os.getenv("HOME") .. "/.config/nvim/lua/custom/snippets" },
					}),
				},
				build = (function()
					-- Build step for enabling regex support in snippets
					-- Not supported in many Windows environments
					if vim.fn.has("win32") == 1 or vim.fn.executable("make") == 0 then
						return
					end
					return "make install_jsregexp" -- Run build command
				end)(),
				dependencies = {
					{
						"rafamadriz/friendly-snippets", -- Repository with premade snippets
						config = function()
							-- Load snippets from the friendly-snippets repository
							require("luasnip.loaders.from_vscode").lazy_load()
						end,
					},
				},
			},
			"saadparwaiz1/cmp_luasnip", -- Source for snippet completions

			-- Other completion sources for different contexts
			"hrsh7th/cmp-nvim-lsp", -- LSP completions
			"hrsh7th/cmp-path", -- Path completions
			"hrsh7th/cmp-nvim-lsp-signature-help", -- LSP signature help
			"hrsh7th/cmp-buffer", -- Buffer completions
			"onsails/lspkind-nvim", -- Icons for LSP completions
		},
		config = function()
			local cmp = require("cmp") -- Load the nvim-cmp module
			local luasnip = require("luasnip") -- Load the LuaSnip module
			luasnip.config.setup({}) -- Configure LuaSnip (default settings)

			cmp.setup({
				snippet = {
					-- Function to expand snippets
					expand = function(args)
						luasnip.lsp_expand(args.body) -- Use LuaSnip to expand the snippet
					end,
				},
				completion = { completeopt = "menu,menuone,noinsert" }, -- Completion options

				mapping = {
					["<CR>"] = cmp.mapping.confirm({ select = true }), -- Confirm selection with Enter
					["<Tab>"] = cmp.mapping(function(fallback)
						-- Expand snippet or select next item
						if luasnip.expand_or_locally_jumpable() then
							luasnip.expand_or_jump() -- Expand or jump in snippet
						elseif cmp.visible() then
							cmp.select_next_item() -- Select the next completion item
						else
							fallback() -- Default Tab behavior (insert a tab)
						end
					end, { "i", "s" }), -- Applies to insert and select modes

					["<S-Tab>"] = cmp.mapping(function(fallback)
						-- Jump backward in snippets or select previous item
						if luasnip.jumpable(-1) then
							luasnip.jump(-1) -- Jump to previous snippet node
						else
							cmp.select_prev_item() -- Select the previous completion item
						end
					end, { "i", "s" }), -- Applies to insert and select modes

					["<C-b>"] = cmp.mapping.scroll_docs(-4), -- Scroll documentation up
					["<C-f>"] = cmp.mapping.scroll_docs(4), -- Scroll documentation down
					["<C-Space>"] = cmp.mapping.complete({}), -- Trigger completion manually
				},
				sources = {
					{ name = "luasnip" }, -- Snippet completions
					{ name = "nvim_lsp" }, -- LSP completions
					{ name = "buffer" }, -- Buffer completions
					{ name = "path" }, -- Path completions
					{ name = "nvim_lsp_signature_help" }, -- LSP signature help completions
				},
			})
		end,
	},
}
-- vim: ts=2 sts=2 sw=2 et -- Formatting settings for Vim
