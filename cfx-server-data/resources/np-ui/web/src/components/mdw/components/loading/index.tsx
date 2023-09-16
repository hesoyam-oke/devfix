import '../index'
import useStyles from '../index.styles';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function Loading({show}: any) {
  const classes = useStyles();
  return (
    <>
      <div style={{display: show ? '' : 'none'}} className={classes.mdwLoadingModalContainer}>
        <div className={classes.mdwLoadingModalInnerContainer}>
          <div className='spinner-wrapper'>
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
        </div>
      </div>
    </>
  );
}

export default Loading;