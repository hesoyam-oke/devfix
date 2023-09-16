fx_version 'cerulean'
games {'gta5'}

client_script "@FIXDEV-errorlog/client/cl_errorlog.lua"

client_scripts {
  "@FIXDEV-lib/client/cl_flags.lua",
  "@FIXDEV-sync/client/lib.lua",
  "cl_tow.lua"
}

server_script "sv_tow.lua"
