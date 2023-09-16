local plants = {
  [1] = { ["x"] = 168.04, ["y"] =-246.47, ["z"] = 50.07, ["isPlantGrowing"] = false, ["readyToHarvest"] = false, ["strain"] = ""},
  [2] = { ["x"] = 163.14, ["y"] =-244.23, ["z"] = 50.08, ["isPlantGrowing"] = false, ["readyToHarvest"] = false, ["strain"] = ""},
  [3] = { ["x"] = 171.02, ["y"] =-241.02, ["z"] = 50.07, ["isPlantGrowing"] = false, ["readyToHarvest"] = false, ["strain"] = ""},
  [4] = { ["x"] = 163.84, ["y"] =-238.48, ["z"] = 50.05, ["isPlantGrowing"] = false, ["readyToHarvest"] = false, ["strain"] = ""}
}

function findPlantLoc()
  local dstMin = 999.0
	for i = 1, #plants do
		local dstScanned = #(GetEntityCoords(PlayerPedId()) - vector3(plants[i]["x"],plants[i]["y"],plants[i]["z"]))
		if dstScanned < dstMin then
			dstMin = dstScanned
			scanId = i
		end
	end
	if dstMin < 20.0 then
		return scanId
	else
		return 0
	end
end

RegisterNetEvent("FIXDEV-cosmic:cl:plantStrain1")
AddEventHandler("FIXDEV-cosmic:cl:plantStrain1", function()
  local plantId = findPlantLoc()
  local plantLoc = plants[plantId]
  local rank = exports["isPed"]:GroupRank("cosmic_cannabis")
  if #(vector3(plantLoc["x"],plantLoc["y"],plantLoc["z"]) - GetEntityCoords(PlayerPedId())) < 3.0 and not plantLoc["isPlantGrowing"] and not plantLoc["readyToHarvest"] then
    if rank > 0 then
      if exports["FIXDEV-inventory"]:hasEnoughOfItem("lsconfidentialseed", 1) then
        local finished = exports["FIXDEV-taskbarskill"]:taskBar(1500,math.random(1,1))
        if finished ~= 100 then
          TriggerEvent("inventory:removeItem", "lsconfidentialseed", 1)
          TriggerEvent("animation:PlayAnimation","facepalm1")
          TriggerEvent('DoLongHudText', 'You have destroyed your seeds', 2)
        else
          plantLoc["isPlantGrowing"] = true
          TriggerEvent("inventory:removeItem", "lsconfidentialseed", 1)
          plantLoc["strain"] = "lsconfidentialseed"
          TriggerEvent("animation:PlayAnimation","layspike")
          TriggerEvent('DoLongHudText', 'Wait for your plants grow', 1)
          Wait(Config.GrowTime)
          TriggerEvent('DoLongHudText', 'Your plant is ready to harvest', 1)
          plantLoc["readyToHarvest"] = true
          plantLoc["isPlantGrowing"] = false
        end
      else
        TriggerEvent('DoLongHudText', 'You dont have any LS Confidential Seeds.', 2)
      end
    else
      TriggerEvent('DoLongHudText', 'You dont work here.', 2)
    end
  else
    TriggerEvent('DoLongHudText', 'Theres already one growing here', 2)
  end
end)

