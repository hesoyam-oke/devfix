
function NPX.Core.ConsoleLog(self, msg, mod, ply)
	if not tostring(msg) then return end
	if not tostring(mod) then mod = "No Module" end

	local pMsg = string.format("^3[NPX LOG - %s]^7 %s", mod, msg)
	if not pMsg then return end
	
	print(pMsg)

	if ply and tonumber(ply) then
		TriggerClientEvent("FIXDEV-base:consoleLog", ply, msg, mod)
	end
end

AddEventHandler("onResourceStart", function(resource)
	TriggerClientEvent("FIXDEV-base:waitForExports", -1)

	if not NPX.Core.ExportsReady then return end

	Citizen.CreateThread(function()
		while true do 
			Citizen.Wait(0)
			if NPX.Core.ExportsReady then
				TriggerEvent("FIXDEV-base:exportsReady")
				return
			else
			end
		end
	end)
end)

RegisterNetEvent("FIXDEV-base:playerSessionStarted")
AddEventHandler("FIXDEV-base:playerSessionStarted", function()

	local src = source
	local name = GetPlayerName(src)
	local user = NPX.Player:GetUser(src)
	-- local hexId = NPX.Util.GetHexId(src)
	-- local steamId = NPX.Util:HexIdToSteamId(hexId) 
	if user then 
		print("^0" .. name .. "^7 spawned into the server")
	end
end)

AddEventHandler("FIXDEV-base:characterLoaded", function(user, char)
	local src = source
	local hexId = user:getVar("hexid")

	if char.phone_number == 0 then
		NPX.Core:CreatePhoneNumber(source, function(phonenumber, err)	
			local q = [[UPDATE characters SET phone_number = @phone WHERE owner = @owner and id = @cid]]
			local v = {
				["phone"] = phoneNumber,
				["owner"] = hexId,
				["cid"] = char.id
			}

			exports.oxmysql.execute(q, v, function()
				char.phone_number = math.floor(char.phone_number)
				user:setCharacter(char)
			end)
		end)
	end
end)
-- sway, jamerson, hawkeye was here 29.11.2020
-- and nikez too


-- Paycheck shit
-- Citizen.CreateThread(function()
-- 	while true do
-- 		Citizen.Wait((60 * 1000) * 45) -- 45 mins
-- 		TriggerClientEvent('paycheck:client:call', -1)
-- 		print("^1[FIXDEV-base] Paychecks Sent^0")
-- 	end
-- end)

-- RegisterServerEvent('paycheck:server:send')
-- AddEventHandler('paycheck:server:send', function(cid)
-- 	local src = source
-- 	local user = exports["FIXDEV-base"]:getModule("Player"):GetUser(src)
-- 	local job = user:getVar("job")
-- 	if user ~= false then
-- 		if job == "unemployed" or job == "drift_school" then -- Bum Jobs 
-- 			TriggerEvent("paycheck:server:add", src, cid, 25)
-- 		elseif job == "police" or job == "ems" then -- All Emergency Jobs
-- 			TriggerEvent("paycheck:server:add", src, cid, 100)
-- 		elseif job == "best_buds" or job == "burger_shot" or job == "bean_machine" or job == "vanilla_unicorn" then -- Civ Jobs
-- 			TriggerEvent("paycheck:server:add", src, cid, 50)
-- 		elseif job == "auto_bodies" or job == "tuner_shop" or job == "paleto_mech" or job == "auto_exotics" then -- Mechanic Shops
-- 			TriggerEvent("paycheck:server:add", src, cid, 50)
-- 		elseif job == "car_shop" then -- Car Dealer Shops
-- 			TriggerEvent("paycheck:server:add", src, cid, 50)
-- 		end
-- 	end
-- end)

-- RegisterServerEvent('paycheck:server:add')
-- AddEventHandler('paycheck:server:add', function(srcID, cid, amount)
-- 	exports.oxmysql:execute('SELECT `paycheck` FROM characters WHERE `id`= ?', {cid}, function(data)
-- 		local newAmount = data[1].paycheck + tonumber(amount)
-- 		exports.oxmysql:execute("UPDATE characters SET `paycheck` = ? WHERE `id` = ?", {newAmount, cid})
-- 		Citizen.Wait(500)
-- 		TriggerClientEvent('DoLongHudText', srcID, 'A payslip of $'.. tonumber(amount) ..' making a total of $' ..newAmount ..' with $0 tax withheld on your last payment.', 1)
-- 	end)
-- end)

-- RegisterServerEvent("paycheck:collect")
-- AddEventHandler("paycheck:collect", function(cid)
-- 	local src = source
-- 	local user = exports["FIXDEV-base"]:getModule("Player"):GetUser(src)
-- 	exports.oxmysql:execute('SELECT `paycheck` FROM characters WHERE `id`= ?', {cid}, function(data)
-- 		local amount = tonumber(data[1].paycheck)
-- 		if amount >= 1 then
-- 			exports.oxmysql:execute("UPDATE characters SET `paycheck` = ? WHERE `id` = ?", {"0", cid})
-- 			user:addBank(amount)
-- 		else
-- 			TriggerClientEvent("DoLongHudText", src, "Your broke, go work!")
-- 		end
-- 	end)
-- end)