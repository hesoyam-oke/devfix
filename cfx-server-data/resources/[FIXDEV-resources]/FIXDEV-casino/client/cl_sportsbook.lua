RegisterUICallback("FIXDEV-ui:casino:updateEvent", function(data, cb)
  data.type = "edit-event"
  local success, result = RPC.execute("FIXDEV-casino:sportsbook:updateData", data)
  cb({ data = result, meta = { ok = success, message = result }})
end)

RegisterUICallback("FIXDEV-ui:casino:sportsBookPlaceBet", function(data, cb)
  data.type = "place-bet"
  local success, result = RPC.execute("FIXDEV-casino:sportsbook:updateData", data)
  cb({ data = result, meta = { ok = success, message = result }})
end)

RegisterUICallback("FIXDEV-ui:casinoGetSportsBookData", function(data, cb)
  local success, result = RPC.execute("FIXDEV-casino:sportsbook:getData")
  cb({ data = result, meta = { ok = success, message = result }})
end)

RegisterUICallback("FIXDEV-ui:casino:finishEvent", function(data, cb)
  local success, result = RPC.execute("FIXDEV-casino:sportsbook:finishEvent", data)
  cb({ data = result, meta = { ok = success, message = result }})
end)
