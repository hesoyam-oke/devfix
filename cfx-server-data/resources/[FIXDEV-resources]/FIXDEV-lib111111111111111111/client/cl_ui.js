const registered = [];

function RegisterUICallback(name, cb) {
    AddEventHandler(`_npx_uiReq:${name}`, cb);

    if (GetResourceState('FIXDEV-ui') === 'started') exports['FIXDEV-ui'].RegisterUIEvent(name);

    registered.push(name);
}

function SendUIMessage(data) {
    exports['FIXDEV-ui'].SendUIMessage(data);
}

function SetUIFocus(hasFocus, hasCursor) {
    exports['FIXDEV-ui'].SetUIFocus(hasFocus, hasCursor);
}

function GetUIFocus() {
    return exports['FIXDEV-ui'].GetUIFocus();
}

AddEventHandler('_npx_uiReady', () => {
    registered.forEach((eventName) => exports['FIXDEV-ui'].RegisterUIEvent(eventName));
});