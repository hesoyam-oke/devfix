RPC.register('FIXDEV-jobs:setNotificiationForGroupMembersDelivery', function(source)
    for k, v in pairs(GetPlayers()) do
        local user = exports['FIXDEV-base']:getModule('Player'):GetUser(tonumber(v))
        local cid = user:getCurrentCharacter().id
        local groupID = exports['FIXDEV-phone']:GetMyGroupID(v)

        exports.oxmysql:execute("SELECT members FROM job_group WHERE id = ?", {groupID}, function(result)
            if result[1] ~= nil then
                local jobMembers = json.decode(result[1].members)
                for k,v in ipairs(jobMembers) do
                    TriggerClientEvent('FIXDEV-phone:setNotiGroupJobDeliveries', v)
                end
            end
        end)
        return
    end
end)

RPC.register('FIXDEV-jobs:getStoreForJobDeliveries', function(source, storeNum)
    for k, v in pairs(GetPlayers()) do
        local user = exports['FIXDEV-base']:getModule('Player'):GetUser(tonumber(v))
        local cid = user:getCurrentCharacter().id
        local groupID = exports['FIXDEV-phone']:GetMyGroupID(v)

        exports.oxmysql:execute("SELECT members FROM job_group WHERE id = ?", {groupID}, function(result)
            if result[1] ~= nil then
                local jobMembers = json.decode(result[1].members)
                for k,v in ipairs(jobMembers) do
                    TriggerClientEvent('FIXDEV-jobs:getDeliveryJobDeliveries', v, storeNum)
                end
            end
        end)
        return
    end
end)

RPC.register('FIXDEV-jobs:grabGoodsDelivieries', function(source)
    for k, v in pairs(GetPlayers()) do
        local user = exports['FIXDEV-base']:getModule('Player'):GetUser(tonumber(v))
        local cid = user:getCurrentCharacter().id
        local groupID = exports['FIXDEV-phone']:GetMyGroupID(v)

        exports.oxmysql:execute("SELECT members FROM job_group WHERE id = ?", {groupID}, function(result)
            if result[1] ~= nil then
                local jobMembers = json.decode(result[1].members)
                for k,v in ipairs(jobMembers) do
                    TriggerClientEvent('FIXDEV-phone:groupedJobsGrabGoodsDelivieries', v)
                end
            end
        end)
        return
    end
end)

RPC.register('FIXDEV-jobs:grabbedGoodsDeliveries', function(source)
    for k, v in pairs(GetPlayers()) do
        local user = exports['FIXDEV-base']:getModule('Player'):GetUser(tonumber(v))
        local cid = user:getCurrentCharacter().id
        local groupID = exports['FIXDEV-phone']:GetMyGroupID(v)

        exports.oxmysql:execute("SELECT members FROM job_group WHERE id = ?", {groupID}, function(result)
            print(result[1])
            if result[1] ~= nil then
                local jobMembers = json.decode(result[1].members)
                for k,v in ipairs(jobMembers) do
                    print('FIXDEV-jobs:dropGoodsInStoreDeliveries | Should be sent for the group members.')
                    TriggerClientEvent('FIXDEV-jobs:dropGoodsInStoreDeliveries', v)
                end
            end
        end)
        return
    end
end)

RPC.register('FIXDEV-jobs:returnDepoDeliveries', function(source)
    for k, v in pairs(GetPlayers()) do
        local user = exports['FIXDEV-base']:getModule('Player'):GetUser(tonumber(v))
        local cid = user:getCurrentCharacter().id
        local groupID = exports['FIXDEV-phone']:GetMyGroupID(v)

        exports.oxmysql:execute("SELECT members FROM job_group WHERE id = ?", {groupID}, function(result)
            if result[1] ~= nil then
                local jobMembers = json.decode(result[1].members)
                for k,v in ipairs(jobMembers) do
                    TriggerClientEvent('FIXDEV-jobs:deliveryReturnToDepoDeliveries', v)
                end
            end
        end)
        return
    end
end)

RPC.register('FIXDEV-jobs:dropGoodsDelivieries', function(source)
    for k, v in pairs(GetPlayers()) do
        local user = exports['FIXDEV-base']:getModule('Player'):GetUser(tonumber(v))
        local cid = user:getCurrentCharacter().id
        local groupID = exports['FIXDEV-phone']:GetMyGroupID(v)

        exports.oxmysql:execute("SELECT members FROM job_group WHERE id = ?", {groupID}, function(result)
            if result[1] ~= nil then
                local jobMembers = json.decode(result[1].members)
                for k,v in ipairs(jobMembers) do
                    TriggerClientEvent('FIXDEV-jobs:groupSyncDropGoods', v)
                end
            end
        end)
        return
    end
end)