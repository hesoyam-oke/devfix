








fx_version 'adamant'
games { 'gta5' }


server_scripts {
	"sv_events.lua",
	"@FIXDEV-lib/server/sv_rpc.lua",
	"@FIXDEV-lib/server/sv_sql.lua"
}

client_script "cl_main.lua"
client_script "cl_menu.lua"
client_script "cl_events.lua"
client_script "@FIXDEV-lib/client/cl_ui.lua"
client_script "@FIXDEV-lib/client/cl_ui.js"
client_script "@FIXDEV-lib/client/cl_rpc.lua"
client_script "@FIXDEV-errorlog/client/cl_errorlog.lua"



