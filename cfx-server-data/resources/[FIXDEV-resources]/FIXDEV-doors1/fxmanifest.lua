





fx_version 'cerulean'

games {
    'gta5',
    'rdr3'
}

client_scripts {
  '@FIXDEV-lib/client/cl_rpc.lua',
  '@FIXDEV-lib/client/cl_ui.lua',
  '@FIXDEV-lib/client/cl_polyhooks.lua',
	'client/cl_*.lua'
}

shared_scripts {
  '@FIXDEV-lib/shared/sh_util.lua',
	"shared/*.lua"
}

server_scripts {
  '@FIXDEV-lib/server/sv_rpc.lua',
  '@FIXDEV-lib/server/sv_sql.lua',
	'server/*.lua'
}