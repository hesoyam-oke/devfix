RegisterServerEvent("server-item-quality-update")
AddEventHandler("server-item-quality-update", function(player, data)
    if data.quality < 1 then
        exports.oxmysql:execute("UPDATE user_inventory2 SET `quality` = @quality WHERE name = @name AND slot = @slot AND item_id = @item_id", {
            ['quality'] = "0", 
            ['name'] = 'ply-' ..player, 
            ['slot'] = data.slot,
            ['item_id'] = data.itemid
        })
    end
end)

RegisterServerEvent("server-item-update-metadata")
AddEventHandler("server-item-update-metadata", function(inventoryName, slot, itemid, information)
    print("server-item-update-metadata", inventoryName, slot, itemid, information)
    exports.oxmysql:execute("UPDATE user_inventory2 SET `information` = @information WHERE name = @name AND slot = @slot AND item_id = @item_id", {
        ['information'] = information, 
        ['name'] = inventoryName, 
        ['slot'] = slot,
        ['item_id'] = itemid
    })
end)

RegisterNetEvent("inv:itemUsed")
AddEventHandler("inv:itemUsed", function(pItemId, slot, inventory)
    local src = source
    local remove = false

    if pItemId == nil then
        return
    end

    if not hasEnoughOfItem(src, pItemId, 1, false) then
        return TriggerClientEvent("DoLongHudText", src, "You dont appear to have this item on you?", 2)
    end

    --Note: Fake item for demo purposes
    if pItemId == 'bankbox' then
        if hasEnoughOfItem(src, 'bankboxkey', 1, true) then
            removeItem(src, 'bankboxkey', 1)
            TriggerEvent('FIXDEV:loot:system:draw', src, pItemId)
            remove = true
        end
    end

    if remove then
        removeItem(src, pItemId, 1)
    end
end)

function GetDecayDate(pItemId)
    
end

function getQuantity(pServerId, pItemId)
    local user, amount = exports["FIXDEV-base"]:getModule("Player"):GetUser(pServerId), 0

    if user then
        local invId = ('ply-%s'):format(user.character.id)
        local query = 'SELECT count(item_id) as amount FROM user_inventory2 WHERE name = @inventory AND item_id = @item'
        local p = promise:new()

        local decayDate

        if checkQuality then
            decayDate = exports['FIXDEV-inventory']:GetDecayDate(pItemId)

            if decayDate then
                query = query .. ' AND @decayDate < creationDate'
            end
        end

        exports.oxmysql:scalar(query, { ['inventory'] = invId, ['item'] = pItemId, ['decayDate'] = decayDate}, function(data)
            p:resolve(data and data or 0)
        end)

        amount = Citizen.Await(p)
    end

    return amount
end

exports('getQuantity', getQuantity)

function removeItem(pServerId, pItemId, pAmount, pShouldNotify)
    local user = exports["FIXDEV-base"]:getModule("Player"):GetUser(pServerId)

    if user then
        local notify = pShouldNotify == nil and true or pShouldNotify

        if pItemId == nil or pItemId == 0 or pAmount == nil or pAmount <= 0 then
            return false
        end

        TriggerEvent('server-remove-item', user.character.id, pItemId, pAmount)

        if notify then
            TriggerClientEvent('hud-display-item', pServerId, pItemId, "Removed", pAmount)
        end

        return true
    end

    return false
end

exports('removeItem', removeItem)

function hasEnoughOfItem(pServerId, pItemId, pAmount, pShouldReturnText)
    local notify = pShouldReturnText == nil and true or pShouldReturnText

    if pItemId == nil or pItemId == 0 or pAmount == 0 then
        if notify then
            TriggerClientEvent("DoLongHudText", pServerId, "I dont seem to have " .. pItemId .. " in my pockets.", 2)
        end
        return false
    end

    if getQuantity(pServerId, pItemId) >= pAmount then
        return true
    end

    if (notify) then
        TriggerClientEvent("DoLongHudText", pServerId, "I dont have enough of that item...", 2)
    end

    return false 
end


exports('hasEnoughOfItem', hasEnoughOfItem)


local LastUsedItem = 0
local LastUsedItemId = "ciggy"

RegisterNetEvent('inventory:DegenLastUsedItem')
AddEventHandler('inventory:DegenLastUsedItem', function(percent)
    local cid = exports["isPed"]:isPed("cid")
    print("Degen applied to ".. LastUsedItemId .. " ID: " .. LastUsedItem .. " at %" .. percent)
    TriggerServerEvent("inventory:degItem",LastUsedItem,percent,LastUsedItemId,cid)
end)

