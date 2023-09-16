import React, { useState, useEffect, useRef } from 'react';
import './index.css'
import { useNuiEvent } from "../../../hooks/useNuiEvent";
import { fetchNui } from "../../../utils/fetchNui";
import { noop } from '../../../utils/misc';
import { Typography } from '@mui/material';
import useStyles from './index.styles';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const Peek: React.FC = () => {
  const classes = useStyles();

  const [ShowPeek, setShowPeek]: any = useState(false)
  const [Active, setActive]: any = useState(false)
  const [interact, setInteract]: any = useState(false)
  const [Context, setContext]: any = useState([])
  const [Entity, setEntity]: any = useState([])
  const [Payload, setPayload]: any = useState([])
  const [changecolor, setchangecolor]: any = useState([])
  const [eyeinteract, seteyeinteract]: any = useState([])


  type FrameVisibleSetter = (bool: boolean) => void

  const LISTENED_KEYS = [ "Escape" ]
  const setterRef = useRef<FrameVisibleSetter>(noop)

  useEffect(() => {
    setterRef.current = setShowPeek
  }, [setShowPeek])

  useEffect(() => {
    const keyHandler = (e: KeyboardEvent) => {
      if (LISTENED_KEYS.includes(e.code)) {
          setterRef.current(false)
          fetchNui('np-ui:closeApp', {}).then(function (firstdata) {
            if(true === firstdata.meta.ok){
              fetchNui('np-ui:applicationClosed', {
                name: 'eye',
                fromEscape: true,
              }).then(function (data) {
                if(true === data.meta.ok){
                  setShowPeek(false) 
                  setActive(false) 
                  setInteract(false)
                  setchangecolor(false)
                }
              })
            }
          })
      }
    }

    window.addEventListener("keydown", keyHandler)

    return () => window.removeEventListener("keydown", keyHandler)
  }, []);

  


  useNuiEvent('uiMessage', function (data) {
    var dvexdata = data.data
    
    if ('eye' === data.app) {
      if (data.close){
        setShowPeek(false)
        setActive(false)
        setInteract(false)
        setchangecolor('')
        seteyeinteract([])
        return
      }
      if ('interact' === dvexdata.action) {
        setInteract(true)
        setShowPeek(true)
        setContext(dvexdata.payload.context)
        setEntity(dvexdata.payload.entity)
      } else {
        if ('refresh' === dvexdata.action) {
          setPayload(dvexdata.payload)
        } else {
          if ('update' === dvexdata.action) {
            if(dvexdata.payload.active == true){
              seteyeinteract([])
              setActive(true)
              var cu = dvexdata.payload.options,
              cC = []
          
              Object.keys(Payload).map(function (cx, cA) {
                return Object.keys(cu).map(function (cq) {
                  if (cx === cq && true === cu[cq]) {
                    var a0 = {
                      key: cx,
                      label: Payload[cx].label,
                      icon: Payload[cx].icon,
                      event: Payload[cx].event,
                      ATXEvent: Payload[cx].ATXEvent,
                      parameters: Payload[cx].parameters,
                    }
                    cC.push(a0)
                  }
                })
              })                  
              seteyeinteract(cC)
            }else{
              setActive(false)
              seteyeinteract([])
            }
          } else {

              if ('peek' === dvexdata.action) {
                if(true === dvexdata.payload.display){
                  setShowPeek(true) 
                  
                  setActive(dvexdata.payload.active)
                }else{
                  if(true !== interact){
                    setShowPeek(false) 
                    setActive(dvexdata.payload.active)
                  }
                }
              }

          }
        }
      }
    }
  })



  var museenter = function (event) {
    setchangecolor(event.currentTarget.id)
  }

  var museleave = function () {
    setchangecolor('')
  }

  return (
    <>
          <div style={{ opacity: ShowPeek ? 1 : 0 }} className={classes.thirdEyeContainer}>
            <img 
              src = {Active
              ? 'https://dvexdev.github.io/DveX.Images/peek-active-1.png'
              : 'https://dvexdev.github.io/DveX.Images/peek.png'}
              alt='peek'
              style={{
                display: ShowPeek ? '' : 'none',
                maxWidth: '2.5vw',
                maxHeight: '2.5vw',
              }}
            />
            <div className={classes.thirdEyeOptionsWrapper} style={{ display: Active ? '' : 'none' }}>
              {eyeinteract && eyeinteract.length > 0 
                ? eyeinteract.map(function (data: any) {
                  return (
                    <div id={data.key} onMouseEnter={museenter} onMouseLeave={museleave} className='third-eye-option'>
                      <i id={data.key} className={'fas fa-' + data.icon + ' fa-w-16 fa-fw fa-lg icon-color'}></i>
                      <Typography 
                        id={data.event}
                        style = {{
                          color: changecolor.toString() === data.key.toString() ? '#1ad4a8' : '#fff',
                          wordBreak: 'break-word',
                          margin: '0',
                        }}
                        variant={'h6'}
                        gutterBottom={true}
                        onClick={function () { 
                          setShowPeek(false)
                          setActive(false)
                          setInteract(false)
                          setchangecolor('')
                          seteyeinteract([])                  
                          fetchNui('np-ui:targetSelectOption',
                            {
                              entity: Entity,
                              option: {
                                event: data.event,
                                ATXEvent: data.ATXEvent,
                                parameters: data.parameters,
                              },
                              context: Context,
                            }
                          )
                        }}
                      >
                          {data.label}
                      </Typography>
                    </div>
                  )
                })
                : <Typography 
                  style = {{
                    color: '#fff',
                    wordBreak: 'break-word',
                    margin: '0',
                  }}
                  variant={'h6'}
                  gutterBottom={true}
                
                >
                  No Entries ;(
                </Typography>
              }
            </div>
          </div>

      </>
  );
}

export default Peek;