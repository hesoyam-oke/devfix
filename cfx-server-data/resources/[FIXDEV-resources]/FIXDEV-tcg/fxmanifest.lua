fx_version 'cerulean'
games { 'gta5' }

--dependency 'yarn'
--dependency 'webpack'

--webpack_config 'webpack.config.js'

files {
    'public/sounds/*',
    'public/common/*',
    'public/sets/civs/*',
    'public/sets/crews/*',
    'public/sets/government/*',
}

client_scripts {
    '@FIXDEV-lib/client/cl_ui.js',
    './dist/client.js',
    '@FIXDEV-lib/client/cl_animTask.lua',
    '@FIXDEV-lib/client/cl_rpc.lua',
    '@FIXDEV-lib/client/cl_rpc.js',
    '@FIXDEV-lib/client/cl_ui.lua',
    'cl_*.lua',
}

server_script {
    '@FIXDEV-lib/server/sv_rpc.lua',
    '@FIXDEV-lib/server/sv_rpc.js',
    '@FIXDEV-lib/server/sv_npx.js',
    '@FIXDEV-lib/server/sv_asyncExports.js',
    './dist/server.js',
    'sv_*.lua',
}
