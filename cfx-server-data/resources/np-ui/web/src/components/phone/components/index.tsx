import React, { useState, useEffect, useRef } from 'react';
import './index.css'
import { useNuiEvent } from "../../../hooks/useNuiEvent";
import { fetchNui } from "../../../utils/fetchNui";
import { Button, FormControl, Tooltip, InputAdornment, Badge, MenuItem, TextField, Typography } from '@mui/material';
import useStyles from './index.styles';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {DveXAlert} from '../../main/components';
import DetailsApp from './apps/details';
import ContactsApp from './apps/contacts';
import CallsApp from './apps/calls';
import MessagesApp from './apps/messages';
import PingerApp from './apps/erpinger';
import EmailApp from './apps/email';
import YellowPagesApp from './apps/yellow-pages';
import TwatterApp from './apps/twatter';
import VehiclesApp from './apps/vehicles';
import DebtApp from './apps/debt';
import WenmoApp from './apps/wenmo';
import DocumentsApp from './apps/documents';
import HousingApp from './apps/housing';
import JobCenterApp from './apps/job-center';
import MilkRoadApp from './apps/milk-road';
import Notifications from './notification';
import { Checkmark } from 'react-checkmark'

let eddedimages = false
function NotificationData() {
  const [notifications, setNotifications] = useState([]);

  function addNotification(notification) {
    setNotifications((prevNotifications) => [...prevNotifications, notification]);
  }

  function deleteNotification(id) {
    setNotifications((prevNotifications) => prevNotifications.filter((notification) => notification.id !== id));
  }

  return {
    notifications,
    addNotification,
    deleteNotification
  };
}

