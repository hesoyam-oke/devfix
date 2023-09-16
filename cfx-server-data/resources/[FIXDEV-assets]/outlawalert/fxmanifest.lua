fx_version 'cerulean'
games {'gta5'}

--resource_type 'gametype' { name = 'Hot Putsuit' }
client_script "@FIXDEV-errorlog/client/cl_errorlog.lua"
client_script "@FIXDEV-locales/client/lib.lua"
client_script "@FIXDEV-lib/client/cl_infinity.lua"
server_script "@FIXDEV-lib/server/sv_infinity.lua"

server_script "server.lua"
client_script "client.lua"
