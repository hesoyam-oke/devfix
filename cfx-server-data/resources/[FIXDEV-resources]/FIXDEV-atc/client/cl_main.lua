HasRadarEnabled = false

RegisterNetEvent('FIXDEV-atc:enableRadar', function ()
    if HasRadarEnabled then return end

    HasRadarEnabled = true

    TriggerEvent('FIXDEV-voice:atc:connect')

    TriggerEvent('DoLongHudText', 'Connected to ATC Network')

    RPC.execute('FIXDEV-atc:setRadarStatus', HasRadarEnabled)
end)

RegisterNetEvent('FIXDEV-atc:disableRadar', function ()
    if not HasRadarEnabled then return end

    HasRadarEnabled = false

    DeleteBlipHandlers()

    TriggerEvent('FIXDEV-voice:atc:disconnect')

    TriggerEvent('DoLongHudText', 'Disconnected from ATC Network')

    RPC.execute('FIXDEV-atc:setRadarStatus', HasRadarEnabled)
end)

RegisterNetEvent('FIXDEV-atc:setAirSpace', function (pAirspace)
    if not HasRadarEnabled then return end

    SetBlipHandlers(pAirspace)

    SetAirTraffic(pAirspace)
end)

RegisterNetEvent('FIXDEV-atc:addToAirSpace', function (pAircraft)
    if not HasRadarEnabled then return end

    AddBlipHandler(pAircraft.netId, pAircraft.type, pAircraft.callsign or pAircraft.plate, pAircraft.coords)

    AddAircraftToTraffic(pAircraft.netId, pAircraft)
end)

RegisterNetEvent('FIXDEV-atc:removeFromAirSpace', function (pNetId)
    if not HasRadarEnabled then return end

    RemoveBlipHandler(pNetId)

    RemoveAircraftFromTraffic(pNetId)
end)

RegisterNetEvent('FIXDEV-atc:updateAirSpace', function (pAirspace)
    if not HasRadarEnabled then return end

    UpdateBlipHandlers(pAirspace)

    UpdateAirTraffic(pAirspace)
end)

RegisterNetEvent('FIXDEV-atc:updateFlightData', function (pNetID, pData)
    if not HasRadarEnabled then return end

    UpdateFlightData(pNetID, pData)

    if not pData.callsign then return end

    UpdateBlipCallsign(pNetID, pData.callsign)
end)