RegisterNetEvent("FIXDEV-npcs:set:ped")
AddEventHandler("FIXDEV-npcs:set:ped", function(pNPCs)
  if type(pNPCs) == "table" then
    for _, ped in ipairs(pNPCs) do
      RegisterNPC(ped, 'FIXDEV-npcs')
      EnableNPC(ped.id)
    end
  else
    RegisterNPC(ped, 'FIXDEV-npcs')
    EnableNPC(ped.id)
  end
end)

RegisterNetEvent("FIXDEV-npcs:ped:giveStolenItems")
AddEventHandler("FIXDEV-npcs:ped:giveStolenItems", function(pArgs, pEntity, pEntityFlags, pEntityCoords)
 -- local npcCoords = GetEntityCoords(pEntity)
  local finished = exports["FIXDEV-taskbar"]:taskBar(15000, "Preparing to receive goods, don't move.")
  if finished == 100 then
   -- if #(GetEntityCoords(PlayerPedId()) - npcCoords) < 2.0 then
      TriggerEvent("server-inventory-open", "1", "Stolen-Goods-1")
    else
      TriggerEvent("DoLongHudText", "You moved too far you idiot.", 105)
    end
  end)

RegisterNetEvent("FIXDEV-npcs:ped:exchangeRecycleMaterial")
AddEventHandler("FIXDEV-npcs:ped:exchangeRecycleMaterial", function(pArgs, pEntity, pEntityFlags, pEntityCoords)
 -- local npcCoords = GetEntityCoords(pEntity)
  local finished = exports["FIXDEV-taskbar"]:taskBar(3000, "Preparing to exchange material, don't move.")
  if finished == 100 then
   -- if #(GetEntityCoords(PlayerPedId()) - npcCoords) < 2.0 then
      TriggerEvent("server-inventory-open", "103", "Craft");
    else
      TriggerEvent("DoLongHudText", "You moved too far you idiot.", 105)
    end
end)

RegisterNetEvent("FIXDEV-npcs:ped:signInJob")
AddEventHandler("FIXDEV-npcs:ped:signInJob", function(pArgs, pEntity, pEntityFlags, pEntityCoords)
  if #pArgs == 0 then
    local npcId = DecorGetInt(pEntity, 'NPC_ID')
    if npcId == `news_reporter` then
      TriggerServerEvent("jobssystem:jobs", "news")
    elseif npcId == `head_stripper` then
      TriggerServerEvent("jobssystem:jobs", "entertainer")
    end
  else
    TriggerServerEvent("jobssystem:jobs", "unemployed")
  end
end)

RegisterNetEvent("FIXDEV-npcs:ped:paycheckCollect")
AddEventHandler("FIXDEV-npcs:ped:paycheckCollect", function(pArgs, pEntity, pEntityFlags, pEntityCoords)
  TriggerServerEvent("server:paySlipPickup")
end)

RegisterNetEvent("FIXDEV-npcs:ped:receiptTradeIn")
AddEventHandler("FIXDEV-npcs:ped:receiptTradeIn", function(pArgs, pEntity, pEntityFlags, pEntityCoords)
  local cid = exports["isPed"]:isPed("cid")
  local accountStatus, accountTarget = RPC.execute("GetDefaultBankAccount", cid)
  if not accountStatus then return end
  RPC.execute("FIXDEV-inventory:tradeInReceipts", cid, accountTarget)
end)

RegisterNetEvent("FIXDEV-npcs:ped:sellStolenItems")
AddEventHandler("FIXDEV-npcs:ped:sellStolenItems", function()
  RPC.execute("FIXDEV-inventory:sellStolenItems")
end)

RegisterNetEvent("FIXDEV-npcs:ped:keeper")
AddEventHandler("FIXDEV-npcs:ped:keeper", function(pArgs, pEntity, pEntityFlags, pEntityCoords)
  TriggerEvent("server-inventory-open", pArgs[1], "Shop");
end)


TriggerServerEvent("FIXDEV-npcs:location:fetch")

AddEventHandler("FIXDEV-npcs:ped:weedSales", function(pArgs, pEntity, pEntityFlags, pEntityCoords)
  local result, message = RPC.execute("FIXDEV-npcs:weedShopOpen")
  if not result then
    TriggerEvent("DoLongHudText", message, 2)
    return
  end
  TriggerEvent("server-inventory-open", "44", "Shop");
end)

AddEventHandler("FIXDEV-npcs:ped:licenseKeeper", function()
  RPC.execute("FIXDEV-npcs:purchaseDriversLicense")
end)

