-- [ Events ] --
RegisterCommand('clmenu', function(source, args, RawCommand)
 TriggerEvent("FIXDEV-clothing:client:openOutfitMenu")   
end)

RegisterNetEvent('FIXDEV-clothing:client:openOutfitMenu', function()
    local OutfitsMenu = {
        {
            header = "Outfit Management",
            icon = "fas fa-tshirt",
            params = {},
        },
        {
            header = "View Outfits",
            txt = "View outfits in wardrobe.",
            params = {
                event = "FIXDEV-clothing/client/openOutfitsContext",
            }
        },
        {
            header = "Add Outfit",
            txt = "Adds current outfit to wardrobe.",
            params = {
                event = "FIXDEV-clothing/client/add-outfit",
            }
        },
    }
    exports[Config.ContextMenu]:openMenu(OutfitsMenu)
end)

RegisterNetEvent("FIXDEV-clothing/client/openOutfitsContext", function()
    local Promise = promise:new()
    local Outfits = RPC.execute("FIXDEV-clothing/server/getOutfits")

    local Outfits = Citizen.Await(Promise)

    local OutfitList = {}
    OutfitList[#OutfitList + 1] = {
        header = "Outfits",
        icon = "fas fa-tshirt",
        params = {},
    }
    OutfitList[#OutfitList + 1] = {
        header = "Go back",
        icon = "fas fa-chevron-left",
        params = {
            event = "FIXDEV-clothing:client:openOutfitMenu",
        },
    }

    for i = 1, #Outfits do
        OutfitList[#OutfitList + 1] = {
            header = Outfits[i].outfitname,
            txt = "Click to open outfit options.",
            params = {
                event = "FIXDEV-clothing/open-outfit-options",
                args = {
                    outfitData = Outfits[i]
                }
            }
        }
    end

    if #OutfitList > 0 then
        exports[Config.ContextMenu]:openMenu(OutfitList)
    else
        TriggerEvent("DoLongHudText", "You don't have any outfits yet.", 2)
    end
end)

RegisterNetEvent("FIXDEV-clothing/open-outfit-options", function(Data)
    local outfitData = Data.outfitData

    local OutfitList = {}
    OutfitList[#OutfitList + 1] = {
        header = "Outfit Options",
        icon = "fas fa-tshirt",
        params = {},
    }
    OutfitList[#OutfitList + 1] = {
        header = "Go back",
        icon = "fas fa-chevron-left",
        params = {
            event = "FIXDEV-clothing/client/openOutfitsContext",
        },
    }
    OutfitList[#OutfitList + 1] = {
        header = "Use Outfit",
        txt = "Click to use this outfit.",
        params = {
            event = "FIXDEV-clothing/client/loadOutfit",
            args = {
                outfitData = outfitData.skin
            }
        }
    }
    OutfitList[#OutfitList + 1] = {
        header = "Delete Outfit",
        txt = "Click to delete this outfit.",
        params = {
            event = "FIXDEV-clothing/server/removeOutfit",
            isServer = true,
            args = {
                name = outfitData.outfitname,
                id = outfitData.outfitId
            }
        }
    }

    if #OutfitList > 0 then
        exports[Config.ContextMenu]:openMenu(OutfitList)
    end
end)


RegisterNetEvent('FIXDEV-clothing/client/add-outfit', function()
    local OutfitName = 'outfit-' .. math.random(11111, 99999)
    if OutfitName then
        local Model = GetEntityModel(PlayerPedId())
        TriggerServerEvent('FIXDEV-clothes/saveOutfit', OutfitName, Model, Config.SkinData)
        TriggerEvent("DoLongHudText", "Successfully saved outfit: " .. OutfitName)
    else
        TriggerEvent("DoLongHudText", "You must include oufit name.", 2)
    end
end)

RegisterNetEvent("FIXDEV-clothing/client/saveCurrentOutfit", function(Name)
    local Model = GetEntityModel(PlayerPedId())
    TriggerServerEvent('FIXDEV-clothes/saveOutfit', Name, Model, Config.SkinData)
    TriggerEvent("DoLongHudText", "Successfully saved outfit: " .. Name)
end)
