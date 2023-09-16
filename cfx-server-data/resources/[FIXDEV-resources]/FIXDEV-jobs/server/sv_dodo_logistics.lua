RegisterServerEvent('FIXDEV-jobs:dodoLogisticsPayout')
AddEventHandler('FIXDEV-jobs:dodoLogisticsPayout', function()
    local src = tonumber(source)
    local user = exports["FIXDEV-base"]:getModule("Player"):GetUser(src)
    local payment = math.random(250, 325)

    user:addBank(payment)
    TriggerClientEvent('DoLongHudText', src, 'You completed the delivery and got $'..payment , 1)
end)

RPC.register('FIXDEV-jobs:dodoStarted', function(source)
    for k, v in pairs(GetPlayers()) do
        local user = exports['FIXDEV-base']:getModule('Player'):GetUser(tonumber(v))
        local cid = user:getCurrentCharacter().id
        local groupID = exports['FIXDEV-phone']:GetMyGroupID(v)

        exports.oxmysql:execute("SELECT members FROM job_group WHERE id = ?", {groupID}, function(result)
            print(result[1])
            if result[1] ~= nil then
                local jobMembers = json.decode(result[1].members)
                for k,v in ipairs(jobMembers) do
                    TriggerClientEvent('FIXDEV-jobs:sendDodoNoti', v)
                end
            end
        end)
        return
    end
end)

RPC.register('FIXDEV-jobs:getADeliveryLocationDodo', function(source, location)
    for k, v in pairs(GetPlayers()) do
        local user = exports['FIXDEV-base']:getModule('Player'):GetUser(tonumber(v))
        local cid = user:getCurrentCharacter().id
        local groupID = exports['FIXDEV-phone']:GetMyGroupID(v)

        exports.oxmysql:execute("SELECT members FROM job_group WHERE id = ?", {groupID}, function(result)
            print(result[1])
            if result[1] ~= nil then
                local jobMembers = json.decode(result[1].members)
                for k,v in ipairs(jobMembers) do
                    TriggerClientEvent('FIXDEV-jobs:dodoLogisticsGetJob', v, location)
                end
            end
        end)
        return
    end
end)

RPC.register('FIXDEV-jobs:returnBackDodoDock', function(source)
    for k, v in pairs(GetPlayers()) do
        local user = exports['FIXDEV-base']:getModule('Player'):GetUser(tonumber(v))
        local cid = user:getCurrentCharacter().id
        local groupID = exports['FIXDEV-phone']:GetMyGroupID(v)

        exports.oxmysql:execute("SELECT members FROM job_group WHERE id = ?", {groupID}, function(result)
            print(result[1])
            if result[1] ~= nil then
                local jobMembers = json.decode(result[1].members)
                for k,v in ipairs(jobMembers) do
                    TriggerClientEvent('FIXDEV-jobs:returningDodo', v)
                end
            end
        end)
        return
    end
end)