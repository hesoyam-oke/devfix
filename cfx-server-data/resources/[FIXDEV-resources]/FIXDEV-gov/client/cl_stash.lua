CreateThread(function()
    exports["FIXDEV-polyzone"]:AddBoxZone("mayor_stash", vector3(-566.25, -191.29, 38.22), 2.6, 1.7, {
        heading=30,
        minZ=36.62,
        maxZ=41.02
    })
    exports['FIXDEV-interact']:AddPeekEntryByPolyTarget("mayor_stash", {{
        event = "FIXDEV-gov:openMayorStash",
        id = "mayorStash",
        icon = "box-open",
        label = "Open Stash",
        parameters = {},
    }}, { distance = { radius = 3.5 } })
end)


AddEventHandler("FIXDEV-gov:openMayorStash", function()
    local job = exports["isPed"]:isPed("myjob")
    if job ~= "mayor" then return end

    TriggerEvent("server-inventory-open", "1", "mayor_stash")
end)