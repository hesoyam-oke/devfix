local pDeliveryJob = false
local SentNotiTrunkGoods = false

local onWay1 = false
local onWay2 = false
local onWay3 = false
local onWay4 = false
local onWay5 = false

local hasGoods = false

local pVeh = nil

RegisterNetEvent('FIXDEV-phone:setNotiGroupJobDeliveries')
AddEventHandler('FIXDEV-phone:setNotiGroupJobDeliveries', function()
    TriggerEvent('FIXDEV-phone:JobNotify', 'CURRENT', 'Get into the delivery truck')
end)

RegisterNetEvent('FIXDEV-jobs:deliveries:getCar')
AddEventHandler('FIXDEV-jobs:deliveries:getCar', function()
    local model = "benson"
    RequestModel(model)
    while not HasModelLoaded(model) do
        Citizen.Wait(0)
    end
    SetModelAsNoLongerNeeded(model)

    local veh = CreateVehicle(model, vector3(915.42, -1257.60, 25.55), 33.88, true)

    local vehplate = "247"..math.random(10000, 99999) 
    SetVehicleNumberPlateText(veh, vehplate)
    Citizen.Wait(100)
    TriggerEvent("keys:addNew", veh, vehplate)
    pVeh = veh

    waitingToGetInTruck = true
    RPC.execute('FIXDEV-jobs:setNotificiationForGroupMembersDelivery')
    TriggerEvent('FIXDEV-phone:JobNotify', 'CURRENT', 'Get into the delivery truck')
    Citizen.CreateThread(function()
        while waitingToGetInTruck do
            Citizen.Wait(1000)
            if GetVehiclePedIsIn(PlayerPedId()) == veh then
                waitingToGetInTruck = false
                RPC.execute('FIXDEV-jobs:getStoreForJobDeliveries', math.random(1, 5))
            end
        end
    end)
end)

RegisterNetEvent('FIXDEV-jobs:deleteDeliveryVehicle')
AddEventHandler('FIXDEV-jobs:deleteDeliveryVehicle', function()
    DeleteEntity(pVeh)
    pVeh = nil
end)

RegisterNetEvent('FIXDEV-jobs:getDeliveryJobDeliveries')
AddEventHandler('FIXDEV-jobs:getDeliveryJobDeliveries', function(job)
    TriggerEvent('FIXDEV-phone:JobNotify', 'CURRENT', 'Drive to the assigned store.')

    if job == 1 then
        canDeliverThread1(true)
        onWay1 = true
        pDelivery1Blip = AddBlipForCoord(-48.35, -1757.79, 29.42)
        SetBlipSprite(pDelivery1Blip, 615)
        BeginTextCommandSetBlipName("STRING")
        AddTextComponentString("Delivery Location")
        EndTextCommandSetBlipName(pDelivery1Blip)
        SetBlipRoute(pDelivery1Blip, 2)
        SetBlipRouteColour(pDelivery1Blip, 2)
        SetBlipColour(pDelivery1Blip, 2)
        canDeliverThread1(true)
    elseif job == 2 then
        onWay2 = true
        pDelivery2Blip = AddBlipForCoord(-709.44, -913.99, 19.20)
        SetBlipSprite(pDelivery2Blip, 615)
        BeginTextCommandSetBlipName("STRING")
        AddTextComponentString("Delivery Location")
        EndTextCommandSetBlipName(pDelivery2Blip)
        SetBlipRoute(pDelivery2Blip, true)
        SetBlipRouteColour(pDelivery2Blip, 2)
        SetBlipColour(pDelivery2Blip, 2)
        canDeliverThread2(true)
    elseif job == 3 then
        onWay3 = true
        pDelivery3Blip = AddBlipForCoord(373.83, 326.04, 103.56)
        SetBlipSprite(pDelivery3Blip, 615)
        BeginTextCommandSetBlipName("STRING")
        AddTextComponentString("Delivery Location")
        EndTextCommandSetBlipName(pDelivery3Blip)
        SetBlipRoute(pDelivery3Blip, true)
        SetBlipRouteColour(pDelivery3Blip, 2)
        SetBlipColour(pDelivery3Blip, 2)
        canDeliverThread3(true)
    elseif job == 4 then
        onWay4 = true
        pDelivery4Blip = AddBlipForCoord(-1223.61, -906.75, 12.32)
        SetBlipSprite(pDelivery4Blip, 615)
        BeginTextCommandSetBlipName("STRING")
        AddTextComponentString("Delivery Location")
        EndTextCommandSetBlipName(pDelivery4Blip)
        SetBlipRoute(pDelivery4Blip, true)
        SetBlipRouteColour(pDelivery4Blip, 2)
        SetBlipColour(pDelivery4Blip, 2)
        canDeliverThread4(true)
    elseif job == 5 then
        onWay5 = true
        pDelivery5Blip = AddBlipForCoord(-2968.22, 389.77, 15.03)
        SetBlipSprite(pDelivery5Blip, 615)
        BeginTextCommandSetBlipName("STRING")
        AddTextComponentString("Delivery Location")
        EndTextCommandSetBlipName(pDelivery5Blip)
        SetBlipRoute(pDelivery5Blip, true)
        SetBlipRouteColour(pDelivery5Blip, 2)
        SetBlipColour(pDelivery5Blip, 2)
        canDeliverThread5(true)
    end
end)

