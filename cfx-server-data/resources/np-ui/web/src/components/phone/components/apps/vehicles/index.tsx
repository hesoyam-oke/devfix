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
import CarComponent from './cars';
// import Vehicles from './Vehicless';
import { Checkmark } from 'react-checkmark'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Moment from 'react-moment';

const VehiclesApp: React.FC = () => {
  const classes = useStyles();
  const [showVehiclesModel, setShowVehiclesModel]: any = useState(false);
  const [showAddVehiclesLoader, setshowAddVehiclesLoader]: any = useState(false);
  const [showAddVehiclesSuccess, setshowAddVehiclesSuccess]: any = useState(false);
  const [hideinputs, setHideVehiclesinputs]: any = useState(false);
  const [number, setnumber]: any = useState('');
  const [Price, setPrice]: any = useState();
  const [showError, setshowError]: any = useState(false);
  const [ErrorVehicles, setErrorVehicles]: any = useState('');
  const [Vehicles, setVehicles]: any = useState([]);
  const [VehiclesList, setVehiclesList]: any = useState([])
  const [LoadeVehicles, setLoadeVehicles]: any = useState(false);



  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.toLowerCase();
    if (inputValue !== '') {
      const filteredList = Vehicles.filter((item) =>
        Object.values(item)
          .map((value) => value && value.toString().toLowerCase())
          .some((value) => value && value.includes(inputValue))
      );
      setVehicles(filteredList);
    } else {
      setVehicles(VehiclesList);
    }
  };

  async function fetchData() {
    const resultChar = await fetchNui('np-ui:getCharacter', {});
    const result = await fetchNui('np-ui:getCars', {character: resultChar.data});
    setVehicles(result.data);
    setVehiclesList(result.data);
  }
  if(!LoadeVehicles){
    setLoadeVehicles(true)
    fetchData()
  }
  
  return (
    <>
      <div style={{zIndex: 500}} className='yellowpage-container'>
      <div style={{display: showVehiclesModel ? '' : 'none'}} className={classes.VehiclesModalContainer}>
        <div className={classes.VehiclesModalInnerContainer}>
          <div style={{display: showAddVehiclesLoader ? '' : 'none'}} className='spinner-wrapper'>
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
          <div style={{display: showAddVehiclesSuccess ? '' : 'none'}} className='spinner-wrapper'>
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
								  }} variant='body2' gutterBottom>{ErrorVehicles}</Typography>
            </div>
            <div style={{display: showError ? '' : 'none', justifyContent: 'center'}} className='buttons'>
            <div>
            <Button onClick={function(){
                setShowVehiclesModel(false) 
                setshowAddVehiclesLoader(false) 
                setshowAddVehiclesSuccess(false) 
                setshowError(false)
                setErrorVehicles('')
                setHideVehiclesinputs(false)
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
                  setPrice(event.target.value)
                }
                inputProps={{maxLength: 255}}
                helperText={Vehicles.length+'/255'}
                value={Price}
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
                setShowVehiclesModel(false) 
                setshowAddVehiclesLoader(false) 
                setshowAddVehiclesSuccess(false) 
                setHideVehiclesinputs(false)
                }} size='small' color='warning'  variant="contained">Cancel</Button>
          </div>
      
          <div>
              <Button onClick={async function(){
                const resultChar = await fetchNui('np-ui:getCharacter', {});

                setshowAddVehiclesLoader(true) 
                setHideVehiclesinputs(true)
                fetchNui('np-ui:addVehiclessEntry', {
                  character: resultChar.data,
                  text: Vehicles,
                }).then(function (result) {
                  setshowAddVehiclesLoader(false) 
                  if(result.meta.ok){
                    setshowAddVehiclesLoader(false)
                    setshowAddVehiclesSuccess(true)
                    setTimeout(() => {
                      setShowVehiclesModel(false) 
                      setshowAddVehiclesLoader(false) 
                      setshowAddVehiclesSuccess(false) 
                      setHideVehiclesinputs(false) 
                      setVehicles(result.data)
                      setVehiclesList(result.data)                         
                    }, 1500);
                  }else{
                    setshowAddVehiclesSuccess(false)
                    setshowAddVehiclesLoader(false)
                    setshowError(true)
                    setErrorVehicles(result.meta.message)
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

      <div className={classes.appList}>
        {Vehicles && Vehicles.length > 0
          ? Vehicles.map(function (data) {
              return (
                <>
                  <CarComponent vin={data.vin} plate={data.plate} model={data.model} state={data.state} garage={data.garage} type={data.type} spawnable={data.spawnable} location={data.location} damage={data.damage} />
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

export default VehiclesApp;