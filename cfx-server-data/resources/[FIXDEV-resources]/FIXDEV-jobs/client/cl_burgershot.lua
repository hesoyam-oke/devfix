RegisterNetEvent('FIXDEV-jobs:burgershot-warmer')
AddEventHandler('FIXDEV-jobs:burgershot-warmer', function()
    local isEmployed = exports["FIXDEV-business"]:IsEmployedAt("burger_shot")
    if isEmployed then
        TriggerEvent("server-inventory-open", "1", "storage-burger_warmer")
        Wait(1000)
    else
        TriggerEvent('DoLongHudText', 'You do not work here !',2)
    end
end)

RegisterNetEvent("FIXDEV-burgershot:startfryer")
AddEventHandler("FIXDEV-burgershot:startfryer", function()
    local isEmployed = exports["FIXDEV-business"]:IsEmployedAt("burger_shot")
    if isEmployed then
        if exports['FIXDEV-inventory']:hasEnoughOfItem('potato', 1) then
            local dict = 'anim@amb@business@coc@coc_unpack_cut_left@'
            LoadDict(dict)
            FreezeEntityPosition(GetPlayerPed(-1),true)
            TaskPlayAnim(GetPlayerPed(-1), dict, "coke_cut_v1_coccutter", 3.0, -8, -1, 63, 0, 0, 0, 0 )
            SetEntityHeading(GetPlayerPed(-1), 124.72439575195)
            local finished = exports['FIXDEV-taskbar']:taskBar(10000, 'Dropping Fries')
            if (finished == 100) then
                TriggerEvent('player:receiveItem', 'fries', 1)
                TriggerEvent('inventory:removeItem', 'potato', 1)
                FreezeEntityPosition(GetPlayerPed(-1),false)
                ClearPedTasks(GetPlayerPed(-1))
                Citizen.Wait(1000)
            end
        else
            TriggerEvent('DoLongHudText', "You need more patato's (Required Amount: x1)", 2)
        end
    else
        TriggerEvent('DoLongHudText', 'You dont work here', 2)
    end
end)

RegisterNetEvent("FIXDEV-burgershot:makeshake")
AddEventHandler("FIXDEV-burgershot:makeshake", function()
    local isEmployed = exports["FIXDEV-business"]:IsEmployedAt("burger_shot")
    if isEmployed then
        if exports['FIXDEV-inventory']:hasEnoughOfItem('milk', 1) then
        SetEntityHeading(GetPlayerPed(-1), 121.88976287842)
        TriggerEvent("animation:PlayAnimation","browse")
        FreezeEntityPosition(GetPlayerPed(-1),true)
        local finished = exports['FIXDEV-taskbar']:taskBar(10000, 'Making Shake')
        if (finished == 100) then
            TriggerEvent('inventory:removeItem', 'milk', 1)
            TriggerEvent('player:receiveItem', 'mshake', 1)
            FreezeEntityPosition(GetPlayerPed(-1),false)
            ClearPedTasks(GetPlayerPed(-1))
            Citizen.Wait(1000)
            TriggerEvent("animation:PlayAnimation","layspike")
            Citizen.Wait(1000)
        else
            FreezeEntityPosition(GetPlayerPed(-1),false)
        end
    else
        TriggerEvent('DoLongHudText',"You need milk (Required Amount: x1)",2)
    end
else
    TriggerEvent('DoLongHudText', 'You dont work here', 2)
end
end)


RegisterNetEvent("FIXDEV-burgershot:soft-drink")
AddEventHandler("FIXDEV-burgershot:soft-drink", function()
    local isEmployed = exports["FIXDEV-business"]:IsEmployedAt("burger_shot")
    if isEmployed then   
        if exports['FIXDEV-inventory']:hasEnoughOfItem('burgershot_cup', 1) then
        SetEntityHeading(GetPlayerPed(-1), 121.88976287842)
        TriggerEvent("animation:PlayAnimation","browse")
        FreezeEntityPosition(GetPlayerPed(-1),true)
        local finished = exports['FIXDEV-taskbar']:taskBar(10000, 'Making Soft Drink')
        if (finished == 100) then
            TriggerEvent('player:receiveItem', 'softdrink', 1)
            TriggerEvent('inventory:removeItem', 'burgershot_cup', 1)
            FreezeEntityPosition(GetPlayerPed(-1),false)
            ClearPedTasks(GetPlayerPed(-1))
            Citizen.Wait(1000)
        else
            FreezeEntityPosition(GetPlayerPed(-1),false)
        end
    else
        TriggerEvent('DoLongHudText',"Required Ingridients: 1x Sugar | 1x Empty Burgershot Cup",2)
    end
else
    TriggerEvent('DoLongHudText', 'You dont work here', 2)
end
end)

