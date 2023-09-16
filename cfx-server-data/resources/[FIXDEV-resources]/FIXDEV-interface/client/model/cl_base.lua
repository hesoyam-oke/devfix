-- CLOSE APP
function SetInterfaceFocus(hasKeyboard, hasMouse)
  SetNuiFocus(hasKeyboard, hasMouse)
end

exports('SetInterfaceFocus', SetInterfaceFocus)

RegisterNUICallback("FIXDEV-interface:closeApp", function(data, cb)
    SetInterfaceFocus(false, false)
    cb({data = {}, meta = {ok = true, message = 'done'}})
    Wait(800)
    TriggerEvent("attachedItems:block",false)
end)

RegisterNUICallback("FIXDEV-interface:applicationClosed", function(data, cb)
    TriggerEvent("FIXDEV-interface:application-closed", data.name, data)
    cb({data = {}, meta = {ok = true, message = 'done'}})
end)

-- FORCE CLOSE
RegisterCommand("FIXDEV-interface:force-close", function()
    SendInterfaceMessage({source = "FIXDEV-nui", app = "", show = false});
    SetInterfaceFocus(false, false)
end, false)

-- SMALL MAP
RegisterCommand("FIXDEV-interface:small-map", function()
  SetRadarBigmapEnabled(false, false)
end, false)

local function restartUI(withMsg)
  SendInterfaceMessage({ source = "FIXDEV-nui", app = "main", action = "restart" });
  if withMsg then
    TriggerEvent("DoLongHudText", "You can also use 'ui-r' as a shorter version to restart!")
  end
  Wait(5000)
  TriggerEvent("FIXDEV-interface:restarted")
  SendInterfaceMessage({ app = "hud", data = { display = true }, source = "FIXDEV-nui" })
  local cj = exports["police"]:getCurrentJob()
end
RegisterCommand("FIXDEV-interface:restart", function() restartUI(true) end, false)
RegisterCommand("ui-r", function() restartUI() end, false)
RegisterNetEvent("FIXDEV-interface:server-restart")
AddEventHandler("FIXDEV-interface:server-restart", restartUI)

RegisterCommand("FIXDEV-interface:debug:show", function()
    SendInterfaceMessage({ source = "FIXDEV-nui", app = "debuglogs", data = { display = true } });
end, false)

RegisterCommand("FIXDEV-interface:debug:hide", function()
    SendInterfaceMessage({ source = "FIXDEV-nui", app = "debuglogs", data = { display = false } });
end, false)

RegisterNUICallback("FIXDEV-interface:resetApp", function(data, cb)
    SetInterfaceFocus(false, false)
    cb({data = {}, meta = {ok = true, message = 'done'}})
    --sendCharacterData()
end)

RegisterNetEvent("FIXDEV-interface:server-relay")
AddEventHandler("FIXDEV-interface:server-relay", function(data)
    SendInterfaceMessage(data)
end)