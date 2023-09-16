local GeneralEntries = MenuEntries["general"]

GeneralEntries[#GeneralEntries+1] = {
  data = {
    id = "vehicles",
    title = _L("menu-general-vehicle", "Vehicle"),
    icon = "#vehicle-options-vehicle",
    event = "veh:options"
  },
  isEnabled = function(pEntity, pContext)
      return not IsDisabled() and IsPedInAnyVehicle(PlayerPedId(), false)
  end
}

GeneralEntries[#GeneralEntries+1] = {
  data = {
    id = "vehicles-keysgive",
    title = _L("menu-general-givekeys", "Give Keys"),
    icon = "#general-keys-give",
    event = "vehicle:giveKey"
},
isEnabled = function(pEntity, pContext)
    return not IsDisabled() and IsPedInAnyVehicle(PlayerPedId(), false) and exports["FIXDEV-vehicles"]:HasVehicleKey(GetVehiclePedIsIn(PlayerPedId(), false))
end
}


GeneralEntries[#GeneralEntries+1] = {
  data = {
      id = "atc-set-flight-data",
      title = _L("menu-vehicles-set-flight-data", "Flight Data"),
      icon = "#vehicle-flight-data",
      event = "FIXDEV-atc:setFlightData"
  },
  isEnabled = function(pEntity, pContext)
    local playerPed = PlayerPedId()
    local vehicle = GetVehiclePedIsIn(playerPed)

    if vehicle == 0 then return false end

    local vehicleClass = GetVehicleClass(vehicle)

    return not IsDisabled() and (vehicleClass == 15 or vehicleClass == 16) and (GetPedInVehicleSeat(vehicle, -1) == playerPed or GetPedInVehicleSeat(vehicle, 0) == playerPed)
  end
}


-- change to keybind?
-- GeneralEntries[#GeneralEntries+1] = {
--     data = {
--         id = "vehicles-doorKeyFob",
--         title = "Door KeyFob",
--         icon = "#general-door-keyFob",
--         event = "FIXDEV-doors:doorKeyFob"
--     },
--     isEnabled = function(pEntity, pContext)
--         return not IsDisabled() and IsPedInAnyVehicle(PlayerPedId(), false) and exports["FIXDEV-inventory"]:hasEnoughOfItem("keyfob", 1, false)
--     end
-- }

GeneralEntries[#GeneralEntries+1] = {
  data = {
    id = "peds-escort",
    title = _L("menu-general-stopescorting", "Stop escorting"),
    icon = "#general-escort",
    event = "escortPlayer"
  },
  isEnabled = function(pEntity, pContext)
      return not IsDisabled() and isEscorting
  end
}

GeneralEntries[#GeneralEntries+1] = {
  data = {
    id = "oxygentank",
    title = _L("menu-general-removeoxygentank", "Remove Oxygen Tank"),
    icon = "#oxygen-mask",
    event = "RemoveOxyTank"
  },
  isEnabled = function(pEntity, pContext)
      return not IsDisabled() and hasOxygenTankOn
  end
}


GeneralEntries[#GeneralEntries+1] = {
  data = {
    id = "policeDeadA",
    title = _L("menu-general-1013A", "10-13A"),
    icon = "#police-dead",
    event = "police:tenThirteenA",
  },
  isEnabled = function(pEntity, pContext)
      return isDead and (isPolice or isDoc)
  end
}

GeneralEntries[#GeneralEntries+1] = {
  data = {
    id = "Civ-Dead",
    title = "Call For Help",
    icon = "#police-dead",
    event = "ragdoll:sendPing",
  },
  isEnabled = function(pEntity, pContext)
      return isDead
  end
}

GeneralEntries[#GeneralEntries+1] = {
  data = {
    id = "policeDeadB",
    title = _L("menu-general-1013B", "10-13B"),
    icon = "#police-dead",
    event = "police:tenThirteenB",
  },
  isEnabled = function(pEntity, pContext)
    return isDead and (isPolice or isDoc)
  end
}

GeneralEntries[#GeneralEntries+1] = {
  data = {
    id = "emsDeadA",
    title = _L("menu-general-1014A", "10-14A"),
    icon = "#ems-dead",
    event = "police:tenForteenA",
  },
  isEnabled = function(pEntity, pContext)
    return isDead and isMedic
  end
}

GeneralEntries[#GeneralEntries+1] = {
  data = {
    id = "emsDeadB",
    title = _L("menu-general-1014B", "10-14B"),
    icon = "#ems-dead",
    event = "police:tenForteenB",
  },
  isEnabled = function(pEntity, pContext)
    return isDead and isMedic
  end
}

