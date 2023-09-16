TriggerServerEvent("FIXDEV:server:blackout")

RegisterNetEvent('FIXDEV:client:blackout')
AddEventHandler('FIXDEV:client:blackout', function(blackout)
    SetArtificialLightsStateAffectsVehicles(false)
    SetArtificialLightsState(blackout)
end)