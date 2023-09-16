import React, { useState, useEffect, useRef } from 'react';
import './index.css'
import { useNuiEvent } from "../../../hooks/useNuiEvent";
import { fetchNui } from "../../../utils/fetchNui";
import { Button, FormControl, Tooltip, InputAdornment, MenuItem, TextField, Typography } from '@mui/material';
import useStyles from './index.styles';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {DveXAlert} from '../../main/components';
import CallsApp from './apps/calls';
import MessagesApp from './apps/messages';
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

const Burner: React.FC = () => {
    const classes = useStyles();
    let Sx: any = NotificationData()
    let Sk = Sx.addNotification
    let Sv = Sx.deleteNotification
    let SP = Sx.notifications

    const [ShowPhone, setShowPhone]: any = useState(false)
    const [showApp, setShowApp]: any = useState(true)
    const [switchOrientation, setSwitchOrientation]: any = useState(false)
    const [Brand, setBrand]: any = useState('android')
    const [Background, setBackground]: any = useState('https://dvexdev.github.io/DveX.Images/burner.png')
    const [ReceiveSms, setReceiveSms]: any = useState(true)
    const [NewTweet, setNewTweet]: any = useState(true)
    const [ReceiveEmail, setReceiveEmail]: any = useState(true)
    const [Embeddedimages, setEmbeddedimages]: any = useState(true)
    const [Serverid, setServerid]: any = useState(0)
    const [NotiID, setNotiID]: any = useState(0);
    const [showMilkRoade, setShowMilkRoade]: any = useState(false);
    const [inWifieZone, setinWifieZone]: any = useState(false);
    const [Time, setTime]: any = useState('00:00')
    
    
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
      if ('burner' === data.app) {
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
    })

    function openApp(pAppName){
      SetCurrentApp(pAppName)
      setSwitchOrientation(false)
      setShowApp(false)
    }

    return (
      <>
      <div className={switchOrientation ? classes.phoneContainerSwitch : classes.phoneContainer} style={{ bottom: ShowPhone ? '12px' : SP.length ? '-540px' : '-1000px', background: 'url('+Background+') 0% 0% / cover repeat'}}>
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
            <i className={'fas fa-signal fa-w-20 fa-fw fa-sm'} style={{  WebkitTextStrokeColor: 'black',  WebkitTextStrokeWidth: '0.3px',  marginLeft: '4px' }}></i>
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
              <div onClick={function() {openApp('calls')}} style={{ color: '#fff', textDecoration: 'none' }}>
                <Tooltip sx={{backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px'}} arrow placement="top" title="Calls">
                    <div style={{color: 'white', background:'#019689'}} className={classes.phoneApp}>
                      <i style={{fontSize: '30px', WebkitTextStrokeColor: 'rgb(34, 40, 49)', WebkitTextStrokeWidth: '0.9px'}} className='fas fa-phone-flip fa-w-16 fa-fw'></i>
                    </div>
                </Tooltip>
              </div>
              <div onClick={function() {openApp('messages')}} style={{ color: '#fff', textDecoration: 'none' }}>
                <Tooltip sx={{backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px'}} arrow placement="top" title="Messages">
                    <div style={{color: 'white', background:'#8BC34C'}} className={classes.phoneApp}>
                      <i style={{fontSize: '30px', WebkitTextStrokeColor: 'rgb(34, 40, 49)', WebkitTextStrokeWidth: '0.9px'}} className='fas fa-comment fa-w-16 fa-fw'></i>
                    </div>
                </Tooltip>
              </div>
              {/* <div onClick={function() {openApp('messages')}} style={{ color: '#fff', textDecoration: 'none' }}>
                <Tooltip sx={{backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px'}} arrow placement="top" title="Messages">
                      <div style={{color: '#fff', background:'linear-gradient(356deg, rgba(0,132,255,1) 9%, rgba(75,181,255,1) 55%)'}} className={classes.phoneApp}>
                        <img style={{ height: '54px', borderRadius: '14px' }} src={`https://gta-assets.nopixel.net/images/phone-icons/conversations.png`}></img>
                      </div>
                </Tooltip>
              </div> */}
            </div>
          </div>
        </div> 
        {CurrentApp === 'calls' ?
          <CallsApp />
        : CurrentApp === 'messages' ?
          <MessagesApp />
        : <></>}
      </div>
      <div style={{ display: 'android' === Brand ? '' : 'none',bottom: 'android' === Brand && ShowPhone ? '12px' : SP.length ? '-540px' : '-1000px' }} className={switchOrientation ? 'phone-border-container-switch-burner' : 'phone-border-container-burner'}>
        <div className='phone-border-inner-container'>
          <div className='phone-border-inner-border'></div>
          <div className='phone-border-inner-alignment'>
            <div className='phone-border-inner-white'></div>
          </div>
        </div>
      </div>
      </>
    );
  }

export default Burner;