





fx_version('bodacious')
game('gta5')

client_scripts {
	'@FIXDEV-lib/client/cl_rpc.lua',
    'config.lua',
	'client/*.lua',
}

server_scripts {
	'@FIXDEV-lib/server/sv_rpc.lua',
    'config.lua',
	'server/*.lua',
}


