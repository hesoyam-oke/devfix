local ActiveSensors = {}
local polyzoneCreated = {}

local lastTrigger = 0

function SensorCreated(pObject, pEntity)
    if ActiveSensors[pObject.id] then
        return
    end

    if not polyzoneCreated[pObject.id] then
        local length = pObject.data.metadata.length or 3.5
        local offset = GetOffsetFromEntityInWorldCoords(pEntity, 0.0, -(length / 2), 0)
        exports['FIXDEV-polyzone']:AddBoxZone('movement_sensor', offset, pObject.data.metadata.length, 1.0, {
            data = { id = pObject.id },
            heading = pObject.data.rotation.z,
            minZ = pObject.z - 0.5,
            maxZ = pObject.z + 1.25,
        })
        polyzoneCreated[pObject.id] = true
    end

    ActiveSensors[pObject.id] = true
end

function SensorRemoved(pObject, pEntity)
    ActiveSensors[pObject.id] = nil
end

AddEventHandler('FIXDEV-polyzone:enter', function(pZone, pData)
    if pZone ~= 'movement_sensor' then return end

    local sensorId = pData.id
    if not sensorId then return end

    if ActiveSensors[sensorId] and lastTrigger + 10000 < GetGameTimer() then
        lastTrigger = GetGameTimer()
        RPC.execute('FIXDEV-usableprops:sensorTriggered', sensorId)
    end
end)
