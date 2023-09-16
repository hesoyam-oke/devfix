RegisterNetEvent('FIXDEV-jobs:make_pizza_base')
AddEventHandler('FIXDEV-jobs:make_pizza_base', function()
    local isEmployed = exports["FIXDEV-business"]:IsEmployedAt("maldinis")
    if isEmployed then
        if exports['FIXDEV-inventory']:hasEnoughOfItem('dough', 1) then
            TriggerEvent('animation:PlayAnimation', 'cokecut')
            SetEntityHeading(PlayerPedId(), 87.765464)
            FreezeEntityPosition(PlayerPedId(), true)
            local RollingDough = exports['FIXDEV-taskbar']:taskBar(5000, 'Rolling Dough into Pizza Base')
            if RollingDough == 100 then
                FreezeEntityPosition(PlayerPedId(), false)
                TriggerEvent('inventory:removeItem', 'dough', 1)
                TriggerEvent('player:receiveItem', 'pizzabase', 1)
            else
                FreezeEntityPosition(PlayerPedId(), false)
            end
        end
    else
        TriggerEvent('DoLongHudText', 'You dont work at maldinis.', 2)
    end
end)

RegisterNetEvent('FIXDEV-jobs:make_pepperoni')
AddEventHandler('FIXDEV-jobs:make_pepperoni', function()
    local isEmployed = exports["FIXDEV-business"]:IsEmployedAt("maldinis")
    if isEmployed then
        if exports['FIXDEV-inventory']:hasEnoughOfItem('pizzabase', 1) and exports['FIXDEV-inventory']:hasEnoughOfItem('pizzasauce', 1) and exports['FIXDEV-inventory']:hasEnoughOfItem('pepperoni', 10) and exports['FIXDEV-inventory']:hasEnoughOfItem('cheese', 1) then
            TriggerEvent('animation:PlayAnimation', 'cokecut')
            SetEntityHeading(PlayerPedId(), 3.2849636)
            FreezeEntityPosition(PlayerPedId(), true)
            local PepperoniPizza1 = exports['FIXDEV-taskbar']:taskBar(7500, 'Preparing Pepperoni Pizza.')
            if PepperoniPizza1 == 100 then
                FreezeEntityPosition(PlayerPedId(), false)
                TriggerEvent('inventory:removeItem', 'pizzabase', 1)
                TriggerEvent('inventory:removeItem', 'pizzasauce', 1)
                TriggerEvent('inventory:removeItem', 'pepperoni', 10)
                TriggerEvent('inventory:removeItem', 'cheese', 1)
                TriggerEvent('player:receiveItem', 'pepperonipizza', 1)
            else
                FreezeEntityPosition(PlayerPedId(), false)
            end
        else
            TriggerEvent('DoLongHudText', 'You do not have the required ingridients.', 2)
        end
    else
        TriggerEvent('DoLongHudText', 'You do not work at Maldinis.', 2)
    end
end)

RegisterNetEvent('FIXDEV-jobs:make_plain_pizza')
AddEventHandler('FIXDEV-jobs:make_plain_pizza', function()
    local isEmployed = exports["FIXDEV-business"]:IsEmployedAt("maldinis")
    if isEmployed then
        if exports['FIXDEV-inventory']:hasEnoughOfItem('pizzabase', 1) and exports['FIXDEV-inventory']:hasEnoughOfItem('pizzasauce', 1) and exports['FIXDEV-inventory']:hasEnoughOfItem('cheese', 1) then
            TriggerEvent('animation:PlayAnimation', 'cokecut')
            SetEntityHeading(PlayerPedId(), 3.2849636)
            FreezeEntityPosition(PlayerPedId(), true)
            local PepperoniPizza1 = exports['FIXDEV-taskbar']:taskBar(7500, 'Preparing Margherita Pizza.')
            if PepperoniPizza1 == 100 then
                FreezeEntityPosition(PlayerPedId(), false)
                TriggerEvent('inventory:removeItem', 'pizzabase', 1)
                TriggerEvent('inventory:removeItem', 'pizzasauce', 1)
                TriggerEvent('inventory:removeItem', 'cheese', 1)
                TriggerEvent('player:receiveItem', 'margheritapizza', 1)
            else
                FreezeEntityPosition(PlayerPedId(), false)
            end
        else
            TriggerEvent('DoLongHudText', 'You dont have the required ingridients.', 2)
        end
    else
        TriggerEvent('DoLongHudText', 'You do not work at Maldinis.', 2)
    end
end)

