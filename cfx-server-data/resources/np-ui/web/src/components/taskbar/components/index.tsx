import React, { useState, useEffect, useRef } from 'react';
import './index.css'
import { useNuiEvent } from "../../../hooks/useNuiEvent";
import useStyles from './index.styles';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const TaskBar: React.FC = () => {
    const classes = useStyles();

    const [ShowTaskBar, setShowTaskBar]: any = useState(false)
    const [Circle, SetCircle]: any = useState(false)
    const [TaskId, SetTaskId]: any = useState('')
    const [Label, SetLabel]: any = useState('')
    const [duration, SetDuration]: any = useState(0)
    const [Value, SetValue]: any = useState(0)
    const [CircumFerence, SetCircumFerence]: any = useState(0)
    const [Offset, SetOffset]: any = useState(0)



    useNuiEvent('uiMessage', (data) => {
      var dvexdata = data.data
      if ('taskbar' === data.app) {
        // if(dvexdata.show == null){
        //   setShowTaskBar(false)
        //   SetTaskId('')
        //   SetLabel('')
        //   SetDuration(0)
        //   SetValue(0)
        //   SetCircumFerence('125.66370614359172')
        //   SetOffset('125.66370614359172')
        //   // return <DveXAlert AlertText='Error occurred in app: Taskbar - restarting...' AlertType='error' />
        // }

        if(void 0 !== dvexdata.update) {
          SetValue(dvexdata.value)
        }
        if(true === dvexdata.display){
          setShowTaskBar(true)
          SetTaskId(dvexdata.taskID)
          SetLabel(dvexdata.label)
          SetDuration(dvexdata.duration)
          SetValue(0)
        }else if(false === dvexdata.display){
          setShowTaskBar(false)
          SetTaskId('')
          SetLabel('')
          SetDuration(0)
          SetValue(0)
          SetCircumFerence('125.66370614359172')
          SetOffset('125.66370614359172')
        }
      }
      if ('preferences' === data.app) {
        if(void 0 !== dvexdata['hud.misc.circle.taskbar.enabled']) {
          SetCircle(dvexdata['hud.misc.circle.taskbar.enabled'])
        }
      }
    })

    useEffect(() => {
      if (
        (0 === duration &&
          Value >= 100 &&
          (setShowTaskBar(false),
          SetTaskId(''),
          SetLabel(''),
          SetDuration(0),
          Circle && (SetCircumFerence('125.66370614359172'), SetOffset('125.66370614359172'))),
          duration > 0 &&
          (setTimeout(function () {
            SetDuration(duration - 1000)
          }, 1000),
          Circle))
      ) {
        var dvex1 = 40 * Math.PI,
          dvex2 = dvex1 - ((100 * Value) / 100 / 100) * dvex1
        SetCircumFerence(dvex1)
        SetOffset(dvex2)
      }
    })


    return (
        <>
          <React.Fragment>
            <div style={{display: ShowTaskBar ? '' : 'none', position:'absolute'}} className={classes.taskbarOuterContainer}>
              <div className={classes.taskbarFlex}></div>
              <div className={classes.taskbarInnerContainer}>
                <div style={{ display: Circle ? '' : 'none' }} className={classes.taskbarFlex}>

                </div>

                <div style={{ display: Circle ? '' : 'none' }} className={classes.taskbarCircleInnerContainer}>
                  <div className={classes.taskbarCircleContainer}>
                    <div className={classes.taskbarSvg}>
                      <svg version='1.1' xmlns='http://www.w3.org/2000/svg' style={{ height: '48px', width: '48px', transform: 'rotate(-90deg)',filter: 'drop-shadow(rgba(0, 0, 0, 0.4) 0px 0px 2px)' }}>
                        <circle r='20' cx='24' cy='24' fill='transparent' stroke='rgba(255, 255, 255, 0.5)' stroke-width='6' stroke-dasharray='125.66370614359172' stroke-dashoffset='0' style={{
                          transition: 'stroke-dashoffset 600ms linear 0s',
                          willChange: 'transition',
                        }}>

                        </circle>
                      </svg>
                    </div>

                    <div className={classes.taskbarSvg}>
                      <svg version='1.1' xmlns='http://www.w3.org/2000/svg' style={{ height: '48px', width: '48px', transform: 'rotate(-90deg)',filter: 'drop-shadow(rgba(0, 0, 0, 0.4) 0px 0px 2px)' }}>
                        <circle r='20' cx='24' cy='24' fill='transparent' stroke='#4F7CAC' stroke-width='6' stroke-dasharray={CircumFerence}stroke-dashoffset={Offset} style={{
                          transition: 'stroke-dashoffset 600ms linear 0s',
                          willChange: 'transition',
                        }}>

                        </circle>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <p className={classes.taskbarText}>{Label}</p>
                  </div>
              </div>
              <div style={{ display: Circle ? 'none' : 'flex' }} className={classes.taskbarInnerContainer}>
                  <div className={classes.taskbarNormalContainer}>
                      <div className={classes.taskbarTextContainer}>
                        <p style={{ textAlign: 'center' }} className={classes.taskbarText}>{Label}</p>
                      </div>
                      <div className={classes.taskbarSliderContainer} style={{
                                width: ''+Value+'%',
                                transition: 'width 0ms linear 0s',
                              }}>

                      </div>
                  </div>
              </div>
              </div>
            </div>
          </React.Fragment>
        </>
    );}

export default TaskBar;