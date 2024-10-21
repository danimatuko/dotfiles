local ls = require("luasnip")
local s = ls.snippet
local t = ls.text_node
local i = ls.insert_node

ls.add_snippets("json", {
	s("wpblock", {
		t({
			"{",
			'  "$schema": "https://schemas.wp.org/trunk/block.json",',
			'  "apiVersion": ',
		}),
		i(1, "3"),
		t({ ",", '  "title": "' }),
		i(2, "Title Here"),
		t({ '",', '  "name": "' }),
		i(3, "namespace/blockname"),
		t({ '",', '  "category": "' }),
		i(4, "Category Here"),
		t({ '",', '  "icon": "' }),
		i(5, "icon-name"),
		t({ '",', '  "description": "' }),
		i(6, "Description Here"),
		t({ '",', '  "keywords": [] ,' }),
		t({ '  "version": "' }),
		i(7, "1"),
		t({ '",', '  "textdomain": "' }),
		i(8, "text-domain-here"),
		t({ '",', '  "editorScript": "' }),
		i(9, "file:./index.js"),
		t({ '",', '  "style": "' }),
		i(10, "file:./index.css"),
		t({ '",', '  "attributes": {}', "}" }),
	}),
})
