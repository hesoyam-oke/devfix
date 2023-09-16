Config = {}

Config.BayCity = {
	canGrabCash = true,
	canGrabGold = true,
}

Config.BobCat = {
	securityDoor = {276, 277},
	securityNPC = {
		{ x = 889.2, y = -2277.64, z = 32.45, h = 46.95}, 
		{ x = 887.28, y = -2275.18, z = 32.45, h = 114.97},
		{ x = 894.04, y = -2275.5, z = 32.45, h = 95.46}, 
		{ x = 891.42, y = -2286.67, z = 32.45, h = 304.73},
		{ x = 896.1, y = -2284.8, z = 32.45, h = 23.59}, 
		{ x = 893.78, y = -2289.89, z = 32.45, h = 353.01}, 
		{ x = 872.44, y = -2295.16, z = 32.45, h = 278.5}, 
		{ x = 878.77, y = -2295.16, z = 32.45, h = 85.02}, 
		{ x = 877.34, y = -2291.61, z = 32.45, h = 257.76},
	},
	hostageNPC = { x = 870.23, y = -2287.63, z = 32.45, h = 176.14},
	iplState = {
		["np_prolog_clean"] = true,
		["np_prolog_broken"] = false
	},
}

Config.CityPower = {
	cityPowerState = true,
	cityPowerExplosion = {
		vector3(711.73, 164.81, 80.76),
		vector3(695.56, 157.21, 80.95),
		vector3(671.91, 148.71, 80.93),
		vector3(662.35, 125.02, 80.93),
		vector3(680.22, 115.83, 80.94),
		vector3(700.95, 101.55, 80.93),
		vector3(706.74, 116.84, 80.96),
	}
}

Config.Fleeca = {
    ["F1"] = {
		vaultName = "F1",
		panelCoords = vector3(311.05, -284.00, 53.16),
		panelHeading = 248.60,
		cashCoords = vector3(314.17, -289.28, 53.14),
		cashHeading = 20.5,
		goldCoords = vector3(0, 0, 0),
		goldHeading = 0,
		canGrabCash = true,
		canGrabGold = true,
	},

	["F2"] = {
		vaultName = "F2",
		panelCoords = vector3(146.75, -1045.60, 28.37),
		panelHeading = 244.20,
		cashCoords = vector3(149.01, -1050.30, 28.35),
		cashHeading = 69.5,
		goldCoords = vector3(0, 0, 0),
		goldHeading = 0,
		canGrabCash = true,
		canGrabGold = true,
	},

	["F3"] = {
		vaultName = "F3",
		panelCoords = vector3(-1211.25, -336.37, 36.78),
		panelHeading = 296.76,
		cashCoords = vector3(-1208.18, -339.22, 36.76),
		cashHeading = 338.5,
		goldCoords = vector3(0, 0, 0),
		goldHeading = 0,
		canGrabCash = true,
		canGrabGold = true,
	},

	["F4"] = {
		vaultName = "F4",
		panelCoords = vector3(-2956.68, 481.34, 14.70),
		panelHeading = 353.97,
		cashCoords = vector3(-2955.15, 482.89, 15.68),
		cashHeading = 357.5,
		goldCoords = vector3(0, 0, 0),
		goldHeading = 0,
		canGrabCash = true,
		canGrabGold = true,
	},

	["F5"] = {
		vaultName = "F5",
		panelCoords = vector3(-354.15, -55.11, 48.04),
		panelHeading = 251.05,
		cashCoords = vector3(-352.37, -59.48, 48.02),
		cashHeading = 277.5,
		goldCoords = vector3(0, 0, 0),
		goldHeading = 0,
		canGrabCash = true,
		canGrabGold = true,
	},

	["F6"] = {
		vaultName = "F6",
		panelCoords = vector3(1176.40, 2712.75, 37.09),
		panelHeading = 84.83,
		cashCoords = vector3(1174.53, 2715.33, 38.07),
		cashHeading = 178.5,
		goldCoords = vector3(0, 0, 0),
		goldHeading = 0,
		canGrabCash = true,
		canGrabGold = true,
	},
}

Config.Jewelry = {
	jewelryDoor = {111, 112},
	jewelrySpot = {
		[1] = true,
		[2] = true,
		[3] = true,
		[4] = true,
		[5] = true,
		[6] = true,
		[7] = true,
		[8] = true,
		[9] = true,
		[10] = true,
		[11] = true,
		[12] = true,
		[13] = true,
	}
}

Config.Paleto = {
	canGrabCash = true,
	canGrabGold = true,
}