RegisterNetEvent("FIXDEV-cosmic:cl:plantStrain2")
AddEventHandler("FIXDEV-cosmic:cl:plantStrain2", function()
  local plantId = findPlantLoc()
  local plantLoc = plants[plantId]
  local rank = exports["isPed"]:GroupRank("cosmic_cannabis")
  if #(vector3(plantLoc["x"],plantLoc["y"],plantLoc["z"]) - GetEntityCoords(PlayerPedId())) < 3.0 and not plantLoc["isPlantGrowing"] and not plantLoc["readyToHarvest"] then
    if rank > 0 then
      if exports["FIXDEV-inventory"]:hasEnoughOfItem("alaskanthunderfuckseed", 1) then
        local finished = exports["FIXDEV-taskbarskill"]:taskBar(1500,math.random(1,1))
        if finished ~= 100 then
          TriggerEvent("inventory:removeItem", "alaskanthunderfuckseed", 1)
          TriggerEvent("animation:PlayAnimation","facepalm1")
          TriggerEvent('DoLongHudText', 'You have destroyed your seeds', 2)
        else
          plantLoc["isPlantGrowing"] = true
          TriggerEvent("inventory:removeItem", "alaskanthunderfuckseed", 1)
          plantLoc["strain"] = "alaskanthunderfuckseed"
          TriggerEvent("animation:PlayAnimation","layspike")
          TriggerEvent('DoLongHudText', 'Wait for your plants grow', 1)
          Wait(Config.GrowTime)
          TriggerEvent('DoLongHudText', 'Your plant is ready to harvest', 1)
          plantLoc["readyToHarvest"] = true
          plantLoc["isPlantGrowing"] = false
        end
      else
        TriggerEvent('DoLongHudText', 'You dont have any Alaskan Thunder Fuck Seeds.', 2)
      end
    else
      TriggerEvent('DoLongHudText', 'You dont work here.', 2)
    end
  else
    TriggerEvent('DoLongHudText', 'Theres already one growing here', 2)
  end
end)

RegisterNetEvent("FIXDEV-cosmic:cl:plantStrain3")
AddEventHandler("FIXDEV-cosmic:cl:plantStrain3", function()
  local plantId = findPlantLoc()
  local plantLoc = plants[plantId]
  local rank = exports["isPed"]:GroupRank("cosmic_cannabis")
  if #(vector3(plantLoc["x"],plantLoc["y"],plantLoc["z"]) - GetEntityCoords(PlayerPedId())) < 3.0 and not plantLoc["isPlantGrowing"] and not plantLoc["readyToHarvest"] then
    if rank > 0 then
      if exports["FIXDEV-inventory"]:hasEnoughOfItem("chiliadkushseed", 1) then
        local finished = exports["FIXDEV-taskbarskill"]:taskBar(1500,math.random(1,1))
        if finished ~= 100 then
          TriggerEvent("inventory:removeItem", "chiliadkushseed", 1)
          TriggerEvent("animation:PlayAnimation","facepalm1")
          TriggerEvent('DoLongHudText', 'You have destroyed your seeds', 2)
        else
          plantLoc["isPlantGrowing"] = true
          TriggerEvent("inventory:removeItem", "chiliadkushseed", 1)
          plantLoc["strain"] = "chiliadkushseed"
          TriggerEvent("animation:PlayAnimation","layspike")
          TriggerEvent('DoLongHudText', 'Wait for your plants grow', 1)
          Wait(Config.GrowTime)
          TriggerEvent('DoLongHudText', 'Your plant is ready to harvest', 1)
          plantLoc["readyToHarvest"] = true
          plantLoc["isPlantGrowing"] = false
        end
      else
        TriggerEvent('DoLongHudText', 'You dont have any Chiliad Kush Seeds.', 2)
      end
    else
      TriggerEvent('DoLongHudText', 'You dont work here.', 2)
    end
  else
    TriggerEvent('DoLongHudText', 'Theres already one growing here', 2)
  end
end)