GeneralEntries[#GeneralEntries+1] = {
  data = {
      id = "call_for_help",
      title = "Call For Help",
      icon = "#dead",
      event = "ragdoll:alert"
  },
  isEnabled = function(pEntity, pContext)
    return (exports['ragdoll']:GetDeathStatus())
  end
}

GeneralEntries[#GeneralEntries+1] = {
  data = {
    id = "unseat",
    title = _L("menu-general-chairgetup", "Get up"),
    icon = "#obj-chair",
    event = "FIXDEV-emotes:sitOnChair"
  },
  isEnabled = function(pEntity, pContext)
    return not isDead and exports["FIXDEV-flags"]:HasPedFlag(PlayerPedId(), "isSittingOnChair")
  end
}

GeneralEntries[#GeneralEntries+1] = {
  data = {
      id = "property-enter",
      title = "Enter Property",
      icon = "#property-enter",
      event = "FIXDEV-housing:enterBUILDINGCMON",
      parameters = false,
  },
  isEnabled = function(pEntity, pContext)
      local isNear, propertyId = exports["FIXDEV-housing"]:isNearProperty()
      return not isDead and isNear
  end
}

GeneralEntries[#GeneralEntries+1] = {
  data = {
      id = "property-lock",
      title = "Toggle Lock",
      icon = "#property-lock",
      event = "housing:toggleClosestLock"
  },
  isEnabled = function(pEntity, pContext)
    local isNear, propertyId = exports["FIXDEV-housing"]:isNearProperty()

      return not isDead and isNear
  end
}

GeneralEntries[#GeneralEntries+1] = {
  data = {
      id = "property-invade",
      title = "Invade Property",
      icon = "#property-enter",
      event = "housing:interactionTriggered",
      parameters = true,
  },
  isEnabled = function(pEntity, pContext)
      local isNear, propertyId = exports["FIXDEV-housing"]:isNearProperty()
      return not isDead and isNear and exports["FIXDEV-housing"]:isBeingRobbed(propertyId)
  end
}

GeneralEntries[#GeneralEntries+1] = {
  data = {
      id = "FIXDEV-garages:pd_heli",
      title = "Vehicle List",
      icon = "#vehicle-vehicleList",
      event =  "FIXDEV-garages:pd_heli" 
  },
  isEnabled = function()
    return (exports["isPed"]:isPed("myJob") == 'police') and not isDead and #(GetEntityCoords(PlayerPedId()) - vector3(449.31, -981.07, 44.06)) <= 5
  end
}

GeneralEntries[#GeneralEntries+1] = {
  data = {
      id = "dispatch:openDispatch",
      title = _L("menu-general-dispatch", "Dispatch"),
      icon = "#general-check-over-target",
      event = "FIXDEV-dispatch:openFull"
  },
  isEnabled = function()
      return (isPolice or isMedic) and not isDead
  end
}

GeneralEntries[#GeneralEntries+1] = {
  data = {
      id = "emotes:openmenu",
      title = _L("menu-general-emotes", "Emotes"),
      icon = "#general-emotes",
      event = "emotes:OpenMenu"
  },
  isEnabled = function(pEntity, pContext)
      return not isDead
  end
}

--[[GeneralEntries[#GeneralEntries+1] = {
  data = {
      id = "drivingInstructor:submitTest",
      title = _L("menu-general-submittest", "Submit Test"),
      icon = "#drivinginstructor-submittest",
      event = "drivingInstructor:submitTest"
  },
  isEnabled = function(pEntity, pContext)
      return not isDead and isInstructorMode
  end
}]]

GeneralEntries[#GeneralEntries+1] = {
  data = {
      id = "general:checkoverself",
      title = _L("menu-general-examineself", "Examine Self"),
      icon = "#general-check-over-self",
      event = "Evidence:CurrentDamageList"
  },
  isEnabled = function(pEntity, pContext)
      return not isDead
  end
}

GeneralEntries[#GeneralEntries+1] = {
  data = {
      id = "bennys:enter",
      title = _L("menu-general-enterbennys", "Enter Bennys"),
      icon = "#general-check-vehicle",
      event = "bennys:enter"
  },
  isEnabled = function(pEntity, pContext)
      return not IsDisabled() and polyChecks.bennys.isInside and IsPedInAnyVehicle(PlayerPedId(), false) and GetPedInVehicleSeat(GetVehiclePedIsIn(PlayerPedId(), false), -1) == PlayerPedId()
  end
}

