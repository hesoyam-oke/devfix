
-- ibe1337 

fx_version 'cerulean'
games { 'gta5' }

dependencies {
  "mka-lasers"
}

client_scripts {
  '@FIXDEV-lib/client/cl_rpc.lua',
  '@FIXDEV-lib/client/cl_ui.lua',
  '@FIXDEV-lib/client/cl_animTask.lua',
  'client/cl_*.lua',
  "@FIXDEV-sync/client/lib.lua",
}

shared_script {
  '@FIXDEV-lib/shared/sh_util.lua',
}