exports["FIXDEV-polytarget"]:AddBoxZone("wash_money_bags",  vector3(-1869.77, 2065.76, 135.55), 2, 2, {
    name="wash_money_bags",
    heading=0,
    --debugPoly=false,
    minZ=132.75,
    maxZ=136.75
})

RegisterNetEvent('FIXDEV-winery:cleanBags')
AddEventHandler('FIXDEV-winery:cleanBags', function()
    if exports['FIXDEV-business']:IsEmployedAt('winery') then
        exports['FIXDEV-interface']:openApplication('textbox', {
            callbackUrl = 'FIXDEV-winery:Input',
            key = 1,
            items = {
            {
                icon = "link",
                label = "How many bags.",
                name = "pBagAmt",
            },
            },
            show = true,
        })
    end
end)

RegisterNetEvent('FIXDEV-winery:cleanNotes')
AddEventHandler('FIXDEV-winery:cleanNotes', function()
    if exports['FIXDEV-business']:IsEmployedAt('winery') then
        exports['FIXDEV-interface']:openApplication('textbox', {
            callbackUrl = 'FIXDEV-winery:InputNotes',
            key = 1,
            items = {
            {
                icon = "link",
                label = "How many rolls.",
                name = "pBagAmt",
            },
            },
            show = true,
        })
    end
end)

RegisterUICallback('FIXDEV-winery:Input', function(data, cb)
    cb({ data = {}, meta = { ok = true, message = '' } })
    if exports['FIXDEV-business']:IsEmployedAt('winery') then
        if exports['FIXDEV-inventory']:hasEnoughOfItem('inkset', data.values.pBagAmt) then
            TriggerEvent('inventory:removeItem', 'inkset', data.values.pBagAmt)
            RPC.execute('FIXDEV-jobs:givePayout', data.values.pBagAmt*math.random(180, 250), 'cash', 'Winery Cleaning '..data.values.pBagAmt..'x Inked Money Bags.')
        end
    end
end)

RegisterUICallback('FIXDEV-winery:InputNotes', function(data, cb)
    cb({ data = {}, meta = { ok = true, message = '' } })
    if exports['FIXDEV-business']:IsEmployedAt('winery') then
        if exports['FIXDEV-inventory']:hasEnoughOfItem('rollcash', data.values.pBagAmt) then
            TriggerEvent('inventory:removeItem', 'rollcash', data.values.pBagAmt)
            RPC.execute('FIXDEV-jobs:givePayout', data.values.pBagAmt*math.random(120, 200), 'cash', 'Winery Cleaning '..data.values.pBagAmt..'x Rolls Of Cash.')
        end
    end
end)

exports["FIXDEV-interact"]:AddPeekEntryByPolyTarget("wash_money_bags", {{
    event = "FIXDEV-winery:cleanBags",
    id = "wash_money_bags",
    icon = "circle",
    label = "Wash Bags",
    parameters = {},
}}, {
    distance = { radius = 5 },
});

exports["FIXDEV-interact"]:AddPeekEntryByPolyTarget("wash_money_bags", {{
    event = "FIXDEV-winery:cleanNotes",
    id = "wash_money_notes",
    icon = "circle",
    label = "Wash Notes",
    parameters = {},
}}, {
    distance = { radius = 5 },
});

-- // Stash // --

exports["FIXDEV-polytarget"]:AddBoxZone("mmmm", vector3(-1871.03, 2059.12, 135.44), 2, 1.2, {
    heading=0,
    minZ=132.04,
    maxZ=136.04
})

 exports["FIXDEV-interact"]:AddPeekEntryByPolyTarget("mmmm", {{
    event = "FIXDEV-jobs:wineryStash",
    id = "mmmm",
    icon = "box",
    label = "Stash",
    parameters = {},
}}, {
    distance = { radius = 2.5 },
});

RegisterNetEvent('FIXDEV-jobs:wineryStash')
AddEventHandler('FIXDEV-jobs:wineryStash', function()
    TriggerEvent('server-inventory-open', '1', 'stash-winery')

end)