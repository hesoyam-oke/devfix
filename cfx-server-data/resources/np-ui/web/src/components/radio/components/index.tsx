import React, { useState, useEffect, useRef } from 'react';
import './index.css'
import { useNuiEvent } from "../../../hooks/useNuiEvent";
import { fetchNui } from "../../../utils/fetchNui";
import { noop } from '../../../utils/misc';
import {DveXAlert} from '../../main/components';
import { Tooltip, Typography } from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const Radio: React.FC = () => {
  const [showRadio, setShowRadio]: any = useState(false)
  const [powered, setPowered]: any = useState(false)
  const [value, setValue]: any = useState(0)

  type FrameVisibleSetter = (bool: boolean) => void

  const LISTENED_KEYS = [ "Escape" ]
  const setterRef = useRef<FrameVisibleSetter>(noop)

  useEffect(() => {
    setterRef.current = setShowRadio
  }, [setShowRadio])

  useEffect(() => {
    const keyHandler = (e: KeyboardEvent) => {
      if (LISTENED_KEYS.includes(e.code) && showRadio === true) {
          setterRef.current(false)
          setShowRadio(false)
          fetchNui('np-ui:closeApp', {}).then(function (firstdata) {
            if(true === firstdata.meta.ok){
              fetchNui('np-ui:applicationClosed', {
                name: 'radio',
                fromEscape: true,
              }).then(function (data) {
                if(true === data.meta.ok){
                  fetchNui('np-ui:setRadioChannel', {channel: value})
                  setShowRadio(false) 
                }
              })
            }
          }).catch(function(error){
            return <DveXAlert AlertText='Error occurred in app: Radio - restarting...' AlertType='error' />
          })
      }
    }

    window.addEventListener("keydown", keyHandler)

    return () => window.removeEventListener("keydown", keyHandler)
  }, []);


  useNuiEvent('uiMessage', function (data) {  
    if ('radio' === data.app) {
      if (data.close){
        setShowRadio(false)
        return
      }

      if (true === data.show) {
        setShowRadio(true)
      }
      if (data.value) {
        setValue(data.value)
      }
    }
  })



  

  return (
    <>
      <div style={{display: showRadio ? '' : 'none'}} className='radio-container'>
        <div style={{bottom: showRadio ? '0px' : '-1000px'}} className='radio-image-container'>
          <img src="https://gta-assets.nopixel.net/images/radio.png" alt="radio" />
          <div className='text-wrapper'>
            <div className='text-input-wrapper'>
              {powered === true ? 
                <input id='input-on' onChange={function(e) {
                  const value = e.target.value;
                  const numberValue = Number(value);

                  if (!isNaN(numberValue) && numberValue >= 0 && numberValue < 1000 && value.length <= 5) {
                    setValue(value);
                  }
                }} onKeyUp={async function(e: React.KeyboardEvent<HTMLInputElement>) {
                const keyPressed = e.key;
                const radioChannelValue = value;
              
                if (keyPressed === 'Enter' && radioChannelValue !== '') {
                  try {
                    const result = await fetchNui('np-ui:setRadioChannel', { channel: Number(radioChannelValue) });
                    if (result?.data) {
                      setShowRadio(false);
                      fetchNui('np-ui:closeApp');
                      setValue(radioChannelValue);
                    }
                  } catch (error) {
                    console.error(error);
                    // Handle the error here, e.g. show an error message to the user
                  }
                }
              }} value={value} placeholder="100.0+" /> : 

              <input id='input-off' value={'Off'} placeholder="Off" disabled />}
            </div>
          </div>
          <Tooltip sx={{backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px'}} arrow placement="left" title={powered ? 'Switch Off' : 'Switch On'}>
            <div onClick={function(){
              fetchNui(powered ? 'np-ui:toggleRadioOn' : 'np-ui:toggleRadioOff')
              setPowered(!powered)
            }} className='on-off-wrapper'></div>
          </Tooltip>
          <Tooltip sx={{backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px'}} arrow placement="left" title="Volume Up">
            <div onClick={function(){
              fetchNui('np-ui:radioVolumeUp')
            }} className='vol-up-wrapper'></div>
          </Tooltip>
          <Tooltip sx={{backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px'}} arrow placement="left" title="Volume Down">
            <div onClick={function(){
              fetchNui('np-ui:radioVolumeDown')
            }} className='vol-down-wrapper'></div>
          </Tooltip>
          <div className='nopixel-tag'>
            <Typography style={{color: '#fff'}} variant='body2' gutterBottom>NoPixel</Typography>
          </div>
          <div className='other-tag'></div>
        </div>
      </div>
    </>
  );
}

export default Radio;