import { useState, useEffect } from 'react';
import './index.css'
import { IconButton, Alert } from '@mui/material';
import { useNuiEvent } from "../../../hooks/useNuiEvent";
import useStyles from './index.styles';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export function RestartAlert() {
  
  const classes = useStyles();

  const [ShowAlert, setShowAlert]: any = useState(false)
  const Text: any = 'Fully Restart UI..'
  const Type: any = 'info'


  useEffect(function(){
    if(true === ShowAlert){
      setTimeout(function(){
        setShowAlert(false)
      }, 5000)
    }
  })

  useNuiEvent('uiMessage', (data) => {
    var dvexdata = data.data
    if ('main' === data.app) {
      if ('np-nui' === data.source) {
        if ('restart' === data.action) {
          setShowAlert(true)
        }
      }
    }
  })




  return (
    <>
      <div style={{position: 'absolute', display: ShowAlert ? '' : 'none'}} className={classes.restartContainer}>
        <div className={classes.restartsContainer}>
          {Type !== 'error' ?
          <Alert sx={{boxShadow:'1px 1px 1px rgba(0, 0, 0, 0.644)'}} variant="filled" severity={Type} className={'info' === Type ? "info alert" : 'alert'}>
            {Text}
          </Alert>
          
          : <Alert
              variant="filled" 
              className="error alert"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setShowAlert(false);
                  }}
                >
                  <i className="fa-solid fa-xmark"></i>
                </IconButton>
              }
              sx={{ mb: 2, boxShadow:'1px 1px 1px rgba(0, 0, 0, 0.644)' }}
            >
              {Text}
            </Alert>}
          
        </div>
      </div>
    </>
  );
}

export function DveXAlert({AlertText, AlertType}: any) {

  const classes = useStyles();

  const [ShowAlert, setShowAlert]: any = useState(true)
  const Text: any = AlertText
  const Type: any = AlertType


  useEffect(function(){
    if(true === ShowAlert){
      setTimeout(function(){
        setShowAlert(false)
      }, 5000)
    }
  })






  return (
    <>
      <div style={{position: 'absolute', display: ShowAlert ? '' : 'none'}} className={classes.restartContainer}>
        <div className={classes.restartsContainer}>
          {Type !== 'error' ?
          <Alert sx={{boxShadow:'1px 1px 1px rgba(0, 0, 0, 0.644)'}} variant="filled" severity={Type} className={'info' === Type ? "info alert" : 'alert'}>
            {Text}
          </Alert>
          
          : <Alert
              variant="filled" 
              className="error alert"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setShowAlert(false);
                  }}
                >
                  <i className="fa-solid fa-xmark"></i>
                </IconButton>
              }
              sx={{ mb: 2, boxShadow:'1px 1px 1px rgba(0, 0, 0, 0.644)' }}
            >
              {Text}
            </Alert>}
          
        </div>
      </div>
    </>
  );
}