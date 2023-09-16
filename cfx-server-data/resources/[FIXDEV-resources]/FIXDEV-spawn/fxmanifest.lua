fx_version 'cerulean'
games {'gta5'}

-- dependency "FIXDEV-base"

ui_page "html/index.html"
files({
	"html/*",
	"html/images/*",
	"html/css/*",
	"html/webfonts/*",
	"html/js/*"
})

client_script '@FIXDEV-lib/client/cl_rpc.lua'
client_script "@FIXDEV-errorlog/client/cl_errorlog.lua"
client_script "client/*"

shared_script "shared/sh_spawn.lua"
shared_script "@FIXDEV-lib/shared/sh_cache.lua"
server_scripts {
  '@FIXDEV-lib/server/sv_sql.lua',
  '@FIXDEV-lib/server/sv_asyncExports.lua',
  '@FIXDEV-lib/server/sv_rpc.lua',
}
server_script "server/*"
