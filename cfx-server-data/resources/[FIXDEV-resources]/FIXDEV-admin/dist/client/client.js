;(function () {
    'use strict'
    var fullMenuData = {
        50: function (_0x3c6cc5, _0x15548c, desire) {
          var someKindveValueSetToTrue
          someKindveValueSetToTrue = { value: true }
          const LPX = desire(615)
          let adminMenuData = [],
            commandOptions = [],
            getCommandUI = [],
            pGivenDataStringified = [],
            toggleAdminMode = false,
            pGetDatbaseOptions = false,
            getFountKVPSettings2 = false,
            pushedDefaultKeybinds = false,
            selectordata = undefined
          const pAdminOptions = [
            {
              optionName: 'toggleBlockEmotes',
              displayName: 'Block Emotes',
              optionType: 'toggle',
              data: false,
            },
            {
              optionName: 'toggleDefaultMenu',
              displayName: 'Large menu is default',
              optionType: 'toggle',
              data: true,
            },
            {
              optionName: 'expandedOnPass',
              displayName: "Large menu on 'Pass' menu is default",
              optionType: 'toggle',
              data: false,
            },
            {
              optionName: 'showTooltips',
              displayName: 'Show Tooltips',
              optionType: 'toggle',
              data: true,
            },
            {
              optionName: 'openDefaultMenu',
              displayName: 'Open Normal Menu with Bind',
              optionType: 'toggle',
              data: true,
            },
          ]
          let pAdminBinds = [
            {
              parent: '',
              key: 'none',
            },
            {
              parent: '',
              key: 'adminBind_0',
            },
            {
              parent: '',
              key: 'adminBind_1',
            },
            {
              parent: '',
              key: 'adminBind_2',
            },
            {
              parent: '',
              key: 'adminBind_3',
            },
            {
              parent: '',
              key: 'adminBind_4',
            },
            {
              parent: '',
              key: 'adminBind_5',
            },
          ]
          const newModuleMap = new Map()
          function getMappedModules(_0x3369da) {
            return newModuleMap.get(_0x3369da)
          }
          function actionUIModule(setID1, setID2) {
            newModuleMap.set(setID1, setID2)
            return
          }
          function getCommandUIAgain(commandUIModules) {
            getCommandUI = commandUIModules
          }
          onNet('FIXDEV:admin:becomeModel', (bool) => {
            emit('raid_clothes:AdminSetModel', bool)
            emit('FIXDEV:admin:raid_clothes:model', bool)
          })
  
          onNet('FIXDEV:admin:banPlayerJS', (pTarget, pTime, pReason) => {
            emitNet("FIXDEV:admin/server/ban-player",pTarget, pTime, pReason)
          })
          onNet('FIXDEV:admin:unbanPlayerJS', (SteamID) => {
            emitNet("FIXDEV:admin:unBan", SteamID)
          })
          onNet('FIXDEV:admin:giveItem', (pTarget, pItem, pAmount) => {
            emitNet('FIXDEV:admin:giveItem', pTarget, pItem, pAmount)
          })
          onNet('FIXDEV:admin:teleportMarker', async () => {
            const pBlip = GetFirstBlipInfoId(8)
            if (!DoesBlipExist(pBlip)) {
              return (
                emit('DoLongHudText', 'Failed to find marker.', 2),
                'Failed to find marker'
              )
            }
            const pCoords = GetBlipInfoIdCoord(pBlip),
              pFormattedCoords = new LPX.formatCoords(
                pCoords[0],
                pCoords[1],
                pCoords[2]
              ),
              _myServerId = PlayerPedId()
            for (let pCoordsZ = 1; pCoordsZ < 1000; pCoordsZ++) {
              SetPedCoordsKeepVehicle(
                _myServerId,
                pFormattedCoords.x,
                pFormattedCoords.y,
                pCoordsZ + 0
              )
              const pCoordsGroundZ = GetGroundZFor_3dCoord(
                pFormattedCoords.x,
                pFormattedCoords.y,
                pCoordsZ + 0,
                false
              )
              if (pCoordsGroundZ[0]) {
                SetPedCoordsKeepVehicle(
                  _myServerId,
                  pFormattedCoords.x,
                  pFormattedCoords.y,
                  pCoordsZ + 0
                )
                break
              }
              await (0, LPX.Delay)(5)
            }
          })
          onNet(
            'FIXDEV:admin:spawnVehicle',
            (pTarget, pVehicleModel, pVehicleOverwrite, pMods) => {
              if (
                pVehicleModel === '' ||
                pVehicleModel === undefined ||
                pVehicleModel === null
              ) {
                pVehicleModel = pVehicleOverwrite
              }
              if (
                pVehicleModel === '' ||
                pVehicleModel === undefined ||
                pVehicleModel === null
              ) {
                return emit('DoLongHudText', 'No vehicle entered.', 2)
              }
              setImmediate(async () => {
                let pCreatedVehicleHash = GetHashKey(pVehicleModel)
                if (!IsModelAVehicle(pCreatedVehicleHash)) {
                  return
                }
                if (!IsModelInCdimage(pCreatedVehicleHash) || !IsModelValid(pCreatedVehicleHash)) {
                  return
                }
                RequestModel(pCreatedVehicleHash)
                while (!HasModelLoaded(pCreatedVehicleHash)) {
                  await (0, LPX.Delay)(0)
                }
                let pMyServerIdHeading = PlayerPedId(),
                  pOffsetEntityToWorldMe = GetOffsetFromEntityInWorldCoords(
                    PlayerPedId(),
                    1.5,
                    5,
                    0
                  ),
                  pEntityHeading = GetEntityHeading(pMyServerIdHeading),
                  pCreatedVehicle = CreateVehicle(
                    pCreatedVehicleHash,
                    pOffsetEntityToWorldMe[0],
                    pOffsetEntityToWorldMe[1],
                    pOffsetEntityToWorldMe[2],
                    pEntityHeading,
                    true,
                    false
                  ),
                  pVehiclePlateText = GetVehicleNumberPlateText(pCreatedVehicle)
                emit('keys:addNew', pCreatedVehicle, pVehiclePlateText)
                emit('vehicle:keys:addNew', pCreatedVehicle, pVehiclePlateText)
                SetModelAsNoLongerNeeded(pCreatedVehicleHash)
                TaskWarpPedIntoVehicle(pMyServerIdHeading, pCreatedVehicle, -1)
                SetVehicleDirtLevel(pCreatedVehicle, 0)
                SetVehicleWindowTint(pCreatedVehicle, 0)
              })
           }
          )
          let pUndefinedCreatedVehicle = undefined
          onNet('FIXDEV:admin:runSpawnCommand', (pCreatedVehicleModel, pLiveryNumber) => {
            setImmediate(async () => {
              let pGetCreatedVehicleHash = GetHashKey(pCreatedVehicleModel)
              if (!IsModelAVehicle(pGetCreatedVehicleHash)) {
                return
              }
              if (!IsModelInCdimage(pGetCreatedVehicleHash) || !IsModelValid(pGetCreatedVehicleHash)) {
                return
              }
              RequestModel(pGetCreatedVehicleHash)
              while (!HasModelLoaded(pGetCreatedVehicleHash)) {
                await (0, LPX.Delay)(0)
              }
              let _myServerId = PlayerPedId(),
                pOffset = GetOffsetFromEntityInWorldCoords(
                  PlayerPedId(),
                  1.5,
                  5,
                  0
                ),
                pMyServerIdHeading = GetEntityHeading(_myServerId),
                pCreatedVehicle = CreateVehicle(
                  pGetCreatedVehicleHash,
                  pOffset[0],
                  pOffset[1],
                  pOffset[2],
                  pMyServerIdHeading,
                  true,
                  false
                )
              SetVehicleModKit(pCreatedVehicle, 0)
              SetVehicleMod(pCreatedVehicle, 11, 3, false)
              SetVehicleMod(pCreatedVehicle, 12, 2, false)
              SetVehicleMod(pCreatedVehicle, 13, 2, false)
              SetVehicleMod(pCreatedVehicle, 15, 3, false)
              SetVehicleMod(pCreatedVehicle, 16, 4, false)
              pCreatedVehicleModel === 'pol1' && SetVehicleExtra(pCreatedVehicle, 5, false)
              pCreatedVehicleModel === 'police' &&
                (SetVehicleWheelType(pCreatedVehicle, 2),
                SetVehicleMod(pCreatedVehicle, 23, 10, false),
                SetVehicleColours(pCreatedVehicle, 0, 0),
                SetVehicleExtraColours(pCreatedVehicle, 0, 0))
              if (pCreatedVehicleModel === 'pol7') {
                SetVehicleColours(pCreatedVehicle, 0, 0)
                SetVehicleExtraColours(pCreatedVehicle, 0, 0)
              }
              ;(pCreatedVehicleModel === 'pol5' || pCreatedVehicleModel === 'pol6') &&
                SetVehicleExtra(pCreatedVehicle, 1, false)
              let pVehiclePlateText = GetVehicleNumberPlateText(pCreatedVehicle)
              emit('keys:addNew', pCreatedVehicle, pVehiclePlateText)
              emit('vehicle:keys:addNew', pCreatedVehicle, pVehiclePlateText)
              emitNet('garages:addJobPlate', pVehiclePlateText)
              SetModelAsNoLongerNeeded(pGetCreatedVehicleHash)
              TaskWarpPedIntoVehicle(_myServerId, pCreatedVehicle, -1)
              SetVehicleDirtLevel(pCreatedVehicle, 0)
              SetVehicleWindowTint(pCreatedVehicle, 0)
              pLiveryNumber !== undefined &&
                SetVehicleLivery(pCreatedVehicle, Number(pLiveryNumber))
              pUndefinedCreatedVehicle = pCreatedVehicle
            })
          })
          onNet('FIXDEV:admin:fixVehicle', () => {
            const _myServerId = PlayerPedId(),
              pVehicle = GetVehiclePedIsIn(_myServerId, false)
            if (!pVehicle) {
              return ''
            }
            SetVehicleEngineHealth(pVehicle, 1000)
            SetVehicleBodyHealth(pVehicle, 1000)
            SetVehicleDeformationFixed(pVehicle)
            SetVehicleFixed(pVehicle)
          })
          onNet('FIXDEV:admin:enterBennys', () => {
            emit('enter:benny:DevBennys')
          })
          onNet('FIXDEV:admin:cSay', (pMessage) => {
            emitNet('FIXDEV:admin:sendAnnoucement', pMessage)
          })
          onNet('FIXDEV:admin:tSay', (pMessage) => {
            emitNet('FIXDEV:admin:sendTsay', pMessage)
          })
          onNet('FIXDEV:admin:teleportPlayer', (pTarget) => {
            if (pTarget === undefined || pTarget === 0) {
              return emit('DoLongHudText', 'Invalid target.', 2)
            }
            let _myId = PlayerId(),
              _myServerId = GetPlayerServerId(_myId)
            emitNet('FIXDEV:admin:teleportPlayer', _myServerId, pTarget)
          })
          onNet('FIXDEV:admin:teleportCoords', (coordTable) => {
            if (coordTable === '' || coordTable === undefined) {
              return emit('DoLongHudText', 'Invalid coordinates.', 2)
            }
            let coords = coordTable.split(', ')
            SetEntityCoords(
              PlayerPedId(),
              Number(coords[0]),
              Number(coords[1]),
              Number(coords[2]),
              true,
              false,
              false,
              false
            )
          })
          onNet('FIXDEV:admin:bringPlayer', (pTarget) => {
            if (pTarget === undefined || pTarget === 0) {
              return emit('DoLongHudText', 'Invalid target.', 2)
            }
            let _myId = PlayerId(),
              _myServerId = GetPlayerServerId(_myId)
            emitNet('FIXDEV:admin:bringPlayer', _myServerId, pTarget)
          })
          onNet('FIXDEV:admin:toggleGodmode', async (bool) => {
            emitNet('FIXDEV:admin:sendLog', 'godmode', bool)
            let godMode = bool
            emit('carandplayerhud:godCheck', bool)
            while (godMode) {
              SetEntityInvincible(GetPlayerPed(-1), true)
              SetPlayerInvincible(PlayerId(), true)
              SetPedCanRagdoll(GetPlayerPed(-1), false)
              ClearPedBloodDamage(GetPlayerPed(-1))
              ResetPedVisibleDamage(GetPlayerPed(-1))
              ClearPedLastWeaponDamage(GetPlayerPed(-1))
              SetEntityProofs(
                GetPlayerPed(-1),
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true
              )
              SetEntityOnlyDamagedByPlayer(GetPlayerPed(-1), false)
              SetEntityCanBeDamaged(GetPlayerPed(-1), false)
              await (0, LPX.Delay)(0)
            }
            while (!godMode) {
              SetEntityInvincible(GetPlayerPed(-1), false)
              SetPlayerInvincible(PlayerId(), false)
              SetPedCanRagdoll(GetPlayerPed(-1), true)
              ClearPedLastWeaponDamage(GetPlayerPed(-1))
              SetEntityProofs(
                GetPlayerPed(-1),
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false
              )
              SetEntityOnlyDamagedByPlayer(GetPlayerPed(-1), true)
              SetEntityCanBeDamaged(GetPlayerPed(-1), true)
              await (0, LPX.Delay)(0)
            }
          })
          onNet('FIXDEV:admin:maxMyStats', (pTarget) => {
            emitNet('FIXDEV:admin:maxMyStats', pTarget)
          })
          onNet('FIXDEV:admin:removeStress', async (pTarget, pAmount) => {
            emitNet('FIXDEV:admin:removeStress', pTarget, pAmount)
          })
          onNet('FIXDEV:admin:clearStress', async (bool) => {
            emitNet('server:alterStress', false, bool)
          })
          onNet('FIXDEV:admin:devSpawn', () => {
            let pedPosition = {}
            pedPosition = { vars: {} }
            pedPosition.vars.pos = GetOffsetFromEntityInWorldCoords(
              PlayerPedId(),
              0,
              0,
              0
            )
            let _0x307291 = GetEntityHeading(PlayerPedId()),
              devSpawnCoords = {
                x: pedPosition.vars.pos.x,
                y: pedPosition.vars.pos.y,
                z: pedPosition.vars.pos.z,
                w: _0x307291,
              }
            exports.storage.set(devSpawnCoords, 'voiddevspawn')
            emit(
              'DoShortHudText',
              'Dev spawn set at: ' + JSON.stringify(devSpawnCoords),
              1
            )
          })
          onNet('FIXDEV:admin:toggleCloak', async (bool) => {
            let cloaked = bool
            while (cloaked) {
              SetLocalPlayerVisibleLocally(true)
              SetEntityAlpha(PlayerPedId(), 50, false)
              SetEntityVisible(PlayerPedId(), false, false)
              await (0, LPX.Delay)(0)
            }
            while (!cloaked) {
              ResetEntityAlpha(PlayerPedId())
              SetEntityVisible(PlayerPedId(), true, false)
              await (0, LPX.Delay)(0)
            }
          })
          onNet('FIXDEV:admin:requestJob', (pTarget, pJob) => {
            emitNet('FIXDEV:admin:requestJob', pTarget, pJob)
          })
          onNet('FIXDEV:admin:requestedJob', (jobTitle) => {
            switch (jobTitle) {
              case 'police':
                emitNet('FIXDEV-duty:AttemptDuty', 'police')
                break
              case 'sheriff':
                emitNet('FIXDEV-duty:AttemptDuty', 'sheriff')
                break
              case 'state':
                emitNet('FIXDEV-duty:AttemptDuty', 'state')
                break
              case 'doc':
                emitNet('FIXDEV-duty:AttemptDuty', 'doc')
                break
              case 'dispatcher':
                emitNet('FIXDEV-duty:AttemptDuty', 'dispatcher')
                break
              case 'ems':
                emitNet('FIXDEV-duty:AttemptDutyEMS')
                break
              case 'judge':
                emitNet('FIXDEV-duty:attempt_duty:judge')
                break
              case 'lawyer':
                emitNet('FIXDEV-duty:attempt_duty:public_defender')
                break
              default:
                emitNet('jobssystem:jobs', jobTitle)
                break
            }
          })
          onNet('FIXDEV:admin:requestBarber', (bool) => {
            emitNet('raid_clothes:admin:open', 'barber_shop')
          })
          onNet('FIXDEV:admin:requestClothing', (bool) => {
            emitNet('raid_clothes:admin:open', 'clothing_shop')
          })
          onNet('FIXDEV:admin:requestBennys', (bool) => {
            emitNet('FIXDEV:admin:requestBennys', bool)
          })
          onNet("FIXDEV-admin:currentDebug", () => {
            exports['FIXDEV-admin'].devDebugToggle();
          })
          onNet('FIXDEV:admin:openBarber', () => {
            exports['FIXDEV-adminUI'].hideMenu()
            exports['FIXDEV-adminUI'].exitNUI()
            emitNet('raid_clothes:admin:open', 'barber_shop')
          })
          onNet('FIXDEV:admin:openClothing', () => {
            exports['FIXDEV-adminUI'].hideMenu()
            exports['FIXDEV-adminUI'].exitNUI(),
            emitNet('raid_clothes:admin:open', 'clothing_shop')
          })
          onNet('FIXDEV:admin:openBennys', () => {
            exports['FIXDEV-adminUI'].hideMenu()
            exports['FIXDEV-adminUI'].exitNUI()
          })
          onNet('FIXDEV:admin:updateGarage', (pPlate, pGarage) => {
            emitNet('FIXDEV:admin:updateGarage', pPlate, pGarage)
          })
          onNet('FIXDEV:admin:giveLicense', (pTarget, pLicense) => {
            emitNet('FIXDEV:admin:giveLicense', pTarget, pLicense)
          })
          onNet('FIXDEV:admin:flingPlayer', (pTarget) => {
            emitNet('FIXDEV:admin:flingPlayer',pTarget)
          })
          onNet(
            'FIXDEV:admin:giveJobWhitelist',
            (pTarget, pJob, pRank) => {
              emitNet(
                'FIXDEV:admin:giveJobWhitelist',
                pTarget,
                pJob,
                pRank
              )
            }
          )
          onNet('FIXDEV:admin:giveCash', (pTarget, pAmount) => {
            emitNet('FIXDEV:admin:giveCash', pTarget, pAmount)
          })
          onNet('FIXDEV:admin:kickPlayer', (pTarget, pReason) => {
            emitNet('FIXDEV:admin:kickPlayer', pTarget, pReason)
          })
          onNet('FIXDEV:admin:createBusiness', (pID, pName, pOwner) => {
            emitNet('FIXDEV:admin:createBusiness', pID, pName, pOwner)
          })
          onNet('FIXDEV:admin:searchPlayerInventory', (pTarget) => {
            emitNet('FIXDEV:admin:searchPlayerInventory', pTarget)
          })
          function getAdminMenuFavCommands() {
            const getAdminMenuFavoriteCommandsKVP = JSON.parse(
              GetResourceKvpString('Json_adminMenuFavCommands')
            )
            if (getAdminMenuFavoriteCommandsKVP == null) {
              return []
            }
            return getAdminMenuFavoriteCommandsKVP
          }
          function adminMenuFavKVP(parsedAdminMenuFavData) {
            let adminMenuFavData = parsedAdminMenuFavData
            SetResourceKvp('Json_adminMenuFavCommands', JSON.stringify(adminMenuFavData))
            exports['FIXDEV-adminUI'].updateMenuData(adminMenuData)
          }
          function adminMenuOptionsKVP(commandTable) {
            commandOptions = commandTable
            SetResourceKvp('Json_adminMenuOptions', JSON.stringify(commandOptions))
          }
          async function commandOptionsUI(fountData) {
            commandOptions.length == 0 && (await adminMenuOptions())
            const findData = commandOptions.find(
              (pushData) => pushData.optionName === fountData
            )
            return findData
          }
          async function adminMenuOptions() {
            return new Promise((pOptions) => {
              let HasSetting = false
              const GetOptionKVP = JSON.parse(
                GetResourceKvpString('Json_adminMenuOptions')
              )
              if (!pGetDatbaseOptions && GetOptionKVP != null) {
                for (const pAdminOptionsID in pAdminOptions) {
                  const adminMenuSettings = pAdminOptions[pAdminOptionsID],
                    FindSettingInKVP = GetOptionKVP.find(
                      (finishMeDaddy) => finishMeDaddy.optionName === adminMenuSettings.optionName
                    )
                  FindSettingInKVP == null &&
                    ((HasSetting = true), GetOptionKVP.push(adminMenuSettings))
                }
                pGetDatbaseOptions = true
                if (HasSetting) {
                  adminMenuOptionsKVP(GetOptionKVP)
                }
              }
              if (GetOptionKVP == null) {
                if (commandOptions.length == 0) {
                  commandOptions = pAdminOptions
                }
              } else {
                commandOptions = GetOptionKVP
              }
              return pOptions(commandOptions)
            })
          }
          async function GetPlayerDatah() {
            let playerData = await RPC.execute('FIXDEV:admin:getPlayerData')
            return playerData
          }
          function getAdminKey2Options() {
            const adminMenuOptionsbindKeyoptions = [],
              getParsedKVPSettings2 = JSON.parse(
                GetResourceKvpString('Json_adminKeyOptions_2')
              )
            if (!getFountKVPSettings2 && getParsedKVPSettings2 != null) {
              for (const pAdminBindsID in pAdminBinds) {
                const pushMyButtonsCmon = pAdminBinds[pAdminBindsID],
                  findParsedKVPSettings2 = getParsedKVPSettings2.find(
                    (parsedAdminMenuOption2Keybind) => parsedAdminMenuOption2Keybind.key === pushMyButtonsCmon.key
                  )
                if (findParsedKVPSettings2 == null) {
                  getParsedKVPSettings2.push(pushMyButtonsCmon)
                }
              }
              getFountKVPSettings2 = true
              pAdminBinds = getParsedKVPSettings2
            }
            for (const adminKeys in pAdminBinds) {
              const getAdminKeyID = pAdminBinds[adminKeys],
                pushAdminKeyID = { text: getAdminKeyID.key }
                adminMenuOptionsbindKeyoptions.push(pushAdminKeyID)
            }
            for (const getCommandUIInteractive in getCommandUI) {
              const getCommandUIInteractiveID = getCommandUI[getCommandUIInteractive]
              if (
                getCommandUIInteractiveID.adminMenu &&
                getCommandUIInteractiveID.adminMenu.options.bindKey &&
                getCommandUIInteractiveID.adminMenu.options.bindKey.options
              ) {
                const _0xde2683 = getCommandUIInteractiveID.adminMenu.command.title,
                  pAdminBindsFind = pAdminBinds.find(
                    (_0x3f6ac4) => _0x3f6ac4.parent === _0xde2683
                  )
                pAdminBindsFind
                  ? (getCommandUIInteractiveID.adminMenu.options.bindKey.value = pAdminBindsFind.key)
                  : (getCommandUIInteractiveID.adminMenu.options.bindKey.value = null)
                getCommandUIInteractiveID.adminMenu.options.bindKey.options = adminMenuOptionsbindKeyoptions
              }
            }
            return
          }
          function pUpdateKeybinds(pGivenData) {
            if (JSON.stringify(pGivenDataStringified) === JSON.stringify(pGivenData)) {
              return
            }
            pGivenDataStringified = pGivenData
            for (const pPushLowercaseVersion in pGivenData) {
              const _0x59fcd2 = pGivenData[pPushLowercaseVersion]
              if (_0x59fcd2 == 'none') {
                const pTryPushAdminBindsParent = pAdminBinds.find(
                  (pAdminBindsParent) =>
                    pAdminBindsParent.parent.toLocaleLowerCase() ===
                    pPushLowercaseVersion.toLocaleLowerCase()
                )
                if (pTryPushAdminBindsParent) {
                  pTryPushAdminBindsParent.parent = ''
                }
                continue
              }
              if (_0x59fcd2 == null) {
                continue
              }
              const pFountAdminBindsPush = pAdminBinds.find(
                (pushedAdminBindsData) => pushedAdminBindsData.key === _0x59fcd2
              )
              if (pFountAdminBindsPush) {
                pFountAdminBindsPush.parent = pPushLowercaseVersion
              }
              for (const _0xd17f57 in pAdminBinds) {
                const _0x5d84fb = pAdminBinds[_0xd17f57]
                _0x5d84fb.parent == pPushLowercaseVersion &&
                  _0x5d84fb.key != _0x59fcd2 &&
                  (_0x5d84fb.parent = '')
              }
            }
            SetResourceKvp('Json_adminKeyOptions_2', JSON.stringify(pAdminBinds))
            getAdminKey2Options()
            const sentUpdateMenuData = []
            for (const fountCommandUIDatah in getCommandUI) {
              const getCommandUIKeyData = getCommandUI[fountCommandUIDatah]
              sentUpdateMenuData.push(getCommandUIKeyData.adminMenu)
            }
            exports['FIXDEV-adminUI'].updateMenuData(sentUpdateMenuData)
            return
          }
          function pushDefaultKeybinds() {
            if (pushedDefaultKeybinds) {
              return
            }
            getAdminKey2Options()
            for (const pFindAdminMode in pAdminBinds) {
              const pAdminModeBind = pAdminBinds[pFindAdminMode]
              if (pAdminModeBind.key != 'none') {
                RegisterCommand(
                  '+' + pAdminModeBind.key,
                  () => hasToggledAdminMode(pAdminModeBind.key),
                  false
                )
                RegisterCommand('-' + pAdminModeBind.key, () => {}, false)
                exports['FIXDEV-keybinds'].registerKeyMapping(
                  '',
                  'zzAdmin',
                  pAdminModeBind.key,
                  '+' + pAdminModeBind.key,
                  '-' + pAdminModeBind.key,
                  ''
                )
              }
            }
            pushedDefaultKeybinds = true
          }
          async function hasToggledAdminMode(bool) {
            if (!toggleAdminMode) {
              return
            }
            const bindID = pAdminBinds.find(
              (pFountAdminBinds) => pFountAdminBinds.key === bool
            )
            if (bindID) {
              const adminMenuCommandActions = getCommandUI.find(
                (fountCommandUI) =>
                  fountCommandUI.adminMenu != null &&
                  fountCommandUI.adminMenu.command.title.toLowerCase() ===
                    bindID.parent.toLowerCase()
              )
              if (adminMenuCommandActions == null) {
                return
              }
              let adminChildrenIndex = adminMenuData.findIndex(
                (adminMenuCommandActionsFountIndex) =>
                  adminMenuCommandActionsFountIndex.command.action === adminMenuCommandActions.adminMenu.command.action
              )
              adminChildrenIndex !== -1 &&
                (adminMenuData[adminChildrenIndex].command.child =
                  !adminMenuData[adminChildrenIndex].command.child)
              adminMenuData[adminChildrenIndex].command.child !== undefined
                ? (
                  emit(
                    adminMenuCommandActions.adminMenu.command.action,
                    adminMenuData[adminChildrenIndex].command.child
                  ))
                : emit(adminMenuCommandActions.adminMenu.command.action)
            }
          }
          function pGetDefinedNames(beforeNameTable) {
            let beforeNameTableClassed = null
            if (beforeNameTable == 'empty') {
              beforeNameTableClassed = null
              return
            }
            beforeNameTableClassed = beforeNameTable
            const nameTable = [
              {
                source: 1,
                charName: 'Mali McFarland',
                charID: 1,
                disc: false,
                queueType: 'Regular',
              },
            ]
            exports['FIXDEV-adminUI'].updateDefinedNames(nameTable)
          }
          async function pUpdateSearchParam(pSearchListing) {
            const pGetPlayerLogs = await RPC.execute(
              'FIXDEV:admin:getPlayerLogs',
              pSearchListing
            )
            exports['FIXDEV-adminUI'].updatePlayerLogs(pGetPlayerLogs)
          }
          on("FIXDEV:admin:updateUI", () => {
            closeMenu();
          });
          onNet("FIXDEV:admin:closeMenu", async _0x3e5a10 => {
            global.exports["FIXDEV-adminUI"].enableMenu(false, false);
            global.exports["FIXDEV-adminUI"].exitNUI();
          });;
          function closeMenu() {
            global.exports["FIXDEV-adminUI"].exitNUI();
            global.exports["FIXDEV-selector"].deselect();
          }
  
          RegisterNuiCallbackType('adminMenu')
          on('__cfx_nui:adminMenu', (adminMenuData, _0x5430b8) => {
            switch (adminMenuData.action) {
              case 'updatePlayerLogs':
                pUpdateSearchParam(adminMenuData.searchParam)
                break
              case 'updateOptions':
                adminMenuOptionsKVP(adminMenuData.options)
                break
              case 'updateKeybinds':
                pUpdateKeybinds(adminMenuData.keyBinds)
                break
              case 'updateFavCommands':
                adminMenuFavKVP(adminMenuData.favCommands)
                break
              case 'getDefinedNames':
                pGetDefinedNames(adminMenuData.playerList)
                break
              case 'updateCommandState':
                emit(adminMenuData.commandAction, adminMenuData.commandData.toggle)
                let adminMenuDataFindIndexFunction = adminMenuData.findIndex(
                  (_0x3a6b63) =>
                    _0x3a6b63.command.action === adminMenuData.commandAction
                )
                if (adminMenuDataFindIndexFunction !== -1) {
                  adminMenuData[adminMenuDataFindIndexFunction].command.child =
                    adminMenuData.commandData.toggle
                }
                break
              case 'toggleAdminMode':
                ;(toggleAdminMode = !toggleAdminMode),
                  emit('FIXDEV-admin:currentDevmode', toggleAdminMode),
                  exports['FIXDEV-adminUI'].updateAdminMode(toggleAdminMode)
                break
              case 'runEvent':
                emit(adminMenuData.event)
                break
              case 'clearDefinedNames':
                break
            }
            _0x5430b8()
          })
          RegisterNuiCallbackType('runCommandMenu')
          on('__cfx_nui:runCommandMenu', (knownModuleData, _0x2bb5f2) => {
            switch (knownModuleData.action) {
              case 'FIXDEV:admin:becomeModel':
                emit(knownModuleData.action, knownModuleData.data.Model)
                break
              case 'FIXDEV-admin/client/select-spawn':
                emit(knownModuleData.action)
                break
              case 'FIXDEV:admin:requestBarber':
                emit(knownModuleData.action, knownModuleData.data.Target)
                break
              case 'FIXDEV:admin:requestClothing':
                emitNet(knownModuleData.action, knownModuleData.data.Target)
                break
              case 'FIXDEV:admin:unbanPlayerJS':
                emitNet(knownModuleData.action, knownModuleData.data.SteamID)
                break
              case 'FIXDEV:admin:banPlayerJS':
                emit(knownModuleData.action, knownModuleData.data.Target, knownModuleData.data.Length, knownModuleData.data.Reason)
                break
              case 'FIXDEV:admin:spawnVehicle':
                emit(
                  knownModuleData.action,
                  knownModuleData.data?.Target,
                  knownModuleData.data?.Vehicle,
                  knownModuleData?.data['Vehicle Overwrite'],
                  knownModuleData.data.Mods
                )
                break
              case 'FIXDEV:admin:giveItem':
                emit(
                  knownModuleData.action,
                  knownModuleData.data.Target,
                  knownModuleData.data.Item,
                  knownModuleData.data.Amount
                )
                break
              case 'FIXDEV:admin:revive':
                knownModuleData.data.Target === '' ||
                knownModuleData.data.Target === undefined ||
                !knownModuleData.data.Target
                  ? (emit('FIXDEV:admin:ReviveInDistance'),
                    emitNet('FIXDEV:admin:sendLog', 'reviveDistance'))
                  : (emitNet('ragdoll:reviveSV', Number(knownModuleData.data.Target)),
                    emitNet('reviveGranted', Number(knownModuleData.data.Target)),
                    emitNet('ems:healplayer', Number(knownModuleData.data.Target)),
                    emitNet(
                      'FIXDEV:admin:sendLog',
                      'reviveTarget',
                      false,
                      knownModuleData.data.Target
                    ))
                break
              case 'FIXDEV:admin:cSay':
                emit(knownModuleData.action, knownModuleData.data.Text)
                break
              case 'FIXDEV:admin:tSay':
                emit(knownModuleData.action, knownModuleData.data.Text)
                break
              case 'FIXDEV:admin:teleportCoords':
                emit(knownModuleData.action, knownModuleData.data.Coords)
                break
              case 'FIXDEV:admin:teleportPlayer':
                emit(knownModuleData.action, knownModuleData.data.Target)
                break
              case 'FIXDEV:admin:bringPlayer':
                emit(knownModuleData.action, knownModuleData.data.Target)
              case 'FIXDEV:admin:maxMyStats':
                emit(knownModuleData.action, knownModuleData.data.Target)
                break
              case 'FIXDEV:admin:removeStress':
                emit(
                  knownModuleData.action,
                  knownModuleData.data.Target,
                  knownModuleData.data.Amount
                )
                break
              case 'FIXDEV:admin:requestJob':
                emit(knownModuleData.action, knownModuleData.data.Target, knownModuleData.data.Job)
                break
              case 'FIXDEV:admin:updateGarage':
                emit(
                  knownModuleData.action,
                  knownModuleData.data.Plate,
                  knownModuleData.data.Garage
                )
                break
              case 'FIXDEV:admin:giveLicense':
                emit(
                  knownModuleData.action,
                  knownModuleData.data.Target,
                  knownModuleData.data.License
                )
                break
              case 'FIXDEV:admin:flingPlayer':
                  emit(knownModuleData.action, knownModuleData.data.Target)
                break
              case 'FIXDEV:admin:giveJobWhitelist':
                emit(
                  knownModuleData.action,
                  knownModuleData.data.Target,
                  knownModuleData.data.Job,
                  knownModuleData.data.Rank
                )
                break
              case 'FIXDEV:admin:giveCash':
                emit(
                  knownModuleData.action,
                  knownModuleData.data.Target,
                  knownModuleData.data.Amount
                )
                break
              case 'FIXDEV:admin:kickPlayer':
                emit(
                  knownModuleData.action,
                  knownModuleData.data.Target,
                  knownModuleData.data.Reason
                )
                break
              case 'FIXDEV:admin:createBusiness':
                emit(
                  knownModuleData.action,
                  knownModuleData.data.ID,
                  knownModuleData.data.Name,
                  knownModuleData.data.Owner
                )
                break
              default:
                emit(knownModuleData.action, knownModuleData.data?.Target)
                break
            }
            _0x2bb5f2()
          })
          async function adminMenuStartSelecting() {
            if (!toggleAdminMode) {
              return
            }
            exports['FIXDEV-selector'].startSelecting(
              -1,
              PlayerPedId(),
              (_0x5c1090, _0x502269, _0xcb922c) =>
                _0x502269 === 1 || _0x502269 === 2 || _0x502269 === 3
            )
          }
          async function adminMenuStopSelecting() {
            if (!toggleAdminMode) {
              return
            }
            selectordata = exports['FIXDEV-selector'].stopSelecting()
            if (selectordata.selectedEntity) {
              await pSeletedEntity(selectordata.selectedEntity)
            } else {
              exports['FIXDEV-selector'].deselect()
            }
          }
          async function pDeleteAdminEntity() {
            var selectedEntityType = selectordata.selectedEntity
            if (selectordata.selectedEntity) {
              const GetEntityTypePP = GetEntityType(selectedEntityType)
              GetEntityTypePP >= 1 &&
                !IsPedAPlayer(selectedEntityType) &&
                DeleteEntity(selectedEntityType)
            }
          }
          function getCommandsUIYes(pSelectedVeh, pGivenEntityType) {
            const pPushWhatIAmTold = []
            for (const getSelectionID in getCommandUI) {
              const VehicleSelectionDatah = getCommandUI[getSelectionID].selection
              if (!VehicleSelectionDatah) {
                continue
              }
              if (
                VehicleSelectionDatah.entityType == pSelectedVeh ||
                (pGivenEntityType != null && VehicleSelectionDatah.entityType == pGivenEntityType)
              ) {
                pPushWhatIAmTold.push(VehicleSelectionDatah)
              }
            }
            return pPushWhatIAmTold
          }
          async function pSeletedEntity(pVehicleModel) {
            const _0x1c5170 = GetEntityType(pVehicleModel)
            let pSelectedVehicleTable = [],
              pVehicleKnownInformation = {
          //      lastGarage: playerVehicleData.garage,
          //      plate: GetVehicleNumberPlateText(pVehicleModel),
          //      cid: playerVehicleData.cid,
          //      vin: playerVehicleData.vin,
          //      size: playerVehicleData.size,
          //      mileage: playerVehicleData.metadata.mileage,
          //      fuel: playerVehicleData.metadata.fuel,
              }
            switch (_0x1c5170) {
              case 0:
                pSelectedVehicleTable = null
                break
              case 1:
                IsEntityAPed(pVehicleModel) &&
                  ((pSelectedVehicleTable = getCommandsUIYes(-1, null)),
                  (pVehicleKnownInformation = { name: 'Local' }))
                break
              case 2:
                ;(pSelectedVehicleTable = getCommandsUIYes(2, -1)),
                  (pVehicleKnownInformation = {
                    name: GetLabelText(
                      GetDisplayNameFromVehicleModel(GetEntityModel(pVehicleModel))
                    ),
                  })
                if (playerVehicleData) {
                } else {
                  pVehicleKnownInformation.size = GetVehicleModelNumberOfSeats(
                    GetEntityModel(pVehicleModel)
                  )
                }
                break
              case 3:
                ;(pSelectedVehicleTable = getCommandsUIYes(3, -1)),
                  (pVehicleKnownInformation = { name: '' + pVehicleModel })
                break
            }
          }
          let countCommand = 0;
          async function openAdminMenu() {
            const isAdmin = await RPC.execute('FIXDEV:admin:isAdmin')
            if (isAdmin) {
              const openDefaultAdminUI = await commandOptionsUI('openDefaultMenu')
              if (getCommandUI.length === 0) {
                countCommand = countCommand+1;
                if (countCommand == 1) {
                getCommandUI = await RPC.execute('FIXDEV:admin:getCommandUI')
                getCommandUIAgain(getCommandUI)
                for (const getCommands in getCommandUI) {
                  const myCommandsAdminUI = getCommandUI[getCommands]
                  let myAdminUI = myCommandsAdminUI.adminMenu
                  if (
                    myAdminUI &&
                    myAdminUI.command &&
                    (myAdminUI.command.child == false ||
                      myAdminUI.command.child == true)
                  ) {
                    const modulesFount = getMappedModules(myAdminUI.command.action)
                    ;(modulesFount == null || !modulesFount) &&
                      actionUIModule(myAdminUI.command.action, false)
                    getCommandUI[getCommands].adminMenu.command.child = getMappedModules(
                      myAdminUI.command.action
                    )
                  }
                  adminMenuData.push(myCommandsAdminUI.adminMenu)
                }
                pushDefaultKeybinds()
                }
              }
              openDefaultAdminUI.data ? await initAdminMenu(2) : await initAdminMenu(3)
            }
          }
          async function initAdminMenu(pVal) {
            getAdminKey2Options()
            let pItemList =
              exports['FIXDEV-inventory'].getItemListNames()
            const pValidJobs =
              exports['FIXDEV-base'].getModule('JobManager').ValidJobs
            let getJobListFuck = []
            for (const pValidJob in pValidJobs) {
              if (pValidJobs) {
                const pValidJobName = pValidJobs[pValidJob]
                pValidJobName &&
                  getJobListFuck.push({
                    job: pValidJob,
                    name: pValidJobName.name,
                  })
              }
            }
            let banListHistory = await RPC.execute('FIXDEV:admin:getBanHistory')
            let getBanHistoryFuck = []
            for (const pValidList in banListHistory) {
              if (banListHistory) {
                const pValidBanHistory = banListHistory[pValidList]
                pValidBanHistory &&
                getBanHistoryFuck.push({
                    from: pValidBanHistory.bannedon2,
                    until: pValidBanHistory.expire2,
                    admin: pValidBanHistory.bannedby,
                    name: pValidBanHistory.name,
                    SteamID: pValidBanHistory.steamid,
                    Reason: pValidBanHistory.reason,
                  })
              }
            }
  
            let disconnectedPlays = await RPC.execute("FIXDEV:admin:getRecentDisconnects")
            let getDisconnectedHistoryFuck = [];
            for (const pValidDisconnects in disconnectedPlays) {
              if (disconnectedPlays) {
                const pValidDisconnecteds = disconnectedPlays[pValidDisconnects]
                pValidDisconnecteds && getDisconnectedHistoryFuck.push({
                  name: pValidDisconnecteds.name,
                  serverID: pValidDisconnecteds.serverID,
                  SteamID: pValidDisconnecteds.SteamID,
                  charID: pValidDisconnecteds.charID,
                  charName: pValidDisconnecteds.charName,
                  queueType: pValidDisconnecteds.queueType,
                })
              }
            }
            const commandKey = {
              playerData: await GetPlayerDatah(),
              options: await adminMenuOptions(),
              menuData: adminMenuData,
              playerLogs: null,
              adminMode: toggleAdminMode,
              itemList: pItemList,
              vehicleList: exports["FIXDEV-admin"].getVehiclesCombined(),
              garageList: [
                {
                  garage_id: 'A',
                  name: 'Garage A'
                },
                {
                  garage_id: 'B',
                  name: 'Garage B'
                },
                {
                  garage_id: 'D',
                  name: 'Garage D'
                },
                {
                  garage_id: 'G',
                  name: 'Garage G'
                },
                {
                  garage_id: 'M',
                  name: 'Garage M'
                },
                {
                  garage_id: 'P',
                  name: 'Garage P'
                },
                {
                  garage_id: 'Q',
                  name: 'Garage Q'
                },
                {
                  garage_id: 'T',
                  name: 'Garage T'
                },
                {
                  garage_id: 'Police Shared',
                  name: 'Police Shared'
                },
                {
                  garage_id: 'Tuner Shared',
                  name: 'Tuner Shared'
                },
                {
                  garage_id: 'Police Personal',
                  name: 'Police Personal'
                },
                {
                  garage_id: 'Harmony',
                  name: 'Harmony Garage'
                },
                {
                  garage_id: 'Pier',
                  name: 'Pier Garage'
                },
                {
                  garage_id: 'Richman',
                  name: 'Richman Garage'
                },
                {
                  garage_id: 'Dojo',
                  name: 'Dojo Garage'
                },
                {
                  garage_id: 'Pillbox',
                  name: 'Pillbox Garage'
                },
                {
                  garage_id: 'casino',
                  name: 'Casino Garage'
                },
                {
                  garage_id: 'Repo',
                  name: 'Repo Garage'
                },
                {
                  garage_id: 'Impound Lot',
                  name: 'Impound Lot Garage'
                },
                {
                  garage_id: 'Police Impound',
                  name: 'Police Impound Garage'
                },
                {
                  garage_id: 'Perro',
                  name: 'Perro Garage'
                },
              ],
              jobList: getJobListFuck,
              licenseList: [
                {
                  licenseID: 'Drivers',
                  name: 'Drivers License',
                },
                {
                  licenseID: 'Weapon',
                  name: 'Weapon License',
                },
                {
                  licenseID: 'Fishing',
                  name: 'Fishing License',
                },
                {
                  licenseID: 'Hunting',
                  name: 'Hunting License',
                },
                {
                  licenseID: 'Pilot',
                  name: 'Pilot License',
                },
                {
                  licenseID: 'Business',
                  name: 'Business License',
                },
                {
                  licenseID: 'Bar',
                  name: 'Bar License',
                },
              ],
              banTimes: [
                {
                  ban_id: '1hr',
                  name: '1 Hour'
                },
                {
                  ban_id: '6hrs',
                  name: '6 Hours'
                },
                {
                  ban_id: '12hrs',
                  name: '12 Hours'
                },
                {
                  ban_id: '1day',
                  name: '1 Day'
                },
                {
                  ban_id: '3days',
                  name: '3 Days'
                },
                {
                  ban_id: '1week',
                  name: '1 Week',
                },
                {
                  ban_id: 'perm',
                  name: 'Permanent'
                }
              ],
              favCommands: getAdminMenuFavCommands(),
              disconnectedPlayers: getDisconnectedHistoryFuck,
              bannedList: getBanHistoryFuck,
            }
            exports['FIXDEV-adminUI'].setCommandUI(commandKey, null, 2)
          }
          setImmediate(() => {
            RegisterCommand('+adminSelect', async () => await adminMenuStartSelecting(), false)
            RegisterCommand('-adminSelect', async () => await adminMenuStopSelecting(), false)
            RegisterCommand(
              '+adminDeleteEntity',
              async () => await pDeleteAdminEntity(),
              false
            )
            RegisterCommand('-adminDeleteEntity', () => {}, false)
            RegisterCommand(
              '+openAdminMenu',
              async () => await openAdminMenu(),
              false
            )
            RegisterCommand('-openAdminMenu', () => {}, false)
            exports['FIXDEV-keybinds'].registerKeyMapping(
              'general',
              'zzAdmin',
              'Delete Target',
              '+adminDeleteEntity',
              '-adminDeleteEntity',
              ''
            )
            exports['FIXDEV-keybinds'].registerKeyMapping(
              'general',
              'zzAdmin',
              'Select Target',
              '+adminSelect',
              '-adminSelect',
              ''
            )
            exports['FIXDEV-keybinds'].registerKeyMapping(
              'general',
              'zzAdmin',
              'Open Menu',
              '+openAdminMenu',
              '-openAdminMenu',
              ''
            )
          })
          RegisterCommand('menu', async () => await openAdminMenu(), false)
        },
        615: function (notused, lolanim) {
          Object.defineProperty(lolanim, '__esModule', { value: true })
          lolanim.formatCoords =
            lolanim.loadAnimDict =
            lolanim.Delay =
              void 0
          let _0x285923 = (_0x528995) =>
            new Promise((_0x3e3c27) => setTimeout(_0x3e3c27, _0x528995))
          lolanim.Delay = _0x285923
          async function _0x5acb4d(_0x21a554) {
            while (!HasAnimDictLoaded(_0x21a554)) {
              RequestAnimDict(_0x21a554)
              await (0, lolanim.Delay)(5)
            }
          }
          lolanim.loadAnimDict = _0x5acb4d
          class formArray {
            constructor(pCoordsX = 0, pCoordsY = 0, pCoordsZ = 0) {
              this.x = pCoordsX
              this.y = pCoordsY
              this.z = pCoordsZ
            }
            ['setFromArray'](pCoordsFromArray) {
              return (
                (this.x = pCoordsFromArray[0]),
                (this.y = pCoordsFromArray[1]),
                (this.z = pCoordsFromArray[2]),
                this
              )
            }
            ['getArray']() {
              return [this.x, this.y, this.z]
            }
            ['add'](pCoordsAdd) {
              return (
                (this.x += pCoordsAdd.x),
                (this.y += pCoordsAdd.y),
                (this.z += pCoordsAdd.z),
                this
              )
            }
            ['addScalar'](pCoordsAddScalar) {
              return (
                (this.x += pCoordsAddScalar),
                (this.y += pCoordsAddScalar),
                (this.z += pCoordsAddScalar),
                this
              )
            }
            ['sub'](pCoordsSub) {
              return (
                (this.x -= pCoordsSub.x),
                (this.y -= pCoordsSub.y),
                (this.z -= pCoordsSub.z),
                this
              )
            }
            ['addPlusScaler'](pCoordsAdd, pCoordsScalar) {
              return (
                (this.x += pCoordsAdd.x * pCoordsScalar),
                (this.y += pCoordsAdd.y * pCoordsScalar),
                (this.z += pCoordsAdd.z * pCoordsScalar),
                this
              )
            }
            ['subPlusScaler'](pCoordsSub, pCoordsScalar) {
              return (
                (this.x -= pCoordsSub.x * pCoordsScalar),
                (this.y -= pCoordsSub.y * pCoordsScalar),
                (this.z -= pCoordsSub.z * pCoordsScalar),
                this
              )
            }
            ['equals'](pCoordsEquals) {
              return (
                this.x === pCoordsEquals.x &&
                this.y === pCoordsEquals.y &&
                this.z === pCoordsEquals.z
              )
            }
            ['subScalar'](pCoordsSubScalar) {
              return (
                (this.x -= pCoordsSubScalar),
                (this.y -= pCoordsSubScalar),
                (this.z -= pCoordsSubScalar),
                this
              )
            }
            ['multiply'](pCoordsMultiply) {
              return (
                (this.x *= pCoordsMultiply.x),
                (this.y *= pCoordsMultiply.y),
                (this.z *= pCoordsMultiply.z),
                this
              )
            }
            ['multiplyScalar'](pCoordsMultiplyScalar) {
              return (
                (this.x *= pCoordsMultiplyScalar),
                (this.y *= pCoordsMultiplyScalar),
                (this.z *= pCoordsMultiplyScalar),
                this
              )
            }
            ['round']() {
              return (
                (this.x = Math.round(this.x)),
                (this.y = Math.round(this.y)),
                (this.z = Math.round(this.z)),
                this
              )
            }
            ['floor']() {
              return (
                (this.x = Math.floor(this.x)),
                (this.y = Math.floor(this.y)),
                (this.z = Math.floor(this.z)),
                this
              )
            }
            ['ceil']() {
              return (
                (this.x = Math.ceil(this.x)),
                (this.y = Math.ceil(this.y)),
                (this.z = Math.ceil(this.z)),
                this
              )
            }
            ['getDistance'](pCoordsDistance) {
              const [pCoords1, pCoords2, pCoords3] = [
                this.x - pCoordsDistance.x,
                this.y - pCoordsDistance.y,
                this.z - pCoordsDistance.z,
              ]
              return Math.sqrt(
                pCoords1 * pCoords1 +
                  pCoords2 * pCoords2 +
                  pCoords3 * pCoords3
              )
            }
            ['getDistanceFromArray'](pCoordsArray) {
              const [pCoords1, pCoords2, pCoords3] = [
                this.x - pCoordsArray[0],
                this.y - pCoordsArray[1],
                this.z - pCoordsArray[2],
              ]
              return Math.sqrt(
                pCoords1 * pCoords1 +
                  pCoords2 * pCoords2 +
                  pCoords3 * pCoords3
              )
            }
            ['isCoordinateEqual'](pCoords1, pCoords2) {
              return pCoords1.equals(pCoords2)
            }
            static ['fromArray'](pCoords) {
              return new formArray(pCoords[0], pCoords[1], pCoords[2])
            }
          }
          lolanim.formatCoords = formArray
        },
      },
      exportTable = {}
    function loadExportsMaybe(exportID) {
      var fuckingExports = exportTable[exportID]
      if (fuckingExports !== undefined) {
        return fuckingExports.exports
      }
      var someMoreExports = (exportTable[exportID] = { exports: {} })
      fullMenuData[exportID](someMoreExports, someMoreExports.exports, loadExportsMaybe)
      return someMoreExports.exports
    }
    !(function () {
      loadExportsMaybe.g = (function () {
        if (typeof globalThis === 'object') {
          return globalThis
        }
        try {
          return this || new Function('return this')()
        } catch (_0x2e8c4a) {
          if (typeof window === 'object') {
            return window
          }
        }
      })()
    })()
    var brothisisirrelivant = loadExportsMaybe(50)
  })()