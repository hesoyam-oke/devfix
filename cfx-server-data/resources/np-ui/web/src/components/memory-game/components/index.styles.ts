import { makeStyles } from "@mui/styles";

export default makeStyles({
    MemoryGameOuterContainer: {
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
    container: {
        height: '50vh',
        width: '50vh',
        position: 'relative',
        pointerEvents: 'all',
        backgroundColor: '#222831'
    },
    introBox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        flexDirection: 'column'
    },
    clickSquare: function (e) {
        return {
            height: 'calc('.concat('10', 'vh - ').concat('16', ')'),
            width: 'calc('.concat('10', 'vh - ').concat('16', ')'),
            margin: '8',
            // backgroundColor: j.a.bgSecondary()
        };
    },
    clickSquareShouldClick: { backgroundColor: '#CCC !important' },
    boxClickBox: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    clickSquareWasClicked: { backgroundColor: '#CCC !important' },
    clickSquareWasClickedFail: { backgroundColor: 'red !important' }
});