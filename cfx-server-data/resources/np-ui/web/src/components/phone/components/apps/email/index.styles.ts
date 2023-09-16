import { makeStyles } from "@mui/styles";

export default makeStyles({
  appOuterContainer: {
    position: 'fixed',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  appInnerContainer: {
    backgroundColor: '#fff',
    borderRadius: '4px',
    overflow: 'hidden',
    width: '80%',
    maxWidth: '960px',
    maxHeight: '80%',
    display: 'flex',
    flexDirection: 'column',
  },
  appSearch: {
    backgroundColor: '#f5f5f5',
    padding: '8px',
    borderBottom: '1px solid #e0e0e0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appSearchWrapper: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  appIcon: {
    position:'fixed',
    color: 'white',
    right:'29px',
    fontSize:'13px',
    cursor: 'pointer',
  },
  appList: {
    position: 'absolute',
    flexGrow: 1,
    overflowY: 'auto',
    top:'85px',
    width:'100%',
    padding: '16px',
    height:'80%',
  },
});