fx_version 'cerulean'

games { 'gta5' }
shared_script {
  "@FIXDEV-lib/server/sv_rpc.lua",
  "@FIXDEV-lib/server/sv_sql.lua",
  "@FIXDEV-lib/server/sv_asyncExports.lua"
}

client_scripts {
  "@FIXDEV-sync/client/lib.lua",
  '@FIXDEV-lib/client/cl_interface.lua',
  "@FIXDEV-lib/client/cl_polyhooks.lua",
  "@FIXDEV-locales/client/lib.lua",
  "@FIXDEV-lib/client/cl_rpc.lua",
  'client/cl_*.lua',
  "@PolyZone/client.lua",
}

server_scripts {
  "@FIXDEV-lib/server/sv_rpc.lua",
  'server/sv_*.lua',
  'server/sv_*.js',
  'build-server/sv_*.js',
}
  