import React from "react";
import { useState, useEffect } from "react";
import './index.css';
import { Dispatch } from "./Dispatch";
import Unit from "./Unit";
import CreateCall from "./CreateCall";
import Map from "./Map"
import { useNuiEvent } from "../../../hooks/useNuiEvent";
import { fetchNui } from "../../../utils/fetchNui";

function DispatchApp() {
  const [display, setDisplay]: any = useState(false)
  const [notifications, setNotifications]: any = useState([])
  const [log, setLog]: any = useState([])
  const [calls, setCalls]: any = useState([])

  useNuiEvent("createCall", (data) => {
    setCalls([...calls, data])
  })

  useNuiEvent("SendNotification", (data) => {
    const id = notifications.length + 1
    setNotifications([...notifications, data])
    setLog([...log, data])
    
    setTimeout(() => {
      setNotifications((v) => {
        return v.splice(id, 1)
      })
    }, 6000)
  })

  useNuiEvent("dismissDispatch", (data) => {
    log.splice(data.id-1, 1)
  })

  useNuiEvent("openDispatch", setDisplay)

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
  }, [])

  const handleKeyPress = (e) => {
   if (e.key === "Escape") {
      setDisplay(false)
      fetchNui('escapeNui')
    }
  };

  return (
    <></>
    // <div style={{ position:'absolute', top:'0', display: 'flex', flexDirection: 'row', width: '100vw', height: '100vh', padding: '4px', paddingRight: '0' }}>
    //   <div id="map" style={{ flex: '1', width: '100%', display: display ? '' : 'none' }}>
    //     <Map />
    //   </div>
    //   <div style={{ width: '50%', display: 'flex', flexDirection: 'row-reverse' }}>
    //     <div style={{ width: '50%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'end', justifyContent: 'start', position: 'relative' }}>
    //       <div style={{ display: 'flex', flexDirection: 'column', gap: '2', flex: '1', width: '100%', overflowY: 'auto' }}>
    //         {!display ? notifications.map(data => <Dispatch visibility={false} data={data} />) : ''}
    //         {display ? log?.map(data => <Dispatch visibility={true} data={data} />) : ''}
    //       </div>
    //       {display ? <Unit visibility={display} /> : ''}
    //     </div>
    //     <div style={{ flex: '1', height: '100%', overflow: 'hidden', overflowY: 'auto', marginLeft: '2px' }}>
    //       {calls?.map(data => <CreateCall visibility={display} data={data} />)}
    //     </div>
    //   </div>
    // </div>
  );
}

export default DispatchApp;