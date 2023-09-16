RegisterNetEvent('FIXDEV-fuel:initFuel')
AddEventHandler('FIXDEV-fuel:initFuel', function(sentVeh)
	local veh = NetworkGetEntityFromNetworkId(sentVeh)
	if veh ~= 0 then
		Entity(veh).state.fuel = math.random(40, 60)
	end
end)

AddEventHandler('FIXDEV-fuel:setFuel', function(sentVeh, sentFuel)
	if type(sentFuel) == 'number' and sentFuel >= 0 and sentFuel <= 100 then
		if DoesEntityExist(sentVeh) then
			Entity(sentVeh).state.fuel = sentFuel
		else
			Entity(NetworkGetEntityFromNetworkId(sentVeh)).state.fuel = sentFuel
		end
	end
end)

local function GetFuel(sentVeh)
	if DoesEntityExist(sentVeh) then
		return Entity(sentVeh).state.fuel
	else
		return Entity(NetworkGetEntityFromNetworkId(sentVeh)).state.fuel
	end
end

exports('GetFuel', GetFuel) -- exports['FIXDEV-fuel']:GetFuel(veh)

RegisterCommand("setfuel", function(source, args, rawCommand)
	TriggerEvent('FIXDEV-fuel:setFuel', GetVehiclePedIsIn(GetPlayerPed(source)), tonumber(args[1]))
	Wait(500)
	print(GetFuel(GetVehiclePedIsIn(GetPlayerPed(source))))
end, false)

RegisterNetEvent('FIXDEV-fuel:PurchaseSuccessful', function(gprice)
	local pSrc = source
	local user = exports["FIXDEV-base"]:getModule("Player"):GetUser(pSrc)

	if user:getBalance() >= gprice then
		print(gprice)
		user:removeBank(gprice)
	else
		TriggerClientEvent('DoLongHudText', pSrc, 'Not enough money in bank!', 2)
	end
end)

RegisterNetEvent('FIXDEV-fuel:Refund', function(gprice)
	local pSrc = source
	exports['FIXDEV-fw']:GetModule('AddBank')(pSrc, tonumber(gprice))
end)