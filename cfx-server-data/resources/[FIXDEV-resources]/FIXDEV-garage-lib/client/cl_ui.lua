local registered = {}

function RegisterUICallback(name, cb)
  local function interceptCb(data, innerCb)
    cb(data, function(result)
      if result.meta.ok then
        result.meta.message = "done"
      end
      innerCb(result)
    end)
  end
  AddEventHandler(('_npx_uiReq:%s'):format(name), interceptCb)

  if (GetResourceState("FIXDEV-ui") == "started") then 
    exports["FIXDEV-ui"]:RegisterUIEvent(name) 
  end

  registered[#registered + 1] = name
end

function SendUIMessage(data)
  exports["FIXDEV-ui"]:SendUIMessage(data)
end

function SetUIFocus(hasFocus, hasCursor)
  exports["FIXDEV-ui"]:SetUIFocus(hasFocus, hasCursor)
end

function GetUIFocus()
  return exports["FIXDEV-ui"]:GetUIFocus()
end

AddEventHandler("_vui_uiReady", function()
  for _, eventName in ipairs(registered) do
    exports["FIXDEV-ui"]:RegisterUIEvent(eventName)
  end
end)
