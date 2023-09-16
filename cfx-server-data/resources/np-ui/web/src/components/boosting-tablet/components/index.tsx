import React, { useState } from 'react';
import './index.css'
import useStyles from './index.styles';
import { Button, FormControl, Tooltip, InputAdornment, MenuItem, TextField, Typography } from '@mui/material';
import { useNuiEvent } from "../../../hooks/useNuiEvent";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const BoostingTablet: React.FC = () => {
  const classes = useStyles();

  const [Show, setShow]: any = useState(false)



  return (
    <>
      {/* <div id='added-to-cart'></div>
      <div style={{position:'absolute', top:'50%', left:'50%'}}>
        <div id='screen' style={{position:'absolute', opacity: '1', pointerEvents: 'all'}} className={classes.laptopOuterContainer}>
          <div style={{backgroundImage: 'url(https://i.imgur.com/me8TVzX.png)'}} className={classes.laptopInnerContainer}>
            <div className={classes.laptopIconWrapper}>

            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default BoostingTablet;