-- Polyzones --

Citizen.CreateThread(function()
    exports["FIXDEV-polyzone"]:AddBoxZone("delivery_store_1", vector3(-48.17, -1751.95, 29.42), 12.6, 15, {
        name="delivery_store_1",
        heading=320,
        debugPoly=false,
        minZ=27.22,
        maxZ=31.22
	})

    exports["FIXDEV-polyzone"]:AddBoxZone("delivery_store_2", vector3(-712.37, -911.54, 19.01), 15, 10.2, {
        name="delivery_store_2",
        heading=270,
        debugPoly=false,
        minZ=17.61,
        maxZ=21.61
	})

    exports["FIXDEV-polyzone"]:AddBoxZone("delivery_store_3", vector3(378.01, 329.12, 103.45), 12, 11.0, {
        name="delivery_store_3",
        heading=345,
        debugPoly=false,
        minZ=102.45,
        maxZ=106.45
	})

    exports["FIXDEV-polyzone"]:AddBoxZone("delivery_store_4", vector3(-1224.38, -905.82, 12.31), 7, 7, {
        name="delivery_store_4",
        heading=35,
        debugPoly=false,
        minZ=11.31,
        maxZ=15.31
	})

    exports["FIXDEV-polyzone"]:AddBoxZone("delivery_store_5", vector3(-2968.34, 390.36, 15.04), 7, 7, {
        name="delivery_store_5",
        heading=355,
        debugPoly=false,
        minZ=14.04,
        maxZ=18.04
	})
end)

RegisterNetEvent('FIXDEV-jobs:groupSyncDropGoods')
AddEventHandler('FIXDEV-jobs:groupSyncDropGoods', function()
    pDropGoods()
end)

RegisterNetEvent('FIXDEV-polyzone:enter')
AddEventHandler('FIXDEV-polyzone:enter', function(name)
    if name == "delivery_store_1" then
        delivery_store_1 = true
        if onWay1 and hasGoods then
            pDropGoods()
            RPC.execute('FIXDEV-jobs:dropGoodsDelivieries')
            exports['FIXDEV-ui']:showInteraction('[E] Drop Goods [Delivery Job]')
            canDropGoods = true     
        end
    elseif name == "delivery_store_2" then
        delivery_store_2 = true
        if onWay2 and hasGoods then
            pDropGoods()
            RPC.execute('FIXDEV-jobs:dropGoodsDelivieries')
            exports['FIXDEV-ui']:showInteraction('[E] Drop Goods [Delivery Job]')
            canDropGoods = true
        end
    elseif name == "delivery_store_3" then
        delivery_store_3 = true
        if onWay3 and hasGoods then
            pDropGoods()
            RPC.execute('FIXDEV-jobs:dropGoodsDelivieries')
            exports['FIXDEV-ui']:showInteraction('[E] Drop Goods [Delivery Job]')
            canDropGoods = true
        end
    elseif name == "delivery_store_4" then
        delivery_store_4 = true
        if onWay4 and hasGoods then
            pDropGoods()
            RPC.execute('FIXDEV-jobs:dropGoodsDelivieries')
            exports['FIXDEV-ui']:showInteraction('[E] Drop Goods [Delivery Job]')
            canDropGoods = true
        end
    elseif name == "delivery_store_5" then
        delivery_store_5 = true
        if onWay5 and hasGoods then
            pDropGoods()
            RPC.execute('FIXDEV-jobs:dropGoodsDelivieries')
            exports['FIXDEV-ui']:showInteraction('[E] Drop Goods [Delivery Job]')
            canDropGoods = true
        end
    end
end)

