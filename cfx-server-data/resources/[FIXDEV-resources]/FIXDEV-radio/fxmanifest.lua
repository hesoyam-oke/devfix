fx_version 'cerulean'
games { 'gta5' }

--[[ dependencies {
  "FIXDEV-lib",
  "FIXDEV-ui"
} ]]--

client_script "@FIXDEV-lib/client/cl_ui.lua"
client_script "@FIXDEV-errorlog/client/cl_errorlog.lua"

client_scripts {
  'client/cl_*.lua'
}

server_scripts {
  'server/sv_*.lua'
}