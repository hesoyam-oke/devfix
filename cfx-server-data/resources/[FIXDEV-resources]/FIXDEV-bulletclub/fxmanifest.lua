fx_version "cerulean"

description "nopixel Bulletclub"
author "cool"
version '0.0.1'

game "gta5"

server_script '@npx/server/lib.js'
server_script '@FIXDEV-lib/server/sv_rpc.js'
server_script '@FIXDEV-lib/server/sv_sql.js'
server_script 'server/*.js'

client_script '@npx/client/lib.js'
client_script '@FIXDEV-lib/client/cl_interface.js'
client_script '@FIXDEV-lib/client/cl_rpc.js'
client_script '@FIXDEV-lib/client/cl_poly.js'
client_script 'client/*.js'