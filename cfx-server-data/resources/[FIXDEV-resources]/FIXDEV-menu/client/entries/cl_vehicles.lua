local VehicleEntries = MenuEntries['vehicles']

VehicleEntries[#VehicleEntries+1] = {
  data = {
      id = "impound-vehicle",
      title = "Impound",
      icon = "#vehicle-impound",
      event = "FIXDEV-jobs:police_impound_menu", 
      parameters = {}
  },
  isEnabled = function(pEntity, pContext)
    return not IsDisabled() and IsImpound() and pContext.distance <= 2.5 and not IsPedInAnyVehicle(PlayerPedId(), false)
  end
}

VehicleEntries[#VehicleEntries+1] = {
  data = {
      id = "impound-vehicle",
      title = "Impound Vehicle",
      icon = "#vehicle-impound",
      event = "FIXDEV-jobs_tow_menu", 
      parameters = {}
  },
  isEnabled = function(pEntity, pContext)
    return pContext.distance <= 2.5 and exports['FIXDEV-jobs']:IsAbleImp()
  end
}

VehicleEntries[#VehicleEntries+1] = {
  data = {
      id = "prepare-boat-trailer",
      title = _L("menu-vehicles-prepformount", "Prep for Mount"),
      icon = "#vehicle-plate-remove",
      event = "vehicle:primeTrailerForMounting"
  },
  isEnabled = function(pEntity, pContext)
    local model = GetEntityModel(pEntity)
    return not IsDisabled() and (model == `boattrailer` or model == `trailersmall`)
  end
}
