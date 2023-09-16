
Citizen.CreateThread(function()
    exports["FIXDEV-polyzone"]:AddBoxZone("saint_stash_1", vector3(-1796.87, 439.61, 128.39), 1, 1, {
        name="saint_stash_1",
        heading=0,
        --debugPoly=false,
        minZ=124.59,
        maxZ=128.59
    })
end)

SaintsStash = false

RegisterNetEvent('FIXDEV-polyzone:enter')
AddEventHandler('FIXDEV-polyzone:enter', function(name)
    if name == "saint_stash_1" then
        SaintsStash = true     
        SaintsStashhhh()
        local isEmployed = exports["FIXDEV-business"]:IsEmployedAt("saints")
        if isEmployed then
            exports['FIXDEV-ui']:showInteraction("[E] Stash")
        end
    end
end)

RegisterNetEvent('FIXDEV-polyzone:exit')
AddEventHandler('FIXDEV-polyzone:exit', function(name)
    if name == "saint_stash_1" then
        SaintsStash = false
        exports['FIXDEV-ui']:hideInteraction()
    end
end)

function SaintsStashhhh()
	Citizen.CreateThread(function()
        while SaintsStash do
            Citizen.Wait(5)
			if IsControlJustReleased(0, 38) then
                local isEmployed = exports["FIXDEV-business"]:IsEmployedAt("saints")
                if isEmployed then
                    TriggerEvent('FIXDEV-stashes:openAspect', 1)
                end
			end
		end
	end)
end

RegisterNetEvent('FIXDEV-stashes:openAspect')
AddEventHandler('FIXDEV-stashes:openAspect', function(stashNum)
    TriggerEvent('server-inventory-open', '1', 'saints-stash'..stashNum)
end)