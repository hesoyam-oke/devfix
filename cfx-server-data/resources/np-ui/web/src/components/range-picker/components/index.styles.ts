import { makeStyles } from "@mui/styles";

export default makeStyles({
    rangePickerOuterContainer: {
        position: 'absolute',
        left: '50%',
        top: '50%',    
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: 'translate(-50%, -50%)',

    },
    rangePickerInnerContainer: {
        height: '30vh',
        display: 'flex',
        padding: '32px',
        alignItems: 'center',
        flexDirection: 'column',
        pointerEvents: 'all',
        justifyContent: 'center',
        backgroundColor: 'rgb(34, 40, 49)',
    },
    rangePickerSliderWrapper: { flex: '1 1 0%' },
    rangePickerButtonWrapper: { marginTop: '32px' },
});