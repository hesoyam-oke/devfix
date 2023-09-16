RegisterNetEvent('gallery-menu')
AddEventHandler('gallery-menu', function()
    local isEmployed = exports["FIXDEV-business"]:IsEmployedAt("gallery")
    if isEmployed then
        local AGGem = {
            {
                title = "Mined Items",
                icon = "hard-hat"
            },
            {
                title = "Sell Diamond Gem",
                description = "Diamond",
                icon = "gem",
                action = 'gallery_diamond',
            },
            {
                title = "Sell Aquamarine Gem",
                description = "Aquamarine",
                icon = "gem",
                action = 'gallery_aquamarine',
            },
            {
                title = "Sell Jade Gem",
                description = "Jade",
                icon = "gem",
                action = 'gallery_jade',
            },
            {
                title = "Sell Citrine Gem",
                description = "Citrine",
                icon = "gem",
                action = 'gallery_citrine',
            },
            {
                title = "Sell Garnet Gem",
                description = "Garnet",
                icon = "gem",
                action = 'gallery_garnet',
            },
            {
                title = "Sell Opal Gem",
                description = "Opal",
                icon = "gem",
                action = 'gallery_opal',
            },
            {
                title = "Sell Ruby",
                description = "Ruby",
                icon = "gem",
                action = 'gallery_ruby',
            },
            {
                title = "Sell Starry Night",
                description = "Starry Night",
                icon = "paint-roller",
                action = 'gallery_night',
            },
            {
                title = "Sell Art",
                description = "Art",
                icon = "gem",
                action = 'gallery_art',
            },
            {
                title = "Sell Golden Coin",
                description = "Golden COin",
                icon = "coins",
                action = 'gallery_coin',
            },
            {
                title = "Sell Valuable Goods",
                description = "Valualble Goods",
                icon = "coins",
                action = 'gallery_vg',
            },
            {
                title = "Sell Gold Bars",
                description = "Gold Bars",
                icon = "coins",
                action = 'gallery_gb',
            },
            {
                title = "Sell Rolex Watch",
                description = "Rolex Watch",
                icon = "clock",
                action = 'gallery_rw',
            },
            {
                title = "Sell 8ct Chains",
                description = "8 Carat Chains",
                icon = "link",
                action = 'gallery_8ct',
            },
        }
        exports["FIXDEV-interface"]:showContextMenu(AGGem)
    end
end)

RegisterUICallback('gallery_diamond', function(data, cb)
    cb({ data = {}, meta = { ok = true, message = '' } })
    TriggerEvent('FIXDEV-jobs:gellery_sell_diamonds')
end)

RegisterUICallback('gallery_aquamarine', function(data, cb)
    cb({ data = {}, meta = { ok = true, message = '' } })
    TriggerEvent('FIXDEV-jobs:gellery_sell_aquamarine')
end)

RegisterUICallback('gallery_jade', function(data, cb)
    cb({ data = {}, meta = { ok = true, message = '' } })
    TriggerEvent('FIXDEV-jobs:gellery_sell_jade')
end)

RegisterUICallback('gallery_citrine', function(data, cb)
    cb({ data = {}, meta = { ok = true, message = '' } })
    TriggerEvent('FIXDEV-jobs:gellery_sell_citrine')
end)

RegisterUICallback('gallery_garnet', function(data, cb)
    cb({ data = {}, meta = { ok = true, message = '' } })
    TriggerEvent('FIXDEV-jobs:gellery_sell_garnet')
end)

RegisterUICallback('gallery_opal', function(data, cb)
    cb({ data = {}, meta = { ok = true, message = '' } })
    TriggerEvent('FIXDEV-jobs:gellery_sell_opal')
end)

RegisterUICallback('gallery_ruby', function(data, cb)
    cb({ data = {}, meta = { ok = true, message = '' } })
    TriggerEvent('FIXDEV-jobs:gellery_sell_ruby')
end)

RegisterUICallback('gallery_night', function(data, cb)
    cb({ data = {}, meta = { ok = true, message = '' } })
    TriggerEvent('FIXDEV-jobs:gellery_sell_night')
end)

RegisterUICallback('gallery_art', function(data, cb)
    cb({ data = {}, meta = { ok = true, message = '' } })
    TriggerEvent('FIXDEV-jobs:gellery_sell_stolen_art')
end)

