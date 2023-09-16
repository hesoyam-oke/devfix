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

const DetailsApp: React.FC = () => {
  const classes = useStyles();

  
  return (
    <>
      <div style={{zIndex: 500}} className='app-dvex-container'>
        <div className={classes.documentsOuterContainer}>
          <div className='documents-container'>
            <div className={classes.documentsSearch}>
              <div className={classes.documentsSearchWrapper}>
                <div className='input-wrapper'>
                  <FormControl fullWidth sx={{width: '100%'}}>
                    <TextField
                      label="Search"
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
                        startAdornment: <InputAdornment position="start"><i className="fas fa-search"></i></InputAdornment>,
                      }}
                      variant="standard"
                    />
                  </FormControl>
                </div>
              </div>
            </div>
            <div className={classes.documentsIcon}>
              <div className={classes.documentsIconWrapper}>
                <Tooltip sx={{backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px'}} arrow placement="left" title="Create Document">
                  <i style={{ fontSize: '1.2em' }} className='fas fa-edit fa-w-16 fa-fw fa-lg'></i>
                </Tooltip>
              </div>
            </div>
            <div className={classes.documentsSearch} style={{ paddingTop: '0px', paddingBottom: '0px', marginBottom: '140%' }}>
              <TextField sx={{
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
              }} select variant="standard" label='Type' defaultValue='notes'>
                  <MenuItem value="notes">Notes</MenuItem>
                  <MenuItem value="licenses">Licenses</MenuItem>
                  <MenuItem value="documents">Documents</MenuItem>
                  <MenuItem value="vehicleregistration">Vehicle Registration</MenuItem>
                  <MenuItem value="housingdocuments">Housing Documents</MenuItem>
                  <MenuItem value="contracts">Contracts</MenuItem>
              </TextField>
            </div>
            <div className={classes.documentsDocs}>
              <div className='component-paper cursor-pointer'>
                <div className='main-container'>
                  <div className='details'>
                    <div className='title'>
                      <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>
                        Test Document
                      </Typography>
                    </div>
                  </div>
                  <div style={{ marginRight: '0px', marginTop: '0px' }} className='image'>
                    <i className='fas fa-edit fa-w-16 fa-fw fa-1x'></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailsApp;