Doors = {
    ["P1"] = {{loc = vector3(-105.41538238525, 6471.6791992188, 31.621948242188), txtloc = vector3(-105.41538238525, 6471.6791992188, 31.621948242188), state = nil, locked = true}},
}

RegisterServerEvent("FIXDEV-paleto:startcheck")
AddEventHandler("FIXDEV-paleto:startcheck", function(bank)
    local src = source

    if not Paleto.Banks[bank].onaction == true then
        if (os.time() - Paleto.cooldown) > Paleto.Banks[bank].lastrobbed then
            Paleto.Banks[bank].onaction = true
            TriggerClientEvent("FIXDEV-paleto:outcome", src, true, bank)
            TriggerClientEvent("FIXDEV-paleto:policenotify", -1, bank)
        else
            TriggerClientEvent("FIXDEV-paleto:outcome", src, false, "This bank recently robbed. You need to wait "..math.floor((Paleto.cooldown - (os.time() - Paleto.Banks[bank].lastrobbed)) / 60)..":"..math.fmod((Paleto.cooldown - (os.time() - Paleto.Banks[bank].lastrobbed)), 60))
        end
    else
        TriggerClientEvent("FIXDEV-paleto:outcome", src, false, "This bank is currently being robbed.")
    end
end)

RegisterCommand("testy", function()
    local src = source
    local reward = math.random(Paleto.mincash, Paleto.maxcash)
	
	if Paleto.blackmoney then
        TriggerClientEvent("player:receiveItem", src, "markedbills", 1)
        -- Player.Functions.AddItem('markedbills', 1, false, {worth = math.random(4500, 7000)})
    else
        if Paleto.blackmoney then
            TriggerClientEvent("player:receiveItem", src, "markedbills", 1)
            -- Player.Functions.AddItem('markedbills', 1, false, {worth = math.random(4500, 7000)})
        end
    end
end)

RegisterServerEvent("FIXDEV-paleto:lootup")
AddEventHandler("FIXDEV-paleto:lootup", function(var, var2)
    TriggerClientEvent("FIXDEV-paleto:lootup_c", -1, var, var2)
end)

RegisterServerEvent("FIXDEV-paleto:toggleVault")
AddEventHandler("FIXDEV-paleto:toggleVault", function(key, state)
    Doors[key][1].locked = state
    TriggerClientEvent("FIXDEV-paleto:toggleVault", -1, key, state)
end)

RegisterServerEvent("FIXDEV-paleto:updateVaultState")
AddEventHandler("FIXDEV-paleto:updateVaultState", function(key, state)
    Doors[key][1].state = state
end)

RegisterServerEvent("FIXDEV-paleto:startLoot")
AddEventHandler("FIXDEV-paleto:startLoot", function(data, name, players)
    local src = source

    for i = 10, #players, 10 do
        TriggerClientEvent("FIXDEV-paleto:startLoot_c", players[i], data, name)
    end
    TriggerClientEvent("FIXDEV-paleto:startLoot_c", src, data, name)
end)

RegisterServerEvent("FIXDEV-paleto:stopHeist")
AddEventHandler("FIXDEV-paleto:stopHeist", function(name)
    TriggerClientEvent("FIXDEV-paleto:stopHeist_c", -1, name)
end)

RegisterServerEvent("FIXDEV-paleto:rewardCash")
AddEventHandler("FIXDEV-paleto:rewardCash", function()
    local src = source
    local reward = math.random(Paleto.mincash, Paleto.maxcash)
	
	if Paleto.blackmoney then
        TriggerClientEvent("player:receiveItem", src, "markedbills", 250)
    else
        TriggerClientEvent("player:receiveItem", src, "markedbills", 425)
    end
end)

RegisterServerEvent("FIXDEV-paleto:setCooldown")
AddEventHandler("FIXDEV-paleto:setCooldown", function(name)
    Paleto.Banks[name].lastrobbed = os.time()
    Paleto.Banks[name].onaction = false
    TriggerClientEvent("FIXDEV-paleto:resetDoorState", -1, name)
end)

RPC.register("FIXDEV-paleto:getBanks", function(source)
    return Paleto.Banks, Doors
end)

 RegisterCommand("aan", function()
     TriggerClientEvent('FIXDEV-paleto:UseGreenLapTop', source)
 end)

-- RegisterServerEvent('rick:removeLaptop')
-- AddEventHandler('rick:removeLaptop', function()
--     local src = source
--     local Player = QBCore.Functions.GetPlayer(src)
--     Player.Functions.RemoveItem('green-laptop', 1)
-- end)


local doorCheckPaleto = false

RegisterServerEvent("FIXDEV-paleto:getGetDoorStateSV")
AddEventHandler("FIXDEV-paleto:getGetDoorStateSV", function()
    TriggerClientEvent('FIXDEV-paleto:getDoorCheckCL', -1, doorCheckPaleto)
end)

RegisterServerEvent("FIXDEV-paleto:getGetDoorStateSVSV")
AddEventHandler("FIXDEV-paleto:getGetDoorStateSVSV", function(paletoBanksDoors)
    doorCheckPaleto = paletoBanksDoors
end)

RegisterServerEvent("FIXDEV-paleto:openDoor")
AddEventHandler("FIXDEV-paleto:openDoor", function(coords, method)
    TriggerClientEvent("FIXDEV-paleto:OpenPaletoDoor", -1)
end)

RegisterServerEvent("FIXDEV-paleto:closeDoor")
AddEventHandler("FIXDEV-paleto:closeDoor", function(coords, method)
    TriggerClientEvent("FIXDEV-paleto:ClosePaletoDoor", -1)
end)