Config.Stores = {
	safeSpot = {
		[1] = true,
		[2] = true,
		[3] = true,
		[4] = true,
		[5] = true,
		[6] = true,
		[7] = true,
		[8] = true,
		[9] = true,
		[10] = true,
		[11] = true,
		[12] = true,
		[13] = true,
		[14] = true,
		[15] = true,
		[16] = true,
		[17] = true,
		[18] = true,
		[19] = true,
		[20] = true,
		[21] = true,
	}
}

Config.Trolley = {
	["mazebank_cash_1"] = {
		cashCoords = vector3(-1309.74, -813.91, 16.14),
		cashHeading = 306.5,
		cashEvent = "heists:mazeBankTrolleyGrab",
	},
	
	["F1"] = {
		cashCoords = vector3(314.17, -289.28, 53.14),
		cashHeading = 20.5,
		goldCoords = vector3(0, 0, 0),
		goldHeading = 0,
		cashEvent = "heists:fleecaTrolleyGrab",
	},

	["F2"] = {
		cashCoords = vector3(149.01, -1050.30, 28.35),
		cashHeading = 69.5,
		goldCoords = vector3(0, 0, 0),
		goldHeading = 0,
		cashEvent = "heists:fleecaTrolleyGrab",
	},

	["F3"] = {
		cashCoords = vector3(-1208.18, -339.22, 36.76),
		cashHeading = 338.5,
		goldCoords = vector3(0, 0, 0),
		goldHeading = 0,
		cashEvent = "heists:fleecaTrolleyGrab",
	},

	["F4"] = {
		cashCoords = vector3(-2955.15, 482.89, 15.68),
		cashHeading = 357.5,
		goldCoords = vector3(0, 0, 0),
		goldHeading = 0,
		cashEvent = "heists:fleecaTrolleyGrab",
	},

	["F5"] = {
		cashCoords = vector3(-352.37, -59.48, 48.02),
		cashHeading = 277.5,
		goldCoords = vector3(0, 0, 0),
		goldHeading = 0,
		cashEvent = "heists:fleecaTrolleyGrab",
	},

	["F6"] = {
		cashCoords = vector3(1174.53, 2715.33, 38.07),
		cashHeading = 178.5,
		goldCoords = vector3(0, 0, 0),
		goldHeading = 0,
		cashEvent = "heists:fleecaTrolleyGrab",
	},

	["paleto"] = {
		cashCoords = vector3(-102.97, 6477.40, 31.65),
		cashHeading = 181.5,
		goldCoords = vector3(0, 0, 0),
		goldHeading = 0,
		cashEvent = "heists:paletoTrolleyGrab",
	},

	["vault_upper_cash_1"] = {
		cashCoords = vector3(259.70, 214.45, 101.69),
		cashHeading = 44.5,
		goldCoords = vector3(265.51, 214.08, 101.69),
		goldHeading = 160.0,
		cashEvent = "heists:vaultUpperTrolleyGrab",
	},

	["vault_upper_cash_2"] = {
		cashCoords = vector3(263.00, 213.04, 101.69),
		cashHeading = 39.5,
		goldCoords = vector3(263.81, 215.94, 101.69),
		goldHeading = 107.5,
		cashEvent = "heists:vaultUpperTrolleyGrab",
	},

	["vault_lower_cash_1"] = {
		cashCoords = vector3(0, 0, 0),
		cashHeading = 0,
		goldCoords = vector3(0, 0, 0),
		goldHeading = 0,
		cashEvent = "heists:vaultLowerTrolleyGrab",
	},

	["vault_lower_cash_2"] = {
		cashCoords = vector3(0, 0, 0),
		cashHeading = 0,
		goldCoords = vector3(0, 0, 0),
		goldHeading = 0,
		cashEvent = "heists:vaultLowerTrolleyGrab",
	},

	["vault_lower_cash_3"] = {
		cashCoords = vector3(0, 0, 0),
		cashHeading = 0,
		goldCoords = vector3(0, 0, 0),
		goldHeading = 0,
		cashEvent = "heists:vaultLowerTrolleyGrab",
	},

	["vault_lower_cash_4"] = {
		cashCoords = vector3(0, 0, 0),
		cashHeading = 0,
		goldCoords = vector3(0, 0, 0),
		goldHeading = 0,
		cashEvent = "heists:vaultLowerTrolleyGrab",
	},

	["vault_lower_cash_5"] = {
		cashCoords = vector3(0, 0, 0),
		cashHeading = 0,
		goldCoords = vector3(0, 0, 0),
		goldHeading = 0,
		cashEvent = "heists:vaultLowerTrolleyGrab",
	},

	["vault_lower_cash_6"] = {
		cashCoords = vector3(0, 0, 0),
		cashHeading = 0,
		goldCoords = vector3(0, 0, 0),
		goldHeading = 0,
		cashEvent = "heists:vaultLowerTrolleyGrab",
	},

	["vault_lower_cash_7"] = {
		cashCoords = vector3(0, 0, 0),
		cashHeading = 0,
		goldCoords = vector3(0, 0, 0),
		goldHeading = 0,
		cashEvent = "heists:vaultLowerTrolleyGrab",
	},
}

