RegisterServerEvent('admin:revivePlayer')
AddEventHandler('admin:revivePlayer', function(target)
	if target ~= nil then
		TriggerClientEvent('admin:revivePlayerClient', target)
		TriggerClientEvent('FIXDEV-hospital:client:RemoveBleed', target) 
        TriggerClientEvent('FIXDEV-hospital:client:ResetLimbs', target)
	end
end)

RegisterServerEvent('FIXDEV-ems:heal')
AddEventHandler('FIXDEV-ems:heal', function(target)
	TriggerClientEvent('FIXDEV-ems:heal', target) 	
end)

RegisterServerEvent('FIXDEV-ems:heal2')
AddEventHandler('FIXDEV-ems:heal2', function(target)
	TriggerClientEvent('FIXDEV-ems:big', target)
end)