GeneralEntries[#GeneralEntries+1] = {
  data = {
    id = "toggle-anchor",
    title = _L("menu-general-toggleanchor", "Toggle Anchor"),
    icon = "#vehicle-anchor",
    event = "mka-anchor:toggleAnchor"
  },
  isEnabled = function(pEntity, pContext)
    local currentVehicle = GetVehiclePedIsIn(PlayerPedId(), false)
    local boatModel = GetEntityModel(currentVehicle)
    return not IsDisabled() and currentVehicle ~= 0 and (IsThisModelABoat(boatModel) or IsThisModelAJetski(boatModel) or IsThisModelAnAmphibiousCar(boatModel) or IsThisModelAnAmphibiousQuadbike(boatModel))
  end
}

GeneralEntries[#GeneralEntries+1] = {
  data = {
    id = "mdw",
    title = "MDW",
    icon = "#mdt",
    event = 'FIXDEV-mdw:openMDW'
  },
  isEnabled = function()
    return (
    myJob == "police"  or  isPolice) and not isDead
  end
}

--[[GeneralEntries[#GeneralEntries+1] = {
  data = {
      id = "prepare-boat-mount",
      title = _L("menu-general-mounttrailer", "Mount on Trailer"),
      icon = "#vehicle-plate-remove",
      event = "vehicle:mountBoatOnTrailer"
  },
  isEnabled = function()
    local ped = PlayerPedId()
    local veh = GetVehiclePedIsIn(ped)
    if veh == 0 then
      return false
    end
    local seat = GetPedInVehicleSeat(veh, -1)
    if seat ~= ped then
      return false
    end
    local model = GetEntityModel(veh)
    if IsDisabled() or not (IsThisModelABoat(model) or IsThisModelAJetski(model) or IsThisModelAnAmphibiousCar(model)) then
      return false
    end
    local left, right = GetModelDimensions(model)
    return #(vector3(0, left.y, 0) - vector3(0, right.y, 0)) < 15
  end
}]]

GeneralEntries[#GeneralEntries+1] = {
  data = {
    id = "prison-task",
    title = _L("menu-general-prison-currenttask", "Current Task"),
    icon = "#prisoner-task",
    event = "FIXDEV-jail:showCurrentTask"
  },
  isEnabled = function()
    return (
      polyChecks.prison.isInside
      and not isDoc
      and not isPolice
      and not isDead
      and isPrisoner
    )
  end
}

-- GeneralEntries[#GeneralEntries+1] = {
--   data = {
--       id = "prepare-boat-mount1",
--       title = "Mount on Trailer",
--       icon = "#vehicle-plate-remove",
--       event = "vehicle:mountCarOnTrailer"
--   },
--   isEnabled = function(pEntity)

--     return pEntity ~= 0
--   end
-- }

-- AddEventHandler("vehicle:mountCarOnTrailer", function(a, pEntity)
--   if GetVehicleDoorAngleRatio(pEntity, 5) == 0 then
--     SetVehicleDoorOpen(pEntity, 5, 0, 0)
--   else
--     SetVehicleDoorShut(pEntity, 5, 0)
--   end
--   -- SetCarBootOpen(pEntity)
--   SetVehicleOnGroundProperly(pEntity)
--   -- SetEntityCoords(pEntity, GetEntityCoords(pEntity).x, GetEntityCoords(pEntity).y, GetEntityCoords(pEntity).z + 0.05, 0, 0, 0, 1)
-- end)

local currentJob = nil
local policeModels = {
  [`npolvic`] = true,
  [`npolexp`] = true,
  [`npolmm`] = true,
  [`npolvette`] = true,
  [`npolchal`] = true,
  [`npolstang`] = true,
  [`npolchar`] = true,
}
RegisterNetEvent("FIXDEV-jobmanager:playerBecameJob")
AddEventHandler("FIXDEV-jobmanager:playerBecameJob", function(job, name, notify)
    currentJob = job
end)
GeneralEntries[#GeneralEntries+1] = {
  data = {
      id = "open-rifle-rack",
      title = _L("menu-general-riflerack", "Locked Storage"),
      icon = "#vehicle-plate-remove",
      event = "vehicle:openRifleRack"
  },
  isEnabled = function(pEntity)
    if currentJob ~= "police" then return false end
    local veh = GetVehiclePedIsIn(PlayerPedId())
    if veh == 0 then return false end
    local model = GetEntityModel(veh)
    if policeModels[model] == nil then return false end
    return true
  end
}
AddEventHandler("vehicle:openRifleRack", function()
  local finished = exports["FIXDEV-taskbar"]:taskBar(2500, _L("menu-misc-unlocking-text", "Unlocking..."))
  if finished ~= 100 then return end
  local veh = GetVehiclePedIsIn(PlayerPedId())
  if veh == 0 then return end
  local vehId = exports["FIXDEV-vehicles"]:GetVehicleIdentifier(veh)
  TriggerEvent("server-inventory-open", "1", "rifle-rack-" .. vehId)
end)

