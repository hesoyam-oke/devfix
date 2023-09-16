function getJsonDataFromAdminBans()
    local imDoneNow = RPC.execute("FIXDEV-adminUI:getRecentBans")
    return imDoneNow
  end
  
  exports('getJsonDataFromAdminBans',getJsonDataFromAdminBans)
  