const Phone: React.FC = () => {
    const classes = useStyles();
    let Sx: any = NotificationData()
    let Sk = Sx.addNotification
    let Sv = Sx.deleteNotification
    let SP = Sx.notifications

    const [ShowPhone, setShowPhone]: any = useState(false)
    const [showApp, setShowApp]: any = useState(true)
    const [switchOrientation, setSwitchOrientation]: any = useState(false)
    const [Brand, setBrand]: any = useState('android')
    const [Background, setBackground]: any = useState('https://i.imgur.com/3KTfLIV.jpg')
    const [ReceiveSms, setReceiveSms]: any = useState(true)
    const [NewTweet, setNewTweet]: any = useState(true)
    const [ReceiveEmail, setReceiveEmail]: any = useState(true)
    const [Embeddedimages, setEmbeddedimages]: any = useState(true)
    const [Serverid, setServerid]: any = useState(0)
    const [NotiID, setNotiID]: any = useState(0);
    const [showMilkRoade, setShowMilkRoade]: any = useState(false);
    const [inWifieZone, setinWifieZone]: any = useState(false);
    const [Time, setTime]: any = useState('00:00')
    
    const [showAddMilkRoadeModel, setShowAddMilkRoadeModel]: any = useState(false)
    const [showAddMilkRoadeLoader, setshowAddMilkRoadeLoader]: any = useState(false)
    const [showAddMilkRoadeSuccess, setshowAddMilkRoadeSuccess]: any = useState(false)
    const [hideinputs, setHideinputs]: any = useState(false)
    const [Password, setPasswordInput]: any = useState()
    const [showError, setshowError]: any = useState(false)
    const [ErrorMessage, setErrorMessage]: any = useState('')
    
    const [CurrentApp, SetCurrentApp]: any = useState('home')
    
    type FrameVisibleSetter = (bool: boolean) => void
    const LISTENED_KEYS = [ "Escape" ]

    useEffect(() => {
      const keyHandler = (e: KeyboardEvent) => {
        if (LISTENED_KEYS.includes(e.code)) {
            SetCurrentApp('home')
            setShowApp(true) 
            setShowPhone(false) 
            setSwitchOrientation(false)
            fetchNui('np-ui:closeApp', {}).then(function (firstdata) {
              if(true === firstdata.meta.ok){
                fetchNui('np-ui:applicationClosed', {
                  name: 'phone',
                  fromEscape: true,
                }).then(function (data) {
                  if(true === data.meta.ok){
                    SetCurrentApp('home')
                    setShowPhone(false) 
                  }
                }).catch(function(error){
                  return <DveXAlert AlertText='Error occurred in app: Phone - restarting...' AlertType='error' />
                })
              }
            }).catch(function(error){
              return <DveXAlert AlertText='Error occurred in app: Phone - restarting...' AlertType='error' />
            })
        }
      }
  
      window.addEventListener("keydown", keyHandler)
  
      return () => window.removeEventListener("keydown", keyHandler)
    }, []);
    
    var pa = function (ps) {
      {
      var pQ = ('' + ps)
        .replace(/\D/g, '')
        .match(/^(\d{3})(\d{3})(\d{4})$/)
      return pQ ? '(' + pQ[1] + ') ' + pQ[2] + '-' + pQ[3] : ps
      }
    }

    useNuiEvent('uiMessage', function (data) {
      var dvexdata = data.data
      if ('game' === data.app){
        if(true === dvexdata.location) {
          setinWifieZone(true)
          setShowMilkRoade(false)
        }else{
          setinWifieZone(false)
          setShowMilkRoade(false)
        }
      }
      if ('phone' === data.app) {
        if (data.close){
          setShowApp(false)
          setShowPhone(false)
          return
        }
        if (true === dvexdata.show) {
          setShowApp(false)
          setShowPhone(true)
          setShowApp(true)
          setServerid(dvexdata.serverid)
        }
        
        if('time' == dvexdata.action){
          setTime(dvexdata.time)
        }

        if('sms-receive' === dvexdata.action){
          Sk({
            id: NotiID,
            isCall: false,
            calls: {
            receive: false,
            dialing: false,
            progress: false,
            inactive: false,
            },
            isConfirmation: false,
            confirmation: {},
            header: pa(dvexdata.number),
            content: dvexdata.message,
            isPerma: false,
            cancelButton: false,
            jobGroupId: 0,
            icon: 'fas fa-comment',
            iconColor: '#fff',
            bgColor: '#8dc348',
          })

          setNotiID(NotiID + 1)
        }

        if('home-screen' === dvexdata.action){
          Sk({
            id: NotiID,
            isCall: false,
            calls: {
            receive: false,
            dialing: false,
            progress: false,
            inactive: false,
            },
            isConfirmation: false,
            confirmation: {},
            header: dvexdata.title,
            content: dvexdata.body,
            isPerma: false,
            cancelButton: false,
            jobGroupId: 0,
            icon: 'fas fa-home',
            iconColor: '#fff',
            bgColor: dvexdata.bgColor,
          })
          setNotiID(NotiID + 1)
        }

        if('generic-confirmation' === dvexdata.action){
          Sk({
            id: NotiID,
            isCall: false,
            calls: {
              receive: false,
              dialing: false,
              progress: false,
              inactive: false,
            },
            isConfirmation: true,
            confirmation: {
              id: dvexdata._data.confirmationId,
              onAccept: dvexdata.onAccept,
              onReject: dvexdata.onReject,
              timeOut: dvexdata.timeOut,
            },
            header: dvexdata.title,
            content: dvexdata.text,
            isPerma: false,
            cancelButton: false,
            jobGroupId: 0,
            icon: 'fas fa-'+dvexdata.icon.name,
            iconColor: dvexdata.icon.color,
            bgColor: dvexdata.bgColor,
          })

          setNotiID(NotiID + 1)
        }

        if('twatter-receive' === dvexdata.action){
          if(dvexdata.hasPhone){
            Sk({
              id: NotiID,
              isCall: false,
              calls: {
              receive: false,
              dialing: false,
              progress: false,
              inactive: false,
              },
              isConfirmation: false,
              confirmation: {},
              header: '@'+dvexdata.character.first_name+'_'+dvexdata.character.last_name,
              content: dvexdata.text,
              isPerma: false,
              cancelButton: false,
              jobGroupId: 0,
              icon: 'fab fa-twitter',
              iconColor: '#fff',
              bgColor: '#0eabef',
            })

            setNotiID(NotiID + 1)
          }
        }

        if('call-receiving' === dvexdata.action){
          Sk({
            id: NotiID,
            isCall: true,
            calls: {
              callId: dvexdata.callId,
              receive: true,
              dialing: false,
              progress: false,
              inactive: true,
            },
            isConfirmation: false,
            confirmation: {},
            header: pa(dvexdata.number),
            content: 'Incoming Call',
            isPerma: true,
            cancelButton: false,
            jobGroupId: 0,
            icon: 'fas fa-phone',
            iconColor: '#fff',
            bgColor: 'rgb(0, 150, 136)',
          })

          setNotiID(NotiID + 1)
        }

        if('call-in-progress' === dvexdata.action){
          Sk({
            id: NotiID,
            isCall: true,
            calls: {
            callId: dvexdata.callId,
            receive: false,
            dialing: false,
            progress: true,
            inactive: false,
            },
            isConfirmation: false,
            confirmation: {},
            header: pa(dvexdata.number),
            content: '00:00',
            isPerma: true,
            cancelButton: false,
            jobGroupId: 0,
            icon: 'fas fa-phone',
            iconColor: '#fff',
            bgColor: 'rgb(0, 150, 136)',
          })

          setNotiID(NotiID + 1)
        }

        if('call-dialing' === dvexdata.action){
          Sk({
            id: NotiID,
            isCall: true,
            calls: {
            callId: dvexdata.callId,
            receive: false,
            dialing: true,
            progress: false,
            inactive: false,
            },
            isConfirmation: false,
            confirmation: {},
            header: pa(dvexdata.number),
            content: 'Dialing...',
            isPerma: true,
            cancelButton: false,
            jobGroupId: 0,
            icon: 'fas fa-phone',
            iconColor: '#fff',
            bgColor: 'rgb(0, 150, 136)',
          })      

          setNotiID(NotiID + 1)
        }

        if('call-inactive' === dvexdata.action){
          Sk({
            id: NotiID,
            isCall: false,
            calls: {
            receive: false,
            dialing: false,
            progress: false,
            inactive: true,
            },
            isConfirmation: false,
            confirmation: {},
            header: pa(dvexdata.number),
            content: 'Disconnected!',
            isPerma: false,
            cancelButton: false,
            jobGroupId: 0,
            icon: 'fas fa-phone',
            iconColor: '#fff',
            bgColor: 'rgb(0, 150, 136)',
          }) 

          setNotiID(NotiID + 1)
        }
        if('job-notification' === dvexdata.action) {
          fetchNui('setJobNotifcationId', { id: NotiID })
        }
      }
      
      if ('game' === data.app) {
        if(data['time']){
          setTime(data['time'])
        }
      }

      if ('preferences' === data.app) {
        undefined !== data['phone.misc.brand']
          ? setBrand(data['phone.misc.brand'])
          : setBrand('android')
        undefined !== data['phone.misc.background']
          ? setBackground(data['phone.misc.background'])
          : setBackground('https://i.imgur.com/3KTfLIV.jpg')
        undefined !== data['phone.misc.receive.sms'] &&
          setReceiveSms(data['phone.misc.receive.sms'])
        undefined !== data['phone.misc.new.tweet'] &&
          setNewTweet(data['phone.misc.new.tweet'])
        undefined !== data['phone.misc.receive.email'] &&
          setReceiveEmail(data['phone.misc.receive.email'])
        undefined !== data['phone.misc.embedded.images'] &&
          setEmbeddedimages(data['phone.misc.embedded.images'])
      }
    })

    function openApp(pAppName){
      SetCurrentApp(pAppName)
      setSwitchOrientation(false)
      setShowApp(false)
    }

    return (
      <>
      <div className={switchOrientation ? classes.phoneContainerSwitch : classes.phoneContainer} style={{ bottom: ShowPhone ? '12px' : SP.length ? '-540px' : '-1000px', background: 'url('+Background+') 0% 0% / cover repeat'}}>
      <div style={{display: showAddMilkRoadeModel ? '' : 'none'}} className={classes.MilkRoadeModalContainer}>
        <div className={classes.MilkRoadeModalInnerContainer}>
          <div style={{display: showAddMilkRoadeLoader ? '' : 'none'}} className='spinner-wrapper'>
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
          <div style={{display: showAddMilkRoadeSuccess ? '' : 'none'}} className='spinner-wrapper'>
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
                setShowAddMilkRoadeModel(false) 
                setshowAddMilkRoadeLoader(false) 
                setshowAddMilkRoadeSuccess(false) 
                setshowError(false)
                setErrorMessage('')
                setHideinputs(false)
                }} size='small' color='success' variant="contained">Okay</Button>
            </div>
            </div>

          
            <div style={{display: showError ? 'none' : ''}}>
            <FormControl fullWidth sx={{  width: '100%' }} variant="standard">
              <div style={{marginBottom:'5px'}}>
                <TextField
                  id="standard-select-currency"
                  select
                  label="Network:"
                  defaultValue="Public Hotspot"
                  variant="standard"
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
                  <MenuItem key={'Public Hotspot'} value={'Public Hotspot'}>
                    Public Hotspot
                  </MenuItem>
                </TextField>
              </div>  

              <div>
              <TextField
                label='Password'
                id="standard-start-adornment"
                type='text'
                onChange={event =>
                  setPasswordInput(event.target.value)
                }
                value={Password}
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
                  startAdornment: <InputAdornment position="start"><i className="fas fa-user-lock"></i></InputAdornment>,
                }}
                variant="standard"
              />   
              </div>

            </FormControl>
            </div>
            <div style={{display: showError ? 'none' : ''}} className='buttons'>
            <div>
              <Button onClick={function(){
                setShowAddMilkRoadeModel(false) 
                setshowAddMilkRoadeLoader(false) 
                setshowAddMilkRoadeSuccess(false) 
                setHideinputs(false)
                }} size='small' color='warning'  variant="contained">Cancel</Button>
          </div>
          <div>
              <Button onClick={function(){
                setshowAddMilkRoadeLoader(true) 
                setHideinputs(true)
                // if(Password === 1111){
                  setshowAddMilkRoadeLoader(false)
                  setshowAddMilkRoadeSuccess(true)
                  setTimeout(() => {
                    setShowAddMilkRoadeModel(false) 
                    setshowAddMilkRoadeLoader(false) 
                    setshowAddMilkRoadeSuccess(false) 
                    setHideinputs(false)  
                    setShowMilkRoade(true)
                  }, 1500);
                // }else{
                //   setshowAddMilkRoadeSuccess(false)
                //   setshowAddMilkRoadeLoader(false)
                //   setshowError(true)
                //   setShowMilkRoade(false)
                // }
              }} size='small' color='success' variant="contained">Submit</Button>
          </div>
            </div>
          </div>
        </div>
      </div>
        <div style={{display: 'ios' === Brand ? '' : 'none', zIndex: 505}} className='notch'>
            <div className='camera'></div>
            <div className='speaker'></div>
        </div>
        <div style={{zIndex: 501}} className={classes.phoneTopContainer}>
          <div className={classes.phoneTopLeftContainer}>
              <Typography style={{  wordBreak: 'break-word',  fontSize: '0.75rem',  lineHeight: '0',  textShadow:	'rgb(55 71 79) -1px 1px 0px, rgb(55 71 79) 1px 1px 0px, rgb(55 71 79) 1px -1px 0px, rgb(55 71 79) -1px -1px 0px' }} variant='body2' gutterBottom>
                {Time}
              </Typography>
              <div className={classes.phoneTopLeftDivider}>
              <Typography style={{  textAlign: 'right',  fontSize: '0.75rem',  lineHeight: '0',  textShadow:	'rgb(55 71 79) -1px 1px 0px, rgb(55 71 79) 1px 1px 0px, rgb(55 71 79) 1px -1px 0px, rgb(55 71 79) -1px -1px 0px' }} variant='body2' gutterBottom>
                #{Serverid}
              </Typography>

              </div>
          </div>
          <div className={classes.phoneTopMiddleContainer}></div>
          <div className={classes.phoneTopRightContainer}>
            <i className='fas fa-sun fa-w-16 fa-fw fa-sm' style={{  WebkitTextStrokeColor: 'black',  WebkitTextStrokeWidth: '0.3px',  marginLeft: '4px' }}></i>
            <i className='fas fa-unlock fa-w-14 fa-fw fa-sm' style={{  WebkitTextStrokeColor: 'black',  WebkitTextStrokeWidth: '0.3px',  marginLeft: '4px', color: 'rgb(96, 125, 139)' }}></i>
            <i onClick={function(){if(true === inWifieZone){setShowAddMilkRoadeModel(true)}}} className={inWifieZone ? 'fas fa-wifi fa-w-20 fa-fw fa-sm' : 'fas fa-signal fa-w-20 fa-fw fa-sm'} style={{  WebkitTextStrokeColor: 'black',  WebkitTextStrokeWidth: '0.3px',  marginLeft: '4px' }}></i>
          </div>
        </div>
        <div style={{zIndex: 501}} className='phone-bottom-container'>
          <div>
            <Tooltip sx={{backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px'}} arrow placement="top" title="Toggle Sounds">
              <i className='fas fa-bell fa-w-14 fa-fw fa-sm'></i>
            </Tooltip>
          </div>
          <div>
            <Tooltip sx={{backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px'}} arrow placement="top" title="Selfie!">
              <i className='fas fa-camera fa-w-16 fa-fw fa-sm'></i>
            </Tooltip>
          </div>
          <div onClick={function() {
            setShowApp(true)
            SetCurrentApp('home')
          }}>
            <Tooltip sx={{backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px'}} arrow placement="top" title="Home">
              <i className='far fa-circle fa-w-16 fa-fw fa-lg'></i>
            </Tooltip>
          </div>
          <div onClick={function() {if('home' === CurrentApp){setSwitchOrientation(!switchOrientation)}}}>
            <Tooltip sx={{backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px'}} arrow placement="top" title="Switch Orientation">
              <i className='fas fa-sync-alt fa-w-16 fa-fw fa-sm'></i>
            </Tooltip>
          </div>
          <div>
            <Tooltip sx={{backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px'}} arrow placement="top" title="Explorer">
              <i className='fab fa-internet-explorer fa-w-16 fa-fw fa-sm'></i>
            </Tooltip>
          </div>
        </div>
        <div style={{
							  zIndex: 501,
							  display: SP.length ? '' : 'none',
        }} className='top-notifications-wrapper top-notifications-wrapper-mounted'>
          {SP.map(function (ps) {
            return <Notifications deleteNotification={Sv} notification={ps}></Notifications>
        })}
        </div>
        <div className='phone-app-container' style={{background: 'rgba(0, 0, 0, 0)'}}>
          <div className={classes.phoneAppInnerContainer}>
            <div style={{display: showApp ? '' : 'none',}} className={classes.phoneAppApps}>
              <div onClick={function() {openApp('details')}} style={{ color: '#fff', textDecoration: 'none' }}>
                <Tooltip sx={{backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px'}} arrow placement="top" title="Details">
                  <div style={{color: '#fff', background:'linear-gradient(356deg, rgba(0,132,255,1) 9%, rgba(75,181,255,1) 55%)'}} className={classes.phoneApp}>
                    <img style={{ height: '54px', borderRadius: '14px' }} src={`https://gta-assets.nopixel.net/images/phone-icons/details.png`}></img>
                  </div>
                </Tooltip>
              </div>
              <div onClick={function() {openApp('contacts')}} style={{ color: '#fff', textDecoration: 'none' }}>
                <Tooltip sx={{backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px'}} arrow placement="top" title="Contacts">
                  <div style={{color: '#fff', background:'linear-gradient(356deg, rgba(0,44,74,1) 9%, rgba(0,65,110,1) 55%)'}} className={classes.phoneApp}>
                    <img style={{ height: '54px', borderRadius: '14px' }} src={`https://gta-assets.nopixel.net/images/phone-icons/contacts.png`}></img>
                  </div>
                </Tooltip>
              </div>
              <div onClick={function() {openApp('calls')}} style={{ color: '#fff', textDecoration: 'none' }}>
                <Tooltip sx={{backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px'}} arrow placement="top" title="Calls">
                  <div style={{color: '#fff', background:'linear-gradient(0deg, rgb(60, 194, 122) 0%, rgba(5,136,66,1) 100%)'}} className={classes.phoneApp}>
                    <img style={{ height: '54px', borderRadius: '14px' }} src={`https://gta-assets.nopixel.net/images/phone-icons/calls.png`}></img>
                  </div>
                </Tooltip>
              </div>
              <div onClick={function() {openApp('messages')}} style={{ color: '#fff', textDecoration: 'none' }}>
                <Tooltip sx={{backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px'}} arrow placement="top" title="Messages">
                  <div style={{color: '#fff', background:'linear-gradient(0deg, rgba(0,182,21,1) 0%, rgba(128,236,109,1) 100%)'}} className={classes.phoneApp}>
                    <img style={{ height: '54px', borderRadius: '14px' }} src={`https://gta-assets.nopixel.net/images/phone-icons/conversations.png`}></img>
                  </div>
                </Tooltip>
              </div>
              <div onClick={function() {openApp('erpinger')}} style={{ color: '#fff', textDecoration: 'none' }}>
                <Tooltip sx={{backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px'}} arrow placement="top" title="Ping!">
                  <div style={{color: '#fff', background:'linear-gradient(0deg, rgba(72,105,255,1) 0%, rgba(121,37,255,1) 100%)'}} className={classes.phoneApp}>
                    <img style={{ height: '54px', borderRadius: '14px' }} src={`https://gta-assets.nopixel.net/images/phone-icons/erpinger.png`}></img>
                  </div>
                </Tooltip>
              </div>
              <div onClick={function() {openApp('email')}} style={{ color: '#fff', textDecoration: 'none' }}>
                <Tooltip sx={{backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px'}} arrow placement="top" title="Email">
                  <div style={{color: '#fff', background:'linear-gradient(0deg, rgba(114,213,227,1) 0%, rgba(0,140,237,1) 100%)'}} className={classes.phoneApp}>
                    <img style={{ height: '54px', borderRadius: '14px' }} src={`https://gta-assets.nopixel.net/images/phone-icons/email.png`}></img>
                  </div>
                </Tooltip>
              </div>
              <div onClick={function() {openApp('yellow-pages')}} style={{ color: '#fff', textDecoration: 'none' }}>
                <Tooltip sx={{backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px'}} arrow placement="top" title="YP">
                  <div style={{color: '#fff', background:'linear-gradient(0deg, rgba(255,191,0,1) 0%, rgba(255,191,0,1) 100%)'}} className={classes.phoneApp}>
                    <div className={classes.badgeDotApp}></div>
                    <img style={{ height: '54px', borderRadius: '14px' }} src={`https://gta-assets.nopixel.net/images/phone-icons/yellow-pages.png`}></img>
                  </div>
                </Tooltip>
              </div>
              <div onClick={function() {openApp('twatter')}} style={{ color: '#fff', textDecoration: 'none' }}>
                <Tooltip sx={{backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px'}} arrow placement="top" title="Twatter">
                  <div style={{color: '#fff', background:'linear-gradient(0deg, rgba(23,23,23,1) 0%, rgba(23,23,23,1) 100%)'}} className={classes.phoneApp}>
                    <div className={classes.badgeDotApp}></div>
                    <img style={{ height: '54px', borderRadius: '14px' }} src={`https://gta-assets.nopixel.net/images/phone-icons/twatter.png`}></img>
                  </div>
                </Tooltip>
              </div>
              <div onClick={function() {openApp('vehicles')}} style={{ color: '#fff', textDecoration: 'none' }}>
                <Tooltip sx={{backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px'}} arrow placement="top" title="Vehicles">
                  <div style={{color: '#fff', background:'linear-gradient(180deg, rgba(233, 108, 123, 1) 0%, rgba(209, 13, 53, 1) 100%)'}} className={classes.phoneApp}>
                    <img style={{ height: '54px', borderRadius: '14px' }} src={`https://gta-assets.nopixel.net/images/phone-icons/vehicles.png`}></img>
                  </div>
                </Tooltip>
              </div>
              <div onClick={function() {openApp('debt')}} style={{ color: '#fff', textDecoration: 'none' }}>
                <Tooltip sx={{backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px'}} arrow placement="top" title="Debt">
                  <div style={{color: '#fff', background:'#faf8fb'}} className={classes.phoneApp}>
                    <img style={{ height: '54px', borderRadius: '14px' }} src={`https://gta-assets.nopixel.net/images/phone-icons/debt.png`}></img>
                  </div>
                </Tooltip>
              </div>
              <div onClick={function() {openApp('wenmo')}} style={{ color: '#fff', textDecoration: 'none' }}>
                <Tooltip sx={{backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px'}} arrow placement="top" title="Wenmo">
                  <div style={{color: '#fff', background:'#151718'}} className={classes.phoneApp}>
                    <img style={{ height: '54px', borderRadius: '14px' }} src={`https://gta-assets.nopixel.net/images/phone-icons/wenmo.png`}></img>
                  </div>
                </Tooltip>
              </div>
              <div onClick={function() {openApp('documents')}} style={{ color: '#fff', textDecoration: 'none' }}>
                <Tooltip sx={{backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px'}} arrow placement="top" title="Documents">
                  <div style={{color: '#fff', background:'#da54d5'}} className={classes.phoneApp}>
                    <img style={{ height: '54px', borderRadius: '14px' }} src={`https://gta-assets.nopixel.net/images/phone-icons/documents.png`}></img>
                  </div>
                </Tooltip>
              </div>
              <div onClick={function() {openApp('housing')}} style={{ color: '#fff', textDecoration: 'none' }}>
                <Tooltip sx={{backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px'}} arrow placement="top" title="Housing">
                  <div style={{color: '#fff', background:'linear-gradient(0deg, rgba(61,146,69,1) 0%, rgba(61,146,69,1) 100%)'}} className={classes.phoneApp}>
                    <i style={{ fontSize: '40px', WebkitTextStrokeColor: 'rgb(34, 40, 49)', WebkitTextStrokeWidth: '0.9px' }} className='fas fa-house-user fa-w-16 fa-fw'></i>
                  </div>
                </Tooltip>
              </div>
              <div style={{ color: '#fff', textDecoration: 'none' }}>
                <Tooltip sx={{backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px'}} arrow placement="top" title="Crypto">
                  <div style={{color: '#fff', background:'#121315'}} className={classes.phoneApp}>
                    <img style={{ height: '54px', borderRadius: '14px' }} src={`https://gta-assets.nopixel.net/images/phone-icons/crypto.png`}></img>
                  </div>
                </Tooltip>
              </div>
              <div onClick={function() {openApp('job-center')}} style={{ color: '#fff', textDecoration: 'none' }}>
                <Tooltip sx={{backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px'}} arrow placement="top" title="Job Center">
                  <div style={{color: '#fff', background:'#1d1d1d'}} className={classes.phoneApp}>
                    <img style={{ height: '54px', borderRadius: '14px' }} src={`https://gta-assets.nopixel.net/images/phone-icons/jobs.png`}></img>
                  </div>
                </Tooltip>
              </div>
              <div style={{ color: '#fff', textDecoration: 'none' }}>
                <Tooltip sx={{backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px'}} arrow placement="top" title="Employment">
                  <div style={{color: '#fff', background:'#1d1d1d'}} className={classes.phoneApp}>
                    <img style={{ height: '54px', borderRadius: '14px' }} src={`https://gta-assets.nopixel.net/images/phone-icons/employment.png`}></img>
                  </div>
                </Tooltip>
              </div>
              <div style={{ color: '#fff', textDecoration: 'none' }}>
                <Tooltip sx={{backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px'}} arrow placement="top" title="Calendar">
                  <div style={{color: '#fff', background:'#191619'}} className={classes.phoneApp}>
                    <i style={{ fontSize: '37px'}} className='fas fa-calendar-alt fa-w-16 fa-fw'></i>
                  </div>
                </Tooltip>
              </div>
              <div style={{ color: '#fff', textDecoration: 'none' }}>
                <Tooltip sx={{backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px'}} arrow placement="top" title="LSBN">
                  <div style={{color: '#fff', background:'#1d1d1d'}} className={classes.phoneApp}>
                    <img style={{ height: '54px', borderRadius: '14px' }} src={`https://media.discordapp.net/attachments/1024849761045581894/1126716781445271612/lsbn.png`}></img>
                  </div>
                </Tooltip>
              </div>
              <div style={{ color: '#fff', textDecoration: 'none' }}>
                <Tooltip sx={{backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px'}} arrow placement="top" title="Racing">
                  <div style={{color: '#fff', background:'linear-gradient(356deg, rgba(0,132,255,1) 9%, rgba(75,181,255,1) 55%)'}} className={classes.phoneApp}>
                    <img style={{ height: '54px', borderRadius: '14px' }} src={`https://gta-assets.nopixel.net/images/phone-icons/racing.png`}></img>
                  </div>
                </Tooltip>
              </div>
              <div onClick={function() {SetCurrentApp('milk-road')}} style={{ display: showMilkRoade ? '' : 'none', color: '#fff', textDecoration: 'none' }}>
                <Tooltip sx={{backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px'}} arrow placement="top" title="Milk Read">
                  <div style={{color: '#fff', background:'rgb(126, 86, 194)'}} className={classes.phoneApp}>
                    <i style={{ fontSize: '35px'}} className='fas fa-user-secret fa-w-16 fa-fw'></i>
                  </div>
                </Tooltip>
              </div>
              <div style={{ color: '#fff', textDecoration: 'none' }}>
                <Tooltip sx={{backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px'}} arrow placement="top" title="Abdul's Taxi">
                  <div style={{color: '#fff', background:'linear-gradient(356deg, rgba(0,132,255,1) 9%, rgba(75,181,255,1) 55%)'}} className={classes.phoneApp}>
                    <img style={{ height: '54px', borderRadius: '14px' }} src={`https://gta-assets.nopixel.net/images/phone-icons/abdt.png`}></img>
                  </div>
                </Tooltip>
              </div>
              <div style={{ color: '#fff', textDecoration: 'none' }}>
                <Tooltip sx={{backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px'}} arrow placement="top" title="NLTS's Vehicles">
                  <div style={{color: '#fff', background:'linear-gradient(356deg, rgba(0,132,255,1) 9%, rgba(75,181,255,1) 55%)'}} className={classes.phoneApp}>
                    <img style={{ height: '54px', borderRadius: '14px' }} src={`https://media.discordapp.net/attachments/620747165819469843/1041779691914264667/logo.png`}></img>
                  </div>
                </Tooltip>
              </div>
              <div style={{ color: '#fff', textDecoration: 'none' }}>
                <Tooltip sx={{backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px'}} arrow placement="top" title="Diamond Sports Book">
                  <div style={{color: '#fff', background:'linear-gradient(0deg, rgba(0,0,2,1) 0%, rgba(0,0,2,1) 100%)'}} className={classes.phoneApp}>
                    <i style={{ fontSize: '35px'}} className='fas fa-gem fa-w-16 fa-fw'></i>
                  </div>
                </Tooltip>
              </div>
              <div style={{ color: '#fff', textDecoration: 'none' }}>
                <Tooltip sx={{backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px'}} arrow placement="top" title="Calculator">
                  <div style={{color: '#fff', background:'linear-gradient(356deg, rgba(0,132,255,1) 9%, rgba(75,181,255,1) 55%)'}} className={classes.phoneApp}>
                    <img style={{ height: '54px', borderRadius: '14px' }} src={`https://gta-assets.nopixel.net/images/phone-icons/calculator.png`}></img>
                  </div>
                </Tooltip>
              </div>
              <div style={{ color: '#fff', textDecoration: 'none' }}>
                <Tooltip sx={{backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px'}} arrow placement="top" title="BankBusters">
                  <div style={{color: '#000000', background:'#D3E014'}} className={classes.phoneApp}>
                    <i style={{ fontSize: '35px', WebkitTextStrokeColor: 'rgb(34, 40, 49)', WebkitTextStrokeWidth: '0.9px'}} className='fas fa-piggy-bank'></i>
                  </div>
                </Tooltip>
              </div>
              <div style={{ color: '#fff', textDecoration: 'none' }}>
                <Tooltip sx={{backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px'}} arrow placement="top" title="Department of Justice">
                  <div style={{color: '#dfcf0d', background:'linear-gradient(0deg, rgba(63,88,187,1) 0%, rgba(63,88,187,1) 100%)'}} className={classes.phoneApp}>
                    <i style={{ fontSize: '40px'}} className='fas fa-gavel fa-w-16 fa-fw'></i>
                  </div>
                </Tooltip>
              </div>
              <div style={{ color: '#fff', textDecoration: 'none' }}>
                <Tooltip sx={{backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px'}} arrow placement="top" title="Camera">
                  <div style={{color: 'rgb(255, 255, 255)', background:'linear-gradient(138deg, rgba(16,153,184,1) 0%, rgba(20,144,179,1) 100%)'}} className={classes.phoneApp}>
                    <i style={{ fontSize: '35px'}} className='fas fa-camera fa-w-16 fa-fw'></i>
                  </div>
                </Tooltip>
              </div>
              <div style={{ color: '#fff', textDecoration: 'none' }}>
                <Tooltip sx={{backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px'}} arrow placement="top" title="LifeInvader">
                  <div style={{color: '#fff', background:'linear-gradient(356deg, rgba(0,132,255,1) 9%, rgba(75,181,255,1) 55%)'}} className={classes.phoneApp}>
                    <img style={{ height: '54px', borderRadius: '14px' }} src={`https://media.discordapp.net/attachments/1000371435941920808/1071125297157656756/lifeinvader.png`}></img>
                  </div>
                </Tooltip>
              </div>
            </div>
          </div>
        </div> 
        {CurrentApp === 'details' ?
          <DetailsApp />
        : CurrentApp === 'contacts' ?
          <ContactsApp />
        : CurrentApp === 'calls' ?
          <CallsApp />
        : CurrentApp === 'messages' ?
          <MessagesApp />
        : CurrentApp === 'erpinger' ?
          <PingerApp />
        : CurrentApp === 'email' ?
          <EmailApp />
        : CurrentApp === 'yellow-pages' ?
          <YellowPagesApp />
        : CurrentApp === 'twatter' ?
          <TwatterApp />
        : CurrentApp === 'vehicles' ?
          <VehiclesApp />
        : CurrentApp === 'debt' ?
          <DebtApp />
        : CurrentApp === 'wenmo' ?
          <WenmoApp />
        : CurrentApp === 'documents' ?
          <DocumentsApp />
        : CurrentApp === 'housing' ?
          <HousingApp />
        : CurrentApp === 'job-center' ?
          <JobCenterApp />
        : CurrentApp === 'milk-road' ?
          <MilkRoadApp />
        : <></>}
      </div>
      <div style={{ display: 'android' === Brand ? '' : 'none', bottom: 'android' === Brand && ShowPhone ? '12px' : SP.length ? '-540px' : '-1000px' }} className={switchOrientation ? 'phone-border-container-switch' : 'phone-border-container'}>
        <div className='phone-border-inner-container'>
          <div className='phone-border-inner-border'></div>
          <div className='phone-border-inner-alignment'>
            <div className='phone-border-inner-white'></div>
          </div>
        </div>
      </div>
      <div style={{ display: 'ios' === Brand ? '' : 'none', bottom: 'ios' === Brand && ShowPhone ? '0px' : SP.length ? '-550px' : '-1000px' }} className='phone-iphone-shell'>
        <div className='jss1264'>
          <div id='cores' className='jss16465'>
            <div className='jss16471'></div>
            <div className='jss16472'></div>
            <div className='jss16473'></div>
            <div className='jss16474'></div>
            <div className='jss16475'>
              <div className='inner-shadow-bg'></div>
            </div>
          </div>
        </div>
      </div>
      </>
    );
  }

export default Phone;