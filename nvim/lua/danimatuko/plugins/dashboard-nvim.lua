
local dashboard = require('dashboard')

dashboard.setup({
  theme = 'doom', -- Optional: You can set the theme here
  config = {
    header = {
      '',
      ' $$\\   $$\\ $$$$$$$$\\  $$$$$$\\  $$\\    $$\\ $$$$$$\\ $$\\      $$\\ ',
      ' $$ |  $$ |$$  _____|$$  __$$\\ $$ |   $$ |\\_$$  _|$$$\\    $$$ |',
      ' $$ |\\ $$ |$$ |      $$ /  $$ |$$ |   $$ |  $$ |  $$$$\\  $$$$ |',
      ' $$ $$\\$$ |$$$$$\\    $$ |  $$ |\\$$\\  $$  |  $$ |  $$\\$$\\$$ $$ |',
      ' $$ \\$$$$ |$$  __|   $$ |  $$ | \\$$\\$$  /   $$ |  $$ \\$$$  $$ |',
      ' $$ |\\$$$ |$$ |      $$ |  $$ |  \\$$$  /    $$ |  $$ |\\$  /$$ |',
      ' $$ | \\$$ |$$$$$$$$\\  $$$$$$  |   \\$  /   $$$$$$\\ $$ | \\_/ $$ |',
      ' \\__|  \\__|\\________| \\______/     \\_/    \\______|\\__|     \\__|',
      '',
      '           [ Welcome to Neovim ]            ',
      '',
    },
    center = {
      { icon = '  ', desc = 'New file                       ', action = 'enew' },
      { icon = '  ', desc = 'Find file                 ', action = 'Telescope find_files', shortcut = 'SPC f' },
      { icon = '  ', desc = 'Recent files              ', action = 'Telescope oldfiles', shortcut = 'SPC h' },
      { icon = '  ', desc = 'Find Word                 ', action = 'Telescope live_grep', shortcut = 'SPC g' },
    },
    footer = { 'Enjoy coding with Neovim!' },
  },
})
-- Highlight settings (mostly unchanged)
vim.api.nvim_set_hl(0, 'DashboardHeader', { fg = '#6272a4' })
vim.api.nvim_set_hl(0, 'DashboardCenter', { fg = '#f8f8f2' })
vim.api.nvim_set_hl(0, 'DashboardShortcut', { fg = '#bd93f9' })
vim.api.nvim_set_hl(0, 'DashboardFooter', { fg = '#6272a4' })

