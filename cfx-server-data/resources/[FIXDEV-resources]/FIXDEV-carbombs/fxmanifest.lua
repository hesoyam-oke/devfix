fx_version "cerulean"
games {"gta5"}

author 'loleris'
description "lol-carbombs"

version "1.0.0"

client_scripts {
    "@FIXDEV-lib/client/cl_rpc.lua",
    "@FIXDEV-lib/client/cl_interface.lua",
    "client/*.lua"
}

server_scripts {
    "@FIXDEV-lib/server/sv_rpc.lua",
    "server/*.lua"
}