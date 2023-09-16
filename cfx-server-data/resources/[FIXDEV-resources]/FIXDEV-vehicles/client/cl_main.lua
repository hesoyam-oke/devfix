local pPart = nil

local tuner_internalz = false
local hayes_internalz = false
local ottos_internalz = false
local harmony_internalz = false
local wearingSeatbelt = false
local wearingHarness = false
local currentVehicle = 0
local isInsideVehicle = 0

local degHealth = {
	["breaks"] = 0,-- has neg effect
	["axle"] = 0,	-- has neg effect
	["radiator"] = 0, -- has neg effect 
	["clutch"] = 0,	-- has neg effect
	["transmission"] = 0, -- has neg effect
	["electronics"] = 0, -- has neg effect
	["fuel_injector"] = 0, -- has neg effect
	["fuel_tank"] = 0 -- has neg effect
}

RegisterNetEvent("mech:tools")
AddEventHandler("mech:tools", function(material, amount)
    local shop = exports["isPed"]:isPed("myJob")
    if exports["FIXDEV-inventory"]:hasEnoughOfItem(material, amount,false) then
        TriggerServerEvent("mech:add:materials", material, amount, shop)
    else
        TriggerEvent('DoLongHudText', 'You don\'t have the materials', 2)
    end
end)

RegisterNetEvent("mech:tools:cl")
AddEventHandler("mech:tools:cl", function(materials, amount, deg, plate)
    local shop = exports["isPed"]:isPed("myJob") -- ??
    TriggerServerEvent("mech:remove:materials", materials, amount, deg, plate, shop)
end)

RegisterNetEvent("mech:tools:cl2")
AddEventHandler("mech:tools:cl2", function(input, input2)
    local isEmployedTuner = exports["FIXDEV-business"]:IsEmployedAt("tuner_shop")
    local isEmployedHayes = exports["FIXDEV-business"]:IsEmployedAt("hayes_autos")
    local isEmployedOttos = exports["FIXDEV-business"]:IsEmployedAt("ottos_autos")
    local isEmployedHarmony = exports["FIXDEV-business"]:IsEmployedAt("harmony_repairs")

    if isEmployedTuner or isEmployedHayes or isEmployedOttos or isEmployedHarmony then
        if tuner_internalz or hayes_internalz or ottos_internalz or harmony_internalz  then
            local degname = input
            local amount = tonumber(input2)
            local itemname = ""
            local current = 100

            if not amount then
                TriggerEvent('DoLongHudText', 'Error: You need to do re enter a amount!', 2)
                return
            end

            if degname == "body" then
                TriggerEvent('DoLongHudText', 'Repair this through the bennys menu!', 2)
            end

            if degname == "engine" then
                TriggerEvent('DoLongHudText', 'Repair this through the bennys menu!', 2)
            end

            if degname == "brakes" then
                itemname = "mechanic_breaks_part"
                degname = "breaks"
                current = degHealth["breaks"]
            end

            if  degname == "axle" then
                degname = "axle"
                itemname = "mechanic_axle_part"
                current = degHealth["axle"]
            end

            if degname == "radiator" then
                degname = "radiator"
                itemname = "mechanic_radiator_part"
                current = degHealth["radiator"]
            end

            if degname == "clutch" then
                degname = "clutch"
                itemname = "mechanic_clutch_part"
                current = degHealth["clutch"]
            end

            if degname == "electronics" then
                degname = "electronics"
                itemname = "mechanic_electronics_part"
                current = degHealth["electronics"]
            end

            if degname == "fuel" then
                itemname = "mechanic_fuel_part"
                degname = "fuel_tank"
                current = degHealth["fuel_tank"]
            end

            if degname == "transmission"then
                itemname = "mechanic_transmission_part"
                current = degHealth["transmission"]
            end

            if degname == "injector" then
                itemname = "mechanic_injector_part"
                degname = "fuel_injector"
                current = degHealth["fuel_injector"]
            end

            if amount <= 10 then
                local coordA = GetEntityCoords(PlayerPedId(), 1)
                local coordB = GetOffsetFromEntityInWorldCoords(PlayerPedId(), 0.0, 5.0, 0.0)
                local targetVehicle = getVehicleInDirection(coordA, coordB)
                local plate = GetVehicleNumberPlateText(targetVehicle)
                if exports['FIXDEV-inventory']:hasEnoughOfItem(itemname, amount) then
                    TriggerEvent('inventory:removeItem', itemname, amount)
                    RequestAnimDict("mp_car_bomb")
                    TaskPlayAnim(PlayerPedId(),"mp_car_bomb","car_bomb_mechanic",8.0, -8, -1, 49, 0, 0, 0, 0)
                    Wait(100)
                    TaskPlayAnim(PlayerPedId(),"mp_car_bomb","car_bomb_mechanic",8.0, -8, -1, 49, 0, 0, 0, 0)
                    FreezeEntityPosition(PlayerPedId(), true)
                    local finished = exports["FIXDEV-taskbar"]:taskBar(5000, "Repairing...")
                    if finished == 100 then
                        FreezeEntityPosition(PlayerPedId(), false)
                        if targetVehicle ~= 0 then
                            if itemname ~= "" then
                                TriggerServerEvent('scrap:towTake',degname,itemname, plate, amount, removepart)
                            else
                                TriggerEvent('DoLongHudText', 'Vehicle Part does not exist!', 2)
                            end
                        else
                            TriggerEvent('DoLongHudText', 'No Vehicle!', 2)
                        end
                    else
                        FreezeEntityPosition(PlayerPedId(), false)
                    end
                else
                    print(itemname)
                    TriggerEvent('DoLongHudText', 'You need '..amount..'x '..itemname)
                end
            else
                TriggerEvent('DoLongHudText', 'You cant repair anything higher then 10!', 2)
            end
        else
            TriggerEvent('DoLongHudText', 'You have to be at the mechanic shop !', 2)
        end
    end
end)

