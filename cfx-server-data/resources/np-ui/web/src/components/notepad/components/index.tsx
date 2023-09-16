import React, { useState } from 'react';
import './index.css'
import useStyles from './index.styles';
import { Button } from '@mui/material';
import { useNuiEvent } from "../../../hooks/useNuiEvent";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const Notepad: React.FC = () => {
  const classes = useStyles();

  const [show, setShow]: any = useState(false)
  const [canSave, setCanSave]: any = useState(false)



  return (
    <>
      <div style={{display: show ? '' : 'none'}} className={classes.notepadContainer}>
        <div className={classes.notepadInnerConainer}>
          <div style={{display: canSave ? '' : 'none'}} className={classes.notepadSaveContainer}>
            <Button size='small' color='success' variant='contained'>Save</Button>         
          </div>
          <div style={{display: canSave ? '' : 'none'}}>
            <textarea id='notepad-content' className={classes.notepadTextArea} spellCheck={false} readOnly={false}></textarea>
          </div>
          <div style={{display: canSave ? 'none' : ''}}>
            <textarea id='notepad-content' className={classes.notepadTextArea} spellCheck={false} readOnly={true}></textarea>
          </div>
        </div>
      </div>
    </>
  );
}

export default Notepad;