local IsReplacing, IsDeleting = false, false

local ScreensConfig, CurrentScreens = nil, {}

Citizen.CreateThread(function ()
    ScreensConfig = NPX.Utils.cache(function (id)
        local config = NPX.Procedures.execute('FIXDEV-business:uwucafe:getMenuScreens', id)

        if not config then return false, nil end

        return true, config

    end, { timeToLive = 5 * 60 * 1000 })

    exports['FIXDEV-interact']:AddPeekEntryByPolyTarget({ "uwucafe-screen" }, {
        {
            id =  'uwucafe-setmenu',
            label =  'set menu screen',
            icon =  'box',
            event = "FIXDEV-business:uwucafe:setMenuScreen",
            parameters =  {},
        }
    }, { distance = { radius = 5.0 } })
end)

local function SetMenuScreen(pScreen, pURL)
    local dui = CurrentScreens[pScreen]

    if dui ~= nil then
        return exports["FIXDEV-lib"]:changeDuiUrl(dui.id, pURL)
    end

    dui = exports["FIXDEV-lib"]:getDui(pURL, 128, 256)

    CurrentScreens[pScreen] = dui

    AddReplaceTexture('denis3d_catcafe_images_txd', pScreen, dui.dictionary, dui.texture)
end

local function RemoveMenuScreen(pScreen)
    local dui = CurrentScreens[pScreen]

    if (dui == nil) then return end

    CurrentScreens[pScreen] = nil

    RemoveReplaceTexture('denis3d_catcafe_images_txd', pScreen)

    exports["FIXDEV-lib"]:releaseDui(dui.id)
end

NPX.Zones.onEnter('uwucafe', function (data)
    if IsReplacing then return end

    IsReplacing = true

    local screens = ScreensConfig.get(data.id)

    for screen, url in pairs(screens) do
        SetMenuScreen(screen, url)
    end

    IsReplacing = false
end)

NPX.Zones.onExit('uwucafe', function (data)
    if IsDeleting then return end

    IsDeleting = true

    for screen, _ in pairs(CurrentScreens) do
        RemoveMenuScreen(screen)
    end

    IsDeleting = false
end)

NPX.Events.onNet('FIXDEV-business:uwucafe:setMenuScreen', function (pScreen, pURL)
    if not NPX.Zones.isActive('uwucafe') then return end

    ScreensConfig.reset()

    if not pURL then return RemoveMenuScreen(pScreen) end

    SetMenuScreen(pScreen, pURL)
end)

AddEventHandler('FIXDEV-business:uwucafe:setMenuScreen', function (pParams, pEntity, pCtx)
    local hasAccess = HasPermission("uwu_cafe", "craft_access")

    if not hasAccess then return end

    local data = pCtx['zones']['uwucafe-screen']

    local elements = {
        { name = 'url', label = _L('uwucafe-input-menu-screen-url', 'Direct URL to an image (128x256)'), icon = 'link' }
    }

    local prompt = exports['FIXDEV-ui']:OpenInputMenu(elements)

    if not prompt then return end

    NPX.Procedures.execute('FIXDEV-business:uwucafe:setMenuScreen', data.id, prompt.url)
end)