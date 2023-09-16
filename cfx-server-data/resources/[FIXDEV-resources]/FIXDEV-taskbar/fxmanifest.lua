fx_version 'adamant'
games { 'gta5' }

--[[ dependencies {
  "FIXDEV-lib",
  "FIXDEV-ui"
} ]]--

-- ui_page 'ui/index.html'

-- files {
--     "ui/index.html",
--     "ui/scripts.js",
--     "ui/css/style.css"
-- }


client_script "@FIXDEV-lib/client/cl_ui.lua"

client_scripts {
  '@FIXDEV-errorlog/client/cl_errorlog.lua',
  '@FIXDEV-lib/client/cl_rpc.lua',
  "client.lua",
}

export "taskBar"
export "closeGuiFail"
export "pInInv"