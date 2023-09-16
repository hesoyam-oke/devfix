import React, { useState, useEffect, useRef } from 'react';
import * as ReactDOM from 'react-dom';
import './index.css'
import { useNuiEvent } from "../../../../../hooks/useNuiEvent";
import { useExitListener } from "../../../../../hooks/useExitListener";
import { fetchNui } from "../../../../../utils/fetchNui";
import { isEnvBrowser, noop } from '../../../../../utils/misc';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Button, Checkbox, FormControl, List, ListItemText, Divider, ListItem, IconButton, FormControlLabel, FormGroup, Slider, FormHelperText, Grid, Tooltip, Stack, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import useStyles from './index.styles';
// import YP from './YellowPages';
import { Checkmark } from 'react-checkmark'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Moment from 'react-moment';

const YellowPagesApp: React.FC = () => {
  const classes = useStyles();
  const [showYPModel, setShowYPModel]: any = useState(false);
  const [showAddYPLoader, setshowAddYPLoader]: any = useState(false);
  const [showAddYPSuccess, setshowAddYPSuccess]: any = useState(false);
  const [hideinputs, setHideYPinputs]: any = useState(false);
  const [number, setnumber]: any = useState('');
  const [YellowPage, setYellowPage]: any = useState('');
  const [showError, setshowError]: any = useState(false);
  const [ErrorYP, setErrorYP]: any = useState('');
  const [Ads, setAds]: any = useState([]);
  const [AdsList, setAdsList]: any = useState([])
  const [LoadeYPs, setLoadeYPs]: any = useState(false);

  const YPRef = useRef(null);

  useEffect(() => {
    if (YPRef.current) {
      YPRef.current.scrollTop = 0 - YPRef.current.scrollHeight;
    }
  }, [Ads]);


  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.toLowerCase();
    if (inputValue !== '') {
      const filteredList = Ads.filter((item) =>
        Object.values(item)
          .map((value) => value && value.toString().toLowerCase())
          .some((value) => value && value.includes(inputValue))
      );
      setAds(filteredList);
    } else {
      setAds(AdsList);
    }
  };

  async function fetchData() {
    const result = await fetchNui('np-ui:getYellowPages', {});
    setAds(result.data);
    setAdsList(result.data);
  }
  if(!LoadeYPs){
    setLoadeYPs(true)
    fetchData()
  }
  
  return (
    <>
      <div style={{zIndex: 500}} className='yellowpage-container'>
      <div style={{display: showYPModel ? '' : 'none'}} className={classes.YellowPageModalContainer}>
        <div className={classes.YellowPageModalInnerContainer}>
          <div style={{display: showAddYPLoader ? '' : 'none'}} className='spinner-wrapper'>
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
          <div style={{display: showAddYPSuccess ? '' : 'none'}} className='spinner-wrapper'>
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
								  }} variant='body2' gutterBottom>{ErrorYP}</Typography>
            </div>
            <div style={{display: showError ? '' : 'none', justifyContent: 'center'}} className='buttons'>
            <div>
            <Button onClick={function(){
                setShowYPModel(false) 
                setshowAddYPLoader(false) 
                setshowAddYPSuccess(false) 
                setshowError(false)
                setErrorYP('')
                setHideYPinputs(false)
                }} size='small' color='success' variant="contained">Okay</Button>
            </div>
            </div>

            <div style={{display: showError ? 'none' : ''}}>
            <FormControl fullWidth sx={{  width: '100%' }} variant="standard">
              <TextField
                multiline
                maxRows='10'
                label='Ad'
                id="standard-start-adornment"
                onChange={event =>
                  setYellowPage(event.target.value)
                }
                inputProps={{maxLength: 255}}
                helperText={YellowPage.length+'/255'}
                value={YellowPage}
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
                setShowYPModel(false) 
                setshowAddYPLoader(false) 
                setshowAddYPSuccess(false) 
                setHideYPinputs(false)
                }} size='small' color='warning'  variant="contained">Cancel</Button>
          </div>
      
          <div>
              <Button onClick={async function(){
                const resultChar = await fetchNui('np-ui:getCharacter', {});

                setshowAddYPLoader(true) 
                setHideYPinputs(true)
                fetchNui('np-ui:addYellowPagesEntry', {
                  character: resultChar.data,
                  text: YellowPage,
                }).then(function (result) {
                  setshowAddYPLoader(false) 
                  if(result.meta.ok){
                    setshowAddYPLoader(false)
                    setshowAddYPSuccess(true)
                    setTimeout(() => {
                      setShowYPModel(false) 
                      setshowAddYPLoader(false) 
                      setshowAddYPSuccess(false) 
                      setHideYPinputs(false) 
                      setAds(result.data)
                      setAdsList(result.data)                         
                    }, 1500);
                  }else{
                    setshowAddYPSuccess(false)
                    setshowAddYPLoader(false)
                    setshowError(true)
                    setErrorYP(result.meta.message)
                  }
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
        <Tooltip title='Create Ad' placement='left' arrow>
          <div
            onClick={function () {
                setYellowPage('')
                setShowYPModel(true) 
                setshowAddYPLoader(false) 
                setshowAddYPSuccess(false) 
                setHideYPinputs(false)
            }}
            style={{
              fontSize: '1.5em',
            }}
          >
            <i className={`fas fa-plus fa-w-16`}></i>
          </div>
        </Tooltip>
      </div>
      <div className={classes.appList} ref={YPRef}>
        {Ads && Ads.length > 0
          ? Ads.map(function (data) {
              return (
                <>
                  <div className={classes.ypComponentContainer}>
                    <Typography style={{color: '#000', wordBreak: 'break-word', textAlign:'center'}} variant="body2" gutterBottom>{data.text}</Typography>
                    <div style={{marginBottom:'10px'}}></div>
                    <Divider style={{position:'absolute', left:'-16px', borderColor:'black'}} variant='middle' />
                    <div style={{ fontSize: '13px', display: 'flex', paddingBottom: '2vh' }}>
                      <Typography style={{ color: '#000', wordBreak: 'break-word', position: 'absolute', float: 'left', bottom: '1%' }} variant="body2" gutterBottom>
                        {data.first_name} {data.last_name}
                      </Typography>
                      <Tooltip title='Call' placement='top' arrow>
                        <Typography style={{ color: '#000', backgroundColor: 'transparent', wordBreak: 'break-word', position: 'absolute', float: 'right', right: '5%', bottom: '1%' }} variant="body2" gutterBottom>
                          {data.number}
                        </Typography>
                      </Tooltip>
                    </div>
                  </div>
                </>
              )
          })
        : <div style={{ display:'flex', flexDirection: 'column', textAlign: 'center' }} className='flex-centered'>
            <i className="fas fa-frown fa-w-16 fa-fw fa-3x" style={{ color: '#fff', marginBottom: '32px' }}></i>
            <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="h6" gutterBottom>
              Nothing Here!
            </Typography>
          </div>}
      </div>
      </div>
    </>
  );
}

export default YellowPagesApp;