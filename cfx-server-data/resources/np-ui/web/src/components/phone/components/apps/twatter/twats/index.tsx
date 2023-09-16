import React, { useState, useEffect, useRef } from 'react';
import * as ReactDOM from 'react-dom';
import './index.css'
import { useNuiEvent } from "../../../../../../hooks/useNuiEvent";
import { useExitListener } from "../../../../../../hooks/useExitListener";
import { fetchNui } from "../../../../../../utils/fetchNui";
import { isEnvBrowser, noop } from '../../../../../../utils/misc';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Button, Checkbox, FormControl, Popper, List, ListItemText, Divider, ListItem, IconButton, FormControlLabel, FormGroup, Slider, FormHelperText, Grid, Tooltip, Stack, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import useStyles from './index.styles';
import { Checkmark } from 'react-checkmark'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

type TwatProps = {
  sender: any;
  message: any;
  date: any
}

function Twat({sender, message, date}: TwatProps) {

  const classes = useStyles();

  const [ShowImg, setShowImg] = useState(false);
  const [Sm, SY] = useState(false);

  var Sz = message.match(
    /\b(http|https)?(:\/\/)?(\S*)\.(\w{2,4})(.*)/g
    ),
    SF = message.split(Sz[0])[0],
    SX = '\n\n Images Attached: ' + Sz[0].split(' ').length

  return (
    <>
    
    <Typography style={{color: '#fff', wordBreak: 'break-word'}} variant="body1" gutterBottom>@{sender}</Typography>
    <Typography style={{color: '#fff', wordBreak: 'break-word', marginBottom: '0.25em'}} variant="body2" gutterBottom>{SF}</Typography>
    <div onClick={function(){
      setShowImg(!ShowImg)
    }} style={{marginBottom: '5%'}} className='component-image-container'>
      <Typography style={{color: '#fff', wordBreak: 'break-word'}} variant="body2" gutterBottom>{SX}</Typography>
      <div style={{top:'0'}} className={ShowImg ? 'container' : 'container container-max-height'}>
        <div style={{display: ShowImg ? 'none' : ''}} className='blocker'>
          <i style={{color: 'black'}} className='fas fa-eye fa-w-18 fa-fw fa-3x'></i>
          <Typography style={{color: '#fff', wordBreak: 'break-word'}} variant="body1" gutterBottom>Click to View</Typography>
          <Typography style={{color: '#fff', textAlign: 'center'}} variant="body2" gutterBottom>Only reveal images from those you know are not total pricks</Typography>
        </div>
        <div onMouseEnter={function(){ 
          ShowImg && SY(true)
        }} onMouseLeave={function(){
          SY(false)
        }} style={{
            backgroundImage: ShowImg ? 'url('.concat(Sz[0].split(' '), ')') : ''
          }} className={ShowImg ? 'image' : ''}>
          
        </div>
        <div className='spacer'></div>
      </div>

      <Popper open={Sm} style={{
						top: '49%',
						left: '42%',
      }} placement='bottom-end' disablePortal modifiers={[
        {
          name: 'flip',
          enabled: false,
          options: {
          altBoundary: false,
          rootBoundary: 'document',
          padding: 8,
          },
        },
        {
          name: 'preventOverflow',
          enabled: false,
          options: {
          altAxis: false,
          altBoundary: true,
          tether: false,
          rootBoundary: 'document',
          padding: 8,
          },
        },
      ]}>
        <div>
          <img style={{
            maxHeight: '600px',
            maxWidth: '800px'
          }} src={Sz[0].split(' ')} alt="useful" />
        </div>
      </Popper>
    </div>
    </>
  );
}

export default Twat;