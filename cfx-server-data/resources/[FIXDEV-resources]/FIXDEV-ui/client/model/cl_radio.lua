RegisterNUICallback("FIXDEV-ui:hudUpdateRadioSettings", function(data, cb)
    exports["FIXDEV-base"]:getModule("SettingsData"):setSettingsTableGlobal({ ["tokovoip"] = data.settings }, true)
    cb({ data = {}, meta = { ok = true, message = 'done' } })
end)

RegisterNUICallback("FIXDEV-ui:hudUpdateKeybindSettings", function(data, cb)
    exports["FIXDEV-base"]:getModule("DataControls"):encodeSetBindTable(data.controls)
    cb({ data = {}, meta = { ok = true, message = 'done' } })
end)