RegisterUICallback('gallery_coin', function(data, cb)
    cb({ data = {}, meta = { ok = true, message = '' } })
    TriggerEvent('FIXDEV-jobs:gallery_sell_gold_coins')
end)

RegisterUICallback('gallery_vg', function(data, cb)
    cb({ data = {}, meta = { ok = true, message = '' } })
    TriggerEvent('FIXDEV-jobs:gallery_sell_val_goods')
end)

RegisterUICallback('gallery_gb', function(data, cb)
    cb({ data = {}, meta = { ok = true, message = '' } })
    TriggerEvent('FIXDEV-jobs:gallery_sell_gold_bars')
end)

RegisterUICallback('gallery_rw', function(data, cb)
    cb({ data = {}, meta = { ok = true, message = '' } })
    TriggerEvent('FIXDEV-jobs:gallery_sell_rolex_watch')
end)

RegisterUICallback('gallery_8ct', function(data, cb)
    cb({ data = {}, meta = { ok = true, message = '' } })
    TriggerEvent('FIXDEV-jobs:gallery_sell_8ct_chains')
end)

 --Sales

 --Mining Gem

RegisterNetEvent('FIXDEV-jobs:gellery_sell_diamonds')
AddEventHandler('FIXDEV-jobs:gellery_sell_diamonds', function()
    exports['FIXDEV-interface']:openApplication('textbox', {
        callbackUrl = 'FIXDEV-jobs:galleryGem',
        key = 1,
        items = {
          {
            icon = "gem",
            label = "How Many Gems.",
            name = "pGemAmount",
          },
        },
        show = true,
      })
end)

RegisterUICallback('FIXDEV-jobs:galleryGem', function(data, cb)
    cb({ data = {}, meta = { ok = true, message = '' } })
        local GemAmount = data.values.pGemAmount
        if exports['FIXDEV-inventory']:hasEnoughOfItem('mineddiamond', GemAmount) then
        FreezeEntityPosition(PlayerPedId(), true)
         local finished = exports['FIXDEV-taskbar']:taskBar(2000*GemAmount, 'Selling Diamond Gems')
         if finished == 100 then
            if exports['FIXDEV-inventory']:hasEnoughOfItem('mineddiamond', GemAmount) then
                TriggerEvent('inventory:removeItem', 'mineddiamond', GemAmount)
                TriggerServerEvent('FIXDEV-financials:business_money', 200*GemAmount, 'gallery', 'add') 
                TriggerEvent("DoLongHudText", "You sold " .. GemAmount .. " Diamond Gems for $" .. 200*GemAmount .. "!", 1)
                FreezeEntityPosition(PlayerPedId(), false)
            end
         else
             FreezeEntityPosition(PlayerPedId(), false)
             TriggerEvent('DoLongHudText', 'Might wanna try again', 2)
         end
    end
end)

 --Mining Stone

RegisterNetEvent('FIXDEV-jobs:gellery_sell_aquamarine')
AddEventHandler('FIXDEV-jobs:gellery_sell_aquamarine', function()
    exports['FIXDEV-interface']:openApplication('textbox', {
        callbackUrl = 'FIXDEV-jobs:galleryStone',
        key = 1,
        items = {
          {
            icon = "gem",
            label = "How Many Stones.",
            name = "pAquaAmount",
          },
        },
        show = true,
      })
end)

RegisterUICallback('FIXDEV-jobs:galleryStone', function(data, cb)
    cb({ data = {}, meta = { ok = true, message = '' } })
    local pAquaAmt = data.values.pAquaAmount

    if exports['FIXDEV-inventory']:hasEnoughOfItem('minedaquamarine', pAquaAmt) then
        FreezeEntityPosition(PlayerPedId(), true)
         local finished = exports['FIXDEV-taskbar']:taskBar(250*pAquaAmt, 'Selling Aquamarine')
         if finished == 100 then
            if exports['FIXDEV-inventory']:hasEnoughOfItem('minedaquamarine', pAquaAmt) then
                TriggerEvent('inventory:removeItem', 'minedaquamarine', pAquaAmt)
                TriggerServerEvent('FIXDEV-financials:business_money', 555*pAquaAmt, 'gallery', 'add')
                TriggerEvent("DoLongHudText", "You sold " .. pAquaAmt .. " Aquamarine for $" .. 555*pAquaAmt .. "")
                FreezeEntityPosition(PlayerPedId(), false)
            end
         else
             FreezeEntityPosition(PlayerPedId(), false)
             TriggerEvent('DoLongHudText', 'Might wanna try again', 2)
         end
    end
end)

 --Mining Jade

