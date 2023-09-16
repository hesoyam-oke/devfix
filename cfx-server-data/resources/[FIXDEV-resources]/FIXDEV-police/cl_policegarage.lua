local nearBuy = false

Citizen.CreateThread(function()
    exports["FIXDEV-polyzone"]:AddBoxZone("police_buy", vector3(464.53, -1012.86, 28.43), 1.6, 1.45, {
		name="police_buy",
		heading=0,
    }) 
end)

RegisterNetEvent('FIXDEV-polyzone:enter')
AddEventHandler('FIXDEV-polyzone:enter', function(name)
    if name == "police_buy" then
		local job = exports["isPed"]:isPed("myJob")
		if job == 'police' or job == 'state' or job == 'sheriff' or job == 'ranger' then
            nearBuy = true
            AtPoliceBuy()
			exports['FIXDEV-ui']:showInteraction(("[E] %s"):format("Purchase Vehicle"))
        end
    end
end)

RegisterNetEvent('FIXDEV-polyzone:exit')
AddEventHandler('FIXDEV-polyzone:exit', function(name)
    if name == "police_buy" then
        nearBuy = false
    end
    exports['FIXDEV-ui']:hideInteraction()
end)

function AtPoliceBuy()
	Citizen.CreateThread(function()
        while nearBuy do
            Citizen.Wait(5)
            local plate = GetVehicleNumberPlateText(vehicle)
            local job = exports["isPed"]:isPed("myJob")
            if job == 'police' or job == 'state' or job == 'sheriff' or job == 'ranger' then
                if IsControlJustReleased(0, 38) then
                    TriggerEvent('FIXDEV-garages:openBuyMenu')
                end
            end
        end
    end)
end

RegisterNetEvent('FIXDEV-garages:openBuyMenu')
AddEventHandler('FIXDEV-garages:openBuyMenu', function()

	local PDBuyData = {
		{
            title = "Police Crown Vic",
            description = "Purchase For $80,000",
            key = "EVENTS.VIC",
            action = 'FIXDEV-garage:buy_vic',
        },
        {
            title = "Police Explorer",
            description = "Purchase For $50,000",
            key = "EVENTS.EXP",
            action = 'FIXDEV-garage:buy_exp',
        },
    }
    exports["FIXDEV-ui"]:showContextMenu(PDBuyData)
end)

RegisterUICallback('FIXDEV-garage:buy_exp', function(data, cb)
    cb({ data = {}, meta = { ok = true, message = '' } })
    TriggerEvent('FIXDEV-garages:PurchasedExp')
end)

RegisterUICallback('FIXDEV-garage:buy_vic', function(data, cb)
	cb({ data = {}, meta = { ok = true, message = '' } })
    TriggerEvent('FIXDEV-garages:PurchasedVic')
end)

RegisterNetEvent('FIXDEV-garages:openBuyMenu2')
AddEventHandler('FIXDEV-garages:openBuyMenu2', function()

	local EMSBuyData = {
		{
            title = "Police Ambulance",
            description = "Purchase For $80,000",
            key = "EVENTS.AMB",
            action = 'FIXDEV-garage:buy_amb',
        },
    }
    exports["FIXDEV-ui"]:showContextMenu(EMSBuyData)
end)

RegisterUICallback('FIXDEV-garage:buy_amb', function(data, cb)
	cb({ data = {}, meta = { ok = true, message = '' } })
    TriggerEvent('FIXDEV-garages:PurchasedAmbo')
end)

RegisterNetEvent('FIXDEV-garages:PurchasedAmbo')
AddEventHandler('FIXDEV-garages:PurchasedAmbo', function()
    if exports["isPed"]:isPed("mycash") >= 80000 then
        TriggerServerEvent('FIXDEV-banking:removeMoney', 80000)
        TriggerEvent('FIXDEV-garages:PurchasedVeh', 'Ambulance', 'emsnspeedo', '80000')
    else
        TriggerEvent('DoLongHudText', "You do not have enough money!", 2)
    end
end)

RegisterNetEvent('FIXDEV-garages:PurchasedVic')
AddEventHandler('FIXDEV-garages:PurchasedVic', function()
    if exports["isPed"]:isPed("mycash") >= 80000 then
        TriggerServerEvent('FIXDEV-banking:removeMoney', 80000)
        TriggerEvent('FIXDEV-garages:PurchasedVeh', 'Police Vic', 'npolvic', '80000')
    else
        TriggerEvent('DoLongHudText', "You do not have enough money!", 2)
    end
end)

