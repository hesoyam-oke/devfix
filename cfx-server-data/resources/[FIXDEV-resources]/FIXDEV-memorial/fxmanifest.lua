fx_version "cerulean"

games {"gta5"}

description "Memorial"

server_script '@FIXDEV-lib/server/sv_rpc.lua'
server_script '@FIXDEV-lib/server/sv_infinity.lua'

server_scripts {
    'server/*.lua'
}

client_script '@FIXDEV-lib/client/cl_rpc.lua'

client_scripts {
    'client.lua',
    'client/*.lua'
}