RegisterNetEvent('FIXDEV-jobs:gellery_sell_jade')
AddEventHandler('FIXDEV-jobs:gellery_sell_jade', function()
    exports['FIXDEV-interface']:openApplication('textbox', {
        callbackUrl = 'FIXDEV-jobs:galleryJade',
        key = 1,
        items = {
          {
            icon = "gem",
            label = "How Many Jade\'s.",
            name = "pJadeAmount",
          },
        },
        show = true,
      })
end)

RegisterUICallback('FIXDEV-jobs:galleryJade', function(data, cb)
    cb({ data = {}, meta = { ok = true, message = '' } })
    local pJadeAmt = data.values.pJadeAmount

    if exports['FIXDEV-inventory']:hasEnoughOfItem('minedjade', pJadeAmt) then
        FreezeEntityPosition(PlayerPedId(), true)
         local finished = exports['FIXDEV-taskbar']:taskBar(2000*pJadeAmt, 'Selling Mined Jade')
         if finished == 100 then
            if exports['FIXDEV-inventory']:hasEnoughOfItem('minedjade', pJadeAmt) then
                TriggerEvent('inventory:removeItem', 'minedjade', pJadeAmt)
                TriggerServerEvent('FIXDEV-financials:business_money', 877*pJadeAmt, 'gallery', 'add') 
                FreezeEntityPosition(PlayerPedId(), false)
            end
         else
             FreezeEntityPosition(PlayerPedId(), false)
             TriggerEvent('DoLongHudText', 'Might wanna try again', 2)
         end
    end
end)

 --Mining Citrine

RegisterNetEvent('FIXDEV-jobs:gellery_sell_citrine')
AddEventHandler('FIXDEV-jobs:gellery_sell_citrine', function()
    exports['FIXDEV-interface']:openApplication('textbox', {
        callbackUrl = 'FIXDEV-jobs:galleryCitrine',
        key = 1,
        items = {
          {
            icon = "gem",
            label = "How Many Citrine.",
            name = "pCitrineAmount",
          },
        },
        show = true,
      })
end)

RegisterUICallback('FIXDEV-jobs:galleryCitrine', function(data, cb)
    cb({ data = {}, meta = { ok = true, message = '' } })
    local pCitrineAmt = data.values.pCitrineAmount
    if exports['FIXDEV-inventory']:hasEnoughOfItem('minedcitrine', pCitrineAmt) then
        FreezeEntityPosition(PlayerPedId(), true)
         local finished = exports['FIXDEV-taskbar']:taskBar(2500*pCitrineAmt, 'Selling Citrine')
         if finished == 100 then
            if exports['FIXDEV-inventory']:hasEnoughOfItem('minedcitrine', pCitrineAmt) then
                TriggerEvent('inventory:removeItem', 'minedcitrine', pCitrineAmt)
                TriggerServerEvent('FIXDEV-financials:business_money', 1925*pCitrineAmt, 'gallery', 'add') 
                TriggerEvent("DoLongHudText", "You sold " .. pCitrineAmt .. " Citrine for $" .. 1925*pCitrineAmt .. "")
                FreezeEntityPosition(PlayerPedId(), false)
            end
         else
             FreezeEntityPosition(PlayerPedId(), false)
             TriggerEvent('DoLongHudText', 'Might wanna try again', 2)
         end
    end
end)

 --Mining Garnet

RegisterNetEvent('FIXDEV-jobs:gellery_sell_garnet')
AddEventHandler('FIXDEV-jobs:gellery_sell_garnet', function()
    exports['FIXDEV-interface']:openApplication('textbox', {
        callbackUrl = 'FIXDEV-jobs:galleryGarnet',
        key = 1,
        items = {
          {
            icon = "gem",
            label = "How Many Garnet.",
            name = "pGarnetAmount",
          },
        },
        show = true,
      })
end)

