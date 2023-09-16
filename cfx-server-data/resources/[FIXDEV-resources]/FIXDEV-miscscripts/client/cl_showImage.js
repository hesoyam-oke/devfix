const ImageItem = {}

on('FIXDEV-inventory:itemUsed', (pItemId, pItemInfo) => {
    if (!ImageItem[pItemId]) return;

    ImageItem[pItemId](pItemId, pItemInfo)
});

ImageItem['seaside_beachpass'] = async (pItemId, pItemInfo) => {
    const imageURL = `https://gta-assets.nopixel.net/images/seasideticket.png`;
    NPX.Events.emitNet('FIXDEV-miscscripts:showImage', imageURL);
}

ImageItem['littlemoscow_passport'] = async (pItemId, pItemInfo) => {
    const imageURL = `https://i.imgur.com/tKmU4yx.png`;
    NPX.Events.emitNet('FIXDEV-miscscripts:showImage', imageURL);
}

ImageItem['dripcheck'] = async (pItemId, pItemInfo) => {
    const imageURL = `https://nikez.nu/files/dripcheck_badge.png`;
    NPX.Events.emitNet('FIXDEV-miscscripts:showImage', imageURL);
}

ImageItem['dripcheck_pass'] = async (pItemId, pItemInfo) => {
    const imageURL = `https://nikez.nu/files/dripcheck_pass.webm`;
    NPX.Events.emitNet('FIXDEV-miscscripts:showImage', imageURL, 'webm', 7500);
}

ImageItem['dripcheck_fail'] = async (pItemId, pItemInfo) => {
    const imageURL = `https://nikez.nu/files/dripcheck_fail.webm`;
    NPX.Events.emitNet('FIXDEV-miscscripts:showImage', imageURL, 'webm', 7500);
}

onNet('FIXDEV-miscscripts:showImage', async (pSource, pImageURL, pType, pDuration) => {
    const isSelf = GetPlayerServerId(PlayerId()) == pSource;

    if (pImageURL) {
        global.exports['FIXDEV-ui'].openApplication(
            'show-image',
            {
                url: pImageURL,
                type: pType,
                duration: pDuration,
            },
            false,
        );
    }

    if (isSelf) {
        TriggerEvent('attachItem', 'show_image');
        ClearPedTasksImmediately(PlayerPedId());
        await NPX.Streaming.loadAnim('paper_1_rcm_alt1-9');
        TaskPlayAnim(PlayerPedId(), 'paper_1_rcm_alt1-9', 'player_one_dual-9', 3.0, 3.0, -1, 54, 0, false, false, false);
        await new Promise((resolve) => setTimeout(() => resolve(), pDuration ?? 3250));
        StopAnimTask(PlayerPedId(), 'paper_1_rcm_alt1-9', 'player_one_dual-9', 1.0);
        TriggerEvent('destroyProp');
    }
});