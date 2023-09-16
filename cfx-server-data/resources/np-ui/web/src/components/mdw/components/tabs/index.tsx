import { Typography } from '@mui/material';
import '../index'
import useStyles from '../index.styles';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function Tabs({currentTab, setcurrentTab}: any) {
  const classes = useStyles();
  return (
    <>
      <div className={classes.mdwTabsOuterContainer}>
        <div className={classes.mdwTabsInnerContainer}>
          <div className={classes.mdwTabsFlexContainer}>
            <div onClick={function(){setcurrentTab(1)}} className={1 === currentTab ? 'mdw-tab active-tab' : 'mdw-tab'}>
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
            <div onClick={function(){setcurrentTab(2)}} className={2 === currentTab ? 'mdw-tab active-tab' : 'mdw-tab'}>
              <Typography 
                style = {{
                  color: '#fff',
                  wordBreak: 'break-word',
                }}
                variant={'h6'}
                gutterBottom={true}
              >
                Incidents
              </Typography>
            </div>
            <div onClick={function(){setcurrentTab(3)}} className={3 === currentTab ? 'mdw-tab active-tab' : 'mdw-tab'}>
              <Typography 
                style = {{
                  color: '#fff',
                  wordBreak: 'break-word',
                }}
                variant={'h6'}
                gutterBottom={true}
              >
                Profiles
              </Typography>
            </div>
            <div onClick={function(){setcurrentTab(4)}} className={4 === currentTab ? 'mdw-tab active-tab' : 'mdw-tab'}>
              <Typography 
                style = {{
                  color: '#fff',
                  wordBreak: 'break-word',
                }}
                variant={'h6'}
                gutterBottom={true}
              >
                DMV
              </Typography>
            </div>
            <div onClick={function(){setcurrentTab(5)}} className={5 === currentTab ? 'mdw-tab active-tab' : 'mdw-tab'}>
              <Typography 
                style = {{
                  color: '#fff',
                  wordBreak: 'break-word',
                }}
                variant={'h6'}
                gutterBottom={true}
              >
                Reports
              </Typography>
            </div>
            <div onClick={function(){setcurrentTab(6)}} className={6 === currentTab ? 'mdw-tab active-tab' : 'mdw-tab'}>
              <Typography 
                style = {{
                  color: '#fff',
                  wordBreak: 'break-word',
                }}
                variant={'h6'}
                gutterBottom={true}
              >
                Evidence
              </Typography>
            </div>
            <div onClick={function(){setcurrentTab(7)}} className={7 === currentTab ? 'mdw-tab active-tab' : 'mdw-tab'}>
              <Typography 
                style = {{
                  color: '#fff',
                  wordBreak: 'break-word',
                }}
                variant={'h6'}
                gutterBottom={true}
              >
                Properties
              </Typography>
            </div>
            <div onClick={function(){setcurrentTab(8)}} className={8 === currentTab ? 'mdw-tab active-tab' : 'mdw-tab'}>
              <Typography 
                style = {{
                  color: '#fff',
                  wordBreak: 'break-word',
                }}
                variant={'h6'}
                gutterBottom={true}
              >
                Charges
              </Typography>
            </div>
            <div onClick={function(){setcurrentTab(9)}} className={9 === currentTab ? 'mdw-tab active-tab' : 'mdw-tab'}>
              <Typography 
                style = {{
                  color: '#fff',
                  wordBreak: 'break-word',
                }}
                variant={'h6'}
                gutterBottom={true}
              >
                Staff
              </Typography>
            </div>
            <div onClick={function(){setcurrentTab(10)}} className={10 === currentTab ? 'mdw-tab active-tab' : 'mdw-tab'}>
              <Typography 
                style = {{
                  color: '#fff',
                  wordBreak: 'break-word',
                }}
                variant={'h6'}
                gutterBottom={true}
              >
                Legislation
              </Typography>
            </div>
            <div onClick={function(){setcurrentTab(11)}} className={11 === currentTab ? 'mdw-tab active-tab' : 'mdw-tab'}>
              <Typography 
                style = {{
                  color: '#fff',
                  wordBreak: 'break-word',
                }}
                variant={'h6'}
                gutterBottom={true}
              >
                Businesses
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Tabs;