RegisterUICallback('FIXDEV-jobs:galleryGarnet', function(data, cb)
    cb({ data = {}, meta = { ok = true, message = '' } })
    local pGarnetAmt = data.values.pGarnetAmount
        if exports['FIXDEV-inventory']:hasEnoughOfItem('minedgarnet', pGarnetAmt) then
        FreezeEntityPosition(PlayerPedId(), true)
         local finished = exports['FIXDEV-taskbar']:taskBar(2000*pGarnetAmt, 'Selling Garnet')
         if finished == 100 then
            if exports['FIXDEV-inventory']:hasEnoughOfItem('minedgarnet', pGarnetAmt) then
                TriggerEvent('inventory:removeItem', 'minedgarnet', pGarnetAmt)
                TriggerServerEvent('FIXDEV-financials:business_money', 1650*pGarnetAmt, 'gallery', 'add') 
                TriggerEvent("DoLongHudText", "You sold " .. pGarnetAmt .. " Garnet for $" .. 1650*pGarnetAmt .. "")
                FreezeEntityPosition(PlayerPedId(), false)
             else
                 FreezeEntityPosition(PlayerPedId(), false)
                 TriggerEvent('DoLongHudText', 'Might wanna try again', 2)
             end
        end
    end
end)

-- Mining Opal

RegisterNetEvent('FIXDEV-jobs:gellery_sell_opal')
AddEventHandler('FIXDEV-jobs:gellery_sell_opal', function()
    exports['FIXDEV-interface']:openApplication('textbox', {
        callbackUrl = 'FIXDEV-jobs:galleryOpal',
        key = 1,
        items = {
          {
            icon = "gem",
            label = "How Many Opal.",
            name = "pOpalAmount",
          },
        },
        show = true,
      })
end)

RegisterUICallback('FIXDEV-jobs:galleryOpal', function(data, cb)
    cb({ data = {}, meta = { ok = true, message = '' } })
    local pOpalAmt = data.values.pOpalAmount
        if exports['FIXDEV-inventory']:hasEnoughOfItem('minedopal', pOpalAmt) then
        FreezeEntityPosition(PlayerPedId(), true)
        local finished = exports['FIXDEV-taskbar']:taskBar(2000*pOpalAmt, 'Selling Opal')
        if finished == 100 then
            if exports['FIXDEV-inventory']:hasEnoughOfItem('minedopal', pOpalAmt) then
                TriggerEvent('inventory:removeItem', 'minedopal', pOpalAmt)
                TriggerServerEvent('FIXDEV-financials:business_money', 580*pOpalAmt, 'gallery', 'add') 
                TriggerEvent("DoLongHudText", "You sold " .. pOpalAmt .. " Opal for $" .. 580*pOpalAmt .. "!", 1)
                FreezeEntityPosition(PlayerPedId(), false)
            end
        else
            FreezeEntityPosition(PlayerPedId(), false)
            TriggerEvent('DoLongHudText', 'Might wanna try again', 2)
        end
    end
end)

 --Stolen Art

RegisterNetEvent('FIXDEV-jobs:gellery_sell_stolen_art')
AddEventHandler('FIXDEV-jobs:gellery_sell_stolen_art', function()
    exports['FIXDEV-interface']:openApplication('textbox', {
        callbackUrl = 'FIXDEV-jobs:galleryArt',
        key = 1,
        items = {
          {
            icon = "gem",
            label = "How Many Art Pieces.",
            name = "pArtAmount",
          },
        },
        show = true,
      })
end)

RegisterUICallback('FIXDEV-jobs:galleryArt', function(data, cb)
    cb({ data = {}, meta = { ok = true, message = '' } })
    local pArtAmt = data.values.pArtAmount
        if exports['FIXDEV-inventory']:hasEnoughOfItem('stolenart', pArtAmt) then
        FreezeEntityPosition(PlayerPedId(), true)
         local finished = exports['FIXDEV-taskbar']:taskBar(2000*pArtAmt, 'Selling Art Pieces')
         if finished == 100 then
            if exports['FIXDEV-inventory']:hasEnoughOfItem('stolenart', pArtAmt) then
                TriggerEvent('inventory:removeItem', 'stolenart', pArtAmt)
                TriggerServerEvent('FIXDEV-financials:business_money', 1500*pArtAmt, 'gallery', 'add') 
                TriggerEvent("DoLongHudText", "You sold " .. pArtAmt .. " Art Pieces for $" .. 1500*pArtAmt .. "")
                FreezeEntityPosition(PlayerPedId(), false)
            end
         else
             FreezeEntityPosition(PlayerPedId(), false)
             TriggerEvent('DoLongHudText', 'Might wanna try again', 2)
         end
    end
end)

 --Golden Coins

