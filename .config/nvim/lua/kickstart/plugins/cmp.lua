return {
	{ -- Autocompletion plugin setup
		"hrsh7th/nvim-cmp",
		event = "InsertEnter", -- Load nvim-cmp when entering insert mode
		dependencies = {
			{ -- Snippet Engine and its dependencies
				"L3MON4D3/LuaSnip",
				build = (function()
					-- Build step for regex support in snippets.
					-- Disabled on Windows or if 'make' is not available.
					if vim.fn.has("win32") == 1 or vim.fn.executable("make") == 0 then
						return
					end
					return "make install_jsregexp"
				end)(),
				dependencies = {
					{ -- Pre-made snippets collection
						"rafamadriz/friendly-snippets",
						config = function()
							-- Load VSCode-style snippets from `friendly-snippets`
							require("luasnip.loaders.from_vscode").lazy_load()
						end,
					},
				},
			},
			"saadparwaiz1/cmp_luasnip", -- Source for LuaSnip completion
			"hrsh7th/cmp-nvim-lsp", -- LSP source for nvim-cmp
			"hrsh7th/cmp-path", -- Path completion source
			"hrsh7th/cmp-buffer",
		},
		config = function()
			local cmp = require("cmp")
			local luasnip = require("luasnip")
			luasnip.config.setup({}) -- Setup LuaSnip configuration

			-- Load custom snippets from the specified directory
			require("luasnip.loaders.from_lua").load({ paths = { "~/.config/nvim/lua/custom/snippets" } })

			cmp.setup({
				snippet = {
					-- Function to expand snippets
					expand = function(args)
						luasnip.lsp_expand(args.body)
					end,
				},
				completion = { completeopt = "menu,menuone,noinsert" }, -- Completion options
				mapping = cmp.mapping.preset.insert({
					["<C-n>"] = cmp.mapping.select_next_item(), -- Next completion item
					["<C-p>"] = cmp.mapping.select_prev_item(), -- Previous completion item
					["<C-b>"] = cmp.mapping.scroll_docs(-4), -- Scroll documentation up
					["<C-f>"] = cmp.mapping.scroll_docs(4), -- Scroll documentation down
					["<C-y>"] = cmp.mapping.confirm({ select = true }), -- Accept completion
					["<CR>"] = cmp.mapping.confirm({ select = true }), -- Confirm on Enter
					["<C-Space>"] = cmp.mapping.complete({}), -- Manually trigger completion

					-- Tab to select next item or expand/jump in snippets
					["<Tab>"] = cmp.mapping(function(fallback)
						if cmp.visible() then
							cmp.select_next_item()
						elseif luasnip.expand_or_jumpable() then
							luasnip.expand_or_jump()
						else
							fallback()
						end
					end, { "i", "s" }),

					-- Shift-Tab to select previous item or jump backwards in snippets
					["<S-Tab>"] = cmp.mapping(function(fallback)
						if cmp.visible() then
							cmp.select_prev_item()
						elseif luasnip.jumpable(-1) then
							luasnip.jump(-1)
						else
							fallback()
						end
					end, { "i", "s" }),
				}),
				-- Completion sources
				sources = {
					{ name = "nvim_lsp" }, -- LSP completions
					{ name = "luasnip" }, -- Snippet completions
					{ name = "path" }, -- File path completions
					{ name = "buffer" },
					{ name = "spell" },
					{ name = "nvim_lsp_signature_help" },
				},
			})
		end,
	},
}
