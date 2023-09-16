DOCArmory = false

Citizen.CreateThread(function()
    exports["FIXDEV-polyzone"]:AddBoxZone("doc_armory", vector3(1843.9, 2573.99, 46.01), 1, 2.4, {
        name="doc_armory",
        heading=0,
        --debugPoly=true,
        minZ=44.01,
        maxZ=48.01
    })
end)

RegisterNetEvent('FIXDEV-polyzone:enter')
AddEventHandler('FIXDEV-polyzone:enter', function(name)
    if name == "doc_armory" then
        DOCArmory = true
        local myJob = exports["isPed"]:isPed("myJob")
        if myJob == 'doc' then
			DOC()
            exports['FIXDEV-ui']:showInteraction("[E] Armory")
        end
    end
end)

RegisterNetEvent('FIXDEV-polyzone:exit')
AddEventHandler('FIXDEV-polyzone:exit', function(name)
    if name == "doc_armory" then
        DOCArmory = false
        exports['FIXDEV-ui']:hideInteraction()
    end
end)

function DOC()
	Citizen.CreateThread(function()
        while DOCArmory do
            Citizen.Wait(5)
			if IsControlJustReleased(0, 38) then
                TriggerEvent('server-inventory-open', '17', 'Shop')
			end
		end
	end)
end