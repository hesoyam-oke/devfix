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
import { Checkmark } from 'react-checkmark'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const DebtApp: React.FC = () => {
  const classes = useStyles();
  const [showAddDebtModel, setShowAddDebtModel]: any = useState(false);
  const [showAddDebtLoader, setshowAddDebtLoader]: any = useState(false);
  const [showAddDebtSuccess, setshowAddDebtSuccess]: any = useState(false);
  const [hideinputs, setHideinputs]: any = useState(false);
  const [number, setnumber]: any = useState('');
  const [debt, setdebt]: any = useState();
  const [showError, setshowError]: any = useState(false);
  const [ErrorDebt, setErrorDebt]: any = useState('');



  return (
    <>
      <div style={{zIndex: 500}} className='email-container'>
      <div style={{display: showAddDebtModel ? '' : 'none'}} className={classes.debtModalContainer}>
        <div className={classes.debtModalInnerContainer}>
          <div style={{display: showAddDebtLoader ? '' : 'none'}} className='spinner-wrapper'>
            <div className='lds-spinner'>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <div style={{display: showAddDebtSuccess ? '' : 'none'}} className='spinner-wrapper'>
            <Checkmark size='56px' color='#009688' />
          </div>

          <div style={{display: hideinputs ? 'none' : ''}} className='component-simple-form'>
            <div style={{ display: showError ? '' : 'none', justifyContent: 'center', marginBottom: '10px' }}>
                  <i style={{color: '#ffa726'}} className='fas fa-exclamation fa-2x'></i>
            </div>
            <div style={{display: showError ? '' : 'none', justifyContent: 'center'}}>
              <Typography style={{
									color: '#fff',
									wordBreak: 'break-word',
								  }} variant='body2' gutterBottom>{ErrorDebt}</Typography>
            </div>
            <div style={{display: showError ? '' : 'none', justifyContent: 'center'}} className='buttons'>
            <div>
            <Button onClick={function(){
                setShowAddDebtModel(false) 
                setshowAddDebtLoader(false) 
                setshowAddDebtSuccess(false) 
                setshowError(false)
                setErrorDebt('')
                setHideinputs(false)
                }} size='small' color='success' variant="contained">Okay</Button>
            </div>
            </div>


            <div style={{display: showError ? 'none' : ''}}>
            <FormControl fullWidth sx={{ width: '100%' }} variant="standard">
              <TextField
                label='Loan ID'
                id="standard-start-adornment"
                type='text'
                onChange={event =>
                  setnumber(event.target.value)
                }
                value={number}
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
                variant="standard"
                InputProps={{
                  startAdornment: <InputAdornment position="start"><i className="fas fa-fingerprint"></i></InputAdornment>,
                }}
              />   
            </FormControl>
            </div>
            <div style={{display: showError ? 'none' : ''}} className='buttons'>
            <div>
              <Button onClick={function(){
                setShowAddDebtModel(false) 
                setshowAddDebtLoader(false) 
                setshowAddDebtSuccess(false) 
                setHideinputs(false)
                }} size='small' color='warning'  variant="contained">Cancel</Button>
          </div>
      
          <div>
              <Button onClick={function(){
                setshowAddDebtLoader(true) 
                setHideinputs(true)
                fetchNui('np-ui:smsSend', {
                  number: number,
                  debt: debt,
                }).then(function (result) {
                  setshowAddDebtLoader(false)
                  if(result.meta.ok){
                    setshowAddDebtSuccess(true)
                    setTimeout(() => {
                      setShowAddDebtModel(false) 
                      setshowAddDebtLoader(false) 
                      setshowAddDebtSuccess(false) 
                      setHideinputs(false)      
                    }, 1500);
                  }else{
                    setshowAddDebtSuccess(false)
                    setshowAddDebtLoader(false)
                    setshowError(true)
                    setErrorDebt(result.meta.debt)
                  }
                })
              }} size='small' color='success' variant="contained">Submit</Button>
          </div>

            </div>
          </div>
        </div>
      </div>
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
        <div className={classes.appIcon}>
          <Tooltip title='Pay Other Loan' placement='left' arrow>
            <div
              onClick={function () {
                  setShowAddDebtModel(true) 
                  setshowAddDebtLoader(false) 
                  setshowAddDebtSuccess(false) 
                  setHideinputs(false)
              }}
              style={{
                marginRight:'3px',
                fontSize: '1.2em',
              }}
            >
              <i className={`fas fa-donate fa-w-16 fa-fw fa-lg`}></i>
            </div>
          </Tooltip>
        </div>

        <div className={classes.debtWrapper}>
          <div className={classes.debtFees}>
            <Typography style={{ color: '#fff', wordBreak: 'break-word', marginTop: '5px' }} variant='body1' gutterBottom>Maintenance Fees</Typography>
            <div className='component-paper cursor-pointer'>
              <div className='main-container'>
                <div className='image'>
                  <i className='fas fa-car fa-w-16 fa-fw fa-3x'></i>
                </div>
                <div className='details'>
                  <div className='title'>
                    <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant='body2' gutterBottom>$670,000.00</Typography>
                  </div>
                  <div className='description'>
                    <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant='body2' gutterBottom>Vehicles</Typography>
                  </div>
                </div>
                <div className='actions'></div>
              </div>
            </div>
            <div className='component-paper cursor-pointer'>
              <div className='main-container'>
                <div className='image'>
                  <i className='fas fa-car fa-w-16 fa-fw fa-3x'></i>
                </div>
                <div className='details'>
                  <div className='title'>
                    <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant='body2' gutterBottom>$670,000.00</Typography>
                  </div>
                  <div className='description'>
                    <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant='body2' gutterBottom>Vehicles</Typography>
                  </div>
                </div>
                <div className='actions'></div>
              </div>
            </div>
            <div className='component-paper cursor-pointer'>
              <div className='main-container'>
                <div className='image'>
                  <i className='fas fa-car fa-w-16 fa-fw fa-3x'></i>
                </div>
                <div className='details'>
                  <div className='title'>
                    <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant='body2' gutterBottom>$670,000.00</Typography>
                  </div>
                  <div className='description'>
                    <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant='body2' gutterBottom>Vehicles</Typography>
                  </div>
                </div>
                <div className='actions'></div>
              </div>
            </div>
            <div className='component-paper cursor-pointer'>
              <div className='main-container'>
                <div className='image'>
                  <i className='fas fa-car fa-w-16 fa-fw fa-3x'></i>
                </div>
                <div className='details'>
                  <div className='title'>
                    <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant='body2' gutterBottom>$670,000.00</Typography>
                  </div>
                  <div className='description'>
                    <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant='body2' gutterBottom>Vehicles</Typography>
                  </div>
                </div>
                <div className='actions'></div>
              </div>
            </div>
            <div className='component-paper cursor-pointer'>
              <div className='main-container'>
                <div className='image'>
                  <i className='fas fa-car fa-w-16 fa-fw fa-3x'></i>
                </div>
                <div className='details'>
                  <div className='title'>
                    <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant='body2' gutterBottom>$670,000.00</Typography>
                  </div>
                  <div className='description'>
                    <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant='body2' gutterBottom>Vehicles</Typography>
                  </div>
                </div>
                <div className='actions'></div>
              </div>
            </div>
            <div className='component-paper cursor-pointer'>
              <div className='main-container'>
                <div className='image'>
                  <i className='fas fa-car fa-w-16 fa-fw fa-3x'></i>
                </div>
                <div className='details'>
                  <div className='title'>
                    <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant='body2' gutterBottom>$670,000.00</Typography>
                  </div>
                  <div className='description'>
                    <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant='body2' gutterBottom>Vehicles</Typography>
                  </div>
                </div>
                <div className='actions'></div>
              </div>
            </div>
          </div>
          </div>
        <div className={classes.loansWrapper}>
          <div className={classes.debtLoans}>
            <Typography style={{ color: '#fff', wordBreak: 'break-word', marginTop: '5px' }} variant='body1' gutterBottom>Loans</Typography>
            <div className='component-paper cursor-pointer'>
              <div className='main-container'>
                <div className='image'>
                  <i className='fas fa-file-invoice-dollar fa-w-16 fa-fw fa-3x'></i>
                </div>
                <div className='details'>
                  <div className='title'>
                    <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant='body2' gutterBottom>Diamond Hand Credit</Typography>
                  </div>
                  <div className='description'>
                    <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant='body2' gutterBottom>$547,800.00</Typography>
                  </div>
                </div>
                <div className='actions'></div>
              </div>
            </div>
            <div className='component-paper cursor-pointer'>
              <div className='main-container'>
                <div className='image'>
                  <i className='fas fa-file-invoice-dollar fa-w-16 fa-fw fa-3x'></i>
                </div>
                <div className='details'>
                  <div className='title'>
                    <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant='body2' gutterBottom>Diamond Hand Credit</Typography>
                  </div>
                  <div className='description'>
                    <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant='body2' gutterBottom>$547,800.00</Typography>
                  </div>
                </div>
                <div className='actions'></div>
              </div>
            </div>
            <div className='component-paper cursor-pointer'>
              <div className='main-container'>
                <div className='image'>
                  <i className='fas fa-file-invoice-dollar fa-w-16 fa-fw fa-3x'></i>
                </div>
                <div className='details'>
                  <div className='title'>
                    <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant='body2' gutterBottom>Diamond Hand Credit</Typography>
                  </div>
                  <div className='description'>
                    <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant='body2' gutterBottom>$547,800.00</Typography>
                  </div>
                </div>
                <div className='actions'></div>
              </div>
            </div>
            <div className='component-paper cursor-pointer'>
              <div className='main-container'>
                <div className='image'>
                  <i className='fas fa-file-invoice-dollar fa-w-16 fa-fw fa-3x'></i>
                </div>
                <div className='details'>
                  <div className='title'>
                    <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant='body2' gutterBottom>Diamond Hand Credit</Typography>
                  </div>
                  <div className='description'>
                    <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant='body2' gutterBottom>$547,800.00</Typography>
                  </div>
                </div>
                <div className='actions'></div>
              </div>
            </div>
            <div className='component-paper cursor-pointer'>
              <div className='main-container'>
                <div className='image'>
                  <i className='fas fa-file-invoice-dollar fa-w-16 fa-fw fa-3x'></i>
                </div>
                <div className='details'>
                  <div className='title'>
                    <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant='body2' gutterBottom>Diamond Hand Credit</Typography>
                  </div>
                  <div className='description'>
                    <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant='body2' gutterBottom>$547,800.00</Typography>
                  </div>
                </div>
                <div className='actions'></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DebtApp;