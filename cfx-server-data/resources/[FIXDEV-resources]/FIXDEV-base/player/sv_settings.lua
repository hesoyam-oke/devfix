RegisterServerEvent("FIXDEV-base:sv:player_settings_set")
AddEventHandler("FIXDEV-base:sv:player_settings_set", function(settingsTable)
    local src = source
    NPX.DB:UpdateSettings(src, settingsTable, function(UpdateSettings, err)
            if UpdateSettings then
                -- we are good here.
            end
    end)
end)

RegisterServerEvent("FIXDEV-base:sv:player_settings")
AddEventHandler("FIXDEV-base:sv:player_settings", function()
    local src = source
    NPX.DB:GetSettings(src, function(loadedSettings, err)
        if loadedSettings ~= nil then 
            TriggerClientEvent("FIXDEV-base:cl:player_settings", src, loadedSettings) 
        else 
            TriggerClientEvent("FIXDEV-base:cl:player_settings",src, nil) 
        end
    end)
end)
