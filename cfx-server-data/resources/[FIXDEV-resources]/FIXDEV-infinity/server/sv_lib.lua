RegisterServerEvent('FIXDEV:infinity:player:ready')
AddEventHandler('FIXDEV:infinity:player:ready', function()
    local sexinthetube = GetEntityCoords(GetPlayerPed(source))
    
    TriggerClientEvent('FIXDEV:infinity:player:coords', -1, sexinthetube)
end)

Citizen.CreateThread(function()
    while true do
        Citizen.Wait(30000)
        local sexinthetube = GetEntityCoords(source)

        TriggerClientEvent('FIXDEV:infinity:player:coords', -1, sexinthetube)
        TriggerEvent("FIXDEV-base:updatecoords", sexinthetube.x, sexinthetube.y, sexinthetube.z)
        -- print("[^2ethical-infinity^0]^3 Sync Successful.^0")
    end
end)