RegisterNetEvent('FIXDEV-polyzone:exit')
AddEventHandler('FIXDEV-polyzone:exit', function(name)
    if name == "delivery_store_1" then
        delivery_store_1 = false
        canDropGoods = false
        exports['FIXDEV-ui']:hideInteraction()
    elseif name == "delivery_store_2" then
        delivery_store_2 = false
        canDropGoods = false
        exports['FIXDEV-ui']:hideInteraction()
    elseif name == "delivery_store_3" then
        delivery_store_3 = false
        canDropGoods = false
        exports['FIXDEV-ui']:hideInteraction()
    elseif name == "delivery_store_4" then
        delivery_store_4 = false
        canDropGoods = false
        exports['FIXDEV-ui']:hideInteraction()
    elseif name == "delivery_store_5" then
        delivery_store_5 = false
        canDropGoods = false
        exports['FIXDEV-ui']:hideInteraction()
    end
end)

RegisterNetEvent('FIXDEV-phone:groupedJobsGrabGoodsDelivieries')
AddEventHandler('FIXDEV-phone:groupedJobsGrabGoodsDelivieries', function()
    TriggerEvent('FIXDEV-phone:JobNotify', 'CURRENT', 'Grab the goods and deliver them inside the store.')
    canGrabGoods = true
end)

function canDeliverThread1(IsInWay)
    local setCoords = vector3(-48.35, -1757.79, 29.42)
    Citizen.CreateThread(function()
      while IsInWay do
        Citizen.Wait(1000)
        local plped = PlayerPedId()
        local coordA = GetEntityCoords(plped)
        if onWay1 and pDeliveryJob then
            local aDist = GetDistanceBetweenCoords(setCoords, coordA)
            if aDist < 25.0 then
                if not SentNotiTrunkGoods then
                    SentNotiTrunkGoods = true
                    TriggerEvent('FIXDEV-phone:JobNotify', 'CURRENT', 'Grab the goods and deliver them inside the store.')
                    RPC.execute('FIXDEV-jobs:grabGoodsDelivieries')
                end
                canGrabGoods = true
            else
                canGrabGoods = false
            end 
          end
        end
    end)
  end

  function canDeliverThread2(IsInWay)
    local setCoords = vector3(-709.44, -913.99, 19.20)
    Citizen.CreateThread(function()
      while IsInWay do
        Citizen.Wait(1000)
        local plped = PlayerPedId()
        local coordA = GetEntityCoords(plped)
        if onWay2 and pDeliveryJob then
            local aDist = GetDistanceBetweenCoords(setCoords, coordA)
            if aDist < 25.0 then
                if not SentNotiTrunkGoods then
                    SentNotiTrunkGoods = true
                    TriggerEvent('FIXDEV-phone:JobNotify', 'CURRENT', 'Grab the goods and deliver them inside the store.')
                    RPC.execute('FIXDEV-jobs:grabGoodsDelivieries')
                end
                canGrabGoods = true
            else
                canGrabGoods = false
            end
          end
        end
    end)
  end

  function canDeliverThread3(IsInWay)
    local setCoords = vector3(373.83, 326.04, 103.56)
    Citizen.CreateThread(function()
      while IsInWay do
        Citizen.Wait(1000)
        local plped = PlayerPedId()
        local coordA = GetEntityCoords(plped)
        if onWay3 and pDeliveryJob then
            local aDist = GetDistanceBetweenCoords(setCoords, coordA)
            if aDist < 25.0 then
                if not SentNotiTrunkGoods then
                    SentNotiTrunkGoods = true
                    TriggerEvent('FIXDEV-phone:JobNotify', 'CURRENT', 'Grab the goods and deliver them inside the store.')
                    RPC.execute('FIXDEV-jobs:grabGoodsDelivieries')
                end
                canGrabGoods = true
            else
                canGrabGoods = false
            end 
          end
        end
    end)
  end

  function canDeliverThread4(IsInWay)
    local setCoords = vector3(-1223.61, -906.75, 12.32)
    Citizen.CreateThread(function()
      while IsInWay do
        Citizen.Wait(1000)
        local plped = PlayerPedId()
        local coordA = GetEntityCoords(plped)
        if onWay4 and pDeliveryJob then
            local aDist = GetDistanceBetweenCoords(setCoords, coordA)
            if aDist < 25.0 then
                if not SentNotiTrunkGoods then
                    SentNotiTrunkGoods = true
                    TriggerEvent('FIXDEV-phone:JobNotify', 'CURRENT', 'Grab the goods and deliver them inside the store.')
                    RPC.execute('FIXDEV-jobs:grabGoodsDelivieries')
                end
                canGrabGoods = true
            else
                canGrabGoods = false
            end
          end
        end
    end)
  end

  function canDeliverThread5(IsInWay)
    local setCoords = vector3(-2968.22, 389.77, 15.03)
    Citizen.CreateThread(function()
      while IsInWay do
        Citizen.Wait(1000)
        local plped = PlayerPedId()
        local coordA = GetEntityCoords(plped)
        if onWay5 and pDeliveryJob then
            local aDist = GetDistanceBetweenCoords(setCoords, coordA)
            if aDist < 25.0 then
                if not SentNotiTrunkGoods then
                    SentNotiTrunkGoods = true
                    TriggerEvent('FIXDEV-phone:JobNotify', 'CURRENT', 'Grab the goods and deliver them inside the store.')
                    RPC.execute('FIXDEV-jobs:grabGoodsDelivieries')
                end
                canGrabGoods = true
            else
                canGrabGoods = false
            end 
          end
        end
    end)