RegisterNetEvent("FIXDEV-burgershot:getcola")
AddEventHandler("FIXDEV-burgershot:getcola", function()
    local isEmployed = exports["FIXDEV-business"]:IsEmployedAt("burger_shot")
    if isEmployed then  
        if exports['FIXDEV-inventory']:hasEnoughOfItem('sugarbs', 1) then  
        SetEntityHeading(GetPlayerPed(-1), 121.88976287842)
        TriggerEvent("animation:PlayAnimation","browse")
        FreezeEntityPosition(GetPlayerPed(-1),true)
        local finished = exports['FIXDEV-taskbar']:taskBar(10000, 'Pouring Cola')
        if (finished == 100) then
            TriggerEvent('player:receiveItem', 'cola', 1)
            TriggerEvent('inventory:removeItem', 'sugarbs', 1)
            FreezeEntityPosition(GetPlayerPed(-1),false)
            ClearPedTasks(GetPlayerPed(-1))
            Citizen.Wait(1000)
            TriggerEvent("animation:PlayAnimation","layspike")
            Citizen.Wait(1000)
        else
            FreezeEntityPosition(GetPlayerPed(-1),false)
        end
    else
        TriggerEvent('DoLongHudText',"You need more sugar (Required Amount: x1)",2)
    end
else
    TriggerEvent('DoLongHudText', 'You dont work here', 2)
end
end)

RegisterNetEvent('FIXDEV-burgershot:get_water')
AddEventHandler('FIXDEV-burgershot:get_water', function()
    local isEmployed = exports["FIXDEV-business"]:IsEmployedAt("burger_shot")
    if isEmployed then
        SetEntityHeading(GetPlayerPed(-1), 121.88976287842)
        TriggerEvent("animation:PlayAnimation","browse")
        FreezeEntityPosition(GetPlayerPed(-1),true)
        local finished = exports['FIXDEV-taskbar']:taskBar(10000, 'Pouring Water')
        if (finished == 100) then
            TriggerEvent('player:receiveItem', 'water', 1)
            FreezeEntityPosition(GetPlayerPed(-1),false)
            ClearPedTasks(GetPlayerPed(-1))
        else
            FreezeEntityPosition(GetPlayerPed(-1),false)
        end
    end
end)

function LoadDict(dict)
    RequestAnimDict(dict)
	while not HasAnimDictLoaded(dict) do
	  	Citizen.Wait(10)
    end
end

--// Counter

RegisterNetEvent('FIXDEV-burgershot:counter')
AddEventHandler('FIXDEV-burgershot:counter', function()
    local isEmployed = exports["FIXDEV-business"]:IsEmployedAt("burger_shot")
    if isEmployed then
		TriggerEvent("server-inventory-open", "1", "counter-burger_shot")
		Wait(1000)
else
    TriggerEvent('DoLongHudText', 'You do not work here !',2)
    end
end)

--// Store

RegisterNetEvent('FIXDEV-burgershot:store')
AddEventHandler('FIXDEV-burgershot:store', function()
    local isEmployed = exports["FIXDEV-business"]:IsEmployedAt("burger_shot")
    if isEmployed then
        TriggerEvent("server-inventory-open", "45", "Shop")
		Wait(1000)
    else
        TriggerEvent('DoLongHudText', 'You do not work here !',2)
        end
    end)

--// Make Burgers

