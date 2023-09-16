SIGNED_IN = false
CURRENT_RESTAURANT = nil
SERVER_CODE = 'wl'

local activePurchases = {}

local debugMode = GetConvar('sv_environment', 'prod') == 'debug'

function isSignedOn()
    return SIGNED_IN or CURRENT_RESTAURANT == 'prison_cooks'
end

function signOff()
    SIGNED_IN = false
    TriggerEvent("DoLongHudText", _L("restaurant-clocked-out", "Clocked out."))
end

AddEventHandler('FIXDEV-restaurants:signOnPrompt', function(pParameters, pEntity, pContext)
    local biz = pContext.zones['restaurant_sign_on'].biz
    local type = pContext.zones['restaurant_sign_on'].type
    SIGNED_IN, langString, message = RPC.execute("FIXDEV-restaurants:joinJob", biz, type)
    TriggerEvent("DoLongHudText", _L(langString, message))
end)

AddEventHandler('FIXDEV-restaurants:signOffPrompt', function(pParameters, pEntity, pContext)
    local biz = pContext.zones['restaurant_sign_on'].biz
    RPC.execute("FIXDEV-restaurants:leaveJob", biz)
    signOff()
end)

RegisterNetEvent('FIXDEV-restaurants:forceLeaveJob', function()
    signOff()
end)

AddEventHandler('FIXDEV-restaurants:viewActiveEmployees', function(pParameters, pEntity, pContext)
    local biz = pContext.zones['restaurant_sign_on'].biz
    local employees = RPC.execute('FIXDEV-restaurants:getActiveEmployees', biz)

    local mappedEmployees = {}

    for _, employee in pairs(employees) do
        local fancyLocationName = GetBusinessConfig(biz).name
        table.insert(mappedEmployees, {
            title = string.format("%s (%s)", employee.name, employee.cid),
            description = string.format(_L("restaurant-clocked-in-at", "Clocked in at %s"), fancyLocationName),
        })
    end
    if #mappedEmployees == 0 then
        table.insert(mappedEmployees, {
            title = _L("restaurant-no-active-employees", "Nobody is clocked in currently"),
        })
    end

    exports['FIXDEV-ui']:showContextMenu(mappedEmployees)
end)

AddEventHandler('FIXDEV-restaurants:makePayment', function(pParameters, pEntity, pContext)
    local id = pContext.zones['restaurant_registers'].id
    local biz = pContext.zones['restaurant_registers'].biz

    local activeRegisterId = id
    local activeRegister = activePurchases[activeRegisterId]
    if not activeRegister or activeRegister == nil then
        TriggerEvent("DoLongHudText", _L("restaurant-no-active-purchase", "No purchase active."))
        return
    end
    local priceWithTax = RPC.execute("PriceWithTaxString", activeRegister.cost, "Goods")
    local acceptContext = {
        {
            title = _L("restaurant-make-payment", "Restaurant Purchase"),
            description = "$" .. priceWithTax.text .. " | " .. activeRegister.comment,
        },
        {
            title = _L("restaurant-accept-purchase", "Purchase with Bank"),
            action = "FIXDEV-restaurants:finishPurchasePrompt",
            icon = 'credit-card',
            key = {cost = activeRegister.cost, comment = activeRegister.comment, registerId = id, charger = activeRegister.charger, biz = biz, cash = false},
        },
        {
            title = _L("restaurant-cash-purchase", "Purchase with Cash"),
            action = "FIXDEV-restaurants:finishPurchasePrompt",
            icon = 'money-bill',
            key = {cost = activeRegister.cost, comment = activeRegister.comment, registerId = id, charger = activeRegister.charger, biz = biz, cash = true},
        }
    }
    exports['FIXDEV-ui']:showContextMenu(acceptContext)
end)

RegisterUICallback('FIXDEV-restaurants:finishPurchasePrompt', function (data, cb)
    cb({ data = {}, meta = { ok = true, message = '' } })
    local success = RPC.execute("FIXDEV-restaurants:completePurchase", data.key)
    if not success then
        TriggerEvent("DoLongHudText", _L("restaurant-could-not-complete-purchase", "The purchase could not be completed."))
    end
end)

AddEventHandler('FIXDEV-restaurants:chargeCustomer', function(pParameters, pEntity, pContext)
    local id = pContext.zones['restaurant_registers'].id
    local biz = pContext.zones['restaurant_registers'].biz

    local elements = {
     {
            icon = "dollar-sign",
            label = _L("restaurant-cost", "Cost"),
            name = "cost",
        },
        {
            icon = "pencil-alt",
            label = _L("restaurant-comment", "Comment"),
            name = "comment",
        },
    }

    local prompt = exports['FIXDEV-ui']:OpenInputMenu(elements)

    if not prompt then return end

    local cost = tonumber(prompt.cost)
    local comment = prompt.comment
    --check if cost is actually a number
    if cost == nil or not cost then return end
    if comment == nil then comment = "" end

    if cost < 5 then cost = 5 end --Minimum $10

    --Send event to everyone indicating a purchase is ready at specified register
    RPC.execute("FIXDEV-restaurants:startPurchase", {cost = cost, comment = comment, registerId = id})
end)

RegisterNetEvent('FIXDEV-restaurants:activePurchase', function(data)
    activePurchases[data.registerId] = data
end)

RegisterNetEvent('FIXDEV-restaurants:closePurchase', function(data)
    activePurchases[data.registerId] = nil
end)

AddEventHandler('FIXDEV-polyzone:enter', function(pZone, pData)
    if pZone == 'restaurant_buff_zone' then
        CURRENT_RESTAURANT = pData.id
        TriggerEvent("FIXDEV-buffs:inDoubleBuffZone", true, pData.id)
        checkForHeadset()
    end

    if pZone == 'restaurant_bs_drivethru' then
        enterDriveThru()
    end
end)

AddEventHandler('FIXDEV-polyzone:exit', function(pZone, pData)
    if pZone == 'restaurant_buff_zone' then
        if SIGNED_IN then
            SIGNED_IN = false
            RPC.execute("FIXDEV-restaurants:leaveJob", CURRENT_RESTAURANT)
            TriggerEvent("DoLongHudText", _L("restaurant-clocked-out-distance", "You went too far away! Clocked out."))
        end
        CURRENT_RESTAURANT = nil
        TriggerEvent("FIXDEV-buffs:inDoubleBuffZone", false)
        turnOffHeadset()
    end

    if pZone == 'restaurant_bs_drivethru' then
        exitDriveThru()
    end
end)

AddEventHandler("FIXDEV-restaurants:silentAlarm", function()
    local finished = exports["FIXDEV-taskbar"]:taskBar(4000, _L("foodchain-pressing-alarm", "Pressing Alarm"))
    if finished ~= 100 then return end
    TriggerServerEvent("FIXDEV-restaurants:triggerSilentAlarm", GetEntityCoords(PlayerPedId()))
end)
