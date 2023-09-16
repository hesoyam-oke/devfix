RPC.register("wild-clothing:purchase",function(pSource,pPrice)
    local src = source
    local user = exports["FIXDEV-base"]:getModule("Player"):GetUser(pSource)
    if user:getCash() >= pPrice.param then
        user:removeMoney(pPrice.param)
    else
        TriggerClientEvent('DoLongHudText', src, 'You do not have enough money ! Required Ammount : $250', 2)
    end
    return true
end)

RegisterNetEvent("FIXDEV-clothing/saveSkin", function(Model, Skin)
    local src = source
    local Player = exports["FIXDEV-base"]:getModule("Player"):GetUser(src)
    local cid = Player:getCurrentCharacter().id

    if Model ~= nil and Skin ~= nil then

        local delete = MySQL.update.await([[
            DELETE FROM playerskins
            WHERE citizenid = ?
        ]],
        { cid })

        if not delete then return print("error deleteting skin from database") end

        local data2 = MySQL.insert.await([[
            INSERT INTO playerskins (citizenid, model, skin, active)
            VALUES (?, ?, ?, ?)
        ]],
        { cid, Model, Skin, 1 })

        if not data2 then return print("error inserting skin from database") end

        TriggerClientEvent("DoLongHudText", src, "Outfit Saved")
    end
end)

RegisterNetEvent("FIXDEV-clothes/loadPlayerSkin", function()
    local src = source
    local Player = exports["FIXDEV-base"]:getModule("Player"):GetUser(src)
    local cid = Player:getCurrentCharacter().id

    local result = MySQL.query.await([[
        SELECT *
        FROM playerskins
        WHERE citizenid = ? AND active = ?
    ]], { cid, 1 })

    if result[1] ~= nil then
        TriggerClientEvent("FIXDEV-clothes:loadSkin", src, false, result[1].model, result[1].skin)
    else
        TriggerClientEvent("FIXDEV-clothes:loadSkin", src, true)
    end
end)

RegisterNetEvent("FIXDEV-clothes/saveOutfit", function(outfitName, model, skinData)
    local src = source
    local Player = exports["FIXDEV-base"]:getModule("Player"):GetUser(src)
    local cid = Player:getCurrentCharacter().id

    if model ~= nil and skinData ~= nil then
        local outfitId = "outfit-"..math.random(1, 10).."-"..math.random(1111, 9999)
        local data2 = MySQL.insert.await([[
            INSERT INTO player_outfits (citizenid, outfitname, model, skin, outfitId)
            VALUES (?, ?, ?, ?, ?)
        ]],
        { cid, outfitName, json.encode(skinData), outfitId })

        if not data2 then return print("error inserting outfit in database") end
    end
end)

RegisterNetEvent("FIXDEV-clothing/server/removeOutfit", function(outfitName, outfitId)
    local src = source
    local Player = exports["FIXDEV-base"]:getModule("Player"):GetUser(src)
    local cid = Player:getCurrentCharacter().id

    local Outfit = nil
    local OutfitIdentifier = nil

    if type(outfitName) == 'table' then
        Outfit = outfitName.name
        OutfitIdentifier = outfitName.id
    else
        Outfit = outfitName
        OutfitIdentifier = outfitId
    end

    local delete = MySQL.update.await([[
        DELETE FROM player_outfits
        WHERE citizenid = ? AND outfitname = ? AND outfitId = ?
    ]],
    { cid, Outfit, OutfitIdentifier })

    if not delete then return print("error deleteting outfit from database") end
end)

-- [ Callbacks ] --
RPC.register("FIXDEV-clothing/server/pay-for-clothes", function(src, isAdmin)
    local user = exports["FIXDEV-base"]:getModule("Player"):GetUser(src)

    if not IsAdmin then
        if Player.Functions.RemoveMoney('cash', Config.ClothingPrice) then
            return true
        else
            TriggerClientEvent("DoLongHudText", src, "Not enough money", 2)
            TriggerClientEvent("FIXDEV-clothes/client/loadPlayerSkin", src)
            return false
        end
    else
        return true
    end
end)

RPC.register("FIXDEV-clothing/server/getOutfits", function(src)
    local user = exports["FIXDEV-base"]:getModule("Player"):GetUser(src)
    local cid = user:getCurrentCharacter().id

    local Outfits = {}
    local result = MySQL.query.await([[
        SELECT *
        FROM player_outfits
        WHERE citizenid = ?
    ]], { cid })

    if result[1] ~= nil then
        for k, v in pairs(result) do
            result[k].skin = json.decode(result[k].skin)
            Outfits[k] = v
        end
        return Outfits
    end

    return Outfits
end)

