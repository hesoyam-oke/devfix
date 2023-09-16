RegisterNetEvent("FIXDEV-gov:resetLicensesCache")
AddEventHandler("FIXDEV-gov:resetLicensesCache", function (pCharacterId)
  resetLicensesCache(pCharacterId)
end)

RegisterNetEvent("FIXDEV-gov:changeScreenImage")
AddEventHandler("FIXDEV-gov:changeScreenImage", function (pUrl)
  if #(GetEntityCoords(PlayerPedId()) - vector3(-523.81,-185.37,38.22)) > 50 then return end
  local conf = {
    tex = "projector_screen",
    txd = "np_town_hall_bigscreen",
    dui = nil,
  }
  conf.dui = exports["FIXDEV-lib"]:getDui(pUrl, 512, 512)
  AddReplaceTexture(conf.txd, conf.tex, conf.dui.dictionary, conf.dui.texture)
end)
