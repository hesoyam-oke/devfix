fx_version 'cerulean'

games { 'gta5' }

shared_script '@FIXDEV-lib/shared/sh_cacheable.lua'

client_script "@FIXDEV-sync/client/lib.lua"
client_script "@FIXDEV-lib/client/cl_ui.lua"

client_script "@npx/client/lib.js"
server_script "@npx/server/lib.js"
shared_script "@npx/shared/lib.lua"

client_scripts {
  '@FIXDEV-lib/client/cl_rpc.lua',
  'client/cl_*.lua',
  "@PolyZone/client.lua",
}

server_script "@FIXDEV-lib/server/sv_npx.js"
server_scripts {
  '@FIXDEV-lib/server/sv_rpc.lua',
  '@FIXDEV-lib/server/sv_rpc.js',
  '@FIXDEV-lib/server/sv_sql.lua',
  '@FIXDEV-lib/server/sv_sql.js',
  "@FIXDEV-lib/server/sv_asyncExports.lua",
  'config.lua',
  'server/sv_*.lua',
  'server/sv_*.js',
  'build-server/sv_*.js',
}

