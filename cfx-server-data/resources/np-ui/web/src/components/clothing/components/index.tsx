import React, { useState } from 'react';
import './index.css'
import useStyles from './index.styles';
import { Button, FormControl, Grid, Stack, ButtonGroup, Tooltip, InputAdornment, MenuItem, TextField, Typography } from '@mui/material';
import { useNuiEvent } from "../../../hooks/useNuiEvent";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const ClothingMenu: React.FC = () => {
  const classes = useStyles();

  const [Show, setShow]: any = useState(false)
  const [Tab, setTab]: any = useState(0)



  return (
    <>
      <Grid style={{display: Show ? '' : 'none'}} container className={classes.root}>
        <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '50%', height: '100%', backgroundColor: 'transparent'}}>
          <div style={{display: 'flex', opacity: Show ? 1 : 0, backgroundColor: 'rgb(34, 40, 49)', width: '550px', height: '130px', borderRadius: '4px', transition: 'all 800ms ease 0s'}}>
            <div style={{display: 'flex', flexDirection: 'column', padding: '2vh'}}>
              <div style={{paddingBottom: '3.5vh'}}>
                <Typography style={{color: '#fff', wordBreak: 'break-word', fontWeight: 400}} variant="body1" gutterBottom>
                  Total: <span style={{color: '#85bb65'}}>$0.00 Incl. 15% tax</span>
                </Typography>
              </div>
              <Stack direction='row' spacing={9}>
                <Button style={{fontSize: '11px'}} size='small' color='success' variant='contained'>Pay Cash</Button>
                <Button style={{fontSize: '11px'}} size='small' color='success' variant='contained'>Pay Bank</Button>
                <Button style={{fontSize: '11px'}} size='small' color='warning' variant='contained'>Discard</Button>
                <Button style={{fontSize: '11px'}} size='small' color='error' variant='contained'>Go Back</Button>
              </Stack>
            </div>
          </div>
        </div>
        <div style={{display: 'flex', width: '50%', height: '100%', backgroundColor: 'transparent', justifyContent: 'flex-end', flexDirection: 'row'}}>
          <div className={classes.clothingLeftSidebar}>
            <div className={classes.clothingLeftSideBarTab}>
              <i style={{color: 'white', fontSize: '15px'}} className='fas fa-hat-cowboy-side fa-fw fa-w-14'></i>
            </div>
            <div className={classes.clothingLeftSideBarTab}>
              <i style={{color: 'white', fontSize: '15px'}} className='fas fa-mask fa-fw fa-w-14'></i>
            </div>
            <div className={classes.clothingLeftSideBarTab}>
              <i style={{color: 'white', fontSize: '15px'}} className='fas fa-glasses fa-fw fa-w-14'></i>
            </div>
            <div className={classes.clothingLeftSideBarTab}>
              <i style={{color: 'white', fontSize: '15px'}} className='fas fa-tshirt fa-fw fa-w-14'></i>
            </div>
            <div className={classes.clothingLeftSideBarTab}>
              <i style={{color: 'white', fontSize: '15px'}} className='fas fa-shopping-bag fa-fw fa-w-14'></i>
            </div>
            <div className={classes.clothingLeftSideBarTab}>
              <i style={{color: 'white', fontSize: '15px'}} className='fas fa-drumstick-bite fa-fw fa-w-14'></i>
            </div>
            <div className={classes.clothingLeftSideBarTab}>
              <i style={{color: 'white', fontSize: '15px'}} className='fas fa-socks fa-fw fa-w-14'></i>
            </div>
          </div>
          <div className={classes.clothingContainer}>
            <div className={classes.clothingHeader}>
              <div className={classes.clothingHeaderInner}>
                <div>
                  <Typography style={{color: '#85bb65', wordBreak: 'break-word', fontWeight: 500}} variant="body2" gutterBottom>
                    $0.00 Incl. 15% tax
                  </Typography>
                </div>
                <div>
                  <ButtonGroup sx={{borderRadius: '3px', fontSize: '11px'}} variant='contained' disableElevation={true}>
                    <Button style={{fontSize: '11px'}} size='small' color='success' variant='contained'>Pay</Button>
                    <Button style={{fontSize: '11px'}} size='small' color='warning' variant='contained'>Exit</Button>
                  </ButtonGroup>
                </div>
              </div>
            </div>
            <div style={{display: 0 === Tab ? '' : 'none'}} className={classes.clothingInnerContainerWrapper}>
              <div className={classes.clothingInnerContainer}>
                <div className={classes.clothingInnerContainerHeader}>
                  <div>
                    <Typography style={{color: '#fff', wordBreak: 'break-word', fontWeight: 0}} variant="h6" gutterBottom>
                      Hair
                    </Typography>
                  </div>
                </div>
                <div className={classes.clothingInnerContainerInputWrapper}>
                  <ButtonGroup variant='contained' disableElevation={true}>
                    <Button
                      // onClick={handleDecrease}
                      sx={{
                        borderRadius: '4px',
                        maxWidth: '30px',
                        maxHeight: '30px',
                        minWidth: '30px',
                        minHeight: '30px',
                      }}
                      size="small"
                      color="error"
                      variant="contained"
                    >
                      {'<'}
                    </Button>

                    <TextField
                      fullWidth
                      sx={{input: { width: '50%'} }}
                      // value={ca}
                      label={`${'1'} hair styles`}
                      // onChange={(e) => setCa(Number(e.target.value))}
                      type="number"
                      InputLabelProps={{
                        style: {
                          color: '#fff',
                          top: '-16px',
                          left: '-40px',
                        },
                      }}
                      variant='standard'
                      InputProps={{
                        style: { marginTop: '3px' },
                      }}
                    />

                    <Button
                      // onClick={handleIncrease}
                      sx={{
                        borderRadius: '4px',
                        maxWidth: '30px',
                        maxHeight: '29px',
                        minWidth: '30px',
                        minHeight: '30px',
                      }}
                      size="small"
                      color="error"
                      variant="contained"
                    >
                      {'>'}
                    </Button>
                  </ButtonGroup>

                </div>
              </div>
            </div>
          </div>
        </div>
      </Grid>
    </>
  );
}

export default ClothingMenu;