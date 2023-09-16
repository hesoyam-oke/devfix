function Login.playerLoaded() end

function Login.characterLoaded()
 -- Main events leave alone 
 TriggerEvent("FIXDEV-base:playerSpawned")
 TriggerEvent("playerSpawned")
 TriggerServerEvent('character:loadspawns')
 -- Main events leave alone 

 TriggerEvent("Relog")

 -- Everything that should trigger on character load 
 TriggerServerEvent('checkTypes')
 TriggerServerEvent('isVip')
 TriggerEvent('rehab:changeCharacter')
 TriggerEvent("resetinhouse")
 TriggerEvent("fx:clear")
 TriggerServerEvent("raid_clothes:retrieve_tats")
 TriggerServerEvent('Blemishes:retrieve')
 TriggerServerEvent("currentconvictions")
 TriggerServerEvent("GarageData")
 TriggerServerEvent("Evidence:checkDna")
 TriggerEvent("banking:viewBalance")
 TriggerServerEvent("police:getLicensesCiv")
 TriggerServerEvent('FIXDEV-doors:requestlatest')
 TriggerServerEvent("item:UpdateItemWeight")
 TriggerServerEvent("FIXDEV-weapons:getAmmo")
 TriggerServerEvent("ReturnHouseKeys")
 TriggerServerEvent("requestOffices")
 TriggerServerEvent('FIXDEV-base:addLicenses')
 Wait(500)
 TriggerServerEvent('commands:player:login')
 TriggerServerEvent("police:getAnimData")
 TriggerServerEvent("police:getEmoteData")
 TriggerServerEvent("police:SetMeta")
 TriggerServerEvent("retreive:licenes:server")
 TriggerServerEvent("clothing:checkIfNew")
 -- Anything that might need to wait for the client to get information, do it here.
 Wait(3000)
 TriggerServerEvent("bones:server:requestServer")
 TriggerEvent("apart:GetItems")
 TriggerEvent("FIXDEV-editor:readyModels")
 Wait(4000)
 TriggerServerEvent('distillery:getDistilleryLocation')
 TriggerServerEvent("retreive:jail",exports["isPed"]:isPed("cid"))	
 TriggerServerEvent("bank:getLogs")
 TriggerEvent('FIXDEV-hud:EnableHud', true)
 TriggerServerEvent('void:getmapprefrence')
 TriggerServerEvent('FIXDEV-phone:grabWallpaper')
 TriggerServerEvent('banking-loaded-in')
 TriggerServerEvent('FIXDEV-base:updatedphoneLicenses')
 TriggerServerEvent('getallplayers')
 TriggerEvent("FIXDEV-base:PolyZoneUpdate")
 TriggerServerEvent('FIXDEV-scoreboard:AddPlayer')
 TriggerServerEvent("server:currentpasses")
 TriggerServerEvent('FIXDEV-base:addLicenses')
 TriggerEvent("FIXDEV-newphone:phone:fetch")
end

function Login.characterSpawned()
  isNear = false
  TriggerServerEvent('FIXDEV-base:sv:player_control')
  TriggerServerEvent('FIXDEV-base:sv:player_settings')

  TriggerServerEvent("TokoVoip:clientHasSelecterCharacter")
  TriggerEvent("spawning", false)
  TriggerEvent("inSpawn", false)
  TriggerEvent("attachWeapons")
  TriggerEvent("tokovoip:onPlayerLoggedIn", true)

  TriggerEvent("FIXDEV-hud:initHud")

  TriggerServerEvent("request-dropped-items")
  TriggerServerEvent("server-request-update", exports["isPed"]:isPed("cid"))

  if Spawn.isNew then
      Wait(1000)
      TriggerEvent("hud:saveCurrentMeta")

      local src = GetPlayerServerId(PlayerId())
      TriggerServerEvent("reviveGranted", src)
      TriggerEvent("Hospital:HealInjuries", src, true)
      TriggerServerEvent("ems:healplayer", src)
      TriggerEvent("heal", src)
      TriggerEvent("status:needs:restore", src)

      TriggerServerEvent("FIXDEV-spawn:newPlayerFullySpawned")
  end

  SetPedMaxHealth(PlayerPedId(), 200)
  
  runGameplay() -- moved from FIXDEV-base 
  Spawn.isNew = false
end
RegisterNetEvent("FIXDEV-spawn:characterSpawned");
AddEventHandler("FIXDEV-spawn:characterSpawned", Login.characterSpawned);

RegisterNetEvent("FIXDEV-spawn:getStartingItems");
AddEventHandler("FIXDEV-spawn:getStartingItems", function()
  TriggerEvent("player:receiveItem", "idcard",1,true,information)
	TriggerEvent("player:receiveItem", "mobilephone",1,true,information)
end)

RegisterNetEvent("FIXDEV-spawn:getNewAccountBox");
AddEventHandler("FIXDEV-spawn:getNewAccountBox", function(cid)
  TriggerEvent("player:receiveItem", "newaccountbox", 1)
end)
