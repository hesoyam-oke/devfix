local baycityRob, baycityLastRob = false, 0

RPC.register("FIXDEV-heists:startMazeBankRobbery", function(pSource)
    if (os.time() - 1800) > baycityLastRob then
        TriggerEvent("FIXDEV-doors:change-lock-state", 555, false)
        TriggerClientEvent("FIXDEV-heists:mazeBankSpawnTrolleys", pSource)
        return true
    else
        TriggerClientEvent("DoLongHudText", -1, "Baycity Inactive.", 2)    
    end 
end)

RPC.register("FIXDEV-heists:mazeBankUnlockDoor", function(pSource, pDoorId)
    baycityRob = true
    baycityLastRob = os.time();

    TriggerEvent("FIXDEV-doors:change-lock-state", pDoorId, false)
end)

RPC.register("FIXDEV-heists:mazeBankCanRobTray", function(pSource)
    local rData = false

    rData = Config.BayCity["canGrabCash"]
    Config.BayCity["canGrabCash"] = not Config.BayCity["canGrabCash"]
    return rData
end)

RPC.register("FIXDEV-heists:mazeBankTrayRobbed", function(pSource)
    print("FIXDEV-heists:mazeBankTrayRobbed")
end)

RegisterServerEvent("FIXDEV-heists:server:bayCityOpenVault")
AddEventHandler("FIXDEV-heists:server:bayCityOpenVault", function()
end)

Citizen.CreateThread(function()
    while true do
        if baycityRob then
            print("(Baycity) 30 Min Later Auto Reset !")
            Citizen.Wait((1000 * 60) * 30)
            
            baycityRob = false
            Config.BayCity["canGrabCash"] = true

            TriggerEvent("FIXDEV-doors:change-lock-state", 555, true)
            TriggerEvent("FIXDEV-doors:change-lock-state", 556, true)
        else
            Citizen.Wait(1000)
        end
    end
end)