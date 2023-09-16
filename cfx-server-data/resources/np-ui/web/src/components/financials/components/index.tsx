import React, { useState, useEffect, useRef } from 'react';
import './index.css'
import { useNuiEvent } from "../../../hooks/useNuiEvent";
import { fetchNui } from "../../../utils/fetchNui";
import { noop } from '../../../utils/misc';
import { Button, Divider, Grid, ThemeProvider, Box, Stack, InputAdornment, TextField, Typography } from '@mui/material';
import Moment from "react-moment";
import useStyles from './index.styles';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const Financials: React.FC = () => {
    const classes = useStyles();

    const [ShowFinancials, setShowFinancials]: any = useState(false)
    const [ShowFinancialsLoader, setShowFinancialsLoader]: any = useState(false)
    const [ShowModal, setShowModal]: any = useState(false)
    const [TypeBtn, setTypeBtn]: any = useState('')
    const [ShowModalLoader, setShowModalLoader]: any = useState(false)
    const [Atm, SetAtm]: any = useState(false)
    const [Account, SetAccount]: any = useState([])
    const [Transactions, SetTransactions]: any = useState([])
    const [MyCash, SetMyCash]: any = useState(0)
    const [CurrentAccountId, SetCurrentAccountId]: any = useState(0)
    const [CurrentAccountType, SetCurrentAccountType]: any = useState('')
    const [Amount, SetAmount]: any = useState(0)
    const [StateId, SetStateId]: any = useState(0)
    const [AccountID, SetAccountID]: any = useState(0)
    const [Comment, SetComment]: any = useState('')
    const [SelectAccount, SetSelectAccount]: any = useState('')


    type FrameVisibleSetter = (bool: boolean) => void

    const LISTENED_KEYS = [ "Escape" ]
    const setterRef = useRef<FrameVisibleSetter>(noop)

    useEffect(() => {
      setterRef.current = setShowFinancials
    }, [setShowFinancials])
  
    useEffect(() => {
      const keyHandler = (e: KeyboardEvent) => {
        if (LISTENED_KEYS.includes(e.code)) {
          setterRef.current(false)
          fetchNui('np-ui:closeApp', {}).then(function (firstdata) {
            if(true === firstdata.meta.ok){
                fetchNui('np-ui:applicationClosed', {
                    name: 'atm',
                    fromEscape: true,
                }).then(function (data) {
                    if(true === data.meta.ok){
                        setShowFinancials(false) 
                        setShowFinancialsLoader(false) 
                        setShowModal(false)
                        setTypeBtn('')
                        SetAccount([])
                        SetTransactions([])
                        SetMyCash(0)
                        // SetAmount(0)
                        // SetStateId(0)
                        // SetComment('')
                    }
                })
            }
            })
        }
        
    }
  
      window.addEventListener("keydown", keyHandler)
  
      return () => window.removeEventListener("keydown", keyHandler)
    }, []);

    useNuiEvent('uiMessage', (data) => {
      var dvexdata = data.data
      if ('atm' === data.app) {
        if (true === data.show) {
            setShowFinancials(true)
            if(true === dvexdata.isAtm){
                SetAtm(true)
                setShowFinancialsLoader(true)
                
                
                fetchNui('np-ui:getCash', {}).then(function (data) {
                    SetMyCash(data)
                });
                fetchNui('np-ui:getAccounts', {}).then(function (data) {
                    setShowFinancialsLoader(false)
                    SetAccount(data.data.accounts)
                });
            }else if(false === dvexdata.isAtm){
                SetAtm(false)
                setShowFinancialsLoader(true)
                
                fetchNui('np-ui:getAccounts', {}).then(function (data) {
                    setShowFinancialsLoader(false)
                    SetAccount(data.data.accounts)
                });
            }
        } else {
          if(false === data.show) {
            SetAtm(false) 
            setShowFinancials(false) 
            setShowFinancialsLoader(false) 
            SetAccount([]) 
          }
        }
      }
    })


    return (
        <>
        <React.Fragment>
            <div style={{ display: ShowFinancials ? '' : 'none' }}>
                <ThemeProvider theme={classes}>
                    <Grid container className={classes.root}>
                        <Box style={{ height: ShowFinancialsLoader ? '200px' : '900px' }} className={classes.mainBox}>
                            
                            <div style={{ display: ShowFinancialsLoader ? '' : 'none' }} className='spinner-wrapper'>
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
                            <div style={ { display: ShowFinancialsLoader ? 'none' : '' }} className={classes.accountWrapper}>
                                <div className={classes.accountHeader}>
                                    <Typography variant="h5" component='div' gutterBottom>
                                        Accounts
                                    </Typography>
                                    <div className={classes.accountScroll}>
                                        {Account.length ?
                                            Account.map(function (data, dvex) {
                                                return (
                                                    <div id={data.id} onClick={function() {
                                                        SetCurrentAccountId(data.id)
                                                        SetCurrentAccountType(data.type)
                                                        fetchNui('np-ui:getAccountTransactions', {
                                                            account_id: data.id
                                                        }).then(function (data) {
                                                            SetTransactions(data.data)
                                                        })
                                                    }} className={CurrentAccountId === data.id ? classes.activeAccountBox : classes.accountBox}>
                                                        <div className={classes.accountInnerWrapper}>
                                                            <div className={classes.accountLeft}>
                                                                <Typography variant="body1" component="div" mb="0px" gutterBottom>
                                                                    {data.name} / {data.id}
                                                                </Typography>
                                                                <Typography variant="body1" component="div" mb="0px" gutterBottom>
                                                                    {data.type}
                                                                </Typography>
                                                                <Typography variant="body1" component="div" mb="0px" gutterBottom>
                                                                    {data.owner_first_name} {data.owner_last_name}
                                                                </Typography>
                                                            </div>
                                                        </div>
                                                        <div className={classes.accountInnerWrapper}>
                                                            <div className={classes.accountRight}>
                                                                <Typography 
                                                                    sx={{
                                                                        fontSize: (function (Ze) {
                                                                        var Zv = Ze.toString().length
                                                                        return Zv > 13
                                                                            ? 24 - (Zv - 13 + 5) + 'px'
                                                                            : '1.25rem'
                                                                        })(data.balance),
                                                                        textAlign:'right',
                                                                    }}
                                                                    mb='0px'
                                                                    variant='h6'
                                                                    gutterBottom
                                                                    component='div'>
                                                                    ${data.balance.toLocaleString()}.00
                                                                </Typography>
                                                                <Typography 
                                                                    mb='0px'
                                                                    variant='body1'
                                                                    gutterBottom
                                                                    component='div'>
                                                                    Available Balance
                                                                </Typography>
                                                            </div>
                                                            <Stack
                                                                direction='row'
                                                                justifyContent='center'
                                                                mt='10px'
                                                                alignItems='flex-end'
                                                                spacing='3.75'
                                                            >
                                                                <Button onClick={function() {
                                                                    setShowModalLoader(false)
                                                                    setShowModal(true)
                                                                    setTypeBtn('WITHDRAW')
                                                                }} style={{display: Atm ? 'none' : '', margin:'15px'}} color="warning" size="small" variant="contained">WITHDRAW</Button>
                                                                <Button onClick={function() {
                                                                    setShowModalLoader(false)
                                                                    setShowModal(true)
                                                                    setTypeBtn('DEPOSIT')
                                                                }} style={{margin:'15px', marginRight: Atm ? '125px' : '15px'}} color="success" size="small" variant="contained">DEPOSIT</Button>
                                                                <Button onClick={function() {
                                                                    setShowModalLoader(false)
                                                                    setShowModal(true)
                                                                    setTypeBtn('TRANSFER')
                                                                }} style={{margin:'15px'}} color="error" size="small" variant="contained">TRANSFER</Button>
                                                            </Stack>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        ): <React.Fragment></React.Fragment>} 
                                        
                                    </div>
                                </div>
                            </div>
                            <div style={ { display: ShowFinancialsLoader ? 'none' : '' }} className={classes.transactionWrapper}>
                                <div className={classes.transactionHeader}>
                                    <Typography variant="h5" component='div' gutterBottom>
                                        Transaction History
                                    </Typography>
                                    <div className={classes.transactionScroll}>
                                            {Transactions.length ?
                                                Transactions.map(function (data, dvex) {
                                                    return (
                                                        <div className={classes.transactionBox}>
                                                            <div className={classes.transactionInnerWrapper}>
                                                                <div className={classes.transactionLeft}>
                                                                    <Typography variant="subtitle1" component='div' gutterBottom>
                                                                        {data.from_account_name} / {data.from_account_id} [{data.type.toUpperCase()}]
                                                                    </Typography>
                                                                </div>
                                                            </div>
                                                            <div className={classes.transactionInnerWrapper}>
                                                                <div className={classes.transactionRight}>
                                                                    <Typography variant="subtitle1" component='div' gutterBottom>
                                                                        {data.id}
                                                                    </Typography>
                                                                </div>
                                                            </div>
                                                            <Divider 
                                                                variant='middle'
                                                                sx={{
                                                                    width: '98%',
                                                                    borderColor: 'rgba(255, 255, 255, 255)',
                                                                    marginRight: '14px',
                                                                    marginLeft: '10px',
                                                                    marginTop:'10px'
                                                                }}
                                                            />
                                                            <div className={classes.transactionSecondInnerWrapper}>
                                                                <div className={classes.transactionMiddleLeft}>
                                                                    <Typography 
                                                                        sx={{ color: 'out' === data.direction ? 'rgb(242, 163, 101)' : 'rgb(149, 239, 119)' }}
                                                                        mb='0px'
                                                                        variant='h6'
                                                                        gutterBottom
                                                                        component='div'
                                                                    >
                                                                        {/* 'pos' === YC.type ? '' : '-',
                                                                        YC.amount.toLocaleString('en-Us', {
                                                                        style: 'currency',
                                                                        currency: 'USD',
                                                                        }), */}
                                                                        {'out' === data.direction ? '-' : ''} ${data.amount.toLocaleString()}.00
                                                                    </Typography>
                                                                </div>
                                                                <div className={classes.transactionMiddleMiddle}>
                                                                    <Typography 
                                                                        mb='0px'
                                                                        variant='h6'
                                                                        gutterBottom
                                                                        component='div'
                                                                    >
                                                                        {data.from_civ_name}
                                                                    </Typography>
                                                                </div>
                                                                <div className={classes.transactionMiddleRight}>
                                                                    <Typography 
                                                                        mb='0px'
                                                                        variant='h6'
                                                                        gutterBottom
                                                                        component='div'
                                                                    >
                                                                        <Moment fromNow>{data.date}</Moment>
                                                                    </Typography>
                                                                </div>
                                                            </div>
                                                            <div className={classes.transactionThirdInnerWrapper}>
                                                                <div className={classes.transactionSecondMiddleRight}>
                                                                    <Typography 
                                                                        mb='0px'
                                                                        variant='h6'
                                                                        gutterBottom
                                                                        component='div'
                                                                    >
                                                                        {data.to_civ_name}
                                                                    </Typography>
                                                                </div>
                                                            </div>
                                                            <div style={{position:'relative', width:'99%', bottom: '35px'}} className={classes.transactionFourthInnerWrapper}>
                                                                <div style={{width:'100%'}} className={classes.transactionThirdMiddle}>
                                                                    <TextField
                                                                        disabled
                                                                        // fullWidth
                                                                        // sx={{ width: '1021px' }}
                                                                        id='standard-disabled'
                                                                        label='Message'
                                                                        defaultValue={data.comment}
                                                                        variant='standard'
                                                                    >

                                                                    </TextField>
                                                                </div>
                                                            </div>
                                                        </div>
                                                )}
                                            ): <React.Fragment></React.Fragment>} 
     
                                    </div>
                                </div>
                            </div>
                            <div style={{display: ShowFinancialsLoader ? 'none' : '', position:'absolute', bottom:'14px', left:'-4%'}} className={classes.cashWrapper}>
                                <Typography mb='0px' variant="body1" component='div' gutterBottom>
                                    Cash: ${MyCash.toLocaleString()}.00
                                </Typography>
                            </div>

                            <div style={{ display: ShowFinancialsLoader ? 'none' : '', position:'absolute', top:'0', right:'1%' }} className={classes.transactionWrapper}>
                                <div className={classes.transactionHeader}>
                                    <Stack direction="row" spacing={89.5}>
                                        <Typography variant="h5" component='div' gutterBottom>
                                            Chafe Bank
                                        </Typography>
                                    </Stack>
                                </div>
                            </div>
                            <div style={{display: ShowModal ? '' : 'none'}} className={classes.modal}>
                                {/* <Grid sx={{display:'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}> */}
                                    <Box className={classes.modal_mainBox} sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                                        <div style={{ display: ShowModalLoader ? '' : 'none', margin:'25%', marginTop:'40%'}} className='spinner-wrapper'>
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
                                        <Typography style={{display: ShowModalLoader ? 'none' : ''}} variant="h5" component='div' gutterBottom>
                                            {CurrentAccountType} / <br /> {CurrentAccountId}
                                        </Typography>
                                        <Grid container
                                         style={{display: ShowModalLoader ? 'none' : ''}}
                                         sx={{
                                            justifyContent: 'center',
                                            marginTop: '31px',
                                            marginBottom: '25px',
                                        }}>
                                            <TextField
                                                label="Amount"
                                                type="number"
                                                id="standard-start-adornment"
                                                // className={classes.root}
                                                InputProps={{
                                                    inputMode: 'numeric', 
                                                    // pattern: '[0-9]*',
                                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                                }}
                                                InputLabelProps={{
                                                    shrink: true,
                                                    classes:{
                                                        root: classes.inputLabel,
                                                        focused: 'focused',
                                                    }
                                                }}
                                                variant="standard"
                                                style={{ width: 300 }}
                                                onChange={function (event) {
                                                    SetAmount(event.target.value)
                                                }}
                                            />                                        
                                        </Grid>
                                        <Grid container 
                                        style={{display: ShowModalLoader ? 'none' : ''}}
                                        sx={{
                                            justifyContent: 'center',
                                        }}>
                                            <TextField
                                                label="Comment"
                                                id="standard-start-adornment"
                                                // className={classes.root}
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="start">//</InputAdornment>,
                                                }}
                                                InputLabelProps={{
                                                    shrink: true,
                                                    classes:{
                                                        root: classes.inputLabel,
                                                        focused: 'focused',
                                                    }
                                                }}
                                                variant="standard"
                                                style={{ width: 300 }}
                                                onChange={function (event) {
                                                    SetComment(event.target.value)
                                                }}
                                            />                                        
                                        </Grid>
                                        {TypeBtn === "TRANSFER" &&
                                        <Grid container 
                                        style={{display: ShowModalLoader ? 'none' : ''}}
                                        sx={{
                                            justifyContent: 'center',
                                            marginTop: '31px',
                                        }}>
                                            <TextField
                                                label="State ID"
                                                id="standard-start-adornment"
                                                // className={classes.root}
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="start">#</InputAdornment>,
                                                }}
                                                InputLabelProps={{
                                                    shrink: true,
                                                    classes:{
                                                        root: classes.inputLabel,
                                                        focused: 'focused',
                                                    }
                                                }}
                                                variant="standard"
                                                style={{ width: 300 }}
                                                onChange={function (event) {
                                                    SetStateId(event.target.value)
                                                }}
                                            />                                        
                                        </Grid> 

                                        }
                                        {TypeBtn === "TRANSFER" &&
                                        <Grid container 
                                        style={{display: ShowModalLoader ? 'none' : ''}}
                                        sx={{
                                            justifyContent: 'center',
                                            marginTop: '31px',
                                        }}>
                                            <TextField
                                                label="...or Account ID"
                                                id="standard-start-adornment"
                                                // className={classes.root}
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="start">#</InputAdornment>,
                                                }}
                                                InputLabelProps={{
                                                    shrink: true,
                                                    classes:{
                                                        root: classes.inputLabel,
                                                        focused: 'focused',
                                                    }
                                                }}
                                                variant="standard"
                                                style={{ width: 300 }}
                                                onChange={function (event) {
                                                    SetAccountID(event.target.value)
                                                }}
                                            />                                        
                                        </Grid>
                                        }
                                        <div
                                            style={{
                                                display: ShowModalLoader ? 'none' : '',
                                                justifyContent:'center',
                                                // marginBottom:'63px',
                                                margin:'20px',
                                                alignItems:'flex-end',
                                            }}
                                        >
                                        {TypeBtn === "WITHDRAW" ?
                                            <div>
                                            <Button
                                                size="small"
                                                color='warning'
                                                variant='contained'
                                                sx={{ fontSize: '10px' }}
                                                style={{ marginRight: '160px' }}
                                                onClick={function() {
                                                    setShowModalLoader(false)
                                                    setShowModal(false)
                                                    setTypeBtn('')
                                    
                                                }}
                                            >
                                                CANCEL
                                            </Button>
                                            <Button
                                                onClick={function() {
                                                    setShowModalLoader(true)
                                                    fetchNui('np-ui:accountWithdraw', {
                                                        account_id: CurrentAccountId,
                                                        amount: Amount,
                                                        comment: Comment,
                                                    }).then(function (data) {
                                                        if (data.meta.ok === true) {
                                                            setShowModalLoader(false)
                                                            setShowModal(false)
                                                            setTypeBtn('')
                                                            fetchNui('np-ui:getAccountTransactions', {
                                                                account_id: CurrentAccountId
                                                            }).then(function (data) {
                                                                SetTransactions(data.data)
                                                            })
                                                            fetchNui('np-ui:getAccounts', {}).then(function (data) {
                                                                SetAccount(data.data.accounts)
                                                            });
                                                        }else{
                                                            setShowModalLoader(false)
                                                            console.log(data.meta.message)
                                                        }
                                                    });
                                    
                                                }}
                                                size='small'
                                                color='success'
                                                variant='contained'
                                                sx={{ fontSize: '10px' }}
                                            >
                                                WITHDRAW
                                            </Button>
                                            </div>
                                            : TypeBtn === "DEPOSIT" ?
                                            <div>
                                            <Button
                                                size="small"
                                                color='warning'
                                                variant='contained'
                                                sx={{ fontSize: '10px' }}
                                                style={{ marginRight: '170px' }}
                                                onClick={function() {
                                                    setShowModalLoader(false)
                                                    setShowModal(false)
                                                    setTypeBtn('')
                                    
                                                }}
                                            >
                                                CANCEL
                                            </Button>
                                            <Button
                                                onClick={function() {
                                                    setShowModalLoader(true)
                                                    fetchNui('np-ui:accountDeposit', {
                                                        account_id: CurrentAccountId,
                                                        amount: Amount,
                                                        comment: Comment,
                                                    }).then(function (data) {
                                                        if (data.meta.ok === true) {
                                                            setShowModalLoader(false)
                                                            setShowModal(false)
                                                            setTypeBtn('')
                                                            fetchNui('np-ui:getAccountTransactions', {
                                                                account_id: CurrentAccountId
                                                            }).then(function (data) {
                                                                SetTransactions(data.data)
                                                            })
                                                            fetchNui('np-ui:getAccounts', {}).then(function (data) {
                                                                SetAccount(data.data.accounts)
                                                            });
                                                        }else{
                                                            setShowModalLoader(false)
                                                            console.log(data.meta.message)
                                                        }
                                                    });
                                    
                                                }}
                                                size='small'
                                                color='success'
                                                variant='contained'
                                                sx={{ fontSize: '10px' }}
                                            >
                                                DEPOSIT
                                            </Button>
                                            </div>
                                            : TypeBtn === "TRANSFER" ?
                                            <div>
                                            <Button
                                                size="small"
                                                color='warning'
                                                variant='contained'
                                                sx={{ fontSize: '10px' }}
                                                style={{ marginRight: '165px' }}
                                                onClick={function() {
                                                    setShowModalLoader(false)
                                                    setShowModal(false)
                                                    setTypeBtn('')
                                    
                                                }}
                                            >
                                                CANCEL
                                            </Button>
                                            <Button
                                                onClick={function() {
                                                    setShowModalLoader(true)
                                                    fetchNui('np-ui:accountTransfer', {
                                                        account_id: CurrentAccountId,
                                                        target_account_id: AccountID,
                                                        target_state_id: StateId,
                                                        amount: Amount,
                                                        comment: Comment,
                                                    }).then(function (data) {
                                                        if (data.meta.ok === true) {
                                                            setShowModalLoader(false)
                                                            setShowModal(false)
                                                            setTypeBtn('')
                                                            fetchNui('np-ui:getAccountTransactions', {
                                                                account_id: CurrentAccountId
                                                            }).then(function (data) {
                                                                SetTransactions(data.data)
                                                            })
                                                            fetchNui('np-ui:getAccounts', {}).then(function (data) {
                                                                SetAccount(data.data.accounts)
                                                            });
                                                        }else{
                                                            setShowModalLoader(false)
                                                            console.log(data.meta.message)
                                                        }
                                                    });
                                    
                                                }}
                                                size='small'
                                                color='success'
                                                variant='contained'
                                                sx={{ fontSize: '10px' }}
                                            >
                                                TRANSFER
                                            </Button>
                                            </div>
                                        : null
                                        }
                                            
                                        
                                            
                                        </div>
                                    </Box>
                                {/* </Grid> */}
                            </div>
                        </Box>
                    </Grid>
                </ThemeProvider>
            </div>        
        </React.Fragment>
        </>
    );}

export default Financials;