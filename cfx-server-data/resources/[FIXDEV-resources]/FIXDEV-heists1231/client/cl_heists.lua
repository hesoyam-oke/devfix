local nightVisionActive = false
local nightVisionActivePD = false
local lostCompound = vector3(55.65,3693.47,44.11)
local distanceToDisable = 500
local prevPropIdx = 0
local prevPropTextureIdx = 0
local isPowerOn = true
local supportedModels = {
  [`mp_f_freemode_01`] = 124,
  [`mp_m_freemode_01`] = 126,
}
local nvgItems = {
  ["nightvisiongoggles"] = true,
  ["nightvisiongogglespd"] = true,
}

local myJob = "unemployed"
RegisterNetEvent("FIXDEV-jobmanager:playerBecameJob")
AddEventHandler("FIXDEV-jobmanager:playerBecameJob", function(job)
  myJob = job
end)

local timecycleEnabled = false
local function isNightTime()
  local isNight = exports["FIXDEV-weathersync"]:isNightTime()
  return isNight
end
RegisterNetEvent("sv-heists:cityPowerState", function(pIsPowerOn)
  isPowerOn = pIsPowerOn
  if isPowerOn then return end
--   if (#(GetEntityCoords(PlayerPedId()) - lostCompound) < distanceToDisable) then
--     if myJob ~= "police" and isNightTime() then
--       SetTimecycleModifier("BlackOut")
--       SetTimecycleModifierStrength(1.0)
--       timecycleEnabled = true
--     end
--   end
end)
-- Citizen.CreateThread(function()
--   while true do
--     if (#(GetEntityCoords(PlayerPedId()) - lostCompound) < distanceToDisable) then
--       if myJob ~= "police" and (not isPowerOn) and isNightTime() then
--         SetTimecycleModifier("BlackOut")
--         SetTimecycleModifierStrength(1.0)
--         timecycleEnabled = true
--       end
--     elseif timecycleEnabled then
--       ClearTimecycleModifier()
--       timecycleEnabled = false
--     end
--     Citizen.Wait(30000)
--   end
-- end)

AddEventHandler("FIXDEV-inventory:itemUsed", function(item)
  if not nvgItems[item] then return end
  local sm = supportedModels[GetEntityModel(PlayerPedId())]
  if sm then
    TriggerEvent("animation:PlayAnimation", "hairtie")
    Wait(1000)
  end
  nightVisionActive = not nightVisionActive
  nightVisionActivePD = nightVisionActive and (item == "nightvisiongogglespd") or false
  if nightVisionActive
     and (not nightVisionActivePD)
     and (#(lostCompound - GetEntityCoords(PlayerPedId())) < distanceToDisable)
  then
    nightVisionActive = false
    TriggerEvent("DoLongHudText", "Signal interference.", 2)
    return
  end
  SetNightvision(nightVisionActive)
  if not sm then return end
  if nightVisionActive then
    prevPropIdx = GetPedPropIndex(PlayerPedId(), 0)
    prevPropTextureIdx = GetPedPropTextureIndex(PlayerPedId(), 0)
    SetPedPropIndex(PlayerPedId(), 0, sm, 0, true)
  else
    ClearPedProp(PlayerPedId(), 0)
    SetPedPropIndex(PlayerPedId(), 0, prevPropIdx, prevPropTextureIdx, true)
  end
end)

local thermalsActive = false
function toggleThermalMode()
  if not nightVisionActivePD then return end
  if thermalsActive then
    DisablePedHeatscaleOverride(PlayerPedId())
    SetSeethrough(false)
    thermalsActive = false
  else
    SetPedHeatscaleOverride(PlayerPedId(), 0)
    SetSeethrough(true)
    SeethroughSetMaxThickness(1.0)
    thermalsActive = true
  end
end

Citizen.CreateThread(function()
  exports["FIXDEV-keybinds"]:registerKeyMapping("", "Player", "Toggle Thermals", "+toggleThermalMode", "-toggleThermalMode", "END")
  RegisterCommand('+toggleThermalMode', function() toggleThermalMode() end, false)
	RegisterCommand('-toggleThermalMode', function() end, false)
end)

--

local grappleGunHash = -1654528753
local grappleGunTintIndex = 2
local grappleGunSuppressor = `COMPONENT_AT_AR_SUPP_02`
local grappleGunEquipped = false
local shownGrappleButton = false
local grappleGunItems = {
  ["grapplegun"] = true,
  ["grapplegunpd"] = true,
}
CAN_GRAPPLE_HERE = true
AddEventHandler("FIXDEV-inventory:itemUsed", function(item)
  if not grappleGunItems[item] then return end
  if item == "grapplegun" and myJob == "police" then return end
  grappleGunEquipped = not grappleGunEquipped
  if grappleGunEquipped then
    GiveWeaponToPed(PlayerPedId(), grappleGunHash, 0, 0, 1)
    GiveWeaponComponentToPed(PlayerPedId(), grappleGunHash, grappleGunSuppressor)
    SetPedWeaponTintIndex(PlayerPedId(), grappleGunHash, item ~= "grapplegun" and 5 or 2)
    SetPedAmmo(PlayerPedId(), grappleGunHash, 0)
    SetAmmoInClip(PlayerPedId(), grappleGunHash, 0)
  else
    RemoveWeaponFromPed(PlayerPedId(), grappleGunHash)
  end
  local ply = PlayerId()
  Citizen.CreateThread(function()
    while grappleGunEquipped do
      Wait(500)
      local veh = GetVehiclePedIsIn(PlayerPedId(), false)
      if (veh and veh ~= 0) or GetSelectedPedWeapon(PlayerPedId()) ~= grappleGunHash then
        grappleGunEquipped = false
        RemoveWeaponFromPed(PlayerPedId(), grappleGunHash)
      end
    end
  end)
  Citizen.CreateThread(function ()
    while grappleGunEquipped do
      local freeAiming = IsPlayerFreeAiming(ply)
      local hit, pos, _, _ = GrappleCurrentAimPoint(40)
      if not shownGrappleButton and freeAiming and hit == 1 and CAN_GRAPPLE_HERE then
        shownGrappleButton = true
        exports["FIXDEV-ui"]:showInteraction("[E] Grapple!")
      elseif shownGrappleButton and ((not freeAiming) or hit ~= 1 or (not CAN_GRAPPLE_HERE)) then
        shownGrappleButton = false
        exports["FIXDEV-ui"]:hideInteraction("[E] Grapple!")
      end
      Wait(250)
    end
  end)
  Citizen.CreateThread(function()
    while grappleGunEquipped do
      local freeAiming = IsPlayerFreeAiming(ply)
      if IsControlJustReleased(0, 51) and freeAiming and grappleGunEquipped and CAN_GRAPPLE_HERE then
        local hit, pos, _, _ = GrappleCurrentAimPoint(40)
        if hit == 1 then
          grappleGunEquipped = false
          -- local area = {
          --   radius = 10.0,
          --   target = GetEntityCoords(PlayerPedId()),
          --   type = 1,
          -- }
          -- local event = {
          --   server = false,
          --   inEvent = "InteractSound_CL:PlayOnOne",
          --   outEvent = "InteractSound_CL:StopLooped",
          -- }
          -- TriggerServerEvent("infinity:playSound", event, area, "grapple-shot", 0.75)
          -- Citizen.Wait(1000)
          local grapple = Grapple.new(pos)
          grapple.activate()
          Citizen.Wait(1000)
          RemoveWeaponFromPed(PlayerPedId(), grappleGunHash)
          TriggerEvent("inventory:DegenLastUsedItem", 25)
          shownGrappleButton = false
          exports["FIXDEV-ui"]:hideInteraction("[E] Grapple!")
        end
      end
      Citizen.Wait(0)
    end
  end)
end)

--
AddEventHandler("FIXDEV-inventory:itemUsed", function(item)
  if item ~= "casinoblueprintscase" then return end
  local hasItem1 = exports["FIXDEV-inventory"]:hasEnoughOfItem("casinocaseaccesshalf", 1, false, true)
  local hasItem2 = exports["FIXDEV-inventory"]:hasEnoughOfItem("casinocaseaccesshalfsecond", 1, false, true)
  if (not hasItem1) or (not hasItem2) then
    TriggerEvent("DoLongHudText", "Missing codes.", 2)
    return
  end
  TriggerEvent("inventory:removeItem", "casinoblueprintscase", 1)
  Wait(500)
  TriggerEvent("inventory:removeItem", "casinocaseaccesshalf", 1)
  Wait(500)
  TriggerEvent("inventory:removeItem", "casinocaseaccesshalfsecond", 1)
  Wait(500)
  TriggerEvent("player:receiveItem", "casinoblueprints", 1)
end)
