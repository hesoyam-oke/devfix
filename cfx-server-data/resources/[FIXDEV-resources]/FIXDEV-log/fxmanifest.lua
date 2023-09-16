





games {"gta5"}

fx_version "adamant"
version "1.0"

dependency "FIXDEV-base"

server_scripts {
    "@FIXDEV-lib/server/sv_sqlother.lua",
    "server.lua"
}

server_export "AddLog"
server_export "AddLogHex"