fx_version "cerulean"

games {"gta5"}



server_scripts {
	'@FIXDEV-lib/server/sv_rpc.lua',
	"server/*.lua",
}

client_scripts {
	'@FIXDEV-lib/client/cl_rpc.lua',
	"client/*.lua",
}
