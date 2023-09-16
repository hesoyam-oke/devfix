local safeAttempts = 0
local safeAttemptsResult = nil
local storeSafeMinigameUICallbackUrl = "FIXDEV-ui:heists:storeSafeMinigameResult"
local gameSettings = {
  gameFinishedEndpoint = storeSafeMinigameUICallbackUrl,
  gameTimeoutDuration = 14000,
  coloredSquares = 10,
  gridSize = 5,
}

local function crackSafe()
  local p = promise:new()
  RequestAnimDict("mini@safe_cracking")
  while not HasAnimDictLoaded("mini@safe_cracking") do
    Citizen.Wait(0)
  end
  ClearPedTasksImmediately(PlayerPedId())
  TaskPlayAnim(PlayerPedId(), "mini@safe_cracking", "dial_turn_clock_slow", 8.0, 1.0, -1, 1, -1, false, false, false)
  Citizen.CreateThread(function()
    safeAttemptsResult = nil
    exports["FIXDEV-ui"]:openApplication("memorygame", gameSettings)
    while safeAttemptsResult == nil do
      Citizen.Wait(1000)
    end
    p:resolve(safeAttemptsResult)
    ClearPedTasksImmediately(PlayerPedId())
  end)
  return p
end

RegisterUICallback(storeSafeMinigameUICallbackUrl, function(data, cb)
  safeAttemptsResult = data.success
  cb({ data = {}, meta = { ok = true, message = "done" } })
end)
AddEventHandler("FIXDEV-heists:stores:attemptSafe", function(p1, p2, pArgs)
  if not exports["FIXDEV-inventory"]:hasEnoughOfItem("safecrackingkit", 1, false, true) then
    TriggerEvent("DoLongHudText", "You don't have the necessary item.", 2)
    return
  end
  local id = pArgs.zones["store_safe_target"].id
  local coords = pArgs.zones["store_safe_target"].coords
  local canHitSafe = RPC.execute("FIXDEV-heists:store:canHitSafe", id, coords)
  if not canHitSafe then return end
  TriggerEvent("inventory:removeItem", "safecrackingkit", 1)
  local crackSuccess = Citizen.Await(crackSafe())
  if not crackSuccess then return end
  RPC.execute("FIXDEV-heists:store:canHitSafeSuccess", id)
end)
AddEventHandler("FIXDEV-ui:application-closed", function(name)
  if name ~= "memorygame" then return end
  Citizen.CreateThread(function()
    Citizen.Wait(2500)
    if safeAttemptsResult == nil then
      safeAttemptsResult = false
    end
  end)
end)

AddEventHandler("FIXDEV-heists:stores:openSafe", function(p1, p2, pArgs)
  local id = pArgs.zones["store_safe_target"].id
  local coords = pArgs.zones["store_safe_target"].coords
  RPC.execute("FIXDEV-heists:store:openCrackedSafe", id, coords)
end)
