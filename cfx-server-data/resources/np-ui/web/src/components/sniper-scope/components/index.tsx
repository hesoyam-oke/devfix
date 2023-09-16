import React, { useState } from 'react';
import './index.css'
import { useNuiEvent } from "../../../hooks/useNuiEvent";
import useStyles from './index.styles';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const SniperScope: React.FC = () => {
  const classes = useStyles();

  const [Show, setShow]: any = useState(false);


  useNuiEvent('uiMessage', (data) => {
    var dvexdata = data.data
    if ('sniper-scope' === data.app) {
      if (true === dvexdata.show) {
        setShow(true);
      } else {
        setShow(false);
      }
    }
  })

  return (
    <>
      <div style={{display: Show ? '' : 'none'}} className={classes.sniperContaner}>
        <img src="https://dvexdev.github.io/DveX.Images/sniper-scope.png" width={'100%'} alt="" />
      </div>
    </>
  );
}

export default SniperScope;