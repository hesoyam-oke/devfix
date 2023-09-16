AddEventHandler('FIXDEV-inventory:itemUsed', function(item, info, inventoryName, slot)
  if item ~= 'rfscanner' then
    return
  end

  Citizen.CreateThread(function()
    for i = 1, 7 do
      PlaySound(-1, '5_SEC_WARNING', 'HUD_MINI_GAME_SOUNDSET', false, 0, true)
      Wait(1500)
    end
  end)
  local finished = exports['FIXDEV-taskbar']:taskBar(10000, 'Scanning...')
  if finished ~= 100 then
    return
  end

  local plyCoords = GetEntityCoords(PlayerPedId())
  local frequencies = RPC.execute('FIXDEV-usableprops:getNearbyDevices', plyCoords)

  local context = {}
  context[#context + 1] = { title = 'Frequencies', icon = 'broadcast-tower' }
  for frequency, strength in pairs(frequencies) do
    local relative = 10 - strength + math.random(1, 10) - math.random(1, 10)
    local displayFrequency = ('%.2d MHz ~ %.2d MHz'):format(math.floor(frequency - relative), math.ceil(frequency + relative))
    context[#context + 1] = { title = displayFrequency, icon = 'signal' }
  end
  exports['FIXDEV-ui']:showContextMenu(context)
end)
