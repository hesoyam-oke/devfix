AddEventHandler("FIXDEV-foodchain:silentAlarm", function()
  local finished = exports["FIXDEV-taskbar"]:taskBar(4000, _L("foodchain-pressing-alarm", "Pressing Alarm"))
  if finished ~= 100 then return end
  TriggerServerEvent("FIXDEV-foodchain:triggerSilentAlarm", GetEntityCoords(PlayerPedId()))
end)
