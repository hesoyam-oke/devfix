import React, { useState, useEffect, useRef } from 'react';
import { Typography } from '@mui/material';
import '../index'
import useStyles from '../index.styles';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function Header({sethoverheader, sethoverTabheader, setheaderTabs, setcurrentTab, currentTab, hoverheader, thoverTabheader, headerTabs}: any) {
  const classes = useStyles();
  const getnamefortab = (currentTab) => {
    if(currentTab == 1){
      return 'Dashboard'
    } else if(currentTab == 2){
      return 'Incidents'
    } else if(currentTab == 3){
      return 'Profiles'
    } else if(currentTab == 4){
      return 'DMV'
    } else if(currentTab == 5){
      return 'Reports'
    } else if(currentTab == 6){
      return 'Evidence'
    } else if(currentTab == 7){
      return 'Properties'
    } else if(currentTab == 8){
      return 'Charges'
    } else if(currentTab == 9){
      return 'Staff'
    } else if(currentTab == 10){
      return 'Legislation'
    } else if(currentTab == 11){
      return 'Businesses'
    }
  }
  
  const DeleteHeaderTab = (key) => () => {
    if(headerTabs.length !== 1){
      setheaderTabs((tabs) => tabs.filter((tab) => tab.key !== key));
    }
  };
  
  const CreateHeaderTab = () => {
    if(headerTabs.length !== 5){
      setheaderTabs([
        ...headerTabs,
        {
          key: headerTabs.length + 1,
          tabId: currentTab,
          name: getnamefortab(currentTab)
        }
      ])
    }
  }
  return (
    <>
      <div onMouseEnter={function(){return sethoverheader(true)}} onMouseLeave={function(){return sethoverheader(false)}} className={classes.mdwHeader}>
        <div className='mdw-header-logo'>
          {/* 
          
                  children: Object(PZ.jsx)('img', {
                        alt: '',
                        src:
                          'police' === hZ
                            ? 'https://gta-assets.nopixel.net/images/mdw-lspd.png'
                            : 'sheriff' === hZ
                            ? 'https://gta-assets.nopixel.net/images/mdw-bcso.png'
                            : 'state' === hZ
                            ? 'https://gta-assets.nopixel.net/images/mdw-troopers.png'
                            : 'ranger' === hZ
                            ? 'https://gta-assets.nopixel.net/images/mdw-ranger.png'
                            : 'judge' === hZ
                            ? 'https://i.imgur.com/LnMPAZH.png'
                            : 'https://gta-assets.nopixel.net/imag 0xes/mdw-generic.png',
                      }),

          */}
          <img src="https://gta-assets.nopixel.net/images/mdw-generic.png" alt="" />
        </div>
        <div onMouseEnter={function(){return sethoverTabheader(true)}} onMouseLeave={function(){return sethoverTabheader(false)}} className={classes.mdwHeaderTabs}>
          {headerTabs && headerTabs.length > 0 ? headerTabs.map(function(tab){
            return (
              <div onDoubleClick={DeleteHeaderTab(tab.key)} onClick={function(){setcurrentTab(tab.tabId)}} className={'mdw-header-tab'}>
                <Typography 
                  style = {{
                    color: '#fff',
                    wordBreak: 'break-word',
                  }}
                  variant={'h6'}
                  gutterBottom={true}
                >
                  {tab.name}
                </Typography>
              </div>
            );
          }) : <>
            <div onClick={function(){setcurrentTab(1)}} className={'mdw-header-tab'}>
              <Typography 
                style = {{
                  color: '#fff',
                  wordBreak: 'break-word',
                }}
                variant={'h6'}
                gutterBottom={true}
              >
                Dashboard
              </Typography>
            </div>
          </>}

          <div onClick={CreateHeaderTab} className={'mdw-header-tab-plus'}>
            <i className='fas fa-plus'></i>
          </div>
        </div>
        <div className={classes.mdwHeaderText}>
          <div>
            <Typography 
              style = {{
                color: '#fff',
                wordBreak: 'break-word',
              }}
              variant={'h6'}
              gutterBottom={true}
            >
              Quote of the Day
            </Typography>
          </div>
          <div>
            <Typography 
                style = {{
                  color: '#fff',
                  wordBreak: 'break-word',
                  textAlign: 'right'
                }}
                variant={'body1'}
                gutterBottom={true}
              >
                - be Like PFOP a GIGACHAD
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;