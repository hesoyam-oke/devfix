pCanBlow = false
canloot = false

RegisterServerEvent("FIXDEV-bobcat:effect")
AddEventHandler("FIXDEV-bobcat:effect", function(method)
    TriggerClientEvent("lumo:effectoutside", -1, method)
end)

RegisterServerEvent("FIXDEV-bobcat:effect2")
AddEventHandler("FIXDEV-bobcat:effect2", function(method)
    TriggerClientEvent("lumo:effectinside", -1, method)
end)

RegisterServerEvent("FIXDEV-bobcat:bubbles")
AddEventHandler("FIXDEV-bobcat:bubbles", function()
    canloot = true
    TriggerClientEvent("FIXDEV-bobcat:bubbles", -1)
end)

local searched1 = false
local searched2 = false
local searched3 = false

RegisterServerEvent("FIXDEV-bobcat:search_crate_1")
AddEventHandler("FIXDEV-bobcat:search_crate_1", function()
    local source = source
    
    if searched1 then
        TriggerClientEvent("DoLongHudText", source, "Already Searched")
    elseif canloot then
        TriggerClientEvent("FIXDEV-bobcat:search_crate_1", source)
        searched1 = true
    end
end)

RegisterServerEvent("FIXDEV-bobcat:search_crate_2")
AddEventHandler("FIXDEV-bobcat:search_crate_2", function()
    local source = source
    
    if searched2 then
        TriggerClientEvent("DoLongHudText", source, "Already Searched")
    elseif canloot then
        TriggerClientEvent("FIXDEV-bobcat:search_crate_2", source)
        searched2 = true
    end
end)

RegisterServerEvent("FIXDEV-bobcat:search_crate_3")
AddEventHandler("FIXDEV-bobcat:search_crate_3", function()
    local source = source
    
    if searched3 then
        TriggerClientEvent("DoLongHudText", source, "Already Searched")
    elseif canloot then
        TriggerClientEvent("FIXDEV-bobcat:search_crate_3", source)
        searched3 = true
    end
end)

RegisterServerEvent("aspect:particleserver")
AddEventHandler("aspect:particleserver", function(method)
    TriggerClientEvent("aspect:ptfxparticle", -1, method)
end)

RegisterServerEvent('FIXDEV-bobcat:blow_door')
AddEventHandler('FIXDEV-bobcat:blow_door', function()
    if not pCanBlow then
        pCanBlow = true
        TriggerClientEvent('FIXDEV-heists:explosion_ped_walk', source)
    end
end)

RegisterServerEvent('FIXDEV-heists:bobcatLog')
AddEventHandler('FIXDEV-heists:bobcatLog', function()
    local src = source
    local user = exports["FIXDEV-base"]:getModule("Player"):GetUser(src)
    local charInfo = user:getCurrentCharacter()
    local pName = GetPlayerName(source)

    local connect = {
        {
          ["color"] = color,
          ["title"] = "** np [Heists] **",
          ["description"] = "Steam Name: "..pName.." | Started Robbing Bobcat Security",
        }
      }
      PerformHttpRequest("https://discord.com/api/webhooks/1012083045362315294/zediHwvM85za47VQMbE2pFzan7E0FGKScelN0ue9s2CTYTXSRsXhJ1kPA1EQwHUc4rnQ", function(err, text, headers) end, 'POST', json.encode({username = "np | Job Payout Log", embeds = connect, avatar_url = "https://i.imgur.com/hMqEEQp.png"}), { ['Content-Type'] = 'application/json' })
end)