RegisterNetEvent('RunUseItem')
AddEventHandler('RunUseItem', function(itemid, slot, inventoryName, isWeapon, passedItemInfo)

    if itemid == nil then
        return
    end
    local player = PlayerPedId()
    local ItemInfo = GetItemInfo(slot)
    local currentVehicle = GetVehiclePedIsUsing(player)
    LastUsedItem = ItemInfo.id
    LastUsedItemId = itemid
    if ItemInfo.quality == nil then return end
    if ItemInfo.quality < 1 then
        TriggerEvent("DoLongHudText","Item is too worn.",2)
        if isWeapon then
            TriggerEvent("brokenWeapon")
        end
        return
    end

    if justUsed then
        retardCounter = retardCounter + 1
        if retardCounter > 10 and retardCounter > lastCounter+5 then
            lastCounter = retardCounter
            TriggerServerEvent("exploiter", "Tried using " .. retardCounter .. " items in < 500ms ")
        end
        return
    end

    justUsed = true

    if (not hasEnoughOfItem(itemid,1,false)) then
        TriggerEvent("DoLongHudText","You dont appear to have this item on you?",2)
        justUsed = false
        retardCounter = 0
        lastCounter = 0
        return
    end

    if parachuteConfig[itemid] and tonumber(ItemInfo.quality) > 0 and not IsPedInParachuteFreeFall(player) and not IsPedFalling(player) and (GetPedParachuteState(player) == -1 or GetPedParachuteState(player) == 0) then
        local pConf = parachuteConfig[itemid]
        SetPlayerParachuteModelOverride(PlayerId(), pConf.replace)
        SetPedParachuteTintIndex(PlayerPedId(), pConf.tint)
        SetPlayerReserveParachuteTintIndex(PlayerId(), pConf.tint)
        TriggerEvent("equipWeaponID", "-72657034",ItemInfo.information,ItemInfo.id)
        TriggerEvent("inventory:removeItem",itemid, 1)
        TriggerEvent("hud:equipParachute")
        justUsed = false
        retardCounter = 0
        lastCounter = 0
        return
    end

    if not isValidUseCase(itemid,isWeapon) then
        justUsed = false
        retardCounter = 0
        lastCounter = 0
        return
    end

    if (itemid == nil) then
        justUsed = false
        retardCounter = 0
        lastCounter = 0
        return
    end

    exports['FIXDEV-taskbar']:taskbarDisableInventory(true)
    SetTimeout(1500, function()
        exports['FIXDEV-taskbar']:taskbarDisableInventory(false)
    end)

    if itemid == "-1518444656" then
        if tonumber(ItemInfo.quality) > 0 then
              local katanaInfo = json.decode(ItemInfo.information)
              katanaInfo.componentVariant = "1"
              local hiddenKeys = katanaInfo._hideKeys or {}
              hiddenKeys[#hiddenKeys + 1] = "componentVariant"
              katanaInfo._hideKeys = hiddenKeys
              TriggerEvent("equipWeaponID","1649403952",json.encode(katanaInfo),ItemInfo.id)
              Citizen.CreateThread(function()
                while GetSelectedPedWeapon(PlayerPedId()) ~= 1649403952 do
                    Wait(100)
                end
                GiveWeaponComponentToPed(PlayerPedId(), 1649403952, 0xF605986F )
                GiveWeaponComponentToPed(PlayerPedId(), 1649403952, 0xCDCEC991 )
                GiveWeaponComponentToPed(PlayerPedId(), 1649403952, 0xF07EECC4 )
                GiveWeaponComponentToPed(PlayerPedId(), 1649403952, 0xA3BCB36E )
              end)
        end
        justUsed = false
        retardCounter = 0
        lastCounter = 0
        return
    end

    if itemid == "185608774" then
        if tonumber(ItemInfo.quality) > 0 then
              local katanaInfo = json.decode(ItemInfo.information)
              katanaInfo.componentVariant = "1"
              local hiddenKeys = katanaInfo._hideKeys or {}
              hiddenKeys[#hiddenKeys + 1] = "componentVariant"
              katanaInfo._hideKeys = hiddenKeys
              TriggerEvent("equipWeaponID","171789620",json.encode(katanaInfo),ItemInfo.id)
              Citizen.CreateThread(function()
                while GetSelectedPedWeapon(PlayerPedId()) ~= 171789620 do
                    Wait(10)
                end
                GiveWeaponComponentToPed(PlayerPedId(), 171789620, 0xE2EB1958 )
                GiveWeaponComponentToPed(PlayerPedId(), 171789620, 0xB7B26BA9 )
                GiveWeaponComponentToPed(PlayerPedId(), 171789620, 0x993DB2BE )
                GiveWeaponComponentToPed(PlayerPedId(), 171789620, 0x41065670 )
                SetPedWeaponTintIndex(PlayerPedId(), 171789620, katanaInfo.weaponTint)
              end)
        end
        justUsed = false
        retardCounter = 0
        lastCounter = 0
        return
    end

    if itemid == "784503678" then
        if tonumber(ItemInfo.quality) > 0 then
            local karambitInfo = json.decode(ItemInfo.information)
            karambitInfo.componentVariant = "1"
            local hiddenKeys = karambitInfo._hideKeys or {}
            hiddenKeys[#hiddenKeys + 1] = "componentVariant"
            karambitInfo._hideKeys = hiddenKeys
            TriggerEvent("equipWeaponID","-1834847097",json.encode(karambitInfo),ItemInfo.id)
            Citizen.CreateThread(function()
                while GetSelectedPedWeapon(PlayerPedId()) ~= -1834847097 do
                    Wait(100)
                end
                GiveWeaponComponentToPed(PlayerPedId(), -1834847097, 0x47CF44AC)
                SetPedWeaponTintIndex(PlayerPedId(), -1834847097, karambitInfo.weaponTint)
            end)
        end
        justUsed = false
        retardCounter = 0
        lastCounter = 0
        return
    end

    if (isWeapon) then
        if tonumber(ItemInfo.quality) > 0 then
            TriggerEvent("equipWeaponID",itemid,ItemInfo.information,ItemInfo.id)
        end
        justUsed = false
        retardCounter = 0
        lastCounter = 0
        Wait(1500)
        TriggerEvent("AttachWeapons")
        return
    end

    if itemid == "rubberslugpd" then
        if tonumber(ItemInfo.quality) > 0 then
            TriggerEvent("equipWeaponID","218362403",ItemInfo.information,ItemInfo.id)
        end
        justUsed = false
        retardCounter = 0
        lastCounter = 0
        Wait(1500)
        TriggerEvent("AttachWeapons")
        return
    end

    if itemid == "smokegrenadeswat" or itemid == "smokegrenadenpa" then
      if tonumber(ItemInfo.quality) > 0 then
          TriggerEvent("equipWeaponID",-37975472,ItemInfo.information,ItemInfo.id, itemid)
      end
      justUsed = false
      retardCounter = 0
      lastCounter = 0
      return
    end

    if itemid == "cursedkatanaweapon" then
        if GetEntityModel(PlayerPedId()) == `Mr_kebun` then
          if tonumber(ItemInfo.quality) > 0 then
              if not isKatanaEquipped then
                isKatanaEquipped = true
                Citizen.CreateThread(function()
                    Citizen.Wait(1000)
                    TriggerServerEvent("FIXDEV-katana:cursedKatanaEquip", GetEntityCoords(PlayerPedId()))
                    TriggerEvent("FIXDEV-katana:cursedKatanaEquipC")
                end)
              else
                isKatanaEquipped = false
              end
              local katanaInfo = json.decode(ItemInfo.information)
              katanaInfo.componentVariant = "3"
              local hiddenKeys = katanaInfo._hideKeys or {}
              hiddenKeys[#hiddenKeys + 1] = "componentVariant"
              katanaInfo._hideKeys = hiddenKeys
              TriggerEvent("equipWeaponID","1692590063",json.encode(katanaInfo),ItemInfo.id)
          end
        else
          TriggerEvent("DoLongHudText", "You don't feel comfortable touching this.", 2)
        end
        justUsed = false
        retardCounter = 0
        lastCounter = 0
        return
    end

    if itemid == "talonweapon" then
        if GetEntityModel(PlayerPedId()) == `ig_buddha` then
          if tonumber(ItemInfo.quality) > 0 then
              local katanaInfo = json.decode(ItemInfo.information)
              katanaInfo.componentVariant = "5"
              local hiddenKeys = katanaInfo._hideKeys or {}
              hiddenKeys[#hiddenKeys + 1] = "componentVariant"
              katanaInfo._hideKeys = hiddenKeys
              TriggerEvent("equipWeaponID","1692590063",json.encode(katanaInfo),ItemInfo.id)
          end
        else
          TriggerEvent("DoLongHudText", 'You hear a voice in your head: You are not Shadow?', 2)
        end
        justUsed = false
        retardCounter = 0
        lastCounter = 0
        return
    end

    if itemid == "knuckle_chain" then
        if tonumber(ItemInfo.quality) > 0 then
              local katanaInfo = json.decode(ItemInfo.information)
              katanaInfo.componentVariant = "2"
              local hiddenKeys = katanaInfo._hideKeys or {}
              hiddenKeys[#hiddenKeys + 1] = "componentVariant"
              katanaInfo._hideKeys = hiddenKeys
              TriggerEvent("equipWeaponID","3638508604",json.encode(katanaInfo),ItemInfo.id)
        end
        justUsed = false
        retardCounter = 0
        lastCounter = 0
        return
    end

    if itemid == "gepard" then
        if tonumber(ItemInfo.quality) > 0 then
              local katanaInfo = json.decode(ItemInfo.information)
              katanaInfo.componentVariant = "1"
              local hiddenKeys = katanaInfo._hideKeys or {}
              hiddenKeys[#hiddenKeys + 1] = "componentVariant"
              katanaInfo._hideKeys = hiddenKeys
              TriggerEvent("equipWeaponID","1649403952",json.encode(katanaInfo),ItemInfo.id)
              Citizen.CreateThread(function()
                while GetSelectedPedWeapon(PlayerPedId()) ~= 1649403952 do
                    Wait(100)
                end
                GiveWeaponComponentToPed(PlayerPedId(), 1649403952, 0xF605986F )
                GiveWeaponComponentToPed(PlayerPedId(), 1649403952, 0xCDCEC991 )
                GiveWeaponComponentToPed(PlayerPedId(), 1649403952, 0xF07EECC4 )
                GiveWeaponComponentToPed(PlayerPedId(), 1649403952, 0xA3BCB36E )
              end)
        end
        justUsed = false
        retardCounter = 0
        lastCounter = 0
        return
    end

    if itemid == "gavel" then
        if tonumber(ItemInfo.quality) > 0 then
              local katanaInfo = json.decode(ItemInfo.information)
              katanaInfo.componentVariant = "1"
              local hiddenKeys = katanaInfo._hideKeys or {}
              hiddenKeys[#hiddenKeys + 1] = "componentVariant"
              katanaInfo._hideKeys = hiddenKeys
              TriggerEvent("equipWeaponID","1317494643",json.encode(katanaInfo),ItemInfo.id)
        end
        justUsed = false
        retardCounter = 0
        lastCounter = 0
        return
    end

    if itemid == "buddhamedalion" then
        buddhaMedalion()
    end

    if stolenItems[itemid] and exports["FIXDEV-npcs"]:isCloseToPawnPed() then
        print("You should do stuff")
        justUsed = false
        retardCounter = 0
        lastCounter = 0
        return
    end


    TriggerEvent("hud-display-item",itemid,"Used")

    Wait(800)

    local playerVeh = GetVehiclePedIsIn(player, false)

    if (not IsPedInAnyVehicle(player)) then
        if (itemid == "Suitcase") then
            TriggerEvent('attach:suitcase')
        end

        if (itemid == "Boombox") then
                TriggerEvent('attach:boombox')
        end
        if (itemid == "Box") then
            if not boxAttached then
                TriggerEvent('attach:box')
                boxAttached = true
            else
                TriggerEvent("animation:carry", "none")
                boxAttached = false
            end
        end
        if (itemid == "DuffelBag") then
          TriggerEvent('attach:blackDuffelBag')
        end
        if (itemid == "MedicalBag") then
          TriggerEvent('attach:medicalBag')
        end
        if (itemid == "SecurityCase") then
          TriggerEvent('attach:securityCase')
        end
        if (itemid == "Toolbox") then
          TriggerEvent('attach:toolbox')
        end
        if itemid == "wheelchair" then
            if not DoesEntityExist(wheelChair) then
                local wheelChairModel = `npwheelchair`
                RequestModel(wheelChairModel)
                while not HasModelLoaded(wheelChairModel) do
                    Citizen.Wait(0)
                end
                wheelChair = CreateVehicle(wheelChairModel, GetEntityCoords(PlayerPedId()), GetEntityHeading(PlayerPedId()), true, false)
                SetVehicleOnGroundProperly(wheelChair)
                SetVehicleNumberPlateText(wheelChair, "PILLBOX".. math.random(9))
                SetPedIntoVehicle(PlayerPedId(), wheelChair, -1)
                SetModelAsNoLongerNeeded(wheelChairModel)
                local wheelChairPlate = GetVehicleNumberPlateText(wheelChair)
                TriggerServerEvent('garages:addJobPlate', wheelChairPlate)
                TriggerEvent("keys:addNew", wheelChair, wheelChairPlate)
            elseif DoesEntityExist(wheelChair) and #(GetEntityCoords(wheelChair) - GetEntityCoords(PlayerPedId())) < 3.0 and GetPedInVehicleSeat(wheelChair,-1) == 0 then
                Sync.DeleteVehicle(wheelChair)
                wheelChair = nil
            else
                TriggerEvent("DoLongHudText","Too far away from the wheelchair or someon is sitting in it !",1)
            end
        end
    end

    local remove = false
    local removeId = nil
    local itemreturn = false
    local drugitem = false
    local fooditem = false
    local drinkitem = false
    local healitem = false

    if ItemCallbacks[itemid] and type(ItemCallbacks[itemid]) == 'function' then
        local options = { remove = false }

        ItemCallbacks[itemid](itemid, itemInfo, options)

        -- This is pepega af but I can't be arsed right now to make something that makes more sense
        if options.remove then
            remove = true
        end
    end

    if (itemid == "spellbook-flame" and currentVehicle == 0) then
        TriggerEvent("fx:spellcast","FireRay")
    end

    if (itemid == "spellbook-roar" and currentVehicle == 0) then
        TriggerEvent("fx:spellcast","FireRoar")
    end

    if (itemid == "spellbook-heal" and currentVehicle == 0) then
        TriggerEvent("fx:spellcast","AOEheal")
    end
    if (itemid == "spellbook-slow" and currentVehicle == 0) then
        TriggerEvent("fx:spellcast","AOEslow")
    end
    if (itemid == "spellbook-shock" and currentVehicle == 0) then
        TriggerEvent("fx:spellcast","AOEshock")
    end
    if (itemid == "spellbook-test" and currentVehicle == 0) then
        TriggerEvent("fx:spellcast","AOEtest")
    end
    if (itemid == "spellbook-blink" and currentVehicle == 0) then
        TriggerEvent("fx:spellcast","blink")
    end
    if (itemid == "spellbook-speed" and currentVehicle == 0) then
        TriggerEvent("fx:spellcast","AOEspeed")
    end
    if (itemid == "spellbook-buff" and currentVehicle == 0) then
        TriggerEvent("fx:spellcast","AOEbuff")
    end
    if (itemid == "spellbook-mana" and currentVehicle == 0) then
        remove = true
        TriggerEvent("fx:spellmana")
    end

    if (itemid == "spellbook-poop" and currentVehicle == 0) then
        TriggerEvent("fx:spellcast","AOEpoop")
    end

    if (itemid == "spikes" and currentVehicle == 0) then
        TriggerEvent("c_setSpike")
        remove = true
    end
    if (itemid == "francisdice" and currentVehicle == 0) then
        TriggerEvent("francisroll")
    end




    if (itemid == "pdbadge") then
        RPC.execute("FIXDEV-gov:police:showBadge", json.decode(ItemInfo.information))
    end

    if (itemid == "joint" or itemid == "weed5oz" or itemid == "weedq" or itemid == "beer" or itemid == "vodka" or itemid == "whiskey" or itemid == "lsdtab" or itemid == 'winemilkshake' or itemid == 'honestwineglass' or itemid == "customjointitem") then
        drugitem = true
    end

    if (itemid == "burnerphone") then
        openBurner({
            source_number = json.decode(ItemInfo.information).Number,
            isOwner = true
        })
    end

    if (itemid == "electronickit" or itemid == "lockpick") then
      TriggerServerEvent("robbery:triggerItemUsedServer",itemid)

    end
    if (itemid == "locksystem") then
      TriggerServerEvent("robbery:triggerItemUsedServer",itemid)
    end

    if (itemid == "thermite") then
      TriggerServerEvent("robbery:triggerItemUsedServer",itemid)
    end

    if(itemid == "evidencebag") then
        TriggerEvent("evidence:startCollect", itemid, slot)
        local itemInfo = GetItemInfo(slot)
        local data = itemInfo.information
        if data == '{}' then
            TriggerEvent("DoLongHudText","Start collecting evidence!",1)
            TriggerEvent("inventory:updateItem", itemid, slot, '{"used": "true"}')
            --
        else
            local dataDecoded = json.decode(data)
            if(dataDecoded.used) then
                print('YOURE ALREADY COLLECTING EVIDENCE YOU STUPID FUCK')
            end
        end
    end

    if (itemid == "lsdtab" or itemid == "badlsdtab") then
        TriggerEvent("animation:PlayAnimation","pill")
        local finished = exports["FIXDEV-taskbar"]:taskBar(3000,"Placing LSD Strip on 👅",false,false,playerVeh)
        if ( finished == 100 and hasEnoughOfItem(itemid, 1, false) ) then
            TriggerEvent("Evidence:StateSet",2,1200)
            TriggerEvent("Evidence:StateSet",24,1200)
            TriggerEvent("fx:run", "lsd", 180, -1, (itemid == "badlsdtab" and true or false))
            remove = true
        end
    end

    if (itemid == "matrixredpill") then
        TriggerEvent("animation:PlayAnimation","pill")
        local finished = exports["FIXDEV-taskbar"]:taskBar(3000,"Taking the Red Pill",false,false,playerVeh)
        if ( finished == 100 and hasEnoughOfItem(itemid, 1, false) ) then
            TriggerEvent("Evidence:StateSet",2,1200)
            TriggerEvent("Evidence:StateSet",24,1200)
            TriggerEvent("fx:run", "lsd", 180, -1, false)
            remove = true
        end
    end
    if (itemid == "matrixbluepill") then
        TriggerEvent("animation:PlayAnimation","pill")
        remove = true
        Citizen.CreateThread(function()
            TriggerEvent('ragdoll:setPoisonState', true)
            Citizen.Wait(2500)
            exports['ragdoll']:SetPlayerHealth(0)
            Citizen.Wait(2500)
            TriggerEvent('ragdoll:setPoisonState', false)
        end)
    end

    if (itemid == "decryptersess" or itemid == "decrypterfv2" or itemid == "decrypterenzo") then
      if (#(GetEntityCoords(player) - vector3( 1275.49, -1710.39, 54.78)) < 3.0) then
          local finished = exports["FIXDEV-taskbar"]:taskBar(25000,"Decrypting Data",false,false,playerVeh)
          if ( finished == 100 and hasEnoughOfItem(itemid, 1, false) ) then
            TriggerEvent("phone:crypto:use", 1, 3, "robbery:decrypt", true)
          end
      end

      if #(GetEntityCoords(player) - vector3( 2328.94, 2571.4, 46.71)) < 3.0 then
          local finished = exports["FIXDEV-taskbar"]:taskBar(25000,"Decrypting Data",false,false,playerVeh)
          if ( finished == 100 and hasEnoughOfItem(itemid, 1, false) ) then
            TriggerEvent("phone:crypto:use", 1, 3, "robbery:decrypt2", true)
          end
      end

      if #(GetEntityCoords(player) - vector3( 1208.73,-3115.29, 5.55)) < 3.0 then
          local finished = exports["FIXDEV-taskbar"]:taskBar(25000,"Decrypting Data",false,false,playerVeh)
          if ( finished == 100 and hasEnoughOfItem(itemid, 1, false) ) then
            TriggerEvent("phone:crypto:use", 1, 3,"robbery:decrypt3", true)
          end
      end

    end

    if (itemid == "pix1") then
      if (#(GetEntityCoords(player) - vector3( 1275.49, -1710.39, 54.78)) < 3.0) then
          local finished = exports["FIXDEV-taskbar"]:taskBar(25000,"Decrypting Data",false,false,playerVeh)
          if ( finished == 100 and hasEnoughOfItem(itemid, 1, false) ) then
            TriggerEvent("phone:crypto:add", 1, math.random(1,2))
            remove = true
          end
      end
    end

    if (itemid == "pix2") then
      if (#(GetEntityCoords(player) - vector3( 1275.49, -1710.39, 54.78)) < 3.0) then
          local finished = exports["FIXDEV-taskbar"]:taskBar(25000,"Decrypting Data",false,false,playerVeh)
          if ( finished == 100 and hasEnoughOfItem(itemid, 1, false) ) then
            TriggerEvent("phone:crypto:add", 1, math.random(5,12))
            remove = true
          end
      end
    end


    if (itemid == "femaleseed") then
     --  TriggerEvent("Evidence:StateSet",4,1600)
      -- TriggerEvent("weed:startcropInsideCheck","female")

    end

    if (itemid == "maleseed") then
      --  TriggerEvent("Evidence:StateSet",4,1600)
      --  TriggerEvent("weed:startcropInsideCheck","male")

    end

    if (itemid == "weedoz") then

      local finished = exports["FIXDEV-taskbar"]:taskBar(5000,"Packing Q Bags",false,false,playerVeh)
        if ( finished == 100 and hasEnoughOfItem(itemid, 1, false) ) then
            CreateCraftOption("weedq", 40, true)
        end

    end

    -- if ( itemid == "smallbud" and hasEnoughOfItem("qualityscales",1,false) ) then
    --     local finished = exports["FIXDEV-taskbar"]:taskBar(1000,"Packing Joint",false,false,playerVeh)
    --     if ( finished == 100 and hasEnoughOfItem(itemid, 1, false) ) then
    --         CreateCraftOption("joint2", 80, true)
    --     end
    -- end

    -- if (itemid == "weedq") then
    --     local finished = exports["FIXDEV-taskbar"]:taskBar(1000,"Rolling Joints",false,false,playerVeh)
    --     if ( finished == 100 and hasEnoughOfItem(itemid, 1, false) ) then
    --         CreateCraftOption("joint", 80, true)
    --     end
    -- end

    if (itemid == "lighter") then
        TriggerEvent("animation:PlayAnimation","lighter")
          local finished = exports["FIXDEV-taskbar"]:taskBar(2000,"Starting Fire",false,false,playerVeh)
        if ( finished == 100 and hasEnoughOfItem(itemid, 1, false) ) then

        end
    end

    if (itemid == "joint" or itemid == "joint2" or itemid == "customjointitem") then
        local finished = exports["FIXDEV-taskbar"]:taskBar(2000,"Smoking Joint",false,false,playerVeh)
        if ( finished == 100 and hasEnoughOfItem(itemid, 1, false) ) then

            Wait(200)

            if math.random(100) == 69 then
                TriggerEvent("player:receiveItem","femaleseed",1)
            end

            if math.random(600) == 69 then
                TriggerEvent("player:receiveItem","maleseed",1)
            end

            if itemid == "customjointitem" then
              processStressBlock()
            end

            local itemInfo = json.decode(passedItemInfo)
            local quality = itemInfo.quality and itemInfo.quality or 75
            local effectiveness = itemid == "customjointitem" and 1.6 or (1.0 * (quality / 100))

            TriggerEvent("animation:PlayAnimation","weed")
            TriggerEvent("Evidence:StateSet",3,600)
            TriggerEvent("Evidence:StateSet",4,600)
            TriggerEvent(
              "weed",
              5000,
              "WORLD_HUMAN_SMOKING_POT",
              effectiveness
            )
            remove = true
        end
    end

    if (
         itemid == "vodka"
      or itemid == "beer"
      or itemid == "whiskey"
      or itemid == "absinthe"
      or itemid == "drink1"
      or itemid == "drink2"
      or itemid == "drink3"
      or itemid == "drink4"
      or itemid == "drink5"
      or itemid == "drink6"
      or itemid == "drink7"
      or itemid == "drink8"
      or itemid == "drink9"
      or itemid == "drink10"
      or itemid == "shot1"
      or itemid == "shot2"
      or itemid == "shot3"
      or itemid == "shot4"
      or itemid == "shot5"
      or itemid == "shot6"
      or itemid == "winemilkshake"
      or itemid == "shot7"
      or itemid == "shot8"
      or itemid == "shot9"
      or itemid == "shot10"
      or itemid == "moonshine"
      or itemid == "poisonedcocktail"
      or itemid == "mead_watermelon"
      or itemid == "mead_strawberry"
      or itemid == "mead_potato"
      or itemid == "mead_peach"
      or itemid == "mead_orange"
      or itemid == "mead_lime"
      or itemid == "mead_lemon"
      or itemid == "mead_kiwi"
      or itemid == "mead_grape"
      or itemid == "mead_coconut"
      or itemid == "mead_cherry"
      or itemid == "mead_banana"
      or itemid == "mead_apple"
    ) then
        local success = itemid == "winemilkshake" and true or (AttachPropAndPlayAnimation("amb@world_human_drinking@coffee@male@idle_a", "idle_c", 49,6000,"Drink","changethirst",true,itemid,playerVeh))
        if success then
            TriggerEvent("Evidence:StateSet", 8, 600)
            local alcoholStrength = 0.5
            if itemid == "vodka" or itemid == "whiskey" then alcoholStrength = 1.0 end
            if itemid == "absinthe" then alcoholStrength = 2.5 end
            if itemid == "moonshine" then
                alcoholStrength = 4.0
            end
            if itemid == "drink1" or itemid == "drink2" or itemid == "drink3" or itemid == "drink4" or itemid == "drink5" or itemid == "drink6"
            or itemid == "drink7" or itemid == "drink8" or itemid == "drink9" or itemid == "drink10" then
                alcoholStrength = 0.6
            end
            if itemid == "shot1" or itemid == "shot2" or itemid == "shot3" or itemid == "shot4" or itemid == "shot5" or itemid == "shot6"
            or itemid == "shot7" or itemid == "shot8" or itemid == "shot9" or itemid == "shot10" then
                alcoholStrength = 0.8
            end
            if itemid == "mead_watermelon"
            or itemid == "mead_strawberry"
            or itemid == "mead_potato"
            or itemid == "mead_peach"
            or itemid == "mead_orange"
            or itemid == "mead_lime"
            or itemid == "mead_lemon"
            or itemid == "mead_kiwi"
            or itemid == "mead_grape"
            or itemid == "mead_coconut"
            or itemid == "mead_cherry"
            or itemid == "mead_banana"
            or itemid == "mead_apple" then
                alcoholStrength = 1.0
                TriggerEvent("inv:slushy")
                if math.random(1,10) <= 3 then
                    TriggerEvent( "player:receiveItem","bottle_cap",1)
                    if math.random() < 0.30 then
                        TriggerServerEvent("fx:puke")
                    end
                end
            end
            TriggerEvent("fx:run", "alcohol", 180, alcoholStrength, -1, (itemid == "absinthe" and true or false))
        end
    end

    if (itemid == "coffee" or itemid == "frappuccino" or itemid == "latte" or itemid == "customcoffeeitem") then
        AttachPropAndPlayAnimation(
          "amb@world_human_drinking@coffee@male@idle_a",
          "idle_c",
          49,
          6000,
          "Drink",
          "coffee:drink",
          not customMarketItems[itemid],
          itemid == "customcoffeeitem" and "coffee" or itemid,
          playerVeh
        )
        remove = customMarketItems[itemid]
    end

    if (itemid == "bagelcake") then
        AttachPropAndPlayAnimation("mp_player_inteat@burger", "mp_player_int_eat_burger", 49,6000, "Eating", "", true, itemid, playerVeh)
        TriggerServerEvent("fx:puke")
    end

    if (itemid == "fishtaco") then
        AttachPropAndPlayAnimation("mp_player_inteat@burger", "mp_player_int_eat_burger", 49,6000,"Eating","food:FishTaco",true,itemid,playerVeh)
    end

    if (itemid == "taco" or itemid == "burrito") then
        AttachPropAndPlayAnimation("mp_player_inteat@burger", "mp_player_int_eat_burger", 49,6000,"Eating","food:Taco",true,itemid,playerVeh)
    end

    if (itemid == "churro" or itemid == "hotdog" or itemid == "chocobar") then
        TaskItem("mp_player_inteat@burger", "mp_player_int_eat_burger", 49,6000,"Eating","food:Condiment",true,itemid,playerVeh)
    end

    if (itemid == "greencow" or itemid == "franksmonster") then
        local fmMsg = itemid == "greencow" and "Drink" or "Shotgunning"
        local fmTimer = itemid == "greencow" and 6000 or 2000
        AttachPropAndPlayAnimation("amb@world_human_drinking@coffee@male@idle_a", "idle_c", 49,fmTimer,fmMsg,"food:Condiment",true,itemid,playerVeh)
    end

    if (itemid == "donut" or itemid == "applepie" or itemid == "eggsbacon" or itemid == "cookie" or itemid == "muffin") then
        AttachPropAndPlayAnimation("mp_player_inteat@burger", "mp_player_int_eat_burger", 49,6000,"Eating","food:Condiment",true,itemid,playerVeh)
    end

    if (itemid == "icecream" or itemid == "mshake" or itemid == "winemilkshake") then
        TaskItem("mp_player_inteat@burger", "mp_player_int_eat_burger", 49,6000,"Eating","food:IceCream",true,itemid,playerVeh)
    end

    if (itemid == "advlockpick") then

        local myJob = exports["isPed"]:isPed("myJob")
        if myJob ~= "news" then
            TriggerEvent("inv:lockPick", false, inventoryName, slot, "advlockpick")
        else
            TriggerEvent("DoLongHudText","Nice news reporting, you shit lord idiot.")
        end

    end


    if (itemid == "Gruppe6Card") then

        local coordA = GetEntityCoords(GetPlayerPed(-1), 1)
        local coordB = GetOffsetFromEntityInWorldCoords(GetPlayerPed(-1), 0.0, 100.0, 0.0)
        local countpolice = exports["isPed"]:isPed("countpolice")
        local targetVehicle = getVehicleInDirection(coordA, coordB)
        if targetVehicle ~= 0 and GetHashKey("stockade") == GetEntityModel(targetVehicle) and countpolice > 2 then
            local entityCreatePoint = GetOffsetFromEntityInWorldCoords(targetVehicle, 0.0, -4.0, 0.0)
            local coords = GetEntityCoords(GetPlayerPed(-1))
            local aDist = GetDistanceBetweenCoords(coords["x"], coords["y"],coords["z"], entityCreatePoint["x"], entityCreatePoint["y"],entityCreatePoint["z"])
            local cityCenter = vector3(-204.92, -1010.13, 29.55) -- alta street train station
            local timeToOpen = 45000
            local distToCityCenter = #(coords - cityCenter)
            if distToCityCenter > 1000 then
                local multi = math.floor(distToCityCenter / 1000)
                timeToOpen = timeToOpen + (30000 * multi)
            end
            if aDist < 2.0 then
                TriggerEvent("alert:noPedCheck", "banktruck")
                local finished = exports["FIXDEV-taskbar"]:taskBar(timeToOpen,"Unlocking Vehicle",false,false,playerVeh)
                if ( finished == 100 and hasEnoughOfItem(itemid, 1, false) ) then
                    remove = true
                    -- no longer listened for
                    TriggerEvent("sec:AttemptHeist", targetVehicle)
                else
                    TriggerEvent("evidence:bleeding",false)
                end

            else
                TriggerEvent("DoLongHudText","You need to do this from behind the vehicle.")
            end
        end

    end


    -- TODO: Unused?
    -- if (itemid == "weed12oz") then
    --     TriggerEvent("inv:weedPacking")
    --     remove = true
    -- end

    if (itemid == "heavyammo") then
        local finished = exports["FIXDEV-taskbar"]:taskBar(5000,"Reloading",false,false,playerVeh)
        if ( finished == 100 and hasEnoughOfItem(itemid, 1, false) ) then
            TriggerEvent("actionbar:ammo",1788949567,50,true)
            remove = true
        end
    end

    if (itemid == "pistolammo") then
        local finished = exports["FIXDEV-taskbar"]:taskBar(2500,"Reloading",false,false,playerVeh)
        if ( finished == 100 and hasEnoughOfItem(itemid, 1, false) ) then
            TriggerEvent("actionbar:ammo",1950175060,50,true)
            remove = true
        end
    end

    if (itemid == "pistolammoPD") then
        local finished = exports["FIXDEV-taskbar"]:taskBar(2500,"Reloading",false,false,playerVeh)
        if ( finished == 100 and hasEnoughOfItem(itemid, 1, false) ) then
            TriggerEvent("actionbar:ammo",1950175060,50,true)
            remove = true
        end
    end

    if (itemid == "rifleammoPD") then
        local finished = exports["FIXDEV-taskbar"]:taskBar(5000,"Reloading",false,false,playerVeh)
        if ( finished == 100 and hasEnoughOfItem(itemid, 1, false) ) then
            TriggerEvent("actionbar:ammo",218444191,50,true)
            remove = true
        end
    end

    if (itemid == "shotgunammoPD") then
        local finished = exports["FIXDEV-taskbar"]:taskBar(5000,"Reloading",false,false,playerVeh)
        if ( finished == 100 and hasEnoughOfItem(itemid, 1, false) ) then
            TriggerEvent("actionbar:ammo",218444191,50,true)
            remove = true
        end
    end

    if (itemid == "subammoPD") then
        local finished = exports["FIXDEV-taskbar"]:taskBar(5000,"Reloading",false,false,playerVeh)
        if ( finished == 100 and hasEnoughOfItem(itemid, 1, false) ) then
            TriggerEvent("actionbar:ammo",1820140472,50,true)
            remove = true
        end
    end

    if (itemid == "flamethrowerammo") then
        local finished = exports["FIXDEV-taskbar"]:taskBar(5000,"Reloading flamethrower",false,false,playerVeh)
        if ( finished == 100 and hasEnoughOfItem(itemid, 1, false) ) then
            TriggerEvent("actionbar:ammo",1970280428,15000,true)
            remove = true
        end
    end

    if (itemid == "rifleammo") then
        local finished = exports["FIXDEV-taskbar"]:taskBar(5000,"Reloading",false,false,playerVeh)
        if ( finished == 100 and hasEnoughOfItem(itemid, 1, false) ) then
            TriggerEvent("actionbar:ammo",218444191,50,true)
            remove = true
        end
    end

    if (itemid == "sniperammo") then
        local finished = exports["FIXDEV-taskbar"]:taskBar(5000,"Reloading",false,false,playerVeh)
        if ( finished == 100 and hasEnoughOfItem(itemid, 1, false) ) then
            TriggerEvent("actionbar:ammo",1285032059,25,true)
            remove = true
        end
    end

    if (itemid == "huntingammo") then
        local finished = exports["FIXDEV-taskbar"]:taskBar(10000,"Reloading",false,false,playerVeh)
        if ( finished == 100 and hasEnoughOfItem(itemid, 1, false) ) then
            TriggerEvent("actionbar:ammo",1285032059,10,true)
            remove = true
        end
    end
    if (itemid == "widowmakerammo") then
        local finished = exports["FIXDEV-taskbar"]:taskBar(10000,"Reloading",false,false,playerVeh)
        if ( finished == 100 and hasEnoughOfItem(itemid, 1, false) ) then
            TriggerEvent("actionbar:ammo", -1614428030, 15000,true)
            remove = true
        end
    end
    if (itemid == "minigunammo") then
        local finished = exports["FIXDEV-taskbar"]:taskBar(10000,"Reloading",false,false,playerVeh)
        if ( finished == 100 and hasEnoughOfItem(itemid, 1, false) ) then
            TriggerEvent("actionbar:ammo", -1614428030, 15000,true)
            remove = true
        end
    end
    if (itemid == "rpgammo") then
        local finished = exports["FIXDEV-taskbar"]:taskBar(25000,"Reloading",false,false,playerVeh)
        if ( finished == 100 and hasEnoughOfItem(itemid, 1, false) ) then
            TriggerEvent("actionbar:ammo",1742569970,1,true)
            remove = true
        end
    end
    if (itemid == "homingammo") then
        local finished = exports["FIXDEV-taskbar"]:taskBar(25000,"Reloading",false,false,playerVeh)
        if ( finished == 100 and hasEnoughOfItem(itemid, 1, false) ) then
            TriggerEvent("actionbar:ammo",-1726673363,1,true)
            remove = true
        end
    end


    if (itemid == "shotgunammo") then
        local finished = exports["FIXDEV-taskbar"]:taskBar(5000,"Reloading",false,false,playerVeh)
        if ( finished == 100 and hasEnoughOfItem(itemid, 1, false) ) then
            TriggerEvent("actionbar:ammo",-1878508229,50,true)
            remove = true
        end
    end

    if (itemid == "subammo") then
        local finished = exports["FIXDEV-taskbar"]:taskBar(5000,"Reloading",false,false,playerVeh)
        if ( finished == 100 and hasEnoughOfItem(itemid, 1, false) ) then
            TriggerEvent("actionbar:ammo",1820140472,50,true)
            remove = true
        end
    end

    if (itemid == "lmgammo") then
        local finished = exports["FIXDEV-taskbar"]:taskBar(5000,"Reloading",false,false,playerVeh)
        if ( finished == 100 and hasEnoughOfItem(itemid, 1, false) ) then
            TriggerEvent("actionbar:ammo",1788949567,100,true)
            remove = true
        end
    end

    if (itemid == "nails") then
        local finished = exports["FIXDEV-taskbar"]:taskBar(5000,"Reloading",false,false,playerVeh)
        if ( finished == 100 and hasEnoughOfItem(itemid, 1, false) ) then
            TriggerEvent("actionbar:ammo",965225813,50,true)
            remove = true
        end
    end

    if (itemid == "paintballs") then
        local finished = exports["FIXDEV-taskbar"]:taskBar(5000,"Reloading",false,false,playerVeh)
        if ( finished == 100 and hasEnoughOfItem(itemid, 1, false) ) then
            TriggerEvent("actionbar:ammo",1916856719,100,true)
            remove = true
        end
    end

    if (itemid == "airsoftammo") then
        local finished = exports["FIXDEV-taskbar"]:taskBar(5000,"Reloading",false,false,playerVeh)
        if ( finished == 100 and hasEnoughOfItem(itemid, 1, false) ) then
            TriggerEvent("actionbar:ammo",-100695554,250,true)
            remove = true
        end
    end

    if (itemid == "rubberslugs") then
        local finished = exports["FIXDEV-taskbar"]:taskBar(5000,"Reloading",false,false,playerVeh)
        if ( finished == 100 and hasEnoughOfItem(itemid, 1, false) ) then
            TriggerEvent("actionbar:ammo",1517835987,10,true)
            remove = true
        end
    end

    if (itemid == "taserammo") then
        local finished = exports["FIXDEV-taskbar"]:taskBar(2000,"Reloading",false,false,playerVeh)
        if ( finished == 100 and hasEnoughOfItem(itemid, 1, false) ) then
            TriggerEvent("actionbar:ammo",-1575030772,3,true)
            remove = true
        end
    end

    if (itemid == "empammo") then
        local finished = exports["FIXDEV-taskbar"]:taskBar(30000,"Recharging EMP",false,false,playerVeh)
        if ( finished == 100 and hasEnoughOfItem(itemid, 1, false) ) then
            TriggerEvent("actionbar:ammo",2034517757,2,true)
            remove = true
        end
    end

    if (itemid == "armor" or itemid == "pdarmor") then
        local finished = exports["FIXDEV-taskbar"]:taskBar(5000,"Armor",true,false,playerVeh)
        if ( finished == 100 and hasEnoughOfItem(itemid, 1, false) ) then
            exports['ragdoll']:SetMaxArmor()

            local wasBeatdown = exports["police"]:getBeatmodeDebuff()

            if not wasBeatdown then
                SetPedArmour( player, 60 )
                TriggerEvent("UseBodyArmor")
                remove = true
            else
                TriggerEvent("DoLongHudText","You cannot apply armor because you were beat down.")
            end
        end
    end

    if (itemid == "cbrownie" or itemid == "cgummies") then
        TriggerEvent("animation:PlayAnimation","pill")
        local finished = exports["FIXDEV-taskbar"]:taskBar(3000,"Consuming edibles 😉",false,false,playerVeh)
        if ( finished == 100 and hasEnoughOfItem(itemid, 1, false) ) then
            TriggerEvent("Evidence:StateSet",3,1200)
            TriggerEvent("Evidence:StateSet",7,1200)
            TriggerEvent("fx:run", "weed", 180, -1, false)
            remove = true
        end
    end

    if (itemid == "bodybag") then
        local finished = exports["FIXDEV-taskbar"]:taskBar(10000,"Opening bag",true,false,playerVeh)
        if ( finished == 100 and hasEnoughOfItem(itemid, 1, false) ) then
            remove = true
            TriggerEvent( "player:receiveItem", "humanhead", 1 )
            TriggerEvent( "player:receiveItem", "humantorso", 1 )
            TriggerEvent( "player:receiveItem", "humanarm", 2 )
            TriggerEvent( "player:receiveItem", "humanleg", 2 )
        end
    end

    if (itemid == "bodygarbagebag") then
            local finished = exports["FIXDEV-taskbar"]:taskBar(10000,"Opening trash bag",false,false,playerVeh)
            if ( finished == 100 and hasEnoughOfItem(itemid, 1, false) ) then
                remove = true
                TriggerServerEvent('loot:useItem', itemid)
            end
    end

    if (itemid == "newaccountbox") then
        local finished = exports["FIXDEV-taskbar"]:taskBar(5000,"Opening present",false,false,playerVeh)
        if ( finished == 100 and hasEnoughOfItem(itemid, 1, false) ) then
            remove = true
            TriggerServerEvent('loot:useItem', itemid)
        end
    end

    if (itemid == "foodsupplycrate") then
        TriggerEvent("DoLongHudText","Make sure you have a ton of space in your inventory! 100 or more.",2)
        local finished = exports["FIXDEV-taskbar"]:taskBar(20000,"Opening the crate (ESC to Cancel)",false,false,playerVeh)
        if ( finished == 100 and hasEnoughOfItem(itemid, 1, false) ) then
            remove = true
            TriggerEvent( "player:receiveItem", "heartstopper", 10 )
            TriggerEvent( "player:receiveItem", "moneyshot", 10 )
            TriggerEvent( "player:receiveItem", "bleederburger", 10 )
            TriggerEvent( "player:receiveItem", "fries", 10 )
            TriggerEvent( "player:receiveItem", "cola", 10 )
        end
    end

    if (itemid == "fishingtacklebox") then
        local finished = exports["FIXDEV-taskbar"]:taskBar(5000,"Opening",true,false,playerVeh)
        if ( finished == 100 and hasEnoughOfItem(itemid, 1, false) ) then
            remove = true
            TriggerServerEvent('loot:useItem', itemid)
        end
    end

    if (itemid == "housesafe") then
        if not hasEnoughOfItem("heavydutydrill", 1, false) then
            TriggerEvent("DoLongHudText", "Seems like you need something to get into this...", 2)
        else
            local finished = exports["FIXDEV-taskbar"]:taskBar(30000, "Cracking Safe...", true, false)
            if ( finished == 100 and hasEnoughOfItem(itemid, 1, false) ) then
                remove = true
                TriggerServerEvent('loot:useItem', itemid)
            end
        end

    end

    if (itemid == "fishingchest") then
        local finished = exports["FIXDEV-taskbar"]:taskBar(5000, "Opening Chest", true, false)
        if ( finished == 100 and hasEnoughOfItem(itemid, 1, false) ) then
            remove = true
            TriggerServerEvent('loot:useItem', itemid)
        end
    end

    if (itemid == "repcrate") then
        local finished = exports["FIXDEV-taskbar"]:taskBar(30000, "Opening...", true, false)
        if ( finished == 100 and hasEnoughOfItem(itemid, 1, false) ) then
            remove = true
            TriggerServerEvent('loot:useItem', itemid)
        end
    end

    if (itemid == "babyoil") then
        local finished = exports["FIXDEV-taskbar"]:taskBar(10000,"Applying baby oil to dome",true,false,playerVeh)
        if ( finished == 100 and hasEnoughOfItem(itemid, 1, false) ) then
            remove = true
            TriggerEvent("DoLongHudText","Your dome is now shiny AF!",5)
        end
    end

    if (itemid == "fishinglockbox") then
        local finished = exports["FIXDEV-taskbar"]:taskBar(5000,"Opening",true,false,playerVeh)
        if ( finished == 100 and hasEnoughOfItem(itemid, 1, false) ) then
            --remove = true
            --TriggerServerEvent('loot:useItem', itemid)
            TriggerEvent("DoLongHudText","Add your map thing here DW you fucking fuck fuck",2)
        end
    end

    if (itemid == "organcooler") then
        local finished = exports["FIXDEV-taskbar"]:taskBar(5000,"Opening cooler",true,false,playerVeh)
        if ( finished == 100 and hasEnoughOfItem(itemid, 1, false) ) then
            remove = true
            TriggerEvent( "player:receiveItem", "humanheart", 1 )
            TriggerEvent( "player:receiveItem", "organcooleropen", 1 )
        end
    end

    if itemid == "humanhead" then
        TaskItem("mp_player_inteat@burger", "mp_player_int_eat_burger", 49, 10000, "Eating (ESC to Cancel)", "inv:wellfed", true,itemid,playerVeh,true,"humanskull")
    end

    if (itemid == "humantorso" or itemid == "humanarm" or itemid == "humanhand" or itemid == "humanleg" or itemid == "humanfinger") then
        TaskItem("mp_player_inteat@burger", "mp_player_int_eat_burger", 49, 10000, "Eating (ESC to Cancel)", "inv:wellfed", true,itemid,playerVeh,true,"humanbone")
    end

    if (itemid == "humanear" or itemid == "humanintestines" or itemid == "humanheart" or itemid == "humaneye" or itemid == "humanbrain" or itemid == "humankidney" or itemid == "humanliver" or itemid == "humanlungs" or itemid == "humantongue" or itemid == "humanpancreas") then
        TaskItem("mp_player_inteat@burger", "mp_player_int_eat_burger", 49, 10000, "Eating (ESC to Cancel)", "inv:wellfed", true,itemid)
    end

    if (itemid == "Bankbox") then
        if (hasEnoughOfItem("locksystem",1,false)) then
            local finished = exports["FIXDEV-taskbar"]:taskBar(10000,"Opening bank box.",false,false,playerVeh)
            if ( finished == 100 and hasEnoughOfItem(itemid, 1, false) ) then
                remove = true
                TriggerEvent("inventory:removeItem","locksystem", 1)

                TriggerServerEvent('loot:useItem', itemid)
            end
        else
            TriggerEvent("DoLongHudText","You are missing something to open the box with",2)
        end
    end

    if (itemid == "Securebriefcase") then
        if (hasEnoughOfItem("Bankboxkey",1,false)) then
            local finished = exports["FIXDEV-taskbar"]:taskBar(5000,"Opening briefcase.",false,false,playerVeh)
            if ( finished == 100 and hasEnoughOfItem(itemid, 1, false) ) then
                remove = true
                TriggerEvent("inventory:removeItem","Bankboxkey", 1)

                TriggerServerEvent('loot:useItem', itemid)
            end
        else
            TriggerEvent("DoLongHudText","You are missing something to open the briefcase with",2)
        end
    end

    if (itemid == "Largesupplycrate") then
        if (hasEnoughOfItem("2227010557",1,false)) then
            local finished = exports["FIXDEV-taskbar"]:taskBar(15000,"Opening supply crate.",false,false,playerVeh)
            if ( finished == 100 and hasEnoughOfItem(itemid, 1, false) ) then
                remove = true
                TriggerEvent("inventory:removeItem","2227010557", 1)

                TriggerServerEvent('loot:useItem', itemid)
            end
        else
            TriggerEvent("DoLongHudText","You are missing something to open the crate with",2)
        end
    end

    if (itemid == "xmasgiftcoal") then
        local finished = exports["FIXDEV-taskbar"]:taskBar(15000, "Opening Gift", false, false, playerVeh)
        if ( finished == 100 and hasEnoughOfItem(itemid, 1, false) ) then
            remove = true
            TriggerServerEvent('loot:useItem', itemid)
        end
    end

    if (itemid == "Smallsupplycrate") then
        if (hasEnoughOfItem("2227010557",1,false)) then
            local finished = exports["FIXDEV-taskbar"]:taskBar(15000,"Opening supply crate.",false,false,playerVeh)
            if ( finished == 100 and hasEnoughOfItem(itemid, 1, false) ) then
                remove = true
                TriggerEvent("inventory:removeItem","2227010557", 1)

                TriggerServerEvent('loot:useItem', itemid)
            end
        else
            TriggerEvent("DoLongHudText","What, are you going to break it open with your hands?",2)
        end
    end

    if (itemid == "Smallsupplycrate2") then
        if (hasEnoughOfItem("2227010557",1,false)) then
            local finished = exports["FIXDEV-taskbar"]:taskBar(15000,"Opening supply crate.",false,false,playerVeh)
            if ( finished == 100 and hasEnoughOfItem(itemid, 1, false) ) then
                remove = true
                TriggerEvent("inventory:removeItem","2227010557", 1)

                TriggerServerEvent('loot:useItem', itemid)
            end
        else
            TriggerEvent("DoLongHudText","What, are you going to break it open with your hands?",2)
        end
    end

    if (itemid == "Mediumsupplycrate") then
        if (hasEnoughOfItem("2227010557",1,false)) then
            local finished = exports["FIXDEV-taskbar"]:taskBar(15000,"Opening supply crate.",false,false,playerVeh)
            if ( finished == 100 and hasEnoughOfItem(itemid, 1, false) ) then
                remove = true
                TriggerEvent("inventory:removeItem","2227010557", 1)

                TriggerServerEvent('loot:useItem', itemid)
            end
        else
            TriggerEvent("DoLongHudText","What, are you going to break it open with your hands?",2)
        end
    end

    if (itemid == "emptyballoon") then
        if (hasEnoughOfItem("nitrous",1,false)) then
            local finished = exports["FIXDEV-taskbar"]:taskBar(5000,"Filling Balloon.",false,false,playerVeh)
            if ( finished == 100 and hasEnoughOfItem(itemid, 1, false) ) then
                remove = true
                TriggerEvent( "player:receiveItem","nosballoon",1)
            end
        else
            TriggerEvent("DoLongHudText","You need a bottle to fill the balloon with.",2)
        end
    end

    if (itemid == "Peecup_empty") then
        if preventspam == 0 then
        Citizen.CreateThread(function()
            preventspam = 1
            TriggerEvent("animation:PlayAnimation","pee")
            --TaskPlayAnim(PlayerPedId(), "misscarsteal2peeing", "peeing_loop", 20.0, -8, -1, 49, 0, false, false, false)
            PeeingID = GetRandomString(12)
            TriggerServerEvent("fx:pee:start", PeeingID)

            local animationplaying = true
            Citizen.CreateThread(function()
                 while animationplaying do
                     if not IsEntityPlayingAnim(PlayerPedId(), "misscarsteal2peeing", "peeing_loop", 3) then
                         TaskPlayAnim(PlayerPedId(), "misscarsteal2peeing", "peeing_loop", 20.0, -8, -1, 49, 0, false, false, false)
                     end
                     Citizen.Wait(100)
                 end
            end)

            Citizen.Wait(10000)
            animationplaying = false
            TriggerEvent("animation:PlayAnimation","cancel")
            Citizen.Wait(50000)
            preventspam = 0
        end)
        local finished = exports["FIXDEV-taskbar"]:taskBar(10000, "Peeing in cup.", false, false, playerVeh)
        if ( finished == 100 and hasEnoughOfItem(itemid, 1, false) ) then
            remove = true
            local cid = exports["isPed"]:isPed("cid")
            TriggerServerEvent("FIXDEV-drugeffects:useEmptyPeeCup", cid)
        end
        else
            TriggerEvent("DoLongHudText","You just peed! Try again later.",2)
        end
    end

    if itemid == "Peecup_full" then
        local itemInfo = GetItemInfo(slot)
        local drugsTaken = json.decode(itemInfo.information).drugsTaken or "Test seems to come back invalid"
        TriggerEvent("DoLongHudText", drugsTaken, 1)
        -- local success = AttachPropAndPlayAnimation("amb@world_human_drinking@beer@female@idle_a", "idle_e", 49,7500,"Drinking pee.","food:SoftDrink",true,itemid,playerVeh)
        -- if success and math.random() > 0.50 then
        --     TriggerServerEvent("fx:puke")
        --     TriggerEvent("animation:PlayAnimation","outofbreath")
        --     TaskPlayAnim(PlayerPedId(), "re@construction", "out_of_breath", 20.0, -8, -1, 49, 0, false, false, false)
        --     Citizen.Wait(6000)
        --     TriggerEvent("animation:PlayAnimation","cancel")
        -- end
    end

    if (itemid == "binoculars") then
        TriggerEvent("binoculars:Activate")
    end

    if (itemid == "camera") then
        TriggerEvent("camera:Activate")
    end

    if (itemid == "megaphone") then
      TriggerEvent("FIXDEV-usableprops:megaphone")
    end

    if (itemid == "nitrous") then
        local currentVehicle = GetVehiclePedIsIn(player, false)

        if currentVehicle == nil or currentVehicle == 0 then
        else
            local finished = 0
            local cancelNos = false
            Citizen.CreateThread(function()
                while finished ~= 100 and not cancelNos do
                    Citizen.Wait(100)
                    if GetEntitySpeed(GetVehiclePedIsIn(player, false)) > 11 then
                        exports["FIXDEV-taskbar"]:closeGuiFail()
                        cancelNos = true
                    end
                end
            end)
            finished = exports["FIXDEV-taskbar"]:taskBar(20000,"Nitrous")
            if (finished == 100 and not cancelNos) then
                TriggerServerEvent('FIXDEV-vehicles:ApplyNitrous')
                TriggerEvent("noshud", 100, false)
                TriggerEvent("NosStatus")
                remove = true
            else
                TriggerEvent("DoLongHudText","You can't drive and hook up nos at the same time.",2)
            end
        end
    end

    if (itemid == "lockpick") then
        local myJob = exports["isPed"]:isPed("myJob")
        if myJob ~= "news" then
            TriggerEvent("inv:lockPick", false, inventoryName, slot, "lockpick")

        else
            TriggerEvent("DoLongHudText","Nice news reporting, you shit lord idiot.")
        end
    end

    if (itemid == "hackingdevice") then
        local myJob = exports["isPed"]:isPed("myJob")
        if myJob ~= "news" then
            TriggerEvent("inv:lockPick", false, inventoryName, slot, "hackingdevice")

        else
            TriggerEvent("DoLongHudText","Nice news reporting, you shit lord idiot.")
        end
    end

    if (itemid == "umbrella") then
        TriggerEvent("animation:PlayAnimation","umbrella")

    end

    if (itemid == "securityblue" or itemid == "securityblack" or itemid == "securitygreen" or itemid == "securitygold" or itemid == "securityred")  then
        TriggerEvent("robbery:scanLock",false,itemid)
    end

    if (itemid == "Gruppe6Card2")  then
        TriggerServerEvent("robbery:triggerItemUsedServer",itemid)
    end

    if (itemid == "Gruppe6Card222")  then
        TriggerServerEvent("robbery:triggerItemUsedServer",itemid)
    end

    if (itemid == "ciggypack" or itemid == "customciggyitem") then
        TriggerEvent( "player:receiveItem","ciggy",1)
        TriggerEvent("inventory:DegenLastUsedItem",8)
       -- TriggerServerEvent("inventory:degItem",ItemInfo.id)
    end

    if (itemid == "ciggy") then
        local finished = exports["FIXDEV-taskbar"]:taskBar(1000,"Lighting Up",false,false,playerVeh)
        if ( finished == 100 and hasEnoughOfItem(itemid, 1, false) ) then
            Wait(300)
            TriggerEvent("animation:PlayAnimation","smoke")
        end
    end

    if (itemid == "golfballpack") then
        TriggerEvent("player:receiveItem", "golfball", 1)
        TriggerEvent("inventory:DegenLastUsedItem", 5)
    end

    if (itemid == "golfballpackpink") then
        TriggerEvent("player:receiveItem", "golfballpink", 1)
        TriggerEvent("inventory:DegenLastUsedItem", 5)
    end

    if (itemid == "golfballpackorange") then
        TriggerEvent("player:receiveItem", "golfballorange", 1)
        TriggerEvent("inventory:DegenLastUsedItem", 5)
    end

    if (itemid == "golfballpackyellow") then
        TriggerEvent("player:receiveItem", "golfballyellow", 1)
        TriggerEvent("inventory:DegenLastUsedItem", 5)
    end

    if (itemid == "cigar") then
        local finished = exports["FIXDEV-taskbar"]:taskBar(1000,"Lighting Up",false,false,playerVeh)
        if ( finished == 100 and hasEnoughOfItem(itemid, 1, false) ) then
            Wait(300)
            TriggerEvent("animation:PlayAnimation","cigar")
        end
    end

    if (itemid == "oxygentank" or itemid == "oxygentanknavy") then
        local finished = exports["FIXDEV-taskbar"]:taskBar(30000,"Oxygen Tank",true,false,playerVeh)
        if ( finished == 100 and hasEnoughOfItem(itemid, 1, false) ) then
            TriggerEvent("UseOxygenTank", itemid == "oxygentanknavy")
            remove = true
        end
    end

    if (itemid == "bandage" or itemid == "custombandageitem") then
        TaskItem("amb@world_human_clipboard@male@idle_a", "idle_c", 49,10000,"Healing","healed:minors",true,itemid,playerVeh)
    end

    if (itemid == "bandagelarge") then
        local finishedBandage = TaskItem(
            "amb@world_human_clipboard@male@idle_a",
            "idle_c",
            49,
            10000,
            "Healing",
            "healed:minors",
            false,
            itemid,
            playerVeh
        )
        if finishedBandage then
            Citizen.CreateThread(function()
                Wait(32000)
                TriggerEvent("healed:minors")
                Wait(32000)
                TriggerEvent("healed:minors")
            end)
            TriggerEvent("inventory:DegenLastUsedItem", 33)
        end
    end

    if (itemid == "cocainebrick") then
        CreateCraftOption("1gcocaine", 100, true)
    end

    if (itemid == "bakingsoda") then
        CreateCraftOption("1gcrack", 80, true)
    end
    
    if (itemid == "glass") then
        CreateCraftOption({"crackpipe", "methpipe"}, 1, true)
    end

    if (itemid == "band") then
        CreateCraftOption("cokeline", 1, true)
    end

    if (itemid == "glucose") then
        CreateCraftOption("1gcocaine", 80, true)
    end

    if (itemid == "idcard") then
        local ItemInfo = GetItemInfo(slot)
        TriggerServerEvent("police:showID",ItemInfo.information, GetEntityCoords(PlayerPedId()))
    end

    if (itemid == "adrenaline") then
        TaskItem("amb@world_human_clipboard@male@idle_a", "idle_c", 49,1000,"POG GAMING Adrenaline","inventory:adrenaline",true,itemid,playerVeh)
    end

    if (itemid == "laxative") then
            remove = true
            Citizen.CreateThread(function()
                Wait(math.random(10000,120000))
                TriggerEvent("animation:PlayAnimation","shit")
                Wait(2000)
                PooingID = GetRandomString(12)
                TriggerServerEvent("fx:poo:start", PooingID)
                Wait(10000)
                TriggerEvent("animation:PlayAnimation","cancel")
            end)
    end

    if (itemid == "Desomorphine") then
        local success = TaskItem("amb@world_human_clipboard@male@idle_a", "idle_c", 49,5000,"Injecting Desomorphine","inventory:adrenaline",true,itemid,playerVeh)
        if success then
            local cid = exports["isPed"]:isPed("cid")
            TriggerServerEvent("FIXDEV-drugeffects:drugsTaken", cid, "desomorphine")

            TriggerEvent( "player:receiveItem","Desomorphine_used",1)
            WillOD = WillOD + 1
            TriggerEvent("Evidence:StateSet",2,1200)
            TriggerEvent("Evidence:StateSet",24,1200)
            TriggerEvent("fx:run", "metamorphine", 180, -1, false)
            if not HasAnimSetLoaded("move_m@drunk@slightlydrunk") then
                RequestAnimSet("move_m@drunk@slightlydrunk")
                while not HasAnimSetLoaded("move_m@drunk@slightlydrunk") do
                  Citizen.Wait(0)
                end
            end
            SetPedMovementClipset(PlayerPedId(), "move_m@drunk@slightlydrunk", 1.0)

            local ufoModelHash = GetHashKey("dt1_tc_dufo_core_np")
            RequestModel(ufoModelHash)

            while not HasModelLoaded(ufoModelHash) do
                Citizen.Wait(1)
            end

            local coords = GetOffsetFromEntityInWorldCoords(PlayerPedId(), 25.0, 25.0, 100.0)
            local ufoObject = CreateObject(ufoModelHash, coords, false, false, false)
            SetEntityLodDist(ufoObject,	500)

            Citizen.CreateThread(function()
                Wait(1000*180)
                DeleteObject(ufoObject)
            end)

            local drugEffect = true
            Citizen.CreateThread(function()
              while drugEffect do
                  Wait(10000)
                  local curVeh = GetVehiclePedIsIn(PlayerPedId(), false)
                    if math.random() < 0.11 then
                        SetPedToRagdoll(PlayerPedId(), 5500, 5500, 0, 0, 0, 0)
                    end
                    if math.random() < 0.11 then
                        TaskVehicleTempAction(PlayerPedId(), curVeh, randomDrivingActions[math.random(#randomDrivingActions)], 4000)
                    end
                  exports['ragdoll']:SetPlayerHealth(GetEntityHealth(PlayerPedId()) - 1)
                  if GetEntityHealth(PlayerPedId()) < 105 then
                      drugEffect = false
                      TriggerEvent("fx:run", "weed", 180, -1, false)
                      if math.random() < 0.70 then
                        TriggerServerEvent("fx:puke")
                        TriggerEvent("animation:PlayAnimation","outofbreath")
                        TaskPlayAnim(PlayerPedId(), "re@construction", "out_of_breath", 20.0, -8, -1, 49, 0, false, false, false)
                        Citizen.Wait(6000)
                        TriggerEvent("animation:PlayAnimation","cancel")
                      end
                      Wait(10000)
                      if math.random() < 0.25 or WillOD >= 3 then
                        exports['ragdoll']:SetPlayerHealth(GetEntityHealth(PlayerPedId()) - 100)
                        WillOD = 0
                      else
                        exports['ragdoll']:SetPlayerHealth(150)
                      end
                  end
              end
            end)
        end
    end

    if (itemid == "drivingtest") then
        local ItemInfo = GetItemInfo(slot)
        if (ItemInfo.information ~= "No information stored") then
            local data = json.decode(ItemInfo.information)
            TriggerServerEvent("driving:getResults", data.ID)
        end
    end

    if (itemid == "cokeline") then
        local itemInfo = GetItemInfo(slot)
        if itemInfo and itemInfo.quality > 0 then
            local currentUses = json.decode(itemInfo.information).uses or 0
            if currentUses == 0 then
                TriggerEvent("DoShortHudText", "Seems like I ran out :(", 2)
            else
                local finished = exports["FIXDEV-ui"]:taskBarSkill(3000, math.random(15, 20))
                if (finished == 100 and hasEnoughOfItem(itemid, 1, false)) then
                    currentUses = currentUses - 1
                    TriggerEvent("inventory:updateItem", itemid, slot, json.encode({ uses = currentUses }))
                    TriggerEvent("attachItemObjectnoanim","drugpackage01")
                    TriggerEvent("Evidence:StateSet",2,1200)
                    TriggerEvent("Evidence:StateSet",6,1200)
                    TaskItem("anim@amb@nightclub@peds@", "missfbi3_party_snort_coke_b_male3", 49, 2500, "Coke Gaming", "hadcocaine", false, itemid, playerVeh)
                    
                    local cid = exports["isPed"]:isPed("cid")
                    TriggerServerEvent("FIXDEV-drugeffects:drugsTaken", cid, "cocaine")
                end
            end
        end
    end

    if (itemid == "crackpipe") then
        local itemInfo = GetItemInfo(slot)
        if itemInfo and itemInfo.quality > 0 then
            local currentUses = json.decode(itemInfo.information).uses or 0

            if currentUses == 0 then
                TriggerEvent("DoShortHudText", "Seems like I ran out :(", 2)
            else
                local finished = exports["FIXDEV-ui"]:taskBarSkill(2400, math.random(12, 18))
                if ( finished == 100 and hasEnoughOfItem(itemid, 1, false) ) then
                    currentUses = currentUses - 1
                    TriggerEvent("inventory:updateItem", itemid, slot, json.encode({ uses = currentUses }))
                    TriggerEvent("attachItemObjectnoanim", "crackpipe01")
                    TriggerEvent("Evidence:StateSet", 2, 1200)
                    TriggerEvent("Evidence:StateSet", 6, 1200)
                    TaskItem("switch@trevor@trev_smoking_meth", "trev_smoking_meth_loop", 49, 3000, "Smoking Quack", "hadcrack", false, itemid, playerVeh)
                    
                    local cid = exports["isPed"]:isPed("cid")
                    TriggerServerEvent("FIXDEV-drugeffects:drugsTaken", cid, "crack")
                end
            end
        end    
    end

    if (itemid == "methpipe") then
        local itemInfo = GetItemInfo(slot)
        if itemInfo and itemInfo.quality > 0 then
            local currentPurities = json.decode(itemInfo.information).purities or {}

            if #currentPurities == 0 then
                TriggerEvent("DoShortHudText", "Seems like I ran out :(", 2)
            else
                local finished = exports["FIXDEV-ui"]:taskBarSkill(2400, math.random(12, 18))
                if (finished == 100 and hasEnoughOfItem(itemid, 1, false)) then
                    local purity = currentPurities[#currentPurities].purity
                    
                    TriggerEvent("attachItemObjectnoanim","crackpipe01")
                    TriggerEvent("Evidence:StateSet",2,1200)
                    TriggerEvent("Evidence:StateSet",6,1200)
                    local success = TaskItem( "switch@trevor@trev_smoking_meth", "trev_smoking_meth_loop", 49, 1500, "Smoking Meth", "hadmeth", false, itemid, playerVeh, nil, nil, purity)
                    
                    if success then
                        table.remove(currentPurities, #currentPurities)
                        TriggerEvent("inventory:updateItem", itemid, slot, json.encode({ 
                            uses = #currentPurities, 
                            purities = currentPurities,
                            ["_hideKeys"] = { "purities" }
                        }))
    
                        local cid = exports["isPed"]:isPed("cid")
                        TriggerServerEvent("FIXDEV-drugeffects:drugsTaken", cid, "meth")
                    end
                    
                end
            end
        end
    end


    if (itemid == "nosballoon") then
        TriggerEvent("Evidence:StateSet",2,1200)
        TriggerEvent("Evidence:StateSet",6,1200)
        TaskItem("switch@trevor@trev_smoking_meth", "trev_smoking_meth_loop", 49, 5000, "Huffing Nos", "hadcrack", true,itemid,playerVeh)
    end

    if (itemid == "treat") then
        local model = GetEntityModel(player)
        if validDogModels[model] then
            TaskItem("mp_player_inteat@burger", "mp_player_int_eat_burger", 49, 1200, "Treat Num's", "hadtreat", true,itemid,playerVeh)
        end
    end

    if (itemid == "IFAK") then
        TaskItem("amb@world_human_clipboard@male@idle_a", "idle_c", 49,2000,"Applying IFAK","healed:useOxy",true,itemid,playerVeh)
    end

    if (has_value(fruits, itemid)) then
        AttachPropAndPlayAnimation("mp_player_inteat@burger", "mp_player_int_eat_burger", 49,6000,"Eating","changehunger",true,itemid,playerVeh)
    end


    if (itemid == "oxy") then
        TriggerEvent("animation:PlayAnimation","pill")
        TriggerEvent("healed:useOxy", true)
        remove = true
    end

    if (itemid == "oxybettalife") then
        TriggerEvent("animation:PlayAnimation","pill")
        TriggerEvent("healed:useOxy", true, true)
        remove = true
    end

    if (itemid == "experiment_01"
    or itemid == "experiment_02"
    or itemid == "experiment_03"
    or itemid == "experiment_04"
    or itemid == "experiment_05"
    or itemid == "experiment_06"
    or itemid == "experiment_07"
    or itemid == "experiment_08"
    or itemid == "experiment_09") then
        TriggerEvent("animation:PlayAnimation","pill")
        local finished = exports["FIXDEV-taskbar"]:taskBar(3000,"Downing content of bottle. 💊",false,false,playerVeh)
        if ( finished == 100 and hasEnoughOfItem(itemid, 1, false) ) then
            if math.random() < 0.20 then
                TriggerServerEvent("fx:puke")
                TriggerEvent("animation:PlayAnimation","outofbreath")
                TaskPlayAnim(PlayerPedId(), "re@construction", "out_of_breath", 20.0, -8, -1, 49, 0, false, false, false)
                Citizen.Wait(6000)
                
                TriggerEvent("animation:PlayAnimation","cancel")
            end
            if math.random() < 0.50 then
                TriggerEvent("fx:run", randomEffects[math.random(#randomEffects)], 280, -1, false)
            end
            remove = true
        end
    end

    if (itemid == "pillbox") then
        local finished = exports["FIXDEV-taskbar"]:taskBar(5000, "Opening pill box", false, false, playerVeh)
        if ( finished == 100 and hasEnoughOfItem(itemid, 1, false) ) then
            TriggerEvent( "player:receiveItem", "experiment_01", 5 )
            TriggerEvent( "player:receiveItem", "experiment_02", 5 )
            TriggerEvent( "player:receiveItem", "experiment_03", 5 )
            TriggerEvent( "player:receiveItem", "experiment_04", 5 )
            TriggerEvent( "player:receiveItem", "experiment_05", 5 )
            TriggerEvent( "player:receiveItem", "experiment_06", 5 )
            TriggerEvent( "player:receiveItem", "experiment_07", 5 )
            TriggerEvent( "player:receiveItem", "experiment_08", 5 )
            TriggerEvent( "player:receiveItem", "experiment_09", 5 )
        end
    end

    if itemid == "frankstruth" then
        TriggerEvent("animation:PlayAnimation","pill")
        remove = true
    end

    if itemid == "copium" then
        local success = TaskItem("switch@trevor@trev_smoking_meth", "trev_smoking_meth_loop", 49, 10000, "Taking a hit of copium", "hadtreat", true,itemid,playerVeh)
        if success then
            SetPedToRagdoll(PlayerPedId(), 30000, 30000, 0, 0, 0, 0)
        end
    end

    if sandwichItems[itemid] or deanworldFood[itemid] then
        AttachPropAndPlayAnimation(
          "mp_player_inteat@burger",
          "mp_player_int_eat_burger",
          49,
          6000,
          "Eating",
          "changehunger",
          not customMarketItems[itemid],
          itemid,
          playerVeh
        )
        remove = customMarketItems[itemid]
    end

    if itemid == "customfooditem" then
        TriggerEvent("changehunger", 100)
    end

    if deanworldFood[itemid] then
      TriggerEvent("DoLongHudText", "Ew, tastes like shit.", 2)
      if math.random() < 0.05 then
        TriggerServerEvent("fx:puke")
      end
    end

    if itemid == "boggsproteinbar" then
        local success = AttachPropAndPlayAnimation(
            "mp_player_inteat@burger",
            "mp_player_int_eat_burger",
            49,
            6000,
            "Eating",
            "",
            false,
            "sandwich",
            playerVeh
        )

        if success then
            TriggerEvent("FIXDEV-buffs:applyBuff", "boggs", { { buff = "bikeStats", percent = 1.0, timeOverride = 60 * 1000 } })
            TriggerEvent('DoLongHudText', 'You feel revitalized', 1)
            remove = true
        end
    end

    if waterItems[itemid] then
        --attachPropsToAnimation(itemid, 6000)
        --TaskItem("amb@world_human_drinking@coffee@male@idle_a", "idle_c", 49,6000,"Drink","changethirst",true,itemid)
        AttachPropAndPlayAnimation(
          "amb@world_human_drinking@beer@female@idle_a",
          "idle_e",
          49,
          6000,
          "Drink",
          "changethirst",
          not customMarketItems[itemid],
          itemid,
          playerVeh
        )
        remove = customMarketItems[itemid]
    end

    if itemid == "customwateritem" then
        TriggerEvent("changethirst", 100)
    end

    if itemid == "kdragonwater" then
        --attachPropsToAnimation(itemid, 6000)
        --TaskItem("amb@world_human_drinking@coffee@male@idle_a", "idle_c", 49,6000,"Drink","changethirst",true,itemid)
        AttachPropAndPlayAnimation(
          "amb@world_human_drinking@beer@female@idle_a",
          "idle_e",
          49,
          6000,
          "Drink",
          "FIXDEV-katana:transformKFromDrink",
          true,
          itemid,
          playerVeh
        )
        remove = true
    end


    if (itemid == "bleederburger"
      or itemid == "heartstopper"
      or itemid == "torpedo"
      or itemid == "meatfree"
      or itemid == "moneyshot"
      or itemid == "maccheese"
      or itemid == "questionablemeatburger"
      or itemid == "panini"
      or itemid == "pizza"
      or itemid == "pancakes"
      or itemid == "wings"
    ) then
        AttachPropAndPlayAnimation("mp_player_inteat@burger", "mp_player_int_eat_burger", 49,6000,"Eating","inv:wellfed",true,itemid,playerVeh)
        --attachPropsToAnimation(itemid, 6000)
        --TaskItem("mp_player_inteat@burger", "mp_player_int_eat_burger", 49, 6000, "Eating", "inv:wellfed", true,itemid)
    end

    if (itemid == "sushiplate"
      or itemid == "sushiplatec"
      or itemid == "beefdish"
      or itemid == "beefdishc"
      or itemid == "ramen"
    ) then
        local success = AttachPropAndPlayAnimation("mp_player_inteat@burger", "mp_player_int_eat_burger", 49,6000,"Eating","inv:wellfedNoStress",true,itemid,playerVeh)
        if success then
          TriggerEvent("DoLongHudText", "You feel lucky.")
          TriggerEvent("buffs:triggerBuff", itemid)
          TriggerServerEvent("buffs:triggerBuff", itemid)
        end
    end

    if (itemid == "blue_rare_steak"
      or itemid == "rare_steak"
      or itemid == "medium_rare_steak"
      or itemid == "medium_steak"
      or itemid == "medium_well_steak"
      or itemid == "well_done_steak"
    ) then
        local success = AttachPropAndPlayAnimation("mp_player_inteat@burger", "mp_player_int_eat_burger", 49,6000,"Eating","inv:wellfedNoStress",true,itemid,playerVeh)
        if success then
          TriggerEvent("DoLongHudText", "Hmmm.. delicious.")
          TriggerEvent("buffs:triggerBuff", itemid)
          TriggerServerEvent("buffs:triggerBuff", itemid)
        end
    end

    -- if (itemid == "methlabproduct") then
    --     local finished = exports["FIXDEV-ui"]:taskBarSkill(2400, math.random(12, 18))
    --     if ( finished == 100 and hasEnoughOfItem(itemid, 1, false) ) then
    --         TriggerEvent("attachItemObjectnoanim","crackpipe01")
    --         TriggerEvent("Evidence:StateSet",2,1200)
    --         TriggerEvent("Evidence:StateSet",6,1200)

    --         TaskItem(
    --           "switch@trevor@trev_smoking_meth",
    --           "trev_smoking_meth_loop",
    --           49,
    --           1500,
    --           "Smoking Meth",
    --           "hadmeth",
    --           true,
    --           itemid,
    --           playerVeh,
    --           nil,
    --           nil,
    --           json.decode(passedItemInfo).purity
    --       )

    --         local cid = exports["isPed"]:isPed("cid")
    --         TriggerServerEvent("FIXDEV-drugeffects:drugsTaken", cid, "meth")
    --     end
    -- end

    if itemid == "ketamine" then
        local finished = exports["FIXDEV-ui"]:taskBarSkill(2000, math.random(10, 15))
        if ( finished == 100 and hasEnoughOfItem(itemid, 1, false) ) then
            TriggerEvent("attachItemObjectnoanim","drugpackage01")
            TriggerEvent("Evidence:StateSet",2,1200)
            TriggerEvent("Evidence:StateSet",6,1200)
            TaskItem("anim@amb@nightclub@peds@", "missfbi3_party_snort_coke_b_male3", 49, 5000, "Entering the K-Hole", "inventory:ketamine", true,itemid,playerVeh, nil, nil, json.decode(passedItemInfo).purity)
        end
    end

    if itemid == "slushy" then
        --attachPropsToAnimation(itemid, 6000)
        AttachPropAndPlayAnimation("amb@world_human_drinking@beer@female@idle_a", "idle_e", 49, 6000,"Eating", "inv:slushy",true,itemid,playerVeh)
    end

    if itemid == "fruitslushy" then
        AttachPropAndPlayAnimation("amb@world_human_drinking@beer@female@idle_a", "idle_e", 49, 6000,"Drinking", "inv:fruitslushy",true,itemid,playerVeh)
    end

    if itemid == "jailfood" then
        AttachPropAndPlayAnimation("mp_player_inteat@burger", "mp_player_int_eat_burger", 49,6000,"Eating","inv:wellfed",true,itemid,playerVeh)
    end

    if itemid == "jaildrink" then
        AttachPropAndPlayAnimation("amb@world_human_drinking@beer@female@idle_a", "idle_e", 49, 6000,"Drinking", "inv:fruitslushy",true,itemid,playerVeh)
    end

    if (itemid == "shitlockpick") then
        lockpicking = true
        TriggerEvent("animation:lockpickinvtestoutside")
        local finished = exports["FIXDEV-ui"]:taskBarSkill(1000, math.random(7, 12))
        if ( finished == 100 and hasEnoughOfItem(itemid, 1, false) ) then
            TriggerEvent("FIXDEV-police:cuffs:uncuff")
        end
        lockpicking = false
        remove = true
    end

    if (itemid == "watch" or itemid == "civwatch") then
        TriggerEvent("FIXDEV-ui:watch")
    end

    if (itemid == "godbook") then
        local ItemInfo = GetItemInfo(slot)
        if (ItemInfo == nil or ItemInfo.information == "No information stored" or  ItemInfo.information == nil) then
            justUsed = false
            retardCounter = 0
            lastCounter = 0
            return
        end
        local data = json.decode(ItemInfo.information)
        local cid = exports["isPed"]:isPed("cid")

        if data.cid == cid then
            remove = true
            TriggerServerEvent("inventory:gb",data)
        else
            TriggerEvent("DoLongHudText","Just looks blank to me.",2)
        end
    end

    if (itemid == "harness") then
        local currentVehicle = GetVehiclePedIsIn(player, false)

        local finished = 0
        local cancelHarness = false
        Citizen.CreateThread(function()
            while finished ~= 100 and not cancelHarness do
                Citizen.Wait(100)
                if GetEntitySpeed(GetVehiclePedIsIn(player, false)) > 11 then
                    exports["FIXDEV-taskbar"]:closeGuiFail()
                    cancelHarness = true
                end
            end
        end)
        finished = exports["FIXDEV-taskbar"]:taskBar(20000,"Harness")
        if (finished == 100 and not cancelHarness) then
            TriggerEvent("vehicle:addHarness", "large")
            TriggerEvent("harness", false, 100)
            remove = true
        else
            TriggerEvent("DoLongHudText","You can't drive and hook up nos at the same time.",2)
        end
    end

    if itemid == "softdrink" then
        AttachPropAndPlayAnimation("amb@world_human_drinking@coffee@male@idle_a", "idle_c", 49,15000,"Drink","food:SoftDrink",true,itemid,playerVeh)
    end

    if itemid == "roostertea" then
        AttachPropAndPlayAnimation("amb@world_human_drinking@coffee@male@idle_a", "idle_c", 49,15000,"Drink","FIXDEV-roostersrest:drinkTea",true,itemid,playerVeh)
    end

    if itemid == "fries" or itemid == "chips" then
        AttachPropAndPlayAnimation("mp_player_inteat@burger", "mp_player_int_eat_burger", 49,15000,"Eating","food:Fries",true,itemid,playerVeh)
    end

    if itemid == "bscoffee" then
        AttachPropAndPlayAnimation("amb@world_human_drinking@coffee@male@idle_a", "idle_c", 49,15000,"Drink","coffee:drink",true,itemid,playerVeh)
    end

    if itemid == "foodbag" or itemid == "collectiblepouch" then
        local data = json.decode(passedItemInfo)
        TriggerEvent("inventory-open-container", data.inventoryId, data.slots, data.weight)
    end

    if itemid == "mask" then
        local parsedInfo = json.decode(passedItemInfo)
        TriggerEvent("facewear:setWear", 4, parsedInfo.mask, parsedInfo.txd, parsedInfo.palette)
        TriggerEvent("facewear:adjust", 4, false)
    end

    if itemid == "hat" then
        local parsedInfo = json.decode(passedItemInfo)
        TriggerEvent("facewear:setWear", 1, parsedInfo.hat, parsedInfo.txd)
        TriggerEvent("facewear:adjust", 1, false)
    end

    if itemid == "franksflute" then
      TriggerServerEvent("FIXDEV-inventory:franksFlute", GetEntityCoords(PlayerPedId()))
      franksFluteCount = franksFluteCount + 1
      if franksFluteCount == 3 then
        franksFluteCount = 0
        remove = true
      end
    end

    if itemid == "tattooremover" then
        local target = exports['FIXDEV-target']:GetCurrentEntity()
        --local target = PlayerPedId()
        if IsEntityAPed(target) and IsPedAPlayer(target) then
            TaskStartScenarioInPlace(PlayerPedId(), "WORLD_HUMAN_WELDING", 0, true)
            local finished = exports["FIXDEV-taskbar"]:taskBar(60000, "Removing tattoos")
            ClearPedTasks(PlayerPedId())
            if ( finished == 100 and hasEnoughOfItem(itemid, 1, false) ) then
                local plyCoords = GetEntityCoords(PlayerPedId())
                local targetCoords = GetEntityCoords(target)
                if #(plyCoords - targetCoords) < 5.0 then
                    local plyId = GetPlayerServerId( NetworkGetPlayerIndexFromPed(target))
                    local success = RPC.execute("clothing:removeTattoosForPlayer", plyId)
                    if success then
                        TriggerEvent("DoLongHudText", "Removed tattoos.")
                    else
                        TriggerEvent("DoLongHudText", "Could not remove tattos.")
                    end
                else
                    TriggerEvent("DoLongHudText", "They are too far away.")
                end
            end
        end
    end

    if itemid == "buddhaletter" then
        if GetEntityModel(PlayerPedId()) == `ig_buddha` or GetEntityModel(PlayerPedId()) == `g_m_m_buddha` then
            local finished = exports["FIXDEV-taskbar"]:taskBar(5000,"Opening letter.",false,false,playerVeh)
            if ( finished == 100 and hasEnoughOfItem(itemid, 1, false) ) then
                TriggerEvent("DoLongHudText","As you open the letter something falls to the ground. You pick it up.",10)
                remove = true
                TriggerEvent( "player:receiveItem","buddhamedalion",1)
            end
        else
            TriggerEvent("DoLongHudText","Should I really be opening this?",3)
        end
    end
    if itemid == "buddhablade" or itemid == "buddhaguard" or itemid == "buddhahilt" then
        if hasEnoughOfItem("buddhablade",1,false) and hasEnoughOfItem("buddhaguard",1,false) and hasEnoughOfItem("buddhahilt",1,false) then
            if hasEnoughOfItem("buddhamedalion",1,false) then
                local playerPos = GetEntityCoords(PlayerPedId())
                if #(playerPos - vector3(-172.54, 319.13, 87.35)) < 10 then
                    local finished = exports["FIXDEV-taskbar"]:taskBar(30000,"Putting sword together.",false,false,playerVeh)
                    if ( finished == 100 and hasEnoughOfItem(itemid, 1, false) ) then
                        TriggerEvent("inventory:removeItem","buddhablade", 1)
                        TriggerEvent("inventory:removeItem","buddhaguard", 1)
                        TriggerEvent("inventory:removeItem","buddhahilt", 1)
                        TriggerEvent("inventory:removeItem","buddhamedalion", 1)
                        TriggerEvent("player:receiveItem","talonweapon",1)
                    end
                else
                    TriggerEvent("DoLongHudText","Voice in your head: You can't do that here.",5)
                end
            else
                TriggerEvent("DoLongHudText","You seem to be missing something.",5)
            end
        else
            TriggerEvent("DoLongHudText","Voice in your head: Your quest is not yet complete.",5)
        end
    end
    if itemid == "buddhashovel" then
        local playerPos = GetEntityCoords(PlayerPedId())
        if #(playerPos - vector3(-1911.78, 1388.1, 219.35)) < 10 then
            if BuddhaIsItemFound1 == false then
                TaskStartScenarioInPlace(PlayerPedId(), "WORLD_HUMAN_GARDENER_PLANT", 0, true)
                local finished = exports["FIXDEV-taskbar"]:taskBar(15000, "Digging for something.", false, true, false, false, nil, 5.0, PlayerPedId())
                ClearPedTasks(PlayerPedId())
                if ( finished == 100 and hasEnoughOfItem(itemid, 1, false) ) then
                    BuddhaIsItemFound1 = true
                    TriggerEvent( "player:receiveItem","buddhablade",1)
                end
            end
        elseif #(playerPos - vector3(-1717.48, 5649.55, -119.6)) < 5 then
            if BuddhaIsItemFound2 == false then
                TaskStartScenarioInPlace(PlayerPedId(), "WORLD_HUMAN_GARDENER_PLANT", 0, true)
                local finished = exports["FIXDEV-taskbar"]:taskBar(15000, "Digging for something.", false, true, false, false, nil, 5.0, PlayerPedId())
                ClearPedTasks(PlayerPedId())
                if ( finished == 100 and hasEnoughOfItem(itemid, 1, false) ) then
                    BuddhaIsItemFound2 = true
                    TriggerEvent( "player:receiveItem","buddhaguard",1)
                end
            end
        elseif #(playerPos - vector3(3647.61, 3121.15, 1.31)) < 10 then
            if BuddhaIsItemFound3 == false then
                TaskStartScenarioInPlace(PlayerPedId(), "WORLD_HUMAN_GARDENER_PLANT", 0, true)
                local finished = exports["FIXDEV-taskbar"]:taskBar(15000, "Digging for something.", false, true, false, false, nil, 5.0, PlayerPedId())
                ClearPedTasks(PlayerPedId())
                if ( finished == 100 and hasEnoughOfItem(itemid, 1, false) ) then
                    BuddhaIsItemFound3 = true
                    TriggerEvent( "player:receiveItem","buddhahilt",1)
                end
            end
        elseif not BuddhaIsItemFound1 or not BuddhaIsItemFound2 or not BuddhaIsItemFound3 then
            TriggerEvent("DoLongHudText","Voice in your head: This is not the place.",5)
        else
            TriggerEvent("DoLongHudText","Voice in your head: You already found it, move on!",5)
        end
    end

    if itemid == "notepad" then
        notepadUsed()
    end
    if itemid == "notepadnote" then
        notepadPageUsed(passedItemInfo)
    end

    TriggerEvent("FIXDEV-inventory:itemUsed", itemid, passedItemInfo, inventoryName, slot)
    TriggerServerEvent("FIXDEV-inventory:itemUsed", itemid, passedItemInfo, inventoryName, slot)

    if remove then
        local info = json.decode(passedItemInfo)
        if info and info._remove_id then
            TriggerEvent("inventory:removeItemByMetaKV", itemid, 1, "_remove_id", info._remove_id)
        else
            TriggerEvent("inventory:removeItem", itemid, 1)
        end
    end

    Wait(500)
    retardCounter = 0
    justUsed = false


end)

