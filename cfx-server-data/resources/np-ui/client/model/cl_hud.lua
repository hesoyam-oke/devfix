local compassEnabled = true
local compassRoadNamesEnabled = true
local compassWaitTime = 64
local speedometerWaitTime = 64
local showCompassFromWatch = false
local showCompassFromCar = false
local minimapEnabled = true
local wasMinimapEnabled = true
local useDefaultMinimap = false
local appliedTextureChange = false
local inVehicle = false
local engineOn = false
local isDead = false
local area = ""
local street = ""
local runningRoadNames = false
local compassRunning = false
local fuel = 0
local altitude = 0
local speed = 0
local onIsland = false
local forceShowMinimap = false
local carHudShow = false

RegisterNUICallback('np-ui:hudSetPreferences', function(data, cb)
    compassEnabled = data["hud.compass.enabled"] or true
    compassWaitTime = tonumber(data["hud.compass.fps"]) or 64
    compassRoadNamesEnabled = data["hud.compass.roadnames.enabled"] or true
    speedometerWaitTime = 64 --tonumber(data["hud.vehicle.speedometer.fps"]) or 64
    minimapEnabled = data["hud.vehicle.minimap.enabled"] or true
    useDefaultMinimap = data["hud.vehicle.minimap.default"] or false
end)


local function toggleCompass()
    sendAppEvent("hud.compass", {
        showCompass = showCompassFromWatch or (compassEnabled and showCompassFromCar),
        showRoadNames = compassRoadNamesEnabled and inVehicle,
    })
end

AddEventHandler("np-hud:watch", function()
    showCompassFromWatch = not showCompassFromWatch
    if showCompassFromWatch then
        generateCompass()
    end
    toggleCompass()
end)

AddEventHandler("np-hud:watch:reset", function()
    showCompassFromWatch = false
    toggleCompass()
end)

RegisterNetEvent('np-inventory:itemCheck')
AddEventHandler('np-inventory:itemCheck', function (item, hasItem, quantity)
    if item ~= "watch" then return end
    if hasItem and quantity > 0 then return end
    showCompassFromWatch = false
    toggleCompass()
end)

Citizen.CreateThread( function()

	local resetcounter = 0
	local jumpDisabled = false
  	
  	while true do 
    Citizen.Wait(100)
		if jumpDisabled and resetcounter > 0 and IsPedJumping(PlayerPedId()) then
			
			SetPedToRagdoll(PlayerPedId(), 1000, 1000, 3, 0, 0, 0)

			resetcounter = 0
		end

		if not jumpDisabled and IsPedJumping(PlayerPedId()) then

			jumpDisabled = true
			resetcounter = 10
			Citizen.Wait(1200)
		end

		if resetcounter > 0 then
			resetcounter = resetcounter - 1
		else
			if jumpDisabled then
				resetcounter = 0
				jumpDisabled = false
			end
		end
	end
end)

AddEventHandler("np:voice:proximity", function(proximity)
    sendAppEvent("hud", {
        voiceRange = proximity,
    })
end)

AddEventHandler("np:voice:transmissionStarted", function(data)
    sendAppEvent("hud", {
        voiceActive = not data.radio,
        voiceActiveRadio = data.radio,
    })
end)

AddEventHandler("np:voice:transmissionFinished", function()
    sendAppEvent("hud", {
        voiceActive = false,
        voiceActiveRadio = false,
    })
end)

AddEventHandler("pd:deathcheck", function()
    --print("is dead, send to HUD")
    isDead = not isDead
    sendAppEvent("game", {
        isAlive = not isDead
    })
end)

RegisterNetEvent("np-admin:currentDevmode")
AddEventHandler("np-admin:currentDevmode", function(devmode)
    setGameValue("modeDev", devmode)
end)

RegisterNetEvent("np-admin:currentDebug")
AddEventHandler("np-admin:currentDebug", function(debugToggle)
    setGameValue("modeDebug", debugToggle)
end)

