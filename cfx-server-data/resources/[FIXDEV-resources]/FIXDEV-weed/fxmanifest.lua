fx_version "cerulean"
games { "gta5" }

shared_script {
    "@FIXDEV-lib/shared/sh_util.lua",
    "shared/*",
}

server_scripts {
    "@oxmysql/lib/MySQL.lua",
    "@FIXDEV-lib/server/sv_rpc.lua",
    "server/*",
}

client_scripts {
    "@FIXDEV-lib/client/cl_rpc.lua",
    "@FIXDEV-lib/client/cl_interface.lua",
    "@FIXDEV-sync/client/lib.lua",
    "@FIXDEV-lib/client/cl_polyhooks.lua",
    "@FIXDEV-locales/client/lib.lua",
    "client/*",
}