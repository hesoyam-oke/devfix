





fx_version 'cerulean'
games { 'gta5' }


ui_page 'html/ui.html'


files {
	'html/ui.html',
  'html/css2.css',
  'html/main.0355962e.chunk.css',
  'html/fonts/*.ttf',
	'html/*.js'
}

client_script "@FIXDEV-lib/client/cl_ui.lua"

client_scripts {
  '@FIXDEV-lib/client/cl_rpc.lua',

  'client/cl_*.lua',
  "@PolyZone/client.lua",
  "@PolyZone/ComboZone.lua",
}

shared_script {
  'shared/sh_*.*',
}

server_scripts {
  '@FIXDEV-lib/server/sv_rpc.lua',
  'server/sv_*.lua',
}
