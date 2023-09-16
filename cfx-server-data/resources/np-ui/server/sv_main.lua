local taxistatus = {}

RPC.register('np-ui:getCharacter', function(pSource)
    local user = exports["np-base"]:getModule('Player'):GetUser(pSource)
    local character = user:getCurrentCharacter()
    local pCharacterId = character.id

    local data = Await(SQL.execute([[
        SELECT *
        FROM characters
        WHERE id = ? 
    ]],
    { tonumber(pCharacterId) }))

    if not data then return print("[np-ui:getCharacter]: character not found.") end

    return data[1]
end)

RPC.register('np-ui:abdultaxi:fetchDrivers', function(pSource)
    local taxis = {}
    local data = Await(SQL.execute([[
        SELECT *
        FROM characters
        WHERE job = ? 
    ]],
    { 'taxi' }))

    if not data then print('[np-ui:abdultaxi:fetchDrivers]: drivers not found.') return false, "[np-ui:abdultaxi:fetchDrivers]: drivers not found." end


    for k,v in pairs(data) do
        taxis[#taxis + 1] = {
            name = v.first_name..' '..v.last_name,
            phoneNumber = v.phone_number,
            status = taxistatus[v.id] or 'Busy'
        }
    end

    return true, taxis
end)