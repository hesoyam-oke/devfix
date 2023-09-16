fx_version 'cerulean'
games { 'gta5' }

--[[ dependencies {
  "FIXDEV-polyzone",
  "FIXDEV-lib",
  "FIXDEV-ui"
} ]]--

client_script "@FIXDEV-lib/client/cl_ui.lua"

client_scripts {
  '@FIXDEV-lib/client/cl_rpc.lua',
  'client/cl_*.lua',
}

server_scripts {
  '@FIXDEV-lib/server/sv_asyncExports.lua',
  '@FIXDEV-lib/server/sv_rpc.lua',
  'server/sv_*.lua',
}
