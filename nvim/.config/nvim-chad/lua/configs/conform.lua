local options = {
  formatters_by_ft = {
    lua = { "stylua" },
    css = { "prettier" },
    html = { "prettier" },
    php = { "phpcbf" }, -- Use phpcbf for PHP files
    js = { "prettier" },
  },

  format_on_save = {
    -- These options will be passed to conform.format()
    timeout_ms = 500,
    lsp_fallback = true,
  },
  formatters = {
    ["phpcbf"] = {
      command = "/home/danimatuko/.config/composer/vendor/bin/phpcbf",
      args = {
        "--standard=WordPress", -- Use WordPress coding standards
        "$FILENAME",
      },
      stdin = false,
    },
  },
  notify_on_error = true,
}

return options