exports("getVehicleInDirection", function(coordA, coordB)
    return getVehicleInDirection(coordA, coordB)
end)

function getVehicleInDirection(coordFrom, coordTo)
    local offset = 0
    local rayHandle
    local vehicle

    for i = 0, 100 do
        rayHandle = CastRayPointToPoint(coordFrom.x, coordFrom.y, coordFrom.z, coordTo.x, coordTo.y, coordTo.z + offset, 10, PlayerPedId(), 0)   
        a, b, c, d, vehicle = GetRaycastResult(rayHandle)
        offset = offset - 1
        if vehicle ~= 0 then break end
    end
    
    local distance = Vdist2(coordFrom, GetEntityCoords(vehicle))
    if distance > 25 then vehicle = nil end
    return vehicle ~= nil and vehicle or 0
end

RegisterNetEvent('towgarage:repairamount')
AddEventHandler('towgarage:repairamount', function(PartName)
	local playerped = PlayerPedId()
	local coordA = GetEntityCoords(playerped, 1)
	local coordB = GetOffsetFromEntityInWorldCoords(playerped, 0.0, 5.0, 0.0)
	local targetVehicle = getVehicleInDirection(coordA, coordB)
	local plate = GetVehicleNumberPlateText(targetVehicle)

    local isEmployedTuner = exports["FIXDEV-business"]:IsEmployedAt("tuner_shop")
    local isEmployedHayes = exports["FIXDEV-business"]:IsEmployedAt("hayes_autos")
    local isEmployedOttos = exports["FIXDEV-business"]:IsEmployedAt("ottos_autos")
    local isEmployedHarmony = exports["FIXDEV-business"]:IsEmployedAt("harmony_repairs")

    local part = PartName
    pPart = part
    local pCoordX = GetEntityCoords(PlayerPedId(), 1)
    local pCoordY = GetOffsetFromEntityInWorldCoords(PlayerPedId(), 0.0, 100.0, 0.0)
    local targetVehicle = getVehicleInDirection(pCoordX, pCoordY)
    if isEmployedTuner or isEmployedHayes or isEmployedOttos or isEmployedHarmony then
        if tuner_internalz or hayes_internalz or ottos_internalz or harmony_internalz  then
            exports['FIXDEV-interface']:openApplication('textbox', {
                callbackUrl = 'FIXDEV-vehicles:repair:part',
                key = 1,
                items = {
                    {
                        icon = "toolbox",
                        label = "Amount",
                        name = "PartAmount",
                    },
                },
                show = true,
            })
        end
    end
end)

