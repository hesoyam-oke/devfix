








fx_version 'cerulean'
games { 'gta5' }

--[[ dependencies {
  "FIXDEV-lib",
  "PolyZone",
  "FIXDEV-ui"
} ]]--

client_script "@FIXDEV-sync/client/lib.lua"
client_script "@FIXDEV-lib/client/cl_ui.lua"

client_scripts {
  '@FIXDEV-lib/client/cl_rpc.lua',
  'client/cl_*.lua',
  "@PolyZone/client.lua",
}

shared_script {
  '@FIXDEV-lib/shared/sh_util.lua',
  'shared/sh_*.*',
}

server_scripts {
  '@FIXDEV-lib/server/sv_rpc.lua',
  '@FIXDEV-lib/server/sv_sql.lua',
  'server/sv_*.lua',
  'server/sv_*.js',
}