Config.VaultDoor = {
    ["F1"] = {
		open = false,
		coords = vector3(310.93, -284.44, 54.16),
		hash = 2121050683,
		headingOpen = 160.91,
		headingClosed = -110.00,
	},

	["F2"] = {
		open = false,
		coords = vector3(146.61, -1046.02, 29.37),
		hash = 2121050683,
		headingOpen = 158.54,
		headingClosed = 250.20,
	},

	["F3"] = {
		open = false,
		coords = vector3(-1211.07, -336.68, 37.78),
		hash = 2121050683,
		headingOpen = 213.67,
		headingClosed = 296.76,
	},

	["F4"] = {
		open = false,
		coords = vector3(-2956.68, 481.34, 15.70),
		hash = 2121050683,
		headingOpen = 267.73,
		headingClosed = 353.97,
	},

	["F5"] = {
		open = false,
		coords = vector3(-354.15, -55.11, 49.04),
		hash = 2121050683,
		headingOpen = 159.79,
		headingClosed = 251.05,
	},

	["F6"] = {
		open = false,
		coords = vector3(1176.40, 2712.75, 38.09),
		hash = 2121050683,
		headingOpen = 359.05,
		headingClosed = 90.83,
	},

	["paleto"] = {
		open = false,
		coords = vector3(-104.6049, 6473.44, 31.79532),
		hash = -1185205679,
		headingOpen = 150.00,
		headingClosed = 45.00,
	},

	["vault_door"] = {
		open = false,
		coords = vector3(253.92, 224.56, 101.88),
		hash = 961976194,
		headingOpen = 20.00,
		headingClosed = 160.00,
	}
}

Config.VaultUpperDoor = {
	-- Vault --
	vault_upper_first_door = { 46 },
	vault_upper_inner_door_1 = { 49 },
	vault_upper_inner_door_2 = { 50 },
    -- Bobcat --
	bobcat_security_entry = { 273, 274 },
	bobcat_security_inner_1 = { 275 },
    -- Fleeca --
	fleeca_legion_inner_door = { 89 },
	fleeca_pinkcage_inner_door = { 512 },
	fleeca_harwick_inner_door = { 513 },
	fleeca_lifeinvader_inner_door = { 514 },
	fleeca_greatocean_inner_door = { 515 },
	fleeca_harmony_inner_door = { 516 },
	-- Paleto --
	paleto_inner_door = { 45 },
}

Config.LowerVaultHeist = {
	lasersActive = true,
	cityPowerState = true,
	lowerDoorOpen = false,
	doorState = {
		["np_vault_broken"] = false,
        ["np_vault_clean"] = true,
	},
	upperVaultEntityState = {
		["hei_hw1_02_interior_2_heist_ornate_bank_milo_"] = false,
		["np_int_placement_ch_interior_6_dlc_casino_vault_milo_"] = true
	},
	doorConfig = { 278, 279 },
	trolleyConfig = {
		["vault_lower_cash_1"] = {
			canGrabCash = true,
			canGrabGold = true
		},
		
		["vault_lower_cash_2"] = {
			canGrabCash = true,
			canGrabGold = true
		},

		["vault_lower_cash_3"] = {
			canGrabCash = true,
			canGrabGold = true
		},

		["vault_lower_cash_4"] = {
			canGrabCash = true,
			canGrabGold = true
		},

		["vault_lower_cash_5"] = {
			canGrabCash = true,
			canGrabGold = true
		},

		["vault_lower_cash_6"] = {
			canGrabCash = true,
			canGrabGold = true
		},

		["vault_lower_cash_7"] = {
			canGrabCash = true,
			canGrabGold = true
		}
	}
}

Config.UpperVaultHeist = {
	chancePanel = 0.5,
	chanceGoldSpawn = 0.8,
	doorConfig = {
		["first_door"] = {
			doorId = 48,
			locked = true,
		},

		["vault_door"] = {
			doorId = nil,
			locked = true,
		},

		["vault_upper_first_door"] = {
			doorId = 46,
			locked = true,
		},

		["vault_upper_inner_door_1"] = {
			doorId = 49,
			locked = true,
		},

		["vault_upper_inner_door_2"] = {
			doorId = 50,
			locked = true,
		},
	},
	trolleyConfig = {
		["vault_upper_cash_1"] = {
			canGrabCash = true,
			canGrabGold = true
		},
		
		["vault_upper_cash_2"] = {
			canGrabCash = true,
			canGrabGold = true
		}
	}
}