








fx_version 'adamant'
game 'common'

name 'oxmysql'
description 'MySQL Middleware for fivem using mysql.js.'
author 'Matthias Mandelartz'
version '1.3.2'
url 'https://github.com/GHMatti/oxmysql'

server_scripts {
  'oxmysql-server.js',
  'oxmysql-server.lua',
}

client_script 'oxmysql-client.lua'

files {
  'ui/index.html',
  'ui/js/app.js',
  'ui/css/app.css',
  'ui/fonts/*.woff',
  'ui/fonts/*.woff2',
  'ui/fonts/*.eot',
  'ui/fonts/*.ttf',
}

ui_page 'ui/index.html'