RegisterNetEvent("FIXDEV-cosmic:cl:harvestWeed")
AddEventHandler("FIXDEV-cosmic:cl:harvestWeed", function()
  local plantId = findPlantLoc()
  local plantLoc = plants[plantId]
  local rank = exports["isPed"]:GroupRank("cosmic_cannabis")
  if #(vector3(plantLoc["x"],plantLoc["y"],plantLoc["z"]) - GetEntityCoords(PlayerPedId())) < 3.0 and plantLoc["readyToHarvest"] then
    if rank > 0 then
      TaskStartScenarioInPlace(PlayerPedId(), "WORLD_HUMAN_GARDENER_PLANT", 0, true)
      local finished = exports["FIXDEV-taskbar"]:taskBar(Config.HarvestTime,"Harvesting plant",false,false,ped)
      if finished == 100 then
        plantLoc["readyToHarvest"] = false
        TriggerEvent('player:receiveItem', 'weedLeaf', 5)
        if plantLoc["strain"] == "lsconfidentialseed" then
          TriggerEvent('player:receiveItem', 'wetlsconfidential', Config.WetAmount)
          plantLoc["strain"] = ""
        elseif plantLoc["strain"] == "alaskanthunderfuckseed" then
          TriggerEvent('player:receiveItem', 'wetalaskanthunderfuck', Config.WetAmount)
          plantLoc["strain"] = ""
        elseif plantLoc["strain"] == "chiliadkushseed" then
          TriggerEvent('player:receiveItem', 'wetchiliadkush', Config.WetAmount)
          plantLoc["strain"] = ""
        end
      end
    else
      TriggerEvent('DoLongHudText', 'You dont work here.', 2)
    end
  else
    TriggerEvent('DoLongHudText', 'This is not ready for harvest yet', 2)
  end
end)

RegisterNetEvent("FIXDEV-cosmic:cl:dryBudStrain1")
AddEventHandler("FIXDEV-cosmic:cl:dryBudStrain1", function()
  local rank = exports["isPed"]:GroupRank("cosmic_cannabis")
  if rank > 0 then
    if exports["FIXDEV-inventory"]:hasEnoughOfItem("wetlsconfidential", 5) then
      local finished = exports["FIXDEV-taskbar"]:taskBar(Config.DryTime,"Drying bud",false,false,ped)
      if finished == 100 then
        TriggerEvent("inventory:removeItem", "wetlsconfidential", 5)
        Wait(1000)
        TriggerEvent('player:receiveItem', 'drylsconfidential', Config.DryAmount)
      end
    else
      TriggerEvent('DoLongHudText', 'You dont have anything to dry.', 2)
    end
  else
    TriggerEvent('DoLongHudText', 'You dont work here.', 2)
  end
end)

RegisterNetEvent("FIXDEV-cosmic:cl:dryBudStrain2")
AddEventHandler("FIXDEV-cosmic:cl:dryBudStrain2", function()
  local rank = exports["isPed"]:GroupRank("cosmic_cannabis")
  if rank > 0 then
    if exports["FIXDEV-inventory"]:hasEnoughOfItem("wetalaskanthunderfuck", 5) then
      local finished = exports["FIXDEV-taskbar"]:taskBar(Config.DryTime,"Drying bud",false,false,ped)
      if finished == 100 then
        TriggerEvent("inventory:removeItem", "wetalaskanthunderfuck", 5)
        Wait(1000)
        TriggerEvent('player:receiveItem', 'dryalaskanthunderfuck', Config.DryAmount)
      end
    else
      TriggerEvent('DoLongHudText', 'You dont have anything to dry.', 2)
    end
  else
    TriggerEvent('DoLongHudText', 'You dont work here.', 2)
  end
end)

RegisterNetEvent("FIXDEV-cosmic:cl:dryBudStrain3")
AddEventHandler("FIXDEV-cosmic:cl:dryBudStrain3", function()
  local rank = exports["isPed"]:GroupRank("cosmic_cannabis")
  if rank > 0 then
    if exports["FIXDEV-inventory"]:hasEnoughOfItem("wetchiliadkush", 5) then
      local finished = exports["FIXDEV-taskbar"]:taskBar(Config.DryTime,"Drying bud",false,false,ped)
      if finished == 100 then
        TriggerEvent("inventory:removeItem", "wetchiliadkush", 5)
        Wait(1000)
        TriggerEvent('player:receiveItem', 'drychiliadkush', Config.DryAmount)
      end
    else
      TriggerEvent('DoLongHudText', 'You dont have anything to dry.', 2)
    end
  else
    TriggerEvent('DoLongHudText', 'You dont work here.', 2)
  end
end)

