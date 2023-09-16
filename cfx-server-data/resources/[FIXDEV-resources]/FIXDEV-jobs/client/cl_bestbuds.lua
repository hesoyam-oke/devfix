RegisterNetEvent("FIXDEV-bestbuds:storage")
AddEventHandler("FIXDEV-bestbuds:storage", function()
    local isEmployed = exports["FIXDEV-business"]:IsEmployedAt("best_buds")
    if isEmployed then
		TriggerEvent("server-inventory-open", "1", "storage-bestbudspersonal")
        Wait(1000)
    else
        TriggerEvent("DoLongHudText", "You don't have access to this storage", 2)
    end
end)

RegisterNetEvent("FIXDEV-bestbuds:openShop")
AddEventHandler("FIXDEV-bestbuds:openShop", function()
    local isEmployed = exports["FIXDEV-business"]:IsEmployedAt("best_buds")
    if isEmployed then 
        TriggerEvent("server-inventory-open", "17", "Shop")
    else
        TriggerEvent("DoLongHudText", "You don't have access to this storage", 2)
    end
end)

RegisterNetEvent("FIXDEV-bestbuds:openShopTray:1")
AddEventHandler("FIXDEV-bestbuds:openShopTray:1", function()
    TriggerEvent("server-inventory-open", "1", "trays-BestBud Tray")
end)

RegisterNetEvent("FIXDEV-bestbuds:openShopTray:2")
AddEventHandler("FIXDEV-bestbuds:openShopTray:2", function()
    TriggerEvent("server-inventory-open", "1", "trays-BestBud Tray 2")
end)

exports["FIXDEV-polytarget"]:AddCircleZone("bestbuds_openShop", vector3(-622.5, -294.99, 35.45), 0.29, {
    useZ=true
})

exports["FIXDEV-polytarget"]:AddCircleZone("bestbuds_storage", vector3(-618.14, -294.33, 35.64), 0.7, {
    useZ=true
})

exports["FIXDEV-polytarget"]:AddBoxZone("best_buds_tray_1", vector3(-623.52, -295.88, 35.34), 0.8, 1.2, {
    heading=31,
    minZ=31.44,
    maxZ=35.44
})

exports["FIXDEV-polytarget"]:AddBoxZone("best_buds_tray_2", vector3(-625.6, -295.21, 35.34), 0.8, 1.2, {
    heading=300,
    minZ=31.44,
    maxZ=35.44
})

exports["FIXDEV-interact"]:AddPeekEntryByPolyTarget("bestbuds_storage", {{
    event = "FIXDEV-bestbuds:storage",
    id = "bestbuds_storage",
    icon = "box-open",
    label = "Open Storage",
    parameters = {},
}}, {
    distance = {radius = 2.5},
});

exports["FIXDEV-interact"]:AddPeekEntryByPolyTarget("bestbuds_openShop", {{
    event = "FIXDEV-bestbuds:openShop",
    id = "bestbuds_openShop",
    icon = "circle",
    label = "Open Shop",
    parameters = {},
}}, {
    distance = {radius = 2.5},
});

exports["FIXDEV-interact"]:AddPeekEntryByPolyTarget("best_buds_tray_1", {{
    event = "FIXDEV-bestbuds:openShopTray:1",
    id = "best_buds_tray_1",
    icon = "hand-holding",
    label = "Open",
    parameters = {},
}}, {
    distance = { radius = 2.5 },
});

exports["FIXDEV-interact"]:AddPeekEntryByPolyTarget("best_buds_tray_2", {{
    event = "FIXDEV-bestbuds:openShopTray:2",
    id = "best_buds_tray_2",
    icon = "hand-holding",
    label = "Open",
    parameters = {},
}}, {
    distance = { radius = 2.5 },
});