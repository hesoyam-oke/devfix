cooldownglobalPaleto = 0

RegisterServerEvent("FIXDEV-paleto:startcheck")
AddEventHandler("FIXDEV-paleto:startcheck", function(bank)
    local _source = source
    globalonactionPaleto = true
    TriggerClientEvent('FIXDEV-inv:removeItem', _source, 'bluetablet', 1)
    TriggerClientEvent("FIXDEV-paleto:outcome", _source, true, bank)
end)

RegisterServerEvent("FIXDEV-paleto:TimePoggers")
AddEventHandler("FIXDEV-paleto:TimePoggers", function()
    local _source = source
    TriggerClientEvent("FIXDEV-paleto:outcome", _source, false, "This bank recently robbed. You need to wait "..math.floor((paleto.cooldown - (os.time() - cooldownglobalPaleto)) / 60)..":"..math.fmod((paleto.cooldown - (os.time() - cooldownglobalPaleto)), 60))
end)

RegisterServerEvent("FIXDEV-paleto:DoorAccessPoggers")
AddEventHandler("FIXDEV-paleto:DoorAccessPoggers", function()
    local _source = source
    TriggerClientEvent("FIXDEV-paleto:outcome", _source, false, "There is a bank currently being robbed.")
end)

RegisterServerEvent("FIXDEV-paleto:lootup")
AddEventHandler("FIXDEV-paleto:lootup", function(var, var2)
    TriggerClientEvent("FIXDEV-paleto:lootup_c", -1, var, var2)
end)

RegisterServerEvent("FIXDEV-paleto:openDoor")
AddEventHandler("FIXDEV-paleto:openDoor", function(coords, method)
    TriggerClientEvent("FIXDEV-paleto:OpenPaletoDoor", -1)
end)

RegisterServerEvent("FIXDEV-paleto:closeDoor")
AddEventHandler("FIXDEV-paleto:closeDoor", function(coords, method)
    TriggerClientEvent("FIXDEV-paleto:ClosePaletoDoor", -1)
end)

RegisterServerEvent("FIXDEV-paleto:startLoot")
AddEventHandler("FIXDEV-paleto:startLoot", function(data, name)
    TriggerClientEvent("FIXDEV-paleto:startLoot_c", -1, data, name)
end)

RegisterServerEvent("FIXDEV-paleto:stopHeist")
AddEventHandler("FIXDEV-paleto:stopHeist", function(name)
    TriggerClientEvent("FIXDEV-paleto:stopHeist_c", -1, name)
end)

RegisterServerEvent("FIXDEV-paleto:rewardCash")
AddEventHandler("FIXDEV-paleto:rewardCash", function()
    local reward = math.random(2, 4)
    TriggerClientEvent("FIXDEV-user:receiveItem", source, "band", reward)
end)

RegisterServerEvent("FIXDEV-paleto:setCooldown")
AddEventHandler("FIXDEV-paleto:setCooldown", function(name)
    cooldownglobalPaleto = os.time()
    globalonactionPaleto = false
    TriggerClientEvent("FIXDEV-paleto:resetDoorState", -1, name)
end)


RegisterServerEvent("FIXDEV-paleto:getBanksSV")
AddEventHandler("FIXDEV-paleto:getBanksSV", function()
    TriggerClientEvent('FIXDEV-paleto:getBanks', -1, paleto.Banks)
end)

local cooldownAttemptsPaleto = 3

RegisterServerEvent("FIXDEV-paleto:getHitSV")
AddEventHandler("FIXDEV-paleto:getHitSV", function()
    TriggerClientEvent('FIXDEV-paleto:getHit', -1, cooldownAttemptsPaleto)
end)

RegisterServerEvent("FIXDEV-paleto:getHitSVSV")
AddEventHandler("FIXDEV-paleto:getHitSVSV", function(paletoBanksTimes)
    cooldownAttemptsPaleto = paletoBanksTimes
end)

local doorCheckPaleto = false

RegisterServerEvent("FIXDEV-paleto:getGetDoorStateSV")
AddEventHandler("FIXDEV-paleto:getGetDoorStateSV", function()
    TriggerClientEvent('FIXDEV-paleto:getDoorCheckCL', -1, doorCheckPaleto)
end)

RegisterServerEvent("FIXDEV-paleto:getGetDoorStateSVSV")
AddEventHandler("FIXDEV-paleto:getGetDoorStateSVSV", function(paletoBanksDoors)
    doorCheckPaleto = paletoBanksDoors
end)


RegisterServerEvent("FIXDEV-paleto:getTimeSV")
AddEventHandler("FIXDEV-paleto:getTimeSV", function()
    TriggerClientEvent('FIXDEV-paleto:GetTimeCL', -1, cooldownglobalPaleto)
end)

RegisterServerEvent("FIXDEV-paleto:getTime2SV")
AddEventHandler("FIXDEV-paleto:getTime2SV", function()
    TriggerClientEvent('FIXDEV-paleto:GetTime2CL', -1, (os.time() - paleto.cooldown))
end)

RegisterServerEvent("FIXDEV-paleto:getDoorAccessSV")
AddEventHandler("FIXDEV-paleto:getDoorAccessSV", function()
    TriggerClientEvent('FIXDEV-paleto:GetDoorAccessCL', -1, globalonactionPaleto)
end)