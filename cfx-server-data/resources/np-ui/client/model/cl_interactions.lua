local lastMessage = ""
exports("showInteraction", function(message, type, opts)
    if not type then type = "info" end
    if not opts then opts = {} end
    lastMessage = message
    SendUIMessage({
        source = "np-nui",
        app = "interactions",
        data = {
            message = message,
            opts = opts,
            show = true,
            type = type,
        }
    })
end)
exports("hideInteraction", function(type)
    type = type and type or "info"
    SendUIMessage({
        source = "np-nui",
        app = "interactions",
        data = {
            message = lastMessage,
            show = false,
            type = type,
        }
    })
end)

exports("showContextMenu", function(options, position)
    SendUIMessage({
        source = "np-nui",
        app = "contextmenu",
        show = true,
        data = {
            position = position or "right",
            options = options
        }
    })
    SetUIFocus(true, true)
end)

RegisterNUICallback('np-ui:context:update', function(data, cb)
    cb({ data = {}, meta = { ok = true, message = "done" } })
    TriggerEvent('np-ui:context:update', data)
end)

exports("hideContextMenu", function()
    SendUIMessage({
        source = "np-nui",
        app = "contextmenu",
        show = false,
        data = {
            position = "right",
            options = nil
        }
    })
    SetUIFocus(false, false)
end)


RegisterCommand("testcontextmenu", function()
    local menuData = {
        {
            title = "Lockers",
            -- description = "Access your personal locker",
            -- action = "np-police:handler",
            -- key = "EVENTS.LOCKERS",
            disabled = true,
            icon = "circle",
            -- children = {
            --     { title = "Confirm Purchase", action = "np-AT:swappingCharsLoop", key = "EVENTS.EVIDENCE" },
            -- },
        },
        {
            title = "Lockers",
            -- description = "Access your personal locker",
            action = "np-police:handler",
            key = "EVENTS.LOCKERS",
            -- disabled = true,
            icon = "fa-solid fa-handcuffs",
            children = {
                { title = "Confirm Purchase", action = "np-AT:swappingCharsLoop", key = "EVENTS.EVIDENCE" },
            },

        },
        {
            title = "Clothing",
            -- description = "Gotta look Sharp",
            action = "np-police:handler",
            key = "EVENTS.CLOTHING",
            icon = "fa-solid fa-handcuffs"
        },
        {
            title = "Armory",
            description = "WEF - Weapons, Equipment, Fun!",
            action = "np-police:handler",
            key = "EVENTS.ARMORY",
            icon = "fa-solid fa-handcuffs",

        },
        {
            title = "Evidence",
            description = "Drop off some evidence",
            action = "np-police:handler",
            key = "EVENTS.EVIDENCE",
            children = {
                { title = "Confirm Purchase", action = "np-AT:swappingCharsLoop", key = "EVENTS.EVIDENCE" },
            },
        },
  
    }
    exports["np-ui"]:showContextMenu(menuData)
end)
