fx_version 'cerulean'
games {'gta5'}


client_script "@FIXDEV-errorlog/client/cl_errorlog.lua"

shared_script "@mka-array/Array.lua"
shared_script "@FIXDEV-lib/shared/sh_cacheable.lua"

client_script "@FIXDEV-lib/client/cl_infinity.lua"
server_script "@FIXDEV-lib/server/sv_infinity.lua"

client_script 'carhud.lua'
client_script 'cl_playerbuffs.lua'
server_script 'carhud_server.lua'
server_script 'sr_autoKick.lua'
client_script 'newsStands.lua'

-- ui_page('html/index.html')

-- files({
-- 	"html/index.html",
-- 	"html/script.js",
-- 	"html/styles.css",
-- 	"html/img/*.svg",
-- 	"html/img/*.png"
-- })

exports {
	"playerLocation",
	"playerZone"
}

