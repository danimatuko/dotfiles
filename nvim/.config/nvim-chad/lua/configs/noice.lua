return {
  "folke/noice.nvim",
  event = "VeryLazy",
  opts = {
    -- Disable all features except the command-line replacement
    cmdline = {
      enabled = true, -- Enable the command line UI
    },
    messages = {
      enabled = false, -- Disable messages
    },
    notify = {
      enabled = false, -- Disable notifications
    },
    lsp = {
      progress = { enabled = false }, -- Disable LSP progress messages
      override = {}, -- No overrides
    },
    routes = {}, -- No custom routes
    health = {
      checker = false, -- Disable health checks
    },
    presets = {
      bottom_search = false, -- Disable bottom search
      command_palette = true, -- Keep command palette functionality
      long_message_to_split = false, -- Disable long messages
    },
  },
  config = function(_, opts)
    require("noice").setup(opts)
  end,
  dependencies = {
    "MunifTanjim/nui.nvim",
  },
}
