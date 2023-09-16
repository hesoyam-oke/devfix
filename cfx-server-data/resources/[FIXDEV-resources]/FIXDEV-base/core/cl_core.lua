NPX.Core.hasLoaded = false


function NPX.Core.Initialize(self)
    Citizen.CreateThread(function()
        while true do
            if NetworkIsSessionStarted() then
                TriggerEvent("FIXDEV-base:playerSessionStarted")
                TriggerServerEvent("FIXDEV-base:playerSessionStarted")
                break
            end
        end
    end)
end
NPX.Core:Initialize()

AddEventHandler("FIXDEV-base:playerSessionStarted", function()
    while not NPX.Core.hasLoaded do
        --print("waiting in loop")
        Wait(100)
    end
    ShutdownLoadingScreen()
    NPX.SpawnManager:Initialize()
end)

RegisterNetEvent("FIXDEV-base:waitForExports")
AddEventHandler("FIXDEV-base:waitForExports", function()
    if not NPX.Core.ExportsReady then return end

    while true do
        Citizen.Wait(0)
        if exports and exports["FIXDEV-base"] then
            TriggerEvent("FIXDEV-base:exportsReady")
            return
        end
    end
end)

RegisterNetEvent("customNotification")
AddEventHandler("customNotification", function(msg, length, type)

	TriggerEvent("chatMessage","SYSTEM",4,msg)
end)

RegisterNetEvent("base:disableLoading")
AddEventHandler("base:disableLoading", function()
    print("player has spawned ")
    if not NPX.Core.hasLoaded then
         NPX.Core.hasLoaded = true
    end
end)

Citizen.CreateThread( function()
    TriggerEvent("base:disableLoading")
end)