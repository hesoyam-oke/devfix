fx_version "cerulean"
games { "gta5" }

lua54 'yes'

client_script "@FIXDEV-lib/client/cl_ui.lua"
client_scripts {
    "@FIXDEV-errorlog/client/cl_errorlog.lua",
    '@FIXDEV-sync/client/lib.lua',
    "@FIXDEV-lib/client/cl_rpc.lua",
    "@FIXDEV-locales/client/lib.lua",
    '@mka-lasers/client/client.lua',
    "client/cl_*.lua",
    "business/**/cl_*.lua",
}

shared_script {
    "@FIXDEV-lib/shared/sh_util.lua",
    "shared/sh_*.*",
    "business/**/sh_*.lua",
}

server_scripts {
    "config.lua",
    "@FIXDEV-lib/server/sv_asyncExports.lua",
    "@FIXDEV-lib/server/sv_rpc.lua",
    "@FIXDEV-lib/server/sv_sql.lua",
    "server/sv_*.lua",
    "business/**/sv_*.lua",
}