RegisterNetEvent('FIXDEV-jobs:make_bbq_pizza')
AddEventHandler('FIXDEV-jobs:make_bbq_pizza', function()
    local isEmployed = exports["FIXDEV-business"]:IsEmployedAt("maldinis")
    if isEmployed then
        if exports['FIXDEV-inventory']:hasEnoughOfItem('pizzabase', 1) and exports['FIXDEV-inventory']:hasEnoughOfItem('bbqsauce', 1) and exports['FIXDEV-inventory']:hasEnoughOfItem('cheese', 1) then
            TriggerEvent('animation:PlayAnimation', 'cokecut')
            SetEntityHeading(PlayerPedId(), 3.2849636)
            FreezeEntityPosition(PlayerPedId(), true)
            local PepperoniPizza1 = exports['FIXDEV-taskbar']:taskBar(7500, 'Preparing BBQ Pizza.')
            if PepperoniPizza1 == 100 then
                FreezeEntityPosition(PlayerPedId(), false)
                TriggerEvent('inventory:removeItem', 'pizzabase', 1)
                TriggerEvent('inventory:removeItem', 'bbqsauce', 1)
                TriggerEvent('inventory:removeItem', 'cheese', 1)
                TriggerEvent('player:receiveItem', 'bbqpizza', 1)
            else
                FreezeEntityPosition(PlayerPedId(), false)
            end
        else
            TriggerEvent('DoLongHudText', 'You dont have the required ingridients.', 2)
        end
    else
        TriggerEvent('DoLongHudText', 'You do not work at Maldinis.', 2)
    end
end)

RegisterNetEvent('FIXDEV-jobs:make_pizzas')
AddEventHandler('FIXDEV-jobs:make_pizzas', function()
    local isEmployed = exports["FIXDEV-business"]:IsEmployedAt("maldinis")
    if isEmployed then
        local MakeP = {
            {
                title = "Make Maldini Pizzas",
            },
            {
                title = "Peperoni Pizza",
                description = "Required Ingridients: 10x Pepperonis | 1x Pizza Base | 1x Pizza Sauce | 1x Cheese",
                key = "PP",
                action = 'FIXDEV-jobs:make_pp',
            },
            {
                title = "Margherita Pizza",
                description = "Required Ingridients: 1x Pizza Base | 1x Pizza Sauce | 1x Cheese",
                key = "MP",
                action = 'FIXDEV-jobs:make_mp',
            },
            {
                title = "BBQ Pizza",
                description = "Required Ingridients: 1x BBQ Sauce | 1x Pizza Base | 1x Cheese",
                key = "BBQ",
                action = 'FIXDEV-jobs:make_bbq',
            },
        }
        exports["FIXDEV-interface"]:showContextMenu(MakeP)
    else
        TriggerEvent('DoLongHudText', 'Fuck off POLITELY', 2)
    end
end)

RegisterUICallback('FIXDEV-jobs:make_pp', function(data, cb)
    cb({ data = {}, meta = { ok = true, message = '' } })
    TriggerEvent('FIXDEV-jobs:make_pepperoni')
end)

RegisterUICallback('FIXDEV-jobs:make_mp', function(data, cb)
    cb({ data = {}, meta = { ok = true, message = '' } })
    TriggerEvent('FIXDEV-jobs:make_plain_pizza')
end)

RegisterUICallback('FIXDEV-jobs:make_bbq', function(data, cb)
    cb({ data = {}, meta = { ok = true, message = '' } })
    TriggerEvent('FIXDEV-jobs:make_bbq_pizza')
end)
 
-- // Fridge

RegisterNetEvent('FIXDEV-jobs:maldinis_fridge')
AddEventHandler('FIXDEV-jobs:maldinis_fridge', function()
    local Maldini = exports['FIXDEV-business']:IsEmployedAt('maldinis')
    if Maldini then
        TriggerEvent("server-inventory-open", "222", "Shop")
    else
        TriggerEvent('DoLongHudText', 'You do not work here.', 2)
    end
end)



----------------------------------------

