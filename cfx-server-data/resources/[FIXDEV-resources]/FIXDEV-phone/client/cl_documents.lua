RegisterNUICallback("getDocuments", function(data, cb)
    SendNUIMessage({
        openSection = "addDocuments",
        documentData = RPC.execute("FIXDEV-phone:getDocuments", data.pType)
    })
end)

RegisterNUICallback("deleteDocument", function(data, cb)
    RPC.execute("FIXDEV-phone:deleteDocument", data.documentID)
end)

RegisterNUICallback("updateDocument", function(data, cb)
    RPC.execute("FIXDEV-phone:updateDocument", data.documentID, data.documentTitle, data.documentText)
end)

RegisterNUICallback("createDocument", function(data, cb)
    RPC.execute("FIXDEV-phone:createDocument", exports['isPed']:isPed("cid"), "New Document", "Text Goes Here", data.documentType)
end)

RegisterNUICallback("shareDocumentPermanent", function(data)
    RPC.execute("FIXDEV-phone:shareDocumentPermanent", data.documentID, data.targetCID)
end)

RegisterNUICallback("shareDocumentLocal", function(data)
    local players, distances, coords = GetClosestPlayers(
        GetOffsetFromEntityInWorldCoords(GetPlayerPed(PlayerId()), 0.0, 2.0, 0.0), 3.0)
    for k, v in pairs(players) do
        RPC.execute("FIXDEV-phone:sendDocumentEvent", v, data.documentID)
    end
end)


RegisterNetEvent("FIXDEV-phone:sendDocumentEvent", function(documentID)
    sendDocumentEvent(documentID)
end)

function GetClosestPlayers()
    local players = GetPlayers()
    local ply = PlayerPedId()
    local plyCoords = GetEntityCoords(PlayerPedId())
    local closestplayers = {}
    local closestdistance = {}
    local closestcoords = {}
    local dist = 5.0

    for index, value in ipairs(players) do
        local target = GetPlayerPed(value)
        if (target ~= ply) then
            local targetCoords = GetEntityCoords(GetPlayerPed(value), 0)
            local distance = #(vector3(targetCoords["x"], targetCoords["y"], targetCoords["z"]) -
                                 vector3(plyCoords["x"], plyCoords["y"], plyCoords["z"]))
            if (distance < dist) then
                valueID = GetPlayerServerId(value)
                closestplayers[#closestplayers + 1] = valueID
                closestdistance[#closestdistance + 1] = distance
                closestcoords[#closestcoords + 1] = {targetCoords["x"], targetCoords["y"], targetCoords["z"]}

            end
        end
    end
    return closestplayers, closestdistance, closestcoords
end

function sendDocumentEvent(dID)    
    data = {documentID = dID}
    phoneBillNotification("documents", data, '')
end

RegisterNUICallback("acceptDocumentReceiveRequest", function(data)
    local pDocShared = RPC.execute("FIXDEV-phone:acceptDocumentReceiveRequest", data.documentID)
    SendNUIMessage({
        openSection = "openSharedDocument",
        documentData = pDocShared
    })
end)

RegisterNUICallback("dropQRCode", function(data)
    local coords = GetEntityCoords(PlayerPedId())
    TriggerServerEvent("server:newNote",data.documentID,coords["x"],coords["y"],coords["z"])
end)