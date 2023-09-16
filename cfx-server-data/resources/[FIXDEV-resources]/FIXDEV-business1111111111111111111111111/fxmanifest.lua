fx_version 'cerulean'
games { 'gta5' }

shared_script "@mka-array/Array.lua"

client_scripts {
    '@FIXDEV-lib/client/cl_rpc.lua',
    '@FIXDEV-lib/client/cl_ui.lua',
	'@FIXDEV-lib/client/cl_interface.lua',
    '@FIXDEV-errorlog/client/cl_errorlog.lua',
    'client/cl_*.lua',
}

shared_script {
    '@FIXDEV-lib/shared/sh_util.lua',
}

server_scripts {
    '@FIXDEV-lib/server/sv_rpc.lua',
    '@FIXDEV-lib/server/sv_sql.lua',
    'server/sv_*.lua',
}