local numEmployee = 0
local employeeList = {
    ["main"] = {},
    ["pier"] = {}
}
local stationList = {
    [0] = false,
    [1] = false,
    [2] = false,
    [3] = false,
}

RPC.register("FIXDEV-foodchain:tryJoinJob", function(pSource, pLocation)
    local user = exports["FIXDEV-base"]:getModule("Player"):GetUser(pSource)
    local char = user:getCurrentCharacter()
    
    if employeeList[pLocation] then
        if numEmployee > 5 then
            return false, "foodchain-not-employee", "You can't take this job right now !"
        else
            table.insert(employeeList[pLocation], {
                cid = char.id,
                name = char.first_name.." "..char.last_name,
            })

            numEmployee = numEmployee + 1
            return true, "foodchain-clocked-in", "Clocked in"
        end    
    end
end)

RPC.register("FIXDEV-foodchain:leaveJob", function(pSource)
    local user = exports["FIXDEV-base"]:getModule("Player"):GetUser(pSource)
    local char = user:getCurrentCharacter()
    local pLocation = "main"
    local rData = false

    for k, v in pairs(employeeList[pLocation]) do
        if v.cid == char.id then
            rData = k
        end
    end
    
    if rData == false then
        pLocation = "pier"
        for k, v in pairs(employeeList[pLocation]) do
            if v.cid == char.id then
                rData = k
            end
        end
    end    

    table.remove(employeeList[pLocation], rData)
    numEmployee = numEmployee - 1
    return true
end)

RPC.register("FIXDEV-foodchain:getMurderMeal", function(pSource)
    local genId = tostring(math.random(10000, 99999999))
    local invId = "container-" .. genId .. "-murder meal"
    information = {
        inventoryId = invId,
        slots = 4,
        weight = 4,
        _hideKeys = {'inventoryId', 'slots', 'weight'},
    }
    TriggerClientEvent('player:receiveItem', pSource, 'murdermeal', 1, false, information)

    return true
end)

RPC.register("FIXDEV-foodchain:isStationActive", function(pSource, pStationId)
    return stationList[pStationId]
end)

RPC.register("FIXDEV-foodchain:setStationActive", function(pSource, pStationId)
    stationList[pStationId] = true
    return true
end)

RPC.register("FIXDEV-foodchain:completePurchase", function(pSource, pData)
    local user = exports["FIXDEV-base"]:getModule("Player"):GetUser(pSource)

    if user:getCash() >= tonumber(pData.cost) then
        user:removeMoney(pData.cost)
        TriggerClientEvent("FIXDEV-foodchain:closePurchase", -1, pData)

        information = {
            Price = tonumber(pData.cost),
        }
        TriggerClientEvent("player:receiveItem", pData.charger, "burgerReceipt", 1, true, information)   
            
        return true
    else
        TriggerClientEvent("DoLongHudText", -1, "You have not enough money!", 2)
        return false
    end
end)


RPC.register("FIXDEV-foodchain:startPurchase", function(pSource, pData)
    local rData = pData
    rData["charger"] = pSource

    TriggerClientEvent("FIXDEV-foodchain:activePurchase", -1, rData)
    return
end)

RPC.register("FIXDEV-foodchain:server:getActiveEmployees", function(pSource) -- Need FIXDEV-bussiness
    return employeeList
end)   

RPC.register("FIXDEV-foodchain:fireEmployee", function(pSource, pEmployee) -- Need FIXDEV-bussiness
end)

RPC.register("FIXDEV-foodchain:canUseStore", function()
    if #locEmployeeBurger["main"] > 0 then
        return true
    end

    return false
end)

RPC.register("ChargeExternal", function(pSource, pData)
    TriggerClientEvent("FIXDEV-wuchang:activateLasers", -1, pData)
    return
end)

RPC.register("PriceWithTaxString",function(pSource, pPrice, pType)
    local rData = {
        total = pPrice,
        text = pPrice .. " + " .. pType
    }
    return rData
end) 

RPC.register("FIXDEV-foodchain:addcash", function(pAmount)
    local pSrc = source
    local user = exports["FIXDEV-base"]:getModule("Player"):GetUser(pSrc)
    local char = user:getCurrentCharacter()
    if not pAmount then
        return
    end
    user:addMoney(pAmount)
end)


RegisterServerEvent("FIXDEV-foodchain:update:pay")
AddEventHandler("FIXDEV-foodchain:update:pay", function()
    local src = source
    local user = exports["FIXDEV-base"]:getModule("Player"):GetUser(src)
    local characterId = user:getVar("character").id
    local invname = 'ply-'..characterId
    exports.oxmysql:execute("SELECT `slot`, `information` FROM user_inventory2 WHERE name = ? AND `item_id` = ? ORDER BY slot DESC", {invname, "burgerReceipt"}, function(data)
        if data[1] then
            local slot = data[1].slot
            local jsonparse = json.decode(data[1].information)
            exports.oxmysql:execute("SELECT `paycheck` FROM characters WHERE id = ?", {characterId}, function(old)
                local before = old[1].paycheck
                exports.oxmysql:execute("UPDATE characters SET `paycheck` = @paycheck WHERE `id` = @id", {
                    ['@paycheck'] = old[1].paycheck + jsonparse["Price"],
                    ['@id'] = characterId
                })
                print(jsonparse["Price"])
                TriggerClientEvent("Yougotpaid", src, characterId)
                exports.oxmysql:execute('DELETE FROM user_inventory2 WHERE `name`= ? AND `item_id`= ? AND `slot`= ?', {invname, "burgerReceipt", slot})
            end)
        else
            TriggerClientEvent("DoLongHudText", src, "You dont have any work receipts to cash in")
        end
    end)
end)