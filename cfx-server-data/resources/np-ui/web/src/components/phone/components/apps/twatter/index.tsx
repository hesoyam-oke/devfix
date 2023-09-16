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
import Twat from './twats';
import { Checkmark } from 'react-checkmark'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Moment from 'react-moment';

const TwatterApp: React.FC = () => {
  const classes = useStyles();
  const [showTwatModel, setShowTwatModel]: any = useState(false);
  const [showAddTwatLoader, setshowAddTwatLoader]: any = useState(false);
  const [showAddTwatSuccess, setshowAddTwatSuccess]: any = useState(false);
  const [hideinputs, setHideTwatinputs]: any = useState(false);
  const [number, setnumber]: any = useState('');
  const [twat, settwat]: any = useState('');
  const [showError, setshowError]: any = useState(false);
  const [ErrorTwat, setErrorTwat]: any = useState('');
  const [Tweets, setTweets]: any = useState([]);
  const [TweetsList, setTweetsList]: any = useState([])
  const [LoadeTwats, setLoadeTwats]: any = useState(false);

  const TwatRef = useRef(null);

useEffect(() => {
  if (TwatRef.current) {
    TwatRef.current.scrollTop = 0 - TwatRef.current.scrollHeight;
  }
}, [Tweets]);
  // useEffect(function(){
  //   fetchNui('np-ui:getCharacterDetails', {}).then(function (result) {
  //     setdata({
  //       cid: result.cid,
	// 			bankid: result.bankid,
	// 			phonenumber: result.phonenumber,
	// 			cash: result.cash,
	// 			bank: result.bank,
	// 			casino: result.casino,
	// 			licenses: result.licenses,
  //     })
  //   })
  // })

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.toLowerCase();
    if (inputValue !== '') {
      const filteredList = Tweets.filter((item) =>
        Object.values(item)
          .map((value) => value && value.toString().toLowerCase())
          .some((value) => value && value.includes(inputValue))
      );
      setTweets(filteredList);
    } else {
      setTweets(TweetsList);
    }
  };

  async function fetchData() {
    const result = await fetchNui('np-ui:getTwats', {});
    setTweets(result.data);
    setTweetsList(result.data);
  }
  if(!LoadeTwats){
    setLoadeTwats(true)
    fetchData()
  }
  
  return (
    <>
      <div style={{zIndex: 500}} className='twat-container'>
      <div style={{display: showTwatModel ? '' : 'none'}} className={classes.twatModalContainer}>
        <div className={classes.twatModalInnerContainer}>
          <div style={{display: showAddTwatLoader ? '' : 'none'}} className='spinner-wrapper'>
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
          <div style={{display: showAddTwatSuccess ? '' : 'none'}} className='spinner-wrapper'>
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
								  }} variant='body2' gutterBottom>{ErrorTwat}</Typography>
            </div>
            <div style={{display: showError ? '' : 'none', justifyContent: 'center'}} className='buttons'>
            <div>
            <Button onClick={function(){
                setShowTwatModel(false) 
                setshowAddTwatLoader(false) 
                setshowAddTwatSuccess(false) 
                setshowError(false)
                setErrorTwat('')
                setHideTwatinputs(false)
                }} size='small' color='success' variant="contained">Okay</Button>
            </div>
            </div>

            <div style={{display: showError ? 'none' : ''}}>
            <FormControl fullWidth sx={{  width: '100%' }} variant="standard">
              <TextField
                multiline
                maxRows='10'
                label='Twat'
                id="standard-start-adornment"
                onChange={event =>
                  settwat(event.target.value)
                }
                inputProps={{maxLength: 255}}
                helperText={twat.length+'/255'}
                value={twat}
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
              />   

            </FormControl>
            </div>

            <div style={{display: showError ? 'none' : ''}} className='buttons'>
            <div>
              <Button onClick={function(){
                setShowTwatModel(false) 
                setshowAddTwatLoader(false) 
                setshowAddTwatSuccess(false) 
                setHideTwatinputs(false)
                }} size='small' color='warning'  variant="contained">Cancel</Button>
          </div>
      
          <div>
              <Button onClick={async function(){
                const resultChar = await fetchNui('np-ui:getCharacter', {});

                setshowAddTwatLoader(true) 
                setHideTwatinputs(true)
                fetchNui('np-ui:twatSend', {
                  character: resultChar.data,
                  text: twat,
                }).then(function (result) {
                  setshowAddTwatLoader(false) 
                  if(result.meta.ok){
                    setshowAddTwatLoader(false)
                    setshowAddTwatSuccess(true)
                    setTimeout(() => {
                      setShowTwatModel(false) 
                      setshowAddTwatLoader(false) 
                      setshowAddTwatSuccess(false) 
                      setHideTwatinputs(false) 
                      setTweets(result.data)
                      setTweetsList(result.data)                         
                    }, 1500);
                  }else{
                    setshowAddTwatSuccess(false)
                    setshowAddTwatLoader(false)
                    setshowError(true)
                    setErrorTwat(result.meta.message)
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
            onChange={handleSearchChange}
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
        <Tooltip title='Twat' placement='left' arrow>
          <div
            onClick={function () {
                settwat('')
                setShowTwatModel(true) 
                setshowAddTwatLoader(false) 
                setshowAddTwatSuccess(false) 
                setHideTwatinputs(false)
            }}
            style={{
              fontSize: '1.5em',
            }}
          >
            <i className={`fab fa-twitter fa-w-16`}></i>
          </div>
        </Tooltip>
        </div>
        <div style={{right: '65px'}} className={classes.appIcon}>
        <Tooltip title='Purchase Twatter Blu' placement='left' arrow>
          <div
            onClick={function () {
                settwat('')
                setShowTwatModel(true) 
                setshowAddTwatLoader(false) 
                setshowAddTwatSuccess(false) 
                setHideTwatinputs(false)
            }}
            style={{
              fontSize: '1.5em',
            }}
          >
            <i className={`fas fa-comment-dollar`}></i>
          </div>
        </Tooltip>
      </div>
      <div className={classes.appList} ref={TwatRef}>
        {Tweets && Tweets.length > 0
          ? Tweets.map(function (data) {
              let sender = data.first_name+'_'+data.last_name
              return (
                <>
                  <div className={classes.twitterComponentContainer}>
                    {(data.text.indexOf('imgur.com') >= 0 ) ||
									  (data.text.indexOf('media.discordapp.net') >= 0) ||
									  (data.text.indexOf('discordapp.com') >= 0)
                    ? <Twat sender={sender} message={data.text} date={data.date}></Twat>
                    : <>
                    <Typography style={{color: '#fff', wordBreak: 'break-word'}} variant="body1" gutterBottom>@{sender}</Typography>
                    <Typography style={{color: '#fff', wordBreak: 'break-word', marginBottom: '0.25em'}} variant="body2" gutterBottom>{data.text}</Typography>
                  
                    </>}
                    <div style={{marginBottom:'20px'}}></div>
                    <div style={{
										  fontSize: '13px',
										  display: 'flex',
										  paddingBottom: '1vh',
										}}>
                      <Tooltip sx={{backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px'}} arrow placement="top" title="Reply">
                        <i onClick={function () {
                          setShowTwatModel(false) 
                          setshowAddTwatLoader(false) 
                          setshowAddTwatSuccess(false) 
                          setHideTwatinputs(false)      
												  settwat('')

												  settwat('@'+ sender)
												  setShowTwatModel(true)
											  }} className='fas fa-reply'></i>
                      </Tooltip>
                      <Tooltip sx={{backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px'}} arrow placement="top" title="Retwat">
                        <i onClick={function () {
                          setShowTwatModel(false) 
                          setshowAddTwatLoader(false) 
                          setshowAddTwatSuccess(false) 
                          setHideTwatinputs(false)      
												  settwat('')

                          let reTwatMsg = 'RT @'.concat(sender, ' ').concat(data.text)
												  settwat(reTwatMsg)
												  setShowTwatModel(true)
											  }} style={{ paddingLeft: '1vh' }} className='fas fa-retweet'></i>
                      </Tooltip>
                      <Tooltip sx={{backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px'}} arrow placement="top" title="Report">
                        <i style={{ paddingLeft: '1vh' }} className='fas fa-flag'></i>
                      </Tooltip>
                      <Typography style={{ color: '#fff', wordBreak: 'break-word', position: 'absolute', float: 'right', right: '5%', bottom: '1%' }} variant="body2" gutterBottom>
                        <Moment fromNow>{data.date}</Moment>
                      </Typography>
                    </div>
                  </div>
                </>
              )
            })
        : <div style={{ display:'flex', flexDirection: 'column', textAlign: 'center' }} className='flex-centered'>
            <i className="fas fa-frown fa-w-16 fa-fw fa-3x" style={{ color: '#fff', marginBottom: '32px' }}></i>
            <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="h6" gutterBottom>
              Nothing Here!
            </Typography>
          </div>}
      </div>
      
      </div>
    </>
  );
}

export default TwatterApp;