RegisterNetEvent("FIXDEV-cosmic:cl:rollJoint1")
AddEventHandler("FIXDEV-cosmic:cl:rollJoint1", function()
  local rank = exports["isPed"]:GroupRank("cosmic_cannabis")
  if rank > 0 then
    if exports["FIXDEV-inventory"]:hasEnoughOfItem("drylsconfidential", 1) then
      TriggerEvent("animation:PlayAnimation","layspike")
      local finished = exports["FIXDEV-taskbar"]:taskBar(Config.RollTime,"Rolling Joint",false,false,ped)
      if finished == 100 then
        TriggerEvent("inventory:removeItem", "drylsconfidential", 1)
        TriggerEvent('player:receiveItem', 'lsconfidentialjoint', 1)
        TriggerEvent("animation:PlayAnimation","layspike")
        Wait(500)
        TriggerEvent("animation:PlayAnimation","c")
      end
    else
      TriggerEvent('DoLongHudText', 'You dont have any LS Confidential', 2) 
    end
  else
    TriggerEvent('DoLongHudText', 'You dont work here.', 2)
  end
end)

RegisterNetEvent("FIXDEV-cosmic:cl:rollJoint2")
AddEventHandler("FIXDEV-cosmic:cl:rollJoint2", function()
  local rank = exports["isPed"]:GroupRank("cosmic_cannabis")
  if rank > 0 then
    if exports["FIXDEV-inventory"]:hasEnoughOfItem("dryalaskanthunderfuck", 1) then
      TriggerEvent("animation:PlayAnimation","layspike")
      local finished = exports["FIXDEV-taskbar"]:taskBar(Config.RollTime,"Rolling Joint",false,false,ped)
      if finished == 100 then
        TriggerEvent("inventory:removeItem", "dryalaskanthunderfuck", 1)
        TriggerEvent('player:receiveItem', 'alaskanthunderfuckjoint', 1)
        TriggerEvent("animation:PlayAnimation","layspike")
        Wait(500)
        TriggerEvent("animation:PlayAnimation","c")

      end
    else
      TriggerEvent('DoLongHudText', 'You dont have any Alaskan Thunder Fuck', 2)
    end
  else
    TriggerEvent('DoLongHudText', 'You dont work here.', 2)
  end
end)

RegisterNetEvent("FIXDEV-cosmic:cl:rollJoint3")
AddEventHandler("FIXDEV-cosmic:cl:rollJoint3", function()
  local rank = exports["isPed"]:GroupRank("cosmic_cannabis")
  if rank > 0 then
    if exports["FIXDEV-inventory"]:hasEnoughOfItem("drychiliadkush", 1) then
      TriggerEvent("animation:PlayAnimation","layspike")
      local finished = exports["FIXDEV-taskbar"]:taskBar(Config.RollTime,"Rolling Joint",false,false,ped)
      if finished == 100 then
        TriggerEvent("inventory:removeItem", "drychiliadkush", 1)
        TriggerEvent('player:receiveItem', 'chiliadkushjoint', 1)
        TriggerEvent("animation:PlayAnimation","layspike")
        Wait(500)
        TriggerEvent("animation:PlayAnimation","c")
      end
    else
      TriggerEvent('DoLongHudText', 'You dont have any Chiliad Kush', 2)
    end
  else
    TriggerEvent('DoLongHudText', 'You dont work here.', 2)
  end
end)