RegisterInterfaceCallback('FIXDEV-vehicles:repair:part', function(data, cb)
    cb({ data = {}, meta = { ok = true, message = '' } })
    TriggerEvent('mech:tools:cl2', pPart, data.values.PartAmount)
end)

function GetPlayers()
    local players = {}

    for i = 0, 255 do
        if NetworkIsPlayerActive(i) then
            players[#players+1]= i
        end
    end

    return players
end

exports("NearVehicle", function(pType)
    if pType == "Distance" then
        local coords = GetEntityCoords(PlayerPedId())
        if IsAnyVehicleNearPoint(coords.x, coords.y, coords.z, 5.0) then
            vehicle = GetClosestVehicle(coords.x, coords.y, coords.z, 5.0, 0, 71)
            return true
        else
            return false
        end
    elseif pType == "plate" then
        local coords = GetEntityCoords(PlayerPedId())
        if IsAnyVehicleNearPoint(coords.x, coords.y, coords.z, 5.0) then
            vehicle = GetClosestVehicle(coords.x, coords.y, coords.z, 5.0, 0, 71)
            return GetVehicleNumberPlateText(vehicle)
        else
            return false
        end
    elseif pType == "Fuel" then
        local coords = GetEntityCoords(PlayerPedId())
        if IsAnyVehicleNearPoint(coords.x, coords.y, coords.z, 5.0) then
            vehicle = GetClosestVehicle(coords.x, coords.y, coords.z, 5.0, 0, 71)
            return  GetVehicleFuelLevel(vehicle)
        else
            return false
        end
    end
end)

RegisterCommand("transfer", function(source, args)
    TriggerEvent("transfer:attempt")
end)

RegisterNetEvent("transfer:attempt")
AddEventHandler("transfer:attempt", function()
    local coords = GetEntityCoords(PlayerPedId())
    if IsAnyVehicleNearPoint(coords.x, coords.y, coords.z, 5.0) then
        vehicle = GetClosestVehicle(coords.x, coords.y, coords.z, 5.0, 0, 71)
        if DoesEntityExist(vehicle) then
            t, distance = GetClosestPlayer()
	        if(distance ~= -1 and distance < 2) then
                local plate = GetVehicleNumberPlateText(vehicle)
                TriggerServerEvent("transfer:attempt:send", plate, GetPlayerServerId(t))
            else
                TriggerEvent("DoLongHudText", "You are not near anyone to transfer the vehicle too", 2)
            end
        end
    end
end)

function GetClosestPlayer()
    local players = GetPlayers()
    local closestDistance = -1
    local closestPlayer = -1
    local ply = PlayerPedId()
    local plyCoords = GetEntityCoords(ply, 0)
    
    for index,value in ipairs(players) do
        local target = GetPlayerPed(value)
        if(target ~= ply) then
            local targetCoords = GetEntityCoords(GetPlayerPed(value), 0)
            local distance = #(vector3(targetCoords["x"], targetCoords["y"], targetCoords["z"]) - vector3(plyCoords["x"], plyCoords["y"], plyCoords["z"]))
            if(closestDistance == -1 or closestDistance > distance) then
                closestPlayer = value
                closestDistance = distance
            end
        end
    end
    
    return closestPlayer, closestDistance
end

-- Polyzone --

Citizen.CreateThread(function()
    -- Tuner --
    exports["FIXDEV-polyzone"]:AddBoxZone("tuner_shop_zone", vector3(138.56, -3033.86, 7.03), 30, 30, {
        name="tuner_shop_zone",
        heading=0,
        minZ=5.03,
        maxZ=9.03
    })

    -- Hayes Autos --

    exports["FIXDEV-polyzone"]:AddBoxZone("hayes_autos_zone", vector3(-1419.09, -446.42, 35.9), 15, 23.2, {
        name="hayes_autos_zone",
        heading=35,
        minZ=27.7,
        maxZ=38.9
    })

    -- Ottos Autos --

    exports["FIXDEV-polyzone"]:AddBoxZone("ottos_autos_zone", vector3(829.81, -813.39, 26.33), 15, 20.0, {
        name="ottos_autos_zone",
        heading=270,
        minZ=25.33,
        maxZ=29.33
    })

    -- Harmony Repairs --

    exports["FIXDEV-polyzone"]:AddBoxZone("harmony_repairs_zone", vector3(1177.6, 2639.84, 37.75), 10, 13.0, {
        name="harmony_repairs_zone",
        heading=0,
        minZ=36.75,
        maxZ=40.75
    })
end)

RegisterNetEvent('FIXDEV-polyzone:enter')
AddEventHandler('FIXDEV-polyzone:enter', function(name)
    if name == "tuner_shop_zone" then
        tuner_internalz = true
    elseif name == "hayes_autos_zone" then
        hayes_internalz = true
    elseif name == "ottos_autos_zone" then
        ottos_internalz = true
    elseif name == "harmony_repairs_zone" then
        harmony_internalz = true
    end
end)

RegisterNetEvent('FIXDEV-polyzone:exit')
AddEventHandler('FIXDEV-polyzone:exit', function(name)
    if name == "tuner_shop_zone" then
        tuner_internalz = false
    elseif name == "hayes_autos_zone" then
        hayes_internalz = false
    elseif name == "ottos_autos_zone" then
        ottos_internalz = false
    elseif name == "harmony_repairs_zone" then
        harmony_internalz = false
    end
end)

CreateThread(function()
  while true do
    Citizen.Wait(0)
    if currentVehicle ~= 0 then
      if wearingHarness then
        DisableControlAction(0, 75, true)
        if IsDisabledControlJustPressed(1, 75) then
          TriggerEvent('DoLongHudText', 'You probably should undo your harness...', 101)
        end
      else
        Citizen.Wait(1000)
      end
    else
      Citizen.Wait(5000)
    end
  end
end)

local function isDriver()
  return GetPedInVehicleSeat(currentVehicle, -1) == PlayerPedId()
end

function toggleSeatbelt()
  currentVehicle = GetVehiclePedIsIn(PlayerPedId())
  isInsideVehicle = currentVehicle ~= 0

  if isInsideVehicle then
    local harnessLevel = exports['FIXDEV-vehicles']:GetVehicleMetadata(currentVehicle, 'harness') or 0
    local hasHarness = harnessLevel > 0
    if wearingSeatbelt and not wearingHarness then -- Wearing seatbelt but no harness, taking off
      TriggerEvent('InteractSound_CL:PlayOnOne', 'seatbeltoff', 0.7)
      wearingSeatbelt = true
      SetFlyThroughWindscreenParams(10.0, 1.0, 1.0, 1.0)
    elseif wearingSeatbelt and wearingHarness and isDriver() then -- Wearing seatbelt/harness, taking off
      toggleHarness(false)
    elseif not wearingSeatbelt and not wearingSeatbelt and isDriver() and hasHarness then -- Not wearing anything and have harness
      toggleHarness(true)
    elseif not wearingSeatbelt and not wearingHarness then
      TriggerEvent('InteractSound_CL:PlayOnOne', 'seatbelt', 0.7) -- Not wearing anything and have no harness
      wearingSeatbelt = true
      SetFlyThroughWindscreenParams(45.0, 1.0, 1.0, 1.0)
    end
    TriggerEvent('harness', wearingHarness, exports['FIXDEV-vehicles']:GetVehicleMetadata(currentVehicle, 'harness'))
    TriggerEvent('seatbelt', wearingSeatbelt)
  end
end

function toggleHarness(pState)
  local defaultSteering = GetVehicleHandlingFloat(currentVehicle, 'CHandlingData', 'fSteeringLock')
  local harnessTimer = exports['FIXDEV-taskbar']:taskBar(5000, (pState and 'Putting on Harness' or 'Taking off Harness'), true)
  if harnessTimer == 100 then
    wearingHarness = pState
    wearingSeatbelt = pState
    TriggerEvent('InteractSound_CL:PlayOnOne', (pState and 'seatbelt' or 'seatbeltoff'), 0.7)
  end
end

AddEventHandler('baseevents:enteredVehicle', function(pCurrentVehicle, currentSeat, vehicleDisplayName)
  currentVehicle = pCurrentVehicle
end)

AddEventHandler('baseevents:leftVehicle', function(pCurrentVehicle, pCurrentSeat, vehicleDisplayName)
  wearingHarness = false
  wearingSeatbelt = false
  currentVehicle = 0
  TriggerEvent('harness', false, 0);
  TriggerEvent('seatbelt', false);
end)
