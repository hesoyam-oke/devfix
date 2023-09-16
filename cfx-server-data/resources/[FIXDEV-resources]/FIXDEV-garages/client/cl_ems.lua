local nearBuy2 = false

Citizen.CreateThread(function()
    exports["FIXDEV-polyzone"]:AddBoxZone("ems_buy", vector3(301.07, -574.73, 43.26), 1.4, 1, {
        name="ems_buy",
        heading=18,
        --debugPoly=false,
        minZ=40.46,
        maxZ=44.66
    }) 
end)

RegisterNetEvent('FIXDEV-polyzone:enter')
AddEventHandler('FIXDEV-polyzone:enter', function(name)
    if name == 'ems_buy' then
		local job = exports["isPed"]:isPed("myJob")
		if job == 'ems' then
            nearBuy2 = true
            AtEmsBuy()
            exports["FIXDEV-ui"]:showInteraction("[E] Buy Vehicle")
        end
    end
end)

RegisterNetEvent('FIXDEV-polyzone:exit')
AddEventHandler('FIXDEV-polyzone:exit', function(name)
    if name == 'ems_buy' then
        nearBuy2 = false
    end
    exports["FIXDEV-ui"]:hideInteraction()
end)

function AtEmsBuy()
	Citizen.CreateThread(function()
        while nearBuy2 do
            Citizen.Wait(5)
            local plate = GetVehicleNumberPlateText(vehicle)
            local job = exports["isPed"]:isPed("myJob")
            if job == 'ems' then
                if IsControlJustReleased(0, 38) then
                    TriggerEvent('FIXDEV-garages:openBuyMenu2')
                end
            end
        end
    end)
end

RegisterNetEvent('FIXDEV-garages:openBuyMenu2')
AddEventHandler('FIXDEV-garages:openBuyMenu2', function()
    TriggerEvent('FIXDEV-context:sendMenu', {
		{
			id = 1,
			header = "EMS Ambulance",
			txt = "Purchase for $5000",
			params = {
				event = "FIXDEV-garages:PurchasedAmb"
			}
		},
        {
			id = 2,
			header = "EMS Speedo",
			txt = "Purchase for $15000",
			params = {
				event = "FIXDEV-garages:PurchasedSpeedo"
			}
		},
        {
			id = 3,
			header = "EMS Explorer",
			txt = "Purchase for $35000",
			params = {
				event = "FIXDEV-garages:PurchasedExp"
			}
		},
        
	})
end)

RegisterNetEvent('FIXDEV-garages:PurchasedSpeedo')
AddEventHandler('FIXDEV-garages:PurchasedSpeedo', function()
    if exports["isPed"]:isPed("mycash") >= 15000 then
        --TriggerServerEvent('bankingremoveMoney')
        TriggerServerEvent('yorktax:speedo')
        TriggerEvent('FIXDEV-garages:PurchasedVeh2', 'Speedo', 'emsnspeedo', '0')
    else
        TriggerEvent('DoLongHudText', "You do not have enough money!", 2)
    end
end)

RegisterNetEvent('FIXDEV-garages:PurchasedAmb')
AddEventHandler('FIXDEV-garages:PurchasedAmb', function()
    if exports["isPed"]:isPed("mycash") >= 5000 then 
        --TriggerServerEvent('bankingremoveMoney', 5000)
        TriggerServerEvent('yorktax:bamb')
        TriggerEvent('FIXDEV-garages:PurchasedVeh2', 'Ambulance', 'emsa', '0')
    else
        TriggerEvent('DoLongHudText', "You do not have enough money!", 2)
    end
end)

RegisterNetEvent('FIXDEV-garages:PurchasedBexp')
AddEventHandler('FIXDEV-garages:PurchasedBexp', function()
    if exports["isPed"]:isPed("mycash") >= 15000 then
        --TriggerServerEvent('bankingremoveMoney', 5000)
        TriggerServerEvent('yorktax:bexp')
        TriggerEvent('FIXDEV-garages:PurchasedVeh2', 'Explorer', 'npolexp2', '0')
    else
        TriggerEvent('DoLongHudText', "You do not have enough money!", 2)
    end
end)   

