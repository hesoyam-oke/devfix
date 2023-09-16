local hmm = vehicleBaseRepairCost

RegisterServerEvent('FIXDEV-bennys:attemptPurchase')
AddEventHandler('FIXDEV-bennys:attemptPurchase', function(cheap, type, upgradeLevel)
	local src = source
	local user = exports["FIXDEV-base"]:getModule("Player"):GetUser(src)
    if type == "repair" then
        if user:getCash() >= hmm then
            user:removeMoney(hmm)
            TriggerClientEvent('FIXDEV-bennys:purchaseSuccessful', src)

            exports["FIXDEV-log"]:AddLog("Bennys", 
                src, 
                "Repair", 
                { amount = tostring(hmm) })
        else
            TriggerClientEvent('FIXDEV-bennys:purchaseFailed', src)
        end
    elseif type == "performance" then
        if user:getCash() >= vehicleCustomisationPrices[type].prices[upgradeLevel] then
            TriggerClientEvent('FIXDEV-bennys:purchaseSuccessful', src)
            user:removeMoney(vehicleCustomisationPrices[type].prices[upgradeLevel])

            exports["FIXDEV-log"]:AddLog("Bennys", 
                src, 
                "Performance", 
                { amount = tostring(vehicleCustomisationPrices[type].prices[upgradeLevel]) })
        else
            TriggerClientEvent('FIXDEV-bennys:purchaseFailed', src)
        end
    else
        if user:getCash() >= vehicleCustomisationPrices[type].price then
            TriggerClientEvent('FIXDEV-bennys:purchaseSuccessful', src)
            user:removeMoney(vehicleCustomisationPrices[type].price)

            exports["FIXDEV-log"]:AddLog("Bennys", 
                src, 
                "Other", 
                { type = tostring(type), amount = tostring(vehicleCustomisationPrices[type].price) })
        else
            TriggerClientEvent('FIXDEV-bennys:purchaseFailed', src)
        end
    end
end)

RegisterServerEvent('FIXDEV-bennys:updateRepairCost')
AddEventHandler('FIXDEV-bennys:updateRepairCost', function(cost)
    hmm = cost
end)

RegisterServerEvent('FIXDEV-bennys:repairciv')
AddEventHandler('FIXDEV-bennys:repairciv', function(amount)
    local src = source
    local user = exports["FIXDEV-base"]:getModule("Player"):GetUser(src)
    if (user:getCash() >= amount) then
        user:removeMoney(amount)
        TriggerClientEvent("bennys:civ:repair:cl", src)

        exports["FIXDEV-log"]:AddLog("Bennys", 
            src, 
            "Repair Civ", 
            { amount = tostring(amount) })
    end
end)