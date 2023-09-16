let currentSubscription = null;

on("FIXDEV-music:showBroadcastContextMenu", (channel) => {

  const items = exports["FIXDEV-inventory"].getItemsOfType("musictape", 20, true)
    .reduce((acc, musictape) => {
      const { title, artist, url } = JSON.parse(musictape.information);
      acc.push({
        title,
        description: artist,
        action: "FIXDEV-ui:music:setBroadcast",
        key: { channel, url }
      })
      return acc;
    }, [{
      i18nTitle: true,
      title: "Stop broadcasting",
      description: "",
      action: "FIXDEV-ui:music:setBroadcast",
      key: { channel, url: null }
    }]);

  if (items.length === 0) {    
    TriggerEvent("DoLongHudText", "You have no music tapes.", 2)
    return;
  }

  exports["FIXDEV-ui"].showContextMenu(items);
});

RegisterUICallback("FIXDEV-ui:music:setBroadcast", (data, cb) => {
  cb({ data: {}, meta: { ok: true, message: '' } });
  const { channel, url } = data.key;
  RPC.execute("FIXDEV-music:setBroadcast", channel, url);
});

onNet("FIXDEV-music:updateBroadcast", (channel, channelData) => {
  if (channel === currentSubscription) {
    if (!channelData) {
      exports["FIXDEV-ui"].closeApplication("musicplayer", {});
      return;
    }
    openBroadcast(channelData);
  }
});

const openBroadcast = (channelData) => {
  exports["FIXDEV-ui"].closeApplication("musicplayer", {});
  exports["FIXDEV-ui"].openApplication("musicplayer", channelData, false);
}

on("FIXDEV-music:subscribe", async (channel) => {
  currentSubscription = channel;
  const channelData = await RPC.execute("FIXDEV-music:getChannel", channel);
  if (channelData) {
    openBroadcast(channelData);
  }
});

on("FIXDEV-music:unsubscribe", () => {
  exports["FIXDEV-ui"].closeApplication("musicplayer", {});
  currentSubscription = null;
});
