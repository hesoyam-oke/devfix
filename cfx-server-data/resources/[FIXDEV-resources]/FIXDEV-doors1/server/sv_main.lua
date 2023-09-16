local doors = {}

RegisterServerEvent("FIXDEV-doors:request-lock-state")
AddEventHandler("FIXDEV-doors:request-lock-state",function()
    TriggerClientEvent("FIXDEV-doors:initial-lock-state", source, doors)
end)

RegisterServerEvent("FIXDEV-doors:change-lock-state")
AddEventHandler("FIXDEV-doors:change-lock-state",function(pDoorId,pDoorLockState)
    if doors[pDoorId] then
        doors[pDoorId].lock = pDoorLockState
        TriggerClientEvent("FIXDEV-doors:change-lock-state", -1, pDoorId,pDoorLockState,doors[pDoorId].forceUnlocked)
    end
end)

Citizen.CreateThread(function()
    for _,door in ipairs(DOOR_CONFIG) do
        doors[#doors + 1] = door
    end
end)

RegisterServerEvent("FIXDEV-door:add")
AddEventHandler("FIXDEV-door:add",function(pDoorCoords,pDoorModel)
    file = io.open("doorConfig.log","a")
    io.output(file)
    io.write(("\n vector3(%s , %s, %s)\t %s"):format(pDoorCoords.x, pDoorCoords.y, pDoorCoords.z, pDoorModel))
    io.close(file)
end)