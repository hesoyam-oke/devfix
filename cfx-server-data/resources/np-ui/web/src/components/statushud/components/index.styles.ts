import { makeStyles } from "@mui/styles";

export default makeStyles({
  statusHudOuterContainer: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  statusHudInnerContainer: {
    border: '1px solid black',
    padding: '8px 32px',
    backgroundColor: 'rgb(34, 40, 49)',
  },
  statusHudLine: { marginBottom: '4px' },
});