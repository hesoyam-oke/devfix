import React, { useState } from 'react';
import './index.css'
import { useNuiEvent } from "../../../hooks/useNuiEvent";
import { Slide, Typography, Alert } from '@mui/material';
import useStyles from './index.styles';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const Interaction: React.FC = () => {
    const classes = useStyles();

    const [ShowInteraction, setShowInteraction]: any = useState(false)
    const [GetType, SetType]: any = useState('info')
    const [message, SetMessage]: any = useState('')



    useNuiEvent('uiMessage', (data) => {
      var dvexdata = data.data
      if ('interactions' === data.app) {
        if (true === dvexdata.show) {
          dvexdata.message = dvexdata.message.replace(/[\[']+/g, `<span class="interaction-shadow">[`);
          dvexdata.message = dvexdata.message.replace(/[\]']+/g, `]</span>`);

          SetMessage(dvexdata.message) 
          SetType(dvexdata.type)
          setShowInteraction(true)
        } else {
          if(false === dvexdata.show) {
            setShowInteraction(false) 
            SetMessage(dvexdata.message) 
            SetType(dvexdata.type)
          }
        }
      }
    })

    return (
        <>
          <div className={classes.wrapper}>
            <div className={classes.alert}>
              <Slide in={ShowInteraction} direction={'right'} timeout={600} mountOnEnter unmountOnExit>
                <Alert icon={false} className={GetType} variant="filled">
                  <Typography style={{color: '#fff', wordBreak: 'break-word'}} className="interaction-typography" variant="body1" gutterBottom dangerouslySetInnerHTML={{ __html: message }}> 
                  </Typography>
                </Alert>
              </Slide>
            </div>
          </div>
        </>
    );}

export default Interaction;