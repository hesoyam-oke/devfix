RPC.register('FIXDEV-jobs:towtruckingGetJob', function(source, jobLocation)
    for k, v in pairs(GetPlayers()) do
        local user = exports['FIXDEV-base']:getModule('Player'):GetUser(tonumber(v))
        local cid = user:getCurrentCharacter().id
        local groupId = exports['FIXDEV-phone']:GetMyGroupID(v)

        exports.oxmysql:execute("SELECT members FROM job_group WHERE id = ?", {groupId}, function(result)
            if result[1] ~= nil then
                local jobMembers = json.decode(result[1].members)
                for k,v in ipairs(jobMembers) do
                    TriggerClientEvent('FIXDEV-jobs:towingGetJob', v, jobLocation)
                end
            end
        end)
        return
    end
end)

RPC.register('FIXDEV-jobs:towtruckingReturnImpound', function(source)
    for k, v in pairs(GetPlayers()) do
        local user = exports['FIXDEV-base']:getModule('Player'):GetUser(tonumber(v))
        local cid = user:getCurrentCharacter().id
        local groupId = exports['FIXDEV-phone']:GetMyGroupID(v)
        
        exports.oxmysql:execute('SELECT members FROM job_group WHERE id = ?', {groupId}, function(result)
            if result[1] ~= nil then
                local jobMembers = json.decode(result[1].members)
                for k,v in ipairs(jobMembers) do 
                    TriggerClientEvent('FIXDEV-jobs:sendClientReturnImpound', v)
                end
            end
        end)
    end
end)

RPC.register('FIXDEV-jobs:syncVehiclePlateImpound', function(source, pPlate)
    for k, v in pairs(GetPlayers()) do
        local user = exports['FIXDEV-base']:getModule('Player'):GetUser(tonumber(v))
        local cid = user:getCurrentCharacter().id
        local groupId = exports['FIXDEV-phone']:GetMyGroupID(v)
        
        exports.oxmysql:execute('SELECT members FROM job_group WHERE id = ?', {groupId}, function(result)
            if result[1] ~= nil then
                local jobMembers = json.decode(result[1].members)
                for k,v in ipairs(jobMembers) do 
                    TriggerClientEvent('FIXDEV-jobs:towTruckPlateSync', v, pPlate)
                end
            end
        end)
    end
end)

RPC.register('FIXDEV-jobs:towTruckingAcceptImpoundOffer', function(source)
    for k, v in pairs(GetPlayers()) do
        local user = exports['FIXDEV-base']:getModule('Player'):GetUser(tonumber(v))
        local cid = user:getCurrentCharacter().id
        local groupId = exports['FIXDEV-phone']:GetMyGroupID(v)
        
        exports.oxmysql:execute('SELECT members FROM job_group WHERE id = ?', {groupId}, function(result)
            if result[1] ~= nil then
                local jobMembers = json.decode(result[1].members)
                for k,v in ipairs(jobMembers) do 
                    TriggerClientEvent('FIXDEV-jobs:acceptImpoundOffer', v)
                end
            end
        end)
    end
end)

RPC.register('FIXDEV-jobs:towTruckingDeclineImpoundOffer', function(source)
    for k, v in pairs(GetPlayers()) do
        local user = exports['FIXDEV-base']:getModule('Player'):GetUser(tonumber(v))
        local cid = user:getCurrentCharacter().id
        local groupId = exports['FIXDEV-phone']:GetMyGroupID(v)
        
        exports.oxmysql:execute('SELECT members FROM job_group WHERE id = ?', {groupId}, function(result)
            if result[1] ~= nil then
                local jobMembers = json.decode(result[1].members)
                for k,v in ipairs(jobMembers) do 
                    TriggerClientEvent('FIXDEV-jobs:rejectImpoundRequest', v)
                end
            end
        end)
    end
end)