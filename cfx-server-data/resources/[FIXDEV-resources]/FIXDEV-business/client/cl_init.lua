Citizen.CreateThread(function()
  -- quickfix
  exports["FIXDEV-polyzone"]:AddBoxZone("business_stash", vector3(952.2, -115.63, 75.0), 1.8, 2.4, {
    heading = 314,
    minZ = 74.0,
    maxZ = 76.4,
    data = {
      id = "quickfix",
    },
  })
  exports["FIXDEV-polyzone"]:AddBoxZone("business_craft", vector3(963.63, -103.55, 74.36), 1.8, 2.4, {
    heading = 44,
    minZ = 73.36,
    maxZ = 75.76,
    data = {
      id = "quickfix",
    },
  })
  -- tunershop
  exports["FIXDEV-polyzone"]:AddBoxZone("business_stash", vector3(145.67, -3007.76, 7.04), 2.4, 4, {
    heading = 87,
    minZ=4.44,
    maxZ=8.44,
    data = {
      id = "tuner_shop",
    },
  })
  exports["FIXDEV-polyzone"]:AddBoxZone("business_craft", vector3(130.06, -3013.42, 10.7), 2.6, 1.4, {
    heading = 266,
    minZ=8.5,
    maxZ=12.5,
    data = {
      id = "tuner_shop",
    },
  })
  -- haromy
  exports["FIXDEV-polyzone"]:AddBoxZone("business_stash", vector3(1189.45, 2636.6, 38.4), 2.4, 2.4, {
    heading = 89,
    minZ = 37.4,
    maxZ = 39.8,
    data = {
      id = "harmony_repairs",
    },
  })
  exports["FIXDEV-polyzone"]:AddBoxZone("business_craft", vector3(1172.67, 2635.41, 37.79), 2.6, 2.4, {
    heading = 91,
    minZ = 36.79,
    maxZ = 39.19,
    data = {
      id = "harmony_repairs",
    },
  })
end)
