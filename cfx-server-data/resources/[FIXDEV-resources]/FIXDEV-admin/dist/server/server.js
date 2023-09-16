!(function () {
    'use strict'
    var lol = {
      g: (function () {
        if ('object' == typeof globalThis) {
          return globalThis
        }
        try {
          return this || new Function('return this')()
        } catch (errr) {
          if ('object' == typeof window) {
            return window
          }
        }
      })(),
    }
    RPC.register('FIXDEV:admin:getCommandUI', async (pSource) => {
      let [pAdminNotGetCommandUI, pAdminGetCommandUI] =
          exports['FIXDEV-admin'].isAdministrator(pSource),
        pObjectModuleTable = []
      return (
        Object.entries([
          {
            rank: ['owner', 'dev'],
            adminMenu: {
              command: {
                title: 'Bennys',
                cat: 'Player',
                child: void 0,
                action: 'FIXDEV:admin:enterBennys',
              },
              options: {
                bindKey: {
                  value: void 0,
                  options: {},
                },
              },
            },
          },
          {
            rank: ['owner', 'dev', 'admin'],
            adminMenu: {
              command: {
                title: 'Change Model',
                cat: 'Player',
                child: { inputs: ['Model'] },
                action: 'FIXDEV:admin:becomeModel',
              },
              options: { bindKey: void 0 },
            },
          },
          {
            rank: ['owner', 'dev', 'admin'],
            adminMenu: {
              command: {
                title: 'Teleport',
                cat: 'Player',
                child: { inputs: ['Target'] },
                action: 'FIXDEV:admin:teleportPlayer',
              },
              options: { bindKey: void 0 },
            },
          },
          {
            rank: ['owner', 'dev', 'admin'],
            adminMenu: {
              command: {
                title: 'Teleport Coords',
                cat: 'Player',
                child: { inputs: ['Coords'] },
                action: 'FIXDEV:admin:teleportCoords',
              },
              options: { bindKey: void 0 },
            },
          },
          {
            rank: ['owner', 'dev'],
            adminMenu: {
              command: {
                title: 'Fix Vehicle',
                cat: 'Player',
                child: void 0,
                action: 'FIXDEV:admin:fixVehicle',
              },
              options: {
                bindKey: {
                  value: void 0,
                  options: {},
                },
              },
            },
          },
          {
            rank: ['owner'],
            adminMenu: {
              command: {
                title: 'God',
                cat: 'Player',
                child: false,
                action: 'FIXDEV:admin:toggleGodmode',
              },
              options: {
                bindKey: {
                  value: void 0,
                  options: {},
                },
              },
            },
          },
          {
            rank: ['owner', 'dev', 'admin'],
            adminMenu: {
              command: {
                title: 'Spawn Selector',
                cat: 'Utility',
                child: false,
                action: 'FIXDEV-admin/client/select-spawn',
              },
              options: { bindKey: void 0 },
            },
          },
          {
            rank: ['owner', 'dev'],
            adminMenu: {
              command: {
                title: 'Debug',
                cat: 'Utility',
                child: false,
                action: 'FIXDEV-admin:currentDebug',
              },
              options: {
                bindKey: {
                  value: void 0,
                  options: {},
                },
              },
            },
          },
          {
            rank: ['owner', 'dev'],
            adminMenu: {
              command: {
                title: 'Dev Spawn',
                cat: 'Utility',
                child: void 0,
                action: 'FIXDEV:admin:devSpawn',
              },
              options: { bindKey: void 0 },
            },
          },
          {
            rank: ['owner', 'dev'],
            adminMenu: {
              command: {
                title: 'Noclip',
                cat: 'Player',
                child: false,
                action: 'FIXDEV:admin:noClipToggle',
              },
              options: {
                bindKey: {
                  value: void 0,
                  options: {},
                },
              },
            },
          },
          {
            rank: ['owner', 'dev'],
            adminMenu: {
              command: {
                title: 'Cloak',
                cat: 'Player',
                child: false,
                action: 'FIXDEV:admin:toggleCloak',
              },
              options: {
                bindKey: {
                  value: void 0,
                  options: {},
                },
              },
            },
          },
          {
            rank: ['owner', 'dev', 'admin'],
            adminMenu: {
              command: {
                title: 'Barber',
                cat: 'User',
                child: { inputs: ['Target'] },
                action: 'FIXDEV:admin:requestBarber',
              },
              options: { bindKey: void 0 },
            },
          },
          {
            rank: ['owner', 'dev', 'admin'],
            adminMenu: {
              command: {
                title: 'Clothing',
                cat: 'User',
                child: { inputs: ['Target'] },
                action: 'FIXDEV:admin:requestClothing',
              },
              options: { bindKey: void 0 },
            },
          },
          {
            rank: ['owner', 'dev'],
            adminMenu: {
              command: {
                title: 'Bring',
                cat: 'User',
                child: { inputs: ['Target'] },
                action: 'FIXDEV:admin:bringPlayer',
              },
              options: { bindKey: void 0 },
            },
          },
          {
            rank: ['owner', 'dev'],
            adminMenu: {
              command: {
                title: 'Revive',
                cat: 'Player',
                child: { inputs: ['TargetNot'] },
                action: 'FIXDEV:admin:revive',
              },
              options: { bindKey: void 0 },
            },
          },
          {
            rank: ['owner', 'dev', 'admin'],
            adminMenu: {
              command: {
                title: 'cSay',
                cat: 'Utility',
                child: { inputs: ['Text'] },
                action: 'FIXDEV:admin:cSay',
              },
              options: { bindKey: void 0 },
            },
          },
          {
            rank: ['owner', 'dev'],
            adminMenu: {
              command: {
                title: 'Give License',
                cat: 'Player',
                child: {
                  inputs: ['Target', 'License'],
                },
                action: 'FIXDEV:admin:giveLicense',
              },
              options: { bindKey: void 0 },
            },
          },
          {
            rank: ['owner', 'dev'],
            adminMenu: {
              command: {
                title: 'Fling Player',
                cat: 'Player',
                child: {
                  inputs: ['Target'],
                },
                action: 'FIXDEV:admin:flingPlayer',
              },
              options: { bindKey: void 0 },
            },
          },
          {
            rank: ['owner'],
            adminMenu: {
              command: {
                title: 'Give Cash',
                cat: 'Player',
                child: {
                  inputs: ['Target', 'Amount'],
                },
                action: 'FIXDEV:admin:giveCash',
              },
              options: { bindKey: void 0 },
            },
          },
          {
            rank: ['owner', 'dev', 'admin'],
            adminMenu: {
              command: {
                title: 'Kick',
                cat: 'Utility',
                child: {
                  inputs: ['Target', 'Reason'],
                },
                action: 'FIXDEV:admin:kickPlayer',
              },
              options: { bindKey: void 0 },
            },
          },
          {
            rank: ['owner', 'dev'],
            adminMenu: {
              command: {
                title: 'Request Job',
                cat: 'Player',
                child: {
                  inputs: ['Target', 'Job'],
                },
                action: 'FIXDEV:admin:requestJob',
              },
              options: { bindKey: void 0 },
            },
          },
          {
            rank: ['owner', 'dev', 'admin'],
            adminMenu: {
              command: {
                title: 'Teleport Marker',
                cat: 'Player',
                child: void 0,
                action: 'FIXDEV:admin:teleportMarker',
              },
              options: {
                bindKey: {
                  value: void 0,
                  options: {},
                },
              },
            },
          },
          {
            rank: ['owner', 'dev'],
            adminMenu: {
              command: {
                title: 'Give Item',
                cat: 'Utility',
                child: {
                  inputs: ['TargetNot', 'Item', 'Amount'],
                },
                action: 'FIXDEV:admin:giveItem',
              },
              options: {
                bindKey: {
                  value: void 0,
                  options: {},
                },
              },
            },
          },
          {
            rank: ['owner'],
            adminMenu: {
              command: {
                title: 'Give Job Whitelist',
                cat: 'Utility',
                child: {
                  inputs: ['Target', 'Job', 'Rank'],
                },
                action: 'FIXDEV:admin:giveJobWhitelist',
              },
              options: {
                bindKey: {
                  value: void 0,
                  options: {},
                },
              },
            },
          },
          {
            rank: ['owner', 'dev'],
            adminMenu: {
              command: {
                title: 'Spawn Vehicle',
                cat: 'Utility',
                child: {
                  inputs: ['TargetNot', 'Vehicle', 'Vehicle Overwrite'],
                  checkBox: ['Mods'],
                },
                action: 'FIXDEV:admin:spawnVehicle',
              },
              options: {
                bindKey: {
                  value: void 0,
                  options: {},
                },
              },
            },
          },
          {
            rank: ['owner', 'dev'],
            adminMenu: {
              command: {
                title: 'Max Stats',
                cat: 'Player',
                child: { inputs: ['TargetNot'] },
                action: 'FIXDEV:admin:maxMyStats',
              },
              options: {
                bindKey: {
                  value: void 0,
                  options: {},
                },
              },
            },
          },
          {
            rank: ['owner', 'dev', 'admin'],
            adminMenu: {
              command: {
                title: 'Remove Stress',
                cat: 'Player',
                child: {
                  inputs: ['TargetNot', 'Amount'],
                },
                action: 'FIXDEV:admin:removeStress',
              },
              options: {
                bindKey: {
                  value: void 0,
                  options: {},
                },
              },
            },
          },
          {
            rank: ['owner', 'dev', 'admin', 'mod'],
            adminMenu: {
              command: {
                title: 'Update Garage',
                cat: 'Utility',
                child: {
                  inputs: ['Plate', 'Garage'],
                },
                action: 'FIXDEV:admin:updateGarage',
              },
              options: {
                bindKey: {
                  value: void 0,
                  options: {},
                },
              },
            },
          },
          {
            rank: ['owner'],
            adminMenu: {
              command: {
                title: 'Create Business',
                cat: 'Utility',
                child: {
                  inputs: ['ID', 'Name', 'Owner'],
                },
                action: 'FIXDEV:admin:createBusiness',
              },
              options: {
                bindKey: {
                  value: void 0,
                  options: {},
                },
              },
            },
          },
          {
            rank: ['owner', 'dev', 'admin'],
            adminMenu: {
              command: {
                title: 'Search Player Inventory',
                cat: 'Player',
                child: { inputs: ['Target'] },
                action: 'FIXDEV:admin:searchPlayerInventory',
              },
              options: {
                bindKey: {
                  value: void 0,
                  options: {},
                },
              },
            },
          },
          {
            rank: ['owner', 'dev'],
            adminMenu: {
              command: {
                title: 'Ban Player',
                cat: 'Player',
                child: {
                  inputs: ['Target', 'Length', 'Reason'],
                },
                action: 'FIXDEV:admin:banPlayerJS',
              },
              options: {
                bindKey: {
                  value: void 0,
                  options: {},
                },
              },
            },
          },
          {
            rank: ['owner', 'dev'],
            adminMenu: {
              command: {
                title: 'UnBan Player',
                cat: 'Player',
                child: {
                  inputs: ['SteamID'],
                },
                action: 'FIXDEV:admin:unbanPlayerJS',
              },
              options: {
                bindKey: {
                  value: void 0,
                  options: {},
                },
              },
            },
          },
        ]).forEach(([pAdminCode, pAdminModules]) => {
          pAdminModules.rank.forEach((pAdminCodeLaidOut) => {
            pAdminCodeLaidOut === pAdminGetCommandUI && pObjectModuleTable.push(pAdminModules)
          })
        }),
        pObjectModuleTable
      )
    })
    onNet('FIXDEV:admin:sendAnnoucement', (pText) => {
      let pAdmin = GetPlayerName(source.toString())
      exports['FIXDEV-admin'].sendLog(
        'https://discord.com/api/webhooks/993005972828201052/2XxjiIk75QDgYe6hDJcCtP2pgIhI7JVKYruJKQsLqDgKZ6P12nABS7fWwJ4VokJMI-x2', // changed
        '255',
        '[FIXDEV-admin] cSay Log',
        'cSay message: ' + pText + '\nAdmin: ' + pAdmin,
        '',
        ''
      )
      emitNet('chatMessage', -1, 'Admin', 1, pText)
    })
    onNet('FIXDEV:admin:sendTsay', (pText) => {
      emitNet('pNotify:SendNotification', -1, {
        text:
          '<center><span style="font-size:28px;color:red;">' +
          pText +
          '<br /><hr style="border-color: rgba(255, 0, 0, 0.5);">' +
          pText +
          '</span></center>',
        layout: 'top',
        timeout: 15000,
        type: 'error',
        animation: {
          open: 'gta_effects_fade_in',
          close: 'gta_effects_fade_out',
        },
        queue: 'announcement',
        progressBar: false,
      })
    })
    let disconnectedTable = [];
    onNet('playerDropped', async () => {
      let pSource = source
      let [cid, fullname] = exports['FIXDEV-admin'].getEverything(pSource)
     // const fullname = char.first_name + ' ' + char.last_name || 'No Character Name'
      disconnectedTable.push({
        name: GetPlayerName(pSource),
        serverID: pSource,
        SteamID: 'peeeniss',
        charID: cid,
        charName: fullname,
        queueType: 'Regular',
      })
    })
  
    RPC.register('FIXDEV:admin:getRecentDisconnects', (pSource) => {
      return disconnectedTable
    })
    // decrypted from nopixel ui
    RPC.register('FIXDEV:admin:getPlayerData', (pSource) => {
      return (
        exports['FIXDEV-admin'].getEverything()
      )
    })
    RPC.register('FIXDEV:admin:getBanHistory', (pSource) => {
      let banHistoryPacked = exports['FIXDEV-admin'].getBanList()
      return (banHistoryPacked)
    })
    const addPlayerLog = async (
      type,
      steamid,
      log,
      cid,
      data
    ) => {
      const newAdminDate = new Date()
      await SQL.execute(
        'INSERT INTO player_logs (type, steamid, log, date, cid, data) VALUES (@type, @steamid, @log, @date, @cid, @data)',
        {
          type: type,
          steamid: steamid,
          log: log,
          date: newAdminDate.toLocaleString(),
          cid: cid,
          data: data,
        }
      )
    }
    exports('addPlayerLog', addPlayerLog)
    RPC.register('FIXDEV:admin:getPlayerLogs', async (pSource, pLogs) =>
      '' !== pLogs.steamid ||
      (void 0 !== pLogs.steamid &&
        '' === pLogs.type &&
        '' === pLogs.cid)
        ? await SQL.execute(
            'SELECT * FROM player_logs WHERE steamid = @steamid ORDER BY id DESC LIMIT @limit',
            {
              steamid: pLogs.steamid,
              limit: pLogs.limit,
            }
          )
        : '' !== pLogs.cid ||
          (void 0 !== pLogs.cid &&
            '' === pLogs.type &&
            '' === pLogs.steamid)
        ? await SQL.execute(
            'SELECT * FROM player_logs WHERE cid = @cid ORDER BY id DESC LIMIT @limit',
            {
              cid: pLogs.cid,
              limit: pLogs.limit,
            }
          )
        : '' !== pLogs.type ||
          (void 0 !== pLogs.type &&
            '' === pLogs.cid &&
            '' === pLogs.steamid)
        ? await SQL.execute(
            'SELECT * FROM player_logs WHERE type = @type ORDER BY id DESC LIMIT @limit',
            {
              type: pLogs.type,
              limit: pLogs.limit,
            }
          )
        : []
    )
    RPC.register('FIXDEV:admin:isAdmin', async (pSource) => {
      let [isAdmin, isValid] =
        exports['FIXDEV-admin'].isAdministrator(pSource)
      return !!isAdmin
    })
    onNet('FIXDEV:admin:teleportPlayer', (pSource, _0x31e23e) => {
      let pTarget = _0x31e23e
      if (0 !== pTarget) {
        let pSourcePed = GetPlayerPed(pSource),
          pTargetPed = GetPlayerPed(pTarget)
        if (DoesEntityExist(pTargetPed)) {
          let pTargetCoords = GetEntityCoords(pTargetPed)
          SetEntityCoords(
            pSourcePed,
            pTargetCoords[0],
            pTargetCoords[1],
            pTargetCoords[2],
            true,
            false,
            false,
            false
          )
        }
      }
    })
    onNet('FIXDEV:admin:bringPlayer', (pSource, pTarget) => {
      let pTargetData = pTarget
      if (0 !== pTargetData) {
        let pSourcePed = GetPlayerPed(pSource),
          pTargetPed = GetPlayerPed(pTargetData)
        if (DoesEntityExist(pTargetPed)) {
          let pSourceCoords = GetEntityCoords(pSourcePed)
          SetEntityCoords(
            pTargetPed,
            pSourceCoords[0],
            pSourceCoords[1],
            pSourceCoords[2],
            true,
            false,
            false,
            false
          )
        }
      }
    })
    onNet('FIXDEV:admin:maxMyStats', (pTarget) => {
      let pUser =
        ('' !== pTarget && void 0 !== pTarget && pTarget) || source
      let pAdmin = GetPlayerName(source.toString()),
        pTargetData = GetPlayerName(pUser.toString())
      exports['FIXDEV-admin'].sendLog(
        'https://discord.com/api/webhooks/993006081330659438/XjUkloEviLua2p6FuJ8moD0SnoRM5UbGFN1b9afyXJ4qAkdv5KAXVm9Ly1SgX5zBBK2g', // changed
        '255',
        '[FIXDEV-admin] Max Stats Log',
        'Admin: ' + pAdmin + '\nTarget: ' + pTargetData,
        ''
      )
      emitNet('FIXDEV:admin:maxstats', pUser)
    })
    onNet('FIXDEV:admin:removeStress', (pTarget, pAmount) => {
      let pUser = ('' !== pTarget && pTarget) || source
      emitNet('FIXDEV:admin:clearStress', pUser, pAmount)
    })
    onNet('FIXDEV:admin:requestJob', (pTarget, pJob) => {
      let pUser = ('' !== pTarget && pTarget) || source
      emitNet('FIXDEV:admin:requestedJob', pUser, pJob)
    })
    onNet('FIXDEV:admin:requestBarber', (pTarget) => {
      let pUser = ('' !== pTarget && pTarget) || source
      emitNet('FIXDEV:admin:openBarber', pUser)
    })
    onNet('FIXDEV:admin:requestClothing', (pTarget) => {
      let pUser = ('' !== pTarget && pTarget) || source
      emitNet('FIXDEV:admin:openClothing', pUser)
    })
    onNet('FIXDEV:admin:requestBennys', (pTarget) => {
      let pUser = ('' !== pTarget && pTarget) || source
      emitNet('FIXDEV:admin:bennys', pUser)
    })
    onNet('FIXDEV:admin:updateGarage', async (vehicleLicensePlate, givenGarageData) => {
      let src = source,
        selectedGarage = ('' !== givenGarageData && givenGarageData) || 'garage_alta'
      await SQL.execute(
        'UPDATE characters_cars SET current_garage = @current_garage, vehicle_state = @vehicle_state WHERE license_plate = @license_plate',
        {
          current_garage: selectedGarage,
          vehicle_state: 'In',
          license_plate: vehicleLicensePlate,
        }
      )
      emitNet('DoLongHudText', src, 'Successfully updated garage state', 1)
    })
    onNet('FIXDEV:admin:giveLicense', async (pTarget, pType) => {
      if ('' === pTarget || void 0 === pTarget) {
        return emitNet('DoLongHudText', source, 'You must select a target', 2)
      }
      let pAdmin = GetPlayerName(source.toString()),
        pTargetData = GetPlayerName(pTarget.toString())
      return (
        exports['FIXDEV-admin'].sendLog(
          'https://discord.com/api/webhooks/993006234707972136/PGDIxqtgeoxxtDeslFXD6HnWd7-Y4CMKkbXSaHg1oiMzZWREAiA6w-W6uBKoT2lNTMV1', // changed
          '255',
          '[FIXDEV-admin] Give License Log',
          'License Given: ' +
            pType +
            ' License\nAdmin: ' +
            pAdmin +
            '\nTarget: ' +
            pTargetData,
          ''
        ),
        exports['FIXDEV-admin'].giveLicense(Number(pTarget), pType)
          ? emitNet('DoLongHudText', source, 'Successfully gave license!', 1)
          : emitNet(
              'DoLongHudText',
              source,
              'Error while trying to give license.',
              2
            )
      )
    })
    onNet(
      'FIXDEV:admin:giveJobWhitelist',
      async (pTarget, pJob, pRank) => {
        if ('' === pTarget || void 0 === pTarget) {
          return emitNet('DoLongHudText', source, 'You must select a target', 2)
        }
        let pAdmin = GetPlayerName(source.toString()),
          pTargetData = GetPlayerName(pTarget.toString())
        return (
          exports['FIXDEV-admin'].sendLog(
            'https://discord.com/api/webhooks/993006418787565670/iq97Wzmg_ic8Ic5ZuG9C1a_YLntK23FMEt_eih6gQNavKFeYOkKp4j5xVIfBj3NTtwmS', // changed
            '255',
            '[FIXDEV-admin] Job Whitelist Log',
            'Whitelisted Job Given: ' +
              pJob +
              '\nRank: ' +
              pRank +
              '\nAdmin: ' +
              pAdmin +
              '\nTarget: ' +
              pTargetData,
            ''
          ),
          exports['FIXDEV-admin'].giveJobWhitelist(
            Number(pTarget),
            pJob,
            pRank
          )
            ? emitNet(
                'DoLongHudText',
                source,
                'Successfully gave job whitelist!',
                1
              )
            : emitNet(
                'DoLongHudText',
                source,
                'Error while trying to give job whitelist.',
                2
              )
        )
      }
    )
    onNet('FIXDEV:admin:giveCash', async (pTarget, pAmount) => {
      if ('' === pTarget || void 0 === pTarget) {
        return emitNet('DoLongHudText', source, 'You must select a target', 2)
      }
      let pAdmin = GetPlayerName(source.toString()),
        pTargetData = GetPlayerName(pTarget.toString())
      return (
        exports['FIXDEV-admin'].sendLog(
          'https://discord.com/api/webhooks/993006528812564591/_QbJH10BOiouKFfOA-BsHHqz0D7wyrSIKPr9_40T3_BTn7eYcILIP1L6qeNPaYCVquHo', // changed
          '255',
          '[FIXDEV-admin] Give Cash Log',
          'Cash Given: $' +
            pAmount.toLocaleString() +
            '\nAdmin: ' +
            pAdmin +
            '\nTarget: ' +
            pTargetData,
          ''
        ),
        exports['FIXDEV-admin'].giveCash(Number(pTarget), pAmount)
          ? emitNet('DoLongHudText', source, 'Successfully gave cash!', 1)
          : emitNet(
              'DoLongHudText',
              source,
              'Error while trying to give cash.',
              2
            )
      )
    })
    onNet('FIXDEV:admin:kickPlayer', async (pTarget, pReason) => {
      if ('' === pTarget || void 0 === pTarget) {
        return emitNet('DoLongHudText', source, 'You must select a target', 2)
      }
      DropPlayer(pTarget, pReason)
      let pAdmin = GetPlayerName(source.toString()),
        pTargetData = GetPlayerName(pTarget.toString())
      exports['FIXDEV-admin'].sendLog(
        'https://discord.com/api/webhooks/993006656579444826/0gEQxx-I1wx5iBegO3x2OwXu6GHpOS84SPMMB_6uHVSwWfU2qRTJzW7WYqqiEwcsf2VF', // changed
        '255',
        '[FIXDEV-admin] Kick Player Log',
        'Reason: ' +
          pReason +
          '\nAdmin: ' +
          pAdmin +
          '\nTarget: ' +
          pTargetData,
        ''
      )
    })
    onNet('FIXDEV:admin:createBusiness', async (pBID, pBusinessName, pBusinessOwner) => {
      let _0x1fb2d5 = GetPlayerName(source.toString())
      exports['FIXDEV-admin'].sendLog(
        'https://discord.com/api/webhooks/993006771901833218/OowPrRKBT_Y70zIrlaqjmY0Jjx_s7g9mxek193XcaM423t0WGtUvJ4ke9x6EiEGwry4O', // changed
        '255',
        '[FIXDEV-admin] Business Creation Log',
        'Business ID: ' +
          pBID +
          '\nBusiness Name: ' +
          pBusinessName +
          '\nBusiness Owner: ' +
          pBusinessOwner +
          '\nAdmin: ' +
          _0x1fb2d5,
        ''
      )
      let pBusinessOptions = []
      pBusinessOptions.push(
        {
          name: 'Owner',
          charge_access: true,
          bank_access: true,
          role_manage: true,
          role_create: true,
          key_access: true,
          stash_access: true,
          craft_access: true,
          can_hire: true,
          can_fire: true,
        },
        {
          name: 'Employee',
          charge_access: false,
          bank_access: false,
          role_manage: false,
          role_create: false,
          key_access: true,
          stash_access: true,
          craft_access: true,
          can_hire: false,
          can_fire: false,
        }
      )
      let pBusinessEmployees = []
      pBusinessEmployees.push({
        cid: pBusinessOwner,
        role: 'Owner',
        rank: 5,
      })
      let pBusinessBankID =
        Math.floor(10 * Math.random()).toString() +
        Math.floor(10 * Math.random()).toString() +
        Math.floor(10 * Math.random()).toString() +
        Math.floor(10 * Math.random()).toString() +
        Math.floor(10 * Math.random()).toString() +
        Math.floor(10 * Math.random()).toString() +
        Math.floor(10 * Math.random()).toString() +
        Math.floor(10 * Math.random()).toString()
      return (await SQL.execute(
        'INSERT INTO businesses (business_id, business_name, employees, roles, bank_id) VALUES (@business_id, @business_name, @employees, @roles, @bank_id)',
        {
          business_id: pBID,
          business_name: pBusinessName,
          employees: JSON.stringify(pBusinessEmployees),
          roles: JSON.stringify(pBusinessOptions),
          bank_id: pBusinessBankID,
        }
      ))
        ? emitNet('DoLongHudText', source, 'Successfully created business!', 1)
        : emitNet(
            'DoLongHudText',
            source,
            'Error while trying to create business.',
            2
          )
    })
    RegisterCommand(
      'testidentifiers',
      (pSource, pArgs) => {
        const pIdentifier = GetPlayerIdentifier(pSource, Number(pArgs[0]))
      },
      false
    )
    onNet('FIXDEV:admin:giveItem', async (pTarget, pItem, pAmount) => {
      let pUser = ('' !== pTarget && pTarget) || source,
        pAmountOfitem = ('' !== pAmount && pAmount) || 1
      isNaN(pItem) || (pItem = Number(pItem))
      const pSource = source
      emitNet('player:receiveItem', pUser, pItem.toString(), pAmountOfitem)
      let pWebhook =
          'https://discord.com/api/webhooks/993006882451099709/wa3Ai3X4lzyiPKjz-YsZc0sRfy46bjiMvGbHYp37cRFNOVJ8SLXMFT0jXr4O7LH1TGGB',
        pAdminName = GetPlayerName(source.toString())
      if ('' !== pTarget || null !== pTarget) {
        let pUserName = GetPlayerName(pUser.toString())
        exports['FIXDEV-admin'].sendLog(
          pWebhook,
          '255',
          '[FIXDEV-admin] Spawn Item Log',
          'Item Spawned: ' +
            pItem +
            '\nItem Amount: 1\nAdmin: ' +
            pAdminName +
            '\nTarget: ' +
            pUserName,
          ''
        )
        const pMetaLogData =
            '{"amount":"' + pAmountOfitem + '","item":"' + pItem + '"}',
          pIdentifierSource = GetPlayerIdentifier(pSource, 0)
        addPlayerLog(
          'Admin',
          null !== pIdentifierSource ? pIdentifierSource : 'None',
          'Spawned item for ' +
            pUserName +
            ' (' +
            pIdentifierSource +
            ') [' +
            GetPlayerName(pSource) +
            ']',
          pIdentifierSource,
          pMetaLogData
        )
      } else {
        exports['FIXDEV-admin'].sendLog(
          pWebhook,
          '255',
          '[FIXDEV-admin] Spawn Item Log',
          'Item Spawned: ' + pItem + '\nItem Amount: 1\nAdmin: ' + pAdminName,
          'Item Name: ' + pItem + ' | Item Amount: 1',
          ''
        )
        const pPlayerSourceMetadata =
            '{"amount":"' + pAmountOfitem + '","item":"' + pItem + '"}',
          pPlayerSourceIdentifiers = GetPlayerIdentifier(pSource, 0)
        addPlayerLog(
          'Admin',
          null !== pPlayerSourceIdentifiers ? pPlayerSourceIdentifiers : 'None',
          'Spawned item',
          pPlayerSourceChar.id,
          pPlayerSourceMetadata
        )
      }
    })
    onNet('FIXDEV:admin:flingPlayer', async (pTarget) => {
      emitNet('FIXDEV-admin/client/fling-player', pTarget)
    })
    onNet('FIXDEV:admin:sendLog', async (logReasons, bool, pAdmin) => {
      let pAdminName = GetPlayerName(source.toString())
      switch (logReasons) {
        case 'godmode':
          let pWebhook2 =
            'https://discord.com/api/webhooks/993006981822566431/yYMyVFQjqTinUgx4xS7qJXbiM-2inEfM3RC9DYVHaTg6c7qDKiY6MShdWZCZbxShG0jW' // changed
          exports['FIXDEV-admin'].sendLog(
            pWebhook2,
            '255',
            '[FIXDEV-admin] Godmode Log',
            'Godmode Toggled: ' + bool + '\nAdmin: ' + pAdminName,
            '',
            ''
          )
          break
        case 'reviveDistance':
          let pWebhook3 =
            'https://discord.com/api/webhooks/993007072583106611/dJ2eVo3c0DzyLRQhUEyHypnH9B_55UYtWOhYV0fffc3fSasbA8Xw4HP_F-0teGBEErPg' // changed
          exports['FIXDEV-admin'].sendLog(
            pWebhook3,
            '255',
            '[FIXDEV-admin] Revive Distance Log',
            'Revived in Distance\nAdmin: ' + pAdminName,
            '',
            ''
          )
          break
        case 'reviveTarget':
          let pWebhook =
            'https://discord.com/api/webhooks/993007229970169856/PsZrD_Qee44DnkPhvkenOv5udVFSQyowbfhJszX204c8erRQF0oj4HZ59VrnX4vk0489'
          exports['FIXDEV-admin'].sendLog(
            pWebhook,
            '255',
            '[FIXDEV-admin] Revive Target Log',
            'Revived a Target\nAdmin: ' +
              pAdminName +
              '\nTarget: ' +
              GetPlayerName(pAdmin) +
              ' (' +
              GetPlayerIdentifier(pAdmin, 0) +
              ')',
            '',
            ''
          )
      }
    })
  })()
  