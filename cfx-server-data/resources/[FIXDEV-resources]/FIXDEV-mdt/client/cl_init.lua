Citizen.CreateThread(function()
  exports["FIXDEV-keybinds"]:registerKeyMapping("","Gov", "MDW", "+openMdw", "-openMdw")
  RegisterCommand("+openMdw", function()
    TriggerEvent("FIXDEV-ui:openMDW", {})
  end, false)
  RegisterCommand("-openMdw", function() end, false)
  regCommand()
end)

AddEventHandler("FIXDEV-spawn:characterSpawned", function()
  regCommand()
end)

function regCommand()
  Citizen.Wait(5000)
  local result = RPC.execute("FIXDEV-ui:mdtApiRequest", {
    action = "hasConfigPermission",
    data = {},
  })
  if result and result.message and result.message.steam then
    RegisterCommand("mdw", function()
      TriggerEvent("FIXDEV-ui:openMDW", { fromCmd = true })
    end)
  end
end

RegisterCommand("useMdwNewUrl", function()
  exports["FIXDEV-ui"]:sendAppEvent("mdt", { useNewApi = true })
end, false)
RegisterCommand("useMdwNewUrlOff", function()
  exports["FIXDEV-ui"]:sendAppEvent("mdt", { useNewApi = false })
end, false)
