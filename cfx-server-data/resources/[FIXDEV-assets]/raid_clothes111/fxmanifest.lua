





fx_version 'cerulean'
games { 'gta5' }

--[[ dependencies {
  "FIXDEV-lib"
} ]]--

ui_page 'client/html/index.html'

files {
  'client/html/*.html',
  'client/html/*.js',
  'client/html/*.css',
  'client/html/webfonts/*.eot',
  'client/html/webfonts/*.svg',
  'client/html/webfonts/*.ttf',
  'client/html/webfonts/*.woff',
  'client/html/webfonts/*.woff2',
  'client/html/css/*',
}

client_scripts {
  '@FIXDEV-errorlog/client/cl_errorlog.lua',
  '@FIXDEV-lib/client/cl_rpc.lua',
  '@FIXDEV-lib/client/cl_ui.lua',
  'client/cl_tattooshop.lua',
  'client/cl_*.lua',
  'client/cl_*.js',
}


shared_script {
  '@FIXDEV-lib/shared/sh_util.lua',
  'shared/sh_*.*',
}

server_scripts {
  'server.lua',
}

export "CreateHashList"
export "GetTatCategs"
export "GetCustomSkins"
