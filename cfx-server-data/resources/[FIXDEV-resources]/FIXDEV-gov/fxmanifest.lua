fx_version 'cerulean'
games { 'gta5' }

client_script "@FIXDEV-lib/client/cl_ui.lua"

shared_script "@FIXDEV-lib/shared/sh_cacheable.lua"

client_scripts {
  '@FIXDEV-errorlog/client/cl_errorlog.lua',
  '@FIXDEV-lib/client/cl_rpc.lua',
  '@FIXDEV-lib/client/cl_animTask.lua',
  'client/cl_*.lua'
}

shared_scripts {
  '@FIXDEV-lib/shared/sh_util.lua',
  'shared/sh_*.*'
}

server_scripts {
  'config.lua',
  '@FIXDEV-lib/server/sv_rpc.lua',
  '@FIXDEV-lib/server/sv_sql.lua',
  '@FIXDEV-lib/server/sv_sql.js',
  'server/classes/*.lua',
  'server/sv_*.lua',
  'server/sv_*.js',
}


client_script "tests/cl_*.lua"
