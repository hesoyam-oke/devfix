
RegisterNetEvent("FIXDEV-jobmanager:playerBecameJob")
AddEventHandler("FIXDEV-jobmanager:playerBecameJob", function(job, name, notify)
    local LocalPlayer = exports["FIXDEV-base"]:getModule("LocalPlayer")
    LocalPlayer:setVar("job", job)
    if notify ~= false then 
        TriggerEvent("DoLongHudText", job ~= "unemployed" and "New Job: " .. tostring(name) or "You're now unemployed", 1) 
    end
    if name == "Entertainer" then
	    TriggerEvent('DoLongHudText',"College DJ and Comedy Club pay per person around you",1)
	end
    if name == "Broadcaster" then
        TriggerEvent('DoLongHudText',"(RadioButton + LeftCtrl for radio toggle)",3)
        TriggerEvent('DoLongHudText',"Broadcast from this room and give out the vibes to los santos on 1982.9",1)
    end  
	if job == "unemployed"  then
		SetPedRelationshipGroupDefaultHash(PlayerPedId(),`PLAYER`)
        SetPoliceIgnorePlayer(PlayerPedId(),false)
        TriggerEvent("ResetRadioChannel");
	end
    
    if job == "trucker" then

    end

    if job == "towtruck" then
        TriggerEvent("DoLongHudText","Use /tow to tow cars to your truck.",1)

    end

    if job == "news"  then
        TriggerEvent('DoLongHudText',"'H' to use item, F1 change item. (/light r g b)",1)
    end

    if job == "driving instructor"  then
        TriggerEvent('DoLongHudText',"'/driving' to use access driving instructor systems",1)
    end
    
    if job == "pdm"  then
        TriggerEvent('DoLongHudText',"Go Sell Some Cars",1)
    end
   -- TriggerServerEvent("FIXDEV-items:updateID",job,exports["isPed"]:retreiveBusinesses())
end)

RegisterNetEvent("FIXDEV-base:characterLoaded")
AddEventHandler("FIXDEV-base:characterLoaded", function(character)
    local LocalPlayer = exports["FIXDEV-base"]:getModule("LocalPlayer")
    LocalPlayer:setVar("job", "unemployed")

end)

RegisterNetEvent("FIXDEV-base:exportsReady")
AddEventHandler("FIXDEV-base:exportsReady", function()
    exports["FIXDEV-base"]:addModule("JobManager", NPX.Jobs)
end)