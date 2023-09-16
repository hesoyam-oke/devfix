CreateThread(function()


  SetScenarioTypeEnabled("WORLD_VEHICLE_STREETRACE", false)
  SetScenarioTypeEnabled("WORLD_VEHICLE_SALTON_DIRT_BIKE", false)
  SetScenarioTypeEnabled("WORLD_VEHICLE_SALTON", false)
  SetScenarioTypeEnabled("WORLD_VEHICLE_POLICE_NEXT_TO_CAR", false)
  SetScenarioTypeEnabled("WORLD_VEHICLE_POLICE_CAR", false)
  SetScenarioTypeEnabled("WORLD_VEHICLE_POLICE_BIKE", false)
  SetScenarioTypeEnabled("WORLD_VEHICLE_MILITARY_PLANES_SMALL", false)
  SetScenarioTypeEnabled("WORLD_VEHICLE_MILITARY_PLANES_BIG", false)
  SetScenarioTypeEnabled("WORLD_VEHICLE_MECHANIC", false)
  SetScenarioTypeEnabled("WORLD_VEHICLE_EMPTY", false)
  SetScenarioTypeEnabled("WORLD_VEHICLE_BUSINESSMEN", false)
  SetScenarioTypeEnabled("WORLD_VEHICLE_BIKE_OFF_ROAD_RACE", false)

  -- MRPD
  exports["FIXDEV-polytarget"]:AddBoxZone("officer_sign_in", vector3(441.83, -982.05, 30.69), 0.5, 0.35, {
    heading=12,
    minZ=30.79,
    maxZ=30.84
  })

  -- Popular Street PD
  exports["FIXDEV-polyzone"]:AddCircleZone("officer_sign_in", vector3(827.2, -1290.18, 28.25), 0.5, {
    useZ = true
  })

  -- Sandy PD
  exports["FIXDEV-polytarget"]:AddCircleZone("officer_sign_in", vector3(1833.74, 3678.39, 34.19), 0.5, {
    useZ=true,
  })

  -- Paleto PD
  exports["FIXDEV-polytarget"]:AddBoxZone("officer_sign_in", vector3(-447.36, 6013.06, 32.29), 0.8, 0.8, {
    heading=315,
    minZ=32.24,
    maxZ=32.84
  })

  exports["FIXDEV-polytarget"]:AddBoxZone("officer_sign_in", vector3(381.19, -1595.8, 30.06), 1.8, 0.4, {
    heading=320,
    minZ=29.91,
    maxZ=30.51
  })

  -- VB PD
  exports["FIXDEV-polytarget"]:AddCircleZone("officer_sign_in", vector3(-1083.61, -810.31, 19.3), 0.3, {
    useZ = true
  })

  -- PR PD
  exports["FIXDEV-polytarget"]:AddCircleZone("officer_sign_in", vector3(385.83, 795.02, 187.46), 0.3, {
    useZ = true
  })

  -- Prison
  exports["FIXDEV-polytarget"]:AddCircleZone("officer_sign_in", vector3(1840.39, 2578.45, 46.01), 0.55, {
    useZ = true
  })

  -- EMS Pillbox
  exports["FIXDEV-polytarget"]:AddBoxZone("ems_sign_in", vector3(310.24, -597.54, 43.28), 0.35, 0.25, {
    heading=331,
    minZ=43.28,
    maxZ=43.33
  })

  -- EMS Dorset
  exports["FIXDEV-polyzone"]:AddCircleZone("ems_sign_in", vector3(-497.31, -335.48, 34.51), 1.0, {
    useZ = true
  })

  -- EMS Vespucci
  exports["FIXDEV-polytarget"]:AddBoxZone("ems_sign_in", vector3(-815.28, -1240.17, 7.34), 0.35, 0.25, {
    heading=310,
    minZ=7.34,
    maxZ=7.39
  })

  -- El Burro FD
  exports["FIXDEV-polytarget"]:AddBoxZone("ems_sign_in", vector3(1187.48, -1467.64, 34.86), 0.5, 0.5, {
    heading=0,
    minZ=34.66,
    maxZ=35.06
  })

  -- Parsons
  exports["FIXDEV-polytarget"]:AddBoxZone("ems_sign_in", vector3(-1526.14, 832.63, 181.59), 1.1, 1.3, {
    heading=0,
    minZ=181.19,
    maxZ=181.59
  })


  -- La Mesa PD
  exports["FIXDEV-polytarget"]:AddBoxZone("officer_sign_in", vector3(835.27, -1287.87, 28.24), 1.6, 0.6, {
    heading=0,
    minZ=28.49,
    maxZ=29.69
  })

  
  while not exports['FIXDEV-config']:IsConfigReady() do
    Wait(100)
  end
  local emsEnabled = exports["FIXDEV-config"]:GetMiscConfig("jobs.ems.enabled")
  if emsEnabled then
    -- EMS Volunteer Pillbox
    exports["FIXDEV-polytarget"]:AddBoxZone("ems_volunteer_sign_in", vector3(350.25, -587.67, 28.8), 0.85, 0.8, {
      heading=340,
      minZ=28.4,
      maxZ=28.8
    })

    -- Fire Dept
    exports["FIXDEV-polyzone"]:AddCircleZone("fire_dept_sign_in", vector3(204.23, -1642.16, 29.81), 1.0, {
      useZ = true
    })

    -- Fire Dept
    exports["FIXDEV-polyzone"]:AddCircleZone("fire_dept_sign_in", vector3(1193.58, -1467.42, 34.86), 1.0, {
      useZ = true
    })
  end

  exports["FIXDEV-polytarget"]:AddCircleZone("public_services_sign_in", vector3(-553.09, -192.81, 38.22), 0.3, {
    useZ=true
  })

  exports["FIXDEV-polytarget"]:AddCircleZone("driving_instructor_sign_in", vector3(-36.2, -206.96, 45.79), 0.4, {
    useZ=true
  })

end)

function CreateBlipsFromConfig(blips)
  for _, item in pairs(blips) do
    if not item.enabled then goto continue end

    item.blip = AddBlipForCoord(vector3(item.coords.x, item.coords.y, item.coords.z))
    SetBlipSprite(item.blip, item.sprite)
    SetBlipScale(item.blip, 0.8)
    SetBlipColour(item.blip, 3)
    SetBlipAsShortRange(item.blip, true)
    BeginTextCommandSetBlipName("STRING")
    AddTextComponentString(item.label)
    EndTextCommandSetBlipName(item.blip)

    :: continue ::
  end
end

function findClosestSpawnPoint(pCurrentPosition)
  local closestDistance = -1
  local closestCoord = pCurrentPosition
  for _, location in ipairs(VEHICLE_SPAWN_LOCATIONS) do
    local distance = #(location - pCurrentPosition)
    if closestDistance == -1 or closestDistance > distance then
      closestDistance = distance
      closestCoord = location
    end
  end
  return closestCoord
end
