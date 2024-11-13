local configs = require "nvchad.configs.lspconfig"

local servers = {
  html = {},
  cssls = {},
  bashls = {},
  emmet_ls = {},
  lua_ls = {},
  ts_ls = {},
  jsonls = {},
  intelephense = {
    root_dir = function()
      -- Always use the current directory as the root for PHP files
      return vim.fn.getcwd()
    end,
    settings = {
      intelephense = {
        -- stylua: ignore
        stubs = {
          "apache", "bcmath", "bz2", "calendar", "com_dotnet", "Core", "ctype", "curl", "date", "dba",
          "dom", "enchant", "exif", "FFI", "fileinfo", "filter", "fpm", "ftp", "gd", "gettext", "gmp",
          "hash", "iconv", "imap", "intl", "json", "ldap", "libxml", "mbstring", "meta", "mysqli", "oci8",
          "odbc", "openssl", "pcntl", "pcre", "PDO", "pdo_ibm", "pdo_mysql", "pdo_pgsql", "pdo_sqlite",
          "pgsql", "Phar", "posix", "pspell", "readline", "Reflection", "session", "shmop", "SimpleXML",
          "snmp", "soap", "sockets", "sodium", "SPL", "sqlite3", "standard", "superglobals", "sysvmsg",
          "sysvsem", "sysvshm", "tidy", "tokenizer", "xml", "xmlreader", "xmlrpc", "xmlwriter", "xsl",
          "Zend OPcache", "zip", "zlib", "wordpress",
        },
      },
    },
  },
}

for name, opts in pairs(servers) do
  opts.on_init = configs.on_init
  opts.on_attach = configs.on_attach
  opts.capabilities = configs.capabilities

  require("lspconfig")[name].setup(opts)
end
