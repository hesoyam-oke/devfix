
local purpleLap = false
local orangeLap = false

--- Blip shit ---
blip = nil

function AddOrangeBlip()
    blip = AddBlipForCoord(1401.37, -1490.43, 6)
    SetBlipSprite(blip, 306)
    SetBlipAsShortRange(blip, true)
    SetBlipScale(blip, 0.7)
    SetBlipColour(blip, 47)
    BeginTextCommandSetBlipName("STRING")
    AddTextComponentString("Pickup Location")
    EndTextCommandSetBlipName(blip)
end

function AddPurpleBlip()
    blip = AddBlipForCoord(509.93, 3098.93, 6)
    SetBlipSprite(blip, 306)
    SetBlipAsShortRange(blip, true)
    SetBlipScale(blip, 0.7)
    SetBlipColour(blip, 27)
    BeginTextCommandSetBlipName("STRING")
    AddTextComponentString("Pickup Location")
    EndTextCommandSetBlipName(blip)
end

--- Purple Tablet ---

RegisterNetEvent('FIXDEV-robberies:purpleQueue')
AddEventHandler('FIXDEV-robberies:purpleQueue', function()
    if exports["FIXDEV-inventory"]:hasEnoughOfItem("purpleusb", 1) then
        TriggerServerEvent('FIXDEV-robberies:purplelaptopSV')
    else
        TriggerEvent('DoLongHudText', "I don't give work out for free!", 2)
    end
end)

RegisterNetEvent('FIXDEV-robberies:getPTablet')
AddEventHandler('FIXDEV-robberies:getPTablet', function()
    Wait(3000)
    TriggerEvent('DoLongHudText', 'Please allow up to 2 hours while we get in contact with our dealer!', 1)
    Citizen.Wait(3.6e+6)
    purpleLap = true
    TriggerEvent('DoLongHudText', 'Head to the location we marked on your gps to pick up the tablet.', 1)
    AddPurpleBlip()
    SetNewWaypoint(509.93, 3098.93)
    Citizen.Wait(3000)
end)

RegisterNetEvent('FIXDEV-robberies:receivePTablet')
AddEventHandler('FIXDEV-robberies:receivePTablet', function()
    if purpleLap == true then 
        if exports["FIXDEV-inventory"]:hasEnoughOfItem("purpleusb", 1) then
            TriggerEvent('inventory:removeItem', 'purpleusb', 1)
            FreezeEntityPosition(PlayerPedId(),true)
            local finished = exports["FIXDEV-taskbar"]:taskBar(45000,"Waiting for a response...")
            TriggerServerEvent('FIXDEV-robberies:removeQueuePurple')
            TriggerEvent('player:receiveItem', 'purplelaptop', 1)
            FreezeEntityPosition(PlayerPedId(),false)
            purpleLap = false
            RemoveBlip(blip)
            blip = nil
        else
            TriggerEvent('DoLongHudText', 'You owe me something in return!', 2)
        end
    end
end)

RegisterNetEvent("FIXDEV-robberies:leavePurpleQueueClient")
AddEventHandler("FIXDEV-robberies:leavePurpleQueueClient", function()
    TriggerServerEvent("FIXDEV-robberies:leavePurpleQueueServer")
end)

--- Orange Tablet ---

RegisterNetEvent('FIXDEV-robberies:orangeQueue')
AddEventHandler('FIXDEV-robberies:orangeQueue', function()
    if exports["FIXDEV-inventory"]:hasEnoughOfItem("orangeusb", 1) then
        TriggerServerEvent('FIXDEV-robberies:orangelaptopSV')
    else
        TriggerEvent('DoLongHudText', 'You are going to need some tools to start working for us!', 2)
    end
end)

RegisterNetEvent('FIXDEV-robberies:getOTablet')
AddEventHandler('FIXDEV-robberies:getOTablet', function()
    Wait(3000)
    TriggerEvent('DoLongHudText', 'Please allow up to 2 hours while we get in contact with our dealer!', 1)
    Citizen.Wait(3.6e+6)
    orangeLap = true
    TriggerEvent('DoLongHudText', 'Head to the location we marked on your gps to pick up the tablet.', 1)
    AddOrangeBlip()
    SetNewWaypoint(1401.37, -1490.43)
    Citizen.Wait(3000)
end)

RegisterNetEvent('FIXDEV-robberies:receiveOTablet')
AddEventHandler('FIXDEV-robberies:receiveOTablet', function()
    if orangeLap == true then 
        if exports["FIXDEV-inventory"]:hasEnoughOfItem("orangeusb", 1) then
            TriggerEvent('inventory:removeItem', 'orangeusb', 1)
            FreezeEntityPosition(PlayerPedId(),true)
            local finished = exports["FIXDEV-taskbar"]:taskBar(45000,"Waiting for a response...") 
            TriggerServerEvent('FIXDEV-robberies:removeQueueOrange')
            TriggerEvent('player:receiveItem', 'orangelaptop', 1)
            FreezeEntityPosition(PlayerPedId(),false)
            orangeLap = false
            RemoveBlip(blip)
            blip = nil
        else
            TriggerEvent('DoLongHudText', 'You owe me something in return!', 2)
        end  
    end
end)

RegisterNetEvent("FIXDEV-robberies:leaveOrangeQueueClient")
AddEventHandler("FIXDEV-robberies:leaveOrangeQueueClient", function()
    TriggerServerEvent("FIXDEV-robberies:leaveOrangeQueueServer")
end)