RegisterNetEvent('FIXDEV-jobs:maldinis-drinks')
AddEventHandler('FIXDEV-jobs:maldinis-drinks', function()
    local isEmployed = exports["FIXDEV-business"]:IsEmployedAt("maldinis")
    if isEmployed then
        local BurgershotDrinks = {
            {
                title = 'Maldinis Drinks',
            },
            {
                title = "Pour Cola",
                description = "Pour a nice refreshing Cola",
                key = "Pour.Cola",
                action = 'FIXDEV-maldinis:cola',
            },
            {
                title = "Pour Cup Of Water",
                description = "Pour a Cup Of Water",
                key = "Pour.Water",
                action = 'FIXDEV-maldinis:water',
            },
        }
        exports["FIXDEV-interface"]:showContextMenu(BurgershotDrinks)
    else
        TriggerEvent('DoLongHudText', 'You do not work here.', 2)
    end
end)



RegisterNetEvent("FIXDEV-maldinis:getcola")
AddEventHandler("FIXDEV-maldinis:getcola", function()
    local isEmployed = exports["FIXDEV-business"]:IsEmployedAt("maldinis")
    if isEmployed then  
        if exports['FIXDEV-inventory']:hasEnoughOfItem('sugarbs', 1) then  
        SetEntityHeading(PlayerPedId(), 249.88976287842)
        TriggerEvent("animation:PlayAnimation","browse")
        FreezeEntityPosition(PlayerPedId(),true)
        local finished = exports['FIXDEV-taskbar']:taskBar(10000, 'Pouring Cola')
        if (finished == 100) then
            TriggerEvent('player:receiveItem', 'cola', 1)
            TriggerEvent('inventory:removeItem', 'sugarbs', 1)
            FreezeEntityPosition(PlayerPedId(),false)
            ClearPedTasks(PlayerPedId())
            Citizen.Wait(1000)
            TriggerEvent("animation:PlayAnimation","layspike")
            Citizen.Wait(1000)
        else
            FreezeEntityPosition(PlayerPedId(),false)
        end
    else
        TriggerEvent('DoLongHudText',"You need more sugar (Required Amount: x1)",2)
    end
else
    TriggerEvent('DoLongHudText', 'You dont work here', 2)
end
end)

RegisterNetEvent('FIXDEV-maldinis:get_water')
AddEventHandler('FIXDEV-maldinis:get_water', function()
    local isEmployed = exports["FIXDEV-business"]:IsEmployedAt("maldinis")
    if isEmployed then
        SetEntityHeading(PlayerPedId(), 249.88976287842)
        TriggerEvent("animation:PlayAnimation","browse")
        FreezeEntityPosition(PlayerPedId(),true)
        local finished = exports['FIXDEV-taskbar']:taskBar(10000, 'Pouring Water')
        if (finished == 100) then
            TriggerEvent('player:receiveItem', 'water', 1)
            FreezeEntityPosition(PlayerPedId(),false)
            ClearPedTasks(PlayerPedId())
        else
            FreezeEntityPosition(PlayerPedId(),false)
        end
    end
end)

RegisterUICallback('FIXDEV-maldinis:cola', function(data, cb)
    cb({ data = {}, meta = { ok = true, message = '' } })
    TriggerEvent('FIXDEV-maldinis:getcola')
end)

RegisterUICallback('FIXDEV-maldinis:water', function(data, cb)
    cb({ data = {}, meta = { ok = true, message = '' } })
    TriggerEvent('FIXDEV-maldinis:get_water')
end)

-- Poly Target Shit --

exports["FIXDEV-polytarget"]:AddCircleZone("pizza_dough",  vector3(809.35, -761.23, 26.78), 0.35, {
    useZ = true
})


exports["FIXDEV-interact"]:AddPeekEntryByPolyTarget("pizza_dough", {{
    event = "FIXDEV-jobs:make_pizza_base",
    id = "pizza_dough",
    icon = "hand-holding",
    label = "Roll Dough",
    parameters = {},
}}, {
    distance = { radius = 2.5 },
});

exports["FIXDEV-polytarget"]:AddCircleZone("maldini_pizza",  vector3(807.54, -756.87, 26.58), 0.4, {
    useZ = true
})

exports["FIXDEV-interact"]:AddPeekEntryByPolyTarget("maldini_pizza", {{
    event = "FIXDEV-jobs:make_pizzas",
    id = "maldini_pizza",
    icon = "circle",
    label = "Prepare Food",
    parameters = {},
}}, {
    distance = { radius = 2.5 },
}); 

-- Tables --

-- Maldinis Tables

exports["FIXDEV-polytarget"]:AddBoxZone("table_1_maldinis",  vector3(807.0, -751.52, 26.78), 1, 1.0, {
    heading=0,
    --debugPoly=false,
    minZ=22.98,
    maxZ=26.98
})

