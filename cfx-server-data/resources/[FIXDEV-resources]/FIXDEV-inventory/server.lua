RegisterServerEvent("cash:remove")
AddEventHandler("cash:remove", function(src,amount)
    local user = exports["FIXDEV-base"]:getModule("Player"):GetUser(src)
    user:removeMoney(tonumber(amount))
end)


AddEventHandler('inventory:saveHoneyItem', function(pSource, pItemId, pAmount, pCost, pTargetInv)
    local user = exports["FIXDEV-base"]:getModule("Player"):GetUser(pSource)

    if not user then return end

    exports["FIXDEV-log"]:AddLog("Exploiter", user, ("User duped inventory item [%s]x%s"):format(pItemId or 'N/A', pAmount or 'N/A'), { item = pItemId, amount = pAmount, target = pTargetInv})
end)