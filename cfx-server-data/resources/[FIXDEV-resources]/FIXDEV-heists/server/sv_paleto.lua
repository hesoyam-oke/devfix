local LootPaleto = false
CnaRob = true
Step1 = false

RegisterServerEvent("step1enable", function()
    local source = source
    Step1 = true
end)

RegisterServerEvent("FIXDEV-paleto:startCoolDown", function()
    local source = source
    CnaRob = false
    Available = false
    CreateThread(function()
        while true do
            Citizen.Wait(7200000)
            CnaRob = true
            Available = true
            TriggerServerEvent('FIXDEV-doors:change-lock-state', 45, true) 
        end
    end)
end)

RegisterServerEvent('FIXDEV-paleto:tut_tut')
AddEventHandler('FIXDEV-paleto:tut_tut', function()
    local src = source
    if not LootPaleto then
        LootPaleto = true
        TriggerClientEvent('FIXDEV-vault:grab', src)
        Citizen.Wait(40000)
        LootPaleto = false
    end
end)

RegisterServerEvent('FIXDEV-paleto:hacklaptop')
AddEventHandler('FIXDEV-paleto:hacklaptop', function()
    if Step1 then
        TriggerClientEvent('FIXDEV-paleto:startpaleto', source)
    end
end)