cooldownglobal = 0
Available = true

RegisterServerEvent("FIXDEV-fleeca:startcheck")
AddEventHandler("FIXDEV-fleeca:startcheck", function(bank)
    local _source = source
    globalonaction = true
    TriggerClientEvent('inventory:removeItem', _source, 'hacklaptop', 1)
    TriggerClientEvent("FIXDEV-fleeca:outcome", _source, true, bank)
end)

RegisterServerEvent("FIXDEV-fleeca:TimePoggers")
AddEventHandler("FIXDEV-fleeca:TimePoggers", function()
    local _source = source
    TriggerClientEvent("FIXDEV-fleeca:outcome", _source, false, "A bank as been recently robbed. You need to wait "..math.floor((fleeca.cooldown - (os.time() - cooldownglobal)) / 60)..":"..math.fmod((fleeca.cooldown - (os.time() - cooldownglobal)), 60))
end)

RegisterServerEvent("FIXDEV-fleeca:DoorAccessPoggers")
AddEventHandler("FIXDEV-fleeca:DoorAccessPoggers", function()
    local _source = source
    TriggerClientEvent("FIXDEV-fleeca:outcome", _source, false, "There is a bank currently being robbed.")
end)

RegisterServerEvent("FIXDEV-fleeca:lootup")
AddEventHandler("FIXDEV-fleeca:lootup", function(var, var2)
    TriggerClientEvent("FIXDEV-fleeca:lootup_c", -1, var, var2)
end)

RegisterServerEvent("FIXDEV-fleeca:openDoor")
AddEventHandler("FIXDEV-fleeca:openDoor", function(coords, method)
    TriggerClientEvent("FIXDEV-fleeca:openDoor_c", -1, coords, method)
end)

RegisterServerEvent("FIXDEV-fleeca:startLoot")
AddEventHandler("FIXDEV-fleeca:startLoot", function(data, name)
    TriggerClientEvent("FIXDEV-fleeca:startLoot_c", -1, data, name)
end)

RegisterServerEvent("FIXDEV-fleeca:stopHeist")
AddEventHandler("FIXDEV-fleeca:stopHeist", function(name)
    TriggerClientEvent("FIXDEV-fleeca:stopHeist_c", -1, name)
end)

RegisterServerEvent("FIXDEV-fleeca:rewardCash")
AddEventHandler("FIXDEV-fleeca:rewardCash", function()
    local reward = math.random(1, 2)
    local mathfunc = math.random(200)
    local rare = math.random(1,1)
    
    if mathfunc == 15 then
      TriggerClientEvent('FIXDEV-user:receiveItem', source, 'heistusb4', 1)
    end
    TriggerClientEvent("FIXDEV-user:receiveItem", source, "band", reward)
end)

RegisterServerEvent("FIXDEV-fleeca:setCooldown")
AddEventHandler("FIXDEV-fleeca:setCooldown", function(name)
    cooldownglobal = os.time()
    globalonaction = false
    TriggerClientEvent("FIXDEV-fleeca:resetDoorState", -1, name)
end)

RegisterServerEvent("FIXDEV-fleeca:getBanksSV")
AddEventHandler("FIXDEV-fleeca:getBanksSV", function()
    local banks = fleeca.Banks
    TriggerClientEvent('FIXDEV-fleeca:getBanks', -1, fleeca.Banks)
end)

local cooldownAttempts = 5

RegisterServerEvent("FIXDEV-fleeca:getHitSV")
AddEventHandler("FIXDEV-fleeca:getHitSV", function()
    TriggerClientEvent('FIXDEV-fleeca:getHit', -1, cooldownAttempts)
end)

RegisterServerEvent("FIXDEV-fleeca:getHitSVSV")
AddEventHandler("FIXDEV-fleeca:getHitSVSV", function(fleecaBanksTimes)
    cooldownAttempts = fleecaBanksTimes
end)

local doorCheckFleeca = false

RegisterServerEvent("FIXDEV-fleeca:getGetDoorStateSV")
AddEventHandler("FIXDEV-fleeca:getGetDoorStateSV", function()
    TriggerClientEvent('FIXDEV-fleeca:getDoorCheckCL', -1, doorCheckFleeca)
end)

RegisterServerEvent("FIXDEV-fleeca:getGetDoorStateSVSV")
AddEventHandler("FIXDEV-fleeca:getGetDoorStateSVSV", function(fleecaBanksDoors)
    doorCheckFleeca = fleecaBanksDoors
end)


