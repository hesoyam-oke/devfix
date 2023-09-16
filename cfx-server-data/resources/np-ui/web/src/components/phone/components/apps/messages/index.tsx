import React, { useState, useEffect, useRef } from 'react';
import Moment from "react-moment";
import * as ReactDOM from 'react-dom';
import './index.css'
import { useNuiEvent } from "../../../../../hooks/useNuiEvent";
import { useExitListener } from "../../../../../hooks/useExitListener";
import { fetchNui } from "../../../../../utils/fetchNui";
import { isEnvBrowser, noop } from '../../../../../utils/misc';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Button, Checkbox, FormControl, List, ListItemText, Input, ListItem, IconButton, FormControlLabel, FormGroup, Slider, FormHelperText, Grid, Tooltip, Stack, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import useStyles from './index.styles';
import { Checkmark } from 'react-checkmark'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';




const MessagesApp: React.FC = () => {
  const classes = useStyles();
  const [messagesData, setmessagesData]: any = useState([]);
  const [data, setdata]: any = useState([]);
  const [inchat, setinchat]: any = useState(false);
  const [showAddMessageModel, setShowAddMessageModel]: any = useState(false);
  const [showAddMessageLoader, setshowAddMessageLoader]: any = useState(false);
  const [showAddMessageSuccess, setshowAddMessageSuccess]: any = useState(false);
  const [hideinputs, setHideinputs]: any = useState(false);
  const [number, setnumber]: any = useState('');
  const [message, setmessage]: any = useState();
  const [list, setlist]: any = useState([]);
  const [messagesDatalist, setmessagesDatalist]: any = useState([]);
  const [showError, setshowError]: any = useState(false);
  const [targetNumber, settargetNumber]: any = useState(0);
  const [ErrorMessage, setErrorMessage]: any = useState('');
  const [Displayname, setDisplayname]: any = useState();
  const [LoadeConversations, setLoadeConversations]: any = useState(false);
  const [chracterData, setchracterData]: any = useState([]);
  const [messagetextbox, setMessagetextbox] = useState('');
  const messagesRef = useRef(null);
  
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messagesData]);

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && messagetextbox.trim() !== '') {
      fetchNui('np-ui:smsSend', {
        number: targetNumber,
        message: messagetextbox.trim(),
      }).then((result) => {
        if(result.meta.ok){
          setMessagetextbox('');
          setTimeout(function(){
            setmessagesData(result.data);
            setmessagesDatalist(result.data);
          }, 500)
        }
      });
    }
  };
  

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };
  async function fetchData() {
    const resultChar = await fetchNui('np-ui:getCharacter', {});
    setchracterData(resultChar.data);
    const result = await fetchNui('np-ui:getConversations', {});
    setdata(result.data);
    setlist(result.data);
  }
  
  if(!LoadeConversations){
    setLoadeConversations(true)
    fetchData()
  }
  // useEffect(function(){
  //   inchat === true &&
  //     fetchNui('np-ui:getMessages', {
  //       target_number: targetNumber
  //     }).then(function (result) {
  //       setmessagesData(result.data)
  //     })
  // })
  
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.toLowerCase();
    if (inputValue !== '') {
      const filteredList = data.filter((item) =>
        Object.values(item)
          .map((value) => value && value.toString().toLowerCase())
          .some((value) => value && value.includes(inputValue))
      );
      setdata(filteredList);
    } else {
      setdata(list);
    }
  };

  const handleMsgSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.toLowerCase();
    if (inputValue !== '') {
      const filteredList = messagesData.filter((item) =>
        Object.values(item)
          .map((value) => value && value.toString().toLowerCase())
          .some((value) => value && value.includes(inputValue))
      );
      setmessagesData(filteredList);
    } else {
      setmessagesData(messagesDatalist);
    }
  };



  return (
    <>
      <div style={{display: inchat ? 'none' : ''}} className='messages-container-app'>
      <div style={{display: showAddMessageModel ? '' : 'none'}} className={classes.messageModalContainer}>
        <div className={classes.messageModalInnerContainer}>
          <div style={{display: showAddMessageLoader ? '' : 'none'}} className='spinner-wrapper'>
            <div className='lds-spinner'>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <div style={{display: showAddMessageSuccess ? '' : 'none'}} className='spinner-wrapper'>
            <Checkmark size='56px' color='#009688' />
          </div>

          <div style={{display: hideinputs ? 'none' : ''}} className='component-simple-form'>
            <div style={{ display: showError ? '' : 'none', justifyContent: 'center', marginBottom: '10px' }}>
                  <i style={{color: '#ffa726'}} className='fas fa-exclamation fa-2x'></i>
            </div>
            <div style={{display: showError ? '' : 'none', justifyContent: 'center'}}>
              <Typography style={{
									color: '#fff',
									wordBreak: 'break-word',
								  }} variant='body2' gutterBottom>{ErrorMessage}</Typography>
            </div>
            <div style={{display: showError ? '' : 'none', justifyContent: 'center'}} className='buttons'>
            <div>
            <Button onClick={function(){
                setShowAddMessageModel(false) 
                setshowAddMessageLoader(false) 
                setshowAddMessageSuccess(false) 
                setshowError(false)
                setErrorMessage('')
                setHideinputs(false)
                }} size='small' color='success' variant="contained">Okay</Button>
            </div>
            </div>


            <div style={{display: showError ? 'none' : ''}}>
            <FormControl fullWidth sx={{ marginBottom:'15px', width: '100%' }} variant="standard">
              <TextField
                label='Number'
                id="standard-start-adornment"
                type='text'
                onChange={event =>
                  setnumber(event.target.value)
                }
                value={number}
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
                variant="standard"
              />   
            </FormControl>
            </div>
            <div style={{display: showError ? 'none' : ''}}>
            <FormControl fullWidth sx={{  width: '100%' }} variant="standard">
              <TextField
                multiline
                maxRows='15'
                label='Message'
                id="standard-start-adornment"
                onChange={event =>
                  setmessage(event.target.value)
                }
                value={message}
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

                variant="standard"
              />   

            </FormControl>
            </div>

            <div style={{display: showError ? 'none' : ''}} className='buttons'>
            <div>
              <Button onClick={function(){
                setShowAddMessageModel(false) 
                setshowAddMessageLoader(false) 
                setshowAddMessageSuccess(false) 
                setHideinputs(false)
                }} size='small' color='warning'  variant="contained">Cancel</Button>
          </div>
      
          <div>
              <Button onClick={function(){
                setshowAddMessageLoader(true) 
                setHideinputs(true)
                fetchNui('np-ui:smsSend', {
                  number: number,
                  message: message,
                }).then(function (result) {
                  setshowAddMessageLoader(false)
                  if(result.meta.ok){
                    setshowAddMessageSuccess(true)
                    setTimeout(() => {
                      setShowAddMessageModel(false) 
                      setshowAddMessageLoader(false) 
                      setshowAddMessageSuccess(false) 
                      setHideinputs(false)      
                    }, 1500);
                  }else{
                    setshowAddMessageSuccess(false)
                    setshowAddMessageLoader(false)
                    setshowError(true)
                    setErrorMessage(result.meta.message)
                  }
                })
              }} size='small' color='success' variant="contained">Submit</Button>
          </div>

            </div>
          </div>
        </div>
      </div>
      <div style={{marginTop:'35px'}} className={classes.appSearchWrapper}>

          <TextField
            label='Search'
            id="standard-start-adornment"
            type='text'
            onChange={handleSearchChange}
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
              startAdornment: <InputAdornment position="start"><i className="fas fa-search"></i></InputAdornment>,
            }}
            variant="standard"
          />    
      </div>
      <div style={{marginTop:'35px'}} className={classes.appIcon}>
        <Tooltip title='Send Message' placement='left' arrow>
          <div
            onClick={function () {
                setShowAddMessageModel(true) 
                setshowAddMessageLoader(false) 
                setshowAddMessageSuccess(false) 
                setHideinputs(false)
            }}
            style={{
              fontSize: '1.5em',
            }}
          >
            <i className={`fas fa-comment fa-w-16`}></i>
          </div>
        </Tooltip>
      </div>
      <div className={classes.appList}>
        {data && data.length > 0
          ? data.map(function (action: any) {
            
            return (
              <div onClick={function() {
                    settargetNumber(chracterData.phone_number === action.number_from ? action.number_to : action.number_from)
                    setDisplayname(action.displayName)
                    fetchNui('np-ui:getMessages', {
                      target_number: chracterData.phone_number === action.number_from ? action.number_to : action.number_from
                    }).then(function (result) {
                      setmessagesData(result.data)
                      setmessagesDatalist(result.data)
                    })
                    setinchat(true)
                  }} className='component-paper cursor-pointer'>
                  <div className='main-container'>
                    <div className='image'>
                      <i className='fas fa-user-circle fa-w-16 fa-fw fa-3x'></i>
                    </div>
                    <div className='details'>
                      <div className='title'>
                        <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>
                          {action.displayName ? action.displayName : chracterData.phone_number === action.number_from ? action.number_to : action.number_from}
                        </Typography>
                      </div>
                      <div className='messages-container-description'>
                        <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>
                          {action.message}
                        </Typography>
                      </div>
                    </div>
                  </div>
              </div>
              )
          }) 
        : <div style={{ display:'flex', flexDirection: 'column', textAlign: 'center' }} className='flex-centered'>
            <i className="fas fa-frown fa-w-16 fa-fw fa-3x" style={{ color: '#fff', marginBottom: '32px' }}></i>
            <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="h6" gutterBottom>
              Nothing Here!
            </Typography>
          </div>
        } 
      </div>
      </div>
      <div style={{display: inchat ? '' : 'none'}} className='messages-container-app'>
        <div className={classes.chatOuterContainer}>
          <div className={classes.chatInnerContainer}>
            <div className={classes.chatSearch}>
              <Tooltip sx={{backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px'}} arrow placement="right" title="Go Back">
                <div style={{ color: '#fff', width: '40px', display: 'flex', alignItems: 'center' }}>
                  <i onClick={function() {setinchat(false)}} className='fas fa-chevron-left fa-w-10 fa-fw fa-lg'></i>
                </div>
              </Tooltip>
              <div className={classes.chatSearchWrapper}>
                <div className='input-wrapper'>
                  <FormControl fullWidth sx={{  width: '100%' }} variant="standard">
                  <TextField
                    label='Search'
                    id="standard-start-adornment"
                    type='text'
                    onChange={handleMsgSearchChange}
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
                      startAdornment: <InputAdornment position="start"><i className="fas fa-search"></i></InputAdornment>,
                    }}
                    variant="standard"
                  />    
                  </FormControl>
                </div>
              </div>
            </div>
            <div className={classes.chatIcon}>
              <div className={classes.chatIconWrapper}>
                <Tooltip sx={{backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px'}} arrow placement="left" title="Call">
                  <i style={{ fontSize: '1.2em' }} className='fas fa-phone fa-w-16 fa-fw fa-lg'></i>
                </Tooltip>
              </div>
            </div>
            <div style={{display: Displayname === null ? '' : 'none', right: '50px'}} className={classes.chatIcon}>
              <div className={classes.chatIconWrapper}>
                <Tooltip sx={{backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px'}} arrow placement="left" title="Add Contact">
                  <i style={{ fontSize: '1.2em' }} className='fas fa-user-plus fa-w-16 fa-fw fa-lg'></i>
                </Tooltip>
              </div>
            </div>
            <div className={classes.chatMessages}>
              <div style={{marginTop:'35%', marginLeft:'5%'}} className={classes.contactInfo}>
                <div className={classes.icon}>
                  <i className='fas fa-user-circle fa-w-16 fa-fw fa-2x'></i>
                </div>
                <div className='text'>
                  {Displayname === null ?
                    <>
                      <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant='body2' gutterBottom>
                        {targetNumber}
                      </Typography>
                    </>
                    :
                    <>
                      <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant='body2' gutterBottom>
                        {Displayname}
                      </Typography>
                      <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant='body2' gutterBottom>
                        {targetNumber}
                      </Typography>
                    </>
                  }
                </div>
              </div>
              <div style={{marginBottom: '20px'}} className='messages' ref={messagesRef}>
                {messagesData && messagesData.length > 0
                  && messagesData.map(function (action: any) {
                      return (
                        <>
                        {targetNumber !== action.number_to ? 
                          <div className='message message-in'>
                            <div className='inner inner-in'>
                              <Typography style={{  color: '#fff', wordBreak: 'break-word' }} variant='body2' gutterBottom>
                                {action.message}
                              </Typography>
                            </div>
                            <div className='timestamp timestamp-in'>
                              <Typography style={{ wordBreak: 'break-word' }} variant='body2' gutterBottom>
                                <Moment fromNow>{action.timestamp}</Moment>
                              </Typography>
                            </div>
                          </div>
                        : <div className='message message-out'>
                            <div className='inner inner-out'>
                              <Typography style={{  color: '#fff', wordBreak: 'break-word' }} variant='body2' gutterBottom>
                                {action.message}
                              </Typography>
                            </div>
                            <div className='timestamp timestamp-out'>
                              <Typography style={{ wordBreak: 'break-word' }} variant='body2' gutterBottom>
                                <Moment fromNow>{action.timestamp}</Moment>
                              </Typography>
                            </div>
                          </div>}
                        </>
                      )
                  }) 
                } 
              </div>
              <div className='send-message'>
                <textarea
                  value={messagetextbox}
                  onChange={(e) => setMessagetextbox(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onKeyPress={handleKeyPress}
                  placeholder="Send message..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MessagesApp;