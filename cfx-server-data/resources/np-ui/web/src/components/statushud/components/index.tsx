import React, { useState } from 'react';
import './index.css'
import { useNuiEvent } from "../../../hooks/useNuiEvent";
import { Typography } from '@mui/material';
import useStyles from './index.styles';
import {DveXAlert} from '../../main/components';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const StatusHud: React.FC = () => {
  const classes = useStyles();

  const [ShowStatusHud, setShowStatusHud]: any = useState(false)
  const [title, setTitle]: any = useState('')
  const [values, setValues]: any = useState([])


  useNuiEvent('uiMessage', function (data) {
    var dvexdata = data.data
    if('status-hud' === data.app) {    
      if(dvexdata.show == null){
        setTitle('')
        setValues([])
        setShowStatusHud(false)
        return <DveXAlert AlertText='Error occurred in app: Statushud - restarting...' AlertType='error' />
      }
  
      if(true === dvexdata.show) {
        setTitle('')
        setValues([])
        setShowStatusHud(true)
        if(dvexdata.title){setTitle(dvexdata.title)}
        if(dvexdata.values){setValues(dvexdata.values)}
      }else{
        setTitle('')
        setValues([])
        setShowStatusHud(false)
      }
    }
  })

  

  return (
    <>
      <div style={{display: ShowStatusHud ? '' : 'none'}} className={classes.statusHudOuterContainer}>
        <div className={classes.statusHudInnerContainer}>
          <div className={classes.statusHudLine}>
            {title && 
            <Typography style={{color: '#fff', wordBreak: 'break-word'}} variant={'h6'} gutterBottom={true}>
              {title}
            </Typography>}
          </div>
          <div className={classes.statusHudLine}>
            {values ?
            values.map(function(data){
              return (
                <>
                  <div className={classes.statusHudLine}>
                    <Typography style={{color: '#fff', wordBreak: 'break-word'}} variant={'body1'} gutterBottom={true}>
                      {data}
                    </Typography>
                  </div>
                </>
              );
            }) : <></>}
          </div>
        </div>
      </div>
    </>
  );
}

export default StatusHud;