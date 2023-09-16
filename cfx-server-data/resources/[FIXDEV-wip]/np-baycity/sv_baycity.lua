RegisterServerEvent("FIXDEV-baycity:getGetDoorStateSV")
AddEventHandler("FIXDEV-baycity:getGetDoorStateSV", function()
    TriggerClientEvent('FIXDEV-baycity:getDoorCheckCL', -1, doorCheckbaycity)
end)

RegisterServerEvent("FIXDEV-particleserverbaycity")
AddEventHandler("FIXDEV-particleserverbaycity", function(method)
    TriggerClientEvent("FIXDEV-ptfxparticlebaycity", -1, method)
end)

RegisterServerEvent("FIXDEV-particleserverbaycity1")
AddEventHandler("FIXDEV-particleserverbaycity1", function(method)
    TriggerClientEvent("FIXDEV-ptfxparticlebaycity1", -1, method)
end)
