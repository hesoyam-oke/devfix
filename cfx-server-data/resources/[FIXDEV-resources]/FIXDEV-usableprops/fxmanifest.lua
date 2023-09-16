fx_version 'cerulean'
games {'gta5'}

client_script "@npx/client/lib.js"
server_script "@npx/server/lib.js"
shared_script "@npx/shared/lib.lua"

client_script "@FIXDEV-errorlog/client/cl_errorlog.lua"
client_script "@FIXDEV-sync/client/lib.lua"

server_script "@FIXDEV-lib/server/sv_asyncExports.lua"

shared_script "@FIXDEV-lib/shared/sh_util.lua"

client_scripts {
  '@FIXDEV-lib/client/cl_rpc.lua',
  'client/cl_*.lua'
}

server_scripts {
  '@FIXDEV-lib/server/sv_sql.lua',
  '@FIXDEV-lib/server/sv_rpc.lua',
  'server/sv_*.lua'
}