end

RegisterNetEvent('FIXDEV-jobs:deliveryGrabGoods')
AddEventHandler('FIXDEV-jobs:deliveryGrabGoods', function()
    if canGrabGoods then
        TriggerEvent('FIXDEV-phone:JobNotify', 'CURRENT', 'Drop the goods inside the store.')
        TriggerEvent("attach:box")
        canGrabGoods = false
        hasGoods = true
        RPC.execute('FIXDEV-jobs:grabbedGoodsDeliveries')
    end
end)

RegisterNetEvent('FIXDEV-jobs:dropGoodsInStoreDeliveries')
AddEventHandler('FIXDEV-jobs:dropGoodsInStoreDeliveries', function()
    TriggerEvent('FIXDEV-phone:JobNotify', 'CURRENT', 'Drop the goods inside the store.')
    canGrabGoods = false
end)
  
function pDropGoods()
	Citizen.CreateThread(function()
        while true do
            Citizen.Wait(5)
            if delivery_store_1 or delivery_store_2 or delivery_store_3 or delivery_store_4 or delivery_store_5 then
                if IsControlJustReleased(0, 38) and hasGoods then
                    RemoveBlip(pDelivery1Blip)
                    RemoveBlip(pDelivery2Blip)
                    RemoveBlip(pDelivery3Blip)
                    RemoveBlip(pDelivery4Blip)
                    RemoveBlip(pDelivery5Blip)

                    hasGoods = false
                    canGrabGoods = false
                    TriggerEvent('propattach:destroyCurrent')
                    exports['FIXDEV-ui']:hideInteraction()
                    RPC.execute('FIXDEV-jobs:returnDepoDeliveries')
                end
            else
                RemoveBlip(pDelivery1Blip)
                RemoveBlip(pDelivery2Blip)
                RemoveBlip(pDelivery3Blip)
                RemoveBlip(pDelivery4Blip)
                RemoveBlip(pDelivery5Blip)

                hasGoods = false
                canGrabGoods = false
            end
		end
	end)
end

