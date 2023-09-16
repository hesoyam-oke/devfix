





fx_version 'cerulean'
games {'gta5'}

-- dependency "FIXDEV-base"


client_script "@FIXDEV-errorlog/client/cl_errorlog.lua"


client_script {
	'util/xml.lua',
	'client/ytyp/*',
	'client/cl_ytyp.lua',
	
}

exports {
	'request',
} 