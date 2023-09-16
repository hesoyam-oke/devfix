previewEnabled = false
local usedItemId, usedItemSlot, usedItemMetadata

RegisterNetEvent("FIXDEV-racing:addedActiveRace")
AddEventHandler("FIXDEV-racing:addedActiveRace", function(race)
    print("ADDING ACTIVE RACE")
    activeRaces[race.id] = race

    if not config.nui.hudOnly then
        SendNUIMessage({
            activeRaces = activeRaces
        })
    end

    TriggerEvent("FIXDEV-racing:api:addedActiveRace", race, activeRaces)
    TriggerEvent("FIXDEV-racing:api:updatedState", { activeRaces = activeRaces })
end)

RegisterNetEvent("FIXDEV-racing:removedActiveRace")
AddEventHandler("FIXDEV-racing:removedActiveRace", function(id)
    print("REMOVE ACTIVE RACE")
    activeRaces[id] = nil

    if not config.nui.hudOnly then
        SendNUIMessage({
            activeRaces = activeRaces
        })
    end

    TriggerEvent("FIXDEV-racing:api:removedActiveRace", activeRaces)
    TriggerEvent("FIXDEV-racing:api:updatedState", { activeRaces = activeRaces })
end)

RegisterNetEvent("FIXDEV-racing:updatedActiveRace")
AddEventHandler("FIXDEV-racing:updatedActiveRace", function(race)
    if activeRaces[race.id] then
        activeRaces[race.id] = race
    end

    if not config.nui.hudOnly then
        SendNUIMessage({
            activeRaces = activeRaces
        })
    end

    TriggerEvent("FIXDEV-racing:api:updatedActiveRace", activeRaces)
    TriggerEvent("FIXDEV-racing:api:updatedState", { activeRaces = activeRaces })
end)

RegisterNetEvent("FIXDEV-racing:endRace")
AddEventHandler("FIXDEV-racing:endRace", function(race)
    print("RACE FUCKING END")
    SendNUIMessage({
        showHUD = false
    })

    TriggerEvent("FIXDEV-racing:api:raceEnded", race)
    TriggerEvent('FIXDEV-racing:FIXDEV-racing:api:updatedStat')
    cleanupRace()
end)