RegisterNetEvent("carandplayerhud:godCheck", function(toggle)
    setGameValue("modeGod", toggle)
end)

inPursuitVehicle = false
currentPursuitMode = 0

local boostCompletions = 0
local showBoostCompletions = false

RegisterNetEvent('np-boosting:client:setBoostCompletions')
AddEventHandler('np-boosting:client:setBoostCompletions', function (pAmount)
    boostCompletions = pAmount
    setHudValue("boostCompletions", boostCompletions)
end)

function roundedRadar()
    if not minimapEnabled or (not inVehicle and not forceShowMinimap) then
        DisplayRadar(0)
        SetRadarBigmapEnabled(true, false)
        Citizen.Wait(0)
        SetRadarBigmapEnabled(false, false)
        return
    end
    Citizen.CreateThread(function()
        if not appliedTextureChange and not useDefaultMinimap then
          RequestStreamedTextureDict("circlemap", false)
          while not HasStreamedTextureDictLoaded("circlemap") do
              Citizen.Wait(0)
          end
          AddReplaceTexture("platform:/textures/graphics", "radarmasksm", "circlemap", "radarmasklg")
          AddReplaceTexture("platform:/textures/graphics", "radarmasklg", "circlemap", "radarmasklg")
          appliedTextureChange = true
        elseif appliedTextureChange and useDefaultMinimap then
          appliedTextureChange = false
          RemoveReplaceTexture("platform:/textures/graphics", "radarmasksm")
          RemoveReplaceTexture("platform:/textures/graphics", "radarmasklg")
        end

        SetBlipAlpha(GetNorthRadarBlip(), 0.0)

        local screenX, screenY = GetScreenResolution()
        local modifier = screenY / screenX

        local baseXOffset = 0.0046875
        local baseYOffset = 0.74

        local baseSize    = 0.20 -- 20% of screen

        local baseXWidth  = 0.1313 -- baseSize * modifier -- %
        local baseYHeight = baseSize -- %

        local baseXNumber = screenX * baseSize  -- 256
        local baseYNumber = screenY * baseSize  -- 144

        local radiusX     = baseXNumber / 2     -- 128
        local radiusY     = baseYNumber / 2     -- 72

        local innerSquareSideSizeX = math.sqrt(radiusX * radiusX * 2) -- 181.0193
        local innerSquareSideSizeY = math.sqrt(radiusY * radiusY * 2) -- 101.8233

        local innerSizeX = ((innerSquareSideSizeX / screenX) - 0.01) * modifier
        local innerSizeY = innerSquareSideSizeY / screenY

        local innerOffsetX = (baseXWidth - innerSizeX) / 2
        local innerOffsetY = (baseYHeight - innerSizeY) / 2

        local innerMaskOffsetPercentX = (innerSquareSideSizeX / baseXNumber) * modifier

        local function setPos(type, posX, posY, sizeX, sizeY)
            SetMinimapComponentPosition(type, "I", "I", posX, posY, sizeX, sizeY)
        end
        if not useDefaultMinimap then
          setPos("minimap",       baseXOffset - (0.025 * modifier), baseYOffset - 0.025, baseXWidth + (0.05 * modifier), baseYHeight + 0.05)
          setPos("minimap_blur",  baseXOffset, baseYOffset, baseXWidth + 0.001, baseYHeight)
          -- setPos("minimap_mask",  baseXOffset + innerOffsetX, baseYOffset + innerOffsetY, innerSizeX, innerSizeY)
          -- The next one is FUCKING WEIRD.
          -- posX is based off top left 0.0 coords of minimap - 0.00 -> 1.00
          -- posY seems to be based off of the top of the minimap, with 0.75 representing 0% and 1.75 representing 100%
          -- sizeX is based off the size of the minimap - 0.00 -> 0.10
          -- sizeY seems to be height based on minimap size, ranging from -0.25 to 0.25
          setPos("minimap_mask", 0.1, 0.95, 0.09, 0.15)
          -- setPos("minimap_mask", 0.0, 0.75, 1.0, 1.0)
          -- setPos("minimap_mask",  baseXOffset, baseYOffset, baseXWidth, baseYHeight)
        else
          local function setPosLB(type, posX, posY, sizeX, sizeY)
              SetMinimapComponentPosition(type, "L", "B", posX, posY, sizeX, sizeY)
          end
          local offsetX = -0.018
          local offsetY = 0.025

          local defaultX = -0.0045
          local defaultY = 0.002

          local maskDiffX = 0.020 - defaultX
          local maskDiffY = 0.032 - defaultY
          local blurDiffX = -0.03 - defaultX
          local blurDiffY = 0.022 - defaultY

          local defaultMaskDiffX = 0.0245
          local defaultMaskDiffY = 0.03

          local defaultBlurDiffX = 0.0255
          local defaultBlurDiffY = 0.02

          setPosLB("minimap",       -0.0045,  -0.0245,  0.150, 0.18888)
          setPosLB("minimap_mask",  0.020,    0.022,  0.111, 0.159)
          setPosLB("minimap_blur",  -0.03,    0.002,  0.266, 0.237)
        end
        if not useDefaultMinimap then
          SetMinimapClipType(1)
        else
          SetMinimapClipType(0)
        end
        DisplayRadar(0)
        SetRadarBigmapEnabled(true, false)
        Citizen.Wait(0)
        SetRadarBigmapEnabled(false, false)
        DisplayRadar(1)
    end)
