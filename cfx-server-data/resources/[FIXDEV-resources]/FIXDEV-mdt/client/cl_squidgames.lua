AddEventHandler('FIXDEV-inventory:itemUsed', function(pItem)
  if pItem ~= "squidcoinheads" then return end
  TriggerServerEvent("FIXDEV-squidgames:flipCoin", true)
end)
AddEventHandler('FIXDEV-inventory:itemUsed', function(pItem)
  if pItem ~= "squidcoinboth" then return end
  TriggerServerEvent("FIXDEV-squidgames:flipCoin", false)
end)
