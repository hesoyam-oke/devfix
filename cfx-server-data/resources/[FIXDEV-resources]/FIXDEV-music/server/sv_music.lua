RPC.register("FIXDEV-music:openApp", function(pSource)
    exports["FIXDEV-ui"]:openApplication("musicplayer", { url = info.url })
end)

RPC.register("FIXDEV-music:closeApp", function(pSource)
    exports["FIXDEV-ui"]:closeApplication("musicplayer") -- Edit: removed true because we have already 'show = false' in the callback so no need to true.
end)

RPC.register("FIXDEV-music:addMusicEntry", function(pSource, data, cb)
    cb({ data = {}, meta = { ok = true, message = '' } })
    -- info.url / info.id .
end)

RPC.register("FIXDEV-music:createMusicTapes", function(pSource, data, cb)
    cb({ data = {}, meta = { ok = true, message = '' } })
end)

RPC.register("FIXDEV-music:recordPlay", function(pSource, info)
    local info = json.decode(info)
    local characterId = exports["isPed"]:isPed('cid')
end)

RPC.register("FIXDEV-music:getSongOptions", function(pSource, pParams, business)
    
end)