RegisterNetEvent('FIXDEV-garages:PurchasedExp')
AddEventHandler('FIXDEV-garages:PurchasedExp', function()
    if exports["isPed"]:isPed("mycash") >= 35000 then
        --TriggerServerEvent('bankingremoveMoney', 5000)
        TriggerServerEvent('yorktax:emspro')
        TriggerEvent('FIXDEV-garages:PurchasedVeh2', 'Sierra', 'npolexp2', '0')
    else
        TriggerEvent('DoLongHudText', "You do not have enough money!", 2)
    end
end)  

RegisterNetEvent('FIXDEV-garages:PurchasedVeh2')
AddEventHandler('FIXDEV-garages:PurchasedVeh2', function(name, veh, price)
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

    personalvehicle = CreateVehicle(model,293.11840820313, -582.34124755859, 42.966762542725,true,false)
    SetEntityHeading(personalvehicle,  342.69833374023)
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
    --SetVehicleColours(personalvehicle,colors[1],colors[2])
    --SetVehicleExtraColours(personalvehicle,extra_colors[1])
    TaskWarpPedIntoVehicle(PlayerPedId(),personalvehicle,-1)
    SetEntityVisible(ped,true)            
    local primarycolor = colors[1]
    local secondarycolor = colors[2]    
    local pearlescentcolor = extra_colors[1]
    --local VehicleProps = exports['FIXDEV-base']FetchVehProps(personalvehicle)
    local model = GetEntityModel(personalvehicle)
    local vehname = GetDisplayNameFromVehicleModel(model)
    TriggerEvent("keys:addNew",personalvehicle, plate)
    TriggerServerEvent('FIXDEV-garages:FinalizedPur2', plate, name, vehicle, price)
    Citizen.Wait(100)
    exports['FIXDEV-ui']:hideInteraction()
end)

RegisterNetEvent('spawnvehpd33')
AddEventHandler('spawnvehpd33', function(type)
	SpawnVehPD33(type.vehicle)	
end)

function SpawnVehPD33(name)
	Citizen.CreateThread(function()

        local hash = GetHashKey(name)

        if not IsModelAVehicle(hash) then return end
        if not IsModelInCdimage(hash) or not IsModelValid(hash) then return end
        
        RequestModel(hash)

        while not HasModelLoaded(hash) do
            Citizen.Wait(0)
        end

		local spawnLocation = findClosestSpawnPointPD33(GetEntityCoords(PlayerPedId()))
		local getVehicleInArea = GetClosestVehicle(spawnLocation, 3.000, 0, 70)
		if DoesEntityExist(getVehicleInArea) then
		  TriggerEvent(DoLongHudText, "The area is crowded", 2)
		  return
		end

        local vehicle = CreateVehicle(hash, 293.11840820313, -582.34124755859, 42.966762542725, 342.69833374023, true, false)

        local plate = GetVehicleNumberPlateText(vehicle)
        TriggerEvent(keysaddNew,vehicle,plate)
        SetModelAsNoLongerNeeded(hash)
        applyMaxUpgrades(vehicle)
        SetVehicleDirtLevel(vehicle, 0)
        SetVehicleWindowTint(vehicle, 0)
		TaskWarpPedIntoVehicle(PlayerPedId(), vehicle, -1)
        if livery ~= nil then
            SetVehicleLivery(vehicle, tonumber(livery))
        end
        LastVehicle = vehicle
    end)
end

function applyMaxUpgrades(veh)
	SetVehicleModKit(veh, 0)
    SetVehicleMod(veh, 11, 3, false)
    SetVehicleMod(veh, 12, 2, false)
    SetVehicleMod(veh, 13, 2, false)
    SetVehicleMod(veh, 15, 3, false)
    SetVehicleMod(veh, 16, 4, false)
end

function findClosestSpawnPointPD33(pCurrentPosition)
	local coords = vector3(449.27819824219, -981.24462890625, 43.691368103027)
	local closestDistance = -1
	local closestCoord = pCurrentPosition
	local distance = #(coords - pCurrentPosition)
	if closestDistance == -1 or closestDistance > distance then
	  closestDistance = distance
	  closestCoord = coords
	end
	return closestCoord
end