exports["FIXDEV-interact"]:AddPeekEntryByPolyTarget("table_1_maldinis", {{
    event = "FIXDEV-jobs:maldinis-1",
    id = "table_1_maldinis",
    icon = "boxes",
    label = "Table",
    parameters = {},
}}, {
    distance = { radius = 2.5 },
});

exports["FIXDEV-polytarget"]:AddBoxZone("table_2_maldinis",  vector3(803.11, -751.53, 26.78), 1, 1, {
    heading=0,
    --debugPoly=false,
    minZ=22.78,
    maxZ=26.78
})

exports["FIXDEV-interact"]:AddPeekEntryByPolyTarget("table_2_maldinis", {{
    event = "FIXDEV-jobs:maldinis-2",
    id = "table_2_maldinis",
    icon = "boxes",
    label = "Table",
    parameters = {},
}}, {
    distance = { radius = 2.5 },
});

exports["FIXDEV-polytarget"]:AddBoxZone("table_3_maldinis",  vector3(799.14, -751.56, 26.78), 1, 1, {
    heading=0,
    --debugPoly=false,
    minZ=22.78,
    maxZ=26.78
})

exports["FIXDEV-interact"]:AddPeekEntryByPolyTarget("table_3_maldinis", {{
    event = "FIXDEV-jobs:maldinis-3",
    id = "table_3_maldinis",
    icon = "boxes",
    label = "Table",
    parameters = {},
}}, {
    distance = { radius = 2.5 },
});

exports["FIXDEV-polytarget"]:AddBoxZone("table_4_maldinis",  vector3(798.04, -748.87, 26.78), 1, 1, {
    heading=0,
    --debugPoly=false,
    minZ=22.78,
    maxZ=26.78
})

exports["FIXDEV-interact"]:AddPeekEntryByPolyTarget("table_4_maldinis", {{
    event = "FIXDEV-jobs:maldinis-4",
    id = "table_4_maldinis",
    icon = "boxes",
    label = "Table",
    parameters = {},
}}, {
    distance = { radius = 2.5 },
});

exports["FIXDEV-polytarget"]:AddBoxZone("table_5_maldinis",  vector3(795.25, -751.52, 26.78), 1, 1, {
    heading=0,
    --debugPoly=false,
    minZ=22.78,
    maxZ=26.78
})

exports["FIXDEV-interact"]:AddPeekEntryByPolyTarget("table_5_maldinis", {{
    event = "FIXDEV-jobs:maldinis-5",
    id = "table_5_maldinis",
    icon = "boxes",
    label = "Table",
    parameters = {},
}}, {
    distance = { radius = 2.5 },
});

exports["FIXDEV-polytarget"]:AddBoxZone("table_6_maldinis",  vector3(799.34, -754.97, 26.78), 1, 1, {
    heading=0,
    --debugPoly=false,
    minZ=22.78,
    maxZ=26.78
})

exports["FIXDEV-interact"]:AddPeekEntryByPolyTarget("table_6_maldinis", {{
    event = "FIXDEV-jobs:maldinis-6",
    id = "table_6_maldinis",
    icon = "boxes",
    label = "Table",
    parameters = {},
}}, {
    distance = { radius = 2.5 },
});

exports["FIXDEV-polytarget"]:AddBoxZone("table_7_maldinis",  vector3(807.71, -754.79, 26.78), 2, 0.7, {
    heading=0,
    --debugPoly=false,
    minZ=22.98,
    maxZ=26.98
})

exports["FIXDEV-interact"]:AddPeekEntryByPolyTarget("table_7_maldinis", {{
    event = "FIXDEV-jobs:maldinis-7",
    id = "table_7_maldinis",
    icon = "boxes",
    label = "Table",
    parameters = {},
}}, {
    distance = { radius = 2.5 },
});

exports["FIXDEV-polytarget"]:AddBoxZone("table_8_maldinis",  vector3(805.58, -754.92, 26.78), 2, 0.7, {
    heading=0,
    --debugPoly=false,
    minZ=22.98,
    maxZ=26.98
})

exports["FIXDEV-interact"]:AddPeekEntryByPolyTarget("table_8_maldinis", {{
    event = "FIXDEV-jobs:maldinis-8",
    id = "table_8_maldinis",
    icon = "boxes",
    label = "Table",
    parameters = {},
}}, {
    distance = { radius = 2.5 },
});

exports["FIXDEV-polytarget"]:AddBoxZone("table_9_maldinis",  vector3(803.54, -754.9, 26.78), 2, 0.7, {
    heading=0,
    --debugPoly=false,
    minZ=22.78,
    maxZ=26.78
})

exports["FIXDEV-interact"]:AddPeekEntryByPolyTarget("table_9_maldinis", {{
    event = "FIXDEV-jobs:maldinis-9",
    id = "table_9_maldinis",
    icon = "boxes",
    label = "Table",
    parameters = {},
}}, {
    distance = { radius = 2.5 },
});

exports["FIXDEV-polytarget"]:AddBoxZone("table_10_maldinis",  vector3(801.42, -754.83, 26.78), 2, 0.7, {
    heading=0,
    --debugPoly=false,
    minZ=22.78,
    maxZ=26.78
})

exports["FIXDEV-interact"]:AddPeekEntryByPolyTarget("table_10_maldinis", {{
    event = "FIXDEV-jobs:maldinis-10",
    id = "table_10_maldinis",
    icon = "boxes",
    label = "Table",
    parameters = {},
}}, {
    distance = { radius = 2.5 },
});

exports["FIXDEV-polytarget"]:AddBoxZone("table_11_maldinis",  vector3(799.32, -757.63, 26.78), 0.7, 1.5, {
    heading=0,
    --debugPoly=false,
    minZ=22.78,
    maxZ=26.78
})

exports["FIXDEV-interact"]:AddPeekEntryByPolyTarget("table_11_maldinis", {{
    event = "FIXDEV-jobs:maldinis-11",
    id = "table_11_maldinis",
    icon = "boxes",
    label = "Table",
    parameters = {},
}}, {
    distance = { radius = 2.5 },
});

exports["FIXDEV-polytarget"]:AddBoxZone("table_12_maldinis",  vector3(799.34, -759.74, 26.78), 0.7, 1.5, {
    heading=0,
    --debugPoly=false,
    minZ=22.78,
    maxZ=26.78
})

exports["FIXDEV-interact"]:AddPeekEntryByPolyTarget("table_12_maldinis", {{
    event = "FIXDEV-jobs:maldinis-12",
    id = "table_12_maldinis",
    icon = "boxes",
    label = "Table",
    parameters = {},
}}, {
    distance = { radius = 2.5 },
});

exports["FIXDEV-interact"]:AddPeekEntryByPolyTarget("maldinis_fridge", {{
    event = "FIXDEV-jobs:maldinis_fridge",
    id = "maldinis_fridge",
    icon = "circle",
    label = "Fridge",
    parameters = {},
}}, {
    distance = { radius = 2.5 },
});

exports["FIXDEV-polytarget"]:AddCircleZone("maldinsdrinks",  vector3(811.48, -765.26, 26.78), 0.5, {
    useZ = true
})


exports["FIXDEV-interact"]:AddPeekEntryByPolyTarget("maldinsdrinks", {{
    event = "FIXDEV-jobs:maldinis-drinks",
    id = "maldinsdrinks",
    icon = "circle",
    label = "Make Drink.",
    parameters = {},
}}, {
    distance = { radius = 1.5 },
});

-- Trays --

exports["FIXDEV-polytarget"]:AddCircleZone("maldinis_tray_1",  vector3(810.86, -751.35, 26.78), 0.45, {
    useZ = true
})

exports["FIXDEV-interact"]:AddPeekEntryByPolyTarget("maldinis_tray_1", {{
    event = "FIXDEV-jobs:maldinis-tray-1",
    id = "maldinis_tray_1",
    icon = "hand-holding",
    label = "Open",
    parameters = {},
}}, {
    distance = { radius = 1.5 },
});

RegisterNetEvent("FIXDEV-jobs:maldinis-tray-1")
AddEventHandler("FIXDEV-jobs:maldinis-tray-1", function()
    TriggerEvent("server-inventory-open", "1", "maldinis-tray-1");
end)

exports["FIXDEV-polytarget"]:AddCircleZone("maldinis_tray_2",  vector3(810.94, -752.84, 26.78), 0.5, {
    useZ = true
})

exports["FIXDEV-interact"]:AddPeekEntryByPolyTarget("maldinis_tray_2", {{
    event = "FIXDEV-jobs:maldinis-tray-2",
    id = "maldinis_tray_2",
    icon = "hand-holding",
    label = "Open",
    parameters = {},
}}, {
    distance = { radius = 1.5 },
});

