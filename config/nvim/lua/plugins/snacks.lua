return {
  "folke/snacks.nvim",
  opts = function(_, opts)
    opts.dashboard = opts.dashboard or {}
    opts.dashboard.preset = opts.dashboard.preset or {}
    opts.dashboard.preset.keys = opts.dashboard.preset.keys or {}

    -- Projects key
    table.insert(opts.dashboard.preset.keys, 3, {
      key = "p",
      desc = "Projects",
      icon = " ",
      format = {
        desc_padding = 43,
        key_format = "  %s",
      },
      -- stylua: ignore start
      action = function()
        require("snacks").picker.projects({
          layout = { preset = "vscode" },
        })
      end,
      -- stylua: ignore end
    })

    -- Default picker layout for everything else
    opts.picker = opts.picker or {}
    opts.picker.layout = opts.picker.layout or {}
    opts.picker.layout.preset = "sidebar"

    return opts
  end,
}
