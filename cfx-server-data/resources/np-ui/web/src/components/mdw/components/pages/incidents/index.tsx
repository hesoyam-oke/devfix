import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import { Typography, TextField, InputAdornment, Popper, Stack, Chip, Tooltip } from '@mui/material';
import './index'
import useStyles from './index.styles';
import { fetchNui } from "../../../../../utils/fetchNui";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
function IncidentsPage({showLoading, setShowAssignEvidence, CurrentIncidentID, evidences, setevidences}: any) {
  const classes = useStyles();
  const [title, setTitle] = useState('')
  const [Info, setInfo] = useState('')
  const [officers, setofficers] = useState([])
  const [PersonsInvolved, setPersonsInvolved] = useState([])
  const [content, setContent] = useState<string>('');
  const [Tags, setTags] = useState([
    // {
    //   id:'1',
    //   tag:'crime',
    // },
  ])
  const [vehicles, setVehicles] = useState([
    // {
    //   id:1,
    //   plate:'505',
    //   model:'sultan',
    // }
  ]);
  const [incidents, setincidents] = useState([]);
  const [incidentsList, setincidentsList] = useState([]);
  const [hoverEvidences, sethoverEvidences] = useState('');
  const [Loadedincidents, setLoadedincidents] = useState(false);
  const [LoadingForSearch, setLoadingForSearch] = useState(false);
  const [IncidentID, setIncidentID] = useState(0);

  if(!Loadedincidents){
    setLoadedincidents(true)
    fetchNui('np-ui:mdtAction', {action:'incidents', data:'incidents'}).then(function(data) {
      setincidents(data.data)
      setincidentsList(data.data)
    })
  }
 

  return (
    <>
      <div className={classes.mdwIncidentsOuterContent}>
        <div className={classes.mdwIncidentsInnerContent}>
          <div className={classes.mdwIncidentsInnerContentLeft}>
            <div className={classes.mdwIncidentsInnerContentLeftHeader}>
              <div className='mdw-incidents-inner-content-left-header-text-left'>
                <Typography 
                  style = {{
                    color: '#fff',
                    wordBreak: 'break-word',
                  }}
                  variant={'h6'}
                  gutterBottom={true}
                >
                  Incidents
                </Typography>
              </div>
              <div className={classes.mdwIncidentsInnerContentLeftHeaderTextRight}>
                <div className='input-wrapper'>
                  <TextField
                    id="input-with-icon-textfield"
                    label='Search'
                    type='text'
                    onChange={function (e) {
                      return (function (text) {
                        if ((setLoadingForSearch(true), '' !== text)) {
                          var filter = incidents.filter(function (data) {
                            // var Ud, Uq, UU, UQ, Uh, UX;
                            return (
                              data.id.toString().toLowerCase().startsWith(text.toLowerCase()) ||
                              data.title.toString().toLowerCase().startsWith(text.toLowerCase()) ||
                              data.author.toString().toLowerCase().startsWith(text.toLowerCase())
                              // UP.info.toString().toLowerCase().startsWith(U8.toLowerCase()) ||
                              // (null === (Ud = UP.evidence) || void 0 === Ud ? void 0 : Ud.toLowerCase().includes(U8.toLowerCase())) ||
                              // (null === (Uq = UP.officers) || void 0 === Uq ? void 0 : Uq.toLowerCase().includes(U8.toLowerCase())) ||
                              // (null === (UU = UP.persons) || void 0 === UU ? void 0 : UU.toLowerCase().includes(U8.toLowerCase())) ||
                              // (null === (UQ = UP.tags) || void 0 === UQ ? void 0 : UQ.toLowerCase().includes(U8.toLowerCase())) ||
                              // (null === (Uh = UP.vehicles) || void 0 === Uh ? void 0 : Uh.toLowerCase().includes(U8.toLowerCase())) ||
                              // (null === (UX = UP.criminals) || void 0 === UX ? void 0 : UX.toLowerCase().includes(U8.toLowerCase()))
                            );
                          });
                          setincidents(filter);
                          setLoadingForSearch(false);
                        } else {
                          setLoadingForSearch(false);
                          setincidents(incidentsList);
                        }
                      })(e.target.value);
                    }}
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
                      startAdornment: <InputAdornment position="start"><i className="fas fa-search fa-w-16 fa-fw"></i></InputAdornment>,
                    }}
                    variant="standard"
                  />   

                </div>
              </div>
            </div>
            <div className={classes.mdwIncidentsInnerContentLeftBody}>
            {incidents && incidents.length > 0 ? (
              incidents.map((data: any) => {
                return (
                  <div
                    onClick={() => {
                      let id = data.id;
                      showLoading(true);
                      fetchNui('np-ui:mdtAction', {
                        action: 'incidents',
                        data: {
                          name: 'incident',
                          id: id
                        }
                      }).then(function(pData){
                        setofficers([]);
                        setPersonsInvolved([]);
                        setevidences([]);
                        if (pData.data && pData.data.id) setIncidentID(pData.data.id);
                        if (pData.data && pData.data.id) CurrentIncidentID(pData.data.id);
                        if (pData.data && pData.data.title) setTitle(pData.data.title);
                        if (pData.data && pData.data.info) setInfo(pData.data.info);
                        if (pData.data && pData.data.officers) setofficers(pData.data.officers);
                        if (pData.data && pData.data.persons) setPersonsInvolved(pData.data.persons);
                        // if (pData.data && pData.data.criminals) qr(pData.data.criminals);
                        if (pData.data && pData.data.evidence) setevidences(pData.data.evidence);
                        showLoading(false);
                      });
                    }}
                    id={data.id}
                    className="component-paper cursor-pointer"
                    style={{
                      width: '100%',
                      borderBottom: '0px solid #fff',
                      borderRadius: '0px',
                      backgroundColor: '#222831',
                    }}
                  >
                    <div className="main-container">
                      <div className="details">
                        <div className="description">
                          <div className="flex-row">
                            <Typography
                              style={{
                                color: '#fff',
                                wordBreak: 'break-word',
                              }}
                              variant="body2"
                              gutterBottom
                            >
                              {data.title}
                            </Typography>
                          </div>
                          <div
                            className="flex-row"
                            style={{
                              justifyContent: 'space-between',
                            }}
                          >
                            <Typography
                              style={{
                                color: '#fff',
                                wordBreak: 'break-word',
                              }}
                              variant="body2"
                              gutterBottom
                            >
                              {'ID: ' + data.id}
                            </Typography>
                            <Typography
                              style={{
                                color: '#fff',
                                wordBreak: 'break-word',
                              }}
                              variant="body2"
                              gutterBottom
                            >
                              {data.author + ' \u2500 ' + moment.unix(1000 * data.unix).fromNow()}
                            </Typography>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <></>
            )}
            <div className='spinner-wrapper'>
              <div style={{display: LoadingForSearch ? '' : 'none', alignItems: 'baseline', marginTop: '15%'}}>
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
            </div>
            </div>
          </div>
          <div className={classes.mdwInnerContentDivider}></div>
          <div style={{overflowY: 'auto'}} className={classes.mdwIncidentsContentWrapperRight}>
            <div className={classes.mdwIncidentsTextContentMiddle}>
              <div className={classes.mdwIncidentsInnerContentMiddleHeader}>
                <div className='mdw-incidents-inner-content-middle-header-text-left'>
                  <Typography 
                    style = {{
                      color: '#fff',
                      wordBreak: 'break-word',
                    }}
                    variant={'h6'}
                    gutterBottom={true}
                  >
                    {0 !== IncidentID ? 'Edit Incident (#'+IncidentID+')' : 'Create Incident'}
                  </Typography>
                </div>
                <div style={{paddingRight: '0px'}} className={classes.mdwIncidentsInnerContentMiddleHeaderTextRight}>
                  <Stack direction="row" spacing={1}>
                    <Tooltip sx={{backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px'}} arrow placement="top" title="Create New Incident">
                      <i style={{display: 0 !== IncidentID ? '' : 'none', color:'white'}} className='fas fa-file-alt fa-w-14'></i>
                    </Tooltip>
                    <Tooltip sx={{backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px'}} arrow placement="top" title="Save Incident">
                      <i style={{color:'white'}} className='fas fa-save fa-w-14'></i>
                    </Tooltip>
                  </Stack>
                </div>
              </div>
              <div style={{display: 'flex', flexDirection: 'column'}} className='mdw-inner-content-pre-wrapper'>
                <div style={{flexDirection: 'row'}} className={classes.mdwIncidentsInnerContentMiddleBody}>
                  <div style={{width: '100%'}} className='mdw-create-inputs'>
                    <div className='input-wrapper'>
                      <TextField
                        id="input-with-icon-textfield"
                        label='Title'
                        type='text'
                        onChange={event =>
                          setTitle(event.target.value)
                        }
                        value={title}
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
                          startAdornment: <InputAdornment position="start"><i className="fas fa-pen fa-w-16 fa-fw"></i></InputAdornment>,
                        }}
                        variant="standard"
                      />   
                    </div>
                  </div>
                </div>
              </div>
              <div className="mdw-create-document" style={{ width: '100%', marginTop:'15px', height: '100%', display: 'flex', justifyContent: 'center', color: '#fff' }}>
                <div className="mdw-create-document-inner-cont" style={{ width: '97%', height: '99%' }}>
                  <textarea onChange={event => setInfo(event.target.value)} value={Info} style={{background:'rgb(34, 40, 49)', outline:'none', padding:'15px', border:'none', width:'100%', height:'32vh'}} placeholder='Write something nice...' />
                </div>
              </div>
            </div>
            <div className={classes.mdwIncidentsEvidenceContentMiddle}>
              <div style={{display: 'flex', width: '100%', padding: '8px', minHeight: '48px', justifyContent: 'space-between'}} className={classes.mdwIncidentsInnerContentRightHeader}>
                <div className='mdw-incidents-inner-content-right-header-text-left'>
                  <Typography 
                    style = {{
                      color: '#fff',
                      wordBreak: 'break-word',
                    }}
                    variant={'h6'}
                    gutterBottom={true}
                  >
                    Evidence
                  </Typography>
                </div>
                <div style={{paddingRight: '0px'}} className={classes.mdwIncidentsInnerContentRightHeaderTextRight}>
                  <Stack direction="row" spacing={1}>
                    <Tooltip sx={{backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px'}} arrow placement="top" title="Add Evidence">
                      <i onClick={function(){setShowAssignEvidence(true)}} style={{color:'white'}} className='fas fa-plus fa-w-14'></i>
                    </Tooltip>
                  </Stack>
                </div>
              </div>
              <div style={{flexDirection: 'row', flexWrap: 'wrap', flex: '0', overflowY: 'unset'}} className={classes.mdwIncidentsInnerContentMiddleBody}>
                {console.log(typeof evidences)}
                {evidences && evidences.length > 0 && evidences.map(function(data) {
                  console.log(JSON.stringify(data))
                  if (data.type === 'photo') {
                    return (
                      <>
                        <div id={data.id} onMouseEnter={function(e){return sethoverEvidences(e.currentTarget.id)}} onMouseLeave={function(){return sethoverEvidences('')}} style={{paddingRight: '1.5%', paddingBottom: '1.5%', maxWidth: '100%'}}>
                          <Chip sx={{backgroundColor: '#4ea551', color: '#000', '& .MuiChip-deleteIcon': { color: '#000' }, '& .MuiChip-deleteIcon:hover': {   color: 'rgba(0, 0, 0, 0.5)', }}} label={'Photo ('+data.description+')'} color="primary" />
                          <Popper 
                            style={{zIndex: 1000, left: '10%', top: '10%'}} 
                            placement='bottom-end' 
                            open={hoverEvidences.toString() === data.id.toString()} 
                            disablePortal  
                            modifiers={[
                              {
                                name: 'flip',
                                enabled: false,
                                options: {
                                  altBoundary: false,
                                  rootBoundary: 'document',
                                  padding: 8,
                                },
                              },
                              {
                                name: 'preventOverflow',
                                enabled: false,
                                options: {
                                  altAxis: false,
                                  altBoundary: true,
                                  tether: false,
                                  rootBoundary: 'document',
                                  padding: 8,
                                },
                              },
                          ]}>
                            <div>
                              <img
                                alt=""
                                src={data.identifier}
                                style={{
                                  maxHeight: '600px',
                                  maxWidth: '800px',
                                }}
                              />
                            </div>
                          </Popper>
                        </div>
                      </>
                    );
                  } else if (data.type === 'other') {
                    return (
                      <>
                        <div id={data.id} style={{paddingRight: '1.5%', paddingBottom: '1.5%', maxWidth: '100%'}}>
                          <Chip label={'Identifier: '+data.identifier+' - ('+data.description+')'} sx={{backgroundColor: '#000', color: '#fff', '& .MuiChip-deleteIcon': { color: '#fff' }, '& .MuiChip-deleteIcon:hover': {   color: 'rgba(0, 0, 0, 0.5)', }}} color="primary" />
                        </div>
                      </>
                    );
                  } else if (data.type === 'blood') {
                    return (
                      <>
                        <div id={data.id} style={{paddingRight: '1.5%', paddingBottom: '1.5%', maxWidth: '100%'}}>
                          <Chip label={'Identifier: '+data.identifier+' - ('+data.description+')'} sx={{backgroundColor: '#ef4233', color: '#fff', '& .MuiChip-deleteIcon': { color: '#fff' }, '& .MuiChip-deleteIcon:hover': {   color: 'rgba(0, 0, 0, 0.5)', }}} color="primary" />
                        </div>
                      </>
                    );
                  } else if (data.type === 'casing') {
                    return (
                      <>
                        <div id={data.id} style={{paddingRight: '1.5%', paddingBottom: '1.5%', maxWidth: '100%'}}>
                          <Chip label={'Identifier: '+data.identifier+' - ('+data.description+')'} sx={{backgroundColor: '#81ba64', color: '#000', '& .MuiChip-deleteIcon': { color: '#000' }, '& .MuiChip-deleteIcon:hover': {   color: 'rgba(0, 0, 0, 0.5)', }}} color="primary" />
                        </div>
                      </>
                    );
                  } else if (data.type === 'weapon') {
                    return (
                      <>
                        <div id={data.id} style={{paddingRight: '1.5%', paddingBottom: '1.5%', maxWidth: '100%'}}>
                          <Chip label={'Identifier: '+data.identifier+' - ('+data.description+')'} sx={{backgroundColor: '#fff', color: '#000', '& .MuiChip-deleteIcon': { color: '#000' }, '& .MuiChip-deleteIcon:hover': {   color: 'rgba(0, 0, 0, 0.5)', }}} color="primary" />
                        </div>
                      </>
                    );
                  } else {
                    return <></>;
                  }
                })}
              </div>
            </div>
            <div className={classes.mdwIncidentsOfficersInvolvedContentMiddle}>
              <div style={{display: 'flex', width: '100%', padding: '8px', minHeight: '48px', justifyContent: 'space-between'}} className={classes.mdwIncidentsInnerContentRightHeader}>
                <div className='mdw-incidents-inner-content-right-header-text-left'>
                  <Typography 
                    style = {{
                      color: '#fff',
                      wordBreak: 'break-word',
                    }}
                    variant={'h6'}
                    gutterBottom={true}
                  >
                    Officers Involved
                  </Typography>
                </div>
                <div style={{paddingRight: '0px'}} className={classes.mdwIncidentsInnerContentRightHeaderTextRight}>
                  <Stack direction="row" spacing={1}>
                    <Tooltip sx={{backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px'}} arrow placement="top" title="Add Officer Involved">
                      <i style={{color:'white'}} className='fas fa-plus fa-w-14'></i>
                    </Tooltip>
                  </Stack>
                </div>
              </div>
              <div style={{flexDirection: 'row', flexWrap: 'wrap', flex: '0', overflowY: 'unset'}} className={classes.mdwIncidentsInnerContentMiddleBody}>
                {officers && officers.length > 0 && officers.map(function(data) {
                  return (
                    <>
                      <div style={{paddingRight: '1.5%', paddingBottom: '1.5%'}}>
                        <Chip label={'('+data.callsign+') '+data.name+''} sx={{backgroundColor: '#fff', color: '#000', '& .MuiChip-deleteIcon': { color: '#000' }, '& .MuiChip-deleteIcon:hover': {   color: 'rgba(0, 0, 0, 0.5)', }}} color="primary" />
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
            <div className={classes.mdwIncidentsPersonsInvolvedContentMiddle}>
              <div style={{display: 'flex', width: '100%', padding: '8px', minHeight: '48px', justifyContent: 'space-between'}} className={classes.mdwIncidentsInnerContentRightHeader}>
                <div className='mdw-incidents-inner-content-right-header-text-left'>
                  <Typography 
                    style = {{
                      color: '#fff',
                      wordBreak: 'break-word',
                    }}
                    variant={'h6'}
                    gutterBottom={true}
                  >
                    Persons Involved
                  </Typography>
                </div>
                <div style={{paddingRight: '0px'}} className={classes.mdwIncidentsInnerContentRightHeaderTextRight}>
                  <Stack direction="row" spacing={1}>
                    <Tooltip sx={{backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px'}} arrow placement="top" title="Add Person Involved">
                      <i style={{color:'white'}} className='fas fa-plus fa-w-14'></i>
                    </Tooltip>
                  </Stack>
                </div>
              </div>
              <div style={{flexDirection: 'row', flexWrap: 'wrap', flex: '0', overflowY: 'unset'}} className={classes.mdwIncidentsInnerContentMiddleBody}>
                {PersonsInvolved && PersonsInvolved.length > 0 && PersonsInvolved.map(function(data) {
                  return (
                    <>
                      <div style={{paddingRight: '1.5%', paddingBottom: '1.5%'}}>
                        <Chip label={data.name} sx={{backgroundColor: '#fff', color: '#000', '& .MuiChip-deleteIcon': { color: '#000' }, '& .MuiChip-deleteIcon:hover': {   color: 'rgba(0, 0, 0, 0.5)', }}} color="primary" />
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
            <div className={classes.mdwIncidentsTagsContentMiddle}>
              <div style={{display: 'flex', width: '100%', padding: '8px', minHeight: '48px', justifyContent: 'space-between'}} className={classes.mdwIncidentsInnerContentRightHeader}>
                <div className='mdw-incidents-inner-content-right-header-text-left'>
                  <Typography 
                    style = {{
                      color: '#fff',
                      wordBreak: 'break-word',
                    }}
                    variant={'h6'}
                    gutterBottom={true}
                  >
                    Tags
                  </Typography>
                </div>
                <div style={{paddingRight: '0px'}} className={classes.mdwIncidentsInnerContentRightHeaderTextRight}>
                  <Stack direction="row" spacing={1}>
                    <Tooltip sx={{backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px'}} arrow placement="top" title="Add Tag">
                      <i style={{color:'white'}} className='fas fa-plus fa-w-14'></i>
                    </Tooltip>
                  </Stack>
                </div>
              </div>
              <div style={{flexDirection: 'row', flexWrap: 'wrap', flex: '0', overflowY: 'unset'}} className={classes.mdwIncidentsInnerContentMiddleBody}>
                {Tags && Tags.length > 0 && Tags.map(function(data) {
                  return (
                    <>
                      <div style={{paddingRight: '1.5%', paddingBottom: '1.5%'}}>
                        <Chip label={data.tag} sx={{backgroundColor: '#fff', color: '#000', '& .MuiChip-deleteIcon': { color: '#000' }, '& .MuiChip-deleteIcon:hover': {   color: 'rgba(0, 0, 0, 0.5)', }}} color="primary" />
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
            <div className={classes.mdwIncidentsVehiclesContentMiddle}>
              <div style={{display: 'flex', width: '100%', padding: '8px', minHeight: '48px', justifyContent: 'space-between'}} className={classes.mdwIncidentsInnerContentRightHeader}>
                <div className='mdw-incidents-inner-content-right-header-text-left'>
                  <Typography 
                    style = {{
                      color: '#fff',
                      wordBreak: 'break-word',
                    }}
                    variant={'h6'}
                    gutterBottom={true}
                  >
                    Vehicles
                  </Typography>
                </div>
                <div style={{paddingRight: '0px'}} className={classes.mdwIncidentsInnerContentRightHeaderTextRight}>
                  <Stack direction="row" spacing={1}>
                    <Tooltip sx={{backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px'}} arrow placement="top" title="Add Vehicle">
                      <i style={{color:'white'}} className='fas fa-plus fa-w-14'></i>
                    </Tooltip>
                  </Stack>
                </div>
              </div>
              <div style={{flexDirection: 'row', flexWrap: 'wrap', flex: '0', overflowY: 'unset'}} className={classes.mdwIncidentsInnerContentMiddleBody}>
                {vehicles && vehicles.length > 0 && vehicles.map(function(data) {
                  return (
                    <>
                      <div style={{paddingRight: '1.5%', paddingBottom: '1.5%'}}>
                        <Chip label={'('+data.plate+') '+data.model+''} sx={{backgroundColor: '#fff', color: '#000', '& .MuiChip-deleteIcon': { color: '#000' }, '& .MuiChip-deleteIcon:hover': {   color: 'rgba(0, 0, 0, 0.5)', }}} color="primary" />
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
          <div className={classes.mdwInnerContentDivider}></div>
          <div style={{overflowY: 'auto'}} className={classes.mdwIncidentsContentWrapperRight}>
            <div className={classes.mdwIncidentsAddCriminalContentRight}>
              <div style={{display: 'flex', width: '100%', padding: '8px', minHeight: '48px', justifyContent: 'space-between'}} className={classes.mdwIncidentsInnerContentRightHeader}>
                <div className='mdw-incidents-inner-content-right-header-text-left'>
                  <Typography 
                    style = {{
                      color: '#fff',
                      wordBreak: 'break-word',
                    }}
                    variant={'h6'}
                    gutterBottom={true}
                  >
                    Add Criminal Scum
                  </Typography>
                </div>
                <div style={{paddingRight: '0px'}} className={classes.mdwIncidentsInnerContentRightHeaderTextRight}>
                  <Stack direction="row" spacing={1}>
                    <Tooltip sx={{backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px'}} arrow placement="top" title="Add Criminal">
                      <i style={{color:'white'}} className='fas fa-plus fa-w-14'></i>
                    </Tooltip>
                  </Stack>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default IncidentsPage;