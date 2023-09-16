-- CLOSE APP
function SetUIFocus(hasKeyboard, hasMouse)
--  HasNuiFocus = hasKeyboard or hasMouse

  SetNuiFocus(hasKeyboard, hasMouse)

  -- TriggerEvent("FIXDEV-voice:focus:set", HasNuiFocus, hasKeyboard, hasMouse)
  -- TriggerEvent("FIXDEV-binds:should-execute", not HasNuiFocus)
end

exports('SetUIFocus', SetUIFocus)

RegisterNUICallback("FIXDEV-ui:closeApp", function(data, cb)
    SetUIFocus(false, false)
    cb({data = {}, meta = {ok = true, message = 'done'}})
    Wait(800)
    TriggerEvent("attachedItems:block",false)
end)

RegisterNUICallback("FIXDEV-ui:applicationClosed", function(data, cb)
    TriggerEvent("FIXDEV-ui:application-closed", data.name, data)
    cb({data = {}, meta = {ok = true, message = 'done'}})
end)

-- FORCE CLOSE
RegisterCommand("FIXDEV-ui:force-close", function()
    SendUIMessage({source = "FIXDEV-nui", app = "", show = false});
    SetUIFocus(false, false)
end, false)

-- SMALL MAP
RegisterCommand("FIXDEV-ui:small-map", function()
  SetRadarBigmapEnabled(false, false)
end, false)

local function restartUI(withMsg)
  SendUIMessage({ source = "FIXDEV-nui", app = "main", action = "restart" });
  if withMsg then
    TriggerEvent("DoLongHudText", "You can also use 'ui-r' as a shorter version to restart!")
  end
  Wait(5000)
  TriggerEvent("FIXDEV-ui:restarted")
  SendUIMessage({ app = "hud", data = { display = true }, source = "FIXDEV-nui" })
  local cj = exports["police"]:getCurrentJob()
  if cj ~= "unemployed" then
    TriggerEvent("FIXDEV-jobmanager:playerBecameJob", cj)
    TriggerServerEvent("FIXDEV-jobmanager:fixPaychecks", cj)
  end
  loadPublicData()
end
RegisterCommand("FIXDEV-ui:restart", function() restartUI(true) end, false)
RegisterCommand("ui-r", function() restartUI() end, false)
RegisterNetEvent("FIXDEV-ui:server-restart")
AddEventHandler("FIXDEV-ui:server-restart", restartUI)

RegisterCommand("FIXDEV-ui:debug:show", function()
    SendUIMessage({ source = "FIXDEV-nui", app = "debuglogs", data = { display = true } });
end, false)

RegisterCommand("FIXDEV-ui:debug:hide", function()
    SendUIMessage({ source = "FIXDEV-nui", app = "debuglogs", data = { display = false } });
end, false)

RegisterNUICallback("FIXDEV-ui:resetApp", function(data, cb)
    SetUIFocus(false, false)
    cb({data = {}, meta = {ok = true, message = 'done'}})
    sendCharacterData()
end)

RegisterNetEvent("FIXDEV-ui:server-relay")
AddEventHandler("FIXDEV-ui:server-relay", function(data)
    SendUIMessage(data)
end)

RegisterNetEvent("isJudge")
AddEventHandler("isJudge", function()
  sendAppEvent("character", { job = "judge" })
end)

RegisterNetEvent("isJudgeOff")
AddEventHandler("isJudgeOff", function()
  sendAppEvent("character", { job = "unemployed" })
end)

RegisterNetEvent("FIXDEV-jobmanager:playerBecameJob")
AddEventHandler("FIXDEV-jobmanager:playerBecameJob", function(job)
  sendAppEvent("character", { job = job })
end)
