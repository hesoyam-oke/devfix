local GeneralEntries, SubMenu = MenuEntries['games'], {}

local GameOptions = {
    {
        data = {
            id = 'games:leaveGame',
            title = _L('menu-games-leave', 'Leave'),
            icon = '#arcade-game-leave',
            event = 'FIXDEV-games:leaveLobby',
            parameters = {}
        },
        isEnabled = function ()
            return exports['FIXDEV-games']:isInStartedLobby()
        end
    },
    {
        data = {
            id = 'games:restartGame',
            title = _L('menu-games-restart', 'Restart'),
            icon = '#arcade-game-restart',
            event = 'FIXDEV-games:restartGame',
            parameters = {}
        },
        isEnabled = function ()
            local inLobby = exports['FIXDEV-games']:isInStartedLobby()
            local isLeader = exports['FIXDEV-games']:isLobbyLeader()
            local canBeRestarted = exports['FIXDEV-games']:canBeRestarted()
            return inLobby and isLeader and canBeRestarted
        end
    },
    {
        data = {
            id = 'games:tdm:changeLoadout',
            title = _L('menu-games-airsoft-tdm-changeloadout', 'Change Loadout'),
            icon = '#arcade-airsoft-tdm-changeloadout',
            event = 'FIXDEV-games:airsoft:tdm:showLoadoutMenu',
            parameters = {}
        },
        isEnabled = function ()
            local inLobby = exports['FIXDEV-games']:isInStartedLobby()
            local isInTDM = exports['FIXDEV-games-airsoft']:isInTDM()
            local isSpawned = exports['FIXDEV-games-airsoft']:isSpawnedTDM()
            return inLobby and isInTDM and isSpawned
        end
    },
}