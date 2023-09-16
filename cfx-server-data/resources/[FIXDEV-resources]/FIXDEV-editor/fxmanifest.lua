





games {'gta5'}

fx_version 'cerulean'

description "FiveM Racing"

client_script {
  "@PolyZone/client.lua",
  "@PolyZone/BoxZone.lua",
  '@FIXDEV-errorlog/client/cl_errorlog.lua',
  '@FIXDEV-lib/client/cl_rpc.lua',
  'hashes/hash_*',
  './**/cl_*.lua',
}

ui_page 'nui/dist/index.html'

files {
  'nui/dist/index.html',
  'nui/dist/js/app.js',
  'nui/dist/css/app.css',
}