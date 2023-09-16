

RegisterServerEvent('FIXDEV-carrent:hasmoney')
AddEventHandler('FIXDEV-carrent:hasmoney', function(price, vehicle)
    local vehicleName = vehicle
    local user = exports["FIXDEV-base"]:getModule("Player"):GetUser(source)
    local money = tonumber(user:getCash())
    if money >= price then
            user:removeMoney(price)
            TriggerClientEvent("FIXDEV-carrent:spawncar", user.source, vehicleName)
    else
            TriggerClientEvent('DoLongHudText', user.source, 'You dont have enough money on you!', 2)
    end
end)






