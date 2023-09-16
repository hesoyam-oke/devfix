import React, { useState, useEffect, useRef } from 'react';
import * as ReactDOM from 'react-dom';
import './index.css'
import { useNuiEvent } from "../../../../hooks/useNuiEvent";
import { useExitListener } from "../../../../hooks/useExitListener";
import { fetchNui } from "../../../../utils/fetchNui";
import { isEnvBrowser, noop } from '../../../../utils/misc';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Button, Checkbox, FormControl, List, ListItemText, Input, ListItem, IconButton, FormControlLabel, FormGroup, Slider, FormHelperText, Grid, Tooltip, Stack, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Checkmark } from 'react-checkmark'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

type MyComponentProps = {
  deleteNotification: any;
  notification: any
}

function Bu(Sw) {
  const [SF, setSF] = useState(Sw.seconds);
  const [SX, setSX] = useState(Sw.text);

  useEffect(() => {
    let timerId;
    if (SF > 0) {
      timerId = setTimeout(() => {
        setSF(SF - 1);
      }, 1000);
    } else {
      fetchNui(Sw.callback, {
        action: 'reject',
        _data: { confirmationId: Sw.id },
      });
    }
    return () => clearTimeout(timerId);
  }, [SF, Sw.callback, Sw.id]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };


  const Sv = formatTime(SF);

  return <div>{Sv + ' - ' + SX}</div>;
}
function Bf() {
  const [Sm, setSm] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSm(Sm + 1);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [Sm]);

  return <div>{Sm}</div>;
}


