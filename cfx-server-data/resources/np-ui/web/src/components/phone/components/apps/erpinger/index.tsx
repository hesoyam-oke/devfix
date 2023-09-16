import React, { useState, useEffect, useRef } from 'react';
import * as ReactDOM from 'react-dom';
import './index.css'
import { useNuiEvent } from "../../../../../hooks/useNuiEvent";
import { useExitListener } from "../../../../../hooks/useExitListener";
import { fetchNui } from "../../../../../utils/fetchNui";
import { isEnvBrowser, noop } from '../../../../../utils/misc';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Button, Checkbox, FormControl, List, ListItemText, ListItem, IconButton, FormControlLabel, FormGroup, Slider, FormHelperText, Grid, Tooltip, Stack, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import useStyles from './index.styles';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const PingerApp: React.FC = () => {
  const classes = useStyles();

  
  return (
    <>
      <div style={{zIndex: 500}} className='erpinger-container'>
        <div className={classes.erpingerHeader}>
          <Typography variant='h6' style={{ color: '#fff', wordBreak: 'break-word', textAlign: 'center', position: 'relative', top: '15%' }} gutterBottom>
            eRPinger {/* 🍆 eRPinger 🍑 */}
          </Typography>
        </div>
        <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <TextField
            label="Paypal ID"
            id="input-with-icon-textfield"
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
              startAdornment: <InputAdornment position="start"><i className='fas fa-id-card'></i></InputAdornment>,
            }}
            variant="standard"
          />
        </div>
        <div style={{
          position: 'absolute',
          top: '28%',
          left: '48.2%',
          marginTop:'15px',
          transform: 'translate(-50%, -50%)',
        }}>
          <Button color='info' size='medium' sx={{width: '107.92%', marginTop:'15px'}} startIcon={<i className='fas fa-map-pin'></i>} variant="contained">
            Send Ping
          </Button>
          <Button color='info' size='medium' sx={{width: '107.92%', marginTop:'15px'}} startIcon={<i className='fas fa-user-secret'></i>} variant="contained">
            Anon Ping
          </Button>
        </div>
      </div>
    </>
  );
}

export default PingerApp;