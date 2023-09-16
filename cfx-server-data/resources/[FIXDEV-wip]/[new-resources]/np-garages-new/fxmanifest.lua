





fx_version 'bodacious'
games { 'rdr3', 'gta5' }

resource_manifest_version '05cfa83c-a124-4cfa-a768-c24a5811d8f9'

server_scripts {
	'@FIXDEV-lib/server/sv_rpc.lua',
	'server/sv_*.lua'
}

client_scripts {
	'@FIXDEV-lib/client/cl_rpc.lua',
	'client/cl_*.lua'
}

shared_scripts {
	'shared/sh_*.lua'
}