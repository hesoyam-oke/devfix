import { makeStyles } from "@mui/styles";

export default makeStyles({
    root: {
        top: "0px",
        left: "0px",
        width: "100vw",
        height: "100vh",
        position: "absolute",
        maxWidth: "100vw",
        minWidth: "100vw",
        maxHeight: "100vh",
        minHeight: "100vh",
        pointerEvents: "none",
        border: "0px",
        margin: "0px",
        outline: "0px",
        padding: "0px",
        overflow: "hidden",
        "& .MuiInput-root": {
            color: "white",
            fontSize: '1.3vmin'
        },

        "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
            borderColor: "darkgray"
        },
        "& .MuiInput-underline:before": {
            borderColor: "darkgray",
            color: "blue"
        },
        "& .MuiInput-underline:after": {
            borderColor: "white",
            color: "blue"

        },
        "& .MuiInputLabel-animated": {
            color: "darkgray",
            fontSize: '1.5vmin'

        },
        "& .MuiInputAdornment-root": {
            color: "darkgray",

        }
    },
    checkbox: {
        '&:hover': {
            backgroundColor: 'transparent !important'
        }
    },
    taskbarOuterContainer: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        position: 'relative',
        flexDirection: 'column',
      },
      taskbarInnerContainer: {
        flex: '1 1 0%',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
      },
      taskbarCircleContainer: {
        width: '48px',
        height: '48px',
        position: 'relative',
      },
      taskbarCircleInnerContainer: {
        display: 'flex',
        alignItems: 'center',
        paddingBottom: '10%',
      },
      taskbarNormalContainer: {
        color: 'white',
        width: '288px',
        border: '2px solid rgb(230, 230, 229)',
        height: '40px',
        position: 'relative',
        top: '75px',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
      },
      taskbarTextContainer: {
        top: '0px',
        left: '0px',
        width: '100%',
        height: '100%',
        display: 'flex',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
      },
      taskbarSliderContainer: {
        top: '0px',
        left: '0px',
        height: '100%',
        zIndex: '50',
        position: 'absolute',
        backgroundColor: 'rgb(79, 124, 172)',
      },
      taskbarText: {
        color: 'white',
        zIndex: '100',
        textShadow:
          'rgb(55 71 79) -1px 1px 0px, rgb(55 71 79) 1px 1px 0px, rgb(55 71 79) 1px -1px 0px, rgb(55 71 79) -1px -1px 0px',
        paddingLeft: '10px',
        width: '100% !important',
        fontStyle: 'normal !important',
        fontFamily: 'Arial, Helvetica, sans-serif !important',
        fontWeight: '600 !important',
        fontVariant: 'small-caps !important',
        letterSpacing: '0px !important',
        textTransform: 'none',
        textDecoration: 'none !important',
      },
      taskbarSvg: {
        width: '100%',
        height: '100%',
        display: 'flex',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
      },
      taskbarFlex: { flex: '1 1 0%' },
 
});