function Notifications({notification, deleteNotification}: MyComponentProps) {
  let deleteNotifications: any = deleteNotification
  let notifications: any = notification
  let id: any = notifications.id
  let isCall: any = notifications.isCall
  let calls: any = notifications.calls
  let isConfirmation: any = notifications.isConfirmation
  let confirmation: any = notifications.confirmation
  let header: any = notifications.header
  let content: any = notifications.content
  let isPerma: any = notifications.isPerma
  let cancelButton: any = notifications.cancelButton
  let jobGroupId: any = notifications.jobGroupId
  let icon: any = notifications.icon
  let iconColor: any = notifications.iconColor
  let bgColor: any = notifications.bgColor
  const [SI, SR]: any = useState(true)
  const [SJ, SC]: any = useState(false)
  const [SW, M0]: any = useState(false)
  const [M3, M4]: any = useState(false)
  const [getheader, setHeader]: any = useState('')
  const [getcontent, setContent]: any = useState('')
  const [getjobGroupId, setJobGroupId]: any = useState('')


  
  useEffect(() => {
    if (!SW) {
      M0(true);
      setHeader(header);
      setContent(content);
      setJobGroupId(jobGroupId);
    }
  }, [SW, M0, header, content, jobGroupId]);
  
  useEffect(function () {
    {
      if (!isPerma) {
      var timeout = setTimeout(
        function () {
        return SR(false)
        },
        isConfirmation ? Number(1000 * confirmation.timeOut) : 3000
      )
      return function () {
        clearTimeout(timeout)
      }
      }
    }
  })

  useEffect(() => {
    if (!SI) {
      SC(true);
      setTimeout(() => {
        deleteNotifications(id);
      }, 500);
    }
  }, [SI, SC, id]);
  // const [HoverCall, setHover]: any = useState('')
  useNuiEvent('uiMessage', function (data) {
    var dvexdata = data.data
    if ('phone' === data.app) {
      if('updateNotify' === dvexdata.action){

        if(Number(dvexdata.id) === Number(getjobGroupId)) {
          if(undefined === dvexdata.title && '' === dvexdata.title){
            setHeader(dvexdata.title)
          }
          if(undefined === dvexdata.body && '' === dvexdata.body){
            setContent(dvexdata.title)
          }
        }
      }
      if('closeNotify' === dvexdata.action){

        if (Number(dvexdata.id) == Number(getjobGroupId)) {
          SR(false);
          SC(true);
          setTimeout(function() {
            deleteNotifications(id);
          }, 500);
        }
      }
      if('closeNotifyByCallID' === dvexdata.action){

        const isMatchingCallId = Number(dvexdata.callId) === calls.callId;
        const shouldDeleteNotifications = !SI;
        if (isMatchingCallId && shouldDeleteNotifications) {
          SR(false);
          deleteNotifications(id);
        }

      }
      if('updateNotifyByCallID' === dvexdata.action){

        if (Number(dvexdata.callId) === calls.callId) {
          M4(true);
          setContent('Disconnected!');
          setTimeout(function() {
            SC(true);
            setTimeout(function() {
              M4(false);
              deleteNotifications(id);
            }, 500);
          }, 500);
        }

      }
    }
  })

  var Mo = function () {
    fetchNui('np-ui:callEnd', { callId: calls.callId }).then(function (Mn) {})
  }

  return (
    <>
      <div id={id} className={SJ ? 'notification-container notification-container-fade-out' : 'notification-container'} onClick={function () {
				  return (function(Mn) {
            if (!isCall && !isConfirmation && !isPerma) {
              SC(true);
              setTimeout(function() {
                deleteNotifications(Mn);
              }, 500);
            }
          })(id);
      }}>
        <div className='app-bar'>
          <div className='icon' style={{ background: bgColor, color: iconColor }}>
            <i className={icon+' fa-w-16 fa-fw fa-sm'} style={{ WebkitTextStrokeColor: 'black', WebkitTextStrokeWidth: '0.3px' }}></i>
          </div>
          <div className='name'>
            <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant='body2' gutterBottom>{getheader}</Typography>
          </div>
          <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant='body2' gutterBottom>just now</Typography>
        </div>
          <div className='content'>
            <div style={{display: isConfirmation || (isCall && calls.progress) ? 'none' : ''}} className='text'>
              <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant='body2' gutterBottom>{getcontent}</Typography>

            </div>
            <div style={{display: isConfirmation ? '' : 'none'}} className='text'>
              <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant='body2' gutterBottom>

              <Bu
                seconds={Number(confirmation.timeOut)}
                text={getcontent}
                id={confirmation.id}
                callback={confirmation.onAccept}
              ></Bu>

              </Typography>

            </div>
            <div style={{display: isCall && calls.progress ? '' : 'none'}} className='text'>
              <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant='body2' gutterBottom>
                {M3 ? getcontent : <Bf></Bf>}
              </Typography>

            </div>
            <div className='actions'>
              <div style={{display: isCall && calls.receive && !M3 ? '' : 'none'}} className='action action-reject'>
                <Tooltip sx={{backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px'}} arrow placement="top" title="Hang Up">
                  <i onClick={Mo} className='fas fa-times-circle fa-w-16 fa-fw'></i>
                </Tooltip>
              </div>
              <div style={{display: isCall && calls.receive && !M3 ? '' : 'none'}} className='action action-accept'>
                <Tooltip sx={{backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px'}} arrow placement="top" title="Answer">
                  <i onClick={Mo} className='fas fa-check-circle fa-w-16 fa-fw'></i>
                </Tooltip>
              </div>
              <div style={{display: isCall && calls.dialing && !M3 ? '' : 'none'}} className='action action-reject'>
                <Tooltip sx={{backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px'}} arrow placement="top" title="Hang Up">
                  <i onClick={Mo} className='fas fa-times-circle fa-w-16 fa-fw'></i>
                </Tooltip>
              </div>
              <div style={{display: isCall && calls.progress && !M3 ? '' : 'none'}} className='action action-reject'>
                <Tooltip sx={{backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px'}} arrow placement="top" title="Hang Up">
                  <i onClick={Mo} className='fas fa-times-circle fa-w-16 fa-fw'></i>
                </Tooltip>
              </div>
              <div style={{display: isConfirmation ? '' : 'none'}} className='action action-reject'>
                <Tooltip sx={{backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px'}} arrow placement="top" title="Decline">
                  <i onClick={function () {
                      fetchNui(confirmation.onReject, {
                        action: 'reject',
                        _data: { confirmationId: confirmation.id },
                      })
                      SC(true)
                      setTimeout(function () {
                        deleteNotifications(id)
                      }, 500)
                  }} className='fas fa-times-circle fa-w-16 fa-fw'></i>
                </Tooltip>
              </div>
              <div style={{display: isConfirmation ? '' : 'none'}} className='action action-accept'>
                <Tooltip sx={{backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px'}} arrow placement="top" title="Accept">
                  <i onClick={function () {
                      fetchNui(confirmation.onAccept, {
                        action: 'accept',
                        _data: { confirmationId: confirmation.id },
                      })
                      SC(true)
                      setTimeout(function () {
                        deleteNotifications(id)
                      }, 500)
                  }} className='fas fa-check-circle fa-w-16 fa-fwfw'></i>
                </Tooltip>
              </div>
              <div style={{display: isPerma && cancelButton ? '' : 'none'}} className='action action-reject'>
                <Tooltip sx={{backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px'}} arrow placement="top" title="Cancel Activity">
                  <i onClick={function () {
                      fetchNui('cancelActivity', { id: getjobGroupId })
                  }} className='fas fa-times-circle fa-w-16 fa-fw'></i>
                </Tooltip>
              </div>
            </div>
          </div>
      </div>
    </>
  );
}

export default Notifications;