AddEventHandler("explosionEvent", function(sender, ev)
    TriggerClientEvent('FIXDEV-vaultrob:lower:vaultdoor', sender)
end)