RegisterNetEvent('FIXDEV-garages:PurchasedExp')
AddEventHandler('FIXDEV-garages:PurchasedExp', function()
    if exports["isPed"]:isPed("mycash") >= 50000 then
        TriggerServerEvent('FIXDEV-banking:removeMoney', 50000)
        TriggerEvent('FIXDEV-garages:PurchasedVeh', 'Explorer', 'npolexp', '50000')
    else
        TriggerEvent('DoLongHudText', "You do not have enough money!", 2)
    end
end)

RegisterNetEvent('FIXDEV-garages:PurchasedCharger')
AddEventHandler('FIXDEV-garages:PurchasedCharger', function()
    if exports["isPed"]:isPed("mycash") >= 160000 then
        TriggerServerEvent('FIXDEV-banking:removeMoney', 160000)
        TriggerEvent('FIXDEV-garages:PurchasedVeh', 'Police Charger', 'npolchar', '160000')
    else
        TriggerEvent('DoLongHudText', "You do not have enough money!", 2)
    end
end)

RegisterNetEvent('FIXDEV-garages:PurchasedExplorer')
AddEventHandler('FIXDEV-garages:PurchasedExplorer', function()
    if exports["isPed"]:isPed("mycash") >= 100000 then
        TriggerServerEvent('FIXDEV-banking:removeMoney', 100000)
        TriggerEvent('FIXDEV-garages:PurchasedVeh', 'Police Explorer', 'polsuv', '100000')
    else
        TriggerEvent('DoLongHudText', "You do not have enough money!", 2)
    end
end)
    

RegisterNetEvent('FIXDEV-garages:PurchasedVeh')
AddEventHandler('FIXDEV-garages:PurchasedVeh', function(name, veh, price)
    local ped = PlayerPedId()
    local name = name	
    local vehicle = veh
    local price = price		
    local model = veh
    local colors = table.pack(GetVehicleColours(veh))
    local extra_colors = table.pack(GetVehicleExtraColours(veh))

    local mods = {}

    for i = 0,24 do
        mods[i] = GetVehicleMod(veh,i)
    end

    FreezeEntityPosition(ped,false)
    RequestModel(model)
    while not HasModelLoaded(model) do
        Citizen.Wait(0)
    end

    local job = exports["isPed"]:isPed("myJob")
    if job == 'police' or job == 'state' or job == 'sheriff' or job == 'ranger' then
        personalvehicle = CreateVehicle(model,462.81759643555,-1019.5252685547,28.100341796875,87.874015808105,true,false)
        SetEntityHeading(personalvehicle, 87.874015808105)
    elseif job == 'ems' then
        personalvehicle = CreateVehicle(model,333.1516418457,-575.947265625,28.791259765625,340.15747070312,true,false)
        SetEntityHeading(personalvehicle, 340.15747070312)
    end
        
    SetModelAsNoLongerNeeded(model)

    for i,mod in pairs(mods) do
        SetVehicleModKit(personalvehicle,0)
        SetVehicleMod(personalvehicle,i,mod)
    end

    SetVehicleOnGroundProperly(personalvehicle)

    local plate = GetVehicleNumberPlateText(personalvehicle)
    SetVehicleHasBeenOwnedByPlayer(personalvehicle,true)
    local id = NetworkGetNetworkIdFromEntity(personalvehicle)
    SetNetworkIdCanMigrate(id, true)
    Citizen.InvokeNative(0x629BFA74418D6239,Citizen.PointerValueIntInitialized(personalvehicle))
    SetVehicleColours(personalvehicle,colors[1],colors[2])
    SetVehicleExtraColours(personalvehicle,extra_colors[1],extra_colors[2])
    TaskWarpPedIntoVehicle(PlayerPedId(),personalvehicle,-1)
    SetEntityVisible(ped,true)			
    local primarycolor = colors[1]
    local secondarycolor = colors[2]	
    local pearlescentcolor = extra_colors[1]
    local wheelcolor = extra_colors[2]
    local VehicleProps = exports['FIXDEV-base']:FetchVehProps(personalvehicle)
    local model = GetEntityModel(personalvehicle)
    local vehname = GetDisplayNameFromVehicleModel(model)
    TriggerEvent("vehicle:keys:addNew",personalvehicle, plate)
    TriggerServerEvent('FIXDEV-garages:FinalizedPur', plate, name, vehicle, price, VehicleProps)
    Citizen.Wait(100)
    exports['FIXDEV-ui']:hideInteraction()
end)