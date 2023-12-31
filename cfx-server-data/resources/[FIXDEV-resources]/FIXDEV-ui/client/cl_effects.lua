RegisterCommand('sounds:playall', function()
  for i = 1, 5 do
    SendUIMessage({
      source = "FIXDEV-nui",
      app = "sounds",
      data = {
        action = 'play',
        id = i,
        name = 'demo',
        loop = true,
        volume = 0.5 -- 0 to 1
      }
    })
    Wait(300)
  end
end)

RegisterCommand('sounds:stopall', function()
  for i = 1, 5 do
    SendUIMessage({
      source = "FIXDEV-nui",
      app = "sounds",
      data = {
        action = 'stop',
        id = i
      }
    });
    Wait(300)
  end
end)

RegisterCommand("sounds:play", function()
  exports["FIXDEV-ui"]:soundPlay(1, "demo", 0.5)
end, false)

RegisterCommand("sounds:stop", function()
  exports["FIXDEV-ui"]:soundStop(1)
end, false)

RegisterCommand("sounds:volume", function()
  exports["FIXDEV-ui"]:soundVolume(1, 0.1)
end, false)