RegisterNetEvent('FIXDEV-jobs:gallery_sell_gold_coins')
AddEventHandler('FIXDEV-jobs:gallery_sell_gold_coins', function()
    exports['FIXDEV-interface']:openApplication('textbox', {
        callbackUrl = 'FIXDEV-jobs:galleryGoldcoin',
        key = 1,
        items = {
          {
            icon = "gem",
            label = "How Many Gold Coin\'s.",
            name = "pGoldCoinAmount",
          },
        },
        show = true,
      })
end)

RegisterUICallback('FIXDEV-jobs:galleryGoldcoin', function(data, cb)
    cb({ data = {}, meta = { ok = true, message = '' } })
    local pGoldCointAmt = data.values.pGoldCoinAmount
        if exports['FIXDEV-inventory']:hasEnoughOfItem('goldcoin', pGoldCointAmt) then
        FreezeEntityPosition(PlayerPedId(), true)
         local finished = exports['FIXDEV-taskbar']:taskBar(2000*pGoldCointAmt, 'Selling Golden Coins')
         if finished == 100 then
            if exports['FIXDEV-inventory']:hasEnoughOfItem('goldcoin', pGoldCointAmt) then
                TriggerEvent('inventory:removeItem', 'goldcoin', pGoldCointAmt)
                TriggerServerEvent('FIXDEV-financials:business_money', 85*pGoldCointAmt, 'gallery', 'add') 
                TriggerEvent("DoLongHudText", "You sold " .. pGoldCointAmt .. " Golden Coins for $" .. 85*pGoldCointAmt .. "")
                FreezeEntityPosition(PlayerPedId(), false)
            end
         else
             FreezeEntityPosition(PlayerPedId(), false)
             TriggerEvent('DoLongHudText', 'Might wanna try again', 2)
         end
    end
end)

 --Valuable Goods

RegisterNetEvent('FIXDEV-jobs:gallery_sell_val_goods')
AddEventHandler('FIXDEV-jobs:gallery_sell_val_goods', function()
    exports['FIXDEV-interface']:openApplication('textbox', {
        callbackUrl = 'FIXDEV-jobs:galleryVG',
        key = 1,
        items = {
          {
            icon = "gem",
            label = "How Many Valuable Good\'s.",
            name = "pVGAmount",
          },
        },
        show = true,
      })
end)

RegisterUICallback('FIXDEV-jobs:galleryVG', function(data, cb)
    cb({ data = {}, meta = { ok = true, message = '' } })
    local pVGAmt = data.values.pVGAmount
        if exports['FIXDEV-inventory']:hasEnoughOfItem('valuablegoods', pVGAmt) then
        FreezeEntityPosition(PlayerPedId(), true)
         local finished = exports['FIXDEV-taskbar']:taskBar(2000*pVGAmt, 'Selling Valuable Goods')
         if finished == 100 then
            if exports['FIXDEV-inventory']:hasEnoughOfItem('valuablegoods', pVGAmt) then
                TriggerEvent('inventory:removeItem', 'valuablegoods', pVGAmt)
                TriggerServerEvent('FIXDEV-financials:business_money', 352*pVGAmt, 'gallery', 'add') 
                TriggerEvent("DoLongHudText", "You sold " .. pVGAmt .. " Valuable Goods for $" .. 352*pVGAmt .. "")
                FreezeEntityPosition(PlayerPedId(), false)
             else
                 FreezeEntityPosition(PlayerPedId(), false)
                 TriggerEvent('DoLongHudText', 'Might wanna try again', 2)
             end
        end
    end 
end)

 --Golden Bars

RegisterNetEvent('FIXDEV-jobs:gallery_sell_gold_bars')
AddEventHandler('FIXDEV-jobs:gallery_sell_gold_bars', function()
    exports['FIXDEV-interface']:openApplication('textbox', {
        callbackUrl = 'FIXDEV-jobs:galleryGoldBar',
        key = 1,
        items = {
          {
            icon = "gem",
            label = "How Many Gold Bar\'s.",
            name = "pGoldAmount",
          },
        },
        show = true,
      })
end)

