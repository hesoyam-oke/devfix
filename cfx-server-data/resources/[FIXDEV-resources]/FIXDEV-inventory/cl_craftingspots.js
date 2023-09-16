let showPrompt = false;
let listener;
let openedBait = false;

setImmediate(async () => {
    while (!exports['FIXDEV-config'].IsConfigReady()) {
        await Delay(100);
    }
    const spawnPublicZones = exports["FIXDEV-config"].GetMiscConfig('crafting.spawn.public');
    const craftingSpots = await RPC.execute("FIXDEV-inventory:getCraftingSpots");
    craftingSpots.forEach(spot => {
        if (spot.zoneData.options.data.public && !spawnPublicZones) return;
        const name = `FIXDEV-inventory:crafting:${spot.id}`;
        exports["FIXDEV-polyzone"].AddBoxZone(name, spot.zoneData.position, spot.zoneData.length, spot.zoneData.width, spot.zoneData.options);
    })
})

on("FIXDEV-polyzone:enter", (zone, data) => {
    if (!zone.startsWith("FIXDEV-inventory:crafting:")) return;

    listener = setTick(() => {
        if (openedBait && data.progression && data.inventories[0].id === "baitinventory") return;
        if (!showPrompt) {
            exports["FIXDEV-ui"].showInteraction(data.prompt);
            showPrompt = true;
        }
        if (IsControlJustPressed(0, data.key)) {
            exports["FIXDEV-ui"].hideInteraction();
            if (data.progression) {
                const progression = exports["FIXDEV-progression"].GetProgression(data.progression);
                let inventory = data.inventories[0];
                data.inventories.forEach(inv => {
                    if (progression >= inv.progression && inv.progression > inventory.progression) inventory = inv;
                });
                emit("server-inventory-open", inventory.id, `Crafting:${inventory.id}`);
                if (inventory.id == "baitinventory") openedBait = true;
            }else {
                emit("server-inventory-open", data.inventory, "Craft");
            }
        }
    });
});

on("FIXDEV-polyzone:exit", (zone, data) => {
    if (!zone.startsWith("FIXDEV-inventory:crafting:") || !listener) return;
    clearTick(listener);
    listener = null;
    showPrompt = false;
    exports["FIXDEV-ui"].hideInteraction();
});
