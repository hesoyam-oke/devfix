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
    contextFlexContainer: {
        flex: '1 1 0%',
        display: 'flex',
        padding: '20vh 0px 64px',
      },
      contextLeftInnerContainer: {
        width: 'auto',
        display: 'inline-block',
        padding: '8px',
        maxHeight: 'calc(100vh - 128px)',
        overflowY: 'auto',
      },
      contextRightInnerContainer: {
        width: 'auto',
        display: 'inline-block',
        padding: '8px',
        maxHeight: 'calc(100vh - 128px)',
        overflowY: 'auto',
      },
      contextButton: {
        color: 'rgb(224, 224, 224)',
        cursor: 'pointer',
        display: 'flex',
        padding: '8px',
        position: 'relative',
        minWidth: '300px',
        boxShadow: 'black 0px 0px 4px 1px',
        borderRadius: '4px',
        marginBottom: '8px',
        pointerEvents: 'all',
        backgroundColor: 'rgb(34, 40, 49)',
        '&:hover': {
          color: 'white',
          backgroundColor: 'rgb(48, 71, 94)',
        },
      },
      contextButtonDisabled: {
        color: 'rgb(224, 224, 224)',
        cursor: 'pointer',
        display: 'flex',
        padding: '8px',
        position: 'relative',
        minWidth: '300px',
        boxShadow: 'black 0px 0px 4px 1px',
        borderRadius: '4px',
        marginBottom: '8px',
        pointerEvents: 'none',
        backgroundColor: 'rgb(132, 132, 134)',
      },
      contextButtonFlex: {
        flex: '1 1 0%',
        display: 'flex',
      },
      contextButtonChevron: {
        width: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
 
});