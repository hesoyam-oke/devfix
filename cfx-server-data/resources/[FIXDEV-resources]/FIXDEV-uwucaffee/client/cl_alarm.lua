AddEventHandler("FIXDEV-uwucafee:silentAlarm", function()
  local finished = exports["FIXDEV-taskbar"]:taskBar(4000, _L("uwucafee-pressing-alarm", "Pressing Alarm"))
  if finished ~= 100 then return end
  TriggerServerEvent("FIXDEV-uwucafee:triggerSilentAlarm", GetEntityCoords(PlayerPedId()))
end)
