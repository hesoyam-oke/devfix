import React, { useState, useEffect, useRef } from 'react';
import './index.css'
import { useNuiEvent } from "../../../hooks/useNuiEvent";
import { fetchNui } from "../../../utils/fetchNui";
import { noop } from '../../../utils/misc';
import {DveXAlert} from '../../main/components';
import { Button, Checkbox, FormControl,  FormControlLabel, FormGroup, InputAdornment, MenuItem, TextField } from '@mui/material';
import useStyles from './index.styles';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const TextBox: React.FC = () => {
    const classes = useStyles();

    const [ShowTextBox, setShowTextBox]: any = useState(false)
    const [Itmes, setItems]: any = useState([])
    const [CallbackUrl, setCallbackUrl]: any = useState('')
    const [Key, setKey]: any = useState('')
    const [values, setValues] = useState({});


    type FrameVisibleSetter = (bool: boolean) => void

    const LISTENED_KEYS = [ "Escape" ]
    const setterRef = useRef<FrameVisibleSetter>(noop)

    useEffect(() => {
      setterRef.current = setShowTextBox
    }, [setShowTextBox])
  
    useEffect(() => {
      const keyHandler = (e: KeyboardEvent) => {
        if (LISTENED_KEYS.includes(e.code)) {
            setterRef.current(false)
            fetchNui('np-ui:closeApp', {}).then(function (firstdata) {
              if(true === firstdata.meta.ok){
                fetchNui('np-ui:applicationClosed', {
                  name: 'textbox',
                  fromEscape: true,
                }).then(function (data) {
                  if(true === data.meta.ok){
                    setShowTextBox(false) 
                    setItems([])
                    setCallbackUrl('')
                    setKey('')
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
      if('textbox' === data.app){
        if(dvexdata.show == null){
          setShowTextBox(false) 
          setItems([])
          setCallbackUrl('')
          setKey('')
          return <DveXAlert AlertText='Error occurred in app: Textbox - restarting...' AlertType='error' />
        }
        if(true === dvexdata.show){

          setShowTextBox(true)
          setItems(dvexdata.items)
          setCallbackUrl(dvexdata.callbackUrl)
          setKey(dvexdata.key)
        }else if (false === dvexdata.show) { 
          setShowTextBox(false)
          setItems([])
          setCallbackUrl('')
          setKey('')

        }
          
      }
    })




    return (
      <>
        <React.Fragment>
          <div style={{display: ShowTextBox ? '' : 'none'}} className={classes.textBoxContainer}>
            <div className={classes.textBoxInputWrapper}>
            {Itmes && Itmes.length > 0 
                  ? Itmes.map(function (data, dvex) {
                    return (
                      <div className='component-simple-form' style={{marginBottom: '16px'}}>
                        <div className='input-wrapper'>
                          <FormControl  
                            fullWidth={true}
                            sx={{width: '100%'}}
                          >
                          {data['_type'] && data['_type'] === 'select' && (
                            <React.Fragment>
                              <TextField
                                id="outlined-select-currency"
                                select
                                variant="standard"
                                label={data.label}
                                onChange={event =>
                                  setValues({
                                    value:{
                                      ...values,
                                      [data.name]: event.target.value
                                    }
                                  })
                                }
                                sx={{
                                  '& .MuiInput-root': {
                                    color: 'white !important',
                                  },
                                  '& label.Mui-focused': {
                                    color: 'darkgray !important',
                                  },
                                  '& Mui-focused': {
                                    color: 'darkgray !important',
                                  },
                                  '& .MuiInput-underline:hover:not(.Mui-disabled):before':
                                    {
                                      borderColor:
                                        'white !important',
                                    },
                                  '& .MuiInput-underline:before':
                                    {
                                      borderColor:
                                        'darkgray !important',
                                      color:
                                        'darkgray !important',
                                    },
                                  '& .MuiInput-underline:after': {
                                    borderColor:
                                      'white !important',
                                    color: 'darkgray !important',
                                  },
                                  '& .Mui-focused:after': {
                                    color: 'darkgray !important',
                                  },
                                  '& .MuiInputAdornment-root': {
                                    color: 'darkgray !important',
                                  },
                                }}
                              >
                                {data.options.map((option) => (
                                  <MenuItem key={option.name} value={option.id}>
                                    {option.name}
                                  </MenuItem>
                                ))}
                              </TextField>
                            </React.Fragment>
                          )} 
                          {data['_type'] && data['_type'] === 'checkbox' && (
                            <React.Fragment>
                              <FormGroup>
                                <FormControlLabel style={{ color: 'darkgray' }} control={<Checkbox color="warning" onChange={event =>
                                  setValues({
                                    value:{
                                      ...values,
                                      [data.name]: event.target.checked
                                    }
                                  })
                                } />} label={data.label} />
                              </FormGroup>
                            </React.Fragment>
                          )} 
                          {data['_type'] && data['_type'] === 'password' && (
                            <React.Fragment>
                              <TextField
                                label={data.label}
                                id="standard-start-adornment"
                                type='password'
                                sx={{
                                  '& .MuiInput-root': {
                                    color: 'white !important',
                                  },
                                  '& label.Mui-focused': {
                                    color: 'darkgray !important',
                                  },
                                  '& Mui-focused': {
                                    color: 'darkgray !important',
                                  },
                                  '& .MuiInput-underline:hover:not(.Mui-disabled):before':
                                    {
                                      borderColor:
                                        'white !important',
                                    },
                                  '& .MuiInput-underline:before':
                                    {
                                      borderColor:
                                        'darkgray !important',
                                      color:
                                        'darkgray !important',
                                    },
                                  '& .MuiInput-underline:after': {
                                    borderColor:
                                      'white !important',
                                    color: 'darkgray !important',
                                  },
                                  '& .Mui-focused:after': {
                                    color: 'darkgray !important',
                                  },
                                  '& .MuiInputAdornment-root': {
                                    color: 'darkgray !important',
                                  },
                                }}
                                InputProps={{
                                  startAdornment: <InputAdornment position="start"><i className={'fas fa-' + data.icon}></i></InputAdornment>,
                                }}
                                variant="standard"
                              />                   
                            </React.Fragment>
                          )} 
                          {data['_type'] == 'text' || !data['_type'] && (
                            <React.Fragment>
                              <TextField
                                label={data.label}
                                id="standard-start-adornment"
                                type='text'
                                sx={{
                                  '& .MuiInput-root': {
                                    color: 'white !important',
                                  },
                                  '& label.Mui-focused': {
                                    color: 'darkgray !important',
                                  },
                                  '& Mui-focused': {
                                    color: 'darkgray !important',
                                  },
                                  '& .MuiInput-underline:hover:not(.Mui-disabled):before':
                                    {
                                      borderColor:
                                        'white !important',
                                    },
                                  '& .MuiInput-underline:before':
                                    {
                                      borderColor:
                                        'darkgray !important',
                                      color:
                                        'darkgray !important',
                                    },
                                  '& .MuiInput-underline:after': {
                                    borderColor:
                                      'white !important',
                                    color: 'darkgray !important',
                                  },
                                  '& .Mui-focused:after': {
                                    color: 'darkgray !important',
                                  },
                                  '& .MuiInputAdornment-root': {
                                    color: 'darkgray !important',
                                  },
                                }}
                                InputProps={{
                                  startAdornment: <InputAdornment position="start"><i className={'fas fa-' + data.icon}></i></InputAdornment>,
                                }}
                                variant="standard"
                              />                   
                            </React.Fragment>
                          )}
                          </FormControl >
                        </div> 
                      </div>
                    )
                  })
                  : <React.Fragment></React.Fragment>
                }
                <div className={classes.textBoxButtonWrapper}>
                  <div>
                    <Button 
                      onClick={function () {
                        fetchNui('np-ui:closeApp', {}).then(function (firstdata) {
                          if(true === firstdata.meta.ok){
                            fetchNui(CallbackUrl, {
                              key: Key,
                              values: values,
                            }).then(function (data) {
                              if(true === data.meta.ok) {
                                fetchNui('np-ui:applicationClosed', {
                                  name: 'textbox',
                                  fromEscape: false,
                                }).then(function (dvexdata) {
                                  if(true === dvexdata.meta.ok){
                                    setShowTextBox(false)
                                    setItems([])
                                    setCallbackUrl('')
                                    setKey('')
                                  }
                                })
                              }
                            })
                          }
                        })
                      }}
                      size='small'
                      color='success'
                      variant='contained'
                      >Submit</Button>
                  </div>
                </div>

            </div>
          </div>
        </React.Fragment>
      </>
    );
  }

export default TextBox;