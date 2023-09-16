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
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const EmailApp: React.FC = () => {
  const classes = useStyles();
  const [data, setdata]: any = useState({
        cid: 0,
				bankid: 0,
				phonenumber: 0,
				cash: 0,
				bank: 0,
				casino: 0,
				licenses: [],
  })


  return (
    <>
      <div style={{zIndex: 500}} className='email-container'>
        <div className={classes.appSearchWrapper}>
          <TextField
            label='Search'
            id="standard-start-adornment"
            type='text'
            // onChange={handleSearchChange}
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
          <div className='component-paper cursor-pointer'>
            <div className='main-container'>
              <div className='details'>
                <div className='title'>
                  <Typography style={{
                    color: '#fff',
                    wordBreak: 'break-word',
                  }} variant='body2' gutterBottom>From: Test</Typography>
                </div>
                <div className='description'>
                  <div className='flex-row'>
                    <Typography style={{
                      color: '#fff',
                      wordBreak: 'break-word',
                    }} variant='body2' gutterBottom>Subject: Test</Typography>
                  </div>
                  <div className='flex-row'>
                    Tesssssssssssssssssssssssssst
                    Tesssssssssssssssssssssssssst
                    Tesssssssssssssssssssssssssst
                    Tesssssssssssssssssssssssssst
                    Tesssssssssssssssssssssssssst
                    Tesssssssssssssssssssssssssst
                    Tesssssssssssssssssssssssssst

                    TesssssssssssssssssssssssssstTesssssssssssssssssssssssssstTesssssssssssssssssssssssssst
                  </div>
                </div>
                <Divider variant='fullWidth' sx={{ borderColor: '#5e6d7d' }} />
                <Typography style={{
                    color: '#fff',
                    wordBreak: 'break-word',
                    textAlign: 'center',
                    marginTop: '5%',
                }} variant='body2' gutterBottom>5 min ago</Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EmailApp;