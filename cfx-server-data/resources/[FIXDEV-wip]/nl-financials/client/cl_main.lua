--[[

    Variables

]]

local atmModels = {
    -1126237515,
    506770882,
    -870868698,
    150237004,
    -239124254,
    -1364697528,
}

nearBank = false

--[[

    Functions

]]

function isNearATM()
    for i, v in ipairs(atmModels) do
        local objFound = GetClosestObjectOfType(GetEntityCoords(PlayerPedId()), 0.75, v, 0, 0, 0)
        if DoesEntityExist(objFound) then
            TaskTurnPedToFaceEntity(PlayerPedId(), objFound, 3.0)
            return true
        end
    end
    return false
end

function financialAnimation(pIsATM, pIsOpening)
    local playerId = PlayerPedId()

    if pIsATM then
        loadAnimDict("amb@prop_human_atm@male@enter")
        loadAnimDict("amb@prop_human_atm@male@exit")
        loadAnimDict("amb@prop_human_atm@male@idle_a")

        if pIsOpening then
            TaskPlayAnim(playerId, "amb@prop_human_atm@male@idle_a", "idle_b", 1.0, 1.0, -1, 49, 0, 0, 0, 0)
            local finished = exports["FIXDEV-taskbar"]:taskBar(3000, "Inserindo cartão")
            ClearPedSecondaryTask(playerId)
        else
            ClearPedTasks(playerId)
            TaskPlayAnim(playerId, "amb@prop_human_atm@male@exit", "exit", 1.0, 1.0, -1, 49, 0, 0, 0, 0)
            local finished = exports["FIXDEV-taskbar"]:taskBar(1000, "Retirando cartão")
            ClearPedTasks(playerId)
        end
    else
        loadAnimDict("mp_common")

        if pIsOpening then
            ClearPedTasks()
            TaskPlayAnim(playerId, "mp_common", "givetake1_a", 1.0, 1.0, -1, 49, 0, 0, 0, 0)
            local finished = exports["FIXDEV-taskbar"]:taskBar(1000, "Mostrando Documentos")
            ClearPedTasks(playerId)
        else
            TaskPlayAnim(playerId, "mp_common", "givetake1_a", 1.0, 1.0, -1, 49, 0, 0, 0, 0)
            local finished = exports["FIXDEV-taskbar"]:taskBar(1000, "Coletando documentação")
            Citizen.Wait(1000)
            ClearPedTasks(playerId)
        end
    end
end

function isNearBankOrATM()
    if not nearBank and not isNearATM() then
        return false
    end
    return true
end

--[[

    Exports

]]

exports("isNearBankOrATM", isNearBankOrATM)

--[[

    Events

]]

RegisterNetEvent("financial:openUI")
AddEventHandler("financial:openUI", function()
    local isNearATM = isNearATM()
    if isNearATM then
        financialAnimation(isNearATM, true)
        Citizen.Wait(1400)
        exports["FIXDEV-bank"]:openUI(isNearATM)
    end
end)