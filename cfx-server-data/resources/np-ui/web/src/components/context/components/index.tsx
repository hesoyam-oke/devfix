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

const Context: React.FC = () => {
    const classes = useStyles();

    const [ShowContext, setShowContext]: any = useState(false)
    const [Options, setOptions]: any = useState([])
    const [Optionschildren, setOptionschildren]: any = useState([])
    const [IsRightOrLeft, setIsRightOrLeft]: any = useState('right')

    type FrameVisibleSetter = (bool: boolean) => void

    const LISTENED_KEYS = [ "Escape" ]
    const setterRef = useRef<FrameVisibleSetter>(noop)

    useEffect(() => {
      setterRef.current = setShowContext
    }, [setShowContext])
  
    useEffect(() => {
      const keyHandler = (e: KeyboardEvent) => {
        if (LISTENED_KEYS.includes(e.code)) {
          setterRef.current(false)
          fetchNui('np-ui:closeApp', {}).then(function (firstdata) {
            if(true === firstdata.meta.ok){
              fetchNui('np-ui:applicationClosed', {
                name: 'contextmenu',
                fromEscape: true,
              }).then(function (data) {
                if(true === data.meta.ok){
                  setShowContext(false) 
                  setOptions([]) 
                  setOptionschildren([])
                  setIsRightOrLeft('right')
                }
              })
            }
          })
        }
      }
  
      window.addEventListener("keydown", keyHandler)
  
      return () => window.removeEventListener("keydown", keyHandler)
    }, []);

    useNuiEvent('uiMessage', (data) => {
      if ('contextmenu' === data.app) {
        if (true === data.show){
          setOptions([])
          setIsRightOrLeft(data.data.position)
          setOptions(data.data.options)
          setShowContext(data.show)
        }
      }
    })

    var Action = function (action, key, disabled, children, backButton, extraAction) {
      if (true === backButton) {
        setShowContext(false);
        setTimeout(function () {
          setOptions(Optionschildren);
          setShowContext(true);
        }, 100);
        return;
      }
      if (action) {
        if (!disabled) {
          fetchNui('np-ui:closeApp', {}).then(function (cb) {
            if (true === cb.meta.ok) {
              fetchNui(action, { key: key }).then(function (cH) {
                if (true === cH.meta.ok) {
                  fetchNui('np-ui:applicationClosed', {
                    name: 'contextmenu',
                    fromEscape: false,
                  }).then(function (data) {
                    if (true === data.meta.ok) {
                      setShowContext(false);
                      setOptionschildren([]);
                      setOptions([]);
                    }
                  });
                }
              });
            }
          });
        }
      } else if (children) {
        setOptionschildren(Options)
        setShowContext(false);
        setTimeout(function () {
          if (extraAction) {
            fetchNui(extraAction, { key: key });
          }
          if (0 === Optionschildren.length) {
            setOptions(Optionschildren);
          }
          var firstChildren: any = [
            {
              title: 'Go Back',
              backButton: true,
            },
          ].concat(children);
          setOptions(firstChildren);
          setShowContext(true);
        }, 100);
      }
    }
    return (
        <>
          {IsRightOrLeft === 'left' && Options && Options.length > 0 &&
            <div className="context-outer-container">
              <div className={classes.contextFlexContainer} style={{paddingLeft: '120px'}}>
                    <div className={classes.contextLeftInnerContainer}>
                            {Options.map((option) => {
                              return (
                                <>
                                  <div 
                                    onClick={function () { 
                                      return Action(
                                          option.action, 
                                          option.key, 
                                          option.disabled, 
                                          option.children, 
                                          option.backButton, 
                                          option.extraAction
                                      ) 
                                  }}
                                    className={classes.contextButton}
                                    style={{
                                        opacity: ShowContext ? '1' : '0',
                                        paddingRight: option.children ? '0px' : '8px',
                                        paddingLeft: option.backButton ? '0px' : '8px',
                                        marginBottom: option.backButton ? '16px' : '8px',
                                        transition: 'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                                    }}>
                                          <div style={{
                                              display:
                                              option.icon ? 'block' : 'none',
                                              margin: 'auto 0px',
                                              width: '10%',
                                          }}>
                                            <i className={'fas fa-' + option.icon + ' fa-w-14 fa-fw'} style={{ color: '#fff' }}></i>
                                          </div>
                                          <div className={classes.contextButtonFlex}>
                                           
                                              <div className={classes.contextButtonChevron} style={{
                                                  display:
                                                    option.backButton
                                                      ? ''
                                                      : 'none',
                                                }}>
                                                  <i className='fas fa-chevron-left fa-w-10 fa-fw' style={{ color: '#fff' }}></i>
                                              </div>
                                              <div>
                                              <Typography
                                                  style={{ color: '#fff', wordBreak: 'break-word' }}
                                                  variant="body1"
                                                  gutterBottom={true}
                                                  >
                                                  {option.title}
                                              </Typography>

                                              <Typography
                                                  style={{ color: '#fff', wordBreak: 'break-word' }}
                                                  variant="body2"
                                                  gutterBottom={true}
                                                  >
                                                  {option.description}
                                              </Typography>
                                              </div>

                                      </div>
                                            <div className={classes.contextButtonChevron} style={{display: option.children ? '' : 'none'}}>
                                              <i className='fas fa-chevron-right fa-w-10 fa-fw' style={{ color: '#fff' }}></i>
                                            </div>
                                    </div>


                                </>
                              )
                            })}
                    </div>
                </div>
                </div>
                  }
          {IsRightOrLeft === 'right' && Options && Options.length > 0 &&
            <div className="context-outer-container">
              <div className={classes.contextFlexContainer} style={{paddingLeft: '1220px'}}>
                    <div className={classes.contextRightInnerContainer}>
                            {Options.map((option) => {
                              return (
                                <>

                                    <div 
                                    onClick={function () { 
                                      return Action(
                                          option.action, 
                                          option.key, 
                                          option.disabled, 
                                          option.children, 
                                          option.backButton, 
                                          option.extraAction
                                      ) 
                                  }}
                                    className={classes.contextButton}
                                    style={{
                                        opacity: ShowContext ? '1' : '0',
                                        paddingRight: option.children ? '0px' : '8px',
                                        paddingLeft: option.backButton ? '0px' : '8px',
                                        marginBottom: option.backButton ? '16px' : '8px',
                                        transition: 'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                                    }}>
                                        <div style={{
                                            display:
                                            option.icon ? 'block' : 'none',
                                            margin: 'auto 0px',
                                            width: '10%',
                                        }}>
                                          <i className={'fas fa-' + option.icon + ' fa-w-14 fa-fw'} style={{ color: '#fff' }}></i>
                                          </div>
                                          <div className={classes.contextButtonFlex}>
                                           
                                              <div className={classes.contextButtonChevron} style={{
                                                  display:
                                                    option.backButton
                                                      ? ''
                                                      : 'none',
                                                }}>
                                                  <i className='fas fa-chevron-left fa-w-10 fa-fw' style={{ color: '#fff' }}></i>

                                              </div>
                                              <div>
                                                <Typography
                                                    style={{ color: '#fff', wordBreak: 'break-word' }}
                                                    variant="body1"
                                                    gutterBottom={true}
                                                    >
                                                    {option.title}
                                                </Typography>

                                                <Typography
                                                    style={{ color: '#fff', wordBreak: 'break-word' }}
                                                    variant="body2"
                                                    gutterBottom={true}
                                                    >
                                                    {option.description}
                                                </Typography>
                                              </div>
                                       
                                        
                                      </div>
                                          <div className={classes.contextButtonChevron} style={{display: option.children ? '' : 'none'}}>
                                            <i className='fas fa-chevron-right fa-w-10 fa-fw' style={{ color: '#fff' }}></i>
                                          </div>
                                    </div>


                                </>
                              )
                            })}
                    </div>
                </div>
                </div>
                  }
        </>
    );}

export default Context;