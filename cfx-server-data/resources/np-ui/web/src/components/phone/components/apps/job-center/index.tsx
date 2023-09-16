import React, { useState, useEffect, useRef } from 'react';
import * as ReactDOM from 'react-dom';
import './index.css'
import { useNuiEvent } from "../../../../../hooks/useNuiEvent";
import { useExitListener } from "../../../../../hooks/useExitListener";
import { fetchNui } from "../../../../../utils/fetchNui";
import { isEnvBrowser, noop } from '../../../../../utils/misc';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Button, Checkbox, FormControl, List, ListItemText, StepContent, Box, Stepper, Step, StepLabel, styled, CircularProgress, Divider, ListItem, IconButton, FormControlLabel, FormGroup, Slider, FormHelperText, Grid, Tooltip, Stack, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography, colors } from '@mui/material';
import useStyles from './index.styles';
// import YP from './YellowPages';
import { Checkmark } from 'react-checkmark'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Moment from 'react-moment';

const JobCenterApp: React.FC = () => {
  const classes = useStyles();
  const [JobList, setJobList]: any = useState([]);
  const [LoadeJobs, setLoadeJobs]: any = useState(false);
  const [JobListHover, setJobListHover]: any = useState('')
  const [MembersListHover, setMembersListHover]: any = useState('')
  const [ChackIn, setChackIn]: any = useState(false);
  const [GroupScrenn, setGroupScrenn]: any = useState(false);
  const [TaskScreen, setTaskScreen]: any = useState(false);
  const [Tasks, setTasks]: any = useState([]);
  const [ready, setReady]: any = useState(false)
  const [showCheckmark, setshowCheckmark]: any = useState(true)
  const [leaderSrc, setLeaderSrc]: any = useState(0)
  const [mySrc, setMySrc]: any = useState(0)
  const [groupID, setGroupID]: any = useState(0)
  const [members, setMembers]: any = useState([])
  const [Jobname, setJobname]: any = useState('')
  const [IdleGroups, setIdleGroups]: any = useState([]);
  const [BusyGroups, setBusyGroups]: any = useState([]);





  async function fetchData() {
    const result = await fetchNui('np-ui:getJobData', {});
    setMySrc(result.data.src)
    if(result.data.signedin){
      if(result.data.ingroup){
        setChackIn(true);
        setGroupScrenn(true);
        setReady(result.data.groupdata.ready);
        setLeaderSrc(result.data.groupdata.leader);
        setGroupID(result.data.groupdata.id);
        setMembers(result.data.groupdata.members);
        setTaskScreen(result.data.groupdata.inActivity);
        setTasks(result.data.groupdata.tasks);
      }else{
        setChackIn(true);
        setGroupScrenn(false);
        setJobname(result.data.jobname);
        if(result.data.groups.idle || result.data.groups.busy){
          setIdleGroups(result.data.groups.idle || []);
          setBusyGroups(result.data.groups.busy || []);
        }
      }
    }else{
      setChackIn(false);
      setGroupScrenn(false);
      setJobList(result.data.list);
    } 
  }
  

  if(!LoadeJobs){
    setLoadeJobs(true)
    fetchData()
  }

  var museenterJobList = function (event) {
    setJobListHover(event.currentTarget.id)
  }

  var museleaveJobList = function () {
    setJobListHover('')
  }

  var museenterMembersList = function (event) {
    setMembersListHover(event.currentTarget.id)
  }

  var museleaveMembersList = function () {
    setMembersListHover('')
  }

  useNuiEvent('uiMessage', async function (data) {
    var dvexdata = data.data
    if('phone' === data.app){
      if('jobs' === dvexdata.action){
        setJobList(dvexdata.list);
        if(dvexdata.signedin){
          setIdleGroups(dvexdata.groups.idle);
          setBusyGroups(dvexdata.groups.busy);
          setChackIn(dvexdata.signedin);
          setGroupScrenn(dvexdata.ingroup);
          setLeaderSrc(dvexdata.groupdata.leader);
          setGroupID(dvexdata.groupdata.id);
          setMembers(dvexdata.groupdata.members);
          setMySrc(dvexdata.src)
        }
      }
      if('updateGroups'){
        const result = await fetchNui('np-ui:getJobData', {});
        setMySrc(result.data.src)
        if(result.data.signedin){
          if(result.data.ingroup){
            setChackIn(true);
            setGroupScrenn(true);
            setReady(result.data.groupdata.ready);
            setLeaderSrc(result.data.groupdata.leader);
            setGroupID(result.data.groupdata.id);
            setMembers(result.data.groupdata.members);
            setTaskScreen(result.data.groupdata.inActivity);
            setTasks(result.data.groupdata.tasks);
          }else{
            setChackIn(true);
            setGroupScrenn(false);
            setJobname(result.data.jobname);
            if(result.data.groups.idle || result.data.groups.busy){
              setIdleGroups(result.data.groups.idle || []);
              setBusyGroups(result.data.groups.busy || []);
            }
          }
        }else{
          setChackIn(false);
          setGroupScrenn(false);
          setJobList(result.data.list);
        }  
      }
        
    }
  })
  
  setTimeout(function(){setshowCheckmark(false)}, 1500)
  return (
    <>
      <div style={{zIndex: 500}} className='app-dvex-container'>
        <div style={{display: ChackIn ? 'none' : ''}} className={classes.jobsJobs}>
          {JobList && JobList.length > 0 
            ? JobList.map(function (job){
              return (
                <div id={job.id} onMouseEnter={museenterJobList} onMouseLeave={museleaveJobList} style={{marginBottom:'15%'}} className='component-paper cursor-pointer'>
                  <div className='main-container'>
                    <div className='image'>
                      <i className={'fas fa-'+job.icon+' fa-w-16 fa-fw fa-3x'}></i>
                    </div>
                    <div className='details'>
                      <div className='title'>
                        <Typography style={{ color: '#fff', wordBreak: 'break-word'}} variant="body2" gutterBottom>
                          {job.name}
                        </Typography>
                      </div>
                      <div className='description'>
                        <i style={{color: '#476a49'}} className='fas fa-dollar-sign fa-w-16 fa-fw fa-1x'></i>
                        <i style={{color: '#476a49'}} className='fas fa-dollar-sign fa-w-16 fa-fw fa-1x'></i>
                        <i style={{color: '#476a49'}} className='fas fa-dollar-sign fa-w-16 fa-fw fa-1x'></i>
                        <i style={{color: '#476a49'}} className='fas fa-dollar-sign fa-w-16 fa-fw fa-1x'></i>
                        <i style={{color: '#476a49'}} className='fas fa-dollar-sign fa-w-16 fa-fw fa-1x'></i>
                      </div>
                    </div>
                    <div className={JobListHover.toString() === job.id.toString() ? 'actions actions-show' : 'actions'}>
                      <Tooltip title='Set GPS' placement='top' arrow>
                        <div><i className='fas fa-map-marked fa-w-16 fa-fw fa-lg'></i></div>
                      </Tooltip>
                    </div>
                    <div className='image'>
                      <Typography style={{ color: '#fff', wordBreak: 'break-word'}} variant="body2" gutterBottom>
                        {job.limit} <i style={{marginLeft: '5px'}} className='fas fa-people-carry fa-w-16 fa-fw fa-sm'></i>
                      </Typography>
                      <Typography style={{ color: '#fff', wordBreak: 'break-word'}} variant="body2" gutterBottom>
                        {job.groups.length} <i style={{marginLeft: '5px'}} className='fas fa-user fa-w-16 fa-fw fa-sm'></i>
                      </Typography>
                    </div>
                  </div>
                </div>
              )
          }): <div style={{ display:'flex', flexDirection: 'column', textAlign: 'center' }} className='flex-centered'>
                <i className="fas fa-frown fa-w-16 fa-fw fa-3x" style={{ color: '#fff', marginBottom: '32px' }}></i>
                <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="h6" gutterBottom>
                  Nothing Here!
                </Typography>
              </div>}
        </div>
        <div style={{display: ChackIn && !GroupScrenn ? '' : 'none'}} className={classes.jobsSearchWrapper}>
          <Typography style={{color: '#fff', wordBreak: 'break-word'}} variant="body1" gutterBottom>Join an idle group or browse groups currently busy</Typography>
          <Stack style={{marginTop:'10px'}} direction="row" spacing={4.6}>
            <Button onClick={async function(){
              const resultChar = await fetchNui('np-ui:getCharacter', {});
              fetchNui('np-ui:createGroup', {character:resultChar.data})
              }} size='small' color='success' variant="contained">Create Group</Button>
            <Button onClick={function(){fetchNui('np-ui:checkOut', {})}} size='small' color='warning' variant="contained">Check Out</Button>
          </Stack>
          <Divider variant='middle' style={{ borderColor: '#aeb0b2', marginTop: '5%', marginLeft: '0%', marginRight: '0%' }} />
        </div>
        <div style={{display: ChackIn && !GroupScrenn ? '' : 'none'}} className={classes.jobsGroupsWrapper}>
          <div style={{ height: 'fit-content', display: IdleGroups.length > 0 ? '' : 'none' }} className={classes.jobsGroupsIdle}>
            <Typography style={{color: '#fff', wordBreak: 'break-word', marginTop: '5px'}} variant="body1" gutterBottom>Idle</Typography>
            {IdleGroups && IdleGroups.length > 0
            ? IdleGroups.map(function(data){
                return (
                  <div className='component-paper cursor-pointer'>
                    <div className='main-container'>
                      <div className='image'>
                        <i className='fas fa-users fa-w-16 fa-fw fa-3x'></i>
                      </div>
                      <div className='details'>
                        <div className='title'>
                          <Typography style={{color: '#fff', wordBreak: 'break-word'}} variant="body1" gutterBottom>{data.name}</Typography>
                        </div>
                        <div className='description'>
                          <div className='flex-row'>
                            <Tooltip sx={{backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px'}} arrow placement="top" title="Request to Join">
                              <i className='fas fa-sign-in-alt fa-w-16 fa-fw fa-1x'></i>
                            </Tooltip>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            :<></>}
          </div>
          <div style={{ height: 'fit-content', display: BusyGroups.length > 0 ? '' : 'none' }} className={classes.jobsGroupsBusy}>
            <Typography style={{color: '#fff', wordBreak: 'break-word', marginTop: '5px'}} variant="body1" gutterBottom>Busy</Typography>
            {BusyGroups && BusyGroups.length > 0
            ? BusyGroups.map(function(data){
                return (
                  <div className='component-paper cursor-pointer'>
                    <div className='main-container'>
                      <div className='image'>
                        <i className='fas fa-users-slash fa-w-16 fa-fw fa-3x'></i>
                      </div>
                      <div className='details'>
                        <div className='title'>
                          <Typography style={{color: '#fff', wordBreak: 'break-word'}} variant="body1" gutterBottom>{data.name}</Typography>
                        </div>
                        <div className='description'>
                          <Typography style={{color: '#fff', fontSize:'12px', wordBreak: 'break-word'}} variant="h6" gutterBottom>This group is busy for now</Typography>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            :<></>}
          </div>
        </div>
        <div style={{display: ChackIn && GroupScrenn && !TaskScreen ? '' : 'none', marginTop:'25px'}} className={classes.jobsInGroupWrapper}>
          <div style={{display: ready ? '' : 'none'}} className={classes.waitingForActivity}>
            <div className='component-ripple-effect'>
              <div style={{marginLeft: '20%'}} className='lds-ripple'>
                <div></div>
                <div></div>
              </div>
              <Typography style={{color: '#fff', wordBreak: 'break-word'}} variant="body1" gutterBottom>Waiting for Job...</Typography>
            </div>
          </div>
          <div className={classes.jobsInGroupLeader}>
            <Typography style={{color: '#fff', wordBreak: 'break-word'}} variant="body1" gutterBottom>Members</Typography>
            {members && members.length > 0
            ? members.map(function(data){
              return (
                <div id={data.src} onMouseEnter={museenterMembersList} onMouseLeave={museleaveMembersList} className='component-paper cursor-pointer'>
                    <div className='main-container'>
                      <div className='image'>
                        <i className={Number(data.src) === Number(leaderSrc) ? 'fas fa-user-graduate fa-w-16 fa-fw fa-3x' : 'fas fa-user fa-w-16 fa-fw fa-3x'}></i>
                      </div>
                      <div className='details'>
                        <div className='title'>
                          <Typography style={{color: '#fff', wordBreak: 'break-word'}} variant="body2" gutterBottom>{data.name}</Typography>
                        </div>
                        <div className='description'>
                          <Typography style={{color: '#fff', wordBreak: 'break-word'}} variant="body2" gutterBottom>{Number(data.src) === Number(leaderSrc) ? 'Leader' : 'Member'}</Typography>
                        </div>
                      </div>
                      <div style={{display: Number(mySrc) === Number(leaderSrc) ? '' : 'none'}} className={MembersListHover.toString() === data.src.toString() ? 'actions actions-show' : 'actions'}>
                        <Tooltip title='Kick Member' placement='top' arrow>
                          <div style={{display: Number(data.src) === Number(leaderSrc) ? 'none' : ''}}><i onClick={function(){fetchNui('np-ui:kickMember', {id: groupID, src: Number(data.src)})}} className='fas fa-user-times fa-w-16 fa-fw fa-lg'></i></div>
                        </Tooltip>
                        <Typography style={{display: Number(data.src) === Number(leaderSrc) ? '' : 'none', color: '#fff', wordBreak: 'break-word'}} variant="body2" gutterBottom>This is You</Typography>
                      </div>
                      <div className='image'>
                        <i style={{color:'#43ae46', fontSize:'7px'}} className='fas fa-circle'></i>
                      </div>
                    </div>
                  </div>
                )
              })
            :<></>}
          </div>
        </div>
        <div style={{display: ChackIn && GroupScrenn && !TaskScreen ? '' : 'none'}} className={classes.jobsInGroupButtons}>
          <Stack style={{display: Number(mySrc) === Number(leaderSrc) ? '' : 'none', whiteSpace:'nowrap'}} direction="column" spacing={2}>
            <Button onClick={function(){fetchNui('np-ui:readyGroup', {id: groupID, boolean: !ready})}} size='small' color='success' variant="contained">{ready ? 'Unready for Jobs' : 'Ready for Jobs'}</Button>
            <Button onClick={function(){fetchNui('np-ui:disbandGroup', {id: groupID})}} size='small' color='success' variant="contained">Disband Group</Button>
          </Stack>
          <Stack style={{display: Number(mySrc) !== Number(leaderSrc) ? '' : 'none', marginTop: '42%'}} direction="column" spacing={2}>
            <Button onClick={function(){fetchNui('np-ui:leaveGroup', {id: groupID})}} size='small' color='success' variant="contained">Leave Group</Button>
          </Stack>
        </div>
        <div style={{display: ChackIn && GroupScrenn && TaskScreen ? '' : 'none'}} className='activity-container'>
          <div style={{width: '95%', marginLeft: '2.5%', marginTop:'10%'}} className='activity-title'>
            <Typography style={{color: '#fff', wordBreak: 'break-word'}} variant="body2" gutterBottom>{Jobname}</Typography>
            <div className='timer'>
              <i className="fa-sharp fa-solid fa-circle-xmark"></i>
              <Typography style={{color: '#fff', wordBreak: 'break-word'}} variant="body2" gutterBottom>00:00:00</Typography>
            </div>
          </div>
          <div className='task-list'>
            <div style={{marginLeft: '2.5%', marginTop:'10px'}} className='activity-task-paper-wrapper'>
              {Tasks && Tasks.length > 0
              ? Tasks.map(function(data){
                  return (
                    <Box component="div" sx={{ marginBottom:'25px', display: 'flex' }}>
                      {/* {data.completed &&
                        <Checkmark size='56px' color='#009688' />
                      } */}
                    <div style={{marginRight:'10px'}} className='progress'>
                      <i style={{color:'rgb(66, 76, 171)', marginLeft:'2px', fontSize:'14px', textShadow:'0px 0px 3px black'}} className='fas fa-circle'></i>
                      <Divider style={{position:'relative', boxShadow:'0px 0px 3px black', left:'8.1px', top:'4px', borderColor: data.completed ? 'rgb(66, 76, 171)' : 'rgb(189, 189, 189)', width:'2px', background: data.completed ? 'rgb(66, 76, 171)' : 'rgb(189, 189, 189)', height:'100%'}} orientation="vertical" flexItem />
                    </div>
                    <div className="component-paper cursor-pointer" style={{ width: '87.7%' }}>
                      <div className="main-container">
                        <div className="details">
                          <div className="description">
                            <div className="flex-row">
                              <Typography
                                style={{
                                  color: '#fff',
                                  wordBreak: 'break-word',
                                  textDecoration: data.completed ? 'line-through' : 'none',
                                }}
                                variant="body1"
                                gutterBottom
                              >
                                {data.task}
                              </Typography>
                            </div>
                          </div>
                          <div className="description">
                            <div className="flex-row" style={{ justifyContent: 'flex-end' }}>
                              <Typography
                                style={{ color: '#fff', wordBreak: 'break-word' }}
                                variant="body1"
                                gutterBottom
                              >
                                {data.completed ? '1/1' : '0/1'}
                              </Typography>
                            </div>
                          </div>
                        </div>
                        <div className="actions"></div>
                      </div>
                    </div>
                    <div style={{position:'absolute', display: data.completed && showCheckmark ? '' : 'none', opacity:'0.5', right:'0'}}>
                      <Checkmark size='56px' color='#009688' />
                    </div>
                  </Box>
                  )
                })
              :<>Error</>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default JobCenterApp;