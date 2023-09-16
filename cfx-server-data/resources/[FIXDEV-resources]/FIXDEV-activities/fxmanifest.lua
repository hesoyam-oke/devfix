fx_version 'adamant'
games { 'gta5' }

client_script {
    '@FIXDEV-lib/client/cl_rpc.lua',
	'@FIXDEV-lib/client/cl_ui.lua',
	'@FIXDEV-lib/client/cl_interface.lua',
    '@FIXDEV-lib/client/cl_ui.js',
    'client/cl_*.lua'
}

server_script {
    '@FIXDEV-lib/server/sv_rpc.lua',
    'server/sv_*.lua'
}

exports {
    'canHandOffPackages'
}