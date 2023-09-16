Citizen.CreateThread(function()
    for id, zone in ipairs(HiveZones) do
        exports["FIXDEV-polyzone"]:AddCircleZone("FIXDEV-beekeeping:bee_zone", zone[1], zone[2],{
            zoneEvents={"FIXDEV-beekeeping:trigger_zone"},
            data = {
                id = id,
            },
        })
    end
end)