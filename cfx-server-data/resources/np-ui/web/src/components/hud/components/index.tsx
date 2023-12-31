import React, { useState, useEffect } from 'react';
import './index.css'
import { useNuiEvent } from "../../../hooks/useNuiEvent";
import { useExitListener } from "../../../hooks/useExitListener";
import { fetchNui } from "../../../utils/fetchNui";
import { isEnvBrowser } from '../../../utils/misc';
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, Slider, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import useStyles from './index.styles';

const Hud: React.FC = () => {
    const classes = useStyles();

    const [showHud, setShowHud] = useState(false)
    const [showSettings, setShowSettings] = useState(false)
    const [showCrosshair, setShowCrosshair] = useState(false)
    const [hasRadio, setHasRadio] = useState(false)
    const [radioChannel, setRadioChannel] = useState("")
    const [displayRadioChannel, setDisplayRadioChannel] = useState(false)

    const [showHealth, setShowHealth] = useState(true)
    const [showArmor, setShowArmor] = useState(true)
    const [showHunger, setShowHunger] = useState(true)
    const [showThirst, setShowThirst] = useState(true)
    const [showOxygen, setShowOxygen] = useState(true)
    const [showStress, setShowStress] = useState(true)

    const [waypointActive, setWaypointActive] = useState(false)
    const [showCarHud, setShowCarHud] = useState(false)
    const [showBelt, setShowBelt] = useState(false)
    const [showAltitude, setShowAltitude] = useState(false)
    const [showEngineDamage, setShowEngineDamage] = useState(false)

    const [waypointDistance, setWaypointDistance] = useState("")
    const [speedDashArray, setSpeedDashArray] = useState("")
    const [speedDashOffset, setSpeedDashOffset] = useState("")
    const [fuelDashArray, setFuelDashArray] = useState("")
    const [fuelDashOffset, setFuelDashOffset] = useState("")
    const [fuelColor, setFuelColor] = useState("")
    const [altDashArray, setAltDashArray] = useState("")
    const [altDashOffset, setAltDashOffset] = useState("")

    const [area, setArea] = useState("")
    const [street, setStreet] = useState("")
    const [direction, setDirection] = useState(0)
    const [speed, setSpeed] = useState(0)
    const [fuel, setFuel] = useState(0)
    const [alt, setAlt] = useState(0)

    const [compassEnabled, setCompassEnabled] = useState(true)
    const [streetNamesEnabled, setStreetNamesEnabled] = useState(true)
    const [blackbarsEnabled, setBlackbarsEnabled] = useState(false)
    const [circleTaskbarEnabled, setCircleTaskbarEnabled] = useState(false)
    const [hideEnhancements, setHideEnhancements] = useState(false)

    const [compassFps, setCompassFps] = useState("16")
    const [speedometerFps, setSpeedometerFps] = useState("16")
    const [blackbarsValue, setBlackbarsValue] = useState("10")

    const [showCompass, setShowCompass] = useState(false)
    const [showRoadNames, setShowRoadNames] = useState(false)

    const [godMode, setGodMode] = useState(false)

    const [minimapEnabled, setMinimapEnabled] = useState(true)
    const [defaultMinimap, setDefaultMinimap] = useState(false)
    const [minimapOutline, setMinimapOutline] = useState(true)

    const [phoneBrand, setPhoneBrand] = useState("android")
    const [phoneBackground, setPhoneBackground] = useState("https://i.imgur.com/3KTfLIV.jpg")
    const [phoneReceiveSMS, setPhoneReceiveSMS] = useState(true)
    const [phoneReceiveEmail, setPhoneReceiveEmail] = useState(true)
    const [phoneEmbeddedImages, setPhoneEmbeddedImages] = useState(true)
    const [phoneNewTweet, setPhoneNewTweet] = useState(true)

    const [RadioClicksOutgoing, setRadioClicksOutgoing] = useState(true)
    const [RadioClicksIncoming, setRadioClicksIncoming] = useState(true)
    const [RadioVolume, setRadioVolume] = useState(100)
    const [RadioClicksVolume, setRadioClicksVolume] = useState(100)
    const [PhoneVolume, setPhoneVolume] = useState(100)


    const [curTab, setCurTab] = useState(0)

    const [inVehicle, setInVehicle] = useState(false)

    const [radioChannelVisibility, setRadioChannelVisibility] = useState("3")

    /* BUFFS */
    const [buffedOxygen, setBuffedOxygen] = useState(false)
    const [buffedHunger, setBuffedHunger] = useState(false)
    const [buffedStress, setBuffedStress] = useState(false)
    const [buffedJobpay, setBuffedJobpay] = useState(false)
    const [buffedAlertness, setBuffedAlertness] = useState(false)

    const [displayAllForce, setDisplayAllForce] = useState(false)
    const [wasHealthHidden, setWasHealthHidden] = useState(false)
    const [wasArmorHidden, setWasArmorHidden] = useState(false)
    const [wasHungerHidden, setWasHungerHidden] = useState(false)
    const [wasThirstHidden, setWasThirstHidden] = useState(false)
    const [wasOxygenHidden, setWasOxygenHidden] = useState(false)
    const [wasStressHidden, setWasStressHidden] = useState(false)

    const saveHudSettings = () => {
        fetchNui('np-ui:hudSetPreferences', {
            "hud.misc.circle.taskbar.enabled": circleTaskbarEnabled,
            "hud.status.health.enabled": showHealth,
            "hud.status.armor.enabled": showArmor,
            "hud.status.hunger.enabled": showHunger,
            "hud.status.thirst.enabled": showThirst,
            "hud.status.oxygen.enabled": showOxygen,
            "hud.status.stress.enabled": showStress,
            'hud.crosshair.enabled': crosshair,
            "hud.status.enhancements.enabled": hideEnhancements,
            "hud.status.health.hideValue": healthValue,
            "hud.status.armor.hideValue": armorValue,
            "hud.status.hunger.hideValue": hungerValue,
            "hud.status.thirst.hideValue": thirstValue,
            "hud.status.radio.channel.visibility": radioChannelVisibility,
            "hud.vehicle.minimap.enabled": minimapEnabled,
            "hud.vehicle.minimap.default": defaultMinimap,
            "hud.vehicle.minimap.outline": minimapOutline,
            "hud.vehicle.speedometer.fps": 64, //speedometerFps,
            "hud.compass.enabled": compassEnabled,
            "hud.compass.fps": compassFps,
            "hud.compass.roadnames.enabled": streetNamesEnabled,
            "hud.blackbars.enabled": blackbarsEnabled,
            "hud.blackbars.value": blackbarsValue,
        })
        fetchNui('np-ui:setKVPValue', {
            key: "np-preferences",
            value: {
                "hud.misc.circle.taskbar.enabled": circleTaskbarEnabled,
                "hud.status.health.enabled": showHealth,
                "hud.status.armor.enabled": showArmor,
                "hud.status.hunger.enabled": showHunger,
                "hud.status.thirst.enabled": showThirst,
                "hud.status.oxygen.enabled": showOxygen,
                'hud.crosshair.enabled': crosshair,
                "hud.status.stress.enabled": showStress,
                "hud.status.enhancements.enabled": hideEnhancements,
                "hud.status.health.hideValue": healthValue,
                "hud.status.armor.hideValue": armorValue,
                "hud.status.hunger.hideValue": hungerValue,
                "hud.status.thirst.hideValue": thirstValue,
                "hud.status.radio.channel.visibility": radioChannelVisibility,
                "hud.vehicle.minimap.enabled": minimapEnabled,
                "hud.vehicle.minimap.default": defaultMinimap,
                "hud.vehicle.minimap.outline": minimapOutline,
                "hud.vehicle.speedometer.fps": 64, //speedometerFps,
                "hud.compass.enabled": compassEnabled,
                "hud.compass.fps": compassFps,
                "hud.compass.roadnames.enabled": streetNamesEnabled,
                "hud.blackbars.enabled": blackbarsEnabled,
                "hud.blackbars.value": blackbarsValue,
                "phone.misc.brand": phoneBrand,
                "phone.misc.background": phoneBackground,
                "phone.misc.receive.sms": phoneReceiveSMS,
                "phone.misc.new.tweet": phoneNewTweet,
                "phone.misc.receive.email": phoneReceiveEmail,
                "phone.misc.embedded.images": phoneEmbeddedImages,
                'phone.volume': PhoneVolume,
                'radio.clicks.incoming.enabled': RadioClicksIncoming,
                'radio.clicks.outgoing.enabled': RadioClicksOutgoing,
                'radio.clicks.volume': RadioClicksVolume,
                'radio.volume': RadioVolume
            }
        })
    }

    const updateShowHealth = (bool: boolean) => {
        if (bool === true) {
            setShowHealth(true)
            setHealthDisplay(true)
            setHealthOpacity(1)
        } else {
            setShowHealth(false)
            setHealthOpacity(0)
            setTimeout(() => {
                setHealthDisplay(false)
            }, 2000)
        }
    }

    const updateShowArmor = (bool: boolean) => {
        if (bool === true) {
            setShowArmor(true)
            setArmorDisplay(true)
            setArmorOpacity(1)
        } else {
            setShowArmor(false)
            setArmorOpacity(0)
            setTimeout(() => {
                setArmorDisplay(false)
                setShowArmor(false)
            }, 2000)
        }
    }

    const updateShowHunger = (bool: boolean) => {
        if (bool === true) {
            setShowHunger(true)
            setHungerDisplay(true)
            setHungerOpacity(1)
        } else {
            setShowHunger(false)
            setHungerOpacity(0)
            setTimeout(() => {
                setHungerDisplay(false)
            }, 2000)
        }
    }

    const updateShowThirst = (bool: boolean) => {
        if (bool === true) {
            setShowThirst(true)
            setThirstDisplay(true)
            setThirstOpacity(1)
        } else {
            setShowThirst(false)
            setThirstOpacity(0)
            setTimeout(() => {
                setThirstDisplay(false)
            }, 2000)
        }
    }

    const updateShowOxygen = (bool: boolean) => {
        if (bool === true) {
            setShowOxygen(true)
            setOxygenDisplay(true)
            setOxygenOpacity(1)
        } else {
            setShowOxygen(false)
            setOxygenOpacity(0)
            setTimeout(() => {
                setOxygenDisplay(false)
            }, 2000)
        }
    }

    const updateShowStress = (bool: boolean) => {
        if (bool === true) {
            setShowStress(true)
            setStressDisplay(true)
            setStressOpacity(1)
        } else {
            setShowStress(false)
            setStressOpacity(0)
            setTimeout(() => {
                setStressDisplay(false)
            }, 2000)
        }
    }

    const updateHideEnhancements = (bool: boolean) => {
        if (bool === true) {
            setHideEnhancements(true)
            if (buffedHunger) {
                if (hungerDisplay && realHungerValue >= hungerValue) {
                    setHungerOpacity(0)
                    setTimeout(() => {
                        setHungerDisplay(false)
                    }, 2000)
                }
            }
            if (buffedStress) {
                if (stressDisplay && realStressValue <= 1) {
                    setStressOpacity(0)
                    setTimeout(() => {
                        setStressDisplay(false)
                    }, 2000)
                }
            }
        } else {
            setHideEnhancements(false)
            if (buffedHunger) {
                // console.log("hunger is buffed")
                // console.log("hungerDisplay", hungerDisplay)
                // console.log("realHungerValue", realHungerValue)
                // console.log("hungerValue", hungerValue)
                // console.log("realHunger is less than hungerValue", realHungerValue <= hungerValue)
                if (!hungerDisplay) {
                    setHungerDisplay(true)
                    setHungerOpacity(1)
                }
            }
            if (buffedStress) {
                if (!stressDisplay) {
                    setStressDisplay(true)
                    setStressOpacity(1)
                }
            }
        }
    }

    const updateHealthValue = (e: any, fromKeydown: boolean) => {
        let value = 0
        if (fromKeydown) {
            value = Number(e.target.value)
            if (e.key !== 'Enter') return;
        } else {
            value = Number(e)
        }
        setHealthValue(value)
        setInputHealthValue(value)
        if (realHealthValue >= value && value !== 100) {
            setHealthOpacity(0)
            setHealthRed(false)
            setTimeout(() => {
                setHealthDisplay(false)
            }, 2000)
        } else {
            if (showHealth === true) {
                setHealthDisplay(true)
                setHealthOpacity(1)
            }
        }
    }

    const updateArmorValue = (e: any, fromKeydown: boolean) => {
        let value = 0
        if (fromKeydown) {
            value = Number(e.target.value)
            if (e.key !== 'Enter') return;
        } else {
            value = Number(e)
        }
        setArmorValue(value)
        setInputArmorValue(value)
        if (realArmorValue >= value && value !== 100) {
            setArmorOpacity(0)
            setArmorRed(false)
            setTimeout(() => {
                setArmorDisplay(false)
            }, 2000)
        } else {
            if (showArmor === true) {
                setArmorDisplay(true)
                setArmorOpacity(1)
            }
        }
    }

    const updateHungerValue = (e: any, fromKeydown: boolean) => {
        let value = 0
        if (fromKeydown) {
            value = Number(e.target.value)
            if (e.key !== 'Enter') return;
        } else {
            value = Number(e)
        }
        setHungerValue(value)
        setInputHungerValue(value)
        if (realHungerValue >= value && value !== 100) {
            setHungerOpacity(0)
            setHungerRed(false)
            setTimeout(() => {
                setHungerDisplay(false)
            }, 2000)
        } else {
            if (showHunger === true) {
                setHungerDisplay(true)
                setHungerOpacity(1)
            }
        }
    }

    const updateThirstValue = (e: any, fromKeydown: boolean) => {
        let value = 0
        if (fromKeydown) {
            value = Number(e.target.value)
            if (e.key !== 'Enter') return;
        } else {
            value = Number(e)
        }
        setThirstValue(value)
        setInputThirstValue(value)
        if (realThirstValue >= value && value !== 100) {
            setThirstOpacity(0)
            setThirstRed(false)
            setTimeout(() => {
                setThirstDisplay(false)
            }, 2000)
        } else {
            if (showThirst === true) {
                setThirstDisplay(true)
                setThirstOpacity(1)
            }
        }
    }

    /* Voice */
    const [voiceDisplay, setVoiceDisplay] = useState(true)
    const [voiceColor, setVoiceColor] = useState('white')
    const [voiceActive, setVoiceActive] = useState(false)
    const [voiceActiveRadio, setVoiceActiveRadio] = useState(false)
    const [voiceOpacity, setVoiceOpacity] = useState(1)
    const [voiceArray, setVoiceArray] = useState("125.66370614359172")
    const [voiceOffset, setVoiceOffset] = useState("125.66370614359172")

    /* Health */
    const [realHealthValue, setRealHealthValue] = useState(0)
    const [healthValue, setHealthValue] = useState(99)
    const [inputHealthValue, setInputHealthValue] = useState(99)
    const [healthRed, setHealthRed] = useState(false)
    const [healthDisplay, setHealthDisplay] = useState(true)
    const [healthOpacity, setHealthOpacity] = useState(1)
    const [healthArray, setHealthArray] = useState("125.66370614359172")
    const [healthOffset, setHealthOffset] = useState("125.66370614359172")

    /* Mana */
    const [manaValue, setManaValue] = useState(0)
    const [manaDisplay, setManaDisplay] = useState(false)
    const [manaOpacity, setManaOpacity] = useState(0)
    const [manaArray, setManaArray] = useState("125.66370614359172")
    const [manaOffset, setManaOffset] = useState("125.66370614359172")

    /* Armor */
    const [realArmorValue, setRealArmorValue] = useState(0)
    const [armorValue, setArmorValue] = useState(99)
    const [inputArmorValue, setInputArmorValue] = useState(99)
    const [armorRed, setArmorRed] = useState(false)
    const [armorDisplay, setArmorDisplay] = useState(true)
    const [armorOpacity, setArmorOpacity] = useState(1)
    const [armorArray, setArmorArray] = useState("125.66370614359172")
    const [armorOffset, setArmorOffset] = useState("125.66370614359172")

    /* Hunger */
    const [realHungerValue, setRealHungerValue] = useState(0)
    const [hungerValue, setHungerValue] = useState(99)
    const [inputHungerValue, setInputHungerValue] = useState(99)
    const [hungerRed, setHungerRed] = useState(false)
    const [hungerDisplay, setHungerDisplay] = useState(true)
    const [hungerOpacity, setHungerOpacity] = useState(1)
    const [hungerArray, setHungerArray] = useState("125.66370614359172")
    const [hungerOffset, setHungerOffset] = useState("125.66370614359172")

    /* Thirst */
    const [realThirstValue, setRealThirstValue] = useState(0)
    const [thirstValue, setThirstValue] = useState(99)
    const [inputThirstValue, setInputThirstValue] = useState(99)
    const [thirstRed, setThirstRed] = useState(false)
    const [thirstDisplay, setThirstDisplay] = useState(true)
    const [thirstOpacity, setThirstOpacity] = useState(1)
    const [thirstArray, setThirstArray] = useState("125.66370614359172")
    const [thirstOffset, setThirstOffset] = useState("125.66370614359172")

    /* Oxygen */
    const [oxygenValue, setOxygenValue] = useState(0)
    const [oxygenDisplay, setOxygenDisplay] = useState(true)
    const [oxygenOpacity, setOxygenOpacity] = useState(1)
    const [oxygenArray, setOxygenArray] = useState("125.66370614359172")
    const [oxygenOffset, setOxygenOffset] = useState("125.66370614359172")

    /* Stress */
    const [realStressValue, setRealStressValue] = useState(0)
    const [stressValue, setStressValue] = useState(0)
    const [stressDisplay, setStressDisplay] = useState(true)
    const [stressOpacity, setStressOpacity] = useState(1)
    const [stressArray, setStressArray] = useState("125.66370614359172")
    const [stressOffset, setStressOffset] = useState("125.66370614359172")

    /* Intelligence */
    const [intelligenceValue, setIntelligenceValue] = useState(0)
    const [intelligenceDisplay, setIntelligenceDisplay] = useState(false)
    const [intelligenceOpacity, setIntelligenceOpacity] = useState(0)
    const [intelligenceArray, setIntelligenceArray] = useState("125.66370614359172")
    const [intelligenceOffset, setIntelligenceOffset] = useState("125.66370614359172")
    const [intelligenceBuffed, setIntelligenceBuffed] = useState(false)

    /* Stamina */
    const [staminaValue, setStaminaValue] = useState(0)
    const [staminaDisplay, setStaminaDisplay] = useState(false)
    const [staminaOpacity, setStaminaOpacity] = useState(0)
    const [staminaArray, setStaminaArray] = useState("125.66370614359172")
    const [staminaOffset, setStaminaOffset] = useState("125.66370614359172")
    const [staminaBuffed, setStaminaBuffed] = useState(false)

    /* Strength */
    const [strengthValue, setStrengthValue] = useState(0)
    const [strengthDisplay, setStrengthDisplay] = useState(false)
    const [strengthOpacity, setStrengthOpacity] = useState(0)
    const [strengthArray, setStrengthArray] = useState("125.66370614359172")
    const [strengthOffset, setStrengthOffset] = useState("125.66370614359172")
    const [strengthBuffed, setStrengthBuffed] = useState(false)

    /* Money */
    const [moneyValue, setMoneyValue] = useState(0)
    const [moneyDisplay, setMoneyDisplay] = useState(false)
    const [moneyOpacity, setMoneyOpacity] = useState(0)
    const [moneyArray, setMoneyArray] = useState("125.66370614359172")
    const [moneyOffset, setMoneyOffset] = useState("125.66370614359172")
    const [moneyBuffed, setMoneyBuffed] = useState(false)

    /* Luck */
    const [luckValue, setLuckValue] = useState(0)
    const [luckDisplay, setLuckDisplay] = useState(false)
    const [luckOpacity, setLuckOpacity] = useState(0)
    const [luckArray, setLuckArray] = useState("125.66370614359172")
    const [luckOffset, setLuckOffset] = useState("125.66370614359172")
    const [luckBuffed, setLuckBuffed] = useState(false)

    /* Alert */
    const [alertValue, setAlertValue] = useState(0)
    const [alertDisplay, setAlertDisplay] = useState(false)
    const [alertOpacity, setAlertOpacity] = useState(0)
    const [alertArray, setAlertArray] = useState("125.66370614359172")
    const [alertOffset, setAlertOffset] = useState("125.66370614359172")
    const [alertBuffed, setAlertBuffed] = useState(false)

    /* Breeze */
    const [breezeValue, seBreezeValue] = useState(0)
    const [breezeDisplay, setBreezeDisplay] = useState(false)
    const [breezeOpacity, setBreezeOpacity] = useState(0)
    const [breezeArray, setBreezeArray] = useState("125.66370614359172")
    const [breezeOffset, setBreezeOffset] = useState("125.66370614359172")
    const [breezeBuffed, setBreezeBuffed] = useState(false)

    /* Bike */
    const [bikeValue, setBikeValue] = useState(0)
    const [bikeDisplay, setBikeDisplay] = useState(false)
    const [bikeOpacity, setBikeOpacity] = useState(0)
    const [bikeArray, setBikeArray] = useState("125.66370614359172")
    const [bikeOffset, setBikeOffset] = useState("125.66370614359172")
    const [bikeBuffed, setBikeBuffed] = useState(false)

    /* Harness */
    const [harnessValue, setHarnessValue] = useState(0)
    const [harnessDisplay, setHarnessDisplay] = useState(false)
    const [harnessOpacity, setHarnessOpacity] = useState(0)
    const [harnessArray, setHarnessArray] = useState("125.66370614359172")
    const [harnessOffset, setHarnessOffset] = useState("125.66370614359172")

    /* Pursuit Modes */
    const [pursuitValue, setPursuitValue] = useState(0)
    const [pursuitDisplay, setPursuitDisplay] = useState(false)
    const [showPursuit, setShowPursuit] = useState(false)
    const [pursuitOpacity, setPursuitOpacity] = useState(0)
    const [pursuitArray, setPursuitArray] = useState("125.66370614359172")
    const [pursuitOffset, setPursuitOffset] = useState("125.66370614359172")

    /* Nuclear */
    const [nuclearValue, seNuclearValue] = useState(0)
    const [nuclearDisplay, setNuclearDisplay] = useState(false)
    const [nuclearOpacity, setNuclearOpacity] = useState(0)
    const [nuclearArray, setNuclearArray] = useState("125.66370614359172")
    const [nuclearOffset, setNuclearOffset] = useState("125.66370614359172")

    /* Ping */
    const [pingDisplay, setPingDisplay] = useState(false)
    const [pingOpacity, setPingOpacity] = useState(0)

    /* Tracker */
    const [trackerValue, setTrackerValue] = useState(0)
    const [trackerDisplay, setTrackerDisplay] = useState(false)
    const [trackerOpacity, setTrackerOpacity] = useState(0)
    const [trackerArray, setTrackerArray] = useState("125.66370614359172")
    const [trackerOffset, setTrackerOffset] = useState("125.66370614359172")

    /* Armed */
    const [armedValue, setArmedValue] = useState(100)
    const [armedDisplay, setArmedDisplay] = useState(false)
    const [armedOpacity, setArmedOpacity] = useState(0)
    const [armedArray, setArmedArray] = useState("125.66370614359172")
    const [armedOffset, setArmedOffset] = useState("125.66370614359172")

    /* Nitrous */
    const [nitrousValue, setNitrousValue] = useState(0)
    const [nitrousDisplay, setNitrousDisplay] = useState(false)
    const [nitrousOpacity, setNitrousOpacity] = useState(0)
    const [nitrousArray, setNitrousArray] = useState("125.66370614359172")
    const [nitrousOffset, setNitrousOffset] = useState("125.66370614359172")

    /* Timer */
    const [timerValue, setTimerValue] = useState(0)
    const [timerDisplay, setTimerDisplay] = useState(false)
    const [timerOpacity, setTimerOpacity] = useState(0)
    const [timerArray, setTimerArray] = useState("125.66370614359172")
    const [timerOffset, setTimerOffset] = useState("125.66370614359172")

    /* Dev Mode */
    const [devModeValue, setDevModeValue] = useState(100)
    const [devModeDisplay, setDevModeDisplay] = useState(false)
    const [devModeOpacity, setDevModeOpacity] = useState(0)
    const [devModeArray, setDevModeArray] = useState("125.66370614359172")
    const [devModeOffset, setDevModeOffset] = useState("125.66370614359172")

    /* CrossHair */
    const [crosshair, setCrosshair] = useState(false)


    type AppData = {
        action: string,
        buffedBikeStats: undefined | number | boolean,
        buffedOxygen: undefined | boolean,
        buffedHunger: undefined | boolean,
        buffedStress: undefined | boolean,
        buffedInt: undefined | number | boolean,
        buffedStrength: undefined | number | boolean,
        buffedJobpay: undefined | boolean,
        buffedAlertness: undefined | boolean,
        displayRadioChannel: undefined | boolean,
        displayAllForce: undefined | boolean,
        display: undefined | boolean,
        voiceRange: undefined | number,
        health: undefined | number,
        armor: undefined | number,
        hunger: undefined | number,
        thirst: undefined | number,
        oxygen: undefined | number,
        stress: undefined | number,
        fuel: undefined | number,
        altitudeShow: undefined | boolean,
        voiceActive: undefined | boolean,
        voiceActiveRadio: undefined | boolean,
        hasRadio: undefined | boolean,
        carHudShow: undefined | boolean,
        waypointActive: undefined | boolean,
        waypointDistance: undefined | number,
        beltShow: undefined | boolean,
        engineDamageShow: undefined | boolean,
        harnessDurability: undefined | number,
        showWeaponFireRate: undefined | boolean,
        showPing: undefined | boolean,
        pursuit: undefined | number,
        pursuitShow: undefined | boolean,
        harnessShow: undefined | boolean,
        nos: undefined | number,
        nosEnabled: undefined | boolean,
        nosShow: undefined | boolean,
        modeDev: undefined | boolean,
        modeGod: undefined | boolean,
        inVehicle: undefined | boolean,
        radioChannel: undefined | string,
        showCompass: undefined | boolean,
        showRoadNames: undefined | boolean,
        alt: undefined | number,
        area: undefined | string,
        street: undefined | string,
        heading: undefined | number,
        speed: undefined | number,
    }

    interface IUIMessage {
        data: AppData;
        app: string;
    }

    useNuiEvent<IUIMessage>('uiMessage', ({ data, app }) => {
        let appData = data
        if (app === "main") {
            if (appData.action === "restart") {
                setShowHud(false)
                //setTimeout(() => {
                //    setShowHud(true)
                //}, 1000)
            }
        }
        if (app === "preferences") {
            if (appData["hud.misc.circle.taskbar.enabled"] !== undefined) {
                setCircleTaskbarEnabled(appData["hud.misc.circle.taskbar.enabled"])
            }
            if (appData["hud.status.health.enabled"] !== undefined) {
                setShowHealth(appData["hud.status.health.enabled"])
            }
            if (appData["hud.status.armor.enabled"] !== undefined) {
                setShowArmor(appData["hud.status.armor.enabled"])
            }
            if (appData["hud.status.hunger.enabled"] !== undefined) {
                setShowHunger(appData["hud.status.hunger.enabled"])
            }
            if (appData["hud.status.thirst.enabled"] !== undefined) {
                setShowThirst(appData["hud.status.thirst.enabled"])
            }
            if (appData["hud.status.oxygen.enabled"] !== undefined) {
                setShowOxygen(appData["hud.status.oxygen.enabled"])
            }
            if (appData["hud.status.stress.enabled"] !== undefined) {
                setShowStress(appData["hud.status.stress.enabled"])
            }
            if (appData["hud.status.enhancements.enabled"] !== undefined) {
                setHideEnhancements(appData["hud.status.enhancements.enabled"])
            }
            if (appData["hud.status.health.hideValue"] !== undefined) {
                updateHealthValue(appData["hud.status.health.hideValue"], false)
            }
            if (appData["hud.status.armor.hideValue"] !== undefined) {
                updateArmorValue(appData["hud.status.armor.hideValue"], false)
            }
            if (appData["hud.status.hunger.hideValue"] !== undefined) {
                updateHungerValue(appData["hud.status.hunger.hideValue"], false)
            }
            if (appData["hud.status.thirst.hideValue"] !== undefined) {
                updateThirstValue(appData["hud.status.thirst.hideValue"], false)
            }
            if (appData["hud.status.radio.channel.visibility"] !== undefined) {
                setRadioChannelVisibility(appData["hud.status.radio.channel.visibility"])
            }
            if (appData["hud.vehicle.minimap.enabled"] !== undefined) {
                setMinimapEnabled(appData["hud.vehicle.minimap.enabled"])
            }
            if (appData["hud.vehicle.minimap.default"] !== undefined) {
                setDefaultMinimap(appData["hud.vehicle.minimap.default"])
            }
            if (appData["hud.vehicle.minimap.outline"] !== undefined) {
                setMinimapOutline(appData["hud.vehicle.minimap.outline"])
            }
            if (appData["hud.vehicle.speedometer.fps"] !== undefined) {
                //setSpeedometerFps(appData["hud.vehicle.speedometer.fps"])
                setSpeedometerFps("64")
            }
            if (appData["hud.compass.enabled"] !== undefined) {
                setCompassEnabled(appData["hud.compass.enabled"])
            }
            if (appData["hud.compass.fps"] !== undefined) {
                setCompassFps(appData["hud.compass.fps"])
            }
            if (appData["hud.compass.roadnames.enabled"] !== undefined) {
                setStreetNamesEnabled(appData["hud.compass.roadnames.enabled"])
            }
            if (appData["hud.blackbars.enabled"] !== undefined) {
                setBlackbarsEnabled(appData["hud.blackbars.enabled"])
            }
            if (appData["hud.blackbars.value"] !== undefined) {
                setBlackbarsValue(appData["hud.blackbars.value"])
            }
            if (appData["phone.misc.brand"] !== undefined) {
                setPhoneBrand(appData["phone.misc.brand"])
            }
            if (appData["phone.misc.background"] !== undefined) {
                setPhoneBackground(appData["phone.misc.background"])
            }
            if (appData["phone.misc.receive.sms"] !== undefined) {
                setPhoneReceiveSMS(appData["phone.misc.receive.sms"])
            }
            if (appData["phone.misc.new.tweet"] !== undefined) {
                setPhoneNewTweet(appData["phone.misc.new.tweet"])
            }
            if (appData["phone.misc.receive.email"] !== undefined) {
                setPhoneReceiveEmail(appData["phone.misc.receive.email"])
            }
            if (appData["phone.misc.embedded.images"] !== undefined) {
                setPhoneEmbeddedImages(appData["phone.misc.embedded.images"])
            }
        }
        if (app === "buffs") {
            //console.log("app: buffs")
            //console.log("data: ", JSON.stringify(appData))
            if (appData.buffedBikeStats !== undefined) {
                if (typeof appData.buffedBikeStats === "number") {
                    if (appData.buffedBikeStats > 0) {
                        setBikeBuffed(true)
                        setBikeValue(appData.buffedBikeStats)
                        setBikeDisplay(true)
                        setBikeOpacity(1)
                        setTimeout(() => {
                            const value = Number(appData.buffedBikeStats)
                            const radius = 20
                            const circumference = radius * 2 * Math.PI
                            const offset = circumference - ((value * 100) / 100 / 100) * circumference
                            const convertedOffset = -offset
                            setBikeArray(`${circumference}`)
                            setBikeOffset(`${convertedOffset}`)
                        }, 500)
                    } else if (appData.buffedBikeStats === 0) {
                        setBikeOpacity(0)
                        setBikeBuffed(false)
                        setBikeArray("125.66370614359172")
                        setBikeOffset("125.66370614359172")
                        setTimeout(() => {
                            setBikeDisplay(false)
                        }, 2000)
                    }
                }
            } else {
                setBikeOpacity(0)
                setBikeBuffed(false)
                setBikeArray("125.66370614359172")
                setBikeOffset("125.66370614359172")
                setTimeout(() => {
                    setBikeDisplay(false)
                }, 2000)
            }
            if (appData.buffedOxygen !== undefined) {
                if (appData.buffedOxygen === true) {
                    setBuffedOxygen(true)
                } else {
                    setBuffedOxygen(false)
                }
            }
            if (appData.buffedHunger !== undefined) {
                if (appData.buffedHunger === true) {
                    setBuffedHunger(true)
                    if (!hungerDisplay && !hideEnhancements) {
                        //console.log("hungerDisplay is false, and hideEnhancements are false")
                        setHungerDisplay(true)
                        setHungerOpacity(1)
                    }
                    // if(hideEnhancements && hungerDisplay) {
                    //     console.log("hide enhancement is true, hunger display is true")
                    //     console.log("hide fadeout the hunger")
                    //     setHungerOpacity(0)
                    //     setTimeout(() => {
                    //         setHungerDisplay(false)
                    //     }, 2000)
                    // }
                } else {
                    setBuffedHunger(false)
                    if (realHungerValue >= hungerValue) {
                        setHungerOpacity(0)
                        setTimeout(() => {
                            setHungerDisplay(false)
                        }, 2000)
                    }
                }
            }
            if (appData.buffedStress !== undefined) {
                if (appData.buffedStress === true) {
                    setBuffedStress(true)
                    if (!stressDisplay && !hideEnhancements) {
                        setStressDisplay(true)
                        setStressOpacity(1)
                    }
                } else {
                    setBuffedStress(false)
                    if (realStressValue <= 1) {
                        setStressOpacity(0)
                        setTimeout(() => {
                            setStressDisplay(false)
                        }, 2000)
                    }
                }
            }
            if (appData.buffedInt !== undefined) {
                if (typeof appData.buffedInt === "number") {
                    if (appData.buffedInt > 0) {
                        setIntelligenceBuffed(true)
                        setIntelligenceValue(appData.buffedInt)
                        setIntelligenceDisplay(true)
                        setIntelligenceOpacity(1)
                        setTimeout(() => {
                            const value = Number(appData.buffedInt)
                            const radius = 20
                            const circumference = radius * 2 * Math.PI
                            const offset = circumference - ((value * 100) / 100 / 100) * circumference
                            const convertedOffset = -offset
                            setIntelligenceArray(`${circumference}`)
                            setIntelligenceOffset(`${convertedOffset}`)
                        }, 500)
                    } else if (appData.buffedInt === 0) {
                        setIntelligenceOpacity(0)
                        setIntelligenceBuffed(false)
                        setIntelligenceArray("125.66370614359172")
                        setIntelligenceOffset("125.66370614359172")
                        setTimeout(() => {
                            setIntelligenceDisplay(false)
                        }, 2000)
                    }
                }
            } else {
                setIntelligenceOpacity(0)
                setIntelligenceBuffed(false)
                setIntelligenceArray("125.66370614359172")
                setIntelligenceOffset("125.66370614359172")
                setTimeout(() => {
                    setIntelligenceDisplay(false)
                }, 2000)
            }
            if (appData.buffedStrength !== undefined) {
                if (typeof appData.buffedStrength === "number") {
                    if (appData.buffedStrength > 0) {
                        setStrengthBuffed(true)
                        setStrengthValue(appData.buffedStrength)
                        setStrengthDisplay(true)
                        setStrengthOpacity(1)
                        setTimeout(() => {
                            const value = Number(appData.buffedStrength)
                            const radius = 20
                            const circumference = radius * 2 * Math.PI
                            const offset = circumference - ((value * 100) / 100 / 100) * circumference
                            setStrengthArray(`${circumference}`)
                            setStrengthOffset(`${offset}`)
                        }, 500)
                    } else if (appData.buffedStrength === 0) {
                        setStrengthOpacity(0)
                        setStrengthBuffed(false)
                        setStrengthArray("125.66370614359172")
                        setStrengthOffset("125.66370614359172")
                        setTimeout(() => {
                            setStrengthDisplay(false)
                        }, 2000)
                    }
                }
            } else {
                setStrengthOpacity(0)
                setStrengthBuffed(false)
                setStrengthArray("125.66370614359172")
                setStrengthOffset("125.66370614359172")
                setTimeout(() => {
                    setStrengthDisplay(false)
                }, 2000)
            }
            if (appData.buffedJobpay !== undefined) {
                if (appData.buffedJobpay === true) {
                    setMoneyBuffed(true)
                    setMoneyValue(1)
                    setMoneyDisplay(true)
                    setMoneyOpacity(1)
                    setTimeout(() => {
                        const value = 1
                        const radius = 20
                        const circumference = radius * 2 * Math.PI
                        const offset = circumference - ((value * 100) / 100 / 100) * circumference
                        setMoneyArray(`${circumference}`)
                        setMoneyOffset(`${offset}`)
                    }, 500)
                } else if (appData.buffedJobpay === false) {
                    setMoneyOpacity(0)
                    setMoneyBuffed(false)
                    setMoneyArray("125.66370614359172")
                    setMoneyOffset("125.66370614359172")
                    setTimeout(() => {
                        setMoneyDisplay(false)
                    }, 2000)
                }
            }
            if (appData.buffedAlertness !== undefined) {
                if (appData.buffedAlertness === true) {
                    setAlertBuffed(true)
                    setAlertValue(1)
                    setAlertDisplay(true)
                    setAlertOpacity(1)
                    setTimeout(() => {
                        const value = 1
                        const radius = 20
                        const circumference = radius * 2 * Math.PI
                        const offset = circumference - ((value * 100) / 100 / 100) * circumference
                        setAlertArray(`${circumference}`)
                        setAlertOffset(`${offset}`)
                    }, 500)
                } else if (appData.buffedAlertness === false) {
                    setAlertOpacity(0)
                    setAlertBuffed(false)
                    setAlertArray("125.66370614359172")
                    setAlertOffset("125.66370614359172")
                    setTimeout(() => {
                        setAlertDisplay(false)
                    }, 2000)
                }
            }
        }
        if (app === "hud") {
            if (appData.displayRadioChannel !== undefined) {
                //console.log("displayRadioChannel", appData.displayRadioChannel)
                setDisplayRadioChannel(appData.displayRadioChannel)
            }
            if (appData.displayAllForce !== undefined) {
                if (appData.displayAllForce === true) {
                    setDisplayAllForce(true)

                    if (!healthDisplay) {
                        setHealthDisplay(true)
                        setHealthOpacity(1)
                        setWasHealthHidden(true)
                    }
                    if (!armorDisplay) {
                        setArmorDisplay(true)
                        setArmorOpacity(1)
                        setWasArmorHidden(true)
                    }
                    if (!hungerDisplay) {
                        setHungerDisplay(true)
                        setHungerOpacity(1)
                        setWasHungerHidden(true)
                    }
                    if (!thirstDisplay) {
                        setThirstDisplay(true)
                        setThirstOpacity(1)
                        setWasThirstHidden(true)
                    }
                    if (!oxygenDisplay) {
                        setOxygenDisplay(true)
                        setOxygenOpacity(1)
                        setWasOxygenHidden(true)
                    }
                    if (!stressDisplay) {
                        setStressDisplay(true)
                        setStressOpacity(1)
                        setWasStressHidden(true)
                    }
                } else {
                    if (wasHealthHidden) {
                        setHealthOpacity(0)
                        setTimeout(() => {
                            setHealthDisplay(false)
                        }, 2000)
                    }
                    if (wasArmorHidden) {
                        setArmorOpacity(0)
                        setTimeout(() => {
                            setArmorDisplay(false)
                        }, 2000)
                    }
                    if (wasHungerHidden) {
                        setHungerOpacity(0)
                        setTimeout(() => {
                            setHungerDisplay(false)
                        }, 2000)
                    }
                    if (wasThirstHidden) {
                        setThirstOpacity(0)
                        setTimeout(() => {
                            setThirstDisplay(false)
                        }, 2000)
                    }
                    if (wasOxygenHidden) {
                        setOxygenOpacity(0)
                        setTimeout(() => {
                            setOxygenDisplay(false)
                        }, 2000)
                    }
                    if (wasStressHidden) {
                        setStressOpacity(0)
                        setTimeout(() => {
                            setStressDisplay(false)
                        }, 2000)
                    }
                    setWasHealthHidden(false)
                    setWasArmorHidden(false)
                    setWasHungerHidden(false)
                    setWasThirstHidden(false)
                    setWasOxygenHidden(false)
                    setWasStressHidden(false)
                    setDisplayAllForce(false)
                }
            }
            if (appData.display !== undefined) {
                setShowHud(appData.display)
                if (appData.display) {
                    setVoiceDisplay(true)
                    setVoiceOpacity(1)
                    const value = 66
                    const radius = 20
                    const circumference = radius * 2 * Math.PI
                    const offset = circumference - ((value * 100) / 100 / 100) * circumference
                    setVoiceArray(`${circumference}`)
                    setVoiceOffset(`${offset}`)
                } else {
                    setIntelligenceDisplay(false)
                    setIntelligenceOpacity(0)
                    setStaminaDisplay(false)
                    setStaminaOpacity(0)
                    setStrengthDisplay(false)
                    setStrengthOpacity(0)
                    setMoneyDisplay(false)
                    setMoneyOpacity(0)
                    setLuckDisplay(false)
                    setLuckOpacity(0)
                    setAlertDisplay(false)
                    setAlertOpacity(0)
                    setBreezeDisplay(false)
                    setBreezeOpacity(0)
                    setBikeDisplay(false)
                    setBikeOpacity(0)
                    setHarnessDisplay(false)
                    setHarnessOpacity(0)
                    setPursuitDisplay(false)
                    setPursuitOpacity(0)
                }
            }
            if (appData.voiceRange !== undefined) {
                let value = 33
                if (appData.voiceRange === 1) {
                    value = 33
                } else if (appData.voiceRange === 2) {
                    value = 66
                } else if (appData.voiceRange === 3) {
                    value = 100
                }
                const radius = 20
                const circumference = radius * 2 * Math.PI
                const offset = circumference - ((value * 100) / 100 / 100) * circumference
                setVoiceArray(`${circumference}`)
                setVoiceOffset(`${offset}`)
            }
            if (appData.health !== undefined) {
                setRealHealthValue(appData.health)
                setTimeout(() => {
                    const value = Number(appData.health)
                    const radius = 20
                    const circumference = radius * 2 * Math.PI
                    const offset = circumference - ((value * 100) / 100 / 100) * circumference
                    setHealthArray(`${circumference}`)
                    setHealthOffset(`${offset}`)
                    if (appData.health < 10) {
                        setHealthRed(true)
                    } else {
                        setHealthRed(false)
                    }
                }, 500)
                if (appData.health <= healthValue || healthValue === 100) {
                    if (showHealth === true && appData.health <= healthValue || healthValue === 100) {
                        setHealthDisplay(true)
                        setHealthOpacity(1)
                    }
                    if (showHealth === false && !displayAllForce) {
                        setHealthDisplay(false)
                        setHealthOpacity(0)
                    }
                } else if (appData.health === 100 || appData.health > 100) {
                    if (!displayAllForce) {
                        const value = Number(appData.health)
                        const radius = 20
                        const circumference = radius * 2 * Math.PI
                        const offset = circumference - ((value * 100) / 100 / 100) * circumference
                        setHealthArray(`${circumference}`)
                        setHealthOffset(`${offset}`)
                        setHealthOpacity(0)
                        setHealthRed(false)
                        setTimeout(() => {
                            setHealthDisplay(false)
                        }, 2000)
                    }
                }
            }
            if (appData.armor !== undefined) {
                //console.log("armor", appData.armor)
                setRealArmorValue(appData.armor)
                setTimeout(() => {
                    const value = Number(appData.armor)
                    const radius = 20
                    const circumference = radius * 2 * Math.PI
                    const offset = circumference - ((value * 100) / 100 / 100) * circumference
                    setArmorArray(`${circumference}`)
                    setArmorOffset(`${offset}`)
                    if (appData.armor < 10) {
                        setArmorRed(true)
                    } else {
                        setArmorRed(false)
                    }
                }, 500)
                if (appData.armor <= armorValue || armorValue === 100) {
                    if (showArmor === true && appData.armor <= armorValue || armorValue === 100) {
                        setArmorDisplay(true)
                        setArmorOpacity(1)
                    }
                    if (showArmor === false && !displayAllForce) {
                        setArmorDisplay(false)
                        setArmorOpacity(0)
                    }
                } else if (appData.armor === 100 || appData.armor > 100) {
                    if (!displayAllForce) {
                        const value = Number(appData.armor)
                        const radius = 20
                        const circumference = radius * 2 * Math.PI
                        const offset = circumference - ((value * 100) / 100 / 100) * circumference
                        setArmorArray(`${circumference}`)
                        setArmorOffset(`${offset}`)
                        setArmorOpacity(0)
                        setArmorRed(false)
                        setTimeout(() => {
                            setArmorDisplay(false)
                        }, 2000)
                    }
                }
            }
            if (appData.hunger !== undefined) {
                setRealHungerValue(appData.hunger)
                setTimeout(() => {
                    const value = Number(appData.hunger)
                    const radius = 20
                    const circumference = radius * 2 * Math.PI
                    const offset = circumference - ((value * 100) / 100 / 100) * circumference
                    setHungerArray(`${circumference}`)
                    setHungerOffset(`${offset}`)
                    if (appData.hunger < 10) {
                        setHungerRed(true)
                    } else {
                        setHungerRed(false)
                    }
                }, 500)
                if (Number(appData.hunger) <= hungerValue || hungerValue === 100) {
                    if (showHunger === true && appData.hunger <= hungerValue || hungerValue === 100) {
                        setHungerDisplay(true)
                        setHungerOpacity(1)
                    }
                    if (showHunger === false && !displayAllForce) {
                        setHungerDisplay(false)
                        setHungerOpacity(0)
                    }
                } else if (appData.hunger === 100 || appData.hunger > 100) {
                    if (!displayAllForce && !buffedHunger) {
                        const value = Number(appData.hunger)
                        const radius = 20
                        const circumference = radius * 2 * Math.PI
                        const offset = circumference - ((value * 100) / 100 / 100) * circumference
                        setHungerArray(`${circumference}`)
                        setHungerOffset(`${offset}`)
                        setHungerOpacity(0)
                        setHungerRed(false)
                        setTimeout(() => {
                            setHungerDisplay(false)
                        }, 2000)
                    }
                }
            }
            if (appData.thirst !== undefined) {
                setRealThirstValue(appData.thirst)
                setTimeout(() => {
                    const value = Number(appData.thirst)
                    const radius = 20
                    const circumference = radius * 2 * Math.PI
                    const offset = circumference - ((value * 100) / 100 / 100) * circumference
                    setThirstArray(`${circumference}`)
                    setThirstOffset(`${offset}`)
                    if (appData.thirst < 10) {
                        setThirstRed(true)
                    } else {
                        setThirstRed(false)
                    }
                }, 500)
                if (appData.thirst <= thirstValue || thirstValue === 100) {
                    if (showThirst === true && appData.thirst <= thirstValue || thirstValue === 100) {
                        setThirstDisplay(true)
                        setThirstOpacity(1)
                    }
                    if (showThirst === false && !displayAllForce) {
                        setThirstDisplay(false)
                        setThirstOpacity(0)
                    }
                } else if (appData.thirst === 100 || appData.thirst > 100) {
                    if (!displayAllForce) {
                        const value = Number(appData.thirst)
                        const radius = 20
                        const circumference = radius * 2 * Math.PI
                        const offset = circumference - ((value * 100) / 100 / 100) * circumference
                        setThirstArray(`${circumference}`)
                        setThirstOffset(`${offset}`)
                        setThirstOpacity(0)
                        setThirstRed(false)
                        setTimeout(() => {
                            setThirstDisplay(false)
                        }, 2000)
                    }
                }
            }
            if (appData.oxygen !== undefined) {
                if (appData.oxygen < 25) {
                    if (showOxygen === true && appData.oxygen < 25) {
                        setOxygenDisplay(true)
                        setOxygenOpacity(1)
                    }
                    if (showOxygen === false && !displayAllForce) {
                        setOxygenDisplay(false)
                        setOxygenOpacity(0)
                    }
                    setTimeout(() => {
                        const value = Number(appData.oxygen)
                        const radius = 20
                        const circumference = radius * 2 * Math.PI
                        const offset = circumference - ((value * 100) / 100 / 100) * circumference
                        setOxygenArray(`${circumference}`)
                        setOxygenOffset(`${offset}`)
                    }, 500)
                } else if (appData.oxygen >= 25) {
                    if (!displayAllForce) {
                        const value = Number(appData.oxygen)
                        const radius = 20
                        const circumference = radius * 2 * Math.PI
                        const offset = circumference - ((value * 100) / 100 / 100) * circumference
                        setOxygenArray(`${circumference}`)
                        setOxygenOffset(`${offset}`)
                        setOxygenOpacity(0)
                        setTimeout(() => {
                            setOxygenDisplay(false)
                        }, 2000)
                    }
                }
            }

            if (appData.stress !== undefined) {
                setRealStressValue(appData.stress)
                if (appData.stress >= 1) {
                    if (showStress === true) {
                        setStressDisplay(true)
                        setStressOpacity(1)
                    }
                    if (showStress === false && !displayAllForce) {
                        setStressDisplay(false)
                        setStressOpacity(0)
                    }
                    //maybe move this outside of the if's
                    setTimeout(() => {
                        const value = Number(appData.stress)
                        const radius = 20
                        const circumference = radius * 2 * Math.PI
                        const offset = circumference - ((value * 100) / 100 / 100) * circumference
                        setStressArray(`${circumference}`)
                        setStressOffset(`${offset}`)
                    }, 500)
                } else if (appData.stress <= 1 || appData.stress === 0) {
                    if (!displayAllForce) {
                        const value = Number(appData.stress)
                        const radius = 20
                        const circumference = radius * 2 * Math.PI
                        const offset = circumference - ((value * 100) / 100 / 100) * circumference
                        setStressArray(`${circumference}`)
                        setStressOffset(`${offset}`)
                        setStressOpacity(0)
                        setTimeout(() => {
                            setStressDisplay(false)
                        }, 2000)
                    }
                }
            }
            if (appData.fuel !== undefined) {
                let value = Number(appData.fuel)
                let radius = 13.5
                let circumference = radius * 2 * Math.PI
                let percent = value * 100 / 220
                let offset = circumference - ((-percent * 145) / 100) / 100 * circumference //62
                let convertedOffset = -offset
                setFuelDashArray(`${circumference}`) //${circumference}
                setFuelDashOffset(`${convertedOffset}`)
                setFuel(value)
                setFuelColor("#fff")
                if (value <= 15) {
                    setFuelColor("red")
                }
            }
            if (appData.altitudeShow !== undefined) {
                setShowAltitude(appData.altitudeShow)
            }
            if (appData.voiceActive !== undefined) {
                //console.log("voiceActive: " + appData.voiceActive)
                if (appData.voiceActive === true) {
                    setVoiceColor('rgb(213, 205, 49)')
                    setVoiceActive(true)
                } else {
                    setVoiceColor('#fff')
                    setVoiceActive(false)
                }
            }
            if (appData.voiceActiveRadio !== undefined) {
                if (appData.voiceActiveRadio === true) {
                    setVoiceColor('#C05D5D')
                    setVoiceActiveRadio(true)
                } else {
                    setVoiceColor('#fff')
                    setVoiceActiveRadio(false)
                }
                //setVoiceColor(appData.voiceActiveRadio ? '#C05D5D' : '#fff')
            }
            if (appData.hasRadio !== undefined) {
                setHasRadio(appData.hasRadio)
            }
            if (appData.carHudShow !== undefined) {
                setShowCarHud(appData.carHudShow)
            }
            if (appData.waypointActive !== undefined) {
                setWaypointActive(appData.waypointActive)
            }
            if (appData.waypointDistance !== undefined) {
                setWaypointDistance(appData.waypointDistance.toFixed(2).toString())
            }
            if (appData.beltShow !== undefined) {
                setShowBelt(appData.beltShow)
            }
            if (appData.engineDamageShow !== undefined) {
                setShowEngineDamage(appData.engineDamageShow)
            }
            if (appData.harnessDurability !== undefined) {
                let value = 0
                if (appData.harnessDurability === 1) {
                    value = 35
                } else if (appData.harnessDurability === 2) {
                    value = 50
                } else if (appData.harnessDurability === 3) {
                    value = 100
                }
                if (appData.harnessDurability > 0) {
                    setHarnessDisplay(true)
                    setHarnessOpacity(1)
                    const radius = 20
                    const circumference = radius * 2 * Math.PI
                    const offset = circumference - ((value * 100) / 100 / 100) * circumference
                    setHarnessArray(`${circumference}`)
                    setHarnessOffset(`${offset}`)
                } else {
                    setHarnessOpacity(0)
                    setHarnessArray("125.66370614359172")
                    setHarnessOffset("125.66370614359172")
                    setTimeout(() => {
                        setHarnessDisplay(false)
                    }, 2000)
                }
            }
            if (appData.nosShow !== undefined && appData.nosEnabled !== undefined && appData.nos !== undefined) {
                if (appData.nos > 0 && appData.nosShow === true) {
                    let value = appData.nos
                    setNitrousDisplay(true)
                    setNitrousOpacity(1)
                    const radius = 20
                    const circumference = radius * 2 * Math.PI
                    const offset = circumference - ((value * 100) / 100 / 100) * circumference
                    setNitrousArray(`${circumference}`)
                    setNitrousOffset(`${offset}`)
                } else {
                    setNitrousOpacity(0)
                    setNitrousArray("125.66370614359172")
                    setNitrousOffset("125.66370614359172")
                    setTimeout(() => {
                        setNitrousDisplay(false)
                    }, 2000)
                }
            }
            if (appData.showWeaponFireRate !== undefined) {
                if (appData.showWeaponFireRate === true) {
                    setArmedDisplay(true)
                    setArmedOpacity(1)
                } else {
                    setArmedOpacity(0)
                    setTimeout(() => {
                        setArmedDisplay(false)
                    }, 2000)
                }
            }
            if (appData.showPing !== undefined) {
                if (appData.showPing === true) {
                    setPingDisplay(true)
                    setPingOpacity(1)
                } else {
                    setPingOpacity(0)
                    setTimeout(() => {
                        setPingDisplay(false)
                    }, 2000)
                }
            }
            if (appData.pursuit !== undefined) {
                let value = 0
                if (appData.pursuit === 1) {
                    value = 35
                } else if (appData.pursuit === 2) {
                    value = 50
                } else if (appData.pursuit === 3) {
                    value = 100
                }
                const radius = 20
                const circumference = radius * 2 * Math.PI
                const offset = circumference - ((value * 100) / 100 / 100) * circumference
                setPursuitArray(`${circumference}`)
                setPursuitOffset(`${offset}`)
            }
            if (appData.pursuitShow !== undefined) {
                if (appData.pursuitShow === true && inVehicle === true) {
                    setShowPursuit(true)
                    setPursuitDisplay(true)
                    setPursuitOpacity(1)
                } else {
                    setPursuitOpacity(0)
                    setTimeout(() => {
                        setShowPursuit(false)
                        setPursuitDisplay(false)
                    }, 2000)
                }
            }
            if (appData.harnessShow !== undefined) {
                //setShowHarness(appData.harnessShow)
            }
        } else if (app === "game") {
            if (appData.modeDev !== undefined) {
                if (appData.modeDev === true) {
                    setDevModeDisplay(appData.modeDev)
                    setDevModeOpacity(1)
                } else {
                    setDevModeOpacity(0)
                    setTimeout(() => {
                        setDevModeDisplay(appData.modeDev)
                    }, 2000)
                }
            }
            if (appData.modeGod !== undefined) {
                if (appData.modeGod === true) {
                    setGodMode(true)
                } else {
                    setGodMode(false)
                }
            }
            if (appData.inVehicle !== undefined) {
                setInVehicle(appData.inVehicle)
            }
            if (appData.radioChannel !== undefined) {
                //console.log("radioChannel", appData.radioChannel)
                setRadioChannel(appData.radioChannel)
            }
        } else if (app === "hud.compass") {
            if (appData.showCompass !== undefined) {
                setShowCompass(appData.showCompass)
            }
            if (appData.showRoadNames !== undefined) {
                setShowRoadNames(appData.showRoadNames)
            }
            if (appData.alt !== undefined) {
                let value = Number(appData.alt)
                let radius = 27
                let circumference = radius * 2 * Math.PI
                let percent = value * 100 / 220
                let offset = circumference - ((-percent * 50) / 100) / 100 * circumference
                let convertedOffset = -offset
                setAltDashArray(`${circumference} ${circumference}`)
                setAltDashOffset(`${convertedOffset}`)
                setAlt(value)
            }
            if (appData.area !== undefined) {
                setArea(appData.area)
            }
            if (appData.street !== undefined) {
                setStreet(appData.street)
            }
            if (appData.heading !== undefined) {
                const heading = Number(appData.heading) + 90
                if(appData.heading === 360) {
                    setDirection(0)
                } else {
                    setDirection(-heading)
                }
            }
            if (appData.speed !== undefined) {
                let value = Number(appData.speed)
                let radius = 27
                let circumference = radius * 2 * Math.PI
                let percent = value * 100 / 220
                let offset = circumference - ((-percent * 50) / 100) / 100 * circumference
                let convertedOffset = -offset
                setSpeedDashArray(`${circumference} ${circumference}`)
                setSpeedDashOffset(`${convertedOffset}`)
                setSpeed(value)
            }
        }
    })

    useNuiEvent<any>('toggleSettings', (data) => {
        if (data.show) {
            setCurTab(0)
            setShowSettings(true)
        }
    })

    useNuiEvent<any>('toggleCrosshair', (data) => {
        if (data.show) {
            if(crosshair){
                setShowCrosshair(true)
            }else{
                setShowCrosshair(false)
            }
        }else{
            setShowCrosshair(false)
        }
    })

    useEffect(() => {
        if (isEnvBrowser()) {
            setVoiceDisplay(true)
            setVoiceOpacity(1)
            setTimeout(() => {
                const value = 100
                const radius = 20
                const circumference = radius * 2 * Math.PI
                const offset = circumference - ((value * 100) / 100 / 100) * circumference
                const convertedOffset = -offset
                setVoiceArray(`${circumference}`)
                setVoiceOffset(`${convertedOffset}`)
            }, 500)
        }
    })

    useExitListener(setShowSettings)

    return (
        <>
            <Grid container className={classes.root} style={{ display: blackbarsEnabled ? '' : 'none', zIndex: 1000000 }}>
                <div style={{ display: 'flex', width: '100vw', height: '100vh', position: 'absolute', left: '0px', top: '0px', flexDirection: 'column' }}>
                    <div style={{ backgroundColor: 'black', height: `${Number(blackbarsValue) >= 40 ? '40vh' : `${blackbarsValue}vh`}`, width: '100vw' }}></div>
                    <div style={{ flex: '1 1 0%', width: '100vw', height: '100%' }}></div>
                    <div style={{ backgroundColor: 'black', height: `${Number(blackbarsValue) >= 40 ? '40vh' : `${blackbarsValue}vh`}`, width: '100vw' }}></div>
                </div>
            </Grid>

            <Grid container className={classes.root}>
                <div className="hud.compass-app-wrapper" style={{ display: showCompass && compassEnabled ? 'flex' : 'none', position: 'absolute', top: '0px', left: '0px', width: '100vw', height: '32px', pointerEvents: 'none', placeContent: 'center', color: 'white' }}>
                    <div style={{ width: '100vw', height: '52px', display: 'flex', justifyContent: 'unset', flexDirection: 'column' }}>
                        <div style={{ width: '100vw', height: '32px', display: 'flex', justifyContent: 'center' }}>
                            <div style={{ flex: '1 1 0%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0px 16px', textAlign: 'right', opacity: showRoadNames ? '1' : '0' }}>
                                <Typography style={{ textShadow: 'rgb(55, 71, 79) -1px 1px 0px, rgb(55, 71, 79) 1px 1px 0px, rgb(55, 71, 79) 1px -1px 0px, rgb(55, 71, 79) -1px -1px 0px', fontFamily: 'Arial, Helvetica, sans-serif', letterSpacing: '0px', fontWeight: 600, textDecoration: 'none', fontStyle: 'normal', fontVariant: 'small-caps', textTransform: 'none', width: '100%' }} variant="body1" gutterBottom>{area}</Typography>
                            </div>

                            <div style={{ width: '180px', position: 'relative', overflow: 'hidden', backgroundImage: 'url(https://dvexdev.github.io/DveX.Images/compass.png)', backgroundRepeat: 'repeat', backgroundSize: '360px 32px', display: 'flex', justifyContent: 'center', backgroundPositionX: direction }}><img src="https://dvexdev.github.io/DveX.Images/compass-marker.png" alt="" style={{ height: '12px' }}></img></div>

                            <div style={{ flex: '1 1 0%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0px 16px', textAlign: 'left', opacity: showRoadNames && streetNamesEnabled ? '1' : '0' }}>
                                <Typography style={{ textShadow: 'rgb(55, 71, 79) -1px 1px 0px, rgb(55, 71, 79) 1px 1px 0px, rgb(55, 71, 79) 1px -1px 0px, rgb(55, 71, 79) -1px -1px 0px', fontFamily: 'Arial, Helvetica, sans-serif', letterSpacing: '0px', fontWeight: 600, textDecoration: 'none', fontStyle: 'normal', fontVariant: 'small-caps', textTransform: 'none', width: '100%' }} variant="body1" gutterBottom>{street}</Typography>
                            </div>
                        </div>
                    </div>
                </div>
            </Grid>

            <Grid container className={classes.root} style={{ display: showCrosshair ? '' : 'none', justifyContent: 'center', alignItems: 'center' }}>
                <div className="hud.crosshair-app-wrapper" style={{ position: 'absolute', background: 'white', boxShadow: '0 0 5px black', border: '0.5px solid black', borderRadius: '50%', top: '50%', left: '50%', width: '7px', height: '7px', pointerEvents: 'none', placeContent: 'center', color: 'white' }}></div>
            </Grid>

            <Grid container className={classes.root} style={{ display: showSettings ? '' : 'none', justifyContent: 'center', alignItems: 'center' }}>
                <div className="hud-settings-container">
                    <div className="hud-settings-sidebar">
                        <div onClick={() => setCurTab(1)} className="hud-settings-sidebar-tab" style={{ backgroundColor: curTab === 1 ? 'rgb(34, 40, 49)' : 'rgb(48, 71, 94)' }}>
                            <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body1" gutterBottom>HUD
                            </Typography>
                        </div>
                        <div onClick={() => setCurTab(2)} className="hud-settings-sidebar-tab null" style={{ backgroundColor: curTab === 2 ? 'rgb(34, 40, 49)' : 'rgb(48, 71, 94)' }}>
                            <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body1" gutterBottom>Phone
                            </Typography>
                        </div>
                        <div onClick={() => setCurTab(3)} className="hud-settings-sidebar-tab null" style={{ backgroundColor: curTab === 3 ? 'rgb(34, 40, 49)' : 'rgb(48, 71, 94)' }}>
                            <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body1" gutterBottom>Audio
                            </Typography>
                        </div>
                        <div onClick={() => setCurTab(4)} className="hud-settings-sidebar-tab null" style={{ backgroundColor: curTab === 4 ? 'rgb(34, 40, 49)' : 'rgb(48, 71, 94)' }}>
                            <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body1" gutterBottom>Help
                            </Typography>
                        </div>
                    </div>
                    <div className="hud-settings-body">
                        <div className="hud-settings-hud-container" style={{ display: curTab === 1 ? 'flex' : 'none' }}>
                            <div>
                                <div className="hud-row-double">
                                    <div className="hud-row">
                                        <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="h6" gutterBottom>Preset
                                        </Typography>
                                        <FormControl className="formControlClass" variant="standard" fullWidth>
                                            <InputLabel id="demo-simple-select-label">Number</InputLabel>
                                            <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Number"
                                                defaultValue="3"
                                                value={radioChannelVisibility}
                                                onChange={(e) => setRadioChannelVisibility(e.target.value)}
                                            >
                                                <MenuItem value="1">1</MenuItem>
                                                <MenuItem value="2">2</MenuItem>
                                            </Select>
                                        </FormControl>

                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <div>
                                            <Button onClick={saveHudSettings} size="small" color="success" variant="contained">Save</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="h6" gutterBottom>Misc
                                </Typography>
                                <div className="hud-row">
                                    <FormGroup className="jss255">
                                        <FormControlLabel control={<Checkbox color="warning" checked={circleTaskbarEnabled} onChange={(e) => setCircleTaskbarEnabled(e.target.checked)} />} label="Enable Circle Taskbar" />
                                    </FormGroup>
                                </div>
                            </div>
                            <hr />
                            <div>
                                <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="h6" gutterBottom>Status
                                </Typography>
                                <div className="hud-row">
                                    <div className="hud-row-double">
                                        <div style={{ maxWidth: '35%' }}>
                                            <FormGroup className="jss255">
                                                <FormControlLabel control={<Checkbox color="warning" checked={showHealth} onChange={(e) => updateShowHealth(e.target.checked)} />} label="Show Health" />
                                            </FormGroup>
                                        </div>
                                        <div className="input-wrapper" style={{ display: showHealth ? '' : 'none' }}>
                                            <FormControl fullWidth sx={{ width: '100%' }}>
                                                <TextField
                                                    sx={{
                                                        "& .MuiInput-root": {
                                                            color: "white !important",
                                                        },
                                                        "& label.Mui-focused": {
                                                            color: "darkgray !important"
                                                        },
                                                        "& Mui-focused": {
                                                            color: "darkgray !important"
                                                        },
                                                        "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                                                            borderColor: "white !important"
                                                        },
                                                        "& .MuiInput-underline:before": {
                                                            borderColor: "darkgray !important",
                                                            color: "darkgray !important"
                                                        },
                                                        "& .MuiInput-underline:after": {
                                                            borderColor: "white !important",
                                                            color: "darkgray !important"
                                                        },
                                                        "& .Mui-focused:after": {
                                                            color: "darkgray !important",
                                                        },
                                                        "& .MuiInputAdornment-root": {
                                                            color: "darkgray !important",
                                                        }
                                                    }}
                                                    id="input-with-icon-textfield"
                                                    label="Hide when more than... (100 = never hide)"
                                                    variant="standard"
                                                    value={inputHealthValue}
                                                    onChange={(e) => setInputHealthValue(Number(e.target.value))}
                                                    onKeyDown={(e) => updateHealthValue(e, true)}
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <i className="fas fa-percent"></i>
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            </FormControl>
                                        </div>
                                    </div>
                                </div>
                                <div className="hud-row">
                                    <div className="hud-row-double">
                                        <div style={{ maxWidth: '35%' }}>
                                            <FormGroup className="jss255">
                                                <FormControlLabel control={<Checkbox color="warning" checked={showArmor} onChange={(e) => updateShowArmor(e.target.checked)} />} label="Show Armor" />
                                            </FormGroup>
                                        </div>
                                        <div className="input-wrapper" style={{ display: showArmor ? '' : 'none' }}>
                                            <FormControl fullWidth sx={{ width: '100%' }}>
                                                <TextField
                                                    sx={{
                                                        "& .MuiInput-root": {
                                                            color: "white !important",
                                                        },
                                                        "& label.Mui-focused": {
                                                            color: "darkgray !important"
                                                        },
                                                        "& Mui-focused": {
                                                            color: "darkgray !important"
                                                        },
                                                        "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                                                            borderColor: "white !important"
                                                        },
                                                        "& .MuiInput-underline:before": {
                                                            borderColor: "darkgray !important",
                                                            color: "darkgray !important"
                                                        },
                                                        "& .MuiInput-underline:after": {
                                                            borderColor: "white !important",
                                                            color: "darkgray !important"
                                                        },
                                                        "& .Mui-focused:after": {
                                                            color: "darkgray !important",
                                                        },
                                                        "& .MuiInputAdornment-root": {
                                                            color: "darkgray !important",
                                                        }
                                                    }}
                                                    id="input-with-icon-textfield"
                                                    label="Hide when more than... (100 = never hide)"
                                                    variant="standard"
                                                    value={inputArmorValue}
                                                    onChange={(e) => setInputArmorValue(Number(e.target.value))}
                                                    onKeyDown={(e) => updateArmorValue(e, true)}
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <i className="fas fa-percent"></i>
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            </FormControl>
                                        </div>
                                    </div>
                                </div>
                                <div className="hud-row">
                                    <div className="hud-row-double">
                                        <div style={{ maxWidth: '35%' }}>
                                            <FormGroup className="jss255">
                                                <FormControlLabel control={<Checkbox color="warning" checked={showHunger} onChange={(e) => updateShowHunger(e.target.checked)} />} label="Show Food" />
                                            </FormGroup>
                                        </div>
                                        <div className="input-wrapper" style={{ display: showHunger ? '' : 'none' }}>
                                            <FormControl fullWidth sx={{ width: '100%' }}>
                                                <TextField
                                                    sx={{
                                                        "& .MuiInput-root": {
                                                            color: "white !important",
                                                        },
                                                        "& label.Mui-focused": {
                                                            color: "darkgray !important"
                                                        },
                                                        "& Mui-focused": {
                                                            color: "darkgray !important"
                                                        },
                                                        "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                                                            borderColor: "white !important"
                                                        },
                                                        "& .MuiInput-underline:before": {
                                                            borderColor: "darkgray !important",
                                                            color: "darkgray !important"
                                                        },
                                                        "& .MuiInput-underline:after": {
                                                            borderColor: "white !important",
                                                            color: "darkgray !important"
                                                        },
                                                        "& .Mui-focused:after": {
                                                            color: "darkgray !important",
                                                        },
                                                        "& .MuiInputAdornment-root": {
                                                            color: "darkgray !important",
                                                        }
                                                    }}
                                                    id="input-with-icon-textfield"
                                                    label="Hide when more than... (100 = never hide)"
                                                    variant="standard"
                                                    value={inputHungerValue}
                                                    onChange={(e) => setInputHungerValue(Number(e.target.value))}
                                                    onKeyDown={(e) => updateHungerValue(e, true)}
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <i className="fas fa-percent"></i>
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            </FormControl>
                                        </div>
                                    </div>
                                </div>
                                <div className="hud-row">
                                    <div className="hud-row-double">
                                        <div style={{ maxWidth: '35%' }}>
                                            <FormGroup className="jss255">
                                                <FormControlLabel control={<Checkbox color="warning" checked={showThirst} onChange={(e) => updateShowThirst(e.target.checked)} />} label="Show Water" />
                                            </FormGroup>
                                        </div>
                                        <div className="input-wrapper" style={{ display: showThirst ? '' : 'none' }}>
                                            <FormControl fullWidth sx={{ width: '100%' }}>
                                                <TextField
                                                    sx={{
                                                        "& .MuiInput-root": {
                                                            color: "white !important",
                                                        },
                                                        "& label.Mui-focused": {
                                                            color: "darkgray !important"
                                                        },
                                                        "& Mui-focused": {
                                                            color: "darkgray !important"
                                                        },
                                                        "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                                                            borderColor: "white !important"
                                                        },
                                                        "& .MuiInput-underline:before": {
                                                            borderColor: "darkgray !important",
                                                            color: "darkgray !important"
                                                        },
                                                        "& .MuiInput-underline:after": {
                                                            borderColor: "white !important",
                                                            color: "darkgray !important"
                                                        },
                                                        "& .Mui-focused:after": {
                                                            color: "darkgray !important",
                                                        },
                                                        "& .MuiInputAdornment-root": {
                                                            color: "darkgray !important",
                                                        }
                                                    }}
                                                    id="input-with-icon-textfield"
                                                    label="Hide when more than... (100 = never hide)"
                                                    variant="standard"
                                                    value={inputThirstValue}
                                                    onChange={(e) => setInputThirstValue(Number(e.target.value))}
                                                    onKeyDown={(e) => updateThirstValue(e, true)}
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <i className="fas fa-percent"></i>
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            </FormControl>
                                        </div>
                                    </div>
                                </div>
                                <div className="hud-row">
                                    <div className="hud-row-double">
                                        <FormGroup className="jss255">
                                            <FormControlLabel control={<Checkbox color="warning" checked={showStress} onChange={(e) => updateShowStress(e.target.checked)} />} label="Show Stress when relevant" />
                                        </FormGroup>
                                        <FormGroup className="jss255">
                                            <FormControlLabel control={<Checkbox color="warning" checked={showOxygen} onChange={(e) => updateShowOxygen(e.target.checked)} />} label="Show Oxygen when relevant" />
                                        </FormGroup>
                                        <FormGroup className="jss255">
                                            <FormControlLabel control={<Checkbox color="warning" checked={hideEnhancements} onChange={(e) => updateHideEnhancements(e.target.checked)} />} label="Hide Enhancements" />
                                        </FormGroup>
                                    </div>
                                </div>
                                <div className="hud-row">
                                    <FormControl className="formControlClass" variant="standard" fullWidth>
                                        <InputLabel id="demo-simple-select-label">Radio Channel Visibility</InputLabel>
                                        <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Radio Channel Visibility"
                                            defaultValue="3"
                                            value={radioChannelVisibility}
                                            onChange={(e) => setRadioChannelVisibility(e.target.value)}
                                        >
                                            <MenuItem value="1">Never</MenuItem>
                                            <MenuItem value="2">Always</MenuItem>
                                            <MenuItem value="3">Relevant</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>
                            <hr />
                            <div>
                                <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="h6" gutterBottom>Vehicle
                                </Typography>
                                <div className="hud-row">
                                    <div className="jss1417 hud-row-double">
                                        <div>
                                            <FormGroup className="jss255">
                                                <FormControlLabel control={<Checkbox color="warning" checked={minimapEnabled} onChange={(e) => setMinimapEnabled(e.target.checked)} />} label="Minimap Enabled" />
                                            </FormGroup>
                                        </div>
                                        {/*<div style={{ display: minimapEnabled ? '' : 'none' }}>
                                            <FormControl className="formControlClass" variant="standard" fullWidth>
                                                <InputLabel id="demo-simple-select-label">Speedometer FPS</InputLabel>
                                                <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Speedometer FPS"
                                                    defaultValue="16"
                                                    value={speedometerFps}
                                                    onChange={(e) => setSpeedometerFps(e.target.value)}
                                                >
                                                    <MenuItem value="64">15</MenuItem>
                                                    <MenuItem value="32">30</MenuItem>
                                                    <MenuItem value="24">45</MenuItem>
                                                    <MenuItem value="16">60</MenuItem>
                                                </Select>
                                            </FormControl>
                                            <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>The higher the FPS, the more demanding this is on your
                                                machine
                                            </Typography>
                                        </div>*/}
                                    </div>
                                    <div className="jss1418 hud-row">
                                        <FormGroup className="jss255">
                                            <FormControlLabel control={<Checkbox color="warning" checked={defaultMinimap} onChange={(e) => setDefaultMinimap(e.target.checked)} />} label="Use Default Minimap (may require game restart)" />
                                        </FormGroup>
                                    </div>
                                    <div className="jss1418 hud-row">
                                        <FormGroup className="jss255">
                                            <FormControlLabel control={<Checkbox color="warning" checked={minimapOutline} onChange={(e) => setMinimapOutline(e.target.checked)} />} label="Show Minimap Outline" />
                                        </FormGroup>
                                    </div>
                                </div>
                                {/*
                                <div className="hud-row">
                                    <FormGroup className="jss255">
                                        <FormControlLabel control={<Checkbox color="warning" />} label="Show Harness durability" />
                                    </FormGroup>
                                </div>
                                */}
                                {/*
                                <div className="hud-row">
                                    <div className="jss1417 hud-row-double">
                                        <FormGroup className="jss255">
                                            <FormControlLabel control={<Checkbox color="warning" />} label="Show Nitrous levels" />
                                        </FormGroup>
                                        <FormGroup className="jss255">
                                            <FormControlLabel control={<Checkbox color="warning" />} label="Show Nitrous trail" />
                                        </FormGroup>
                                    </div>
                                </div>
                                */}
                            </div>
                            <hr />
                            <div>
                                <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="h6" gutterBottom>Compass
                                </Typography>
                                <div className="hud-row">
                                    <div className="jss1417 hud-inner-row">
                                        <div>
                                            <FormGroup className="jss255">
                                                <FormControlLabel control={<Checkbox color="warning" checked={compassEnabled} onChange={(e) => setCompassEnabled(e.target.checked)} />} label="Enabled" />
                                            </FormGroup>
                                            <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>Disabling the compass entirely can vastly improve
                                                performance
                                            </Typography>
                                        </div>
                                        <div style={{ display: compassEnabled ? '' : 'none' }}>
                                            <FormControl className="formControlClass" variant="standard" fullWidth>
                                                <InputLabel id="demo-simple-select-label">Compass FPS</InputLabel>
                                                <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Compass FPS"
                                                    defaultValue="16"
                                                    value={compassFps}
                                                    onChange={(e) => setCompassFps(e.target.value)}
                                                >
                                                    <MenuItem value="64">15</MenuItem>
                                                    <MenuItem value="32">30</MenuItem>
                                                    <MenuItem value="24">45</MenuItem>
                                                    <MenuItem value="16">60</MenuItem>
                                                </Select>
                                            </FormControl>
                                            <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>The higher the FPS, the more demanding this is on your
                                                machine
                                            </Typography>
                                        </div>
                                    </div>
                                </div>
                                {/*
                                <div className="hud-row">
                                    <FormGroup className="jss255">
                                        <FormControlLabel control={<Checkbox color="warning" />} label="Show the current time with the compass" />
                                    </FormGroup>
                                </div>
                                */}
                                <div className="hud-row">
                                    <FormGroup className="jss255">
                                        <FormControlLabel control={<Checkbox color="warning" checked={streetNamesEnabled} onChange={(e) => setStreetNamesEnabled(e.target.checked)} />} label="Show street names when in a vehicle" />
                                    </FormGroup>
                                    <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>Disabling this can help improve performance
                                    </Typography>
                                </div>
                            </div>
                            <hr />
                            <div>
                                <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="h6" gutterBottom>Black Bars
                                </Typography>
                                <div className="hud-row">
                                    <FormGroup className="jss255">
                                        <FormControlLabel control={<Checkbox color="warning" checked={blackbarsEnabled} onChange={(e) => setBlackbarsEnabled(e.target.checked)} />} label="Enabled" />
                                    </FormGroup>
                                </div>
                                <div className="hud-row">
                                    <div className="input-wrapper">
                                        <FormControl fullWidth sx={{ width: '100%' }}>
                                            <TextField
                                                sx={{
                                                    "& .MuiInput-root": {
                                                        color: "white !important",
                                                    },
                                                    "& label.Mui-focused": {
                                                        color: "darkgray !important"
                                                    },
                                                    "& Mui-focused": {
                                                        color: "darkgray !important"
                                                    },
                                                    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                                                        borderColor: "white !important"
                                                    },
                                                    "& .MuiInput-underline:before": {
                                                        borderColor: "darkgray !important",
                                                        color: "darkgray !important"
                                                    },
                                                    "& .MuiInput-underline:after": {
                                                        borderColor: "white !important",
                                                        color: "darkgray !important"
                                                    },
                                                    "& .Mui-focused:after": {
                                                        color: "darkgray !important",
                                                    },
                                                    "& .MuiInputAdornment-root": {
                                                        color: "darkgray !important",
                                                    }
                                                }}
                                                id="input-with-icon-textfield"
                                                label="Percentage of screen"
                                                variant="standard"
                                                value={blackbarsValue}
                                                onChange={(e) => setBlackbarsValue(e.target.value)}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <i className="fas fa-mask fa-w-20 fa-fw"></i>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </FormControl>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div>
                                <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="h6" gutterBottom>Crosshair
                                </Typography>
                                <div className="hud-row">
                                    <FormGroup className="jss255">
                                        <FormControlLabel control={<Checkbox color="warning" checked={crosshair} onChange={(e) => setCrosshair(e.target.checked)} />} label="Enabled" />
                                    </FormGroup>
                                </div>
                            </div>
                        </div>
                        <div className="hud-settings-phone-container" style={{ display: curTab === 2 ? 'flex' : 'none' }}>
                            <div>
                                <div className="hud-row-double">
                                    <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="h6" gutterBottom>Misc
                                    </Typography>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <div>
                                            <Button onClick={saveHudSettings} size="small" color="success" variant="contained">Save</Button>
                                        </div>
                                    </div>
                                </div>
                                <div className="hud-row">
                                    <FormControl className="formControlClass" variant="standard" fullWidth>
                                        <InputLabel id="demo-simple-select-label">Brand</InputLabel>
                                        <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Brand"
                                            defaultValue="android"
                                            value={phoneBrand}
                                            onChange={(e) => setPhoneBrand(e.target.value)}
                                        >
                                            <MenuItem value="ios">iOS</MenuItem>
                                            <MenuItem value="android">Android</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="hud-row">
                                    <div className="input-wrapper">
                                        <FormControl fullWidth sx={{ width: '100%' }}>
                                            <TextField
                                                sx={{
                                                    "& .MuiInput-root": {
                                                        color: "white !important",
                                                    },
                                                    "& label.Mui-focused": {
                                                        color: "darkgray !important"
                                                    },
                                                    "& Mui-focused": {
                                                        color: "darkgray !important"
                                                    },
                                                    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                                                        borderColor: "white !important"
                                                    },
                                                    "& .MuiInput-underline:before": {
                                                        borderColor: "darkgray !important",
                                                        color: "darkgray !important"
                                                    },
                                                    "& .MuiInput-underline:after": {
                                                        borderColor: "white !important",
                                                        color: "darkgray !important"
                                                    },
                                                    "& .Mui-focused:after": {
                                                        color: "darkgray !important",
                                                    },
                                                    "& .MuiInputAdornment-root": {
                                                        color: "darkgray !important",
                                                    }
                                                }}
                                                id="input-with-icon-textfield"
                                                label="Background URL (1:2.2 res)"
                                                variant="standard"
                                                value={phoneBackground}
                                                onChange={(e) => setPhoneBackground(e.target.value)}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <i className="fas fa-images fa-w-20 fa-fw"></i>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </FormControl>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div>
                                <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="h6" gutterBottom>Notifications
                                </Typography>
                                <div className="hud-row">
                                    <FormGroup className="jss255">
                                        <FormControlLabel control={<Checkbox color="warning" checked={phoneReceiveSMS} onChange={(e) => setPhoneReceiveSMS(e.target.checked)} />} label="Receive SMS" />
                                    </FormGroup>
                                </div>
                                <div className="hud-row">
                                    <FormGroup className="jss255">
                                        <FormControlLabel control={<Checkbox color="warning" checked={phoneNewTweet} onChange={(e) => setPhoneNewTweet(e.target.checked)} />} label="New Tweet" />
                                    </FormGroup>
                                </div>
                                <div className="hud-row">
                                    <FormGroup className="jss255">
                                        <FormControlLabel control={<Checkbox color="warning" checked={phoneReceiveEmail} onChange={(e) => setPhoneReceiveEmail(e.target.checked)} />} label="Receive Email" />
                                    </FormGroup>
                                </div>
                            </div>
                            <hr />
                            <div>
                                <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="h6" gutterBottom>Images
                                </Typography>
                                <div className="hud-row">
                                    <FormGroup className="jss255">
                                        <FormControlLabel control={<Checkbox color="warning" checked={phoneEmbeddedImages} onChange={(e) => setPhoneEmbeddedImages(e.target.checked)} />} label="Embedded Images Enabled" />
                                    </FormGroup>
                                </div>
                            </div>
                        </div>
                        <div className="hud-settings-phone-container" style={{ display: curTab === 3 ? 'flex' : 'none' }}>
                            <div className="hud-row-double">
                                <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="h6" gutterBottom>Misc
                                </Typography>
                                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <div>
                                        <Button onClick={saveHudSettings} size="small" color="success" variant="contained">Save</Button>
                                    </div>
                                </div>
                            </div>
                            <div>

                                <div className="hud-row">
                                    <FormGroup className="jss255">
                                        <FormControlLabel control={<Checkbox color="warning" checked={RadioClicksOutgoing} onChange={(e) => setRadioClicksOutgoing(e.target.checked)} />} label="VoIP: Radio Clicks (Outgoing)" />
                                    </FormGroup>
                                </div>
                                <div className="hud-row">
                                    <FormGroup className="jss255">
                                        <FormControlLabel control={<Checkbox color="warning" checked={RadioClicksIncoming} onChange={(e) => setRadioClicksIncoming(e.target.checked)} />} label="VoIP: Radio Clicks (Incoming)" />
                                    </FormGroup>
                                </div>
                            </div>
                            <hr />
                            <div>
                                <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="h6" gutterBottom>Volume
                                </Typography>

                                <Typography style={{ color: '#fff', fontWeight: 'normal', fontSize: '15px', wordBreak: 'break-word' }} variant="h6" gutterBottom>Radio
                                </Typography>
                                <Slider
                                    size="small"
                                    defaultValue={RadioVolume}
                                    onChange={(event: Event, newValue: number | number[]) => {
                                        if (typeof newValue === 'number') {
                                            setRadioVolume(newValue)
                                        }
                                      }}
                                    step={10}
                                    min={0}
                                    max={100}                                  
                                />
                            
                                <Typography style={{ color: '#fff', fontWeight: 'normal', fontSize: '15px', wordBreak: 'break-word' }} variant="h6" gutterBottom>Radio Clicks
                                </Typography>
                                <Slider
                                    size="small"
                                    defaultValue={RadioClicksVolume}
                                    onChange={(event: Event, newValue: number | number[]) => {
                                        if (typeof newValue === 'number') {
                                            setRadioClicksVolume(newValue)
                                        }
                                      }}
                                    step={10}
                                    min={0}
                                    max={100}                                  
                                />
                                <Typography style={{ color: '#fff', fontWeight: 'normal', fontSize: '15px', wordBreak: 'break-word' }} variant="h6" gutterBottom>Phone
                                </Typography>
                                <Slider
                                    size="small"
                                    defaultValue={PhoneVolume}
                                    onChange={(event: Event, newValue: number | number[]) => {
                                        if (typeof newValue === 'number') {
                                          setPhoneVolume(newValue)
                                        }
                                      }}
                                    step={10}
                                    min={0}
                                    max={100}                                  
                                />
                            </div>
                        </div>
                        <div className="hud-settings-phone-container" style={{ display: curTab === 4 ? 'flex' : 'none' }}>
                            <div>
                                <div style={{
                                    padding: 16,
                                    backgroundColor: '#30475e',
                                    marginBottom: 16,
                                }}><Typography style={{ color: '#fff', fontWeight: 'normal', fontSize: '15px', wordBreak: 'break-word' }} variant="h6" gutterBottom>
                                    FPS Capping for UI lag:
                                    <br />
                                    <br />
                                    https://www.nopixel.net/upload/index.php?threads/fps-capping-for-improved-ui-performance.158070/
                                </Typography></div>
                            </div>
                            <div>
                                <div style={{
                                    padding: 16,
                                    backgroundColor: '#30475e',
                                    marginBottom: 16,
                                }}><Typography style={{ color: '#fff', fontWeight: 'normal', fontSize: '15px', wordBreak: 'break-word' }} variant="h6" gutterBottom>
                                    Finding your Windows Communication Device
                                    <br />
                                    <br />
                                    https://www.nopixel.net/upload/index.php?threads/proper-mic-settings-for-nopixel-3-0-radio-phone.158075/
                                </Typography></div>
                            </div>
                            
                           
                        </div>
                    </div>
                </div>
            </Grid>

            <Grid container className={classes.root}>
                <div className={classes.hudOuterContainer} style={{ display: showHud ? 'flex' : 'none' }}>

                    <div className={classes.vehicleHudContainer} style={{ display: showCarHud ? '' : 'none' }}>
                        <div className="waypointDistContainer" style={{ display: waypointActive ? '' : 'none' }}>
                            <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body1" gutterBottom>{waypointDistance} mi</Typography>
                        </div>
                        <div className={classes.minimapBorder} style={{ display: defaultMinimap || !minimapEnabled || !minimapOutline ? 'none' : '' }}></div>
                        <div className="vehicleHud" style={{ display: minimapEnabled ? 'flex' : 'none', left: defaultMinimap ? 'calc(16.375vw)' : 'calc(14.375vw)' }}>
                            <div className="speedoMeterContainer">
                                <div className="speedoMeter">
                                    <div className="speedoMeterInner">
                                        <div className="speedoMeterSvg">
                                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ height: '62px', width: '62px', transform: 'rotate(120deg)' }}>
                                                <circle r="27" cx="31" cy="31" fill="transparent" stroke="#9E9E9E" stroke-width="6" stroke-dasharray="169.64600329384882" stroke-dashoffset="56.54866776461626" />
                                            </svg>
                                        </div>
                                        <div className="speedoMeterSvg">
                                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ height: '62px', width: '62px', transform: 'rotate(120deg)' }}>
                                                <circle r="27" cx="31" cy="31" fill="transparent" stroke="white" stroke-width="6" stroke-dasharray={speedDashArray} stroke-dashoffset={speedDashOffset} />
                                            </svg>
                                        </div>
                                        <div className="speedoMeterSpeed" style={{ marginTop: '-6px' }}>
                                            <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>{speed}</Typography>
                                        </div>
                                        <div className="speedoMeterMph" style={{ marginTop: '-12px' }}>
                                            <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>mph</Typography>
                                        </div>
                                    </div>
                                </div>
                                <div className="fuelPump">
                                    <div className="fuelPumpInner">
                                        <div className="fuelPumpSvg">
                                            <svg style={{ height: '32px', width: '32px', transform: 'rotate(150deg)' }}>
                                                <circle r="13.5" cx="16" cy="16" fill="transparent" stroke="#9E9E9E" stroke-width="3" stroke-dasharray="84.82300164692441" stroke-dashoffset="28.27433388230813" />
                                            </svg>
                                        </div>
                                        <div className="fuelPumpSvg">
                                            <svg style={{ height: '32px', width: '32px', transform: 'rotate(150deg)' }}>
                                                <circle r="13.5" cx="16" cy="16" fill="transparent" stroke={fuelColor} stroke-width="3" stroke-dasharray={fuelDashArray} stroke-dashoffset={fuelDashOffset} />
                                            </svg>
                                        </div>
                                        <div className="fuelPumpIcon" style={{ marginTop: '0px' }}>
                                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="gas-pump" className="svg-inline--fa fa-gas-pump fa-w-16 fa-fw fa-2x " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M336 448H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h320c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm157.2-340.7l-81-81c-6.2-6.2-16.4-6.2-22.6 0l-11.3 11.3c-6.2 6.2-6.2 16.4 0 22.6L416 97.9V160c0 28.1 20.9 51.3 48 55.2V376c0 13.2-10.8 24-24 24s-24-10.8-24-24v-32c0-48.6-39.4-88-88-88h-8V64c0-35.3-28.7-64-64-64H96C60.7 0 32 28.7 32 64v352h288V304h8c22.1 0 40 17.9 40 40v27.8c0 37.7 27 72 64.5 75.9 43 4.3 79.5-29.5 79.5-71.7V152.6c0-17-6.8-33.3-18.8-45.3zM256 192H96V64h160v128z"></path></svg>
                                        </div>
                                        <div className="fuelPumpAlt" style={{ marginTop: '0px' }}>
                                            <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom></Typography>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="altContainer" style={{ display: showAltitude ? '' : 'none' }}>
                                <div className="altSvg">
                                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ height: '62px', width: '62px', transform: 'rotate(150deg)' }}>
                                        <circle r="27" cx="31" cy="31" fill="transparent" stroke="#9E9E9E" stroke-width="6" stroke-dasharray="169.64600329384882" stroke-dashoffset="56.54866776461626" />
                                    </svg>
                                </div>
                                <div className="altSvg">
                                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ height: '62px', width: '62px', transform: 'rotate(150deg)' }}>
                                        <circle r="27" cx="31" cy="31" fill="transparent" stroke="white" stroke-width="6" stroke-dasharray={altDashArray} stroke-dashoffset={altDashOffset} />
                                    </svg>
                                </div>
                                <div className="altSpeed" style={{ marginTop: '-6px' }}>
                                    <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>{alt}</Typography>
                                </div>
                                <div className="altAlt" style={{ marginTop: '-12px' }}>
                                    <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>alt</Typography>
                                </div>
                            </div>
                            <div className="seatBeltIcon" style={{ display: showBelt ? '' : 'none' }}>
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user-slash" className="svg-inline--fa fa-user-slash fa-w-20 fa-fw fa-lg " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" style={{ color: 'rgb(216, 67, 21)' }}><path fill="currentColor" d="M633.8 458.1L362.3 248.3C412.1 230.7 448 183.8 448 128 448 57.3 390.7 0 320 0c-67.1 0-121.5 51.8-126.9 117.4L45.5 3.4C38.5-2 28.5-.8 23 6.2L3.4 31.4c-5.4 7-4.2 17 2.8 22.4l588.4 454.7c7 5.4 17 4.2 22.5-2.8l19.6-25.3c5.4-6.8 4.1-16.9-2.9-22.3zM96 422.4V464c0 26.5 21.5 48 48 48h350.2L207.4 290.3C144.2 301.3 96 356 96 422.4z"></path></svg>
                            </div>
                            <div className="engineDamagedIcon" style={{ display: showEngineDamage ? '' : 'none' }}>
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="oil-can" className="svg-inline--fa fa-oil-can fa-w-20 fa-fw fa-lg " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" style={{ color: 'rgb(216, 67, 21)' }}><path fill="currentColor" d="M629.8 160.31L416 224l-50.49-25.24a64.07 64.07 0 0 0-28.62-6.76H280v-48h56c8.84 0 16-7.16 16-16v-16c0-8.84-7.16-16-16-16H176c-8.84 0-16 7.16-16 16v16c0 8.84 7.16 16 16 16h56v48h-56L37.72 166.86a31.9 31.9 0 0 0-5.79-.53C14.67 166.33 0 180.36 0 198.34v94.95c0 15.46 11.06 28.72 26.28 31.48L96 337.46V384c0 17.67 14.33 32 32 32h274.63c8.55 0 16.75-3.42 22.76-9.51l212.26-214.75c1.5-1.5 2.34-3.54 2.34-5.66V168c.01-5.31-5.08-9.15-10.19-7.69zM96 288.67l-48-8.73v-62.43l48 8.73v62.43zm453.33 84.66c0 23.56 19.1 42.67 42.67 42.67s42.67-19.1 42.67-42.67S592 288 592 288s-42.67 61.77-42.67 85.33z"></path></svg>
                            </div>
                        </div>
                    </div>

                    <div className={classes.hudInnerContainer} style={{ left: defaultMinimap ? '0.4vw' : '0px' }}>
                        {/* Voice */}
                        <div className={classes.hudIconWrapper} style={{ opacity: voiceOpacity, transition: 'all 1s linear 1s', maxWidth: voiceDisplay ? '54px' : '0px', display: voiceDisplay ? 'flex' : 'none' }}>
                            <div className={classes.hudIcon}>
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ height: '48px', width: '48px', transform: 'rotate(-90deg)', zIndex: 100 }}>
                                    <circle r="20" cx="24" cy="24" fill="transparent" stroke={voiceActive ? 'rgb(213, 205, 49)' : voiceActiveRadio ? '#C05D5D' : 'white'} stroke-width="6" stroke-dasharray="125.66370614359172" stroke-dashoffset="0" stroke-opacity="0.35" style={{ transition: 'stroke-dashoffset 400ms linear 0s', willChange: 'transition' }} />
                                </svg>
                            </div>
                            <div className={classes.hudIcon}>
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ height: '48px', width: '48px', transform: 'rotate(-90deg)', zIndex: 200 }}>
                                    <circle r="20" cx="24" cy="24" fill="transparent" stroke={voiceActive ? 'rgb(213, 205, 49)' : voiceActiveRadio ? '#C05D5D' : 'white'} stroke-width="6" stroke-dasharray={voiceArray} stroke-dashoffset={voiceOffset} stroke-opacity="1" style={{ transition: 'stroke-dashoffset 400ms linear 0s', willChange: 'transition' }} />
                                </svg>
                            </div>
                            <div className={classes.hudIcon}>
                                <div className={classes.iconWrapper}>
                                    <i className={`fas ${hasRadio ? 'fa-headset' : 'fa-microphone'} fa-w-11 fa-fw`} style={{ color: hasRadio && radioChannel !== undefined && radioChannel !== "" && displayRadioChannel && radioChannelVisibility !== "1" || hasRadio && radioChannel !== undefined && radioChannel !== "" && radioChannelVisibility === "2" ? 'rgb(96, 96, 96)' : 'white', fontSize: '18px' }}></i>
                                    <div className={classes.radioChannelWrapper} style={{ display: hasRadio && radioChannel !== undefined && radioChannel !== "" && displayRadioChannel && radioChannelVisibility !== "1" || hasRadio && radioChannel !== undefined && radioChannel !== "" && radioChannelVisibility === "2" ? '' : 'none' }}>
                                        <Typography style={{ color: '#fff', fontSize: '11px' }} variant="body1" gutterBottom>{radioChannel}</Typography>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Health */}
                        <div className={classes.hudIconWrapper} style={{ opacity: healthOpacity, transition: 'all 1s linear 1s', maxWidth: healthDisplay ? '54px' : '0px', display: healthDisplay ? 'flex' : 'none' }}>
                            <div className={classes.hudIcon}>
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ height: '48px', width: '48px', transform: 'rotate(-90deg)', zIndex: 100 }}>
                                    <circle r="20" cx="24" cy="24" fill="transparent" stroke={healthRed ? 'red' : '#3BB273'} stroke-width="6" stroke-dasharray="125.66370614359172" stroke-dashoffset="0" stroke-opacity={healthRed ? '1' : '0.35'} style={{ transition: 'stroke-dashoffset 400ms linear 0s', willChange: 'transition' }} />
                                </svg>
                            </div>
                            <div className={classes.hudIcon}>
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ height: '48px', width: '48px', transform: 'rotate(-90deg)', zIndex: 200 }}>
                                    <circle r="20" cx="24" cy="24" fill="transparent" stroke="#3BB273" stroke-width="6" stroke-dasharray={healthArray} stroke-dashoffset={healthOffset} stroke-opacity="1" style={{ transition: 'stroke-dashoffset 400ms linear 0s', willChange: 'transition' }} />
                                </svg>
                            </div>
                            <div className={classes.hudIcon}>
                                <div className={classes.iconWrapper}>
                                    <i className="fas fa-heart fa-w-16 fa-fw" style={{ color: 'white', fontSize: '18px' }}></i>
                                </div>
                            </div>
                        </div>

                        {/* Mana */}
                        <div className={classes.hudIconWrapper} style={{ opacity: manaOpacity, transition: 'all 1s linear 1s', maxWidth: manaDisplay ? '54px' : '0px', display: manaDisplay ? 'flex' : 'none' }}>
                            <div className={classes.hudIcon}>
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ height: '48px', width: '48px', transform: 'rotate(-90deg)', zIndex: 100 }}>
                                    <circle r="20" cx="24" cy="24" fill="transparent" stroke="#33B8C1" stroke-width="6" stroke-dasharray="125.66370614359172" stroke-dashoffset="0" stroke-opacity="0.35" style={{ transition: 'stroke-dashoffset 400ms linear 0s', willChange: 'transition' }} />
                                </svg>
                            </div>
                            <div className={classes.hudIcon}>
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ height: '48px', width: '48px', transform: 'rotate(-90deg)', zIndex: 200 }}>
                                    <circle r="20" cx="24" cy="24" fill="transparent" stroke="#33B8C1" stroke-width="6" stroke-dasharray={manaArray} stroke-dashoffset={manaOffset} stroke-opacity="1" style={{ transition: 'stroke-dashoffset 400ms linear 0s', willChange: 'transition' }} />
                                </svg>
                            </div>
                            <div className={classes.hudIcon}>
                                <div className={classes.iconWrapper}>
                                    <i className="fas fa-burn fa-w-12 fa-fw" style={{ color: 'white', fontSize: '18px' }}></i>
                                </div>
                            </div>
                        </div>

                        {/* Armor */}
                        <div className={classes.hudIconWrapper} style={{ opacity: armorOpacity, transition: 'all 1s linear 1s', maxWidth: armorDisplay ? '54px' : '0px', display: armorDisplay ? 'flex' : 'none' }}>
                            <div className={classes.hudIcon}>
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ height: '48px', width: '48px', transform: 'rotate(-90deg)', zIndex: 100 }}>
                                    <circle r="20" cx="24" cy="24" fill="transparent" stroke={armorRed ? 'red' : '#1565C0'} stroke-width="6" stroke-dasharray="125.66370614359172" stroke-dashoffset="0" stroke-opacity={armorRed ? '1' : '0.35'} style={{ transition: 'stroke-dashoffset 400ms linear 0s', willChange: 'transition' }} />
                                </svg>
                            </div>
                            <div className={classes.hudIcon}>
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ height: '48px', width: '48px', transform: 'rotate(-90deg)', zIndex: 200 }}>
                                    <circle r="20" cx="24" cy="24" fill="transparent" stroke="#1565C0" stroke-width="6" stroke-dasharray={armorArray} stroke-dashoffset={armorOffset} stroke-opacity="1" style={{ transition: 'stroke-dashoffset 400ms linear 0s', willChange: 'transition' }} />
                                </svg>
                            </div>
                            <div className={classes.hudIcon}>
                                <div className={classes.iconWrapper}>
                                    <i className="fas fa-shield-alt fa-w-16 fa-fw" style={{ color: 'white', fontSize: '18px' }}></i>
                                </div>
                            </div>
                        </div>

                        {/* Hunger */}
                        <div className={classes.hudIconWrapper} style={{ opacity: hungerOpacity, transition: 'all 1s linear 1s', maxWidth: hungerDisplay ? '54px' : '0px', display: hungerDisplay ? 'flex' : 'none' }}>
                            <div className={classes.hudIcon}>
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ height: '48px', width: '48px', transform: 'rotate(-90deg)', zIndex: 100 }}>
                                    <circle r="20" cx="24" cy="24" fill="transparent" stroke={hungerRed ? 'red' : '#FF6D00'} stroke-width="6" stroke-dasharray="125.66370614359172" stroke-dashoffset="0" stroke-opacity={hungerRed ? '1' : '0.35'} style={{ transition: 'stroke-dashoffset 400ms linear 0s', willChange: 'transition' }} />
                                </svg>
                            </div>
                            <div className={classes.hudIcon}>
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ height: '48px', width: '48px', transform: 'rotate(-90deg)', zIndex: 200 }}>
                                    <circle r="20" cx="24" cy="24" fill="transparent" stroke="#FF6D00" stroke-width="6" stroke-dasharray={hungerArray} stroke-dashoffset={hungerOffset} stroke-opacity="1" style={{ transition: 'stroke-dashoffset 400ms linear 0s', willChange: 'transition' }} />
                                </svg>
                            </div>
                            <div className={classes.hudIcon}>
                                <div className={classes.iconWrapper}>
                                    <i className="fas fa-hamburger fa-w-16 fa-fw" style={{ color: buffedHunger && !hideEnhancements ? '#FFD700' : 'white', fontSize: '18px' }}></i>
                                </div>
                            </div>
                        </div>

                        {/* Thirst */}
                        <div className={classes.hudIconWrapper} style={{ opacity: thirstOpacity, transition: 'all 1s linear 1s', maxWidth: thirstDisplay ? '54px' : '0px', display: thirstDisplay ? 'flex' : 'none' }}>
                            <div className={classes.hudIcon}>
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ height: '48px', width: '48px', transform: 'rotate(-90deg)', zIndex: 100 }}>
                                    <circle r="20" cx="24" cy="24" fill="transparent" stroke={thirstRed ? 'red' : '#0277BD'} stroke-width="6" stroke-dasharray="125.66370614359172" stroke-dashoffset="0" stroke-opacity={thirstRed ? '1' : '0.35'} style={{ transition: 'stroke-dashoffset 400ms linear 0s', willChange: 'transition' }} />
                                </svg>
                            </div>
                            <div className={classes.hudIcon}>
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ height: '48px', width: '48px', transform: 'rotate(-90deg)', zIndex: 200 }}>
                                    <circle r="20" cx="24" cy="24" fill="transparent" stroke="#0277BD" stroke-width="6" stroke-dasharray={thirstArray} stroke-dashoffset={thirstOffset} stroke-opacity="1" style={{ transition: 'stroke-dashoffset 400ms linear 0s', willChange: 'transition' }} />
                                </svg>
                            </div>
                            <div className={classes.hudIcon}>
                                <div className={classes.iconWrapper}>
                                    <i className="fas fa-tint fa-w-11 fa-fw" style={{ color: 'white', fontSize: '18px' }}></i>
                                </div>
                            </div>
                        </div>

                        {/* Oxygen */}
                        <div className={classes.hudIconWrapper} style={{ opacity: oxygenOpacity, transition: 'all 1s linear 1s', maxWidth: oxygenDisplay ? '54px' : '0px', display: oxygenDisplay ? 'flex' : 'none' }}>
                            <div className={classes.hudIcon}>
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ height: '48px', width: '48px', transform: 'rotate(-90deg)', zIndex: 100 }}>
                                    <circle r="20" cx="24" cy="24" fill="transparent" stroke="#90A4AE" stroke-width="6" stroke-dasharray="125.66370614359172" stroke-dashoffset="0" stroke-opacity="0.35" style={{ transition: 'stroke-dashoffset 400ms linear 0s', willChange: 'transition' }} />
                                </svg>
                            </div>
                            <div className={classes.hudIcon}>
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ height: '48px', width: '48px', transform: 'rotate(-90deg)', zIndex: 200 }}>
                                    <circle r="20" cx="24" cy="24" fill="transparent" stroke="#90A4AE" stroke-width="6" stroke-dasharray={oxygenArray} stroke-dashoffset={oxygenOffset} stroke-opacity="1" style={{ transition: 'stroke-dashoffset 400ms linear 0s', willChange: 'transition' }} />
                                </svg>
                            </div>
                            <div className={classes.hudIcon}>
                                <div className={classes.iconWrapper}>
                                    <i className="fas fa-lungs fa-w-20 fa-fw" style={{ color: buffedOxygen && !hideEnhancements ? '#FFD700' : 'white', fontSize: '18px' }}></i>
                                </div>
                            </div>
                        </div>

                        {/* Stress */}
                        <div className={classes.hudIconWrapper} style={{ opacity: stressOpacity, transition: 'all 1s linear 1s', maxWidth: stressDisplay ? '54px' : '0px', display: stressDisplay ? 'flex' : 'none' }}>
                            <div className={classes.hudIcon}>
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ height: '48px', width: '48px', transform: 'rotate(-90deg)', zIndex: 100 }}>
                                    <circle r="20" cx="24" cy="24" fill="transparent" stroke="#d50000" stroke-width="6" stroke-dasharray="125.66370614359172" stroke-dashoffset="0" stroke-opacity="0.35" style={{ transition: 'stroke-dashoffset 400ms linear 0s', willChange: 'transition' }} />
                                </svg>
                            </div>
                            <div className={classes.hudIcon}>
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ height: '48px', width: '48px', transform: 'rotate(-90deg)', zIndex: 200 }}>
                                    <circle r="20" cx="24" cy="24" fill="transparent" stroke="#d50000" stroke-width="6" stroke-dasharray={stressArray} stroke-dashoffset={stressOffset} stroke-opacity="1" style={{ transition: 'stroke-dashoffset 400ms linear 0s', willChange: 'transition' }} />
                                </svg>
                            </div>
                            <div className={classes.hudIcon}>
                                <div className={classes.iconWrapper}>
                                    <i className="fas fa-brain fa-w-18 fa-fw" style={{ color: buffedStress && !hideEnhancements ? '#FFD700' : 'white', fontSize: '18px' }}></i>
                                </div>
                            </div>
                        </div>

                        {/* Intelligence */}
                        <div className={classes.hudIconWrapper} style={{ opacity: !hideEnhancements ? intelligenceOpacity : 0, transition: 'all 1s linear 1s', maxWidth: intelligenceDisplay && !hideEnhancements ? '54px' : '0px', display: intelligenceDisplay && !hideEnhancements ? 'flex' : 'none' }}>
                            <div className={classes.hudIcon}>
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ height: '48px', width: '48px', transform: 'rotate(-90deg)', zIndex: 100 }}>
                                    <circle r="20" cx="24" cy="24" fill="transparent" stroke="#FFD700" stroke-width="6" stroke-dasharray="125.66370614359172" stroke-dashoffset="0" stroke-opacity="0.35" style={{ transition: 'stroke-dashoffset 400ms linear 0s', willChange: 'transition' }} />
                                </svg>
                            </div>
                            <div className={classes.hudIcon}>
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ height: '48px', width: '48px', transform: 'rotate(-90deg)', zIndex: 200 }}>
                                    <circle r="20" cx="24" cy="24" fill="transparent" stroke="#FFD700" stroke-width="6" stroke-dasharray={intelligenceArray} stroke-dashoffset={intelligenceOffset} stroke-opacity="1" style={{ transition: 'stroke-dashoffset 400ms linear 0s', willChange: 'transition' }} />
                                </svg>
                            </div>
                            <div className={classes.hudIcon}>
                                <div className={classes.iconWrapper}>
                                    <i className="fas fa-lightbulb fa-w-14 fa-fw" style={{ color: intelligenceBuffed && !hideEnhancements ? '#FFD700' : 'white', fontSize: '18px' }}></i>
                                </div>
                            </div>
                        </div>

                        {/* Stamina */}
                        <div className={classes.hudIconWrapper} style={{ opacity: !hideEnhancements ? staminaOpacity : 0, transition: 'all 1s linear 1s', maxWidth: staminaDisplay && !hideEnhancements ? '54px' : '0px', display: staminaDisplay && !hideEnhancements ? 'flex' : 'none' }}>
                            <div className={classes.hudIcon}>
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ height: '48px', width: '48px', transform: 'rotate(-90deg)', zIndex: 100 }}>
                                    <circle r="20" cx="24" cy="24" fill="transparent" stroke="#FFD700" stroke-width="6" stroke-dasharray="125.66370614359172" stroke-dashoffset="0" stroke-opacity="0.35" style={{ transition: 'stroke-dashoffset 400ms linear 0s', willChange: 'transition' }} />
                                </svg>
                            </div>
                            <div className={classes.hudIcon}>
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ height: '48px', width: '48px', transform: 'rotate(-90deg)', zIndex: 200 }}>
                                    <circle r="20" cx="24" cy="24" fill="transparent" stroke="#FFD700" stroke-width="6" stroke-dasharray={staminaArray} stroke-dashoffset={staminaOffset} stroke-opacity="1" style={{ transition: 'stroke-dashoffset 400ms linear 0s', willChange: 'transition' }} />
                                </svg>
                            </div>
                            <div className={classes.hudIcon}>
                                <div className={classes.iconWrapper}>
                                    <i className="fas fa-swimmer fa-w-16 fa-fw" style={{ color: staminaBuffed && !hideEnhancements ? '#FFD700' : 'white', fontSize: '18px' }}></i>
                                </div>
                            </div>
                        </div>

                        {/* Strength */}
                        <div className={classes.hudIconWrapper} style={{ opacity: !hideEnhancements ? strengthOpacity : 0, transition: 'all 1s linear 1s', maxWidth: strengthDisplay && !hideEnhancements ? '54px' : '0px', display: strengthDisplay && !hideEnhancements ? 'flex' : 'none' }}>
                            <div className={classes.hudIcon}>
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ height: '48px', width: '48px', transform: 'rotate(-90deg)', zIndex: 100 }}>
                                    <circle r="20" cx="24" cy="24" fill="transparent" stroke="#FFD700" stroke-width="6" stroke-dasharray="125.66370614359172" stroke-dashoffset="0" stroke-opacity="0.35" style={{ transition: 'stroke-dashoffset 400ms linear 0s', willChange: 'transition' }} />
                                </svg>
                            </div>
                            <div className={classes.hudIcon}>
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ height: '48px', width: '48px', transform: 'rotate(-90deg)', zIndex: 200 }}>
                                    <circle r="20" cx="24" cy="24" fill="transparent" stroke="#FFD700" stroke-width="6" stroke-dasharray={strengthArray} stroke-dashoffset={strengthOffset} stroke-opacity="1" style={{ transition: 'stroke-dashoffset 400ms linear 0s', willChange: 'transition' }} />
                                </svg>
                            </div>
                            <div className={classes.hudIcon}>
                                <div className={classes.iconWrapper}>
                                    <i className="fas fa-dumbbell fa-w-6 fa-fw" style={{ color: strengthBuffed && !hideEnhancements ? '#FFD700' : 'white', fontSize: '18px' }}></i>
                                </div>
                            </div>
                        </div>

                        {/* Money */}
                        <div className={classes.hudIconWrapper} style={{ opacity: !hideEnhancements ? moneyOpacity : 0, transition: 'all 1s linear 1s', maxWidth: moneyDisplay && !hideEnhancements ? '54px' : '0px', display: moneyDisplay && !hideEnhancements ? 'flex' : 'none' }}>
                            <div className={classes.hudIcon}>
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ height: '48px', width: '48px', transform: 'rotate(-90deg)', zIndex: 100 }}>
                                    <circle r="20" cx="24" cy="24" fill="transparent" stroke="#FFD700" stroke-width="6" stroke-dasharray="125.66370614359172" stroke-dashoffset="0" stroke-opacity="0.35" style={{ transition: 'stroke-dashoffset 400ms linear 0s', willChange: 'transition' }} />
                                </svg>
                            </div>
                            <div className={classes.hudIcon}>
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ height: '48px', width: '48px', transform: 'rotate(-90deg)', zIndex: 200 }}>
                                    <circle r="20" cx="24" cy="24" fill="transparent" stroke="#FFD700" stroke-width="6" stroke-dasharray={moneyArray} stroke-dashoffset={moneyOffset} stroke-opacity="1" style={{ transition: 'stroke-dashoffset 400ms linear 0s', willChange: 'transition' }} />
                                </svg>
                            </div>
                            <div className={classes.hudIcon}>
                                <div className={classes.iconWrapper}>
                                    <i className="fas fa-dollar-sign fa-w-11 fa-fw" style={{ color: moneyBuffed && !hideEnhancements ? '#FFD700' : 'white', fontSize: '18px' }}></i>
                                </div>
                            </div>
                        </div>

                        {/* Luck */}
                        <div className={classes.hudIconWrapper} style={{ opacity: !hideEnhancements ? luckOpacity : 0, transition: 'all 1s linear 1s', maxWidth: luckDisplay && !hideEnhancements ? '54px' : '0px', display: luckDisplay && !hideEnhancements ? 'flex' : 'none' }}>
                            <div className={classes.hudIcon}>
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ height: '48px', width: '48px', transform: 'rotate(-90deg)', zIndex: 100 }}>
                                    <circle r="20" cx="24" cy="24" fill="transparent" stroke="#FFD700" stroke-width="6" stroke-dasharray="125.66370614359172" stroke-dashoffset="0" stroke-opacity="0.35" style={{ transition: 'stroke-dashoffset 400ms linear 0s', willChange: 'transition' }} />
                                </svg>
                            </div>
                            <div className={classes.hudIcon}>
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ height: '48px', width: '48px', transform: 'rotate(-90deg)', zIndex: 200 }}>
                                    <circle r="20" cx="24" cy="24" fill="transparent" stroke="#FFD700" stroke-width="6" stroke-dasharray={luckArray} stroke-dashoffset={luckOffset} stroke-opacity="1" style={{ transition: 'stroke-dashoffset 400ms linear 0s', willChange: 'transition' }} />
                                </svg>
                            </div>
                            <div className={classes.hudIcon}>
                                <div className={classes.iconWrapper}>
                                    <i className="fas fa-database fa-w-9 fa-fw" style={{ color: luckBuffed && !hideEnhancements ? '#FFD700' : 'white', fontSize: '18px' }}></i>
                                </div>
                            </div>
                        </div>

                        {/* Alert */}
                        <div className={classes.hudIconWrapper} style={{ opacity: !hideEnhancements ? alertOpacity : 0, transition: 'all 1s linear 1s', maxWidth: alertDisplay && !hideEnhancements ? '54px' : '0px', display: alertDisplay && !hideEnhancements ? 'flex' : 'none' }}>
                            <div className={classes.hudIcon}>
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ height: '48px', width: '48px', transform: 'rotate(-90deg)', zIndex: 100 }}>
                                    <circle r="20" cx="24" cy="24" fill="transparent" stroke="#FFD700" stroke-width="6" stroke-dasharray="125.66370614359172" stroke-dashoffset="0" stroke-opacity="0.35" style={{ transition: 'stroke-dashoffset 400ms linear 0s', willChange: 'transition' }} />
                                </svg>
                            </div>
                            <div className={classes.hudIcon}>
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ height: '48px', width: '48px', transform: 'rotate(-90deg)', zIndex: 200 }}>
                                    <circle r="20" cx="24" cy="24" fill="transparent" stroke="#FFD700" stroke-width="6" stroke-dasharray={alertArray} stroke-dashoffset={alertOffset} stroke-opacity="1" style={{ transition: 'stroke-dashoffset 400ms linear 0s', willChange: 'transition' }} />
                                </svg>
                            </div>
                            <div className={classes.hudIcon}>
                                <div className={classes.iconWrapper}>
                                    <i className="fas fa-exclamation fa-w-20 fa-fw" style={{ color: alertBuffed && !hideEnhancements ? '#FFD700' : 'white', fontSize: '18px' }}></i>
                                </div>
                            </div>
                        </div>

                        {/* Breeze */}
                        <div className={classes.hudIconWrapper} style={{ opacity: !hideEnhancements ? breezeOpacity : 0, transition: 'all 1s linear 1s', maxWidth: breezeDisplay && !hideEnhancements ? '54px' : '0px', display: breezeDisplay && !hideEnhancements ? 'flex' : 'none' }}>
                            <div className={classes.hudIcon}>
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ height: '48px', width: '48px', transform: 'rotate(-90deg)', zIndex: 100 }}>
                                    <circle r="20" cx="24" cy="24" fill="transparent" stroke="#FFD700" stroke-width="6" stroke-dasharray="125.66370614359172" stroke-dashoffset="0" stroke-opacity="0.35" style={{ transition: 'stroke-dashoffset 400ms linear 0s', willChange: 'transition' }} />
                                </svg>
                            </div>
                            <div className={classes.hudIcon}>
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ height: '48px', width: '48px', transform: 'rotate(-90deg)', zIndex: 200 }}>
                                    <circle r="20" cx="24" cy="24" fill="transparent" stroke="#FFD700" stroke-width="6" stroke-dasharray={breezeArray} stroke-dashoffset={breezeOffset} stroke-opacity="1" style={{ transition: 'stroke-dashoffset 400ms linear 0s', willChange: 'transition' }} />
                                </svg>
                            </div>
                            <div className={classes.hudIcon}>
                                <div className={classes.iconWrapper}>
                                    <i className="fas fa-wind fa-w-20 fa-fw" style={{ color: breezeBuffed && !hideEnhancements ? '#FFD700' : 'white', fontSize: '18px' }}></i>
                                </div>
                            </div>
                        </div>

                        {/* Bike */}
                        <div className={classes.hudIconWrapper} style={{ opacity: !hideEnhancements ? bikeOpacity : 0, transition: 'all 1s linear 1s', maxWidth: bikeDisplay && !hideEnhancements ? '54px' : '0px', display: bikeDisplay && !hideEnhancements ? 'flex' : 'none' }}>
                            <div className={classes.hudIcon}>
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ height: '48px', width: '48px', transform: 'rotate(-90deg)', zIndex: 100 }}>
                                    <circle r="20" cx="24" cy="24" fill="transparent" stroke="#FFD700" stroke-width="6" stroke-dasharray="125.66370614359172" stroke-dashoffset="0" stroke-opacity="0.35" style={{ transition: 'stroke-dashoffset 400ms linear 0s', willChange: 'transition' }} />
                                </svg>
                            </div>
                            <div className={classes.hudIcon}>
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ height: '48px', width: '48px', transform: 'rotate(-90deg)', zIndex: 200 }}>
                                    <circle r="20" cx="24" cy="24" fill="transparent" stroke="#FFD700" stroke-width="6" stroke-dasharray={bikeArray} stroke-dashoffset={bikeOffset} stroke-opacity="1" style={{ transition: 'stroke-dashoffset 400ms linear 0s', willChange: 'transition' }} />
                                </svg>
                            </div>
                            <div className={classes.hudIcon}>
                                <div className={classes.iconWrapper}>
                                    <i className="fas fa-bicycle fa-w-20 fa-fw" style={{ color: bikeBuffed && !hideEnhancements ? '#FFD700' : 'white', fontSize: '18px' }}></i>
                                </div>
                            </div>
                        </div>

                        {/* Harness */}
                        <div className={classes.hudIconWrapper} style={{ opacity: harnessOpacity, transition: 'all 1s linear 1s', maxWidth: harnessDisplay ? '54px' : '0px', display: harnessDisplay ? 'flex' : 'none' }}>
                            <div className={classes.hudIcon}>
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ height: '48px', width: '48px', transform: 'rotate(-90deg)', zIndex: 100 }}>
                                    <circle r="20" cx="24" cy="24" fill="transparent" stroke="#AB47BC" stroke-width="6" stroke-dasharray="125.66370614359172" stroke-dashoffset="0" stroke-opacity="0.35" style={{ transition: 'stroke-dashoffset 400ms linear 0s', willChange: 'transition' }} />
                                </svg>
                            </div>
                            <div className={classes.hudIcon}>
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ height: '48px', width: '48px', transform: 'rotate(-90deg)', zIndex: 200 }}>
                                    <circle r="20" cx="24" cy="24" fill="transparent" stroke="#AB47BC" stroke-width="6" stroke-dasharray={harnessArray} stroke-dashoffset={harnessOffset} stroke-opacity="1" style={{ transition: 'stroke-dashoffset 400ms linear 0s', willChange: 'transition' }} />
                                </svg>
                            </div>
                            <div className={classes.hudIcon}>
                                <div className={classes.iconWrapper}>
                                    <i className="fas fa-user-slash fa-w-20 fa-fw" style={{ color: 'white', fontSize: '18px' }}></i>
                                </div>
                            </div>
                        </div>

                        {/* Pursuit Modes */}
                        <div className={classes.hudIconWrapper} style={{ opacity: pursuitOpacity, transition: 'all 1s linear 1s', maxWidth: pursuitDisplay && showPursuit ? '54px' : '0px', display: pursuitDisplay && showPursuit ? 'flex' : 'none' }}>
                            <div className={classes.hudIcon}>
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ height: '48px', width: '48px', transform: 'rotate(-90deg)', zIndex: 100 }}>
                                    <circle r="20" cx="24" cy="24" fill="transparent" stroke="#e43f5a" stroke-width="6" stroke-dasharray="125.66370614359172" stroke-dashoffset="0" stroke-opacity="0.35" style={{ transition: 'stroke-dashoffset 400ms linear 0s', willChange: 'transition' }} />
                                </svg>
                            </div>
                            <div className={classes.hudIcon}>
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ height: '48px', width: '48px', transform: 'rotate(-90deg)', zIndex: 200 }}>
                                    <circle r="20" cx="24" cy="24" fill="transparent" stroke="#e43f5a" stroke-width="6" stroke-dasharray={pursuitArray} stroke-dashoffset={pursuitOffset} stroke-opacity="1" style={{ transition: 'stroke-dashoffset 400ms linear 0s', willChange: 'transition' }} />
                                </svg>
                            </div>
                            <div className={classes.hudIcon}>
                                <div className={classes.iconWrapper}>
                                    <i className="fas fa-tachometer-alt fa-w-18 fa-fw" style={{ color: 'white', fontSize: '18px' }}></i>
                                </div>
                            </div>
                        </div>

                        {/* Nuclear */}
                        <div className={classes.hudIconWrapper} style={{ opacity: nuclearOpacity, transition: 'all 1s linear 1s', maxWidth: nuclearDisplay ? '54px' : '0px', display: nuclearDisplay ? 'flex' : 'none' }}>
                            <div className={classes.hudIcon}>
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ height: '48px', width: '48px', transform: 'rotate(-90deg)', zIndex: 100 }}>
                                    <circle r="20" cx="24" cy="24" fill="transparent" stroke="#47e10c" stroke-width="6" stroke-dasharray="125.66370614359172" stroke-dashoffset="0" stroke-opacity="0.35" style={{ transition: 'stroke-dashoffset 400ms linear 0s', willChange: 'transition' }} />
                                </svg>
                            </div>
                            <div className={classes.hudIcon}>
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ height: '48px', width: '48px', transform: 'rotate(-90deg)', zIndex: 200 }}>
                                    <circle r="20" cx="24" cy="24" fill="transparent" stroke="#47e10c" stroke-width="6" stroke-dasharray={nuclearArray} stroke-dashoffset={nuclearOffset} stroke-opacity="1" style={{ transition: 'stroke-dashoffset 400ms linear 0s', willChange: 'transition' }} />
                                </svg>
                            </div>
                            <div className={classes.hudIcon}>
                                <div className={classes.iconWrapper}>
                                    <i className="fas fa-biohazard fa-w-18 fa-fw" style={{ color: 'white', fontSize: '18px' }}></i>
                                </div>
                            </div>
                        </div>



                        {/* Ping */}
                        <div className={classes.hudIconWrapper} style={{ opacity: pingOpacity, transition: 'all 1s linear 1s', maxWidth: pingDisplay ? '54px' : '0px', display: pingDisplay ? 'flex' : 'none' }}>
                            <div className={classes.hudIcon}>
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ height: '48px', width: '48px', transform: 'rotate(-90deg)', zIndex: 100 }}>
                                    <circle r="20" cx="24" cy="24" fill="transparent" stroke="#f02929" stroke-width="6" stroke-dasharray="125.66370614359172" stroke-dashoffset="0" stroke-opacity="0.35" style={{ transition: 'stroke-dashoffset 400ms linear 0s', willChange: 'transition' }} />
                                </svg>
                            </div>
                            <div className={classes.hudIcon}>
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ height: '48px', width: '48px', transform: 'rotate(-90deg)', zIndex: 200 }}>
                                    <circle r="20" cx="24" cy="24" fill="transparent" stroke="#f02929" stroke-width="6" stroke-dasharray="125.66370614359172" stroke-dashoffset="0" stroke-opacity="1" style={{ transition: 'stroke-dashoffset 400ms linear 0s', willChange: 'transition' }} />
                                </svg>
                            </div>
                            <div className={classes.hudIcon}>
                                <div className={classes.iconWrapper}>
                                    <i className="fas fa-exclamation-triangle fa-w-16 fa-fw" style={{ color: 'white', fontSize: '15px' }}></i>
                                </div>
                            </div>
                        </div>

                        {/* Tracker */}
                        <div className={classes.hudIconWrapper} style={{ opacity: trackerOpacity, transition: 'all 1s linear 1s', maxWidth: trackerDisplay ? '54px' : '0px', display: trackerDisplay ? 'flex' : 'none' }}>
                            <div className={classes.hudIcon}>
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ height: '48px', width: '48px', transform: 'rotate(-90deg)', zIndex: 100 }}>
                                    <circle r="20" cx="24" cy="24" fill="transparent" stroke="#e43f5a" stroke-width="6" stroke-dasharray="125.66370614359172" stroke-dashoffset="0" stroke-opacity="0.35" style={{ transition: 'stroke-dashoffset 400ms linear 0s', willChange: 'transition' }} />
                                </svg>
                            </div>
                            <div className={classes.hudIcon}>
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ height: '48px', width: '48px', transform: 'rotate(-90deg)', zIndex: 200 }}>
                                    <circle r="20" cx="24" cy="24" fill="transparent" stroke="#e43f5a" stroke-width="6" stroke-dasharray={trackerArray} stroke-dashoffset={trackerOffset} stroke-opacity="1" style={{ transition: 'stroke-dashoffset 400ms linear 0s', willChange: 'transition' }} />
                                </svg>
                            </div>
                            <div className={classes.hudIcon}>
                                <div className={classes.iconWrapper}>
                                    <i className="fas fa-microchip fa-w-16 fa-fw" style={{ color: 'white', fontSize: '18px' }}></i>
                                </div>
                            </div>
                        </div>

                        {/* Armed */}
                        <div className={classes.hudIconWrapper} style={{ opacity: armedOpacity, transition: 'all 1s linear 1s', maxWidth: armedDisplay ? '54px' : '0px', display: armedDisplay ? 'flex' : 'none' }}>
                            <div className={classes.hudIcon}>
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ height: '48px', width: '48px', transform: 'rotate(-90deg)', zIndex: 100 }}>
                                    <circle r="20" cx="24" cy="24" fill="transparent" stroke="#e43f5a" stroke-width="6" stroke-dasharray="125.66370614359172" stroke-dashoffset="0" stroke-opacity="0.35" style={{ transition: 'stroke-dashoffset 400ms linear 0s', willChange: 'transition' }} />
                                </svg>
                            </div>
                            <div className={classes.hudIcon}>
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ height: '48px', width: '48px', transform: 'rotate(-90deg)', zIndex: 200 }}>
                                    <circle r="20" cx="24" cy="24" fill="transparent" stroke="#e43f5a" stroke-width="6" stroke-dasharray="125.66370614359172" stroke-dashoffset="0" stroke-opacity="1" style={{ transition: 'stroke-dashoffset 400ms linear 0s', willChange: 'transition' }} />
                                </svg>
                            </div>
                            <div className={classes.hudIcon}>
                                <div className={classes.iconWrapper}>
                                    <i className="fas fa-stream fa-w-16 fa-fw" style={{ color: 'white', fontSize: '18px' }}></i>
                                </div>
                            </div>
                        </div>

                        {/* Nitrous */}
                        <div className={classes.hudIconWrapper} style={{ opacity: nitrousOpacity, transition: 'all 1s linear 1s', maxWidth: nitrousDisplay ? '54px' : '0px', display: nitrousDisplay ? 'flex' : 'none' }}>
                            <div className={classes.hudIcon}>
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ height: '48px', width: '48px', transform: 'rotate(-90deg)', zIndex: 100 }}>
                                    <circle r="20" cx="24" cy="24" fill="transparent" stroke="#e43f5a" stroke-width="6" stroke-dasharray="125.66370614359172" stroke-dashoffset="0" stroke-opacity="0.35" style={{ transition: 'stroke-dashoffset 400ms linear 0s', willChange: 'transition' }} />
                                </svg>
                            </div>
                            <div className={classes.hudIcon}>
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ height: '48px', width: '48px', transform: 'rotate(-90deg)', zIndex: 200 }}>
                                    <circle r="20" cx="24" cy="24" fill="transparent" stroke="#e43f5a" stroke-width="6" stroke-dasharray={nitrousArray} stroke-dashoffset={nitrousOffset} stroke-opacity="1" style={{ transition: 'stroke-dashoffset 400ms linear 0s', willChange: 'transition' }} />
                                </svg>
                            </div>
                            <div className={classes.hudIcon}>
                                <div className={classes.iconWrapper}>
                                    <i className="fas fa-meteor fa-w-16 fa-fw" style={{ color: 'white', fontSize: '18px' }}></i>
                                </div>
                            </div>
                        </div>

                        {/* Timer */}
                        <div className={classes.hudIconWrapper} style={{ opacity: timerOpacity, transition: 'all 1s linear 1s', maxWidth: timerDisplay ? '54px' : '0px', display: timerDisplay ? 'flex' : 'none' }}>
                            <div className={classes.hudIcon}>
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ height: '48px', width: '48px', transform: 'rotate(-90deg)', zIndex: 100 }}>
                                    <circle r="20" cx="24" cy="24" fill="transparent" stroke="#7788de" stroke-width="6" stroke-dasharray="125.66370614359172" stroke-dashoffset="0" stroke-opacity="0.35" style={{ transition: 'stroke-dashoffset 400ms linear 0s', willChange: 'transition' }} />
                                </svg>
                            </div>
                            <div className={classes.hudIcon}>
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ height: '48px', width: '48px', transform: 'rotate(-90deg)', zIndex: 200 }}>
                                    <circle r="20" cx="24" cy="24" fill="transparent" stroke="#7788de" stroke-width="6" stroke-dasharray={timerArray} stroke-dashoffset={timerOffset} stroke-opacity="1" style={{ transition: 'stroke-dashoffset 400ms linear 0s', willChange: 'transition' }} />
                                </svg>
                            </div>
                            <div className={classes.hudIcon}>
                                <div className={classes.iconWrapper}>
                                    <i className="fas fa-stopwatch-20 fa-w-16 fa-fw" style={{ color: 'white', fontSize: '18px' }}></i>
                                </div>
                            </div>
                        </div>

                        {/* Dev Mode */}
                        <div className={classes.hudIconWrapper} style={{ opacity: devModeOpacity, transition: 'all 1s linear 1s', maxWidth: devModeDisplay ? '54px' : '0px', display: devModeDisplay ? 'flex' : 'none' }}>
                            <div className={classes.hudIcon}>
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ height: '48px', width: '48px', transform: 'rotate(-90deg)', zIndex: 100 }}>
                                    <circle r="20" cx="24" cy="24" fill="transparent" stroke={godMode ? '#b8b679' : '#000'} stroke-width="6" stroke-dasharray="125.66370614359172" stroke-dashoffset="0" stroke-opacity="0.35" style={{ transition: 'stroke-dashoffset 400ms linear 0s', willChange: 'transition' }} />
                                </svg>
                            </div>
                            <div className={classes.hudIcon}>
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ height: '48px', width: '48px', transform: 'rotate(-90deg)', zIndex: 200 }}>
                                    <circle r="20" cx="24" cy="24" fill="transparent" stroke={godMode ? '#b8b679' : '#000'} stroke-width="6" stroke-dasharray="125.66370614359172" stroke-dashoffset="0" stroke-opacity="1" style={{ transition: 'stroke-dashoffset 400ms linear 0s', willChange: 'transition' }} />
                                </svg>
                            </div>
                            <div className={classes.hudIcon}>
                                <div className={classes.iconWrapper}>
                                    <i className="fas fa-terminal fa-w-16 fa-fw" style={{ color: 'white', fontSize: '18px' }}></i>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </Grid>
        </>
    );
}

export default Hud;