RegisterNetEvent('FIXDEV-civjobs:burgershot-heartstopper')
AddEventHandler('FIXDEV-civjobs:burgershot-heartstopper', function()
    local ped = PlayerPedId()
    local isEmployed = exports["FIXDEV-business"]:IsEmployedAt("burger_shot")
    if isEmployed then
        if exports['FIXDEV-inventory']:hasEnoughOfItem('burgershotpatty', 2) and exports['FIXDEV-inventory']:hasEnoughOfItem('lettuce', 1) and exports['FIXDEV-inventory']:hasEnoughOfItem('hamburgerbuns', 1) and exports['FIXDEV-inventory']:hasEnoughOfItem('tomato', 1) and exports['FIXDEV-inventory']:hasEnoughOfItem('cheese', 1) then
            FreezeEntityPosition(ped, true)
            ExecuteCommand('e cokecut')
            local heartstopper = exports['FIXDEV-taskbar']:taskBar(5000, 'Cooking Heartstopper')
            if (heartstopper == 100) then
                FreezeEntityPosition(ped, false)
                TriggerEvent('inventory:removeItem', 'hamburgerbuns', 1) 
                TriggerEvent('inventory:removeItem', 'burgershotpatty', 2) 
                TriggerEvent('inventory:removeItem', 'lettuce', 1) 
                TriggerEvent('inventory:removeItem', 'tomato', 1)
                TriggerEvent('inventory:removeItem', 'cheese', 1)
                TriggerEvent('player:receiveItem', 'heartstopper', 1)
                TriggerEvent('DoLongHudText', 'Cooked Heartstopper', 1)
            else
                FreezeEntityPosition(ped, false)
            end
        else
            TriggerEvent('DoLongHudText', 'Requires: 1x Burger Buns | 2x Cooked Burger Pattys | 1x Lettuce | 1x Tomato | 1x Cheese', 2)
        end
    else
        TriggerEvent('DoLongHudText', 'You dont work here', 2)
    end
end)

RegisterNetEvent('FIXDEV-civjobs:burgershot-moneyshot')
AddEventHandler('FIXDEV-civjobs:burgershot-moneyshot', function()
    local ped = PlayerPedId()
    local isEmployed = exports["FIXDEV-business"]:IsEmployedAt("burger_shot")
    if isEmployed then
        if exports['FIXDEV-inventory']:hasEnoughOfItem('hamburgerbuns', 1) and exports['FIXDEV-inventory']:hasEnoughOfItem('burgershotpatty', 1) and exports['FIXDEV-inventory']:hasEnoughOfItem('lettuce', 1) and exports['FIXDEV-inventory']:hasEnoughOfItem('tomato', 1) and exports['FIXDEV-inventory']:hasEnoughOfItem('cheese', 1) then
            FreezeEntityPosition(ped, true)
            ExecuteCommand('e cokecut')
            local moneyshot = exports['FIXDEV-taskbar']:taskBar(5000, 'Cooking Moneyshot')
            if (moneyshot == 100) then
                FreezeEntityPosition(ped, false)
                TriggerEvent('inventory:removeItem', 'hamburgerbuns', 1)
                TriggerEvent('inventory:removeItem', 'burgershotpatty', 1)
                TriggerEvent('inventory:removeItem', 'lettuce', 1)
                TriggerEvent('inventory:removeItem', 'tomato', 1)
                TriggerEvent('inventory:removeItem', 'cheese', 1)
                TriggerEvent('player:receiveItem', 'moneyshot', 1)
                TriggerEvent('DoLongHudText', 'Cooked Moneyshot', 1)
            else
                FreezeEntityPosition(ped, false)
            end
        else
            TriggerEvent('DoLongHudText', 'Requires: 1x Burger Buns | 1x Cooked Burger Patty | 1x Cheese | 1x Lettuce | 1x Tomato', 2)
        end
    else
        TriggerEvent('DoLongHudText', 'You dont work here', 2)
    end
end)

RegisterNetEvent('FIXDEV-civjobs:burgershot-meatfree')
AddEventHandler('FIXDEV-civjobs:burgershot-meatfree', function()
    local ped = PlayerPedId()
    local isEmployed = exports["FIXDEV-business"]:IsEmployedAt("burger_shot")
    if isEmployed then
        if exports['FIXDEV-inventory']:hasEnoughOfItem('burgershotpatty2', 1) and exports['FIXDEV-inventory']:hasEnoughOfItem('lettuce', 1) and exports['FIXDEV-inventory']:hasEnoughOfItem('hamburgerbuns', 1) then
            FreezeEntityPosition(ped, true)
            ExecuteCommand('e cokecut')
            local meatfree = exports['FIXDEV-taskbar']:taskBar(5000, 'Cooking Meat Free')
            if (meatfree == 100) then
                FreezeEntityPosition(ped, false)
                TriggerEvent('inventory:removeItem', 'lettuce', 1)
                TriggerEvent('inventory:removeItem', 'hamburgerbuns', 1)
                TriggerEvent('inventory:removeItem', 'burgershotpatty2', 1)
                TriggerEvent('player:receiveItem', 'meatfree', 1)
            else
                FreezeEntityPosition(ped, false)
            end
        else
            TriggerEvent('DoLongHudText', 'Requires: 1x Burger Buns | 1x Lettuce | 1x Cooked Meat Free Patty', 2)
        end
    else
        TriggerEvent('DoLongHudText', 'You dont work here', 2)
    end
end)  

