RPC.register("FIXDEV-doors:elevators:fetch",function()
    return ELEVATOR_CONFIG
end)

RegisterServerEvent("FIXDEV-doors:change-elevator-state")
AddEventHandler("FIXDEV-doors:change-elevator-state",function(elevatorId, floorId, locked)
    if ELEVATOR_CONFIG[elevatorId] then
        doors[pDoorId].locked = locked
        TriggerClientEvent("FIXDEV-doors:elevators:updateState", -1, elevatorId,floorId,locked,doors[pDoorId].forceUnlocked)
    end
end)