RegisterNetEvent('FIXDEV-jobs:deliveryReturnToDepoDeliveries')
AddEventHandler('FIXDEV-jobs:deliveryReturnToDepoDeliveries', function()
    pDeliveryJob = false
    onWay1 = false
    onWay2 = false
    onWay3 = false
    onWay4 = false
    onWay5 = false
    pReturning = true

    TriggerEvent('FIXDEV-phone:JobNotify', 'CURRENT', 'Return to the depo.')

    pReturnDepo = AddBlipForCoord(914.87, -1259.54, 25.56)
    SetBlipSprite(pReturnDepo, 50)
    BeginTextCommandSetBlipName("STRING")
    AddTextComponentString("Depo")
    EndTextCommandSetBlipName(pReturnDepo)
    SetBlipRoute(pReturnDepo, 2)
    SetBlipRouteColour(pReturnDepo, 2)
    SetBlipColour(pReturnDepo, 2)

    local setCoords = vector3(916.00, -1260.38, 25.56)
    Citizen.CreateThread(function()
      while pReturning do
        Citizen.Wait(1000)
        local plped = PlayerPedId()
        local coordA = GetEntityCoords(plped)
        local aDist = GetDistanceBetweenCoords(setCoords, coordA)
            if aDist < 15.0 then
                pReturning = false
                RemoveBlip(pReturnDepo)
                SentNotiTrunkGoods = false
                if exports['FIXDEV-hud']:MoneyBuff() then
                    RPC.execute('FIXDEV-jobs:givePayout', math.random(650, 727), "cash", '[24/7 Delivery Job | With Buff]')
                else
                    RPC.execute('FIXDEV-jobs:givePayout', math.random(500, 678), "cash", '[24/7 Delivery Job | Without Buff]')
                end
                TriggerEvent('FIXDEV-jobs:deleteDeliveryVehicle')
                TriggerEvent('FIXDEV-phone:JobNotifyClose')
            end
        end
    end)
end)

function canGrabGoods()
    if canGrabGoods then
        canGrabGoods = true
    elseif not canGrabGoods then
        canGrabGoods = false
    end
    return canGrabGoods
end

Citizen.CreateThread(function()
    pedMdl = GetHashKey("ig_josef")
    RequestModel(pedMdl)
    while not HasModelLoaded(pedMdl) do
        Wait(1)
    end
    ped = CreatePed(0, pedMdl , 920.24505, -1256.8, 25.519495  -1, true)
    FreezeEntityPosition(ped, true)
    SetEntityHeading(ped, 29.330654)
    SetEntityInvincible(ped, true)
    SetBlockingOfNonTemporaryEvents(ped, true)
end)

exports["FIXDEV-polyzone"]:AddBoxZone("sign_in_delivery", vector3(919.92, -1256.6, 25.52), 1.2, 2.0, {
    name="sign_in_delivery",
    heading=35,
    --debugPoly=false,
    minZ=22.72,
    maxZ=26.72
})

RegisterNetEvent('FIXDEV-polyzone:enter')
AddEventHandler('FIXDEV-polyzone:enter', function(name)
    if name == "sign_in_delivery" then
        deliverySignInLoc = true
        if exports['isPed']:isPed('myjob') == 'delivery_driver' then
            exports['FIXDEV-ui']:showInteraction('[E] Sign Out', 'error')

            Citizen.CreateThread(function()
                while deliverySignInLoc do
                    Citizen.Wait(5)
                    if IsControlJustReleased(0, 38) then
                        TriggerServerEvent("jobssystem:jobs", "unemployed")
                        exports['FIXDEV-phone']:phoneNotification('jobactivity', 'Clocked Out.', 'Job Center')
                        deliverySignInLoc = false
                        RPC.execute('FIXDEV-phone:group_CheckOut')
                    end
                end
            end)
        else
            exports['FIXDEV-ui']:showInteraction('[E] Sign In')

            Citizen.CreateThread(function()
                while deliverySignInLoc do
                    Citizen.Wait(5)
                    if IsControlJustReleased(0, 38) then
                        TriggerServerEvent("jobssystem:jobs", "delivery_driver")
                        exports['FIXDEV-phone']:phoneNotification('jobactivity', 'Signed in as 24/7 Delivery Driver.', 'Job Center')
                        exports['FIXDEV-ui']:hideInteraction()
                        deliverySignInLoc = false
                    end
                end
            end)
        end
    end
end)

RegisterNetEvent('FIXDEV-polyzone:exit')
AddEventHandler('FIXDEV-polyzone:exit', function(name)
    if name == "sign_in_delivery" then
        deliverySignInLoc = false
        exports['FIXDEV-ui']:hideInteraction()
    end
end)