RegisterUICallback('FIXDEV-jobs:galleryGoldBar', function(data, cb)
    cb({ data = {}, meta = { ok = true, message = '' } })
    local pGoldAmt = data.values.pGoldAmount
    if exports['FIXDEV-inventory']:hasEnoughOfItem('goldbar', pGoldAmt) then
        FreezeEntityPosition(PlayerPedId(), true)
         local finished = exports['FIXDEV-taskbar']:taskBar(2000*pGoldAmt, 'Selling Valuable Goods')
         if finished == 100 then
            if exports['FIXDEV-inventory']:hasEnoughOfItem('goldbar', pGoldAmt) then
                TriggerEvent('inventory:removeItem', 'goldbar', pGoldAmt)
                TriggerServerEvent('FIXDEV-financials:business_money', 2000*pGoldAmt, 'gallery', 'add') 
                TriggerEvent("DoLongHudText", "You sold " .. pGoldAmt .. " Gold Bars for $" .. 2000*pGoldAmt .. "")
                FreezeEntityPosition(PlayerPedId(), false)
             else
                 FreezeEntityPosition(PlayerPedId(), false)
                 TriggerEvent('DoLongHudText', 'Might wanna try again', 2)
             end
        end
    end
end)

 --Rolex Watch

RegisterNetEvent('FIXDEV-jobs:gallery_sell_rolex_watch')
AddEventHandler('FIXDEV-jobs:gallery_sell_rolex_watch', function()
    exports['FIXDEV-interface']:openApplication('textbox', {
        callbackUrl = 'FIXDEV-jobs:galleryRolexWatch',
        key = 1,
        items = {
          {
            icon = "gem",
            label = "How Many Rolex Watch\'s.",
            name = "pRolexAmount",
          },
        },
        show = true,
      })
end)

RegisterUICallback('FIXDEV-jobs:galleryRolexWatch', function(data, cb)
    cb({ data = {}, meta = { ok = true, message = '' } })
    local pRolexAmt = data.values.pRolexAmount
    if exports['FIXDEV-inventory']:hasEnoughOfItem('rolexwatch', pRolexAmt) then
        FreezeEntityPosition(PlayerPedId(), true)
         local finished = exports['FIXDEV-taskbar']:taskBar(2000*pRolexAmt, 'Selling Rolex Watche\'s')
         if finished == 100 then
            if exports['FIXDEV-inventory']:hasEnoughOfItem('rolexwatch', pRolexAmt) then
                TriggerEvent('inventory:removeItem', 'rolexwatch', pRolexAmt)
                TriggerServerEvent('FIXDEV-financials:business_money', 114*pRolexAmt, 'gallery', 'add') 
                TriggerEvent("DoLongHuDText", "You Sold " .. pRolexAmt .. " Rolex Watche\'s For $" .. 114*pRolexAmt .. "!", 1)
                FreezeEntityPosition(PlayerPedId(), false)
            end
         else
             FreezeEntityPosition(PlayerPedId(), false)
             TriggerEvent('DoLongHudText', 'Might wanna try again', 2)
         end
    end
end)

 --8CT Chains

RegisterNetEvent('FIXDEV-jobs:gallery_sell_8ct_chains')
AddEventHandler('FIXDEV-jobs:gallery_sell_8ct_chains', function()
    exports['FIXDEV-interface']:openApplication('textbox', {
        callbackUrl = 'FIXDEV-jobs:gallery8Ct',
        key = 1,
        items = {
          {
            icon = "gem",
            label = "How Many 8 CT Chain\'s.",
            name = "p8ctAmount",
          },
        },
        show = true,
      })
end)

RegisterUICallback('FIXDEV-jobs:gallery8Ct', function(data, cb)
    cb({ data = {}, meta = { ok = true, message = '' } })
    local p8CTAmt = data.values.p8ctAmount
    if exports['FIXDEV-inventory']:hasEnoughOfItem('stolen8ctchain', p8CTAmt) then
        FreezeEntityPosition(PlayerPedId(), true)
         local finished = exports['FIXDEV-taskbar']:taskBar(2000*p8CTAmt, 'Selling Ruby\'s')
         if finished == 100 then
            if exports['FIXDEV-inventory']:hasEnoughOfItem('stolen8ctchain', p8CTAmt) then
                TriggerEvent('inventory:removeItem', 'stolen8ctchain', p8CTAmt)
                TriggerServerEvent('FIXDEV-financials:business_money', 25*p8CTAmt, 'gallery', 'add') 
                TriggerEvent("DoLongHudText", "You sold " .. p8CTAmt .. " 8 Carat Chains for $" .. 25*p8CTAmt .. "")
                FreezeEntityPosition(PlayerPedId(), false)
            end
         else
             FreezeEntityPosition(PlayerPedId(), false)
             TriggerEvent('DoLongHudText', 'Might wanna try again', 2)
         end
    end
end)

 --Ruby

 --Mining Ruby

