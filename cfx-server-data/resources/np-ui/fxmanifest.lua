fx_version "cerulean"

description "Nopixel - UI"
author "nopixel"
version '0.0.1'

lua54 'yes'

game "gta5"

ui_page 'web/build/index.html'



client_scripts {
  '@np-lib/client/cl_rpc.lua',
  'client/cl_exports.lua',
  'client/cl_lib.lua',
  'client/model/cl_*.lua'
}

server_scripts {
  '@np-lib/server/sv_rpc.lua',
  '@np-lib/server/sv_sql.lua',
  'server/sv_*.lua',
  'server/sv_*.js'
}

files {
  'web/build/index.html',
  'web/build/**/*'
}