RegisterNetEvent('FIXDEV-civjobs:burgershot-bleeder')
AddEventHandler('FIXDEV-civjobs:burgershot-bleeder', function()
    local ped = PlayerPedId()
    local isEmployed = exports["FIXDEV-business"]:IsEmployedAt("burger_shot")
    if isEmployed then
        if exports['FIXDEV-inventory']:hasEnoughOfItem('hamburgerbuns', 1) and exports['FIXDEV-inventory']:hasEnoughOfItem('lettuce', 1) and exports['FIXDEV-inventory']:hasEnoughOfItem('burgershotpatty', 1) and exports['FIXDEV-inventory']:hasEnoughOfItem('cheese', 1) and exports['FIXDEV-inventory']:hasEnoughOfItem('tomato', 1) then
            FreezeEntityPosition(ped, true)
            ExecuteCommand('e cokecut')
            local meatfree = exports['FIXDEV-taskbar']:taskBar(5000, 'Cooking Bleeder Burger')
            if (meatfree == 100) then
                FreezeEntityPosition(ped, false)
                TriggerEvent('inventory:removeItem', 'lettuce', 1)
                TriggerEvent('inventory:removeItem', 'hamburgerbuns', 1)
                TriggerEvent('inventory:removeItem', 'burgershotpatty', 1)
                TriggerEvent('inventory:removeItem', 'tomato', 1)
                TriggerEvent('inventory:removeItem', 'cheese', 1)
                TriggerEvent('player:receiveItem', 'bleederburger', 1)
            else
                FreezeEntityPosition(ped, false)
            end
        else
            TriggerEvent('DoLongHudText', 'Requires: 1x Lettuce | 1x Patty | 1x Burger Buns', 2)
        end
    else
        TriggerEvent('DoLongHudText', 'You dont work here', 2)
    end
end)  

-- // Drink Machine Start // --

RegisterNetEvent('FIXDEV-jobs:burgershot-drinks')
AddEventHandler('FIXDEV-jobs:burgershot-drinks', function()
    local isEmployed = exports["FIXDEV-business"]:IsEmployedAt("burger_shot")
    if isEmployed then
        local BurgershotDrinks = {
            {
                title = 'Burger Shot Drinks',
                icon = "glass-whiskey"
            },
            {
                title = "Pour Cola",
                description = "Pour a nice refreshing Cola",
                icon = "beer",
                action = 'FIXDEV-burgershot:cola',
            },
            {
                title = "Pour Milkshake",
                description = "Pour a Ice Cold Milkshake",
                icon = "beer",
                action = 'FIXDEV-burgershot:shake',
            },
            {
                title = "Pour Soft Drink",
                description = "Pour a monsterous sweet Soft Drink",
                icon = "beer",
                action = 'FIXDEV-burgershot:drink',
            },
            {
                title = "Pour Cup Of Water",
                description = "Pour a Cup Of Water",
                icon = "beer",
                action = 'FIXDEV-burgershot:water',
            },
        }
        exports["FIXDEV-interface"]:showContextMenu(BurgershotDrinks)
    else
        TriggerEvent('DoLongHudText', 'Fuck off POLITELY', 2)
    end
end)

RegisterUICallback('FIXDEV-burgershot:cola', function(data, cb)
    cb({ data = {}, meta = { ok = true, message = '' } })
    TriggerEvent('FIXDEV-burgershot:getcola')
end)

RegisterUICallback('FIXDEV-burgershot:shake', function(data, cb)
    cb({ data = {}, meta = { ok = true, message = '' } })
    TriggerEvent('FIXDEV-burgershot:makeshake')
end)

RegisterUICallback('FIXDEV-burgershot:drink', function(data, cb)
    cb({ data = {}, meta = { ok = true, message = '' } })
    TriggerEvent('FIXDEV-burgershot:soft-drink')
end)

RegisterUICallback('FIXDEV-burgershot:water', function(data, cb)
    cb({ data = {}, meta = { ok = true, message = '' } })
    TriggerEvent('FIXDEV-burgershot:get_water')
end)

-- // Drink Machine End // --

-- // Start Of Burgers // --

RegisterNetEvent('FIXDEV-civjobs:burgershot-make-burgers')
AddEventHandler('FIXDEV-civjobs:burgershot-make-burgers', function()
    local isEmployed = exports["FIXDEV-business"]:IsEmployedAt("burger_shot")
    if isEmployed then
        local BurgershotBurgers = {
            {
                title = 'Burger Shot Burgers',
                icon = "utensils"
            },
            {
                title = "Assemble Heartstopper",
                icon = "hamburger", 
                action = 'FIXDEV-burgershot:hs',
            },
            {
                title = "Assemble Moneyshot",
                icon = "hamburger", 
                action = 'FIXDEV-burgershot:ms',
            },
            {
                title = "Assemble Meat Free Burger",
                icon = "hamburger", 
                action = 'FIXDEV-burgershot:mf',
            },
            {
                title = "Assemble Bleeder Burger",
                icon = "hamburger", 
                action = 'FIXDEV-burgershot:bb',
            },
        }
        exports["FIXDEV-interface"]:showContextMenu(BurgershotBurgers)
    else
        TriggerEvent('DoLongHudText', 'Fuck off POLITELY', 2)
    end
end)

RegisterUICallback('FIXDEV-burgershot:hs', function(data, cb)
    cb({ data = {}, meta = { ok = true, message = '' } })
    TriggerEvent('FIXDEV-civjobs:burgershot-heartstopper')
end)

RegisterUICallback('FIXDEV-burgershot:ms', function(data, cb)
    cb({ data = {}, meta = { ok = true, message = '' } })
    TriggerEvent('FIXDEV-civjobs:burgershot-moneyshot')
end)

RegisterUICallback('FIXDEV-burgershot:mf', function(data, cb)
    cb({ data = {}, meta = { ok = true, message = '' } })
    TriggerEvent('FIXDEV-civjobs:burgershot-meatfree')
end)

RegisterUICallback('FIXDEV-burgershot:bb', function(data, cb)
    cb({ data = {}, meta = { ok = true, message = '' } })
    TriggerEvent('FIXDEV-civjobs:burgershot-bleeder')
end)

--// Meat No Meat?

RegisterNetEvent('FIXDEV-civjobs:burgershot-make-pattys')
AddEventHandler('FIXDEV-civjobs:burgershot-make-pattys', function()
    local isEmployed = exports["FIXDEV-business"]:IsEmployedAt("burger_shot")
    if isEmployed then
        local BurgershotPattys = {
            {
                title = 'Burger Shot Pattys',
            },
            {
                title = "Cook Patty (Contains Meat)",
                description = "Requires: 1x Raw Patty (Contains Meat)",
                key = "CP.M",
                action = 'FIXDEV-burgershot:cm',
            },
            {
                title = "Cook Patty (Doesnt Contain Meat)",
                description = "Requires: 1x Raw Patty (Doesnt Contain Meat)",
                key = "CP.NM",
                action = 'FIXDEV-burgershot:dcm',
            },
        }
        exports["FIXDEV-interface"]:showContextMenu(BurgershotPattys)
    else
        TriggerEvent('DoLongHudText', 'Fuck off POLITELY', 2)
    end
end)

RegisterUICallback('FIXDEV-burgershot:cm', function(data, cb)
    cb({ data = {}, meta = { ok = true, message = '' } })
    TriggerEvent('FIXDEV-burgershot:contains-meat')
end)

RegisterUICallback('FIXDEV-burgershot:dcm', function(data, cb)
    cb({ data = {}, meta = { ok = true, message = '' } })
    TriggerEvent('FIXDEV-burgershot:doesnt-contains-meat')
end)

