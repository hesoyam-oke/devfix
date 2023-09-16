import React, { useState, useEffect, useRef } from 'react';
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
import {DveXAlert} from '../../../../main/components';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const ContactsApp: React.FC = () => {
  const classes = useStyles();
  const [data, setdata]: any = useState([])
  const [showAddContactModel, setShowAddContactModel]: any = useState(false)
  const [showAddContactLoader, setshowAddContactLoader]: any = useState(false)
  const [showAddContactSuccess, setshowAddContactSuccess]: any = useState(false)
  const [hideinputs, setHideinputs]: any = useState(false)
  const [NameInput, setNameInput]: any = useState('')
  const [NumberInput, setNumberInput]: any = useState()
  const [SearchValue, setSearchValue]: any = useState('')
  const [list, setlist]: any = useState([])
  const [search, setsearch]: any = useState('')
  const [showError, setshowError]: any = useState(false)
  const [LoadeContacts, setLoadeContacts]: any = useState(false)
  const [ErrorMessage, setErrorMessage]: any = useState('')
  const [HoverContact, setHover]: any = useState('')


  if(!LoadeContacts){
    setLoadeContacts(true)
    fetchNui('np-ui:getContacts', {}).then(function (result) {
      setdata(result.data)
      setlist(result.data)
    })
  }

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

  var museenter = function (event) {
    setHover(event.currentTarget.id)
  }

  var museleave = function () {
    setHover('')
  }

  return (
    <>
      <div className='contacts-container'>
      <div style={{display: showAddContactModel ? '' : 'none'}} className={classes.contactModalContainer}>
        <div className={classes.contactModalInnerContainer}>
          <div style={{display: showAddContactLoader ? '' : 'none'}} className='spinner-wrapper'>
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
          <div style={{display: showAddContactSuccess ? '' : 'none'}} className='spinner-wrapper'>
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
                setShowAddContactModel(false) 
                setshowAddContactLoader(false) 
                setshowAddContactSuccess(false) 
                setshowError(false)
                setErrorMessage('')
                setHideinputs(false)
                }} size='small' color='success' variant="contained">Okay</Button>
            </div>
            </div>

            
            <div style={{display: showError ? 'none' : ''}}>
            <FormControl fullWidth sx={{ marginBottom:'15px', width: '100%' }} variant="standard">
              <TextField
                label='Name'
                id="standard-start-adornment"
                type='text'
                onChange={event =>
                  setNameInput(event.target.value)
                }
                value={NameInput}
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
                  startAdornment: <InputAdornment position="start"><i className="fas fa-user"></i></InputAdornment>,
                }}
                variant="standard"
              />   
            </FormControl>
            </div>
            <div style={{display: showError ? 'none' : ''}}>
            <FormControl fullWidth sx={{  width: '100%' }} variant="standard">
              <TextField
                label='Number'
                id="standard-start-adornment"
                type='text'
                onChange={event =>
                  setNumberInput(event.target.value)
                }
                value={NumberInput}
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
                  startAdornment: <InputAdornment position="start"><i className="fas fa-phone-alt"></i></InputAdornment>,
                }}
                variant="standard"
              />   

            </FormControl>
            </div>
            <div style={{display: showError ? 'none' : ''}} className='buttons'>
            <div>
              <Button onClick={function(){
                setShowAddContactModel(false) 
                setshowAddContactLoader(false) 
                setshowAddContactSuccess(false) 
                setHideinputs(false)
                }} size='small' color='warning'  variant="contained">Cancel</Button>
          </div>
      
          <div>
              <Button onClick={function(){
                setshowAddContactLoader(true) 
                setHideinputs(true)
                fetchNui('np-ui:addContact', {
                  name: NameInput,
                  number: NumberInput,
                }).then(function (result) {
                  if(result.meta.ok){
                    setshowAddContactLoader(false)
                    setshowAddContactSuccess(true)
                    setTimeout(() => {
                      setShowAddContactModel(false) 
                      setshowAddContactLoader(false) 
                      setshowAddContactSuccess(false) 
                      setHideinputs(false)   
                      fetchNui('np-ui:getContacts', {}).then(function (result) {
                        setdata(result.data)
                        setlist(result.data)
                      }).catch(function(error){
                        return <DveXAlert AlertText='Error occurred in app: Phone - restarting...' AlertType='error' />
                      })
                    }, 1500);
                  }else{
                    setshowAddContactSuccess(false)
                    setshowAddContactLoader(false)
                    setshowError(true)
                    setErrorMessage(result.meta.message)
                  }
                }).catch(function(error){
                  return <DveXAlert AlertText='Error occurred in app: Phone - restarting...' AlertType='error' />
                })
              }} size='small' color='success' variant="contained">Submit</Button>
          </div>

            </div>
          </div>
        </div>
      </div>
      <div className={classes.appSearchWrapper}>

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
      <div className={classes.appIcon}>
        <Tooltip title='Add Contact' placement='left' arrow>
          <div
            onClick={function () {
                setShowAddContactModel(true) 
                setshowAddContactLoader(false) 
                setshowAddContactSuccess(false) 
                setHideinputs(false)
            }}
            style={{
              fontSize: '1.2em',
            }}
          >
            <i className={`fas fa-user-plus fa-w-16 fa-fw fa-lg`}></i>
          </div>
        </Tooltip>
      </div>
      <div className={classes.appList}>

        {data && data.length > 0
          ? data.map(function (action: any) {
              return (
                <div id={action.number} onMouseEnter={museenter} onMouseLeave={museleave} className='component-paper cursor-pointer'>
                  <div className='main-container'>
                    <div className='image'>
                      <i className='fas fa-user-circle fa-w-16 fa-fw fa-3x'></i>
                    </div>
                    <div className='details'>
                      <div className='title'>
                        <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>
                          {action.name}
                        </Typography>
                      </div>
                      <div className='description'>
                        <div className='flex-row'>
                          <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>
                            {action.number}
                          </Typography>
                        </div>
                      </div>
                    </div>
                    <div className={HoverContact.toString() === action.number.toString() ? 'actions actions-show' : 'actions'}>
                      <Tooltip title='Remove Contact' placement='top' arrow>
                        <div><i id={action.number} className='fas fa-user-slash fa-w-16 fa-fw fa-lg'></i></div>
                      </Tooltip>
                      <Tooltip title='Call' placement='top' arrow>
                        <div><i id={action.number} className='fas fa-phone fa-w-16 fa-fw fa-lg'></i></div>
                      </Tooltip>
                      <Tooltip title='Message' placement='top' arrow>
                        <div><i id={action.number} className='fas fa-comment fa-w-16 fa-fw fa-lg'></i></div>
                      </Tooltip>
                      <CopyToClipboard text={action.number}>
                        <Tooltip title='Copy Number' placement='top' arrow>
                          <div><i id={action.number} className='fas fa-clipboard fa-w-16 fa-fw fa-lg'></i></div>
                        </Tooltip>
                      </CopyToClipboard>
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
    </>
  );
}

export default ContactsApp;