import { useState } from 'react';
import { fetchNui } from '../../../../utils/fetchNui';
import { TextField, InputAdornment, MenuItem, Button, Typography } from '@mui/material';
import '../index'
import useStyles from '../index.styles';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function ModalContainer({showAssignEvidence, setShowAssignEvidence, CurrentIncidentID, evidences, setevidences}: any) {
  const classes = useStyles();
  const [showAssignEvidenceLoading, setShowAssignEvidenceLoading]: any = useState(false);
  const [IdentifierID, setIdentifierID]: any = useState('');
  const [Type, setType]: any = useState('other');
  const [IdentifierName, setIdentifierName]: any = useState('');
  const [Description, setDescription]: any = useState('');
  return (
    <>
      <div style={{display: showAssignEvidence ? '' : 'none'}} className={classes.mdwAssignEvidenceModalContainer}>
        <div className={classes.mdwAssignEvidenceModalInnerContainer}>
          <div style={{display: 'flex', flexDirection: 'column', alignContent: 'space-between', position: 'relative', justifyContent: 'space-between', flex: '1 1', overflow: 'hidden'}} className='mdw-details'>
            <div style={{display: showAssignEvidenceLoading ? 'flex' : 'none', justifyContent: 'center', alignItems: 'center', marginTop: '55%'}} className='spinnerwrapper'>
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
            <div style={{display: showAssignEvidenceLoading ? 'none' : ''}} className='mdw-desc'>
              <div style={{display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-start', padding: '15px'}} className='flex-row'>
                <Typography 
                  style = {{
                    color: '#fff',
                    wordBreak: 'break-word',
                  }}
                  variant={'body1'}
                  gutterBottom={true}
                >
                  Assign Evidence
                </Typography>
              </div>
              <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', padding: '8px', paddingBottom: '0px', paddingTop: '0px'}} className='flex-row'>
                <div style={{width: '96%', marginBottom: '5%'}} className='input-wrapper'>
                  <TextField
                    id="input-with-icon-textfield"
                    label='Identifier'
                    type='text'
                    onChange={function (e) {
                      setIdentifierID(e.target.value)
                    }}
                    value={IdentifierID}
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
                      startAdornment: <InputAdornment position="start"><i className="fas fa-fingerprint fa-w-16 fa-fw"></i></InputAdornment>,
                    }}
                    variant="standard"
                  /> 
                </div>
              </div>
              <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-end', paddingRight: '15px'}} className='flex-row'>
                <div>
                  <Button size='small' color='success' variant='contained'>Assign</Button>
                </div>
              </div>
            </div>
            <div style={{display: showAssignEvidenceLoading ? 'none' : ''}} className='mdw-desc'>
              <div style={{display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-start', padding: '15px'}} className='flex-row'>
                <Typography 
                  style = {{
                    color: '#fff',
                    wordBreak: 'break-word',
                  }}
                  variant={'body1'}
                  gutterBottom={true}
                >
                  Add New Evidence
                </Typography>
              </div>
              <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', padding: '8px', paddingBottom: '0px', paddingTop: '0px'}} className='flex-row'>
                <div style={{width: '96%', marginBottom: '5%'}} className='input-wrapper'>
                  <TextField
                    id="input-with-icon-textfield"
                    label='Type'
                    select
                    defaultValue="other"
                    onChange={function(e){
                      console.log(e.target.value)
                      setType(e.target.value)
                    }}
                    value={Type}
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
                  >
                    <MenuItem value='other'>Other</MenuItem>  
                    <MenuItem value='blood'>Blood</MenuItem>  
                    <MenuItem value='casing'>Casing</MenuItem>  
                    <MenuItem value='weapon'>Weapon</MenuItem>  
                    <MenuItem value='photo'>Photo</MenuItem>  
                  </TextField> 
                </div>
                <div style={{width: '96%', marginBottom: '5%'}} className='input-wrapper'>
                  <TextField
                    id="input-with-icon-textfield"
                    label='Identifier'
                    onChange={function (e) {
                      setIdentifierName(e.target.value)
                    }}
                    value={IdentifierName}
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
                <div style={{width: '96%', marginBottom: '5%'}} className='input-wrapper'>
                  <TextField
                    id="input-with-icon-textfield"
                    label='Description'
                    onChange={function (e) {
                      setDescription(e.target.value)
                    }}
                    value={Description}
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
                      startAdornment: <InputAdornment position="start"><i className="fas fa-clipboard fa-w-16 fa-fw"></i></InputAdornment>,
                    }}
                    variant="standard"
                  />
                </div>
                <div style={{width: '96%', marginBottom: '5%'}} className='input-wrapper'>
                  <TextField
                    id="input-with-icon-textfield"
                    label='CID'
                    // onChange={function (e) {
                    //   return (function (text) {
                    //     if ((setLoadingForSearch(true), '' !== text)) {
                    //       var filter = incidents.filter(function (data) {
                    //         // var Ud, Uq, UU, UQ, Uh, UX;
                    //         return (
                    //           data.id.toString().toLowerCase().startsWith(text.toLowerCase()) ||
                    //           data.title.toString().toLowerCase().startsWith(text.toLowerCase()) ||
                    //           data.author.toString().toLowerCase().startsWith(text.toLowerCase())
                    //           // UP.info.toString().toLowerCase().startsWith(U8.toLowerCase()) ||
                    //           // (null === (Ud = UP.evidence) || void 0 === Ud ? void 0 : Ud.toLowerCase().includes(U8.toLowerCase())) ||
                    //           // (null === (Uq = UP.officers) || void 0 === Uq ? void 0 : Uq.toLowerCase().includes(U8.toLowerCase())) ||
                    //           // (null === (UU = UP.persons) || void 0 === UU ? void 0 : UU.toLowerCase().includes(U8.toLowerCase())) ||
                    //           // (null === (UQ = UP.tags) || void 0 === UQ ? void 0 : UQ.toLowerCase().includes(U8.toLowerCase())) ||
                    //           // (null === (Uh = UP.vehicles) || void 0 === Uh ? void 0 : Uh.toLowerCase().includes(U8.toLowerCase())) ||
                    //           // (null === (UX = UP.criminals) || void 0 === UX ? void 0 : UX.toLowerCase().includes(U8.toLowerCase()))
                    //         );
                    //       });
                    //       setincidents(filter);
                    //       setLoadingForSearch(false);
                    //     } else {
                    //       setLoadingForSearch(false);
                    //       setincidents(incidentsList);
                    //     }
                    //   })(e.target.value);
                    // }}
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
                      startAdornment: <InputAdornment position="start"><i className="fas fa-user fa-w-16 fa-fw"></i></InputAdornment>,
                    }}
                    variant="standard"
                  />
                </div>
              </div>
              <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-end', paddingRight: '15px'}} className='flex-row'>
                <div>
                  <Button onClick={function(){
                    setShowAssignEvidenceLoading(true)
                    fetchNui('np-ui:mdtAction', {
                      action:'incidents', 
                      data:{
                        name:'updateIncident',
                        id:CurrentIncidentID,
                        type:'evidence',
                        add:true,
                        data:{
                          id:CurrentIncidentID,
                          type:Type,
                          identifier:IdentifierName,
                          description:Description
                        }
                      }
                    }).then(function(data) {
                      setShowAssignEvidenceLoading(false)
                      fetchNui('np-ui:mdtAction', {
                        action: 'incidents',
                        data: {
                          name: 'incident',
                          id: CurrentIncidentID
                        }
                      }).then(function(pData){
                        setevidences([]);
                        if (pData.data && pData.data.evidence) setevidences(pData.data.evidence);
                      });
                    })
                  }} size='small' color='success' variant='contained'>Create</Button>
                </div>
              </div>
            </div>
            <div style={{display: showAssignEvidenceLoading ? 'none' : 'flex', justifyContent: 'flex-end', flexDirection: 'column', alignItems: 'center', padding: '8px', marginTop: '1%'}} className='mdw-alignbottom'>
              <div>
                <Button onClick={function(){setShowAssignEvidence(false)}} size='small' color='warning' variant='contained'>Close</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalContainer;