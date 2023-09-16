local GeneralEntries, SubMenu = MenuEntries['meth'], {}

local MethActions = {
    {
        data = {
            id = 'heroin:enterDoor',
            title = _L('menu-meth-enterdoor', 'Enter Door'),
            icon = '#heroin-enter-door',
            event = 'FIXDEV-heroin:house:enter',
            parameters = {}
        },
        isEnabled = function ()
            return exports['FIXDEV-inventory']:hasEnoughOfItem('heroinhousekey', 1, false) or exports['FIXDEV-heroin']:isInsideUnlockedDoorZone() or isPolice
        end
    },
    {
        data = {
            id = 'heroin:destroyProperty',
            title = _L('menu-meth-destroyproperty', 'Destroy Property'),
            icon = '#heroin-destroy-property',
            event = 'FIXDEV-heroin:house:seize',
            parameters = {}
        },
        isEnabled = function ()
            return isPolice
        end
    },
}

Citizen.CreateThread(function()

    -- DISABLE FOR NOW
    -- RE-ADD FOR HEROIN
    if true then
        return
    end

    for index, data in ipairs(MethActions) do
        SubMenu[index] = data.data.id
        MenuItems[data.data.id] = data
    end
    GeneralEntries[#GeneralEntries+1] = {
        data = {
            id = 'heroin',
            icon = '#heroin-actions',
            title = _L('menu-context-methactions', 'Door Actions'),
        },
        subMenus = SubMenu,
        isEnabled = function()
            local inside = exports['FIXDEV-heroin']:isInsideDoorZone()
            local hasKey = exports['FIXDEV-inventory']:hasEnoughOfItem('heroinhousekey', 1, false)
            local insideUnlocked = exports['FIXDEV-heroin']:isInsideUnlockedDoorZone()
            return not isDead and inside and (hasKey or insideUnlocked or isPolice)
        end,
    }
end)
