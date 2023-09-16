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
  const [Items, setItems]: any = useState([
    {
      id: 1,
      product_icon: 'circle',
      product_name:'VPN',
      product_price:'15',
      cryptoid: 2,
    }
  ]);
  const [LoadeItems, setLoadeItems]: any = useState(false);
  const [ItemsHover, setItemHover]: any = useState('')






  async function fetchData() {
    const result = await fetchNui('np-ui:getJobData', {});
    setItems(result.data)
  }
  

  if(!LoadeItems){
    setLoadeItems(true)
    fetchData()
  }

  var museenter=function(event){setItemHover(event.currentTarget.id)}
  var museleave=function(){setItemHover('')}

  return (
    <>
      <div style={{zIndex: 500}} className='app-dvex-container'>
        <div className={classes.Items}>
          {Items && Items.length > 0 
            ? Items.map(function (data){
              return (
                <div id={data.id} onMouseEnter={museenter} onMouseLeave={museleave} style={{marginBottom:'15%'}} className='component-paper cursor-pointer'>
                  <div className='main-container'>
                    <div className='image'>
                      <i className={'fas fa-'+data.product_icon+' fa-w-16 fa-fw fa-3x'}></i>
                    </div>
                    <div className='details'>
                      <div className='title'>
                        <Typography style={{ color: '#fff', wordBreak: 'break-word'}} variant="body2" gutterBottom>
                          {data.product_name}
                        </Typography>
                      </div>
                      <div className='description'>
                        {data.product_price} {1 === data.cryptoid ? 'SHUNGITE' : 'GUINEA'}
                      </div>
                    </div>
                    <div className={ItemsHover.toString() === data.id.toString() ? 'actions actions-show' : 'actions'}>
                      <Tooltip title='Purchase' placement='top' arrow>
                        <div><i className='fa-solid fa-hand-holding-dollar fa-w-16 fa-fw fa-lg'></i></div>
                      </Tooltip>
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
      </div>
    </>
  );
}

export default JobCenterApp;