end

function generateRoadNames()
    if not compassRoadNamesEnabled or runningRoadNames then return end
    Citizen.CreateThread(function()
        runningRoadNames = true
        while compassRoadNamesEnabled and inVehicle do
            Citizen.Wait(500)

            local playerCoords = GetEntityCoords(PlayerPedId(), true)
            local currentStreetHash, intersectStreetHash = GetStreetNameAtCoord(playerCoords.x, playerCoords.y, playerCoords.z, currentStreetHash, intersectStreetHash)
            currentStreetName = GetStreetNameFromHashKey(currentStreetHash)
            intersectStreetName = GetStreetNameFromHashKey(intersectStreetHash)
            zone = tostring(GetNameOfZone(playerCoords))
            area = GetLabelText(zone)

            if area == "Fort Zancudo" then
                area = "Williamsburg"
            end

            if intersectStreetName ~= nil and intersectStreetName ~= "" then
                playerStreetsLocation = currentStreetName .. " [" .. intersectStreetName .. "]"
            elseif currentStreetName ~= nil and currentStreetName ~= "" then
                playerStreetsLocation = currentStreetName
            else
                playerStreetsLocation = ""
            end

            street = playerStreetsLocation
        end
        runningRoadNames = false
    end)
end

function round(num, numDecimalPlaces)
    local mult = 10^(numDecimalPlaces or 0)
    return math.floor(num + 0.5 * mult)
end

function generateCompass()
    if compassRunning then return end
    compassRunning = true
    Citizen.CreateThread(function()
        local function shouldShowCompass()
            return showCompassFromWatch or (compassEnabled and showCompassFromCar)
        end
        local function shouldShowSpeed()
            return inVehicle and minimapEnabled
        end
        while shouldShowCompass() or shouldShowSpeed() do
            local cWait = shouldShowCompass() and compassWaitTime or 16
            local sWait = shouldShowSpeed() and speedometerWaitTime or 16
            Citizen.Wait(math.min(cWait, sWait))
            local s = GetGameTimer()
            local camRot = GetGameplayCamRot(0)
            local heading = math.floor(-GetFinalRenderedCamRot(0).z % 360)

            sendAppEvent("hud.compass", {
                alt = altitude,
                area = area,
                heading = heading,
                speed = speed,
                street = street,
            })

        end
        compassRunning = false
    end)
end

-- SPEEDOMETER
local beltShow = false
local harnessDurability = 0
AddEventHandler("seatbelt", function(belt)
    beltShow = belt
end)
AddEventHandler("harness", function(belt, dur)
    beltShow = belt
    harnessDurability = dur
end)

