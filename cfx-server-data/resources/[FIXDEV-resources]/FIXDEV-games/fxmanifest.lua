fx_version "cerulean"

games { "gta5" }

description "FIXDEV-games"

version "0.1.0"

server_script "@npx/server/lib.js"
server_script "@FIXDEV-lib/server/sv_asyncExports.js"

client_script "@npx/client/lib.js"
client_script "@FIXDEV-lib/client/cl_ui.js"
client_script "@FIXDEV-locales/client/lib.js"

server_scripts {
    "server/sv_*.js",
}

client_scripts {
    "client/cl_*.js",
}