RegisterNetEvent('FIXDEV-jobs:gellery_sell_ruby')
AddEventHandler('FIXDEV-jobs:gellery_sell_ruby', function()
    exports['FIXDEV-interface']:openApplication('textbox', {
        callbackUrl = 'FIXDEV-jobs:galleryRuby',
        key = 1,
        items = {
          {
            icon = "gem",
            label = "How Many Ruby\'s.",
            name = "pRubyAmount",
          },
        },
        show = true,
      })
end)

RegisterUICallback('FIXDEV-jobs:galleryRuby', function(data, cb)
    cb({ data = {}, meta = { ok = true, message = '' } })
    local pRubyAmt = data.values.pRubyAmount
    if exports['FIXDEV-inventory']:hasEnoughOfItem('miningruby', pRubyAmt) then
        FreezeEntityPosition(PlayerPedId(), true)
         local finished = exports['FIXDEV-taskbar']:taskBar(2000*pRubyAmt, 'Selling Ruby\'s')
         if finished == 100 then
            if exports['FIXDEV-inventory']:hasEnoughOfItem('miningruby', pRubyAmt) then
                TriggerEvent('inventory:removeItem', 'miningruby', pRubyAmt)
                TriggerServerEvent('FIXDEV-financials:business_money', 100*pRubyAmt, 'gallery', 'add')
                TriggerEvent("DoLongHudText", "You sold " .. pRubyAmt .. " Ruby\'s for $" .. 100*pRubyAmt .. "!", 1)
                FreezeEntityPosition(PlayerPedId(), false)
            end
         else
             FreezeEntityPosition(PlayerPedId(), false)
             TriggerEvent('DoLongHudText', 'Might wanna try again', 2)
         end
    end
end)

 --Starry Night

RegisterNetEvent('FIXDEV-jobs:gellery_sell_night')
AddEventHandler('FIXDEV-jobs:gellery_sell_night', function()
    exports['FIXDEV-interface']:openApplication('textbox', {
        callbackUrl = 'FIXDEV-jobs:galleryNight',
        key = 1,
        items = {
          {
            icon = "gem",
            label = "How Many Starry Night\'s.",
            name = "pStarryAmount",
          },
        },
        show = true,
      })
end)

RegisterUICallback('FIXDEV-jobs:galleryNight', function(data, cb)
    cb({ data = {}, meta = { ok = true, message = '' } })
    local pStarryAmt = data.values.pStarryAmount 
    if exports['FIXDEV-inventory']:hasEnoughOfItem('starrynight', pStarryAmt) then
        FreezeEntityPosition(PlayerPedId(), true)
         local finished = exports['FIXDEV-taskbar']:taskBar(2000*pStarryAmt, 'Selling Starry Night')
         if finished == 100 then
            if exports['FIXDEV-inventory']:hasEnoughOfItem('starrynight', pStarryAmt) then
                TriggerEvent('inventory:removeItem', 'starrynight', pStarryAmt)
                TriggerServerEvent('FIXDEV-financials:business_money', 550*pStarryAmt, 'gallery', 'add') 
                TriggerEvent("DoLongHudText", "You sold " .. pStarryAmt .. " Starry Night for $" .. 550*pStarryAmt, 1)
                FreezeEntityPosition(PlayerPedId(), false)
             else
                 FreezeEntityPosition(PlayerPedId(), false)
                 TriggerEvent('DoLongHudText', 'Might wanna try again', 2)
             end
        end
    end
end)

 --// Eye // 

exports["FIXDEV-polytarget"]:AddBoxZone("artgallerysell", vector3(-466.86, 46.12, 46.23), 1, 1, {
    heading=43,
})

exports["FIXDEV-interact"]:AddPeekEntryByPolyTarget("artgallerysell", {
    {
        event = "gallery-menu",
        id = "pTable3322233",
        icon = "circle",
        label = "Sell Gems",
        parameters = {},
    }
}, {
    distance = { radius = 2.5 },
});