RegisterServerEvent('FIXDEV-keys:attemptLockSV')
AddEventHandler('FIXDEV-keys:attemptLockSV', function(targetVehicle, plate)
    TriggerClientEvent('FIXDEV-keys:attemptLock', source, targetVehicle, plate)
end)