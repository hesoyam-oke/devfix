





fx_version "cerulean"
games { "gta5" }

ui_page "html/index.html"

files {
	"html/*.html",
	"html/*.css",
	"html/*.js",
    "html/*.png",
    "html/*.ttf",
}

shared_script {
    "@FIXDEV-lib/shared/sh_util.lua",
    "shared/sh_*.lua",
}

server_scripts {
    "@oxmysql/lib/MySQL.lua",
    "@FIXDEV-lib/server/sv_rpc.lua",
    "server/sv_*.lua",
}

client_scripts {
    "@FIXDEV-lib/client/cl_rpc.lua",
    "client/cl_*.lua",
}