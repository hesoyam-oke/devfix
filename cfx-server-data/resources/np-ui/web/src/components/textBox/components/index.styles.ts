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

    textBoxContainer: {
        position: 'absolute',
        left: '50%',
        top: '50%',    
        transform: 'translate(-50%, -50%)',
        padding: '16px',
        maxWidth: '720px',
        minWidth: '256px',
        pointerEvents: 'all',
        backgroundColor: 'rgb(34, 40, 49)',
    },
    textBoxInputWrapper: {
        maxWidth: '720px',
        minWidth: '256px',
    },
    textBoxButtonWrapper: {
        display: 'flex',
        padding: '0px 16px 16px',
        alignItems: 'center',
        justifyContent: 'center',
    }, 
});