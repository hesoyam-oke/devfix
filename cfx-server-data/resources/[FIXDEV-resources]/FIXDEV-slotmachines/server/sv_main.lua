local slotMachines = {
    --[chairId] 
}
for i=0,127,1 do
    slotMachines[i] = false
end
local blackjackGameInProgress = {}
local blackjackGameData = {}
local not_won_yet = true
local jackPot = 10000
local payout = 0

RPC.register('FIXDEV-slotmachines-sv:checkIfSlotMachinesState',function()
    return true , jackPot
end)

RPC.register('FIXDEV-casino:getSpawnedPedCoords',function()
    local table = {
        table = {
        coords = {
            978.28, 30.9, 71.46, 
        },
        model = 'g_m_y_mexgang_01',
        heading = 312.77,
        _pedType = 30,
        scenario = 'WORLD_HUMAN_SMOKING'
      }}
      return table
end)

RegisterServerEvent('FIXDEV-slotmachines-sv:getMachineData', function(data)
    TriggerClientEvent('FIXDEV-slotmachines-cl:getMachineData',-1,slotMachines)
end)

RegisterNetEvent("FIXDEV-slotmachines-sv:sitDownAtSlotMachine")
AddEventHandler("FIXDEV-slotmachines-sv:sitDownAtSlotMachine", function(chairId)
    local source = source
    if source ~= nil then
        for k,v in pairs(slotMachines) do 
            if v == source then 
                slotMachines[k] = false
                return
            end
        end
        slotMachines[chairId] = source
        TriggerClientEvent("FIXDEV-slotmachines-cl:updateMachineData",-1,slotMachines,source)
        TriggerClientEvent("FIXDEV-slotmachines-cl:sitDownAtSlotMachine",source,chairId)
    else
        TriggerClientEvent("DoLongHudText",source,"You can't sit you down.", 2)
    end
end)

RegisterNetEvent("FIXDEV-slotmachines-sv:getUpFromSlotMachine")
AddEventHandler("FIXDEV-slotmachines-sv:getUpFromSlotMachine", function(chairId)
    local source = source
    if source ~= nil then 
        for k,v in pairs(slotMachines) do 
            if v == source then 
                slotMachines[k] = false
            end
        end
        TriggerClientEvent("FIXDEV-slotmachines-cl:updateMachineData",-1,slotMachines)
    end
end)

RegisterNetEvent("FIXDEV-slotmachines-sv:spinMachine")
AddEventHandler("FIXDEV-slotmachines-sv:spinMachine", function(slotPos, model, betamount , cid ,pSlotID)
    local src = source
    local math = math.random(40)
    jackPot = jackPot + betamount
    payout = betamount * 3
    exports['FIXDEV-base']:GetModule('RemoveCash')(src, betamount)
    if math == 1 then
        spinReel('winner')
        TriggerClientEvent('FIXDEV-slotmachines-cl:playSlotMachineSound',src ,slotPos ,model, 'Beep_Red')
    elseif math == 2 then
        spinReel('loser')
    elseif math == 3 then
        spinReel('troll')
    elseif math > 3 then
        spinReel('loser')
    end
end)

-- Functions below .

function spinReel (pState)
    local src = source
    local rotA , rotB ,rotC = math.random(500) * 0.7 , math.random(500) * 0.9 , math.random(500) * 0.3
    local random = math.random(4)
    if pState == 'loser' then
    Citizen.Wait(1200)
    TriggerClientEvent('FIXDEV-slotmachines-cl:stopReels',src,1,rotA)
    Citizen.Wait(1200)
    TriggerClientEvent('FIXDEV-slotmachines-cl:stopReels',src,2,rotB)
    Citizen.Wait(1200)
    TriggerClientEvent('FIXDEV-slotmachines-cl:stopReels',src,3,rotC)
    TriggerClientEvent('FIXDEV-slotmachines-cl:spinFinished',src, 0 )
    elseif pState == 'winner' then
        Citizen.Wait(1200)
        TriggerClientEvent('FIXDEV-slotmachines-cl:stopReels',src,1,1)
        Citizen.Wait(1200)
        TriggerClientEvent('FIXDEV-slotmachines-cl:stopReels',src,2,2)
        Citizen.Wait(1200)
        TriggerClientEvent('FIXDEV-slotmachines-cl:stopReels',src,3,3)
        TriggerClientEvent('FIXDEV-slotmachines-cl:spinFinished',src,payout)
        exports['FIXDEV-base']:GetModule('AddCash')(src, payout)
    elseif pState == 'troll' then
        Citizen.Wait(1200)
        TriggerClientEvent('FIXDEV-slotmachines-cl:stopReels',src,1,1)
        Citizen.Wait(1200)
        TriggerClientEvent('FIXDEV-slotmachines-cl:stopReels',src,2,2)
        Citizen.Wait(1200)
        TriggerClientEvent('FIXDEV-slotmachines-cl:stopReels',src,3,22.43)
        TriggerClientEvent('FIXDEV-slotmachines-cl:spinFinished',src,0)
  end
    local winChance = math.random(1,1000)
    if winChance < 10 and not_won_yet and pState == 'winner' then 
        TriggerClientEvent('FIXDEV-slotmachines-cl:spinFinished',src, jackPot)
        exports['FIXDEV-base']:GetModule('AddCash')(src, jackPot)
        TriggerClientEvent('chatMessage', -1, "^3[CASINO]", {255, 0, 0}, "Somebody just won the jackpot ! Total : " ..jackPot)
        jackPot = 10000
    end
end