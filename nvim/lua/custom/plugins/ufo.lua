return {
	"kevinhwang91/nvim-ufo",
	dependencies = { "kevinhwang91/promise-async" },
	event = "BufReadPost", -- Lazy load on file read
	config = function()
		-- Setup for nvim-ufo with provider selector
		require("ufo").setup({
			provider_selector = function(bufnr, filetype, buftype)
				return { "treesitter", "indent" } -- Use treesitter and indentation as providers
			end,
			fold_virt_text_handler = function(virtText, lnum, endLnum, width, truncate)
				return virtText
			end,
		})

		-- Set default folding options to not fold anything
		vim.wo.foldlevel = 99 -- Do not fold anything by default
		vim.wo.foldmethod = "manual" -- Set fold method to manual

		-- Key mappings
		vim.keymap.set("n", "zR", require("ufo").openAllFolds, { desc = "Open all folds" })
		vim.keymap.set("n", "zM", require("ufo").closeAllFolds, { desc = "Close all folds" })

		-- Custom 'K' keymap for peeking and fallback
		-- vim.keymap.set("n", "K", function()
		-- 	if not require("ufo").peekFoldedLinesUnderCursor() then
		-- 		if vim.lsp.buf.server_ready() then
		-- 			vim.lsp.buf.hover()
		-- 		else
		-- 			print("Indentation level: " .. vim.fn.indent(vim.fn.line(".")))
		-- 		end
		-- 	end
		-- end, { desc = "Peek fold or show LSP hover or indentation" })
	end,
}
