return {
  -- add gruvbox
  { "ellisonleao/gruvbox.nvim" },
  { "neanias/everforest-nvim" },
  -- Configure LazyVim to load gruvbox
  {
    "LazyVim/LazyVim",
    opts = {
      colorscheme = "everforest",
    },
  },
}
