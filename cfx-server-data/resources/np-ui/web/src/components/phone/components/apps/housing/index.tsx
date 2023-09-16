import React, { useState, useEffect, useRef } from 'react';
import * as ReactDOM from 'react-dom';
import './index.css'
import { useNuiEvent } from "../../../../../hooks/useNuiEvent";
import { useExitListener } from "../../../../../hooks/useExitListener";
import { fetchNui } from "../../../../../utils/fetchNui";
import { isEnvBrowser, noop } from '../../../../../utils/misc';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Tabs, Tab, Button, Divider, FormControl, List, ListItemText, ListItem, IconButton, FormControlLabel, FormGroup, Slider, FormHelperText, Grid, Tooltip, Stack, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Checkmark } from 'react-checkmark'
import useStyles from './index.styles';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const HousingApp: React.FC = () => {
  const classes = useStyles();
  const [showNothingFoundHousingModel, setShowNothingFoundHousingModel]: any = useState(false)
  const [showFoundHousingModel, setShowFoundHousingModel]: any = useState(false)
  const [showHousingLoader, setshowHousingLoader]: any = useState(false)
  const [showAddContactSuccess, setshowHousingSuccess]: any = useState(false)
  const [NothingFoundModelMessage, setNothingFoundModelMessage]: any = useState('')
  const [tab, setTab]: any = useState(0)
  const [inEditMod, setInEditMod]: any = useState(false)
  const [loaded, setLoaded]: any = useState(false)
  const [currentApartment, setCurrentApartment]: any = useState({})
  const [hover, setHover]: any = useState('')
  const [properties, setProperties]: any = useState([])
  const [foundData, setFoundData]: any = useState({
      housingName:'',
      housingCat:'',
      housingPrice:0,
      isOwned:false,
  })
  const [editData, setEditData]: any = useState({
      garage:true,
      stash:true,
      backdoor:true,
      wardrobe:true,
      furniture:true,
  })
  const [available, setAvailable]: any = useState([
    {
      id: 1,
      price: 1500,
      name:'Tire 3 Apartment'
    }
  ])
  const [ownedProperties, setOwnedProperties]: any = useState([
    {
      property_id: 1,
      propertyname: 'Test',
      category:'housing'
    }
  ])
  const [accessProperties, setAccessProperties]: any = useState([
    {
      property_id: 1,
      propertyname: 'Test',
      category:'housing'
    }
  ])
  if(!loaded){
    setLoaded(true)
    fetchNui('np-ui:getCurrentApartment', {}).then(function(data){
      setCurrentApartment(data.data)
    })
    fetchNui('np-ui:getProperties', {}).then(function(data){
      setProperties(data.data)
    })
  }

  var museenter=function(event){setHover(event.currentTarget.id)}
  var museleave=function(){setHover('')}
  return (
    <>
      <div style={{zIndex: 500}} className='app-dvex-container'>
        <div style={{display: showNothingFoundHousingModel ? '' : 'none'}} className={classes.housingNothingFoundModalContainer}>
          <div className={classes.housingNothingFoundModalInnerContainer}>
            <div style={{display: showHousingLoader ? '' : 'none'}} className='spinner-wrapper'>
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
            <div style={{display: showAddContactSuccess ? '' : 'none'}} className='spinner-wrapper'>
              <Checkmark size='56px' color='#009688' />
            </div>

            <div className='component-simple-form'>
              <div style={{ justifyContent: 'center', marginBottom: '10px' }}>
                  <i style={{color: '#ffa726'}} className='fas fa-exclamation fa-2x'></i>
              </div>
              <div style={{justifyContent: 'center'}}>
                <Typography style={{
                    color: '#fff',
                    wordBreak: 'break-word',
                  }} variant='body2' gutterBottom>No property found</Typography>
              </div>
              <div style={{justifyContent: 'center'}} className='buttons'>
                <div>
                  <Button onClick={function(){
                    setShowNothingFoundHousingModel(false) 
                    setshowHousingLoader(false) 
                    setshowHousingSuccess(false) 
                  }} size='small' color='success' variant="contained">Okay</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{display: showFoundHousingModel ? '' : 'none'}} className={classes.housingFoundModalContainer}>
          <div className={classes.housingFoundModalInnerContainer}>
            <div style={{display: showHousingLoader ? '' : 'none'}} className='spinner-wrapper'>
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
            <div style={{display: showAddContactSuccess ? '' : 'none'}} className='spinner-wrapper'>
              <Checkmark size='56px' color='#009688' />
            </div>

            <div className='component-simple-form'>
              <div style={{justifyContent: 'center'}}>
                <Typography style={{color: '#fff',wordBreak: 'break-word'}} variant='body2' gutterBottom>{'Name: ' + foundData.housingName}</Typography>
              </div>
              <div style={{justifyContent: 'center'}}>
                <Typography style={{color: '#fff',wordBreak: 'break-word'}} variant='body2' gutterBottom>{'Category: ' + foundData.housingCat}</Typography>
              </div>
              <div style={{justifyContent: 'center'}}>
                <Typography style={{color: '#fff',wordBreak: 'break-word'}} variant='body2' gutterBottom>{'Price: ' + foundData.housingPrice.toLocaleString('en-Us', {
									  style: 'currency',
									  currency: 'USD',
									})}</Typography>
              </div>
              <div style={{justifyContent: 'center'}} className='buttons'>
                <div style={{marginRight:'20px'}}>
                  <Button onClick={function(){
                    setShowFoundHousingModel(false) 
                    setshowHousingLoader(true) 
                    setshowHousingSuccess(false) 
                    fetchNui('np-ui:housingCurrentLocationPurchase', {name: foundData.housingName}).then(function(data){
                      if(data.meta.ok){
                        setshowHousingLoader(true) 
                        setFoundData({
                          housingName:'',
                          housingCat:'',
                          housingPrice:0,
                          isOwned:false,
                        })
                      } else {
                        setShowFoundHousingModel(false) 
                        setshowHousingLoader(false) 
                        setshowHousingSuccess(false)
                        setNothingFoundModelMessage(data.data)
                        setShowNothingFoundHousingModel(true)
                        setFoundData({
                          housingName:'',
                          housingCat:'',
                          housingPrice:0,
                          isOwned:false,
                        })
                      }
                    })
                  }} size='small' color='success' variant="contained">Purchase</Button>
                </div>
                <div>
                  <Button onClick={function(){
                    setShowFoundHousingModel(false) 
                    setshowHousingLoader(false) 
                    setshowHousingSuccess(false) 
                  }} size='small' color='warning' variant="contained">Cancel</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.housingOuterContainer}>
          <div className={classes.housingInnerContainer}>
            <div className='housing-container'>
              <div className={classes.housingSearch}>
                <div className={classes.housingSearchWrapper}>
                  <Tabs centered value={tab} onChange={function(e,tab){setTab(tab)}} variant='fullWidth' aria-label="icon tabs example">
                    <Tab icon={<i className='fas fa-house-user fa-lg' />} aria-label="apartments" />
                    <Tab icon={<i className='fas fa-building fa-lg' />} aria-label="properties" />
                  </Tabs>
                </div>
              </div>
              <div className={classes.housingIcon}>
                <div className={classes.housingIconWrapper}></div>
              </div>
              <div style={{height: '17.4%', display: 0 === tab ? '' : 'none',}} className={classes.housingUpgrades}>
                <Typography variant='body1' style={{color: '#fff', wordBreak: 'break-word'}} gutterBottom>
                  Current
                </Typography>
                <div className='component-paper cursor-pointer'>
                  <div className='main-container'>
                    <div className='image'><i className='fas fa-house-user fa-w-16 fa-fw fa-3x'></i></div>
                    <div className='details'>
                      <div className='title'>
                        <Typography variant='body2' style={{color: '#fff', wordBreak: 'break-word'}} gutterBottom>
                          {'Room: '+currentApartment.roomNumber}
                        </Typography>
                      </div>
                      <div className='description'>
                        <Typography variant='body2' style={{color: '#fff', wordBreak: 'break-word'}} gutterBottom>
                          {currentApartment.streetName}
                        </Typography>
                      </div>
                    </div>
                    <div className='actions'></div>
                  </div>
                </div>
              </div>
              <div style={{display: 0 === tab ? '' : 'none'}} className={classes.housingUpgrades}>
                <Typography variant='body1' style={{color: '#fff', wordBreak: 'break-word'}} gutterBottom>
                  Available
                </Typography>
                {available && available.length ? available.map(function(data){
                  return (
                    <div id={data.id} onMouseEnter={museenter} onMouseLeave={museleave} className='component-paper cursor-pointer'>
                      <div className='main-container'>
                        <div className='image'><i className='fas fa-home fa-w-16 fa-fw fa-3x'></i></div>
                        <div className='details'>
                          <div className='title'>
                            <Typography variant='body2' style={{color: '#fff', wordBreak: 'break-word'}} gutterBottom>
                              {data.price.toLocaleString('en-Us', {style: 'currency', currency: 'USD'})}
                            </Typography>
                          </div>
                          <div className='description'>
                            <Typography variant='body2' style={{color: '#fff', wordBreak: 'break-word'}} gutterBottom>
                              {data.name}
                            </Typography>
                          </div>
                        </div>
                        <div className={hover.toString() === data.id.toString() ? 'actions actions-show' : 'actions'}>
                          <Tooltip title='Upgrade' placement='top' arrow>
                            <div><i id={data.id} className='fas fa-dollar-sign fa-w-16 fa-fw fa-lg'></i></div>
                          </Tooltip>
                        </div>
                      </div>
                    </div>
                  );
                }) : <></>}
              </div>
              <div style={{display: 1 === tab ? '' : 'none'}} className={classes.housingButtons}>
                <Button style={{display: !inEditMod ? '' : 'none'}} color='success' size='small' variant="contained" onClick={function(){
                  fetchNui('np-ui:housingCheckCurrentLocation', {}).then(function(data){
                    if(data.meta.ok && !data.data.isOwned){
                      setFoundData(data.data)
                      setShowFoundHousingModel(true)
                    } else {
                      if(data.data.isOwned){
                        setNothingFoundModelMessage('Already Owned')
                      }else{
                        setNothingFoundModelMessage(data.data)

                      }
                      setShowFoundHousingModel(false)
                      setFoundData({
                        housingName:'',
                        housingCat:'',
                        housingPrice:0,
                        isOwned:false,
                      })
                      setShowNothingFoundHousingModel(true)
                    }
                  })
                }}>
                  View Current Location
                </Button>
                <Button style={{display: inEditMod ? '' : 'none'}} color='success' size='small' variant="contained">
                  Leave Edit Mode
                </Button>

              </div>
              <div style={{display: 1 === tab && inEditMod ? '' : 'none', marginBottom:'90px', width: '89%'}}>
                <Divider variant='middle' sx={{borderColor: 'rgba(255, 255, 255, 255)'}} />
              </div>
              <div style={{display: 1 === tab && inEditMod ? 'flex' : 'none', width: '100%', marginBottom:'90px', flexDirection: 'column'}}>
                <div style={{display: editData.garage ? 'flex' : 'none', justifyContent: 'center', marginBottom: '1vh'}}>
                  <Button onClick={function(){fetchNui('np-ui:housingEditPropertyConfig', {type:'garage'})}} style={{display: inEditMod ? '' : 'none'}} color='success' size='small' variant="contained">
                    Place Garage Here
                  </Button>
                </div>
                <div style={{display: editData.stash ? 'flex' : 'none', justifyContent: 'center', marginBottom: '1vh'}}>
                  <Button onClick={function(){fetchNui('np-ui:housingEditPropertyConfig', {type:'inventory'})}} style={{display: inEditMod ? '' : 'none'}} color='success' size='small' variant="contained">
                    Place Stash Here
                  </Button>
                </div>
                <div style={{display: editData.backdoor ? 'flex' : 'none', justifyContent: 'center', marginBottom: '1vh'}}>
                  <Button onClick={function(){fetchNui('np-ui:housingEditPropertyConfig', {type:'backdoor'})}} style={{display: inEditMod ? '' : 'none'}} color='success' size='small' variant="contained">
                    Place Backdoor Here
                  </Button>
                </div>
                <div style={{display: editData.wardrobe ? 'flex' : 'none', justifyContent: 'center', marginBottom: '1vh'}}>
                  <Button onClick={function(){fetchNui('np-ui:housingEditPropertyConfig', {type:'char-changer'})}} style={{display: inEditMod ? '' : 'none'}} color='success' size='small' variant="contained">
                    Place Wardrobe Here
                  </Button>
                </div>
                <div style={{display: editData.furniture ? 'flex' : 'none', justifyContent: 'center', marginBottom: '1vh'}}>
                  <Button onClick={function(){fetchNui('np-ui:housingEditPropertyConfig', {type:'furniture'})}} style={{display: inEditMod ? '' : 'none'}} color='success' size='small' variant="contained">
                    Open Furniture
                  </Button>
                </div>
              </div>
              <div style={{display: 1 === tab && !inEditMod ? '' : 'none'}} className={classes.housingUpgrades}>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                  <Button color='success' size='small' variant="contained">
                    <i style={{color: '#000'}} className='fas fa-edit'></i>
                  </Button>
                </div>
                <Typography variant='body1' style={{display: properties.length > 0 && !inEditMod ? '' : 'none', color: '#fff', wordBreak: 'break-word', marginTop: '15px'}} gutterBottom>
                  Owned
                </Typography>
                {properties && properties.length > 0 ? properties.map(function(data){
                  if(data.is_owner === true){
                    return (
                      <div id={data.id} onMouseEnter={museenter} onMouseLeave={museleave} className='component-paper cursor-pointer'>
                        <div className='main-container'>
                          <div className='image'>
                            <i className={'warehouse' === data.cat ? 'fas fa-warehouse fa-w-16 fa-fw fa-3x' : 'fas fa-home fa-w-16 fa-fw fa-3x'}></i>
                          </div>
                          <div className='details'>
                            <div className='title'>
                              <Typography variant='body2' style={{color: '#fff', wordBreak: 'break-word'}} gutterBottom>
                                {data.name}
                              </Typography>
                            </div>
                            <div className='description'>
                              <div className='flex-row'>
                                <Typography variant='body2' style={{color: '#fff', wordBreak: 'break-word'}} gutterBottom>
                                  {'warehouse' === data.cat ? 'warehouse' : 'housing'}
                                </Typography>
                              </div>
                            </div>
                          </div>
                          <div className={hover.toString() === data.id.toString() ? 'actions actions-show' : 'actions'}>
                            <Tooltip title='Set GPS' placement='top' arrow>
                              <div><i id={data.id} className='fas fa-map-marked fa-w-16 fa-fw fa-lg'></i></div>
                            </Tooltip>
                            <Tooltip title={data.is_locked ? 'Unlock' : 'Lock'} placement='top' arrow>
                              <div><i id={data.id} className={data.is_locked ? 'fas fa-lock fa-w-16 fa-fw fa-lg' : 'fas fa-lock-open fa-w-16 fa-fw fa-lg'}></i></div>
                            </Tooltip>
                            <Tooltip title='Edit Property' placement='top' arrow>
                              <div><i id={data.id} className='fas fa-edit fa-w-16 fa-fw fa-lg'></i></div>
                            </Tooltip>
                            <Tooltip title='Keys' placement='top' arrow>
                              <div><i id={data.id} className='fas fa-key fa-w-16 fa-fw fa-lg'></i></div>
                            </Tooltip>
                          </div>
                        </div>
                      </div>
                    );
                  }
                }) : <></>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HousingApp;