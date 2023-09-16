import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import './index.css'
import Context from './context/components';
import Hud from './hud/components';
import Peek from './peek/components';
import Interaction from './interaction/components';
import TextBox from './textBox/components';
import TaskBar from './taskbar/components';
import ClothingMenu from './clothing/components';
import Mdw from './mdw/components';
import Financials from './financials/components';
import Phone from './phone/components';
import Burner from './burner/components';
import DispatchApp from './dispatch/components';
import Badge from './badge/components';
import StatusHud from './statushud/components';
import Radio from './radio/components';
import Cash from './cash/components';
import SniperScope from './sniper-scope/components';
import RangePicker from './range-picker/components';
import MemoryGame from './memory-game/components';
import BoostingTablet from './boosting-tablet/components';
import Notepad from './notepad/components';
import {RestartAlert} from './main/components';

const darkTheme = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          margin: '0'
        }
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255, 255, 255, 0.02)",
          "&.Mui-selected": {
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            "&.Mui-focusVisible": { background: "rgba(0, 0, 0, 0.3)" }
          },
          "&.Mui-selected:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.3)",
          }
        }
      }
    },
    MuiCircularProgress: {
      styleOverrides: {
        circle: {
          strokeLinecap: 'butt'
        }
      }
    },
    MuiInput: {
      styleOverrides: {
        root: {
          "& .MuiInput-root": {
            color: "darkgray !important",
            fontSize: '1.3vmin !important'
        },
        "& label.Mui-focused": {
          color: "darkgray !important"
        },
        "& Mui-focused": {
          color: "darkgray !important"
        },
        "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
            borderColor: "darkgray !important"
        },
        "& .MuiInput-underline:before": {
            borderColor: "darkgray !important",
            color: "darkgray !important"
        },
        "& .MuiInput-underline:after": {
            borderColor: "white !important",
            color: "darkgray !important"
        },
        "& .Mui-focused:after": {
            color: "darkgray !important",
            fontSize: '1.5vmin !important'
        },
        "& .MuiInputAdornment-root": {
            color: "darkgray !important",
        }
        }
      }
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: "1em",
          maxWidth: "1000px"
        },
      }
    }
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#95ef77'
    },
    secondary: {
      main: '#424cab'
    },
    success: {
      main: '#95ef77'
    },
    warning: {
      main: '#f2a365'
    },
    error: {
      main: '#ffffff'
    },
    info: {
      main: '#2d465b'
    },
  },
});

const App: React.FC = () => {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <Radio />
        <Context />
        <TaskBar />
        <Badge />
        <StatusHud />
        <Interaction />
        <TextBox />
        <ClothingMenu />
        <Cash />
        <Mdw />
        <Peek />
        <Financials />
        <Phone />
        <Burner />
        <DispatchApp />
        <Hud />
        <SniperScope />
        <RangePicker />
        <BoostingTablet />
        <MemoryGame />
        <Notepad />
        <RestartAlert />
      </ThemeProvider>
    </>
  );
}

export default App;