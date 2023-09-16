





fx_version 'cerulean'
games {"gta5"}

description "actionbar"

client_scripts {
  "@FIXDEV-errorlog/client/cl_errorlog.lua",
  '@FIXDEV-lib/client/cl_rpc.lua',
  "client.lua",
}

shared_script {
  '@FIXDEV-lib/shared/sh_util.lua'
}

server_scripts {
  '@FIXDEV-lib/server/sv_rpc.lua',
  '@FIXDEV-lib/server/sv_sql.lua',
}