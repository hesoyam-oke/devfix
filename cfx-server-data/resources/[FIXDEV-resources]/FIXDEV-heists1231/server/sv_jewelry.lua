local jewelryRob, jewelryLastRob = false, 0

RPC.register("FIXDEV-heists:jewelryCanRob", function(pSource)
    if (os.time() - 1800) > jewelryLastRob then
        for k, v in pairs(Config.Jewelry["jewelrySpot"]) do
            Config.Jewelry["jewelrySpot"][k] = true
        end

        return true
	end

    return false
end)

RPC.register("FIXDEV-heists:jewelryStartRobbery", function(pSource)
    jewelryRob = true
    jewelryLastRob = os.time()

    for k, v in pairs(Config.Jewelry["jewelryDoor"]) do
        TriggerEvent("FIXDEV-doors:change-lock-state", v, false)
    end

    return true
end)

RPC.register("FIXDEV-heists:jewelryCanSmashBox", function(pSource, pID, pState)
	if pState then
		Config.Jewelry["jewelrySpot"][pID] = not Config.Jewelry["jewelrySpot"][pID]
		return true
	else
        local rData = Config.Jewelry["jewelrySpot"][pID]
		return rData
    end    
end)