RegisterCommand("prssm:broadcast", function(src, args, raw)
    local currentVehicle = GetVehiclePedIsIn(PlayerPedId(), false)
    if currentVehicle and currentVehicle ~= 0 and args[1] then
        TriggerServerEvent("FIXDEV-miscscripts:prssm:setTargetPlane", NetworkGetNetworkIdFromEntity(currentVehicle), args[1])
    end
end, false)

RegisterCommand("prssm:abort", function(src, args, raw)
    TriggerServerEvent("FIXDEV-miscscripts:prssm:abort")
end, false)

RegisterNetEvent("FIXDEV-miscscripts:prssm:setTargetPlane")
AddEventHandler("FIXDEV-miscscripts:prssm:setTargetPlane", function(pPlane, pSound)
    local targetPlaneEntityId = NetworkGetEntityFromNetworkId(pPlane)
    if targetPlaneEntityId ~= nil or not pSound then
        StopStream()
        local timeoutCounter = 0
        while not LoadStream(pSound, "DLC_NIKEZ_MISC") do
            if timeoutCounter > 100000 then
                break
            end
            timeoutCounter = timeoutCounter + 1
            Wait(0)
        end
        PlayStreamFromVehicle(targetPlaneEntityId)
    end
end)

RegisterNetEvent("FIXDEV-miscscripts:prssm:abort")
AddEventHandler("FIXDEV-miscscripts:prssm:abort", function(pPlane)
    StopStream()
end)

AddEventHandler("onResourceStop", function(resource)
    if resource == GetCurrentResourceName() then
        StopStream()
    end
end)