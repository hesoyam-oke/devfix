local powerPanelCoords = vector3(712.336, 166.227, 79.75325)

RPC.register("FIXDEV-heists:cityPowerDoorOpen", function(pSource, activeEntranceDoor)
    print("cityPowerDoorOpen", activeEntranceDoor)
    return true
end)

AddEventHandler('explosionEvent', function(sender, ev)
    if ev.explosionType == 2 then
        if #(powerPanelCoords - vector3(ev.posX, ev.posY, ev.posZ)) < 3.0 then
            if Config.CityPower["cityPowerState"] then
                Config.CityPower["cityPowerState"] = false

                for k, v in pairs(Config.CityPower["cityPowerExplosion"]) do
                    Citizen.Wait(1000)
                    TriggerClientEvent("particle:explosion:coord", -1, v)
                end

                TriggerClientEvent('chatMessage', -1, "^1[LS Water & Power]", {255, 0, 0}, "City power is currently out, we're working on restoring it!")
                TriggerClientEvent("weather:blackout", -1, true)
                TriggerClientEvent('sv-heists:cityPowerState', -1, Config.CityPower["cityPowerState"])
                coolDownTime()
            end
        end
    end
end)

function coolDownTime()
    local pTime = 1800

    repeat 
        Citizen.Wait(1000)
        pTime = pTime - 1
    until pTime == 0

    Config.CityPower["cityPowerState"] = true

    TriggerClientEvent('chatMessage', -1, "^1[LS Water & Power]", {255, 0, 0}, "City power has been restored!")
    TriggerClientEvent("weather:blackout", -1, false)
    TriggerClientEvent('sv-heists:cityPowerState', -1, Config.CityPower["cityPowerState"])
end
