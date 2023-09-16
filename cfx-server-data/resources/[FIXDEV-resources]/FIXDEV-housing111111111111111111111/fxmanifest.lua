fx_version "cerulean"
games { "gta5" }

client_script "@FIXDEV-lib/client/cl_interface.lua"

shared_scripts {
	"@FIXDEV-lib/shared/sh_util.lua",
	"shared/*",
}

server_scripts {
	"@oxmysql/lib/MySQL.lua",
	"@FIXDEV-lib/server/sv_rpc.lua",
    "server/*",
}

client_scripts {
	'@FIXDEV-lib/client/cl_ui.lua',
	"@FIXDEV-lib/client/cl_rpc.lua",
	"client/*",
}