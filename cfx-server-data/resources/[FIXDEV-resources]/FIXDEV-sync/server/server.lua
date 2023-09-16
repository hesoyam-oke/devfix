RegisterServerEvent("FIXDEV:sync:player:ready")
AddEventHandler("FIXDEV:sync:player:ready", function()
    
end)

RegisterServerEvent("sync:request")
AddEventHandler("sync:request", function(native, netID, ...)
    TriggerClientEvent("sync:execute", -1, native, netID, ...)
end)

RegisterServerEvent("sync:execute:aborted")
AddEventHandler("sync:execute:aborted", function(native, netID)
end)

RegisterServerEvent("FIXDEV-sync:executeSyncNative")
AddEventHandler("FIXDEV-sync:executeSyncNative", function(native, netEntity, options, args)
    TriggerClientEvent("FIXDEV-sync:clientExecuteSyncNative", -1, native, netEntity, options, args)
end)