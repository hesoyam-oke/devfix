RadioChannels, IsRadioOn, IsTalkingOnRadio, RadioVolume, CurrentChannel = {}, false, false, Config.settings.radioVolume

function SetRadioFrequency(pFrequency, pSendAppEvent)
    if CanUseFrequency(pFrequency, true) then
        if IsTalkingOnRadio then
            Citizen.Await(StopTransmission(true))
        end

        local success = RPC.execute("FIXDEV-voice:addPlayerToRadio", pFrequency)

        if not success then
            TriggerEvent('DoLongHudText', 'Radio frequency is currently encrypted.', 2)
            return false
        end

        exports["FIXDEV-ui"]:sendAppEvent("hud", {
            displayRadioChannel = true,
        })
        Citizen.SetTimeout(5000, function()
            exports["FIXDEV-ui"]:sendAppEvent("hud", {
                displayRadioChannel = false,
            })
        end)
        exports["FIXDEV-ui"]:sendAppEvent("game", { radioChannel = tostring(pFrequency) })
        if pSendAppEvent then
            exports["FIXDEV-ui"]:sendAppEvent("radio", { value = pFrequency })
        end

        Debug("[Radio] Connected | Radio ID: %s", pFrequency)
        return true
    end

    return false
end

function CycleRadioChannels()
  if not IsRadioOn then return end

  local firstEntry, lastEntry, nextChannel

  if IsTalkingOnRadio then
      Citizen.Await(StopTransmission(true))
  end

  for radioID, _ in pairs(RadioChannels) do
      if firstEntry == nil then
          firstEntry = radioID
      end

      if CurrentChannel == nil then
          nextChannel = radioID
          break
      elseif lastEntry == CurrentChannel.id then
          nextChannel = radioID
          break
      end

      lastEntry = radioID
  end

  local radioID = _C(nextChannel ~= nil, nextChannel, firstEntry)

  if radioID then
      SetRadioChannel(radioID)
  else
      CurrentChannel = nil
  end
end

local function ConnectToRadio (radioID, subscribers)
    if RadioChannels[radioID] then return end

    local channel = RadioChannel:new(radioID)

    for _, subscriber in ipairs(subscribers) do
        channel:addSubscriber(subscriber)
    end

    RadioChannels[radioID] = channel

    SetRadioChannel(radioID)

    Debug("[Radio] Connected | Radio ID: %s", radioID)
end

local function DisconnectFromRadio (radioID)
    if not RadioChannels[radioID] then return end

    RadioChannels[radioID] = nil

    if CurrentChannel.id == radioID then
        CycleRadioChannels()
    end

    Debug("[Radio] Disconnected | ID %s", radioID)
end

local function AddRadioSubscriber (radioID, serverID)
    if not RadioChannels[radioID] then return end

    local channel = RadioChannels[radioID]

    if not channel:subscriberExists(serverID) then
        channel:addSubscriber(serverID)

        if IsTalkingOnRadio and CurrentChannel.id == radioID then
            AddPlayerToTargetList(serverID, "radio", true)
        end

        Debug("[Radio] Subscriber Added | Radio ID: %s | Player: %s ", radioID, serverID)
    end
end

local function RemoveRadioSubscriber (radioID, serverID)
    if not RadioChannels[radioID] then return end

    local channel = RadioChannels[radioID]

    if channel:subscriberExists(serverID) then
        channel:removeSubscriber(serverID)

        if IsTalkingOnRadio and CurrentChannel.id == radioID then
            RemovePlayerFromTargetList(serverID, "radio", true, true)
        end

        Debug("[Radio] Subscriber Removed | Radio ID: %s | Player: %s ", radioID, serverID)
    end
end

function SetRadioChannel(radioID)
    CurrentChannel = RadioChannels[radioID]
    exports["FIXDEV-ui"]:sendAppEvent("game", { radioChannel = tostring(radioID) })

    Debug("[Radio] Channel Changed | Radio ID: %s", radioID)
end

function StartTransmission()
    if not IsRadioOn or not CurrentChannel or Throttled("radio:transmit") or isDead or IsTransmissionDisabled("radio") then return end
    local isCuffed = exports["isPed"]:isPed("handcuffed") or exports["isPed"]:isPed("beingcuffed")
    if isCuffed then return end

    if not IsTalkingOnRadio then
        IsTalkingOnRadio = true

        local currentCam = GetCamActiveViewModeContext()
        local isInVehicle = currentCam == 1 or currentCam == 2

        AddGroupToTargetList(CurrentChannel.subscribers, "radio", isInVehicle)

        StartRadioTask(isInVehicle)

        PlayLocalRadioClick(true)

        TriggerEvent("FIXDEV:voice:transmissionStarted", { radio = true })

        Debug("[Radio] Transmission | Sending: %s | Radio ID: %s", IsTalkingOnRadio, CurrentChannel.id)
    end

    if RadioTimeout then
        RadioTimeout:resolve(false)
    end
end

function StopTransmission(forced)
    if not IsTalkingOnRadio or RadioTimeout then return end

    RadioTimeout = TimeOut(300):next(function (continue)
        RadioTimeout = nil

        if forced ~= true and not continue then return end

        IsTalkingOnRadio = false

        RemoveGroupFromTargetList(CurrentChannel.subscribers, "radio", true)

        PlayLocalRadioClick(false)

        Throttled("radio:transmit", 300)

        Debug("[Radio] Transmission | Sending: %s | Radio ID: %s", IsTalkingOnRadio, CurrentChannel.id)
    end)

    return RadioTimeout
end

function IncreaseRadioVolume()
  local currentVolume = RadioVolume * 10
  SetRadioVolume(currentVolume + 1)
end

function DecreaseRadioVolume()
  local currentVolume = RadioVolume * 10
  SetRadioVolume(currentVolume - 1)
end

function SetRadioVolume(volume, pDisableNotification)
    if volume <= 0 then return end

    RadioVolume = _C(volume > 10, 1.0, volume * 0.1)

    if almostEqual(0.0, volume, 0.01) then RadioVolume = 0.0 end

    if IsRadioOn then
      UpdateContextVolume("radio", RadioVolume)
    end

    if not pDisableNotification then
      TriggerEvent("DoLongHudText", ("New volume %s"):format(RadioVolume), 1, 12000, { i18n = { "New volume" } })
    end

    Debug("[Radio] Volume Changed | Current: %s", RadioVolume)
end

function SetRadioPowerState(state)
    if Throttled("radio:transmit") then return end
    IsRadioOn = state

    local volume = _C(IsRadioOn, RadioVolume, -1.0)

    UpdateContextVolume("radio", volume)

    if not IsRadioOn and IsTalkingOnRadio then
        StopTransmission(true)
    end

    UpdateRadioPowerState(IsRadioOn)

    Throttled("radio:powerState", 500)

    Debug("[Radio] Power State | Powered On: %s", IsRadioOn)
end

function StartRadioTask(pIsInVehicle)
    Citizen.CreateThread(function()
        local lib = "random@arrests"
        local anim = "generic_radio_chatter"
        local playerPed = PlayerPedId()

        LoadAnimDict("random@arrests")

        local isInVehicleAndFirstPersonDriver = pIsInVehicle and GetCamViewModeForContext(isInVehicle) == 4 and GetPedInVehicleSeat(GetVehiclePedIsIn(PlayerPedId()), -1) == PlayerPedId()

        -- Don't play radio anim if driving in first person
        while IsTalkingOnRadio do
            if not isInVehicleAndFirstPersonDriver and not IsEntityPlayingAnim(playerPed, lib, anim, 3) then
                TaskPlayAnim(playerPed, lib, anim, 8.0, 0.0, -1, 49, 0, false, false, false)
            end

            SetControlNormal(0, 249, 1.0)

            Citizen.Wait(0)
        end

        StopAnimTask(playerPed, lib, anim, 3.0)
    end)
end

function increaseRadioChannel()
    if not IsRadioOn then return end
    local newChannel = CurrentChannel.id + 1
    if newChannel > 999 then
        newChannel = 999
    end
    SetRadioFrequency(newChannel, true)
    TriggerEvent("DoLongHudText", ("New channel %s"):format(newChannel), 1, 12000, { i18n = { "New channel" }})
end
function decreaseRadioChannel()
    if not IsRadioOn then return end
    local newChannel = CurrentChannel.id - 1
    if newChannel >= 1 then
        SetRadioFrequency(newChannel, true)
        TriggerEvent("DoLongHudText", ("New channel %s"):format(newChannel), 1, 12000, { i18n = { "New channel" }})
    end
end

function HasRangeFilterDisabled(pRadioChannel)
    local frequency = pRadioChannel and pRadioChannel.id

    if not frequency then return false end

    local config = Config.frequencyConfig[frequency]

    if not config then return false end

    return config.bypassRangeFilter == true
end

function LoadRadioModule()
    RegisterModuleContext("radio", 2)
    UpdateContextVolume("radio", -1.0)

    exports["FIXDEV-keybinds"]:registerKeyMapping("", "Radio", "Push-To-Talk", "+transmitToRadio", "-transmitToRadio", "CAPITAL")
    RegisterCommand('+transmitToRadio', StartTransmission, false)
    RegisterCommand('-transmitToRadio', StopTransmission, false)

    exports["FIXDEV-keybinds"]:registerKeyMapping("", "Radio", "Push-To-Talk (Secondary)", "+secondaryTransmitToRadio", "-secondaryTransmitToRadio")
    RegisterCommand('+secondaryTransmitToRadio', StartTransmission, false)
    RegisterCommand('-secondaryTransmitToRadio', StopTransmission, false)

    exports["FIXDEV-keybinds"]:registerKeyMapping("", "Radio", "Volume Up", "+increaseRadioVolume", "-increaseRadioVolume")
    RegisterCommand('+increaseRadioVolume', IncreaseRadioVolume, false)
    RegisterCommand('-increaseRadioVolume', function() end, false)

    exports["FIXDEV-keybinds"]:registerKeyMapping("", "Radio", "Volume Down", "+decreaseRadioVolume", "-decreaseRadioVolume")
    RegisterCommand('+decreaseRadioVolume', DecreaseRadioVolume, false)
    RegisterCommand('-decreaseRadioVolume', function() end, false)

    exports["FIXDEV-keybinds"]:registerKeyMapping("", "Radio", "On / Off", "+toggleRadioState", "-toggleRadioState")
    RegisterCommand('+toggleRadioState', function() SetRadioPowerState(not IsRadioOn) end, false)
    RegisterCommand('-toggleRadioState', function() end, false)

    exports["FIXDEV-keybinds"]:registerKeyMapping("", "Radio", "Channel Up", "+increaseRadioChannel", "-increaseRadioChannel")
    RegisterCommand('+increaseRadioChannel', increaseRadioChannel, false)
    RegisterCommand('-increaseRadioChannel', function() end, false)

    exports["FIXDEV-keybinds"]:registerKeyMapping("", "Radio", "Channel Down", "+decreaseRadioChannel", "-decreaseRadioChannel")
    RegisterCommand('+decreaseRadioChannel', decreaseRadioChannel, false)
    RegisterCommand('-decreaseRadioChannel', function() end, false)

    RegisterNetEvent("FIXDEV:voice:radio:connect")
    AddEventHandler("FIXDEV:voice:radio:connect", ConnectToRadio)

    RegisterNetEvent("FIXDEV:voice:radio:disconnect")
    AddEventHandler("FIXDEV:voice:radio:disconnect", DisconnectFromRadio)

    RegisterNetEvent("FIXDEV:voice:radio:added")
    AddEventHandler("FIXDEV:voice:radio:added", AddRadioSubscriber)

    RegisterNetEvent("FIXDEV:voice:radio:removed")
    AddEventHandler("FIXDEV:voice:radio:removed", RemoveRadioSubscriber)

    RegisterNetEvent("FIXDEV:voice:radio:power")
    AddEventHandler("FIXDEV:voice:radio:power", SetRadioPowerState)

    RegisterNetEvent("FIXDEV:voice:radio:volume")
    AddEventHandler("FIXDEV:voice:radio:volume", SetRadioVolume)

    exports("SetRadioPowerState", SetRadioPowerState)
    exports("SetRadioVolume", SetRadioVolume)
    exports("SetRadioFrequency", SetRadioFrequency)
    exports("IncreaseRadioVolume", IncreaseRadioVolume)
    exports("DecreaseRadioVolume", DecreaseRadioVolume)

    if Config.enableSubmixes and Config.enableFilters.radio then
      for submixName, submix in pairs(Config.radioVoiceRanges) do
        RegisterContextSubmix(submixName)
        SetFilterParameters(submixName, submix.filters)
      end
    end

    TriggerEvent("FIXDEV:voice:radio:ready")

    Debug("[Radio] Module Loaded")
end
