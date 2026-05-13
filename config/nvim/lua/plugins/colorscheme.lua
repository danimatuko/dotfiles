local theme_spec = vim.fn.expand "~/.cache/current-theme/neovim.lua"

if vim.uv.fs_stat(theme_spec) then return dofile(theme_spec) end

return {
  {
    "LazyVim/LazyVim",
    opts = {
      colorscheme = "everforest",
    },
  },
}