RegisterNetEvent("FIXDEV-burgershot:contains-meat")
AddEventHandler("FIXDEV-burgershot:contains-meat", function()
    local isEmployed = exports["FIXDEV-business"]:IsEmployedAt("burger_shot")
    if isEmployed then
        if exports["FIXDEV-inventory"]:hasEnoughOfItem("rawpatty", 1) then 
            local dict = 'anim@amb@business@coc@coc_unpack_cut_left@'
            LoadDict(dict)
            FreezeEntityPosition(GetPlayerPed(-1),true)
            TaskPlayAnim(GetPlayerPed(-1), dict, "coke_cut_v1_coccutter", 3.0, -8, -1, 63, 0, 0, 0, 0 )
            SetEntityHeading(GetPlayerPed(-1), 124.72439575195)
            local finished = exports['FIXDEV-taskbar']:taskBar(7500, 'Cooking Patty')
            if (finished == 100) then
                TriggerEvent("inventory:removeItem", "rawpatty", 1)
                TriggerEvent('player:receiveItem', 'burgershotpatty', 1)
                FreezeEntityPosition(GetPlayerPed(-1),false)
                ClearPedTasks(GetPlayerPed(-1))
                Citizen.Wait(1000)
            end
        else
            TriggerEvent('DoLongHudText', 'You need more Raw Pattys to cook! (Required Amount: 1)', 2)
        end
    else
        TriggerEvent('DoLongHudText', 'You dont work here', 2)
    end
end)

RegisterNetEvent("FIXDEV-burgershot:doesnt-contains-meat")
AddEventHandler("FIXDEV-burgershot:doesnt-contains-meat", function()
    local isEmployed = exports["FIXDEV-business"]:IsEmployedAt("burger_shot")
    if isEmployed then   
        if exports["FIXDEV-inventory"]:hasEnoughOfItem("rawpatty2", 1) then 
            local dict = 'anim@amb@business@coc@coc_unpack_cut_left@'
            LoadDict(dict)
            FreezeEntityPosition(GetPlayerPed(-1),true)
            TaskPlayAnim(GetPlayerPed(-1), dict, "coke_cut_v1_coccutter", 3.0, -8, -1, 63, 0, 0, 0, 0 )
            SetEntityHeading(GetPlayerPed(-1), 124.72439575195)
            local finished = exports['FIXDEV-taskbar']:taskBar(7500, 'Cooking Patty')
            if (finished == 100) then
                TriggerEvent("inventory:removeItem", "rawpatty2", 1)
                TriggerEvent('player:receiveItem', 'burgershotpatty2', 1)
                FreezeEntityPosition(GetPlayerPed(-1),false)
                ClearPedTasks(GetPlayerPed(-1))
                Citizen.Wait(1000)
            end
        else
            TriggerEvent('DoLongHudText', 'You need more Raw Pattys to cook! (Required Amount: 1)', 2)
        end
    else
        TriggerEvent('DoLongHudText', 'You dont work here', 2)
    end
end)

RegisterNetEvent('FIXDEV-burgershot:gettoy')
AddEventHandler('FIXDEV-burgershot:gettoy', function()
    local BurgershotToy = math.random(10)
    if BurgershotToy == 1 then
        TriggerEvent('player:receiveItem', 'larrybirdtoy', 1)
    elseif BurgershotToy == 2 then
        TriggerEvent('player:receiveItem', 'tatumtoy', 1)
    elseif BurgershotToy == 3 then
        TriggerEvent('player:receiveItem', 'klaytoy', 1)
    elseif BurgershotToy == 4 then
        TriggerEvent('player:receiveItem', 'currytoy', 1)
    elseif BurgershotToy == 5 then
        TriggerEvent('player:receiveItem', 'strangetoy', 1)
    elseif BurgershotToy == 6 then
        TriggerEvent('player:receiveItem', 'woodytoy', 1)
    elseif BurgershotToy == 7 then
        TriggerEvent('player:receiveItem', 'joinwicktoy', 1)
    elseif BurgershotToy == 8 then
        TriggerEvent('player:receiveItem', 'eletoy', 1)
    elseif BurgershotToy == 9 then
        TriggerEvent('player:receiveItem', 'captoy', 1)
    elseif BurgershotToy == 10 then
        TriggerEvent('player:receiveItem', 'supermantoy', 1)
    end
end)

