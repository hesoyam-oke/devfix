import React, { useState, useEffect, useRef } from 'react';
import * as ReactDOM from 'react-dom';
import './index.css'
import { useNuiEvent } from "../../../../../../hooks/useNuiEvent";
import { useExitListener } from "../../../../../../hooks/useExitListener";
import { fetchNui } from "../../../../../../utils/fetchNui";
import { isEnvBrowser, noop } from '../../../../../../utils/misc';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Button, Checkbox, FormControl, List, ListItemText, Box, Collapse, Divider, ListItem, IconButton, FormControlLabel, FormGroup, Slider, FormHelperText, Grid, Tooltip, Stack, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import useStyles from './index.styles';
// import YP from './YellowPages';
import { Checkmark } from 'react-checkmark'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Moment from 'react-moment';
  
type Car = {
  vin: any;
  plate: any;
  type: any;
  model: any;
  state: any;
  damage: any;
  garage: any;
  location: any;
  spawnable: any;
}
  
function CarComponent({ vin, plate, type, model, state, damage, garage, location, spawnable }: Car) {

  const [expanded, setExpanded] = useState(false);
  const [sellDialogOpen, setSellDialogOpen] = useState(false);
  
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  
  const handleSellClick = () => {
    setSellDialogOpen(true);
  };
  
  const handleSellDialogClose = () => {
    setSellDialogOpen(false);
  };
  
  const handleTrackClick = () => {
    fetchNui('at-ui:carActionTrack', {
      car: { location: location },
    });
  };
  
  const handleSpawnClick = () => {
    fetchNui('at-ui:carActionSpawn', {
      car: {
        vin: vin,
        plate: plate,
        location: location,
        model: model,
      },
    });
  };
  
  const damageObj = damage;
  const engineDamage = (damageObj.engine / 1000) * 100;
  const bodyDamage = (damageObj.body / 1000) * 100;
  
  return (
    <>
      <div className="component-paper cursor-pointer">
    <div className="main-container" onClick={handleExpandClick}>
      <div className="image">
        <i className={'fas fa-'+type+' fa-w-16 fa-fw fa-3x'} />
      </div>
      <div className="details">
        <div className="title">
          <Typography
            style={{ color: '#fff', wordBreak: 'break-word' }}
            variant="body2"
            gutterBottom
          >
            {plate}
          </Typography>
        </div>
        <div className="description">
          <div className="flex-row">
            <Typography
              style={{ color: '#fff', wordBreak: 'break-word' }}
              variant="body2"
              gutterBottom
            >
              {model}
            </Typography>
          </div>
        </div>
      </div>
      <div className="actions" />
      <div className="image">
        <Typography
          style={{ color: '#fff', wordBreak: 'break-word' }}
          variant="body2"
          gutterBottom
        >
          {state}
        </Typography>
      </div>
    </div>
  
  <Collapse in={expanded} timeout="auto" unmountOnExit>
      <Grid sx={{ width: '85%', marginLeft: '7.5%', marginBottom: '1.5%', }} item>
        <TextField
          id="input-with-icon-textfield"
          variant="standard"
          value={garage}
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
                  'darkgray !important',
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
            readOnly: true,
            startAdornment: (
              <InputAdornment position="start"><i style={{color:'white'}} className='fas fa-map-marker-alt'></i></InputAdornment>
            ),
          }}
        />
    </Grid>
    <Grid sx={{ width: '85%', marginLeft: '7.5%', marginBottom: '1.5%', }} item>
      <TextField
        id="input-with-icon-textfield"
        variant="standard"
        value={plate}
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
                'darkgray !important',
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
          readOnly: true,
          startAdornment: (
            <InputAdornment position="start"><i style={{color:'white'}} className='fas fa-closed-captioning'></i></InputAdornment>
          ),
        }}
      />
    </Grid>
    <Grid sx={{ width: '85%', marginLeft: '7.5%', marginBottom: '1.5%', }} item>
      <TextField
        id="input-with-icon-textfield"
        variant="standard"
        value={`${engineDamage}%`}
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
                'darkgray !important',
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
          readOnly: true,
          startAdornment: (
            <InputAdornment position="start"><i style={{color:'white'}} className='fas fa-oil-can'></i></InputAdornment>
          )
        }}
      />
    </Grid>
    <Grid sx={{ width: '85%', marginLeft: '7.5%', marginBottom: '1.5%', }} item>
      <TextField
        id="input-with-icon-textfield"
        variant="standard"
        value={`${bodyDamage}%`}
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
                'darkgray !important',
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
          readOnly: true,
          startAdornment: (
            <InputAdornment position="start"><i style={{color:'white'}} className='fas fa-car-crash'></i></InputAdornment>
          ),
        }}
      />
    </Grid>
        <div style={{
						  display: 'flex',
						  justifyContent: 'center',
						  marginTop: '1%',
						}} className='buttons'>
              <Box display="flex" justifyContent="center" marginTop={1}>
                <Grid container spacing={2} direction="row">
                  <Grid item>
                    <Button
                      id={plate}
                      size="small"
                      color="primary"
                      variant="contained"
                      onClick={handleTrackClick}
                    >
                      Track
                    </Button>
                  </Grid>
                  <Grid item style={{ display: spawnable ? '' : 'none' }}>
                    <Button
                      id={plate}
                      size="small"
                      color="primary"
                      variant="contained"
                      onClick={handleSpawnClick}
                    >
                      Spawn
                    </Button>
                  </Grid>
                  <Grid item style={{ display: 'Out' === state ? '' : 'none' }}>
                    <Button
                      id={plate}
                      size="small"
                      color="error"
                      variant="contained"
                      onClick={handleSellClick}
                    >
                      Sell
                    </Button>
                  </Grid>
                </Grid>
              </Box>

        </div>
    </Collapse>
    </div>
    </>
  );
}

export default CarComponent;