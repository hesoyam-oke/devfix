fx_version "cerulean"

games { "gta5" }

description "NoPixel Vehicles System"

version "0.1.0"

server_scripts {
    "server/*.lua",
    "@FIXDEV-lib/server/sv_main.lua",
}

client_scripts {
    "@FIXDEV-lib/client/cl_interface.lua",
    "@FIXDEV-lib/client/cl_main.lua",
    "client/*.js",
    "client/*.lua"
}

exports {
    'GetVehicleTable',
    'SetVehicleMods',
}