RegisterNetEvent("FIXDEV-icecream")
AddEventHandler("FIXDEV-icecream", function()
    local isEmployed = exports["FIXDEV-business"]:IsEmployedAt("burger_shot")
    if isEmployed then
        if exports["FIXDEV-inventory"]:hasEnoughOfItem("icecreamcone", 1) then 
            local dict = 'anim@amb@business@coc@coc_unpack_cut_left@'
            LoadDict(dict)
            FreezeEntityPosition(GetPlayerPed(-1),true)
            TaskPlayAnim(GetPlayerPed(-1), dict, "coke_cut_v1_coccutter", 3.0, -8, -1, 63, 0, 0, 0, 0 )
            SetEntityHeading(GetPlayerPed(-1), 302.72439575195)
            local finished = exports['FIXDEV-taskbar']:taskBar(7500, 'Scooping')
            if (finished == 100) then
                TriggerEvent("inventory:removeItem", "icecreamcone", 1)
                TriggerEvent('player:receiveItem', 'vanillaicecream', 1)
                FreezeEntityPosition(GetPlayerPed(-1),false)
                ClearPedTasks(GetPlayerPed(-1))
                Citizen.Wait(1000)
            end
        else
            TriggerEvent('DoLongHudText', 'You need more Ice Cream Cone!', 2)
        end
    else
        TriggerEvent('DoLongHudText', 'You dont work here', 2)
    end
end)

RegisterNetEvent('grabtoybs')
AddEventHandler('grabtoybs', function()
    TriggerEvent('player:receiveItem', 'bstoy', 1)
end)

 -- Interact --
 
 exports["FIXDEV-polytarget"]:AddBoxZone("burgershot_assemble", vector3(-1197.3, -898.32, 13.97), 0.8, 3.2, {
    heading=34,
    minZ=9.97,
    maxZ=13.97
})

exports["FIXDEV-interact"]:AddPeekEntryByPolyTarget("burgershot_assemble", {{
    event = "FIXDEV-civjobs:burgershot-make-burgers",
    id = "burgershot_assemble",
    icon = "hand-holding",
    label = "Assemble Burger",
    parameters = {},
}}, {
    distance = { radius = 2.5 },
});

exports["FIXDEV-polytarget"]:AddBoxZone("burgershot_stash", vector3(-1199.87, -903.93, 13.97), 1.55, 0.8, {
    heading=35,
    --debugPoly=false,
    minZ=9.97,
    maxZ=13.97
})

exports["FIXDEV-interact"]:AddPeekEntryByPolyTarget("burgershot_stash", {
    {
        event = "FIXDEV-burgershot:store",
        id = "burgershot_stash",
        icon = "circle",
        label = "Get Ingridients",
        parameters = {},
    }
}, {
    distance = { radius = 2.5 },
});

exports["FIXDEV-polytarget"]:AddBoxZone("np_burgershot_make_drinks", vector3(-1197.0, -895.05, 13.97), 0.6, 0.85, {
    heading=304,
    minZ=10.77,
    maxZ=14.77
})

exports["FIXDEV-interact"]:AddPeekEntryByPolyTarget("np_burgershot_make_drinks", {{
    event = "FIXDEV-jobs:burgershot-drinks",
    id = "np_burgershot_make_drinks",
    icon = "circle",
    label = "Drink Machine",
    parameters = {},
}}, {
    distance = { radius = 2.5 },
});

exports["FIXDEV-polytarget"]:AddBoxZone("burgershot_warmer",  vector3(-1195.37, -897.63, 13.97), 3.15, 0.8, {
    minZ=10.72,
    maxZ=14.72
})

exports["FIXDEV-interact"]:AddPeekEntryByPolyTarget("burgershot_warmer", {
    {
        event = "FIXDEV-jobs:burgershot-warmer",
        id = "void_burgershot_warmer",
        icon = "circle",
        label = "Food Warmer",
        parameters = {},
    },
    {
        event = "FIXDEV-dispatch:burgershotAlarm",
        id = "Panic",
        icon = "bell",
        label = "Panic Button",
        parameters = {},
    },
}, {
    distance = { radius = 2.5 },
});

RegisterNetEvent('FIXDEV-dispatch:burgershotAlarm')
AddEventHandler('FIXDEV-dispatch:burgershotAlarm', function()
    if exports['FIXDEV-business']:IsEmployedAt('burger_shot') then
        RPC.execute("dispatch:addCall", "10-31A", "Burgershot Panic Alarm", {{icon = "FIXDEV-traffic-light", info = "Need Assistance!"}}, {GetEntityCoords(PlayerPedId())[1], GetEntityCoords(PlayerPedId())[2], GetEntityCoords(PlayerPedId())[3]}, 103, 480, 0)
    end
end)

exports["FIXDEV-polytarget"]:AddCircleZone("burgershot_fryer",  vector3(-1200.82, -896.99, 13.85), 0.81, {
    useZ = true
})

exports["FIXDEV-interact"]:AddPeekEntryByPolyTarget("burgershot_fryer", {{
    event = "FIXDEV-burgershot:startfryer",
    id = "burgershot_fryer",
    icon = "circle",
    label = "Make Fries",
    parameters = {},
}}, {
    distance = { radius = 2.5 },
});

exports["FIXDEV-polytarget"]:AddBoxZone("burgershot_stash", vector3(-1201.49, -901.77, 13.97), 4.0, 1.0, {
    heading=34,
    --debugPoly=false,
    minZ=11.27,
    maxZ=15.27
})

exports["FIXDEV-interact"]:AddPeekEntryByPolyTarget("burgershot_stash", {
    {
        event = "FIXDEV-burgershot:store",
        id = "burgershot_stash",
        icon = "circle",
        label = "Get Ingridients",
        parameters = {},
    }
}, {
    distance = { radius = 2.5 },
});

exports["FIXDEV-polytarget"]:AddCircleZone("burgershot_stuffs_4",  vector3(-1198.11, -895.24, 13.82), 0.79, {
    useZ = true
})

exports["FIXDEV-interact"]:AddPeekEntryByPolyTarget("burgershot_stuffs_4", {{
    event = "FIXDEV-civjobs:burgershot-make-pattys",
    id = "burgershot_stuffs_4",
    icon = "hamburger",
    label = "Grill Patty",
    parameters = {},
}}, {
    distance = { radius = 2.5 },
});

exports["FIXDEV-polytarget"]:AddCircleZone("gettoybs",  vector3(-1194.94, -897.35, 13.97), 0.26, {
    useZ = true
})

exports["FIXDEV-interact"]:AddPeekEntryByPolyTarget("gettoybs", {
    {
        event = "grabtoybs",
        id = "gettoybs",
        icon = "circle",
        label = "Grab Toy!",
        parameters = {},
    },
}, {
    distance = { radius = 2.5 },
});

exports["FIXDEV-polytarget"]:AddBoxZone("icecreamspot",  vector3(-1197.63, -893.85, 13.97), 0.45, 0.8, {
    heading=35,
    --debugPoly=false,
    minZ=11.02,
    maxZ=15.02
})

exports["FIXDEV-interact"]:AddPeekEntryByPolyTarget("icecreamspot", {
    {
        event = "FIXDEV-icecream",
        id = "icecreamspot",
        icon = "circle",
        label = "Scoop Ice Cream!",
        parameters = {},
    },
}, {
    distance = { radius = 5 },
});

-- Trays --

exports["FIXDEV-polytarget"]:AddBoxZone("burger_shot_tray_1", vector3(-1194.42, -893.9, 13.97), 1, 0.6, {
    heading=34,
    minZ=10.02,
    maxZ=14.22
})

exports["FIXDEV-polytarget"]:AddBoxZone("burger_shot_tray_2", vector3(-1193.42, -895.39, 13.97), 1, 0.6, {
    heading=34,
    minZ=10.02,
    maxZ=14.22
})

 -- Tray 1
 exports["FIXDEV-interact"]:AddPeekEntryByPolyTarget("burger_shot_tray_1", {{
    event = "FIXDEV-jobs:BurgerShotTray-1",
    id = "burger_shot_tray_1",
    icon = "hand-holding",
    label = "Open",
    parameters = {},
}}, {
    distance = { radius = 2.5 },
});

-- Tray 2
exports["FIXDEV-interact"]:AddPeekEntryByPolyTarget("burger_shot_tray_2", {{
    event = "FIXDEV-jobs:BurgerShotTray-2",
    id = "burger_shot_tray_2",
    icon = "hand-holding",
    label = "Open",
    parameters = {},
}}, {
    distance = { radius = 2.5 },
});

RegisterNetEvent('FIXDEV-jobs:BurgerShotTray-1')
AddEventHandler('FIXDEV-jobs:BurgerShotTray-1', function()
    TriggerEvent("server-inventory-open", "1", "trays-Burgershot Tray")
end)

RegisterNetEvent('FIXDEV-jobs:BurgerShotTray-2')
AddEventHandler('FIXDEV-jobs:BurgerShotTray-2', function()
    TriggerEvent("server-inventory-open", "1", "trays-Burgershot Tray")
end)