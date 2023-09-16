local hasHeadset = false

AddEventHandler('FIXDEV-inventory:itemCheck', function(pItem, pState, pQuantity)
    if pItem ~= "burgershotheadset" then return end
    checkForHeadset()
end)

AddEventHandler('FIXDEV-restaurants:getHeadset', function(pParameters, pEntity, pContext)
    local biz = pContext.zones['restaurant_sign_on'].biz
    if biz ~= 'burger_shot' then return end
    TriggerEvent('player:receiveItem', 'burgershotheadset', 1, false)
end)

function checkForHeadset()
    local hasItem = exports["FIXDEV-inventory"]:hasEnoughOfItem("burgershotheadset", 1, false, true)
    if not hasItem then
        -- Remove from DriveThru Radio
        turnOffHeadset()
        return
    end

    -- Subscribe to DriveThru Radio
    hasHeadset = true
    TriggerEvent("FIXDEV-voice:drivethru:connect", true)
end

function turnOffHeadset()
    hasHeadset = false
    TriggerEvent("FIXDEV-voice:drivethru:disconnect", true)
end

function enterDriveThru()
    if hasHeadset then return end
    TriggerEvent("FIXDEV-voice:drivethru:setPowerState", true)
    TriggerEvent("FIXDEV-voice:drivethru:connect")
end

function exitDriveThru()
    if hasHeadset then return end
    TriggerEvent("FIXDEV-voice:drivethru:disconnect")
end