RegisterServerEvent("FIXDEV-fleeca:getTimeSV")
AddEventHandler("FIXDEV-fleeca:getTimeSV", function()
    TriggerClientEvent('FIXDEV-fleeca:GetTimeCL', -1, cooldownglobal)
end)

RegisterServerEvent("FIXDEV-fleeca:getTime2SV")
AddEventHandler("FIXDEV-fleeca:getTime2SV", function()
    TriggerClientEvent('FIXDEV-fleeca:GetTime2CL', -1, (os.time() - fleeca.cooldown))
end)

RegisterServerEvent("FIXDEV-fleeca:getDoorAccessSV")
AddEventHandler("FIXDEV-fleeca:getDoorAccessSV", function()
    TriggerClientEvent('FIXDEV-fleeca:GetDoorAccessCL', -1, globalonaction)
end)

RegisterServerEvent('charge:fleeca')
AddEventHandler('charge:fleeca', function(amount, bankname)
  local _source = source
  local user = exports["FIXDEV-base"]:getModule("Player"):GetUser(source)

    if user:getCash() >= amount then
        user:removeMoney(amount)
        TriggerClientEvent('aspect:bankemail', source, bankname)
    else
        TriggerClientEvent('DoLongHudText', source, 'You dont have enough money!', 2)
    end
end)

RegisterServerEvent('FIXDEV-robbery:server:setBankState')
AddEventHandler('FIXDEV-robbery:server:setBankState', function(bankId, state)
    if bankId == "pacific" then
       print('[QUEER]')
    else
        if not robberyBusy then
            Config.SmallBanks[bankId]["isOpened"] = state
            TriggerClientEvent('FIXDEV-robbery:client:setBankState', -1, bankId, state)
            TriggerEvent('FIXDEV-robbery:server:SetSmallbankTimeout', bankId)
            TriggerEvent('aspect:bankstore', bankId, state)
        end
    end
    robberyBusy = true
end)

RegisterServerEvent('FIXDEV-robbery:server:SetSmallbankTimeout')
 AddEventHandler('FIXDEV-robbery:server:SetSmallbankTimeout', function(BankId)
     if not robberyBusy then
        Citizen.Wait(3600000)
        Config.SmallBanks[BankId]["isOpened"] = false
        timeOut = false
        robberyBusy = false
        TriggerClientEvent('FIXDEV-robbery:client:ResetFleecaLockers', -1, BankId)
        TriggerEvent('lh-banking:server:SetBankClosed', BankId, false)
     end
 end)


local Loot = false

RegisterServerEvent('FIXDEV-fleeca:tut_tut')
AddEventHandler('FIXDEV-fleeca:tut_tut', function()
    local src = source
    if not Loot then
        Loot = true
        TriggerClientEvent('FIXDEV-fleeca:grab', src)
        Citizen.Wait(40000)
        Loot = false
    end
end)

RegisterServerEvent('voidrp-heists:fleeca_availability')
AddEventHandler('voidrp-heists:fleeca_availability', function()
    local src = source
    
    if Available then
        TriggerClientEvent('FIXDEV-heists:fleeca_available', src)
    else
        TriggerClientEvent('FIXDEV-heists:fleeca_unavailable', src)
    end
end)

RegisterServerEvent('FIXDEV-heists:fleecaBankLog')
AddEventHandler('FIXDEV-heists:fleecaBankLog', function()
    local src = source
    local user = exports["FIXDEV-base"]:getModule("Player"):GetUser(src)
    local charInfo = user:getCurrentCharacter()
    local pName = GetPlayerName(source)

    local connect = {
        {
          ["color"] = color,
          ["title"] = "** np [Heists] **",
          ["description"] = "Steam Name: "..pName.." | Started Robbing a Fleeca Bank",
        }
      }
      PerformHttpRequest("https://discord.com/api/webhooks/1012083008263684217/pt-XMDUWT8y93DpqGme9uMX_5RfXUmg1xCJxzaps92t0wfR4WcMq9FXRD2jIr7Kf81WW", function(err, text, headers) end, 'POST', json.encode({username = "np | Job Payout Log", embeds = connect, avatar_url = "https://i.imgur.com/hMqEEQp.png"}), { ['Content-Type'] = 'application/json' })
end)