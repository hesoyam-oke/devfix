local bobcatRob, bobcatLastRob = false, 0
local smgList = {
    "-2012211169",
    "-1716589765",
    "148457251",
    "-942620673"
}
local explosiveList = {
    "741814745"
}
local rifleList = {
    "-1074790547",
    "grapplegun",
    "-72657034"
}

RPC.register("heists:bobcatUseSecurityCard", function(pSource)
    if not bobcatRob then
        if (os.time() - 1800) > bobcatLastRob then
            bobcatRob = true
            bobcatLastRob = os.time()

            for k, v in pairs(Config.BobCat["securityDoor"]) do
                TriggerEvent("FIXDEV-doors:change-lock-state", v, false)
            end

            for k, v in pairs(Config.BobCat["securityNPC"]) do
                local pModel = `s_m_y_blackops_01`
                local pPed = CreatePed(0, pModel, v.x, v.y, v.z, v.h, 1, 0)
                local pNetId = NetworkGetNetworkIdFromEntity(pPed)

                TriggerClientEvent("FIXDEV-heists:controlBobcatNpc", -1, pNetId)
            end

            local hModel = `cs_casey`
            local hPed = CreatePed(0, hModel, Config.BobCat["hostageNPC"].x, Config.BobCat["hostageNPC"].y, Config.BobCat["hostageNPC"].z, Config.BobCat["hostageNPC"].h, 1, 0)
            local hNetId = NetworkGetNetworkIdFromEntity(hPed)

            TriggerClientEvent("heists:bobcatControlC4Npc", -1, hNetId)
            return true
        else
            TriggerClientEvent("DoLongHudText", -1, "Bobcat Inactive.", 2)
            return false
        end
    end
end)

RPC.register("heists:bobcatLootCache", function(pSource, pType)
    local src = pSource

    if bobcatRob then
        if pType == "smgs" then
            if not lootSmgs then
                lootSmgs = true

                for i = 1, math.random(6, 6), 1 do
                    local smgItem = smgList[math.random(1, #smgList)]
                    TriggerClientEvent("player:receiveItem", src, smgItem, 1)
                end   
            else
                TriggerClientEvent("DoLongHudText", src, "Empty, shucks.", 2)           
            end        
        elseif pType == "explosives" then
            if not lootExplosives then
                lootExplosives = true

                for i = 1, math.random(2, 2), 1 do
                    local explosiveItem = explosiveList[math.random(1, #explosiveList)]
                    TriggerClientEvent("player:receiveItem", src, explosiveItem, 1)
                end 
            else
                TriggerClientEvent("DoLongHudText", src, "Empty, shucks.", 2)           
            end   
        elseif pType == "rifles" then
            if not lootRifles then
                lootRifles = true

                for i = 1, math.random(4, 4), 1 do
                    local rifleItem = rifleList[math.random(1, #rifleList)]
                    TriggerClientEvent("player:receiveItem", src, rifleItem, 1)
                end
            else
                TriggerClientEvent("DoLongHudText", src, "Empty, shucks.", 2)           
            end         
        end   
    end             
end)

RPC.register("FIXDEV-heists:bobcatMoneyTruckBegin", function(pSource, pNetId)

end)

RPC.register("FIXDEV-heists:bobcatMoneyTruckLootPlease", function(pSource, pNetId)

end)

RPC.register("heists:activateC4Npc", function(pSource, pNetId)
    TriggerClientEvent("heists:bobcatControlC4NpcActivate", -1, pSource, pNetId)
    Citizen.Wait(30000)
    Config.BobCat["iplState"]["np_prolog_clean"] = false
    Config.BobCat["iplState"]["np_prolog_broken"] = true
    
    TriggerClientEvent("heists:updatebobcatIplStates", -1, Config.BobCat["iplState"])
end)

RPC.register("heists:bobcatGetIplStates", function(pSource)
    return Config.BobCat["iplState"]
end)

RPC.register("FIXDEV-heists:bobcat:updateMyLocationForTruck", function(pSource, pCoord)

end)

RPC.register("heists:bobcatDoorOpen", function(pSource, pLocations)
    for k, v in pairs(Config.VaultUpperDoor[pLocations]) do
        TriggerEvent("FIXDEV-doors:change-lock-state", v, false)
    end
end)

Citizen.CreateThread(function()
    while true do
        if bobcatRob then
            print("(Bobcat) 30 Min Later Auto Reset !")
            Citizen.Wait((1000 * 60)* 30)
            
            bobcatRob = false
            Config.BobCat["iplState"]["np_prolog_clean"] = true
            Config.BobCat["iplState"]["np_prolog_broken"] = false

            TriggerClientEvent("heists:updatebobcatIplStates", -1, Config.BobCat["iplState"])

            for k, v in pairs(Config.VaultUpperDoor["bobcat_security_entry"]) do
                TriggerEvent("FIXDEV-doors:change-lock-state", v, true)
            end

            for k, v in pairs(Config.VaultUpperDoor["bobcat_security_inner_1"]) do
                TriggerEvent("FIXDEV-doors:change-lock-state", v, true)
            end

            for k, v in pairs(Config.BobCat["securityDoor"]) do
                TriggerEvent("FIXDEV-doors:change-lock-state", v, true)
            end
        else
            Citizen.Wait(1000)
        end
    end
end)