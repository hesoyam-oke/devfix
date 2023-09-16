RegisterServerEvent('FIXDEV-vehicles:ApplyNitrous')
AddEventHandler('FIXDEV-vehicles:ApplyNitrous', function()
     TriggerClientEvent("FIXDEV-nitro:client:placeNitro", source)
end) 

RegisterServerEvent('FIXDEV-nitro:server:particlefx')
AddEventHandler('FIXDEV-nitro:server:particlefx', function(veh)
     TriggerClientEvent('FIXDEV-nitro:client:particlefx', -1, veh)
end)

RegisterServerEvent('FIXDEV-nitro:server:particlefisfis')
AddEventHandler('FIXDEV-nitro:server:particlefisfis', function(type, veh)
     if type == 'fisfisacc' then
          TriggerClientEvent('FIXDEV-nitro:client:particlefisfis', -1, 'fisfisac', veh)
     elseif type == 'fisfiskapatt' then
          TriggerClientEvent('FIXDEV-nitro:client:particlefisfis', -1, 'fisfiskapat', veh)
     end
end)