RegisterNetEvent("FIXDEV-cosmic:cl:processHash")
AddEventHandler("FIXDEV-cosmic:cl:processHash", function()
  local rank = exports["isPed"]:GroupRank("cosmic_cannabis")
  if rank > 0 then
    if exports["FIXDEV-inventory"]:hasEnoughOfItem("weedLeaf", 5) then
      TriggerEvent("animation:PlayAnimation","layspike")
      local finished = exports["FIXDEV-taskbar"]:taskBar(Config.DryTime,"Processing Leaves",false,false,ped)
      if finished == 100 then
        TriggerEvent("inventory:removeItem", "weedLeaf", 5)
        TriggerEvent('player:receiveItem', 'weedHash', 5)
        TriggerEvent("animation:PlayAnimation","c")
      end
    else
      TriggerEvent('DoLongHudText', 'You dont have enough leaves.', 2)
    end
  else
    TriggerEvent('DoLongHudText', 'You dont work here.', 2)
  end
end)

RegisterNetEvent("FIXDEV-cosmic:cl:Brownie")
AddEventHandler("FIXDEV-cosmic:cl:Brownie", function()
  local rank = exports["isPed"]:GroupRank("cosmic_cannabis")
  if rank > 0 then
    if exports["FIXDEV-inventory"]:hasEnoughOfItem("weedHash", 5) then
      local finished = exports["FIXDEV-taskbar"]:taskBar(Config.RollTime,"Making a batch of brownies",false,false,ped)
      if finished == 100 then
        TriggerEvent("inventory:removeItem", "weedHash", 5)
        Wait(1000)
        TriggerEvent('player:receiveItem', 'cbrownie', 5)
      end
    else
      TriggerEvent('DoLongHudText', 'You dont have any hash', 2)
    end
  else
    TriggerEvent('DoLongHudText', 'You dont work here.', 2)
  end
end)

RegisterNetEvent("FIXDEV-cosmic:cl:cAbsinthe")
AddEventHandler("FIXDEV-cosmic:cl:cAbsinthe", function()
  local rank = exports["isPed"]:GroupRank("cosmic_cannabis")
  if rank > 0 then
    if exports["FIXDEV-inventory"]:hasEnoughOfItem("weedHash", 5) then
      local finished = exports["FIXDEV-taskbar"]:taskBar(Config.RollTime,"Making some cannabis absinthe",false,false,ped)
      if finished == 100 then
        TriggerEvent("inventory:removeItem", "weedHash", 5)
        Wait(1000)
        TriggerEvent('player:receiveItem', 'cabsinthe', 5)
      end
    else
      TriggerEvent('DoLongHudText', 'You dont have any hash', 2)
    end
  else
    TriggerEvent('DoLongHudText', 'You dont work here.', 2)
  end
end)

RegisterNetEvent("FIXDEV-cosmic:cl:gummies")
AddEventHandler("FIXDEV-cosmic:cl:gummies", function()
  local rank = exports["isPed"]:GroupRank("cosmic_cannabis")
  if rank > 0 then
    if exports["FIXDEV-inventory"]:hasEnoughOfItem("weedHash", 5) then
      local finished = exports["FIXDEV-taskbar"]:taskBar(Config.RollTime,"Making some cannabis gummies",false,false,ped)
      if finished == 100 then
        TriggerEvent("inventory:removeItem", "weedHash", 5)
        Wait(1000)
        TriggerEvent('player:receiveItem', 'cgummies', 5)
      end
    else
      TriggerEvent('DoLongHudText', 'You dont have any hash', 2)
    end
  else
    TriggerEvent('DoLongHudText', 'You dont work here.', 2)
  end
end)

RegisterNetEvent("FIXDEV-cosmic:cl:choco")
AddEventHandler("FIXDEV-cosmic:cl:choco", function()
  local rank = exports["isPed"]:GroupRank("cosmic_cannabis")
  if rank > 0 then
    if exports["FIXDEV-inventory"]:hasEnoughOfItem("weedHash", 5) then
      local finished = exports["FIXDEV-taskbar"]:taskBar(Config.RollTime,"Making some chocolate",false,false,ped)
      if finished == 100 then
        TriggerEvent("inventory:removeItem", "weedHash", 5)
        Wait(1000)
        TriggerEvent('player:receiveItem', '420bar', 5)
      end
    else
      TriggerEvent('DoLongHudText', 'You dont have any hash', 2)
    end
  else
    TriggerEvent('DoLongHudText', 'You dont work here.', 2)
  end
end)

RegisterNetEvent("FIXDEV-cosmic:cl:plantSeedMenu")
AddEventHandler("FIXDEV-cosmic:cl:plantSeedMenu", function()
  TriggerEvent('FIXDEV-context:sendMenu', {
    {
        id = 1,
        header = "LS Confidential",
        txt = "Plant LS Confidential Seed",
        params = {
            event = "FIXDEV-cosmic:cl:plantStrain1"
        }
    },
    {
        id = 2,
        header = "Alaskan Thunder Fuck",
        txt = "Plant Alaskan Thunder Fuck Seed",
        params = {
            event = "FIXDEV-cosmic:cl:plantStrain2"
        }
    },
    {
        id = 3,
        header = "Chiliad Kush",
        txt = "Plant Chiliad Kush Seed",
        params = {
            event = "FIXDEV-cosmic:cl:plantStrain3"
        }
    },
  })
end)

RegisterNetEvent("FIXDEV-cosmic:cl:dryBudMenu")
AddEventHandler("FIXDEV-cosmic:cl:dryBudMenu", function()
  TriggerEvent('FIXDEV-context:sendMenu', {
    {
        id = 1,
        header = "LS Confidential",
        txt = "Dry LS Confidential Bud",
        params = {
            event = "FIXDEV-cosmic:cl:dryBudStrain1"
        }
    },
    {
        id = 2,
        header = "Alaskan Thunder Fuck",
        txt = "Dry Alaskan Thunder Fuck Bud",
        params = {
            event = "FIXDEV-cosmic:cl:dryBudStrain2"
        }
    },
    {
        id = 3,
        header = "Chiliad Kush",
        txt = "Dry Chiliad Kush Bud",
        params = {
            event = "FIXDEV-cosmic:cl:dryBudStrain3"
        }
    },
  })
end)

RegisterNetEvent("FIXDEV-cosmic:cl:rollMenu")
AddEventHandler("FIXDEV-cosmic:cl:rollMenu", function()
  TriggerEvent('FIXDEV-context:sendMenu', {
    {
        id = 1,
        header = "LS Confidential",
        txt = "Roll 2g LS Confidential Joint",
        params = {
            event = "FIXDEV-cosmic:cl:rollJoint1"
        }
    },
    {
        id = 2,
        header = "Alaskan Thunder Fuck",
        txt = "Roll 2g Alaskan Thunder Fuck Joint",
        params = {
            event = "FIXDEV-cosmic:cl:rollJoint2"
        }
    },
    {
        id = 3,
        header = "Chiliad Kush",
        txt = "Roll 2g Chiliad Kush Joint",
        params = {
            event = "FIXDEV-cosmic:cl:rollJoint3"
        }
    },
  })
end)

RegisterNetEvent("FIXDEV-cosmic:cl:ediblesMenu")
AddEventHandler("FIXDEV-cosmic:cl:ediblesMenu", function()
  TriggerEvent('FIXDEV-context:sendMenu', {
    {
        id = 1,
        header = "Cannabis Brownies",
        txt = "Make a batch of brownies",
        params = {
            event = "FIXDEV-cosmic:cl:Brownie"
        }
    },
    {
        id = 2,
        header = "Cannabis Absinthe",
        txt = "Make some cannabis absinthe",
        params = {
            event = "FIXDEV-cosmic:cl:cAbsinthe"
        }
    },
    {
        id = 3,
        header = "Cannabis Gummies",
        txt = "Make a batch of gummies",
        params = {
            event = "FIXDEV-cosmic:cl:gummies"
        }
    },
    {
      id = 4,
      header = "420 Bar",
      txt = "Make some chocolate",
      params = {
          event = "FIXDEV-cosmic:cl:choco"
      }
    },
  })
end)








