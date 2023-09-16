import React, { useState } from 'react';
import './index.css'
import { useNuiEvent } from "../../../hooks/useNuiEvent";
import { fetchNui } from "../../../utils/fetchNui";
import { Typography } from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const Badge: React.FC = () => {
  const [ShowBadge, setShowBadge]: any = useState(false)
  const [BadgeData, setBadgeData]: any = useState({
    name: '',
    rank: '',
    department: '',
    image: '',
    callsign: '',
  })

  useNuiEvent('uiMessage', function (data) {
    var dvexdata = data.data
    if('badge' === data.app){
      if(true === dvexdata.show){
        setBadgeData({
          name: dvexdata.name,
          rank: dvexdata.rank,
          department: dvexdata.department,
          image: dvexdata.image,
          callsign: dvexdata.callsign
        })
        setShowBadge(true)
        setTimeout(function () {
          fetchNui('at-ui:closeApp', {}).then(function (cM) {
            if(true === cM.meta.ok){   
              fetchNui('at-ui:applicationClosed', {
                  name: 'badge',
                  fromEscape: true,
              }).then(function (cb) {
                if(true === cb.meta.ok){
                  setShowBadge(false)
                }
              })
            }
          })
        }, 3000)
      }
    }
  })
    

  return (
    <>
      <div style={{position:'absolute', display: ShowBadge ? '' : 'none'}}>
        <div className='badge-app-wrapper'>
          <div style={{backgroundImage:'url(https://dvexdev.github.io/DveX.Images/dark_leather.png)'}} className='exterior-wrapper'>
            <div className='interior-wrapper'>
              <div className='row'>
                <div className='column'>
                  <div className='left-column'>
                    <div className='information-wrapper'>
                      <div className='information'>
                        <div className='profile-image-holder'>
                          <img src={BadgeData.image ? BadgeData.image : 'https://i.imgur.com/wxNT3y2.jpg'} alt="profile" />
                        </div>
                        <div className='name-info'>
                          <div style={{backgroundColor: 'rgb(23, 21, 32)'}} className='banner'>
                            <Typography style={{color: '#fff', wordBreak: 'break-word', textAlign: 'center'}} variant="body2">
                              {BadgeData.department ? BadgeData.department : 'LSPD'}
                            </Typography>
                          </div>
                          <div className='name-info-wrap'>
                            <div className='rank'>
                              <Typography style={{color: '#fff', wordBreak: 'break-word'}} variant="body1">
                                {BadgeData.rank}
                              </Typography>
                            </div>
                            <div className='name'>
                              <Typography style={{color: '#fff', wordBreak: 'break-word'}} variant="h6">
                                {BadgeData.name}
                              </Typography>
                            </div>
                            <div className='callsign'>
                              <Typography style={{color: '#fff', wordBreak: 'break-word'}} variant="h6">
                                #{BadgeData.callsign}
                              </Typography>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='column'>
                  <div className='right-column'>
                    <div className='badge-wrapper'>
                      <img src={`https://dvexdev.github.io/DveX.Images/${BadgeData.department ? BadgeData.department : 'LSPD'}.png`} className='badge' alt="badge" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Badge;