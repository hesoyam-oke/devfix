RegisterServerEvent("FIXDEV:flags:set")
AddEventHandler("FIXDEV:flags:set", function(callID, netID, flagType, flags)
    local src = source
    local entity = NetworkGetEntityFromNetworkId(netID)
    local eType = GetEntityType(entity)
    TriggerClientEvent("FIXDEV:flags:set", -1, netID, eType, flagType, flags)
end)