RegisterNetEvent("FIXDEV-jobs:maldinis-tray-2")
AddEventHandler("FIXDEV-jobs:maldinis-tray-2", function()
    TriggerEvent("server-inventory-open", "1", "maldinis-tray-2");
end)

-- Events --

RegisterNetEvent("FIXDEV-jobs:maldinis-1")
AddEventHandler("FIXDEV-jobs:maldinis-1", function()
    TriggerEvent("server-inventory-open", "1", "maldinis-table-1");
end)

RegisterNetEvent("FIXDEV-jobs:maldinis-2")
AddEventHandler("FIXDEV-jobs:maldinis-2", function()
    TriggerEvent("server-inventory-open", "1", "maldinis-table-2");
end)

RegisterNetEvent("FIXDEV-jobs:maldinis-3")
AddEventHandler("FIXDEV-jobs:maldinis-3", function()
    TriggerEvent("server-inventory-open", "1", "maldinis-table-3");
end)

RegisterNetEvent("FIXDEV-jobs:maldinis-4")
AddEventHandler("FIXDEV-jobs:maldinis-4", function()
    TriggerEvent("server-inventory-open", "1", "maldinis-table-4");
end)

RegisterNetEvent("FIXDEV-jobs:maldinis-5")
AddEventHandler("FIXDEV-jobs:maldinis-5", function()
    TriggerEvent("server-inventory-open", "1", "maldinis-table-5");
end)

RegisterNetEvent("FIXDEV-jobs:maldinis-6")
AddEventHandler("FIXDEV-jobs:maldinis-6", function()
    TriggerEvent("server-inventory-open", "1", "maldinis-table-6");
end)

RegisterNetEvent("FIXDEV-jobs:maldinis-7")
AddEventHandler("FIXDEV-jobs:maldinis-7", function()
    TriggerEvent("server-inventory-open", "1", "maldinis-table-7");
end)

RegisterNetEvent("FIXDEV-jobs:maldinis-8")
AddEventHandler("FIXDEV-jobs:maldinis-8", function()
    TriggerEvent("server-inventory-open", "1", "maldinis-table-8");
end)

RegisterNetEvent("FIXDEV-jobs:maldinis-9")
AddEventHandler("FIXDEV-jobs:maldinis-9", function()
    TriggerEvent("server-inventory-open", "1", "maldinis-table-9");
end)

RegisterNetEvent("FIXDEV-jobs:maldinis-10")
AddEventHandler("FIXDEV-jobs:maldinis-10", function()
    TriggerEvent("server-inventory-open", "1", "maldinis-table-10");
end)

RegisterNetEvent("FIXDEV-jobs:maldinis-11")
AddEventHandler("FIXDEV-jobs:maldinis-11", function()
    TriggerEvent("server-inventory-open", "1", "maldinis-table-11");
end)

RegisterNetEvent("FIXDEV-jobs:maldinis-12")
AddEventHandler("FIXDEV-jobs:maldinis-12", function()
    TriggerEvent("server-inventory-open", "1", "maldinis-table-12");
end)

-- Stash --

RegisterNetEvent('FIXDEV-polyzone:enter')
AddEventHandler('FIXDEV-polyzone:enter', function(name)
    if name == "Maldinis_Stash" then
        Maldinis_Stash = true
        MaldinisStash()
        local isEmployed = exports["FIXDEV-business"]:IsEmployedAt("maldinis")
        if isEmployed then
            exports['FIXDEV-ui']:showInteraction("[E] Stash")
        end
    end
end)

RegisterNetEvent('FIXDEV-polyzone:exit')
AddEventHandler('FIXDEV-polyzone:exit', function(name)
    if name == "Maldinis_Stash" then
        Maldinis_Stash = false
        exports['FIXDEV-ui']:hideInteraction()
    end
end)

function MaldinisStash()
	Citizen.CreateThread(function()
        while Maldinis_Stash do
            Citizen.Wait(5)
			if IsControlJustReleased(0, 38) then
                local isEmployed = exports["FIXDEV-business"]:IsEmployedAt("maldinis")
                if isEmployed then
                    TriggerEvent('server-inventory-open', '1', 'stash-maldinos')
                end
			end
		end
	end)
end

Citizen.CreateThread(function()
    exports["FIXDEV-polyzone"]:AddBoxZone("Maldinis_Stash", vector3(813.65, -749.38, 26.78), 1, 2.6, {
        name="Maldinis_Stash",
        heading=270,
        --debugPoly=false,
        minZ=23.98,
        maxZ=27.98
    })
end)