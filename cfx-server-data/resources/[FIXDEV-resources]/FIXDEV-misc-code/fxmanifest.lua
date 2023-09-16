fx_version 'cerulean'
games { 'gta5' }

dependencies {
  "mka-lasers"
}

files {
  'shared/*.json',
}

client_scripts {
  '@FIXDEV-errorlog/client/cl_errorlog.lua',
  '@FIXDEV-sync/client/lib.lua',
  '@FIXDEV-lib/client/cl_rpc.lua',
  '@FIXDEV-lib/client/cl_ui.lua',
  '@FIXDEV-lib/client/cl_animTask.lua',
  '@PolyZone/client.lua',
  '@PolyZone/BoxZone.lua',
  '@PolyZone/ComboZone.lua',
  '@mka-lasers/client/client.lua',
  '@mka-grapple/client.lua',
  'client/cl_*.lua',
  'client/cl_*.js',
  'client/**/cl_*.lua',
  'client/**/cl_*.js',
}

shared_script {
  '@FIXDEV-lib/shared/sh_util.lua',
  'shared/sh_*.*',
  'shared/**/sh_*.*',
}

server_scripts {
  'config.lua',
  '@FIXDEV-lib/server/sv_rpc.lua',
  '@FIXDEV-lib/server/sv_sql.lua',
  '@FIXDEV-lib/server/sv_sql.js',
  '@FIXDEV-lib/server/sv_asyncExports.js',
  '@FIXDEV-lib/server/sv_asyncExports.lua',
  'server/sv_*.lua',
  'server/sv_*.js',
  'server/**/sv_*.lua',
  'server/**/sv_*.js',
}
