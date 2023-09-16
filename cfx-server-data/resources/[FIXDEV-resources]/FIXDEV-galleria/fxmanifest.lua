fx_version 'cerulean'
games { 'gta5' }

client_script "@FIXDEV-lib/client/cl_ui.lua"
client_script "@npx/client/lib.js"
server_script "@npx/server/lib.js"
shared_script '@npx/shared/lib.lua'

client_scripts {
  '@FIXDEV-lib/client/cl_rpc.lua',
  'client/cl_*.lua',
  'client/cl_*.js',
}

server_scripts {
  '@FIXDEV-lib/server/sv_sql.lua',
  "@FIXDEV-lib/server/sv_asyncExports.lua",
  'server/sv_*.lua',
  'server/sv_*.js',
}
