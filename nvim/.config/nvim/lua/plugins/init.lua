return {
  {
    "stevearc/conform.nvim",
    event = "BufWritePre", -- for format on save
    opts = require "configs.conform",
  },

  {
    "neovim/nvim-lspconfig",
    config = function()
      require "configs.lspconfig"
    end,
  },

  {
    "nvim-treesitter/nvim-treesitter",
    opts = {
      ensure_installed = {
        "vim",
        "lua",
        "vimdoc",
        "html",
        "css",
      },
    },
  },
  {
    "mfussenegger/nvim-lint",
    config = function()
      require("lint").linters_by_ft = {
        lua = { "luacheck" },
        typescript = { "eslint" },
        javascript = { "eslint" },
        -- Add other linters for other filetypes as necessary
      }
    end,
  },
}
