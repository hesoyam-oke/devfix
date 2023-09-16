NPX.SpawnManager = {}

RegisterServerEvent('FIXDEV-base:spawnInitialized')
AddEventHandler('FIXDEV-base:spawnInitialized', function()
    local src = source
    TriggerClientEvent('FIXDEV-base:spawnInitialized', src)
end)