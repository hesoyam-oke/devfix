fx_version 'cerulean'
games { 'gta5' }

--[[ dependencies {
  "FIXDEV-polyzone",
  "FIXDEV-lib",
  "FIXDEV-ui"
} ]]--

client_script "@FIXDEV-sync/client/lib.lua"
client_script "@FIXDEV-lib/client/cl_ui.lua"
client_script "@FIXDEV-lib/client/cl_ui.js"

client_scripts {
  '@FIXDEV-lib/client/cl_rpc.lua',
  '@FIXDEV-lib/client/cl_rpc.js',
  'client/cl_*.lua',
  'client/cl_*.js',
  "@PolyZone/client.lua",
  "@PolyZone/ComboZone.lua",
}

shared_script {
  '@FIXDEV-lib/shared/sh_util.lua',
  'shared/sh_*.*',
}

server_script "@FIXDEV-lib/server/sv_npx.js"
server_scripts {
  '@FIXDEV-lib/server/sv_asyncExports.lua',
  '@FIXDEV-lib/server/sv_rpc.lua',
  '@FIXDEV-lib/server/sv_rpc.js',
  '@FIXDEV-lib/server/sv_sql.lua',
  '@FIXDEV-lib/server/sv_sql.js',
  'server/sv_*.lua',
  'server/sv_*.js',
}