RegisterNetEvent("FIXDEV-racing:raceHistory")
AddEventHandler("FIXDEV-racing:raceHistory", function(race)
    finishedRaces[#finishedRaces + 1] = race

    if race then
        if not config.nui.hudOnly then
            SendNUIMessage({
                leaderboardData = race
            })
        end
    end

    TriggerEvent("FIXDEV-racing:api:raceHistory", race)
    TriggerEvent("FIXDEV-racing:api:updatedState", { finishedRaces = finishedRaces })
end)

RegisterNetEvent("FIXDEV-racing:startRace")
AddEventHandler("FIXDEV-racing:startRace", function(race, startTime)
    TriggerEvent("FIXDEV-racing:api:startingRace", startTime)
    -- Wait for race countdown
    Citizen.Wait(startTime - 3000)

    SendNUIMessage({
        type = "countdown",
        start = 3,
    })

    PlaySoundFrontend(-1, "Beep_Red", "DLC_HEIST_HACKING_SNAKE_SOUNDS")
    Citizen.Wait(1000)
    PlaySoundFrontend(-1, "Beep_Red", "DLC_HEIST_HACKING_SNAKE_SOUNDS")
    Citizen.Wait(1000)
    PlaySoundFrontend(-1, "Beep_Red", "DLC_HEIST_HACKING_SNAKE_SOUNDS")
    Citizen.Wait(1000)
    PlaySoundFrontend(-1, "Oneshot_Final", "MP_MISSION_COUNTDOWN_SOUNDSET")

    if not curRace then
        initRace(race)
        TriggerEvent("FIXDEV-racing:api:raceStarted", race)
    end
end)

RegisterNetEvent("FIXDEV-racing:updatePosition")
AddEventHandler("FIXDEV-racing:updatePosition", function(position)
    -- print("Position is now: " .. position)
    SendNUIMessage({
        HUD = { position = position }
    })
end)

RegisterNetEvent("FIXDEV-racing:dnfRace")
AddEventHandler("FIXDEV-racing:dnfRace", function()
    SendNUIMessage({
        HUD = { dnf = true }
    })

    TriggerEvent("FIXDEV-racing:api:dnfRace", race)
end)

RegisterNetEvent("FIXDEV-racing:startDNFCountdown")
AddEventHandler("FIXDEV-racing:startDNFCountdown", function(dnfTime)
    SendNUIMessage({
        HUD = { dnfTime = dnfTime }
    })
end)

function round(x, n) 
    return tonumber(string.format("%." .. n .. "f", x))
end

RegisterNetEvent("FIXDEV-racing:finishedRace")
AddEventHandler("FIXDEV-racing:finishedRace", function(position, time, pEnterAmt)
    if position == 1 then
        RPC.execute('FIXDEV-racing:awardPlayer', math.random(40, 50) + round(pEnterAmt / 6, 0))
    elseif position == 2 then
        RPC.execute('FIXDEV-racing:awardPlayer', math.random(20, 30))
    elseif position == 3 then
        RPC.execute('FIXDEV-racing:awardPlayer', math.random(10))
    end
    SendNUIMessage({
        HUD = {
            position = position,
            finished = time,
        }
    })
end)

RegisterNetEvent("FIXDEV-racing:joinedRace")
AddEventHandler("FIXDEV-racing:joinedRace", function(race)
    race.start.pos = tableToVector3(race.start.pos)
    spawnCheckpointObjects(race.start, config.startObjectHash)
end)

RegisterNetEvent("FIXDEV-racing:leftRace")
AddEventHandler("FIXDEV-racing:leftRace", function()
    cleanupProps()
    TriggerEvent('FIXDEV-racing:api:updatedState')
end)

RegisterNetEvent("FIXDEV-racing:playerJoinedYourRace")
AddEventHandler("FIXDEV-racing:playerJoinedYourRace", function(characterId, name)
    if characterId == getCharacterId() then return end

    TriggerEvent("FIXDEV-racing:api:playerJoinedYourRace", characterId, name)
end)

RegisterNetEvent("FIXDEV-racing:playerLeftYourRace")
AddEventHandler("FIXDEV-racing:playerLeftYourRace", function(characterId, name)
    if characterId == getCharacterId() then return end

    TriggerEvent("FIXDEV-racing:api:playerLeftYourRace", characterId, name)
end)

RegisterNetEvent("FIXDEV-racing:addedPendingRace")
AddEventHandler("FIXDEV-racing:addedPendingRace", function(race)
    pendingRaces[race.id] = race
    if not config.nui.hudOnly then
        SendNUIMessage({
            pendingRaces = pendingRaces
        })
    end

    TriggerEvent("FIXDEV-racing:api:addedPendingRace", race, pendingRaces)
    TriggerEvent("FIXDEV-racing:api:updatedState", { pendingRaces = pendingRaces })
end)

RegisterNetEvent("FIXDEV-racing:removedPendingRace")
AddEventHandler("FIXDEV-racing:removedPendingRace", function(id)
    pendingRaces[id] = nil

    SendNUIMessage({ pendingRaces = pendingRaces })

    TriggerEvent("FIXDEV-racing:api:removedPendingRace", pendingRaces)
    TriggerEvent("FIXDEV-racing:api:updatedState", {pendingRaces=pendingRaces})
end)

RegisterNetEvent("FIXDEV-racing:startCreation")
AddEventHandler("FIXDEV-racing:startCreation", function()
    startRaceCreation()
end)

RegisterNetEvent("FIXDEV-racing:addedRace")
AddEventHandler("FIXDEV-racing:addedRace", function(newRace, newRaces)
    if not races then return end
    races = newRaces

    SendNUIMessage({
        races = newRaces
    })

    TriggerEvent("FIXDEV-racing:api:addedRace")
    TriggerEvent("FIXDEV-racing:api:updatedState", {races=races})
end)

local function openAliasTextbox()
  exports['FIXDEV-interface']:openApplication('textbox', {
    callbackUrl = 'FIXDEV-interface:racing:input:alias',
    key = 1,
    items = {{icon = "pencil-alt", label = "Alias", name = "alias"}},
    show = true
  })
end

AddEventHandler("FIXDEV-inventory:itemUsed", function(item, metadata, inventoryName, slot)
    print(" i am using racing usb2")
    print(item)
    --print(metadata)
    print(inventoryName)
    print(slot)
  --if item ~= "racingusb2" then return end
  usedItemId = item
  usedItemSlot = slot
  --usedItemMetadata = json.decode(metadata)

  --local characterId = exports["isPed"]:isPed("cid")
  --print(characterId)
  --if characterId ~= characterId then
   -- TriggerEvent("DoLongHudText", "You don't own this usb!", 2)
    --return
 -- end

  --if characterId then
   -- TriggerEvent("DoLongHudText", "Alias can't be changed for this usb!", 2)
   -- return
 -- end
   if item == "racingusb2" then
  openAliasTextbox()
   end
end)

RegisterInterfaceCallback("FIXDEV-interface:racing:input:alias", function(data, cb)
  cb({data = {}, meta = {ok = true, message = ''}})
  exports['FIXDEV-interface']:closeApplication('textbox')
  local alias = data.values.alias
  print( data.values.alias)

  --if usedItemMetadata.Alias then return end

  if  alias == nil then
    TriggerEvent("DoLongHudText", "No alias entered!", 2)
    return
  end

  local success, msg = RPC.execute("FIXDEV-racing:setAlias", usedItemId, usedItemSlot, alias)
  if success then
    exports["FIXDEV-phone"]:phoneNotification("racen", "Welcome to the underground, " .. alias .. ".", "From the PM", 5000)
  else
    TriggerEvent("DoLongHudText", msg or "Alias could not be set.", 2)
    if msg == "Alias already taken!" then
      openAliasTextbox()
    end
  end
end)

-- RegisterCommand("FIXDEV-racing:giveRacingUSB", function()
--     RPC.execute("FIXDEV-racing:giveRacingUSB")
-- end)

AddEventHandler("onResourceStop", function (resourceName)
    if resourceName ~= GetCurrentResourceName() then return end

    cleanupProps()
    clearBlips()
    ClearGpsMultiRoute()
end)

RegisterNetEvent('FIXDEV-racing:api:currentRace')
AddEventHandler("FIXDEV-racing:api:currentRace", function(currentRace)
    print(json.encode(currentRace))
    -- print("FUCK THIS SHIT HERE******************************************************")
    isRacing = currentRace ~= nil
    if isRacing then
        startBubblePopper(currentRace)
    end
end)

   RegisterCommand('openracing', function()
    openAliasTextbox()
      end)