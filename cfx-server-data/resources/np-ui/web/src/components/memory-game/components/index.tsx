import React, { useState, useEffect, useRef } from 'react';
import './index.css'
import { useNuiEvent } from "../../../hooks/useNuiEvent";
import { fetchNui } from "../../../utils/fetchNui";
import { noop } from '../../../utils/misc';
import { Typography } from '@mui/material';
import useStyles from './index.styles';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Console } from 'console';


const MemoryGame: React.FC = () => {
  const classes = useStyles();
  
  const [show, setShow] = useState(false);
  const [clicksTotal, setClicksTotal] = useState(0);
  const [clicksFailed, setClicksFailed] = useState(0);
  const [coloredSquares, setColoredSquares] = useState(16);
  const [gameFinished, setGameFinished] = useState(false);
  const [gameFinishedEndpoint, setGameFinishedEndpoint] = useState('np-ui:heistsThermiteMinigameResult');
  const [gameTimeoutDuration, setGameTimeoutDuration] = useState(20000);
  const [gameWon, setGameWon] = useState(false);
  const [failedClicksAllowed, setFailedClicksAllowed] = useState(2);
  const [introShown, setIntroShown] = useState(false);
  const [gridSize, setGridSize] = useState(6);
  const [parameters, setParameters] = useState({});
  const [squareIds, setSquareIds] = useState([]);
  const [randomIds, setRandomIds] = useState([]);
  const modeData = {
    5: [coloredSquares, '92px'],
    6: [coloredSquares, '74px'],
    7: [coloredSquares, '61px'],
    8: [coloredSquares, '51px'],
    9: [coloredSquares, '44px'],
    10: [coloredSquares, '38px'],
  };
  
  useNuiEvent('uiMessage', (data) => {
    var dvexdata = data.data
    if ('memorygame' === data.app) {
      if (true === data.show) {
        setGridSize(dvexdata.gridSize)
        setGameTimeoutDuration(dvexdata.gameTimeoutDuration)
        setSquareIds(dvexdata.coloredSquares)
        setGameFinishedEndpoint(dvexdata.gameFinishedEndpoint)
        
      } else {
      }
    }
  })

  

  
  return (
    <div style={{display: show ? '' : 'none'}} className={classes.MemoryGameOuterContainer}>
      <div className={classes.container}>
          {/* <div style={{display: gameFinished ? '' : 'none'}} className='splash'><div className='hacker'><i className="fas fa-user-secret"></i></div> Remote Sequencing Required</div>
          <div style={{display: !gameFinished ? '' : 'none'}} className='groups'>
            <div style={{width:modeData[gridSize][1], height:modeData[gridSize][1]}} className='group'></div>
          </div> */}
          {!gameFinished && !introShown && <div className={classes.introBox}>
            <i style={{color: 'white', marginBottom: '32px'}} className='fas fa-user-secret fa-fw fa-4x'></i>
            <Typography style={{color: 'white'}} variant="body1">Remote Sequencing Required</Typography>
          </div>}
          {!gameFinished && !introShown && <div className={classes.boxClickBox}>
            {randomIds && randomIds.map(function (t) {
              <div className={classes.clickSquare}></div>
                // return Object(x.jsx)(O, Object(a.a)(Object(a.a)({}, e), {}, { isClickable: e.squareIds.includes(t) }), t);
            })}
          </div>}
          {gameFinished && <div className={classes.introBox}>
            <i style={{color: 'white', marginBottom: '32px'}} className='fas fa-user-secret fa-fw fa-4x'></i>
            <Typography style={{color: 'white'}} variant="body1">Remote Sequencing {gameWon ? 'Complete' : 'Failed'}</Typography>
          </div>}
      </div>
    </div>
  );
};

export default MemoryGame;