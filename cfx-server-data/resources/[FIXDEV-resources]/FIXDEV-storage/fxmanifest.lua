fx_version "cerulean"

game { "gta5" }

shared_scripts {
    "shared/config.lua"
}

client_scripts {
    "@FIXDEV-lib/client/cl_ui.lua",
    "@FIXDEV-locales/client/lib.lua",
    "@FIXDEV-lib/client/cl_rpc.lua",
    "client/cl_utils.lua",
    "client/cl_main.lua",
    "client/cl_spawn.lua"
}

server_scripts {
    "@FIXDEV-lib/server/sv_sql.lua",
    "@FIXDEV-lib/shared/sh_util.lua",
    "@FIXDEV-lib/server/sv_rpc.lua",
    "@FIXDEV-lib/server/sv_asyncExports.lua",
    "server/sv_utils.lua",
    "server/sv_main.lua"
}