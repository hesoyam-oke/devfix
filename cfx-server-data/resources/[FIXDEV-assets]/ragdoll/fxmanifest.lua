fx_version 'cerulean'
games {'gta5'}

client_script '@FIXDEV-lib/client/cl_rpc.lua'

server_script '@npx/server/lib.js'
client_script '@npx/client/lib.js'
shared_script '@npx/shared/lib.lua'

client_script 'cl_health.lua'
client_script 'respawn.lua'
server_script 'server.lua'

export 'GetDeathStatus'