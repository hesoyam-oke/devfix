-- Green Tablet

RegisterNetEvent('FIXDEV-robberies:geenGTabletSV')
AddEventHandler('FIXDEV-robberies:geenGTabletSV', function()
    local src = source
    local cid = exports["FIXDEV-exports"]:GetPlayerCid(src)
    exports.oxmysql:execute('SELECT * FROM tablet_queue WHERE cid = ?', {cid}, function(result2)
        if result2[1] ~= nil then
            TriggerClientEvent('FIXDEV-notification:client:Alert', src, {style = 'error', duration = 3000, message = 'You are already in queue or you were recently in queue!'})
        else
            exports.oxmysql:execute("INSERT INTO tablet_queue (cid, type) VALUES (@cid, @type)", {['@cid'] = cid, ['@type'] = 'geentablet'})
            TriggerClientEvent('FIXDEV-robberies:getGTablet', src)
            TriggerClientEvent('FIXDEV-notification:client:Alert', src, {style = 'info', duration = 3000, message = 'You have been placed in a queue!'})
        end
    end)
end)

RegisterNetEvent('FIXDEV-robberies:removeQueueGreen')
AddEventHandler('FIXDEV-robberies:removeQueueGreen', function()
    local src = source
    local cid = exports["FIXDEV-exports"]:GetPlayerCid(src)
	exports.oxmysql:execute("DELETE FROM tablet_queue WHERE cid = @cid", {['cid'] = cid})
    TriggerClientEvent('FIXDEV-notification:client:Alert', src, {style = 'error', duration = 3000, message = 'You have been removed from the queue!'})
end)

--- Blue Tablet --

RegisterNetEvent('FIXDEV-robberies:blueBTabletSV')
AddEventHandler('FIXDEV-robberies:blueBTabletSV', function()
    local src = source
    local cid = exports["FIXDEV-exports"]:GetPlayerCid(src)
    exports.oxmysql:execute('SELECT * FROM tablet_queue WHERE cid = ?', {cid}, function(result2)
        if result2[1] ~= nil then
            TriggerClientEvent('FIXDEV-notification:client:Alert', src, {style = 'error', duration = 3000, message = 'You are already in queue or you were recently in queue!'})
        else
            exports.oxmysql:execute("INSERT INTO tablet_queue (cid, type) VALUES (@cid, @type)", {['@cid'] = cid, ['@type'] = 'bluetablet'})
            TriggerClientEvent('FIXDEV-robberies:getBTablet', src)
            TriggerClientEvent('FIXDEV-notification:client:Alert', src, {style = 'info', duration = 3000, message = 'You have been placed in a queue!'})
        end
    end)
end)

RegisterNetEvent('FIXDEV-robberies:removeQueueBlue')
AddEventHandler('FIXDEV-robberies:removeQueueBlue', function()
    local src = source
    local cid = exports["FIXDEV-exports"]:GetPlayerCid(src)
	exports.oxmysql:execute("DELETE FROM tablet_queue WHERE cid = @cid", {['cid'] = cid})
    TriggerClientEvent('FIXDEV-notification:client:Alert', src, {style = 'error', duration = 3000, message = 'You have been removed from the queue!'})
end)

--- Red Tablet --

RegisterNetEvent('FIXDEV-robberies:redTabletSV')
AddEventHandler('FIXDEV-robberies:redTabletSV', function()
    local src = source
    local cid = exports["FIXDEV-exports"]:GetPlayerCid(src)
    exports.oxmysql:execute('SELECT * FROM tablet_queue WHERE cid = ?', {cid}, function(result2)
        if result2[1] ~= nil then
            TriggerClientEvent('FIXDEV-notification:client:Alert', src, {style = 'error', duration = 3000, message = 'You are already in queue or you were recently in queue!'})
        else
            exports.oxmysql:execute("INSERT INTO tablet_queue (cid, type) VALUES (@cid, @type)", {['@cid'] = cid, ['@type'] = 'redtablet'})
            TriggerClientEvent('FIXDEV-robberies:getRedTablet', src)
            TriggerClientEvent('FIXDEV-notification:client:Alert', src, {style = 'info', duration = 3000, message = 'You have been placed in a queue!'})
        end
    end)
end)

RegisterNetEvent('FIXDEV-robberies:removeQueueRed')
AddEventHandler('FIXDEV-robberies:removeQueueRed', function()
    local src = source
    local cid = exports["FIXDEV-exports"]:GetPlayerCid(src)
	exports.oxmysql:execute("DELETE FROM tablet_queue WHERE cid = @cid", {['cid'] = cid})
    TriggerClientEvent('FIXDEV-notification:client:Alert', src, {style = 'error', duration = 3000, message = 'You have been removed from the queue!'})
end)

AddEventHandler('onResourceStart', function(resourceName)
    exports.oxmysql:execute('DELETE FROM tablet_queue', {}, function (result) end)
end)