local dashCamAttached = {}
AddEventHandler("FIXDEV-menu:dashCamAttached", function(pVehicleNetId, pEnabled)
  dashCamAttached[pVehicleNetId] = pEnabled
end)
GeneralEntries[#GeneralEntries+1] = {
  data = {
      id = "remove-dashcam-from-vehicle",
      title = _L("menu-general-removedashcam", "Remove Dashcam"),
      icon = "#news-job-news-camera",
      event = "FIXDEV-gopro:removeDashCam",
  },
  isEnabled = function()
    local veh = GetVehiclePedIsIn(PlayerPedId())
    local netId = NetworkGetNetworkIdFromEntity(veh)
    return not IsDisabled() and dashCamAttached[netId]
  end
}

--[[AddEventHandler("FIXDEV-menu:var:inServerFarm", function(pBool)
  IN_SERVER_FARM = pBool
end)
GeneralEntries[#GeneralEntries+1] = {
  data = {
    id = "varLeave",
    title = _L("menu-general-leaveVar", "Exit VAR"),
    icon = "#news-job-news-camera",
    event = "FIXDEV-heists-serverroom:vr-room-exit",
  },
  isEnabled = function(pEntity, pContext)
      return IN_SERVER_FARM
  end
}]]

GeneralEntries[#GeneralEntries+1] = {
  data = {
    id = "vehicle-vehicleList",
    title = "Vehicle List",
    icon = "#vehicle-vehicleList",
    event = "FIXDEV-garages:open"
},
isEnabled = function()
    return isAtGarage and not IsPedInAnyVehicle(PlayerPedId(), false) and not isDead
end
}

GeneralEntries[#GeneralEntries+1] = {
  data = {
    id = "vehicle-sharedvehicleList",
    title = "Shared Vehicle List",
    icon = "#vehicle-vehicleList",
    event = "FIXDEV-garages:open2"
},
isEnabled = function()
    return isAtHouseGarage and not IsPedInAnyVehicle(PlayerPedId(), false) and not isDead
end
}

GeneralEntries[#GeneralEntries+1] = {
  data = {
    id = "vehicle-parkvehicle",
    title = "Park Vehicle",
    icon = "#vehicle-parkvehicle",
    event = "FIXDEV-garages:store"
},
isEnabled = function()
  return isAtGarage and exports["FIXDEV-garages"]:NearVehicle("Distance") and not IsPedInAnyVehicle(PlayerPedId(), false) and not isDead
end
}

GeneralEntries[#GeneralEntries+1] = {
  data = {
    id = "vehicle-parkvehicle",
    title = "Park Vehicle",
    icon = "#vehicle-parkvehicle",
    event = "FIXDEV-garages:store"
},
isEnabled = function()
  return isAtHouseGarage and exports["FIXDEV-garages"]:NearVehicle("Distance") and not IsPedInAnyVehicle(PlayerPedId(), false) and not isDead
end
}

--[[GeneralEntries[#GeneralEntries+1] = {
  data = {
    id = "infDead",
    title = _L("menu-general-infDead", "Respawn Menu"),
    icon = "#infected-icon",
    event = "FIXDEV-outbreak:openRespawnMenu",
  },
  isEnabled = function(pEntity, pContext)
      return isDead and isInfected
  end
}]]

--[[GeneralEntries[#GeneralEntries+1] = {
  data = {
    id = "humanDead",
    title = _L("menu-general-humeanDead", "Respawn As Infected"),
    icon = "#infected-icon",
    event = "FIXDEV-outbreak:openRespawnMenu",
    parameters = { fromHuman = true }
  },
  isEnabled = function(pEntity, pContext)
      return isDead and not isInfected and isOutbreakRunning
  end
}]]

RegisterNetEvent('FIXDEV-polyzone:enter')
AddEventHandler('FIXDEV-polyzone:enter', function(name)
    if name == "Benny" then
		isInBennyZone = true
        return isInBennyZone
    end
end)

RegisterNetEvent('FIXDEV-polyzone:exit')
AddEventHandler('FIXDEV-polyzone:exit', function(name)
    if name == "Benny" then
		isInBennyZone = false
        return isInBennyZone
    end
end)

RegisterNetEvent('FIXDEV-polyzone:enter')
AddEventHandler('FIXDEV-polyzone:enter', function(name)
    if name == "BennyPD" then
		isInBennyPDZone = true
        return isInBennyPDZone
    end
end)


RegisterNetEvent('FIXDEV-polyzone:exit')
AddEventHandler('FIXDEV-polyzone:exit', function(name)
    if name == "BennyPD" then
		isInBennyPDZone = false
        return isInBennyPDZone
    end
end)

