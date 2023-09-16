games {"gta5"}

fx_version "cerulean"

description "Weapons"

dependencies  {
  "damage-events"
}

client_scripts {
  "@FIXDEV-errorlog/client/cl_errorlog.lua",
  "@FIXDEV-lib/client/cl_rpc.lua",
 -- "client.lua",
  "modes.lua",
  "melee.lua",
  "pickups.lua",
  "cl_*.lua"
}

shared_script {
  "@FIXDEV-lib/shared/sh_util.lua"
}
server_scripts {
  "@FIXDEV-lib/server/sv_rpc.lua",
  "@FIXDEV-lib/server/sv_sql.lua",
  "server.lua"
}

server_export "getWeaponMetaData"
server_export "updateWeaponMetaData"

exports {
  "toName",
  "findModel"
}
