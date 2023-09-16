fx_version "cerulean"
description "AdminUI"
author "NoPixel adminmenu"
version '0.0.1'
game "gta5"

server_scripts {
    '@oxmysql/lib/MySQL.lua',
    '@FIXDEV-lib/server/sv_sqlother.lua',
    '@FIXDEV-lib/server/sv_rpc.lua',
    '@FIXDEV-lib/server/sv_rpc.js',
    '@FIXDEV-lib/server/sv_sql.lua',
    '@FIXDEV-lib/server/sv_sql.js',
    'dist/server/*.js',
    'server/sv_*.lua'
}

client_scripts {
    '@FIXDEV-lib/client/cl_rpc.js',
    '@FIXDEV-lib/client/cl_rpc.lua',
    '@FIXDEV-lib/client/cl_poly.js',
    'dist/client/*.js',
    'client/cl_*.lua',
}