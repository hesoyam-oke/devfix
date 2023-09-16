








fx_version 'cerulean'
games { 'gta5' }

client_scripts {
  'shared/config.lua',
  'client/cl_*.lua',
  '@FIXDEV-errorlog/client/cl_errorlog.lua',
  '@FIXDEV-sync/client/lib.lua',
  '@FIXDEV-lib/client/cl_rpc.lua',
  '@FIXDEV-lib/client/cl_ui.lua',
  '@FIXDEV-lib/client/cl_animTask.lua',
}

server_scripts {
  '@FIXDEV-lib/server/sv_rpc.lua',
  '@FIXDEV-lib/server/sv_sql.lua',
  '@FIXDEV-lib/server/sv_sql.js',
  '@FIXDEV-lib/server/sv_asyncExports.js',
  '@FIXDEV-lib/server/sv_asyncExports.lua',
  'shared/config.lua',
  'server/sv_*.lua',
}
