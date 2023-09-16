fx_version 'cerulean'
game 'gta5'

description 'Clothing'

ui_page 'nui/index.html'

shared_scripts  {
	'@FIXDEV-lib/shared/sh_util.lua',
	'shared/sh_*.lua'
}

server_scripts {
	'@FIXDEV-lib/server/sv_rpc.lua',
	'@oxmysql/lib/MySQL.lua',
	'@FIXDEV-lib/server/sv_rpc.lua',
	'server/sv_*.lua'
}

client_scripts {
	'@FIXDEV-lib/client/cl_interface.lua',
	'@FIXDEV-errorlog/client/cl_errorlog.lua',
	'@FIXDEV-lib/client/cl_rpc.lua',
	'@FIXDEV-lib/client/cl_ui.lua',
    '@PolyZone/client.lua',
	'@PolyZone/BoxZone.lua',
	'@PolyZone/ComboZone.lua',
	'@FIXDEV-lib/client/cl_rpc.lua',
    'client/cl_*.lua'
}
files {
	'nui/index.html',
	'nui/css/*.css',
	'nui/js/**.js',
	'nui/img/*.png'
}

lua54 'yes'