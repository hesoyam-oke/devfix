import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import { Typography, TextField, InputAdornment, Menu, MenuItem, MenuList, Tooltip } from '@mui/material';
import './index'
import useStyles from './index.styles';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ClassNames } from '@emotion/react';

function DashboardPage() {
  const classes = useStyles();
  const [warrns, setWarrns] = useState([
    {
      id:1,
      incident:1,
      name:'PFOP',
      image:'https://media.discordapp.net/attachments/1087782478548312074/1137581620744953857/PFOP.png',
      expiry:15125151521,
    },
  ]);
  const [dx, dA] = useState(null);
  const [dB, dE] = useState('');
  const dm = Boolean(dx);
  var du = function () {
    dA(null);
    dE('');
    // db(true);
  };
  return (
    <>
      <div className={classes.mdwDashboardOuterContent}>
        <div className={classes.mdwDashboardInnerContent}>
          <div className={classes.mdwDashboardInnerContentLeft}>
            <div className={classes.mdwDashboardInnerContentLeftHeader}>
              <div className='mdw-dashboard-inner-content-left-header-text-left'>
                <Typography 
                  style = {{
                    color: '#fff',
                    wordBreak: 'break-word',
                  }}
                  variant={'h6'}
                  gutterBottom={true}
                >
                  Warrants
                </Typography>
              </div>
              <div className={classes.mdwInnerContentLeftHeaderTextRight}>
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                  <Tooltip sx={{backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px'}} arrow placement="top" title="Create Warrant">
                    <i style={{color:'white'}} className='fas fa-plus fa-w-14'></i>
                  </Tooltip>
                </div>
                <div className='input-wrapper'>
                  <TextField
                    id="input-with-icon-textfield"
                    label='Search'
                    type='text'
                    // onChange={event =>
                    //   setPasswordInput(event.target.value)
                    // }
                    // value={Password}
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
                      startAdornment: <InputAdornment position="start"><i className="fas fa-search fa-w-16 fa-fw"></i></InputAdornment>,
                    }}
                    variant="standard"
                  />   

                </div>
              </div>
            </div>
            <div className={classes.mdwInnerContentLeftBody}>
              {/* <Menu id="fade-menu" MenuListProps={{'aria-labelledby': 'fade-button' }} anchorEl={dx} open={dm} onClose={function () {
                dA(null);
                dE('');
              }}>
                <MenuItem onClick={function(){return du()}}>
                  <MenuList>

                  </MenuList>
                </MenuItem>
              </Menu> */}
              {warrns && warrns.length > 0 ? (
                warrns.map((da: any) => {
                  const expiryDate = moment(da.expiry);
                  const currentDate = moment();
                  const daysDiff = expiryDate.diff(currentDate, 'days');

                  return (
                    <div
                      className="component-paper cursor-pointer"
                      style={{
                        width: '100%',
                        borderBottom: '0px solid #fff',
                        borderRadius: '0px',
                        backgroundColor: '#222831',
                      }}
                      onClick={(dH: any) => {
                        const dy = dH;
                        const dp = da.id;
                        dA(dy.currentTarget);
                        void dE(dp);
                      }}
                    >
                      <div className="main-container">
                        <div className="image">
                          <img
                            alt=""
                            src={da.image}
                            style={{
                              height: '150px',
                              maxHeight: '150px',
                              minHeight: '150px',
                            }}
                          />
                        </div>
                        <div className="details">
                          <div className="description">
                            <div className="flex-row">
                              <Typography
                                style={{
                                  color: '#fff',
                                  wordBreak: 'break-word',
                                }}
                                variant="body1"
                                gutterBottom
                              >
                                {da.name}
                              </Typography>
                            </div>
                            <div className="flex-row">
                              <Typography
                                style={{
                                  color: '#fff',
                                  wordBreak: 'break-word',
                                }}
                                variant="body2"
                                gutterBottom
                              >
                                {da.incident}
                              </Typography>
                            </div>
                          </div>
                          <div
                            className="align-bottom"
                            style={{
                              display: 'flex',
                              justifyContent: 'flex-end',
                              flexDirection: 'column',
                            }}
                          >
                            <div
                              className="flex-row"
                              style={{
                                justifyContent: 'space-between',
                              }}
                            >
                              <Typography
                                style={{
                                  color: '#fff',
                                  wordBreak: 'break-word',
                                }}
                                variant="body2"
                                gutterBottom
                              >
                                {'ID: ' + da.id}
                              </Typography>
                              <Typography
                                style={{
                                  color: '#fff',
                                  wordBreak: 'break-word',
                                }}
                                variant="body2"
                                gutterBottom
                              >
                                {'expires in ' + daysDiff + ' days'}
                              </Typography>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <></>
              )}
          
            </div>
          </div>
          <div className={classes.mdwInnerContentDivider}></div>
          <div className={classes.mdwDashboardInnerContentMiddle}>
            <div className={classes.mdwDashboardInnerContentMiddleHeader}>
              <div className='mdw-dashboard-inner-content-middle-header-text-left'>
                <Typography 
                  style = {{
                    color: '#fff',
                    wordBreak: 'break-word',
                  }}
                  variant={'h6'}
                  gutterBottom={true}
                >
                  BOLO
                </Typography>
              </div>
              <div className='input-wrapper'>
                <TextField
                  id="input-with-icon-textfield"
                  label='Search'
                  type='text'
                  // onChange={event =>
                  //   setPasswordInput(event.target.value)
                  // }
                  // value={Password}
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
                    startAdornment: <InputAdornment position="start"><i className="fas fa-search fa-w-16 fa-fw"></i></InputAdornment>,
                  }}
                  variant="standard"
                />   

              </div>
            </div>
            <div className={classes.mdwDashboardInnerContentMiddleBody}></div>
          </div>
          <div className={classes.mdwInnerContentDivider}></div>
          <div className={classes.mdwDashboardInnerContentRight}>
            <div className={classes.mdwDashboardInnerContentRightHeader}>
              <div className='mdw-dashboard-inner-content-right-header-text-left'>
                <Typography 
                  style = {{
                    color: '#fff',
                    wordBreak: 'break-word',
                  }}
                  variant={'h6'}
                  gutterBottom={true}
                >
                  Bulletin Board
                </Typography>
              </div>
              <div className={classes.mdwDashboardInnerContentRightHeaderTextRight}>
                <div className='input-wrapper'>
                  <TextField
                    id="input-with-icon-textfield"
                    label='Search'
                    type='text'
                    // onChange={event =>
                    //   setPasswordInput(event.target.value)
                    // }
                    // value={Password}
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
                      startAdornment: <InputAdornment position="start"><i className="fas fa-search fa-w-16 fa-fw"></i></InputAdornment>,
                    }}
                    variant="standard"
                  />
                </div>
              </div>
            </div>
            <div className={classes.mdwDashboardInnerContentRight}></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardPage;