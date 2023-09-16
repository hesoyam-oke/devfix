import React, { useState } from 'react';
import './index.css'
import { useNuiEvent } from "../../../hooks/useNuiEvent";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const Cash: React.FC = () => {

  const [ShowCash, setShowCash]: any = useState(false)
  const [AmountAdjustment, SetAmountAdjustment]: any = useState(0)
  const [Cash, SetCash]: any = useState(0)



  useNuiEvent('uiMessage', (data) => {
    var dvexdata = data.data
    if ('cash' === data.app) {
      if ('np-nui' === data.source) {
        SetCash(dvexdata.cash) 
        SetAmountAdjustment(dvexdata.amountAdjustment)
        setShowCash(true)
        setTimeout(function(){
          SetCash(0) 
          SetAmountAdjustment(0)
          setShowCash(false)
        })
      }
    }
  })

  return (
    <>
      <div style={{display: ShowCash ? '' : 'none'}} className="container">
        {/* <div className="cashtransaction"></div> */}
        <div className="cashtransaction"><p id="add-balance"><span className="pre">+</span><span className="green"> $ </span>0</p></div>
        <div className="cash"><p id="cash"><span className="green"> $ </span>{Cash}</p></div>
      </div>
    </>
  );
}

export default Cash;