local nos = 0
local nosEnabled = false
RegisterNetEvent("noshud")
AddEventHandler("noshud", function(_nos, _nosEnabled)
    if _nos == nil then
        nos = 0
    else
        nos = _nos
    end
    nosEnabled = _nosEnabled
end)

function getFuel()
    fuel = exports["np-vehicles"]:CurrentFuel() or 50
end

local speedoRunning = false
function generateSpeedo()
    makeHudDirty()
    if speedoRunning then return end
    speedoRunning = true
    local veh = GetVehiclePedIsIn(PlayerPedId(), false)
    local flyer = IsPedInAnyPlane(PlayerPedId()) or IsPedInAnyHeli(PlayerPedId())
    altitude = false

    getFuel()

    local engineDamageShow = false
    local gasDamageShow = false
    local partsDamageShow = false

    Citizen.CreateThread(function()
        while engineOn do
            carHudShow = true
            if flyer then
                altitude = math.floor(GetEntityHeightAboveGround(veh) * 3.28084)
            end
            setHudValue("altitudeShow", altitude ~= false)
            setHudValue("beltShow", not beltShow)
            setHudValue("engineDamageShow", engineDamageShow)
            setHudValue("partsDamageShow", partsDamageShow)
            setHudValue("fuel", math.ceil(fuel))
            setHudValue("gasDamageShow", gasDamageShow)
            setHudValue("harnessDurability", harnessDurability)
            setHudValue("nos", nos)
            setHudValue("nosEnabled", nosEnabled)
            setHudValue("nosShow", nos > 0)
            setHudValue("pursuit", currentPursuitMode)
            setHudValue("pursuitShow", inPursuitVehicle)
            setHudValue("carHudShow", carHudShow)

            if IsWaypointActive() then
              local dist = (#(GetEntityCoords(PlayerPedId()) - GetBlipCoords(GetFirstBlipInfoId(8))) / 1000) * 0.715 -- quick conversion maff
              setHudValue("waypointActive", true)
              setHudValue("waypointDistance", dist)
            else
              setHudValue("waypointActive", false)
            end

            Citizen.Wait(500)
        end
        speedoRunning = false
        altitude = false
        carHudShow = false
        setHudValue("carHudShow", carHudShow)
    end)

    Citizen.CreateThread(function()
        while engineOn do
            if GetVehicleEngineHealth(veh) < 400.0 then
                engineDamageShow = true
            else
                engineDamageShow = false
            end
            if GetVehiclePetrolTankHealth(veh) < 3002.0 then
                gasDamageShow = true
            else
                gasDamageShow = false
            end

            if GetPedInVehicleSeat(veh, -1) == PlayerPedId() then
                harnessDurability = exports["np-vehicles"]:GetVehicleMetadata(veh, 'harness')
            end

            getFuel()
            Citizen.Wait(10000)
        end
    end)

    Citizen.CreateThread(function()
        while engineOn do
            speed = math.ceil(GetEntitySpeed(veh) * 2.236936)
            Citizen.Wait(speedometerWaitTime)
        end
    end)
end

-- RegisterNetEvent('np-hud:show_weapon_out')
-- AddEventHandler('np-hud:show_weapon_out', function()
--     sendAppEvent("hud", {
--         isArmed = true
--     })
-- end)

-- RegisterNetEvent('np-hud:hide_weapon_out')
-- AddEventHandler('np-hud:hide_weapon_out', function()
--     sendAppEvent("hud", {
--         isArmed = false
--     })
-- end)

local weaponFireRate = 0
local showWeaponFireRate = false

RegisterNetEvent('np-weapons:client:showWeaponFireRate')
AddEventHandler('np-weapons:client:showWeaponFireRate', function (pToggle)
    showWeaponFireRate = pToggle
    setHudValue("showWeaponFireRate", pToggle)
end)

Citizen.CreateThread(function()
    while true do
      Citizen.Wait(5000)
      TriggerServerEvent("hud-getping:sv") 
     end
  end)
  

local showPing = false

RegisterNetEvent("hud-getping:cl") 
AddEventHandler("hud-getping:cl", function(ping1) 
    ping = tonumber(ping1)
    if ping > 100 then
        showPing = true
    else
        showPing = false
    end
    setHudValue("showPing", showPing)
    
end)

RegisterCommand("charspawn", function()
    charSpawned = true
    Citizen.CreateThread(function()
        DisplayRadar(0)
        SetRadarBigmapEnabled(true, false)
        Citizen.Wait(0)
        SetRadarBigmapEnabled(false, false)
        DisplayRadar(0)
        Citizen.Wait(0)
        sendAppEvent("hud", {
            display = true,
        })
          --Wait(100)
        local initialHudSettings = GetPreferences()
        sendAppEvent("preferences", initialHudSettings)
        exports["carandplayerhud"]:getArmorAndStressData()
        startHealthArmorUpdates()
    end)
end)

-- HEALTH/ARMOR
local startedHealthArmorUpdates = false
function startHealthArmorUpdates()
    -- if not exports["carandplayerhud"]:HasStarted() then
    --     Citizen.Wait(100)
    -- end
    makeHudDirty()
    if startedHealthArmorUpdates then return end
    local prevHealth = -1
    local prevArmor = -1
    Citizen.CreateThread(function()
        startedHealthArmorUpdates = true
        while true do
            local armor = lerp(0, 100, rangePercent(0, 60, GetPedArmour(PlayerPedId())))
            if armor < 0 then armor = 0 end
            if armor > 100 then armor = 100 end
            local health = GetEntityHealth(PlayerPedId()) - 100
            if health > 100 then health = 100 end
            if health < 0 or isDead then health = 0 end

            setHudValue("armor", armor)
            setHudValue("health", health)
            Citizen.Wait(0) -- 500
        end
    end)
end

exports('startHealthArmorUpdates', startHealthArmorUpdates)

-- VEHICLE CHECKS
Citizen.CreateThread(function()
    while true do
        local veh = GetVehiclePedIsIn(PlayerPedId(), false)
        if veh ~= 0 and not inVehicle then
            inVehicle = true
            setGameValue("vehicle", { hash = GetEntityModel(veh) })
            setGameValue("inVehicle", true)
        elseif veh == 0 and inVehicle then
            inVehicle = false
            setGameValue("vehicle", -1)
            setGameValue("inVehicle", false)
            setHudValue("harnessDurability", 0)
            setHudValue("nos", 0)
            setHudValue("nosShow", false)
        end

        local eon = IsVehicleEngineOn(veh)
        if eon and not engineOn then
            engineOn = true
            showCompassFromCar = true

            generateSpeedo()
            generateCompass()
            generateRoadNames()
            toggleCompass()

            roundedRadar()

            sendAppEvent("hud", {
                radarShow = minimapEnabled
            })

        elseif not eon and engineOn then
            engineOn = false
            showCompassFromCar = false

            toggleCompass()

            if not forceShowMinimap then
                sendAppEvent("hud", {
                    radarShow = false
                })
                Citizen.Wait(32)
                DisplayRadar(0)
            end
        elseif wasMinimapEnabled ~= minimapEnabled then
            wasMinimapEnabled = minimapEnabled
            roundedRadar()
        end

        Citizen.Wait(250)
    end
end)

-- RADAR / MINIMAP STUFF
local pauseActive = false
Citizen.CreateThread(function()
    while true do
        local isPMA = IsPauseMenuActive()
        if isPMA and not pauseActive then
            pauseActive = true
            --sendAppEvent("hud", { display = false })
        elseif not isPMA and pauseActive then
            pauseActive = false
            --sendAppEvent("hud", { display = true })
        end
        Citizen.Wait(250)
    end
end)

-- START UP / RUN TIME
-- REMOVE SCROLL WHEEL ITEMS
Citizen.CreateThread(function()
    local minimap = RequestScaleformMovie("minimap")
    SetRadarBigmapEnabled(true, false)
    Citizen.Wait(0)
    SetRadarBigmapEnabled(false, false)

    while true do
        --
        -- 1 : WANTED_STARS
        -- 2 : WEAPON_ICON
        -- 3 : CASH
        -- 4 : MP_CASH
        -- 5 : MP_MESSAGE
        -- 6 : VEHICLE_NAME
        -- 7 : AREA_NAME
        -- 8 : VEHICLE_CLASS
        -- 9 : STREET_NAME
        -- 10 : HELP_TEXT
        -- 11 : FLOATING_HELP_TEXT_1
        -- 12 : FLOATING_HELP_TEXT_2
        -- 13 : CASH_CHANGE
        -- 14 : RETICLE
        -- 15 : SUBTITLE_TEXT
        -- 16 : RADIO_STATIONS
        -- 17 : SAVING_GAME
        -- 18 : GAME_STREAM
        -- 19 : WEAPON_WHEEL
        -- 20 : WEAPON_WHEEL_STATS
        -- 21 : HUD_COMPONENTS
        -- 22 : HUD_WEAPONS
        --
        HideHudComponentThisFrame(1)
        HideHudComponentThisFrame(2)
        HideHudComponentThisFrame(3)
        HideHudComponentThisFrame(4)
        -- HideHudComponentThisFrame(5)
        HideHudComponentThisFrame(6)
        HideHudComponentThisFrame(7)
        HideHudComponentThisFrame(8)
        HideHudComponentThisFrame(9)
        HideHudComponentThisFrame(10)
        HideHudComponentThisFrame(11)
        HideHudComponentThisFrame(12)
        HideHudComponentThisFrame(13)
        HideHudComponentThisFrame(14)
        HideHudComponentThisFrame(15)
        --HideHudComponentThisFrame(16)
        HideHudComponentThisFrame(17)
        HideHudComponentThisFrame(18)
        HideHudComponentThisFrame(19)
        HideHudComponentThisFrame(20)
        -- HideHudComponentThisFrame(21)
        -- HideHudComponentThisFrame(22)

        HudWeaponWheelIgnoreSelection()  -- CAN'T SELECT WEAPON FROM SCROLL WHEEL
        DisableControlAction(0, 37, true)

        if not onIsland then
            HideMinimapInteriorMapThisFrame()
        end
        if useDefaultMinimap then
          SetRadarZoom(1000) -- 1200
        else
          SetRadarZoom(1200) -- 1200
        end
        Citizen.Wait(0)
        BeginScaleformMovieMethod(minimap, "SETUP_HEALTH_ARMOUR")
        ScaleformMovieMethodAddParamInt(3)
        EndScaleformMovieMethod()
    end
end)

function GetForwardVector(rotation)
    local rot = (math.pi / 180.0) * rotation
    return vector3(-math.sin(rot.z) * math.abs(math.cos(rot.x)), math.cos(rot.z) * math.abs(math.cos(rot.x)), math.sin(rot.x))
end

-- No idle cams
Citizen.CreateThread(function()
    while true do
      InvalidateIdleCam()
      N_0x9e4cfff989258472() -- Disable the vehicle idle camera
      Wait(10000) --The idle camera activates after 30 second so we don't need to call this per frame
    end
end)

-- idk
function lerp(min, max, amt)
    return (1 - amt) * min + amt * max
end
function rangePercent(min, max, amt)
    return (((amt - min) * 100) / (max - min)) / 100
end

function fRound( n )
    return math.floor( n + 0.5 )
end

-- Citizen.CreateThread(function()

--     while true do

--         Citizen.Wait(500)
--         local player = PlayerPedId()

--         if (IsPedInAnyVehicle(player, false)) then

--             local veh = GetVehiclePedIsIn(player,false)

--             if GetPedInVehicleSeat(veh, -1) == player then

--                 if not DivingStatus then


--                     if updateLatestVehicle ~= veh then
--                         --if not DecorExistOn(veh, "GetVehicleCurrentFuel") then
--                         --    Fuel = math.random(80,100)
--                         --else
--                         --    Fuel = DecorGetInt(veh, "GetVehicleCurrentFuel")
--                         --end
--                         Fuel = exports["np-vehicles"]:CurrentFuel()
--                     else
--                         --Fuel = DecorGetInt(veh, "GetVehicleCurrentFuel")
--                         Fuel = exports["np-vehicles"]:CurrentFuel()
--                     end

--                     DivingStatus = true
--                     updateLatestVehicle = veh
--                     setLastUpdate = 0

--                     -- if not DecorExistOn(veh, "GetVehicleCurrentFuel") then 
--                     --     Fuel = math.random(80,100)
--                     --     DecorSetInt(veh, "GetVehicleCurrentFuel", fRound(Fuel))
--                     -- end

--                 else

--                     if Fuel > 105 then
--                         --Fuel = DecorGetInt(veh, "GetVehicleCurrentFuel")
--                         Fuel = exports["np-vehicles"]:CurrentFuel()
--                     end                     
--                     if Fuel == 101 then
--                         --Fuel = DecorGetInt(veh, "GetVehicleCurrentFuel")
--                         Fuel = exports["np-vehicles"]:CurrentFuel()
--                     end

--                 end

--                 if ( setLastUpdate > 300) then
--                     --DecorSetInt(veh, "GetVehicleCurrentFuel", fRound(Fuel))
--                     exports["np-vehicles"]:SetVehicleFuel(veh, fRound(Fuel))
--                     lasteupdate = 0
--                 end

--                 setLastUpdate = setLastUpdate + 1

--                 if Fuel > 0 then
--                     if IsVehicleEngineOn(veh) then
--                         local fueltankhealth = GetVehiclePetrolTankHealth(veh)
--                         if fueltankhealth == 1000.0 then
--                             SetVehiclePetrolTankHealth(veh, 4000.0)
--                         end
--                         local fuelMath = GetEntitySpeed(GetVehiclePedIsIn(player, false)) * 3.6
--                         if fuelMath > 30 then
--                             fuelMath = fuelMath * 1.8
--                         else
--                             fuelMath = fuelMath / 2.0
--                         end
--                         fuelMath = fuelMath / 7500

--                         if fuelMath == 0 then
--                             fuelMath = 0.0001
--                         end
--                         if IsPedInAnyBoat(PlayerPedId()) then
--                             fuelMath = 0.0090
--                         end
--                         local missingTankHealth = (4000 - fueltankhealth) / 1000

--                         if missingTankHealth > 1 then
--                             missingTankHealth = missingTankHealth * (missingTankHealth * missingTankHealth * 12)
--                         end

--                         local factorFuel = (fuelMath + 1 / 5000) * (missingTankHealth+1)
--                         Fuel = Fuel - factorFuel
--                     end
--                 end

--                 if Fuel <= 4 and Fuel > 0 then
--                     if not IsThisModelABike(GetEntityModel(veh)) then
--                         local decayChance = math.random(20,100)
--                         if decayChance > 90 then
--                             SetVehicleEngineOn(veh,0,0,1)
--                             SetVehicleUndriveable(veh,true)
--                             Citizen.Wait(100)
--                             SetVehicleEngineOn(veh,1,0,1)
--                             SetVehicleUndriveable(veh,false)
--                         end
--                     end
--                 end

--                 if Fuel < 15 then
--                 end

--                 if Fuel < 1 then
--                     if Fuel ~= 0 then
--                         --Fuel = 0
--                         --DecorSetInt(veh, "GetVehicleCurrentFuel", fRound(Fuel))
--                         exports["np-vehicles"]:SetVehicleFuel(veh, fRound(Fuel))
--                     end

--                     if IsVehicleEngineOn(veh) or IsThisModelAHeli(GetEntityModel(veh)) then
--                         SetVehicleEngineOn(veh,0,0,1)
--                         SetVehicleUndriveable(veh,false)
--                     end
--                 end
--             end
--         else
--             if DivingStatus then
--                 DivingStatus = false
--                 --DecorSetInt(updateLatestVehicle, "GetVehicleCurrentFuel", fRound(Fuel))
--                 exports["np-vehicles"]:SetVehicleFuel(veh, fRound(Fuel))
--             end
--             Citizen.Wait(1500)
--         end
--     end
-- end)

Citizen.CreateThread(function()
	while true do
		Citizen.Wait(0)
		DisplayAmmoThisFrame(true)
	end
end)

Citizen.CreateThread(
    function()
        local minimap = RequestScaleformMovie('minimap')
        while true do
            Wait(0)
            BeginScaleformMovieMethod(minimap, 'HIDE_SATNAV') -- scaleform, method string
            EndScaleformMovieMethod() -- don't know if this is necessary when calling a single scaleform but might be needed if multiple scalforms are used in a single loop? Either way, removing this native doesn't affect the result from the first native, i. e. the distance to waypoint or SATNAV gets removed.
        end
    end
)

function getVehicleClosestToMe()
    playerped = PlayerPedId()
    coordA = GetEntityCoords(playerped, 1)
    coordB = GetOffsetFromEntityInWorldCoords(playerped, 0.0, 100.0, 0.0)
    targetVehicle = getVehicleInDirection(coordA, coordB)
    return targetVehicle
end

function refillVehicle()
    ClearPedSecondaryTask(PlayerPedId())
    loadAnimDict( "weapon@w_sp_jerrycan" ) 
    TaskPlayAnim( PlayerPedId(), "weapon@w_sp_jerrycan", "fire", 8.0, 1.0, -1, 1, 0, 0, 0, 0 )
end

function endanimation()
    shiftheld = false
    ctrlheld = false
    tabheld = false
    ClearPedTasks(PlayerPedId())
end

function loadAnimDict( dict )
    while ( not HasAnimDictLoaded( dict ) ) do
        RequestAnimDict( dict )
        Citizen.Wait( 5 )
    end
end

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
	
	if distance > 3000 then vehicle = nil end

    return vehicle ~= nil and vehicle or 0
end

  RegisterNetEvent("np-hud:jerry_can:refuel")
  AddEventHandler("np-hud:jerry_can:refuel",function()
      vehicleCurrentFuel = exports["np-vehicles"]:CurrentFuel(veh) --DecorGetInt(veh, "GetVehicleCurrentFuel")
      if exports['np-inventory']:hasEnoughOfItem('883325847', 1) then
        local timer = (100 - vehicleCurrentFuel) * 400
        refillVehicle()
        local finished = exports["np-taskbar"]:taskBar(timer,"Refueling")
        local veh = getVehicleClosestToMe()
    
        if finished == 100 then
            if exports['np-inventory']:hasEnoughOfItem('883325847', 1) then
                --DecorSetInt(veh, "GetVehicleCurrentFuel", 100)
                exports["np-vehicles"]:SetVehicleFuel(veh, 100)
                TriggerEvent('inventory:removeItem', '883325847', 1)
            else
                TriggerEvent('DoLongHudText', 'Try again!', 2)
            end
    
            local vehicleCurrentFuel = exports["np-vehicles"]:CurrentFuel(veh) --DecorGetInt(veh, "GetVehicleCurrentFuel")
            local endFuel = (100 - vehicleCurrentFuel) 
            endFuel = math.ceil(endFuel * (finished / 100) + vehicleCurrentFuel)
            --DecorSetInt(veh, "GetVehicleCurrentFuel", endFuel)
            exports["np-vehicles"]:SetVehicleFuel(veh, endFuel)
    
        end
        endanimation()
    else
        TriggerEvent('DoLongHudText', 'Unsure how you managed this?', 2)
    end
  end)