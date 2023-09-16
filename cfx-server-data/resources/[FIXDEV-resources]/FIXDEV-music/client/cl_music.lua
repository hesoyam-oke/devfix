AddEventHandler("FIXDEV-inventory:itemUsed", function(item, info)
  if item ~= "musictape" then return end
  if not exports["FIXDEV-inventory"]:hasEnoughOfItem("musicwalkman", 1, false, true) then
    TriggerEvent("DoLongHudText", "You need a walkman!", 2)
    return
  end
  local info = json.decode(info)
  exports["FIXDEV-ui"]:openApplication("musicplayer", { url = info.url })
  local characterId = exports["isPed"]:isPed('cid')
  RPC.execute("FIXDEV-music:recordPlay", characterId, info.id)
end)

AddEventHandler("FIXDEV-music:addMusicEntry", function(pParams)
  local business = pParams.business
  local characterId = exports["isPed"]:isPed('cid')
  local jobAccess = RPC.execute("IsEmployedAtBusiness", { character = { id = characterId }, business = { id = business } })
  if not jobAccess then
    TriggerEvent("DoLongHudText", "You cannot do that.", 2)
    return
  end
  exports['FIXDEV-ui']:openApplication('textbox', {
      callbackUrl = 'FIXDEV-ui:music:addMusicEntry',
      key = business,
      items = {
        {
          icon = "music",
          label = "Soundcloud URL",
          name = "url",
        },
        {
          icon = "user-injured",
          label = "Artist",
          name = "artist",
        },
        {
          icon = "user-edit",
          label = "Title",
          name = "title",
        },
        {
          icon = "edit",
          label = "Description",
          name = "description",
        },
      },
      show = true,
  })
end)

RegisterUICallback("FIXDEV-ui:music:addMusicEntry", function(data, cb)
  cb({ data = {}, meta = { ok = true, message = '' } })
  exports['FIXDEV-ui']:closeApplication('textbox')
  RPC.execute("FIXDEV-music:addMusicEntry", data.key, data.values)
end)

AddEventHandler("FIXDEV-music:createMusicTapes", function(pParams)
  local business = pParams.business
  local characterId = exports["isPed"]:isPed('cid')
  local jobAccess = RPC.execute("IsEmployedAtBusiness", { character = { id = characterId }, business = { id = business } })
  if not jobAccess then
    TriggerEvent("DoLongHudText", "You cannot do that.", 2)
    return
  end
  local songOptionsRaw = RPC.execute("FIXDEV-music:getSongOptions", business)
  local songOptions = {}
  for _, option in pairs(songOptionsRaw) do
    songOptions[#songOptions + 1] = { id = option.id, name = option.title }
  end
  exports['FIXDEV-ui']:openApplication('textbox', {
      callbackUrl = 'FIXDEV-ui:music:createMusicTapes',
      key = business,
      items = {
        {
          _type = "select",
          options = songOptions,
          label = "Song",
          icon = "music",
          name = "song",
        },
        {
          icon = "copy",
          label = "Copies",
          name = "copies",
        },
      },
      show = true,
  })
end)

AddEventHandler("FIXDEV-music:deleteMusicTapes", function(pParams)
  local business = pParams.business
  local characterId = exports["isPed"]:isPed('cid')
  local jobAccess = RPC.execute("IsEmployedAtBusiness", { character = { id = characterId }, business = { id = business } })
  if not jobAccess then
    TriggerEvent("DoLongHudText", "You cannot do that.", 2)
    return
  end
  local songOptionsRaw = RPC.execute("FIXDEV-music:getSongOptions", business)
  local songOptions = {}
  for _, option in pairs(songOptionsRaw) do
    songOptions[#songOptions + 1] = { id = option.id, name = option.title }
  end
  exports['FIXDEV-ui']:openApplication('textbox', {
      callbackUrl = 'FIXDEV-ui:music:deleteMusicTapes',
      key = business,
      items = {
        {
          _type = "select",
          options = songOptions,
          label = "Song to delete",
          icon = "music",
          name = "song",
        }
      },
      show = true,
  })
end)

RegisterUICallback("FIXDEV-ui:music:deleteMusicTapes", function(data, cb)
  cb({ data = {}, meta = { ok = true, message = '' } })
  exports['FIXDEV-ui']:closeApplication('textbox')
  RPC.execute("FIXDEV-music:deleteMusicTapes", data.key, data.values)
end)

RegisterUICallback("FIXDEV-ui:music:createMusicTapes", function(data, cb)
  cb({ data = {}, meta = { ok = true, message = '' } })
  exports['FIXDEV-ui']:closeApplication('textbox')
  RPC.execute("FIXDEV-music:createMusicTapes", data.key, data.values)
end)

RegisterUICallback("FIXDEV-ui:music:createMerchendise", function(data, cb)
  cb({ data = {}, meta = { ok = true, message = '' } })
  exports['FIXDEV-ui']:closeApplication('textbox')
  local d = {
    description = data.values.description,
    _description = data.values.description,
    _image_url = data.values.image,
    _hideKeys = { "_description", "_image_url" },
  }
  TriggerEvent("player:receiveItem", "musicmerch", tonumber(data.values.quantity), false, d)
end)

AddEventHandler("FIXDEV-music:createMerchandise", function(pParams)
  local business = pParams.business
  local characterId = exports["isPed"]:isPed('cid')
  local jobAccess = RPC.execute("IsEmployedAtBusiness", { character = { id = characterId }, business = { id = business } })
  if not jobAccess then
    TriggerEvent("DoLongHudText", "You cannot do that.", 2)
    return
  end
  exports['FIXDEV-ui']:openApplication('textbox', {
      callbackUrl = 'FIXDEV-ui:music:createMerchendise',
      key = business,
      items = {
        {
          icon = "pencil-alt",
          label = "Description",
          name = "description",
        },
        {
          icon = "image",
          label = "Image (100x100 px) (e.g.: https://imgur.com/123.png)",
          name = "image",
        },
        {
          icon = "copy",
          label = "Quantity",
          name = "quantity",
        },
      },
      show = true,
  })
end)
