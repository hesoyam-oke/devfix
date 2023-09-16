import React, { useState, useEffect, useRef } from 'react';
import * as ReactDOM from 'react-dom';
import './index.css'
import { useNuiEvent } from "../../../../../hooks/useNuiEvent";
import { useExitListener } from "../../../../../hooks/useExitListener";
import { fetchNui } from "../../../../../utils/fetchNui";
import { isEnvBrowser, noop } from '../../../../../utils/misc';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {DveXAlert} from '../../../../main/components';
import { Button, Checkbox, FormControl, List, ListItemText, ListItem, IconButton, FormControlLabel, FormGroup, Slider, FormHelperText, Grid, Tooltip, Stack, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import useStyles from './index.styles';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const DetailsApp: React.FC = () => {
  const classes = useStyles();
  const [LoadeData, setLoadeData]: any = useState(false)
  const [data, setdata]: any = useState({
    cid: 0,
    bankid: 0,
    phonenumber: 0,
    cash: 0,
    bank: 0,
    casino: 0,
    licenses: [],
  })


  if(!LoadeData){
    setLoadeData(true)
    fetchNui('np-ui:getCharacterDetails', {}).then(function (result) {
      setdata(result.data)
    }).catch(function(error){
      return <DveXAlert AlertText='Error occurred in app: Phone - restarting...' AlertType='error' />
    })
  }
  
  return (
    <>
      <div style={{zIndex: 500}} className='information-container'>
        <div className={classes.container}>
            <div className={classes.moneys}>
              <Tooltip sx={{backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px'}} arrow placement="top" title="State ID">
                <div>
                  <i className='fas fa-id-card fa-fw fa-2x'></i>
                  <Typography variant='h6'>{data.cid}</Typography>
                </div>
              </Tooltip>
              <Tooltip sx={{backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px'}} arrow placement="top" title="Bank Account ID">
                <div>
                  <i className='fas fa-university fa-fw fa-2x'></i>
                  <Typography variant='h6'>{data.bankid}</Typography>
                </div>
              </Tooltip>
              <Tooltip sx={{backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px'}} arrow placement="top" title="Phone Number">
                <div>
                  <i className='fas fa-mobile fa-fw fa-2x'></i>
                  <Typography variant='h6'>{data.phonenumber}</Typography>
                </div>
              </Tooltip>
              <Tooltip sx={{backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px'}} arrow placement="top" title="Wallet">
                <div className='cash'>
                  <i className='fas fa-wallet fa-fw fa-2x'></i>
                  <Typography style={{color:'white'}} variant='h6'>{data.cash.toLocaleString('en-Us', {style: 'currency',currency: 'USD'})}</Typography>
                </div>
              </Tooltip>
              <Tooltip sx={{backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px'}} arrow placement="top" title="Personal Bank Balance">
                <div className='bank'>
                  <i className='fas fa-piggy-bank fa-fw fa-2x'></i>
                  <Typography style={{color:'white'}} variant='h6'>{data.bank.toLocaleString('en-Us', {style: 'currency',currency: 'USD'})}</Typography>
                </div>
              </Tooltip>
              <Tooltip sx={{backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px'}} arrow placement="top" title="Casino Balance">
                <div className='casino'>
                  <i className='fas fa-dice-three fa-fw fa-2x'></i>
                  <Typography style={{color:'white'}} variant='h6'>{data.casino.toLocaleString('en-Us', {style: 'currency',currency: 'USD'})}</Typography>
                </div>
              </Tooltip>
            </div>
        <div className={classes.licenses}>
          <Typography variant='h5' style={{ color: '#fff' }}>Licenses</Typography>
          {data.licenses && data.licenses.length > 0 && data.licenses.map(function (lic) {
            return (
              <>
                <div className={classes.license}>
                  <div style={{flex: '2.5'}}>
                    <Typography variant='body1' style={{ color: '#fff' }}>{lic.type} License</Typography>
                  </div>
                  <div style={{maxWidth: '60'}} className={lic.status ? 'icon icon-green' : 'icon icon-red'}>
                    <i className={`fas fa-${lic.status ? 'check-circle' : 'times-circle'} fa-fw fa-lg`}></i>
                  </div>
                </div>
              </>
            )
          })}
        </div>
        </div>
      </div>
    </>
  );
}

export default DetailsApp;