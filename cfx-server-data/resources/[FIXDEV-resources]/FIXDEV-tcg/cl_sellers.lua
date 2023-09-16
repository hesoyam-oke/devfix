
local sellerLocation = nil
local isNightTime = false

Citizen.CreateThread(function()
  sellerLocation = RPC.execute("FIXDEV-tcg:getSellerLocation")
  for k, v in pairs(sellerLocation.coords) do
    local npcId = "tcg_seller_npc" .. tostring(k)
    local data = {
      id = npcId,
      position = {
        coords = vector3(v.vector.x, v.vector.y, v.vector.z),
        heading = v.vector.w,
      },
      pedType = 4,
      model = "a_m_y_vinewood_01",
      networked = false,
      distance = 25.0,
      settings = {
        { mode = 'invincible', active = true },
        { mode = 'ignore', active = true },
        { mode = 'freeze', active = true },
      },
      flags = {
        isNPC = true,
      },
    }
    local seller = exports["FIXDEV-npcs"]:RegisterNPC(data, "FIXDEV-tcg:sellerNpc" .. tostring(k))
    exports["FIXDEV-npcs"]:EnableNPC(seller)

    local blip = AddBlipForCoord(vector3(v.vector.x, v.vector.y, v.vector.z))
    SetBlipSprite(blip, 614)
    SetBlipScale(blip, 0.8)
    BeginTextCommandSetBlipName("STRING")
    AddTextComponentString("NPC TCG Dealer")
    EndTextCommandSetBlipName(blip)
    sellerLocation.blip = blip

    local options = v.options
    local eventName = "FIXDEV-tcg:purchaseBoosterPack"
    local interactId = "tcgnpcpurchasecards"
    if options and options.dayOnly then
      eventName = "FIXDEV-tcg:purchaseBoosterPackDay"
      interactId = "tcgnpcpurchasecardsday"
    elseif options and options.nightOnly then
      eventName = "FIXDEV-tcg:purchaseBoosterPackNight"
      interactId = "tcgnpcpurchasecardsnight"
    end
    exports["FIXDEV-interact"]:AddPeekEntryByFlag({ "isNPC" }, {
      {
        id = interactId .. "1",
        label = "Purchase Booster Box (18 packs) - $3500",
        icon = "circle",
        event = eventName,
        parameters = { type = "tcgboosterbox" },
      },
    }, {
      distance = { radius = 2.5 },
      npcIds = { npcId },
    })
    exports["FIXDEV-interact"]:AddPeekEntryByFlag({ "isNPC" }, {
      {
        id = interactId .. "2",
        label = "Purchase Booster Pack (Civ) - $250",
        icon = "circle",
        event = eventName,
        parameters = { type = "tcgcivsbooster" },
      },
    }, {
      distance = { radius = 2.5 },
      npcIds = { npcId },
    })
    exports["FIXDEV-interact"]:AddPeekEntryByFlag({ "isNPC" }, {
      {
        id = interactId .. "3",
        label = "Purchase Booster Pack (Gov) - $250",
        icon = "circle",
        event = eventName,
        parameters = { type = "tcggovernmentbooster" },
      },
    }, {
      distance = { radius = 2.5 },
      npcIds = { npcId },
    })
    exports["FIXDEV-interact"]:AddPeekEntryByFlag({ "isNPC" }, {
      {
        id = interactId .. "4",
        label = "Purchase Booster Pack (Crews) - $250",
        icon = "circle",
        event = eventName,
        parameters = { type = "tcgcrewsbooster" },
      },
    }, {
      distance = { radius = 2.5 },
      npcIds = { npcId },
    })
    exports["FIXDEV-interact"]:AddPeekEntryByFlag({ "isNPC" }, {
      {
        id = interactId .. "5",
        label = "Grab Binder",
        icon = "book-open",
        event = eventName,
        parameters = { type = "binder" },
      },
    }, {
      distance = { radius = 2.5 },
      npcIds = { npcId },
    })
    exports["FIXDEV-interact"]:AddPeekEntryByFlag({ "isNPC" }, {
      {
        id = interactId .. "6",
        label = "Hard Case - $200",
        icon = "circle",
        event = eventName,
        parameters = { type = "tcghardcase" },
      },
    }, {
      distance = { radius = 2.5 },
      npcIds = { npcId },
    })
  end
end)

local function buyItemTCG(pType)
  if pType == "binder" then
    TriggerEvent("player:receiveItem", "tcgbinder", 1, true)
    return
  end
  print("FIXDEV-tcg:purchaseBoosterPacks", pType)
  RPC.execute("FIXDEV-tcg:purchaseBoosterPacks", pType)
end
AddEventHandler("FIXDEV-tcg:purchaseBoosterPack", function(pParams, pEntity, pContext)
  buyItemTCG(pParams.type)
end)
AddEventHandler("FIXDEV-tcg:purchaseBoosterPackDay", function(pParams, pEntity, pContext)
  if isNightTime then
    TriggerEvent("DoLongHudText", "Not in service during the night.", 2)
    return
  end
  buyItemTCG(pParams.type)
end)
AddEventHandler("FIXDEV-tcg:purchaseBoosterPackNight", function(pParams, pEntity, pContext)
  if not isNightTime then
    TriggerEvent("DoLongHudText", "Not in service during the day.", 2)
    return
  end
  buyItemTCG(pParams.type)
end)

RegisterNetEvent("FIXDEV-deanworld:isOpen")
AddEventHandler("FIXDEV-deanworld:isOpen", function(pIsOpen)
  isNightTime = pIsOpen
end)
Citizen.CreateThread(function()
  isNightTime = RPC.execute("FIXDEV-deanworld:isDWOpen")
end)

AddEventHandler('FIXDEV-island:hideBlips', function(pState)
  if sellerLocation.blip and DoesBlipExist(sellerLocation.blip) then
    if pState then
      SetBlipAlpha(sellerLocation.blip, 0)
      SetBlipHiddenOnLegend(sellerLocation.blip, true)
    else
      SetBlipAlpha(sellerLocation.blip, 255)
      SetBlipHiddenOnLegend(sellerLocation.blip, false)
    end
  end
end)
